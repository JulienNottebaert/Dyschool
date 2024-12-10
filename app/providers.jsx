'use client'
import { useEffect } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'

export function Providers ({ children }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams.toString()}`
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-TFW4LB1VMH', {
        page_path: url
      })
    }
  }, [pathname, searchParams])

  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='light'>
        <SessionProvider>
          {children}
        </SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
