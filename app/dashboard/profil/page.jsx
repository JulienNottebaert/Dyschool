'use client'

import { useState, useEffect, useRef } from 'react'
import { Chip } from '@nextui-org/chip'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Spinner, Skeleton } from '@nextui-org/react'
import Image from 'next/image'
import { auth, db, storage } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'
import Crayon from '@/public/asset/profile/outil-crayon.png'

export default function Profil () {
  const [visible, setVisible] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    nom: '',
    prenom: '',
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

  const troubleKeys = [
    'dyscalculie',
    'dysgraphie',
    'dyslexie',
    'dysorthographie',
    'dysphasie',
    'dyspraxie',
    'dyséxécutif'
  ]

  const openModal = () => setVisible(true)
  const closeModal = () => setVisible(false)

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
        await updateDoc(doc(db, 'users', user.uid), { troubles: userData.troubles })
        closeModal()
      } catch (error) {
        console.error('Erreur lors de la mise à jour des troubles :', error)
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

  if (loading) {
    return (
      <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg w-80 items-center'>
        <Skeleton className='w-[150px] h-[150px] rounded-full' />
        <Skeleton className='w-40 h-6 rounded-md' />
        <div className='flex gap-2 flex-wrap justify-center w-full'>
          <Skeleton className='w-16 h-6 rounded-md' />
          <Skeleton className='w-16 h-6 rounded-md' />
          <Skeleton className='w-16 h-6 rounded-md' />
        </div>
        <Skeleton className='w-full h-6 rounded-md' />
        <Skeleton className='w-32 h-10 rounded-md' />
      </div>
    )
  }

  return (
    <div className='flex gap-8'>
      <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg w-80 items-center'>
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
              className='border-4 border-secondary group-hover:border-secondary-400 ease-in-out duration-300'
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

        <h3 className='text-center'>{userData.nom} {userData.prenom}</h3>

        <div className='flex gap-2 flex-wrap justify-center'>
          {troubleKeys.map((trouble) => (
            userData.troubles[trouble] && (
              <Chip key={trouble} variant='flat' radius='md' color='primary' size='sm'>
                {trouble.charAt(0).toUpperCase() + trouble.slice(1)}
              </Chip>
            )
          ))}
        </div>

        <p className='w-80 px-8 text-center truncate'>{userData.email}</p>

        <Button size='md' radius='sm' color='secondary' onClick={openModal} className='w-32'>
          Modifier
        </Button>
      </div>

      <Modal isOpen={visible} onClose={closeModal}>
        <ModalContent>
          <ModalHeader>
            <h3 className='font-bold'>Modifier les troubles Dys</h3>
          </ModalHeader>
          <ModalBody>
            <div className='flex flex-col gap-4'>
              {troubleKeys.map((trouble) => (
                <Checkbox
                  key={trouble}
                  isSelected={userData.troubles[trouble]}
                  onChange={() => handleTroubleChange(trouble)}
                >
                  {trouble.charAt(0).toUpperCase() + trouble.slice(1)}
                </Checkbox>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onPress={closeModal} color='default'>Annuler</Button>
            <Button onPress={handleSave} color='secondary'>Enregistrer</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
