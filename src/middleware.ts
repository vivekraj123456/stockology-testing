import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Protect admin routes
export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/blogs/:path*'],
};
