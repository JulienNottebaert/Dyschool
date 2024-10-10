'use client'

import { Chip, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { useAuth } from '@/app/context/authContext' // Utiliser le contexte Auth
import Logo from '@/public/asset/logo.png'
import Image from 'next/image'

// Fonction pour afficher les options lorsque l'utilisateur est connecté
const LoggedInNavItems = ({ user, logout }) => {
  return (
    <>
      <NavbarItem>
        <span className='text-secondary'>
          {user.displayName ? user.displayName : user.email}
        </span>
      </NavbarItem>

      <NavbarItem>
        <Chip
          color='secondary'
          variant='solid'
          className='px-3'
          onClick={logout}
        >
          Déconnexion
        </Chip>
      </NavbarItem>
    </>
  )
}

// Fonction pour afficher les options lorsque l'utilisateur est déconnecté
const LoggedOutNavItems = () => {
  return (
    <>
      <NavbarItem className='hidden sm:flex'>
        <Link href='/connexion' className='text-secondary'>
          <Chip color='secondary' variant='bordered' className='px-3'>
            Connexion
          </Chip>
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href='/inscription'>
          <Chip color='secondary' variant='solid' className='px-3'>
            S'inscrire
          </Chip>
        </Link>
      </NavbarItem>
    </>
  )
}

function CustomNavbar () {
  const { user, logout } = useAuth() // Récupérer l'utilisateur et la fonction logout depuis le contexte

  return (
    <Navbar isBordered shouldHideOnScroll>
      <NavbarContent>
        <NavbarBrand>
          <Link href='/' className='cursor-pointer'>
            <Image src={Logo} width={65} height={65} alt='Logo' />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify='end'>
        {/* Vérifie si l'utilisateur est connecté et rend les éléments correspondants */}
        {user
          ? (
            <LoggedInNavItems user={user} logout={logout} />
            )
          : (
            <LoggedOutNavItems />
            )}
      </NavbarContent>
    </Navbar>
  )
}

export default CustomNavbar
