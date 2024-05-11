import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import CustomNavbar from '@/components/Navbar'
import CustomFooter from '@/components/Footer'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dyschool',
  description: 'Le site officiel de Dyschool'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='fr' className='light'>
      <body className={inter.className}>
        <Providers>
          <CustomNavbar />
          {children}
          <CustomFooter />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  )
}
