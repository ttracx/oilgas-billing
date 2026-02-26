export { auth as proxy } from '@/lib/auth';

export const config = {
  matcher: [
    '/settings/:path*',
    '/checkout/:path*',
    '/success',
  ],
};
