import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// List of supported locales
export const locales = ['nl', 'en']
export const defaultLocale = 'nl'

// Get the preferred locale from cookie, header, or default
function getLocale(request: NextRequest) {
  // Check cookie first
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (localeCookie && locales.includes(localeCookie)) {
    return localeCookie
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim().substring(0, 2))
      .find(lang => locales.includes(lang))
    
    if (preferredLocale) {
      return preferredLocale
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the pathname starts with /en/
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return // Allow English routes to pass through
  }

  // Check if the pathname has any locale prefix
  const hasLocalePrefix = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  const locale = getLocale(request)
  
  if (hasLocalePrefix) {
    // If it has nl prefix, redirect to path without prefix
    if (pathname.startsWith('/nl/') || pathname === '/nl') {
      return NextResponse.redirect(
        new URL(
          pathname.replace(/^\/nl\/?/, '/'),
          request.url
        )
      )
    }
  } else if (locale === 'en') {
    // Only add prefix for English locale
    return NextResponse.redirect(
      new URL(
        `/en${pathname === '/' ? '' : pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  // Match all pathnames except for
  // - api routes
  // - static files (._.)
  // - favicon.ico
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
} 