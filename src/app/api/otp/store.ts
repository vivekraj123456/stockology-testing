// Shared in-memory OTP store used by send/verify routes.
// Note: ephemeral data; resets on server restart.
export const otpStore = new Map<string, { otp: string; expiresAt: number }>();
