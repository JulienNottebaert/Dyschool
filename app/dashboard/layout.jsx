'use client'

import { Avatar, DropdownMenu, DropdownItem, Dropdown, DropdownTrigger, Divider, AvatarIcon, Chip } from '@nextui-org/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Logo from '@/public/asset/dyschool.png'
// Solid icons
import { faUser as faUserSolid, faChessRook as faChessRookSolid, faCreditCard as faCreditCardSolid, faBars as faBarsSolid, faChartLine as faChartLineSolid, faPencil as faPencilSolid, faGamepad as faGamepadSolid, faNewspaper as faNewspaperSolid } from '@fortawesome/free-solid-svg-icons'
// Regular icons
import { faUser as faUserRegular, faChessRook as faChessRookRegular, faCreditCard as faCreditCardRegular, faShareFromSquare, faCopyright } from '@fortawesome/free-regular-svg-icons'

export default function DashboardLayout ({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [userData, setUserData] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  const titlesMap = {
    profil: 'Profil',
    abonnements: 'Abonnements',
    exercices: 'Exercices',
    jeux: 'Jeux',
    articles: 'Articles',
    '': 'Tableau de bord'
  }

  const sectionTitle = () => {
    const path = pathname.split('/')[2] || ''
    return titlesMap[path] || 'Tableau de bord'
  }

  const sectionIcon = () => {
    const path = pathname.split('/')[2] || ''
    switch (path) {
      case 'profil':
        return faUserSolid
      case 'abonnements':
        return faCreditCardSolid
      case 'exercices':
        return faPencilSolid
      case 'jeux':
        return faGamepadSolid
      case 'articles':
        return faNewspaperSolid
      default:
        return faChartLineSolid // Pour le tableau de bord
    }
  }

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
      return pathname === '/dashboard' // Exact match pour /dashboard
    }
    return pathname.startsWith(link) // startsWith pour les autres routes
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      {!isSidebarOpen
        ? (
          <aside className='bg-white h-screen p-4 fixed border shadow flex flex-col w-20 top-0 left-0 z-50 overflow-y-auto'>
            <div className='flex items-center'>
              <button onClick={toggleSidebar} className='text-secondary hover:bg-gray-100 p-2 rounded mx-auto mb-3'>
                <FontAwesomeIcon icon={faBarsSolid} className='text-xl' />
              </button>
            </div>
            <Divider className='my-2 mb-8' />
            <nav className='flex flex-col space-y-4'>
              <Link href='/dashboard'>
                <span className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-secondary flex gap-3 justify-center items-center ${isActiveLink('/dashboard') ? '!bg-secondary-50 font-bold' : ''}`}>
                  <FontAwesomeIcon icon={faChartLineSolid} className='text-xl' />
                </span>
              </Link>
              <Link href='/dashboard/profil'>
                <span className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-secondary flex gap-3 justify-center items-center ${isActiveLink('/dashboard/profil') ? '!bg-secondary-50 font-bold' : ''}`}>
                  <FontAwesomeIcon icon={faUserRegular} className='text-xl' />
                </span>
              </Link>
              <Link href='/dashboard/jeux' className='pointer-events-none'>
                <span className='p-2 rounded text-secondary flex gap-3 justify-center items-center opacity-50 cursor-not-allowed'>
                  <FontAwesomeIcon icon={faChessRookRegular} className='text-xl' />
                </span>
              </Link>
              <Link href='/dashboard/abonnements'>
                <span className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-secondary flex gap-3 justify-center items-center ${isActiveLink('/dashboard/abonnements') ? '!bg-secondary-50 font-bold' : ''}`}>
                  <FontAwesomeIcon icon={faCreditCardRegular} className='text-xl' />
                </span>
              </Link>
            </nav>
            <div className='mt-auto'>
              <button
                onClick={() => {
                  auth.signOut()
                  router.push('/connexion')
                }}
                className='p-2 rounded text-left cursor-pointer w-full flex items-center justify-center text-primary hover:bg-primary-50'
              >
                <FontAwesomeIcon icon={faShareFromSquare} className='text-xl' />
              </button>
              <Divider className='my-2' />
              <p className='text-center text-xs text-gray-400'>
                © 2024
              </p>
            </div>
          </aside>
          )
        : (
          <aside className='bg-white h-screen p-4 fixed border shadow flex flex-col w-64 top-0 left-0 z-50 overflow-y-auto'>
            <div className='flex items-center justify-between mb-3'>
              <Image src={Logo} alt='Dyschool' width={80} height={80} />
              <button onClick={toggleSidebar} className='text-secondary hover:bg-gray-100 p-2 rounded'>
                <FontAwesomeIcon icon={faBarsSolid} className='text-xl' />
              </button>
            </div>
            <Divider className='my-2 mb-8' />
            <nav className='flex flex-col space-y-4'>
              <Link href='/dashboard'>
                <span className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-secondary flex gap-3 items-center ${isActiveLink('/dashboard') ? '!bg-secondary-50 font-bold' : ''}`}>
                  <FontAwesomeIcon icon={faChartLineSolid} className='text-xl' />
                  Tableau de bord
                </span>
              </Link>
              <Link href='/dashboard/profil'>
                <span className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-secondary flex gap-3 items-center ${isActiveLink('/dashboard/profil') ? '!bg-secondary-50 font-bold' : ''}`}>
                  <FontAwesomeIcon icon={faUserRegular} className='text-xl' />
                  Profil
                </span>
              </Link>
              <Link href='/dashboard/jeux' className='pointer-events-none'>
                <span className='p-2 rounded text-secondary flex gap-3 items-center opacity-50 cursor-not-allowed'>
                  <FontAwesomeIcon icon={faChessRookRegular} className='text-xl' />
                  Jeux
                  <Chip variant='flat' color='secondary' size='sm'>Bientôt disponible</Chip>
                </span>
              </Link>
              <Link href='/dashboard/abonnements'>
                <span className={`p-2 hover:bg-gray-100 rounded cursor-pointer text-secondary flex gap-3 items-center ${isActiveLink('/dashboard/abonnements') ? '!bg-secondary-50 font-bold' : ''}`}>
                  <FontAwesomeIcon icon={faCreditCardRegular} className='text-xl' />
                  Abonnements
                </span>
              </Link>
            </nav>

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
              <p className='text-right text-xs text-gray-400'>
                Dyschool <FontAwesomeIcon icon={faCopyright} /> 2024
              </p>
            </div>
          </aside>
          )}

      {/* Contenu principal */}
      <div className={`flex-1 flex flex-col h-screen ${!isSidebarOpen ? 'ml-20' : 'ml-64'}`}>
        <div className='flex items-center justify-between px-2 sm:px-4 lg:px-8 py-4 border bg-white shadow h-20 z-40'>
          <div className='flex items-center gap-2 lg:gap-4'>
            <FontAwesomeIcon
              icon={sectionIcon()}
              className={`text-primary text-lg sm:text-xl ${isSidebarOpen ? 'block sm:hidden' : 'hidden'}`}
            />
            <h3 className={`font-bold text-primary text-sm sm:text-base lg:text-lg ${isSidebarOpen ? 'hidden sm:block' : 'block'}`}>
              {sectionTitle()}
            </h3>
          </div>
          <div className='flex items-center gap-2 md:gap-3'>
            {userData
              ? (
                <>
                  <span className='text-secondary font-bold capitalize hidden md:block'>{`${userData.nom} ${userData.prenom}`}</span>
                  <Dropdown>
                    <DropdownTrigger>
                      <Avatar
                        isBordered
                        src={userData?.photoURL}
                        icon={<AvatarIcon />}
                        alt={`${userData?.nom || 'Utilisateur'} ${userData?.prenom || ''}`}
                        size='sm'
                        className='cursor-pointer md:mr-4'
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label='User menu' className='text-xs md:text-sm'>
                      <DropdownItem onClick={() => router.push('/dashboard')}>
                        Tableau de bord
                      </DropdownItem>
                      <DropdownItem onClick={() => router.push('/dashboard/profil')}>
                        Profil
                      </DropdownItem>
                      <DropdownItem onClick={() => router.push('/dashboard/abonnements')}>
                        Abonnements
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
                <div className='flex items-center gap-2 md:gap-3'>
                  {/* Skeleton pour le nom et prénom */}
                  <div className='w-24 h-6 bg-gray-300 rounded-md animate-pulse hidden md:block' />
                  {/* Skeleton pour l'avatar */}
                  <div className='w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full animate-pulse' />
                </div>
                )}
          </div>
        </div>
        <div className='flex-1 p-4 md:p-8 bg-gray-50 overflow-y-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}
