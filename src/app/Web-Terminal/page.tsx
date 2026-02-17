import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Web Terminal - Stockology',
};

export default function WebTerminalPage() {
  // Server-side redirect to external Web-Terminal URL
  redirect('https://web.stockologysecurities.com:28001/');
}
