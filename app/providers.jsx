'use client'
import { useEffect } from 'react'
import { HeroUIProvider } from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

export function Providers ({ children }) {
  // Déplacez les hooks dans le useEffect pour garantir une exécution côté client
  useEffect(() => {
    const pathname = window.location.pathname
    const searchParams = new URLSearchParams(window.location.search)
    const url = `${pathname}?${searchParams.toString()}`

    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-TFW4LB1VMH', {
        page_path: url
      })
    }
  }, []) // Le tableau de dépendances est vide pour éviter d'écouter inutilement des changements

  return (
    <HeroUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='light'>
        <SessionProvider>
          {children}
        </SessionProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  )
}
