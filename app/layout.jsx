import './globals.css'
import { Providers } from './providers' // Import du Providers modifié
import CustomNavbar from '@/components/Navbar'
import CustomFooter from '@/components/Footer'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function RootLayout ({ children }) {
  return (
    <html lang='fr'>
      <head>
        <meta name='viewport' content='viewport-fit=cover' />
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-TFW4LB1VMH'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-TFW4LB1VMH');
            `
          }}
        />
      </head>
      <body>
        <Providers>
          <CustomNavbar />
          {children}
          <CustomFooter />
        </Providers>
      </body>
    </html>
  )
}
