import { useRef, useState } from 'react'
import { Spinner, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from '@heroui/react'
import Image from 'next/image'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, storage, db } from '@/lib/firebase'
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMinus } from '@fortawesome/free-solid-svg-icons'
import Crayon from '@/public/asset/profile/outil-crayon.png'

export default function InformationsPrincipales ({ userData, setUserData }) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false) // État pour la suppression
  const [isModalOpen, setIsModalOpen] = useState(false) // État pour le modal de validation
  const [password, setPassword] = useState('') // État pour le mot de passe
  const fileInputRef = useRef(null)

  // Fonction pour déclencher l'input file
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  // Fonction pour gérer l'upload de l'image de profil
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
      console.error('Erreur lors de l\'upload :', error.message)
    } finally {
      setIsUploading(false)
    }
  }

  // Fonction pour supprimer le compte utilisateur
  const handleDeleteAccount = async () => {
    const user = auth.currentUser
    if (!user) {
      console.error('Utilisateur non authentifié.')
      return
    }

    setIsDeleting(true)

    try {
      // Étape 1 : Réauthentifier l'utilisateur
      const credential = EmailAuthProvider.credential(userData.email, password)
      await reauthenticateWithCredential(user, credential)

      // Étape 2 : Supprimer les données utilisateur dans Firestore
      const userDocRef = doc(db, 'users', user.uid)
      await deleteDoc(userDocRef)

      // Étape 3 : Supprimer l'utilisateur de Stripe via une requête à ton backend
      const response = await fetch('/api/delete-stripe-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: userData.stripeCustomerId })
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression sur Stripe')
      }

      // Étape 4 : Supprimer l'utilisateur de Firebase Authentication
      await user.delete()

      console.log('Compte utilisateur supprimé avec succès.')
    } catch (error) {
      console.error('Erreur lors de la suppression du compte :', error.message)
    } finally {
      setIsDeleting(false)
      setIsModalOpen(false) // Fermer le modal après la suppression ou une erreur
    }
  }

  return (
    <div className='bg-white flex flex-col gap-2 p-4 md:p-6 lg:p-8 shadow-md rounded-lg items-center justify-center w-full h-full'>
      {/* Section Image de profil */}
      <div className='relative w-[120px] md:w-[150px] h-[120px] md:h-[150px] group'>
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
            src={userData.photoURL || '/asset/utilisateur.png'}
            alt='Photo profil utilisateur'
            fill
            className='border-4 border-secondary group-hover:border-secondary-400 group-hover:opacity-70 group-hover:bg-white ease-in-out duration-300'
            style={{ objectFit: 'contain', borderRadius: '50%' }}
          />
        </div>
        <label
          htmlFor='profileImage'
          className='absolute top-2 right-2 bg-secondary group-hover:bg-secondary-400 ease-in-out duration-300 p-1.5 md:p-2 rounded-full cursor-pointer flex items-center justify-center w-6 h-6 md:w-8 md:h-8 shadow-lg z-30'
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

      {/* Informations utilisateur */}
      <h3 className='text-center text-primary text-lg md:text-xl font-semibold'>
        {userData.nom} {userData.prenom}
      </h3>
      <p className='w-full md:w-80 px-4 md:px-8 text-center text-gray-400 truncate text-sm'>
        {userData.email}
      </p>

      {/* Bouton pour supprimer le compte */}
      <Button
        color='danger'
        size='sm'
        startContent={isDeleting ? <Spinner size='sm' /> : ''}
        variant='ghost'
        className='mt-2 text-xs md:text-sm'
        onPress={() => setIsModalOpen(true)}
        isDisabled={isDeleting}
      >
        <FontAwesomeIcon icon={faUserMinus} className='text-xs md:text-sm' />
        {isDeleting ? ' Suppression...' : ' Supprimer le compte'}
      </Button>

      {/* Modal pour réauthentification et suppression */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className='max-w-[90%] md:max-w-md mx-auto'
      >
        <ModalContent>
          <ModalHeader className='text-base md:text-lg'>Confirmation de suppression</ModalHeader>
          <ModalBody>
            <p className='text-sm md:text-base'>
              Pour des raisons de sécurité, veuillez entrer votre mot de passe
              pour confirmer la suppression de votre compte.
            </p>
            <Input
              label='Email'
              type='email'
              value={userData.email}
              disabled
              className='text-sm md:text-base'
            />
            <Input
              label='Mot de passe'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='text-sm md:text-base'
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant='flat'
              color='default'
              onPress={() => setIsModalOpen(false)}
              className='text-xs md:text-sm'
            >
              Annuler
            </Button>
            <Button
              color='danger'
              onPress={handleDeleteAccount}
              isDisabled={isDeleting || !password}
              className='text-xs md:text-sm'
            >
              {isDeleting ? <Spinner size='sm' /> : 'Confirmer'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
