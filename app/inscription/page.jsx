'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Utilisation de useRouter
import { auth } from '@/lib/firebase' // Assurez-vous que Firebase est bien configuré
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { Input } from '@nextui-org/react'
import Image from 'next/image'
import LogoDyschool from '@/public/asset/dyschool.png'
import { EyeFilledIcon } from './EyeFilledIcon'
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon'
import Link from 'next/link'

export default function InscriptionPage () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nom: '',
    prenom: '',
    abonnement: {
      type: 'gratuit', // Par défaut : abonnement gratuit
      startDate: new Date().toISOString(), // Date de début
      endDate: null, // Pas de date de fin pour l'abonnement gratuit
      status: 'active' // Statut actif
    },
    troubles: {
      dyscalculie: false,
      dysgraphie: false,
      dyslexie: false,
      dysorthographie: false,
      dysphasie: false,
      dyspraxie: false,
      dyséxécutif: false
    },
    titres: [], // Liste vide
    gold: 0, // Int
    silver: 0, // Int
    bronze: 0, // Int
    experiences: 0, // Int
    niveau: 0, // Int
    controleParental: true, // Boolean
    jeuxAdaptes: true, // Boolean
    notifOffres: true, // Boolean
    notifNewsletters: true, // Boolean
    notifArticle: true, // Boolean
    typographie: 'poppins' // String
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true) // État pour la validation de l'email
  const router = useRouter()

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard')
      }
    })
    return () => unsubscribe()
  }, [router])

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible)
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })

    // Validation d'email
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      setIsEmailValid(emailRegex.test(value))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!isEmailValid) {
      setError('Veuillez entrer une adresse e-mail valide.')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne répondent pas aux critères.')
      setLoading(false)
      return
    }

    try {
      console.log('Envoi des données d’inscription au serveur...')
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'register',
          email: formData.email,
          password: formData.password,
          nom: formData.nom,
          prenom: formData.prenom,
          troubles: formData.troubles,
          abonnement: {
            type: 'gratuit', // Type d'abonnement par défaut
            startDate: new Date().toISOString(),
            endDate: null,
            status: 'active'
          },
          titres: formData.titres, // Liste de titres
          gold: formData.gold, // Points gold
          silver: formData.silver, // Points silver
          bronze: formData.bronze, // Points bronze
          experiences: formData.experiences, // Expérience de l'utilisateur
          niveau: formData.niveau, // Niveau actuel de l'utilisateur
          controleParental: formData.controleParental, // Activation du contrôle parental
          jeuxAdaptes: formData.jeuxAdaptes, // Option pour jeux adaptés
          notifOffres: formData.notifOffres, // Notification des offres
          notifNewsletters: formData.notifNewsletters, // Notification des newsletters
          notifArticle: formData.notifArticle, // Notification des nouveaux articles
          typographie: formData.typographie // Typographie choisie par l'utilisateur
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue lors de l’inscription.')
      }

      console.log('Inscription réussie :', data)

      // Connectez manuellement l'utilisateur après l'inscription
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      console.log('Utilisateur connecté :', userCredential.user)

      router.push('/dashboard') // Redirection vers le tableau de bord
    } catch (error) {
      console.error('Erreur lors de l’inscription :', error.message)
      setError("Erreur lors de l'inscription : " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mb-28 mt-10 flex flex-col justify-center items-center text-center px-5'>
      <Image src={LogoDyschool} alt='Logo' width={250} height={250} className='mb-12' />
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 max-w-2xl w-full'>
        <h2 className='font-bold text-primary text-4xl mb-4'>Inscription</h2>

        {error && <p className='text-red-500'>{error}</p>}

        <div className='flex flex-col gap-2'>
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
          {!isEmailValid && (
            <p className='text-red-400 text-xs text-left'>Veuillez entrer une adresse e-mail valide.</p>
          )}
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

        <div className='flex flex-col gap-2 text-left'>
          <p
            className={`text-xs ${
              formData.password &&
              formData.confirmPassword &&
              formData.password === formData.confirmPassword
                ? 'text-green-400'
                : 'text-red-400'
            }`}
          >
            Les mots de passe doivent être identiques.
          </p>
          <p
            className={`text-xs ${
              formData.password && formData.password.length >= 8
                ? 'text-green-400'
                : 'text-red-400'
            }`}
          >
            Le mot de passe doit faire au moins 8 caractères.
          </p>
          <p
            className={`text-xs ${
              formData.password &&
              /[A-Z]/.test(formData.password) &&
              /\d/.test(formData.password) &&
              /[\W_]/.test(formData.password)
                ? 'text-green-400'
                : 'text-red-400'
            }`}
          >
            Le mot de passe doit contenir une majuscule, un chiffre et un caractère spécial.
          </p>
        </div>

        <div className='flex items-center justify-center'>
          <button
            type='submit'
            className='bg-secondary hover:bg-secondary-600 text-white font-bold py-4 px-8 rounded-lg transition duration-200 uppercase max-w-xs w-full'
            disabled={loading}
          >
            {loading ? 'Inscription en cours...' : "S'inscrire"}
          </button>
        </div>
        <Link href='/connexion' className='hover:underline text-primary-300'>
          Déjà inscrit ? Connecte toi
        </Link>
      </form>
    </div>
  )
}
