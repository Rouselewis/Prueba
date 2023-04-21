import { NextRequest, NextResponse } from 'next/server';
const PUBLIC_FILE = /\.(.*)$/;
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequest) {
    if (
      req.nextUrl.pathname.startsWith('/_next') ||
      req.nextUrl.pathname.includes('/api/') ||
      PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
      return;
    }

    if (req.nextUrl.locale === 'default') {
      const locale = req.cookies.get('NEXT_LOCALE')?.value || 'es';

      return NextResponse.redirect(
        new URL(
          `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
          req.url
        )
      );
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const pathname = req.nextUrl.pathname;
        const roles = token?.roles;
        if (pathname.includes('/panel')) {
          if (pathname.includes('/admin')) {
            if (roles?.includes('ADMIN')) return true;
            return false;
          }
          if (pathname.includes('/event') || pathname.includes('/ticket')) {
            if (roles?.includes('ADMIN') || roles?.includes('PROMOTER'))
              return true;
            return false;
          }
        }

        if (token) return true;
        return false;
      },
    },
  }
);

export const config = { matcher: ['/checkout/:path*', '/panel/:path*'] };
