'use client'

import { Avatar, DropdownMenu, DropdownItem, Dropdown, DropdownTrigger } from '@nextui-org/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import Image from 'next/image'

import Logo from '@/public/asset/dyschool.png'
import UserLogo from '@/public/asset/navbar/user.png'
import Dashboard from '@/public/asset/navbar/dashboard.png'
import Logout from '@/public/asset/navbar/logout.png'
import Jeux from '@/public/asset/navbar/jeux.png'

export default function DashboardLayout ({ children }) {
  const [userData, setUserData] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  // Définir dynamiquement le titre de la section en fonction de la route
  const sectionTitle = () => {
    if (pathname === '/dashboard') return 'Tableau de bord'
    if (pathname === '/dashboard/profil') return 'Profil'
    if (pathname === '/dashboard/jeux') return 'Jeux'
    return 'Section'
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
  const isActiveLink = (link) => pathname === link

  return (
    <div className='flex'>
      {/* Sidebar fixe */}
      <aside className='w-64 bg-white h-screen p-4 fixed border shadow'>
        <div className='flex items-center mb-8'>
          <Link href='/' className='cursor-pointer mx-auto'>
            <Image src={Logo} width={100} height={100} alt='Logo' />
          </Link>
        </div>
        <nav className='flex flex-col space-y-4'>
          <Link href='/dashboard'>
            <span className={`p-2 rounded cursor-pointer flex gap-3 items-center ${isActiveLink('/dashboard') ? 'text-primary font-bold' : ''}`}>
              <Image src={Dashboard} width={20} height={20} alt='dashboard' />
              Dashboard
            </span>
          </Link>
          <Link href='/dashboard/profil'>
            <span className={`p-2 rounded cursor-pointer flex gap-3 items-center ${isActiveLink('/dashboard/profil') ? 'text-primary font-bold' : ''}`}>
              <Image src={UserLogo} width={20} height={20} alt='profil' />
              Profil
            </span>
          </Link>
          <Link href='/dashboard/jeux'>
            <span className={`p-2 rounded cursor-pointer flex gap-3 items-center ${isActiveLink('/dashboard/jeux') ? 'text-primary font-bold' : ''}`}>
              <Image src={Jeux} width={20} height={20} alt='jeux' />
              Jeux
            </span>
          </Link>
          <button
            onClick={() => {
              auth.signOut()
              router.push('/connexion')
            }}
            className='p-2 rounded text-left cursor-pointer'
          >
            <span className='rounded cursor-pointer flex gap-3 items-center'>
              <Image src={Logout} width={20} height={20} alt='logout' />
              Déconnexion
            </span>
          </button>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className='ml-64 flex-grow'>
        <div className='flex items-center justify-between px-8 py-4 border bg-white shadow fixed top-0 left-64 right-0 h-20'>
          <h3 className='font-bold text-primary'>{sectionTitle()}</h3>
          <div className='flex items-center gap-3'>
            {userData
              ? (
                <>
                  <span className='font-medium text-gray-700'>{`${userData.nom} ${userData.prenom}`}</span>
                  <Dropdown>
                    <DropdownTrigger>
                      <Avatar
                        className='mr-4 cursor-pointer'
                        isBordered
                        src={
                        userData?.photoURL ||
                        'https://firebasestorage.googleapis.com/v0/b/dyschool-4ca88.firebasestorage.app/o/profil.png?alt=media&token=ee71c4c6-b87f-4e2d-88ee-efb2fec1f4b3'
                      }
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
                <span>Chargement...</span>
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
