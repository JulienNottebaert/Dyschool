'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import {
  Button, Switch, Modal, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Spinner
} from '@nextui-org/react'
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
    <div className='bg-white shadow-lg p-8 rounded-md col-span-3 flex flex-col items-center'>
      <h3 className='text-xl font-semibold text-secondary text-center'>
        Notifications <FontAwesomeIcon icon={faBell} className='ml-2 text-lg' />
      </h3>

      <div className='flex flex-col w-full mt-6 gap-4'>
        <div className='flex justify-between'>
          <p className='text-sm'>Offres publicitaires</p>
          <Switch
            size='sm'
            isSelected={userData.notifOffres}
            isDisabled={!editing}
            onValueChange={(value) => handleUpdate('notifOffres', value)}
          />
        </div>
        <div className='flex justify-between'>
          <p className='text-sm'>Newsletters</p>
          <Switch
            size='sm'
            isSelected={userData.notifNewsletters}
            isDisabled={!editing}
            onValueChange={(value) => handleUpdate('notifNewsletters', value)}
          />
        </div>
        <div className='flex justify-between'>
          <p className='text-sm'>Nouvel article disponible</p>
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
          <Button size='sm' className='mt-6' color='secondary' onClick={() => setEditing(true)}>
            Modifier
          </Button>
          )
        : (
          <div className='flex gap-4 justify-center mt-6'>
            <Button size='sm' color='default' onClick={() => setEditing(false)} isDisabled={loading}>
              Annuler
            </Button>
            <Button size='sm' color='secondary' onClick={() => setConfirmVisible(true)} isDisabled={loading}>
              {loading ? <Spinner size='sm' /> : 'Enregistrer'}
            </Button>
          </div>
          )}

      {/* Modal de confirmation */}
      <Modal isOpen={confirmVisible} onClose={() => setConfirmVisible(false)}>
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir enregistrer les modifications ?
          </ModalBody>
          <ModalFooter>
            <Button size='sm' onClick={() => setConfirmVisible(false)}>Annuler</Button>
            <Button size='sm' onClick={handleSave} color='secondary' isDisabled={loading}>
              {loading ? <Spinner size='sm' /> : 'Confirmer'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Notifications
