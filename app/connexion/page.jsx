'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation' // Pour rediriger après connexion
import { auth } from '@/lib/firebase' // Assurez-vous que Firebase est bien configuré

export default function ConnexionPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter() // Hook pour rediriger après la connexion

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
    <div className='h-screen flex justify-center items-center text-center px-5'>
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h1 className='text-2xl mb-4'>Connexion</h1>

        {/* Afficher l'erreur en cas de problème */}
        {error && <p className='text-red-500'>{error}</p>}

        {/* Champ email */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
          />
        </div>

        {/* Champ mot de passe */}
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
            Mot de passe
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
          />
        </div>

        {/* Bouton de soumission */}
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            disabled={loading} // Désactiver le bouton pendant le chargement
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </div>
      </form>
    </div>
  )
}
