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
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // If pathname is missing locale, redirect to locale path
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // Create new URL with locale
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname === '/' ? '' : pathname}`,
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