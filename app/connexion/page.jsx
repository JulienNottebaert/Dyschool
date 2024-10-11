'use client'

import { useEffect, useState } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation' // Pour rediriger après connexion
import { auth } from '@/lib/firebase' // Assurez-vous que Firebase est bien configuré
import { Input } from '@nextui-org/react'
import { EyeFilledIcon } from './EyeFilledIcon'
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon'
import Link from 'next/link'
import Image from 'next/image'
import LogoDyschool from '@/public/asset/dyschool.png'

export default function ConnexionPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter() // Hook pour rediriger après la connexion
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  // Vérification de l'état d'authentification au chargement de la page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Rediriger vers le tableau de bord si l'utilisateur est connecté
        router.push('/dashboard')
      }
    })

    // Cleanup l'écouteur lors du démontage du composant
    return () => unsubscribe()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Connexion à Firebase
      await signInWithEmailAndPassword(auth, email, password)
      setLoading(false)

      // Redirection vers le tableau de bord après connexion réussie
      router.push('/dashboard')
    } catch (error) {
      setLoading(false)
      setError('Erreur lors de la connexion : ' + error.message)
    }
  }

  return (
    <div className='my-28 flex flex-col justify-center items-center text-center px-5'>
      <Image src={LogoDyschool} alt='Logo' width={250} height={250} className='mb-16' />
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-xs w-full'>
        <h2 className='font-bold text-primary text-4xl mb-4'>Connexion</h2>

        {/* Afficher l'erreur en cas de problème */}
        {error && <p className='text-red-500'>{error}</p>}

        {/* Champ email */}
        <Input
          type='email'
          id='email'
          name='email'
          labelPlacement='inside'
          value={email}
          label='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
          radius='sm'
        />

        {/* Champ mot de passe */}
        <Input
          type={isVisible ? 'text' : 'password'}
          id='password'
          label='Mot de passe'
          labelPlacement='inside'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          radius='sm'
          endContent={
            <button className='focus:outline-none' type='button' onClick={toggleVisibility} aria-label='toggle password visibility'>
              {!isVisible
                ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                  )
                : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                  )}
            </button>
          }
        />
        <Link href='' className='mb-4 text-gray-400 hover:underline flex justify-end'>Mot de passe oublié ?</Link>

        {/* Bouton de soumission */}
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-secondary hover:bg-secondary-600 text-white font-bold py-4 px-8 rounded-lg transition duration-200 uppercase max-w-xs w-full'
            disabled={loading} // Désactiver le bouton pendant le chargement
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </div>
        <Link href='/inscription' className='hover:underline text-primary-300'>Pas de compte ? Inscrit toi</Link>
      </form>
    </div>
  )
}
