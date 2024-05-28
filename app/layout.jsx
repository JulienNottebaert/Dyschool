import './globals.css'
import { Providers } from './providers'
import CustomNavbar from '@/components/Navbar'
import CustomFooter from '@/components/Footer'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: 'Dyschool',
  description: 'Le site officiel de Dyschool'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='fr' className='light'>
      <body className='font-opendyslexic'>
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
