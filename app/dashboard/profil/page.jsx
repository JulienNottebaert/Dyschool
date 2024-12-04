'use client'

import { useState, useEffect } from 'react'
import { Chip } from '@nextui-org/chip'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox } from '@nextui-org/react'
import Image from 'next/image'
import { auth, db, storage } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'
import UserPlaceholder from '@/public/asset/navbar/user.png'
import Crayon from '@/public/asset/profile/outil-crayon.png'

export default function Profil () {
  const [visible, setVisible] = useState(false)
  const [userData, setUserData] = useState({
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
              nom: data.nom || '',
              prenom: data.prenom || '',
              photoURL: data.photoURL || '', // URL de la photo de profil
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
        console.error('Erreur lors de la mise à jour des troubles:', error)
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

    try {
      // Upload du fichier
      await uploadBytes(storageRef, file)
      console.log('Fichier uploadé avec succès.')

      // Générer l'URL signée
      const photoURL = await getDownloadURL(storageRef)
      console.log('URL générée :', photoURL)

      setUserData((prev) => ({ ...prev, photoURL }))
      await updateDoc(doc(db, 'users', user.uid), { photoURL })
    } catch (error) {
      console.error("Erreur lors de l'upload :", error.message)
    }
  }
  if (loading) {
    return <p>Chargement...</p>
  }

  return (
    <div className='flex gap-8'>
      <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg max-w-80 items-center'>
        <div className='relative w-[150px] h-[150px]'>
          {/* Image de profil avec rounded */}
          <Image
            src={userData.photoURL || UserPlaceholder}
            alt='Photo profil utilisateur'
            fill
            style={{ objectFit: 'cover', borderRadius: '50%' }} // Applique le rounded directement à l'image
            priority
            className='z-0'
          />
          {/* Bouton du crayon */}
          <label
            htmlFor='profileImage'
            className='absolute top-2 right-2 bg-secondary-100 p-2 rounded-full cursor-pointer flex items-center justify-center w-8 h-8 shadow-lg z-10'
          >
            <Image
              src={Crayon}
              alt='Edit Icon'
              className='w-full h-full object-contain'
            />
          </label>
          <input
            type='file'
            id='profileImage'
            accept='image/*'
            onChange={handleImageUpload}
            className='hidden'
          />
        </div>

        <h3 className='text-center'>{userData.nom} {userData.prenom}</h3>

        <div className='flex gap-2 flex-wrap justify-center'>
          {troubleKeys.map((trouble) => (
            userData.troubles[trouble] && (
              <Chip key={trouble} variant='flat' radius='md' color='primary'>
                {trouble.charAt(0).toUpperCase() + trouble.slice(1)}
              </Chip>
            )
          ))}
        </div>

        <Button size='md' radius='sm' color='secondary' onClick={openModal} className='w-32'>
          Modifier
        </Button>
      </div>

      <div className='bg-white shadow-lg rounded-lg px-8'>
        <h1>Le reste</h1>
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
