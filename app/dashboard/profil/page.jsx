'use client'

import { useState, useEffect, useRef } from 'react'
import { Chip } from '@nextui-org/chip'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Spinner, Skeleton, Input } from '@nextui-org/react'
import Image from 'next/image'
import { auth, db, storage } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'
import Crayon from '@/public/asset/profile/outil-crayon.png'

export default function Profil ({ children }) {
  const [editing, setEditing] = useState(false) // Mode édition
  const [confirmVisible, setConfirmVisible] = useState(false) // Modal de confirmation
  const [userData, setUserData] = useState({
    email: '',
    nom: '',
    prenom: '',
    age: '',
    photoURL: '',
    troubles: {
      dyscalculie: false,
      dysgraphie: false,
      dyslexie: false,
      dysorthographie: false,
      dysphasie: false,
      dyspraxie: false,
      dyséxécutif: false
    }
  })
  const [loading, setLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false) // État pour gérer le chargement
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const fileInputRef = useRef(null)
  const router = useRouter()

  const [valeurNom, setValeurNom] = useState('')
  const [valeurPrenom, setValeurPrenom] = useState('')
  const [valeurMail, setValeurMail] = useState('')
  const [valeurAge, setValeurAge] = useState('')

  const troubleKeys = [
    'dyscalculie',
    'dysgraphie',
    'dyslexie',
    'dysorthographie',
    'dysphasie',
    'dyspraxie',
    'dyséxécutif'
  ]

  const openModal = () => setConfirmVisible(true)
  const closeModal = () => setConfirmVisible(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            setUserData({
              email: user.email || '',
              nom: data.nom || '',
              prenom: data.prenom || '',
              age: data.age || '', // Ajout de l'âge
              photoURL: data.photoURL || '',
              troubles: { ...userData.troubles, ...data.troubles }
            })
          }
          setLoading(false)
        } catch (error) {
          console.error('Erreur lors de la récupération des informations utilisateur :', error)
        }
      } else {
        router.push('/connexion')
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleTroubleChange = (trouble) => {
    setUserData((prev) => ({
      ...prev,
      troubles: {
        ...prev.troubles,
        [trouble]: !prev.troubles[trouble]
      }
    }))
  }

  const handleSave = async () => {
    const user = auth.currentUser
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          nom: valeurNom || userData.nom,
          prenom: valeurPrenom || userData.prenom,
          age: valeurAge || userData.age,
          email: valeurMail || userData.email,
          troubles: userData.troubles
        })

        // Recharge les données utilisateur
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          const data = userDoc.data()
          setUserData({
            email: user.email || '',
            nom: data.nom || '',
            prenom: data.prenom || '',
            age: data.age || '',
            photoURL: data.photoURL || '',
            troubles: { ...userData.troubles, ...data.troubles }
          })
        }

        setEditing(false) // Désactiver le mode édition
        resetFormToOriginal() // Réinitialiser les valeurs du formulaire
        closeModal() // Fermer le modal
      } catch (error) {
        console.error('Erreur lors de la mise à jour des données :', error)
      }
    }
  }

  const handleImageUpload = async (event) => {
    const user = auth.currentUser
    if (!user) {
      console.error('Utilisateur non authentifié.')
      return
    }

    const file = event.target.files[0]
    if (!file) {
      console.error('Aucun fichier sélectionné.')
      return
    }

    const storageRef = ref(storage, `profilePictures/${user.uid}`)
    setIsUploading(true) // Active le spinner
    setIsImageLoaded(false) // L'image n'est pas encore chargée

    try {
      await uploadBytes(storageRef, file)
      const photoURL = await getDownloadURL(storageRef)

      setUserData((prev) => ({ ...prev, photoURL })) // Mise à jour de l'état local
      await updateDoc(doc(db, 'users', user.uid), { photoURL }) // Mise à jour Firestore
    } catch (error) {
      console.error("Erreur lors de l'upload :", error.message)
    } finally {
      setIsUploading(false) // Désactive le spinner après l'upload
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const resetFormToOriginal = () => {
    setValeurNom('')
    setValeurPrenom('')
    setValeurMail('')
    setValeurAge('')
  }

  const handleEdit = () => {
    resetFormToOriginal() // Réinitialise aux valeurs d'origine
    setEditing(true) // Active le mode édition
  }
  const handleCancel = () => {
    resetFormToOriginal() // Réinitialise aux valeurs d'origine
    setEditing(false) // Désactive le mode édition
  }

  if (loading) {
    return (
      <div className='flex gap-8'>
        {/* Sidebar avec image et informations */}
        <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg w-80 items-center'>
          <Skeleton className='w-[150px] h-[150px] rounded-full' />
          <Skeleton className='w-40 h-6 rounded-md' />
          <Skeleton className='w-24 h-6 rounded-md' />
          <div className='flex gap-2 flex-wrap justify-center w-full'>
            <Skeleton className='w-16 h-6 rounded-md' />
            <Skeleton className='w-16 h-6 rounded-md' />
            <Skeleton className='w-16 h-6 rounded-md' />
          </div>
          <Skeleton className='w-full h-6 rounded-md' />
        </div>

        {/* Formulaire principal */}
        <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg w-full'>
          <div className='flex gap-4 w-full'>
            <Skeleton className='w-full h-12 rounded-md' />
            <Skeleton className='w-full h-12 rounded-md' />
            <Skeleton className='w-full h-12 rounded-md' />
          </div>
          <Skeleton className='w-full h-12 rounded-md' />
          <div className='flex flex-wrap gap-4 justify-center'>
            <Skeleton className='w-16 h-6 rounded-md' />
            <Skeleton className='w-16 h-6 rounded-md' />
            <Skeleton className='w-16 h-6 rounded-md' />
          </div>
          <Skeleton className='w-32 h-12 rounded-md mt-4 mx-auto' />
        </div>
      </div>
    )
  }

  return (
    <div className='flex gap-8'>
      <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg w-80 items-center justify-center'>
        <div className='relative w-[150px] h-[150px] group'>
          {/* Spinner affiché pendant le chargement */}
          {(isUploading || !isImageLoaded) && (
            <div className='absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-80 rounded-full z-20'>
              <Spinner color='secondary' size='lg' />
            </div>
          )}

          {/* Image de profil */}
          <div
            className='w-full h-full cursor-pointer rounded-full overflow-hidden'
            onClick={triggerFileInput}
          >
            <Image
              src={
        userData.photoURL ||
        'https://firebasestorage.googleapis.com/v0/b/dyschool-4ca88.firebasestorage.app/o/profil.png?alt=media&token=ee71c4c6-b87f-4e2d-88ee-efb2fec1f4b3'
      }
              alt='Photo profil utilisateur'
              fill
              className='border-4 border-secondary group-hover:border-secondary-400 group-hover:opacity-70 group-hover:bg-white ease-in-out duration-300'
              style={{ objectFit: 'contain', borderRadius: '50%' }}
              onLoadingComplete={() => setIsImageLoaded(true)} // L'image est entièrement chargée
              priority
            />
          </div>

          {/* Bouton crayon */}
          <label
            htmlFor='profileImage'
            className='absolute top-2 right-2 bg-secondary group-hover:bg-secondary-400 ease-in-out duration-300 p-2 rounded-full cursor-pointer flex items-center justify-center w-8 h-8 shadow-lg z-30'
            onClick={triggerFileInput}
          >
            <Image src={Crayon} alt='Edit Icon' className='w-full h-full object-contain' />
          </label>

          {/* Input caché pour upload */}
          <input
            type='file'
            ref={fileInputRef}
            accept='image/*'
            onChange={handleImageUpload}
            className='hidden'
          />
        </div>

        <div>
          <h3 className='text-center text-secondary'>{userData.nom} {userData.prenom}</h3>
          <p className='w-80 px-8 text-center truncate text-sm'>{userData.age || 'Age non renseigné'}</p>
        </div>

        <div className='flex gap-2 flex-wrap justify-center'>
          {troubleKeys.map((trouble) => (
            userData.troubles[trouble] && (
              <Chip key={trouble} variant='flat' radius='md' color='primary' size='sm'>
                {trouble.charAt(0).toUpperCase() + trouble.slice(1)}
              </Chip>
            )
          ))}
        </div>

        <p className='w-80 px-8 text-center text-secondary truncate'>{userData.email}</p>
      </div>

      <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg w-full items-center'>
        <div className='flex gap-4 w-full'>
          <div className='flex flex-col gap-2 w-full'>
            <Input
              label='Nom'
              placeholder={userData.nom || 'Nom'}
              defaultValue={userData.nom}
              value={valeurNom} onValueChange={setValeurNom}
              isDisabled={!editing}
              maxLength={20}
            />
            {editing && <p className='text-small pl-3'>Nouveau nom : <span className='text-secondary font-bold'>{valeurNom}</span></p>}
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <Input
              label='Prenom'
              placeholder={userData.prenom || 'Prénom'}
              defaultValue={userData.prenom}
              value={valeurPrenom} onValueChange={setValeurPrenom}
              isDisabled={!editing}
              maxLength={20}
            />
            {editing && <p className='text-small pl-3'>Prénom : <span className='text-secondary font-bold'>{valeurPrenom}</span></p>}
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <Input
              label='Âge'
              placeholder={userData.age || 'Âge'}
              defaultValue={userData.age}
              value={valeurAge}
              onValueChange={setValeurAge}
              isDisabled={!editing}
              maxLength={3}
            />
            {editing && <p className='text-small pl-3'>Âge : <span className='text-secondary font-bold'>{valeurAge}</span></p>}
          </div>
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <Input
            label='Email'
            placeholder={userData.email || 'Adresse mail'}
            defaultValue={userData.email}
            value={valeurMail} onValueChange={setValeurMail}
            isDisabled={!editing}
            maxLength={80}
          />
          {editing && <p className='text-small pl-3'>Adresse mail : <span className='text-secondary font-bold'>{valeurMail}</span></p>}
        </div>
        <div className='flex flex-wrap gap-4 justify-center'>
          {troubleKeys.map((trouble) => (
            <Checkbox
              key={trouble}
              isSelected={userData.troubles[trouble]}
              onChange={() => handleTroubleChange(trouble)}
              isDisabled={!editing}
            >
              {trouble.charAt(0).toUpperCase() + trouble.slice(1)}
            </Checkbox>
          ))}
        </div>
        {!editing
          ? (
            <Button color='secondary' className='mt-4' onPress={handleEdit}>
              Modifier
            </Button>
            )
          : (
            <div className='flex gap-4'>
              <Button color='default' className='mt-4' onPress={handleCancel}>
                Annuler
              </Button>
              <Button color='secondary' className='mt-4' onPress={openModal}>
                Enregistrer
              </Button>
            </div>
            )}
        <Modal isOpen={confirmVisible} onClose={closeModal}>
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalBody>
              <p>Êtes-vous sûr de vouloir enregistrer les modifications ?</p>
            </ModalBody>
            <ModalFooter>
              <Button color='default' onClick={closeModal}>Annuler</Button>
              <Button color='secondary' onClick={handleSave}>Confirmer</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
