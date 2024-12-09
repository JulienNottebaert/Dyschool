import './globals.css'
import { AuthProvider } from './context/authContext' // Chemin relatif vers context/authContext
import CustomNavbar from '@/components/Navbar'
import CustomFooter from '@/components/Footer'
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function RootLayout ({ children }) {
  return (
    <html lang='fr'>
      <body>
        <AuthProvider>
          <CustomNavbar />
          {children}
          <CustomFooter />
        </AuthProvider>
      </body>
    </html>
  )
}
