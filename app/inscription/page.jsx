'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // Utilisation de useRouter

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
  const [success, setSuccess] = useState('')
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
    setSuccess('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'register',
          email: formData.email,
          password: formData.password,
          nom: formData.nom,
          prenom: formData.prenom,
          troubles: {
            dyscalculie: formData.dyscalculie,
            dysgraphie: formData.dysgraphie,
            dyslexie: formData.dyslexie,
            dysorthographie: formData.dysorthographie,
            dysphasie: formData.dysphasie,
            troubleAttention: formData.troubleAttention
          }
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Inscription réussie !')

        // Rediriger vers le tableau de bord après l'inscription
        router.push('/dashboard') // Assure-toi que la page dashboard existe
      } else {
        setError(data.message)
      }
    } catch (error) {
      setError('Erreur lors de l\'inscription')
    }
  }

  return (
    <div className='h-screen flex justify-center items-center text-center px-5'>
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h1 className='text-2xl mb-4'>Inscription</h1>

        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>{success}</p>}

        {/* Champs du formulaire */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nom'>
            Nom
          </label>
          <input
            name='nom'
            type='text'
            value={formData.nom}
            onChange={handleChange}
            required
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='prenom'>
            Prénom
          </label>
          <input
            name='prenom'
            type='text'
            value={formData.prenom}
            onChange={handleChange}
            required
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
            Mot de passe
          </label>
          <input
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            required
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700'
          />
        </div>

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

        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          S'inscrire
        </button>
      </form>
    </div>
  )
}
