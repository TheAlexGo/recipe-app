import { createServerClient } from '@supabase/ssr';
import { CookieOptions } from '@supabase/ssr/src/types';
import { NextRequest, NextResponse } from 'next/server';

import { isMock } from '@/utils/env';

const notProtectedUrls = ['/login/', '/registration/'];

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request,
  });
  if (isMock) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[],
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // refreshing the auth token
  const user = await supabase.auth.getUser();

  const isNotProtectedUrl = notProtectedUrls.includes(request.nextUrl.pathname);

  if (isNotProtectedUrl && !user.error) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isNotProtectedUrl && user.error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return supabaseResponse;
};
