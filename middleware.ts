import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const DEFAULT_LOCALE = 'nl'; // Define your default locale
const SUPPORTED_LOCALES = ['en']; // Only allow 'nl' as a valid locale

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Match paths like `/app/en/contact`
  const localeMatch = pathname.match(/^\/app\/([a-z]{2})\/(.*)$/);

  if (localeMatch) {
    const locale = localeMatch[1];
    const restOfPath = localeMatch[2];

    // Redirect `/app/en/contact` to `/app/contact`
    if (locale === DEFAULT_LOCALE) {
      return NextResponse.redirect(new URL(`/app/${restOfPath}`, request.url));
    }

    // Return 404 for unsupported locales (except 'nl')
    if (!SUPPORTED_LOCALES.includes(locale)) {
      return NextResponse.rewrite(new URL('/404', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files (._.)
  // - favicon.ico
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
} 