'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Utilisation de useRouter
import { auth, db } from '@/lib/firebase' // Assurez-vous que Firebase est bien configuré
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { Input, Checkbox } from '@nextui-org/react'
import Image from 'next/image'
import LogoDyschool from '@/public/asset/dyschool.png'
import { EyeFilledIcon } from './EyeFilledIcon'
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon'

export default function InscriptionPage () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
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

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  // Vérification de l'état d'authentification au chargement de la page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si l'utilisateur est connecté, redirige vers le tableau de bord
        router.push('/dashboard')
      }
    })

    return () => unsubscribe() // Cleanup l'écouteur lors du démontage du composant
  }, [router])

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

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

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

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
    <div className='my-12 flex flex-col justify-center items-center text-center px-5'>
      <Image src={LogoDyschool} alt='Logo' width={250} height={250} className='mb-16' />
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-2xl w-full'>
        <h2 className='font-bold text-primary text-4xl mb-4'>Inscription</h2>

        {/* Afficher l'erreur en cas de problème */}
        {error && <p className='text-red-500'>{error}</p>}

        {/* Champs du formulaire */}
        <Input
          type='email'
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          isRequired
          labelPlacement='inside'
          className='w-full'
          radius='sm'
        />

        <div className='flex gap-4'>
          <Input
            type={isPasswordVisible ? 'text' : 'password'}
            label='Mot de passe'
            name='password'
            value={formData.password}
            onChange={handleChange}
            isRequired
            labelPlacement='inside'
            className='max-w-xs m-auto'
            radius='sm'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={togglePasswordVisibility}
                aria-label='toggle password visibility'
              >
                {!isPasswordVisible
                  ? (
                    <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                    )
                  : (
                    <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                    )}
              </button>
            }
          />

          <Input
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            label='Confirmer le mot de passe'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            isRequired
            labelPlacement='inside'
            className='max-w-xs m-auto'
            radius='sm'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={toggleConfirmPasswordVisibility}
                aria-label='toggle confirm password visibility'
              >
                {!isConfirmPasswordVisible
                  ? (
                    <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                    )
                  : (
                    <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                    )}
              </button>
            }
          />
        </div>

        <div className='flex gap-4'>
          <Input
            type='text'
            label='Nom'
            name='nom'
            value={formData.nom}
            onChange={handleChange}
            isRequired
            labelPlacement='inside'
            className='max-w-xs m-auto'
            radius='sm'
          />

          <Input
            type='text'
            label='Prénom'
            name='prenom'
            isRequired
            value={formData.prenom}
            onChange={handleChange}
            labelPlacement='inside'
            className='max-w-xs m-auto'
            radius='sm'
          />
        </div>

        {/* Cases à cocher pour les troubles */}
        <label className='block text-primary font-bold text-lg mt-4'>Quels sont les troubles de l'enfant ?</label>
        <div className='flex flex-wrap gap-4 justify-center mb-4'>
          <div className='flex items-center mb-2'>
            <Checkbox
              isSelected={formData.dyscalculie}
              onChange={() => setFormData({ ...formData, dyscalculie: !formData.dyscalculie })}
              className='mr-2'
            />
            <label className='text-gray-500'>Dyscalculie</label>
          </div>
          <div className='flex items-center mb-2'>
            <Checkbox
              isSelected={formData.dysgraphie}
              onChange={() => setFormData({ ...formData, dysgraphie: !formData.dysgraphie })}
              className='mr-2'
            />
            <label className='text-gray-500'>Dysgraphie</label>
          </div>
          <div className='flex items-center mb-2'>
            <Checkbox
              isSelected={formData.dyslexie}
              onChange={() => setFormData({ ...formData, dyslexie: !formData.dyslexie })}
              className='mr-2'
            />
            <label className='text-gray-500'>Dyslexie</label>
          </div>
          <div className='flex items-center mb-2'>
            <Checkbox
              isSelected={formData.dysorthographie}
              onChange={() => setFormData({ ...formData, dysorthographie: !formData.dysorthographie })}
              className='mr-2'
            />
            <label className='text-gray-500'>Dysorthographie</label>
          </div>
          <div className='flex items-center mb-2'>
            <Checkbox
              isSelected={formData.dysphasie}
              onChange={() => setFormData({ ...formData, dysphasie: !formData.dysphasie })}
              className='mr-2'
            />
            <label className='text-gray-500'>Dysphasie</label>
          </div>
          <div className='flex items-center mb-2'>
            <Checkbox
              isSelected={formData.troubleAttention}
              onChange={() => setFormData({ ...formData, troubleAttention: !formData.troubleAttention })}
              className='mr-2'
            />
            <label className='text-gray-500'>Trouble de l'attention</label>
          </div>
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
