'use client'

import { Avatar, DropdownMenu, DropdownItem, Dropdown, DropdownTrigger, Divider, AvatarIcon } from '@nextui-org/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Solid icons
import { faUser as faUserSolid, faSun as faSunSolid, faChessRook as faChessRookSolid } from '@fortawesome/free-solid-svg-icons'
import { faUser as faUserRegular, faSun as faSunRegular, faChessRook as faChessRookRegular } from '@fortawesome/free-regular-svg-icons'

// Regular icons
import { faShareFromSquare, faCopyright } from '@fortawesome/free-regular-svg-icons'
import Logo from '@/public/asset/dyschool.png'

export default function DashboardLayout({ children }) {
  const [userData, setUserData] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  // Définir dynamiquement le titre de la section en fonction de la route
  const sectionTitle = () => {
    if (pathname === '/dashboard') {
      return (
        <span>
          <FontAwesomeIcon icon={faSunSolid} className="mr-4" />
          Tableau de bord
        </span>
      );
    }
    if (pathname.startsWith('/dashboard/profil')) {
      const subPath = pathname.split('/')[3]; // Récupère la partie après '/dashboard/profil'

      // Associe les titres aux sous-routes
      const titles = {
        abonnements: 'Abonnements',
        notifications: 'Notifications',
        paiements: 'Paiements',
        undefined : 'Informations personnelles'
      };

      // Retourne le titre correspondant ou "Informations personnelles" par défaut
      return (
        <span>
          <FontAwesomeIcon icon={faUserSolid} className="mr-4" />
          {'Profil - ' + titles[subPath] || 'Profil - Informations personnelles'}
        </span>
      );
    }
    if (pathname === '/dashboard/jeux') {
      return (
        <span>
          <FontAwesomeIcon icon={faChessRookSolid} className="mr-4" />
          Jeux
        </span>
      );
    }
    return 'Section';
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // Écoute en temps réel des données utilisateur
        const userRef = doc(db, 'users', authUser.uid)
        const unsubscribeSnapshot = onSnapshot(userRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            setUserData(docSnapshot.data())
          }
        })

        return () => unsubscribeSnapshot()
      } else {
        setUserData(null)
        router.push('/connexion') // Rediriger vers la connexion si non connecté
      }
    })

    return () => unsubscribe()
  }, [router])

  // Fonction utilitaire pour vérifier si un lien est actif
  const isActiveLink = (link) => {
    if (link === '/dashboard') {
      return pathname === '/dashboard'; // Exact match pour /dashboard
    }
    return pathname.startsWith(link); // startsWith pour les autres routes
  };

  return (
    <div className='flex'>
      {/* Sidebar fixe */}
      <aside className='w-64 bg-white h-screen p-4 fixed border shadow flex flex-col'>
        {/* Logo */}
        <div className='flex items-center mb-8'>
          <Link href='/' className='cursor-pointer mx-auto'>
            <Image src={Logo} width={100} height={100} alt='Logo' />
          </Link>
        </div>

        {/* Conteneur principal */}
        <div className='flex-grow flex flex-col justify-between'>
          {/* Navigation */}
          <nav className='flex flex-col space-y-4'>
            <Link href='/dashboard'>
              <span className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-secondary flex gap-3 items-center ${isActiveLink('/dashboard') ? '!bg-secondary-50 font-bold' : ''}`}>
                <FontAwesomeIcon icon={faSunRegular} className='text-xl' />
                Tableau de bord
              </span>
            </Link>
            <Link href='/dashboard/profil'>
              <span className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-secondary flex gap-3 items-center ${isActiveLink('/dashboard/profil') ? '!bg-secondary-50 font-bold' : ''}`}>
                <FontAwesomeIcon icon={faUserRegular} className='text-xl' />
                Profil
              </span>
            </Link>
            <Link href='/dashboard/jeux'>
              <span className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-secondary flex gap-3 items-center ${isActiveLink('/dashboard/jeux') ? '!bg-secondary-50 font-bold' : ''}`}>
                <FontAwesomeIcon icon={faChessRookRegular} className='text-xl' />
                Jeux
              </span>
            </Link>
          </nav>
        </div>

        {/* Bouton de déconnexion */}
        <div className='mt-auto'>
          <button
            onClick={() => {
              auth.signOut()
              router.push('/connexion')
            }}
            className='p-2 rounded text-left cursor-pointer w-full flex items-center gap-3 text-primary hover:bg-primary-50'
          >
            <FontAwesomeIcon icon={faShareFromSquare} className='text-xl' />
            Déconnexion
          </button>
          <Divider className='my-2' />
        </div>
        <p className='text-right text-xs text-gray-400'>
          Dyschool <FontAwesomeIcon icon={faCopyright} /> 2024
        </p>
      </aside>

      {/* Contenu principal */}
      <main className='ml-64 flex-grow'>
        <div className='flex items-center justify-between px-8 py-4 border bg-white shadow fixed top-0 left-64 right-0 h-20 z-50'>
          <h3 className='font-bold text-primary'>{sectionTitle()}</h3>
          <div className='flex items-center gap-3'>
            {userData
              ? (
                <>
                  <span className='text-secondary font-bold capitalize'>{`${userData.nom} ${userData.prenom}`}</span>
                  <Dropdown>
                    <DropdownTrigger>
                      <Avatar
                        className='mr-4 cursor-pointer'
                        isBordered
                        src={userData?.photoURL}
                        icon={<AvatarIcon />}
                        alt={`${userData?.nom || 'Utilisateur'} ${userData?.prenom || ''}`}
                        size='md'
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='User menu'>
                      <DropdownItem onClick={() => router.push('/dashboard')}>
                        Tableau de bord
                      </DropdownItem>
                      <DropdownItem onClick={() => router.push('/dashboard/profil')}>
                        Profil
                      </DropdownItem>
                      <DropdownItem
                        className='!text-primary'
                        onClick={() => {
                          auth.signOut()
                          router.push('/connexion')
                        }}
                      >
                        Déconnexion
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </>
                )
              : (
                <div className='flex items-center gap-3'>
                  {/* Skeleton pour le nom et prénom */}
                  <div className='w-24 h-6 bg-gray-300 rounded-md animate-pulse' />
                  {/* Skeleton pour l'avatar */}
                  <div className='w-10 h-10 bg-gray-300 rounded-full animate-pulse' />
                </div>
                )}
          </div>
        </div>
        <div className='p-8 mt-20 bg-gray-50'>
          {children}
        </div>
      </main>
    </div>
  )
}