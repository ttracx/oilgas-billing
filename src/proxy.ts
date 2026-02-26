export { auth as middleware } from '@/lib/auth';

export const config = {
  matcher: [
    '/settings/:path*',
    '/checkout/:path*',
    '/success',
  ],
};
