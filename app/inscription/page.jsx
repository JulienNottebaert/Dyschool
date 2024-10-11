'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // Utilisation de useRouter
import { auth, db } from '@/lib/firebase' // Assurez-vous que Firebase est bien configuré
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { Input } from '@nextui-org/react'
import Image from 'next/image'
import LogoDyschool from '@/public/asset/dyschool.png'

export default function InscriptionPage () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    dyscalculie: false,
    dysgraphie: false,
    dyslexie: false,
    dysorthographie: false,
    dysphasie: false,
    troubleAttention: false
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter() // Initialiser useRouter pour la redirection

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Inscription via Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user

      // Enregistrer les informations supplémentaires dans Firestore
      await setDoc(doc(db, 'users', user.uid), {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        troubles: {
          dyscalculie: formData.dyscalculie,
          dysgraphie: formData.dysgraphie,
          dyslexie: formData.dyslexie,
          dysorthographie: formData.dysorthographie,
          dysphasie: formData.dysphasie,
          troubleAttention: formData.troubleAttention
        }
      })

      // Rediriger immédiatement après l'inscription réussie
      router.push('/dashboard') // Rediriger vers le tableau de bord
    } catch (error) {
      setError('Erreur lors de l\'inscription : ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='my-28 flex flex-col justify-center items-center text-center px-5'>
      <Image src={LogoDyschool} alt='Logo' width={200} height={200} className='mb-16' />
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-2xl w-full'>
        <h2 className='font-bold text-primary text-4xl mb-4'>Inscription</h2>

        {/* Afficher l'erreur en cas de problème */}
        {error && <p className='text-red-500'>{error}</p>}

        {/* Champs du formulaire */}
        <Input
          type='text'
          label='Nom'
          name='nom'
          value={formData.nom}
          onChange={handleChange}
          required
          labelPlacement='inside'
          className='max-w-xs m-auto'
          radius='sm'
        />

        <Input
          type='text'
          label='Prénom'
          name='prenom'
          value={formData.prenom}
          onChange={handleChange}
          required
          labelPlacement='inside'
          className='max-w-xs m-auto'
          radius='sm'
        />

        <Input
          type='email'
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          labelPlacement='inside'
          className='max-w-xs m-auto'
          radius='sm'
        />

        <Input
          type='password'
          label='Mot de passe'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
          labelPlacement='inside'
          className='max-w-xs m-auto'
          radius='sm'
        />

        {/* Cases à cocher pour les troubles */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Troubles</label>
          {['dyscalculie', 'dysgraphie', 'dyslexie', 'dysorthographie', 'dysphasie', 'troubleAttention'].map((trouble) => (
            <div key={trouble} className='flex items-center mb-2'>
              <input
                type='checkbox'
                name={trouble}
                checked={formData[trouble]}
                onChange={handleChange}
                className='mr-2'
              />
              <label className='text-gray-700 capitalize'>{trouble}</label>
            </div>
          ))}
        </div>

        {/* Bouton de soumission */}
        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-secondary hover:bg-secondary-600 text-white font-bold py-4 px-8 rounded-lg transition duration-200 uppercase max-w-xs w-full'
            disabled={loading} // Désactiver le bouton pendant le chargement
          >
            {loading ? 'Inscription en cours...' : "S'inscrire"}
          </button>
        </div>
      </form>
    </div>
  )
}
