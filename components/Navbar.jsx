'use client'
// import { menuItems } from '@/config/site.js'
import {
  Chip,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // NavbarMenu,
  // NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import { useState } from 'react'
// import { ThemeSwitcher } from './ThemeSwitcher.jsx'
import Logo from '@/public/asset/logo.png'
import Image from 'next/image.js'
function CustomNavbar () {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand className='hidden sm:flex'>
          <Image src={Logo} href='' width={65} height={65} />
        </NavbarBrand>
      </NavbarContent>

      {/* <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem isActive>
          <Link color='foreground' href='#'>
            Tout savoir
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color='foreground' href='#' aria-current='page'>
            Qui sommes-nous
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color='foreground' href='/evenements'>
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent justify='end'>
        {/* <ThemeSwitcher /> */}
        <NavbarItem className='hidden lg:flex'>
          <Link href='#' className='text-secondary'>
            <Chip color='secondary' variant='bordered' className='px-3'>Connexion</Chip>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href=''>
            <Chip color='secondary' variant='solid' className='px-3'>S'inscrire</Chip>
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'secondary'
                  : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
              }
              className='w-full'
              href='#'
              size='lg'
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </Navbar>
  )
}
export default CustomNavbar
