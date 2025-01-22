import { useRef, useState } from 'react'
import { Spinner } from '@nextui-org/react'
import Image from 'next/image'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, storage, db } from '@/lib/firebase'
import Crayon from '@/public/asset/profile/outil-crayon.png'
import { Chip } from '@nextui-org/chip'
import { updateDoc, doc } from 'firebase/firestore'

export default function InformationsPrincipales ({ userData, setUserData }) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const troubleKeys = [
    'dyscalculie',
    'dysgraphie',
    'dyslexie',
    'dysorthographie',
    'dysphasie',
    'dyspraxie',
    'dyséxécutif'
  ]

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
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
    setIsUploading(true)

    try {
      await uploadBytes(storageRef, file)
      const photoURL = await getDownloadURL(storageRef)

      const userRef = doc(db, 'users', user.uid)
      await updateDoc(userRef, { photoURL })

      setUserData((prev) => ({ ...prev, photoURL }))
    } catch (error) {
      console.error("Erreur lors de l'upload :", error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='bg-white flex flex-col gap-4 p-8 shadow-lg rounded-lg items-center justify-center'>
      <div className='relative w-[150px] h-[150px] group'>
        {isUploading && (
          <div className='absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-80 rounded-full z-20'>
            <Spinner color='secondary' size='lg' />
          </div>
        )}
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
          />
        </div>
        <label
          htmlFor='profileImage'
          className='absolute top-2 right-2 bg-secondary group-hover:bg-secondary-400 ease-in-out duration-300 p-2 rounded-full cursor-pointer flex items-center justify-center w-8 h-8 shadow-lg z-30'
          onClick={triggerFileInput}
        >
          <Image src={Crayon} alt='Edit Icon' className='w-full h-full object-contain' />
        </label>
        <input
          type='file'
          ref={fileInputRef}
          accept='image/*'
          onChange={handleImageUpload}
          className='hidden'
        />
      </div>
      <h3 className='text-center text-secondary'>
        {userData.nom} {userData.prenom}
      </h3>
      <p className='w-80 px-8 text-center truncate text-sm'>{userData.age || 'Âge non renseigné'}</p>
      <div className='flex gap-2 flex-wrap justify-center'>
        {troubleKeys.map(
          (trouble) =>
            userData.troubles[trouble] && (
              <Chip key={trouble} variant='flat' radius='md' color='primary' size='sm'>
                {trouble.charAt(0).toUpperCase() + trouble.slice(1)}
              </Chip>
            )
        )}
      </div>
      <p className='w-80 px-8 text-center text-secondary truncate'>{userData.email}</p>
    </div>
  )
}
