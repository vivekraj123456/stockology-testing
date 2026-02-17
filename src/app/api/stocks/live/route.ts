import {
  fetchCombinedDashboardSnapshot,
  type CombinedDashboardSnapshot,
} from "@/lib/stocks/dashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SNAPSHOT_INTERVAL_MS = 15000;
const HEARTBEAT_INTERVAL_MS = 20000;

type SnapshotSubscriber = (snapshot: CombinedDashboardSnapshot) => void;

const subscribers = new Set<SnapshotSubscriber>();
let latestSnapshot: CombinedDashboardSnapshot | null = null;
let fetchInFlight: Promise<void> | null = null;
let pollingTimer: ReturnType<typeof setInterval> | null = null;

function encodeEvent(encoder: TextEncoder, event: string, payload: unknown): Uint8Array {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`);
}

async function publishSnapshot(): Promise<void> {
  if (fetchInFlight) {
    return fetchInFlight;
  }

  fetchInFlight = (async () => {
    const snapshot = await fetchCombinedDashboardSnapshot();
    latestSnapshot = snapshot;
    subscribers.forEach((subscriber) => {
      subscriber(snapshot);
    });
  })()
    .catch((error) => {
      console.error("Error publishing live stock snapshot:", error);
    })
    .finally(() => {
      fetchInFlight = null;
    });

  return fetchInFlight;
}

function ensurePolling(): void {
  if (pollingTimer) {
    return;
  }

  void publishSnapshot();
  pollingTimer = setInterval(() => {
    void publishSnapshot();
  }, SNAPSHOT_INTERVAL_MS);
}

function stopPollingIfIdle(): void {
  if (subscribers.size > 0 || !pollingTimer) {
    return;
  }

  clearInterval(pollingTimer);
  pollingTimer = null;
}

function subscribe(subscriber: SnapshotSubscriber): () => void {
  subscribers.add(subscriber);
  ensurePolling();

  if (latestSnapshot) {
    subscriber(latestSnapshot);
  }

  return () => {
    subscribers.delete(subscriber);
    stopPollingIfIdle();
  };
}

export async function GET(request: Request) {
  const encoder = new TextEncoder();
  let unsubscribe: (() => void) | null = null;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  let abortHandler: (() => void) | null = null;
  let streamClosed = false;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const cleanup = () => {
        if (heartbeatTimer) {
          clearInterval(heartbeatTimer);
          heartbeatTimer = null;
        }

        if (unsubscribe) {
          unsubscribe();
          unsubscribe = null;
        }

        if (abortHandler) {
          request.signal.removeEventListener("abort", abortHandler);
          abortHandler = null;
        }
      };

      const closeStream = () => {
        if (streamClosed) {
          return;
        }

        streamClosed = true;
        cleanup();

        try {
          controller.close();
        } catch {
          // Connection is already closed.
        }
      };

      const sendSnapshot = (snapshot: CombinedDashboardSnapshot) => {
        if (streamClosed) {
          return;
        }

        try {
          controller.enqueue(encodeEvent(encoder, "snapshot", snapshot));
        } catch {
          closeStream();
        }
      };

      controller.enqueue(
        encodeEvent(encoder, "ready", {
          intervalMs: SNAPSHOT_INTERVAL_MS,
          connectedAt: new Date().toISOString(),
        })
      );

      unsubscribe = subscribe(sendSnapshot);

      heartbeatTimer = setInterval(() => {
        if (streamClosed) {
          return;
        }

        try {
          controller.enqueue(encoder.encode(`: ping ${Date.now()}\n\n`));
        } catch {
          closeStream();
        }
      }, HEARTBEAT_INTERVAL_MS);

      abortHandler = () => {
        closeStream();
      };
      request.signal.addEventListener("abort", abortHandler);
    },
    cancel() {
      if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
      }

      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }

      if (abortHandler) {
        request.signal.removeEventListener("abort", abortHandler);
        abortHandler = null;
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
