'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import {
  Button, Switch, Modal, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Spinner
} from '@heroui/react'
import { auth, db } from '@/lib/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

function Notifications ({ userData, setUserData }) {
  const [editing, setEditing] = useState(false) // Mode édition
  const [confirmVisible, setConfirmVisible] = useState(false) // Modal de confirmation
  const [loading, setLoading] = useState(false) // État de chargement

  // Fonction pour mettre à jour les données utilisateur localement
  const handleUpdate = (field, value) => {
    setUserData(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  // Enregistrer les données dans Firestore
  const handleSave = async () => {
    const user = auth.currentUser
    if (!user) return

    setLoading(true)

    try {
      const userDataToUpdate = {
        notifOffres: userData.notifOffres ?? false,
        notifNewsletters: userData.notifNewsletters ?? false,
        notifArticle: userData.notifArticle ?? false
      }

      console.log('Données avant mise à jour :', userDataToUpdate)

      // Mise à jour Firestore
      await updateDoc(doc(db, 'users', user.uid), userDataToUpdate)

      // Rechargement des données mises à jour
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        setUserData(prev => ({
          ...prev,
          ...userDoc.data()
        }))
      }

      setEditing(false)
      setConfirmVisible(false)
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='bg-white shadow-lg p-4 md:p-6 lg:p-8 rounded-md w-full h-full flex flex-col items-center'>
      <h3 className='text-lg md:text-xl font-semibold text-secondary text-center'>
        Notifications <FontAwesomeIcon icon={faBell} className='ml-2 text-base md:text-lg' />
      </h3>

      <div className='flex flex-col w-full mt-4 md:mt-6 gap-3 md:gap-4'>
        <div className='flex justify-between items-center'>
          <p className='text-xs md:text-sm'>Offres publicitaires</p>
          <Switch
            size='sm'
            isSelected={userData.notifOffres}
            isDisabled={!editing}
            onValueChange={(value) => handleUpdate('notifOffres', value)}
          />
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-xs md:text-sm'>Newsletters</p>
          <Switch
            size='sm'
            isSelected={userData.notifNewsletters}
            isDisabled={!editing}
            onValueChange={(value) => handleUpdate('notifNewsletters', value)}
          />
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-xs md:text-sm'>Nouvel article disponible</p>
          <Switch
            size='sm'
            isSelected={userData.notifArticle}
            isDisabled={!editing}
            onValueChange={(value) => handleUpdate('notifArticle', value)}
          />
        </div>
      </div>

      {/* Boutons de modification et sauvegarde */}
      {!editing
        ? (
          <Button
            size='sm'
            className='mt-4 md:mt-6 text-xs md:text-sm'
            color='secondary'
            onClick={() => setEditing(true)}
          >
            Modifier
          </Button>
          )
        : (
          <div className='flex gap-2 md:gap-4 justify-center mt-4 md:mt-6'>
            <Button
              size='sm'
              color='default'
              onClick={() => setEditing(false)}
              isDisabled={loading}
              className='text-xs md:text-sm'
            >
              Annuler
            </Button>
            <Button
              size='sm'
              color='secondary'
              onClick={() => setConfirmVisible(true)}
              isDisabled={loading}
              className='text-xs md:text-sm'
            >
              {loading ? <Spinner size='sm' /> : 'Enregistrer'}
            </Button>
          </div>
          )}

      {/* Modal de confirmation */}
      <Modal
        isOpen={confirmVisible}
        onClose={() => setConfirmVisible(false)}
        className='max-w-[90%] md:max-w-md mx-auto'
      >
        <ModalContent>
          <ModalHeader className='text-base md:text-lg'>Confirmation</ModalHeader>
          <ModalBody>
            <p className='text-sm md:text-base'>
              Êtes-vous sûr de vouloir enregistrer les modifications ?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              size='sm'
              onClick={() => setConfirmVisible(false)}
              className='text-xs md:text-sm'
            >
              Annuler
            </Button>
            <Button
              size='sm'
              onClick={handleSave}
              color='secondary'
              isDisabled={loading}
              className='text-xs md:text-sm'
            >
              {loading ? <Spinner size='sm' /> : 'Confirmer'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Notifications
