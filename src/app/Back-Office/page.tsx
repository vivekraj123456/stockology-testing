import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Back-Office - Stockology',
};

export default function BackOfficePage() {
  // Server-side redirect to external Back-Office URL
  redirect('https://backoffice.stockologysecurities.com/Account/Login');
}
