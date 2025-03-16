'use client'

import { useState } from 'react'
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Checkbox, Spinner } from '@nextui-org/react'
import { auth, db } from '@/lib/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

export default function FormulairePrincipal ({ userData, setUserData }) {
  const [editing, setEditing] = useState(false) // Mode édition
  const [confirmVisible, setConfirmVisible] = useState(false) // Modal de confirmation
  const [loading, setLoading] = useState(false) // État pour le chargement pendant la sauvegarde

  const handleSave = async () => {
    const user = auth.currentUser
    if (!user) return

    setLoading(true) // Active l'état de chargement

    try {
      // Vérifiez et normalisez les données
      const userDataToUpdate = {
        nom: userData.nom || '',
        prenom: userData.prenom || '',
        age: userData.age || '', // Si `age` est undefined, remplacez-le par `null`
        email: userData.email || '',
        troubles: userData.troubles || {},
        abonnement: userData.abonnement || {}
      }

      console.log('Données avant mise à jour :', userDataToUpdate)

      // Mise à jour dans Firestore
      await updateDoc(doc(db, 'users', user.uid), userDataToUpdate)

      // Recharge les données utilisateur après mise à jour
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const data = userDoc.data()
        setUserData({
          email: user.email,
          nom: data.nom,
          prenom: data.prenom,
          age: data.age,
          photoURL: data.photoURL,
          troubles: { ...data.troubles },
          abonnement: { ...data.abonnement }
        })
      }

      setEditing(false) // Désactive le mode édition
      setConfirmVisible(false) // Ferme la modal de confirmation
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données utilisateur :', error)
    } finally {
      setLoading(false) // Désactive l'état de chargement
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTroubleChange = (trouble) => {
    setUserData((prev) => ({
      ...prev,
      troubles: {
        ...prev.troubles,
        [trouble]: !prev.troubles[trouble]
      }
    }))
  }

  return (
    <div className='bg-white p-4 md:p-6 lg:p-8 shadow-md rounded-lg w-full h-full'>
      <h1 className='text-lg md:text-xl font-semibold text-left text-secondary mb-4'>
        Informations principales
        <FontAwesomeIcon icon={faCircleInfo} className='ml-2 text-base md:text-lg' />
      </h1>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col md:flex-row gap-4 w-full justify-center items-center'>
          <Input
            label='Nom'
            name='nom'
            placeholder={userData.nom || 'Nom'}
            value={userData.nom}
            onChange={handleChange}
            isDisabled={!editing}
            className='w-full text-sm md:text-base'
            size='sm'
          />
          <Input
            label='Prénom'
            name='prenom'
            placeholder={userData.prenom || 'Prénom'}
            value={userData.prenom}
            onChange={handleChange}
            isDisabled={!editing}
            className='w-full text-sm md:text-base'
            size='sm'
          />
          <Input
            label='Âge'
            name='age'
            placeholder={userData.age || 'Âge'}
            value={userData.age}
            onChange={handleChange}
            isDisabled={!editing}
            className='w-full text-sm md:text-base'
            size='sm'
          />
        </div>
        <div className='flex flex-wrap gap-2 md:gap-4 justify-center'>
          {Object.keys(userData.troubles).map((trouble) => (
            <Checkbox
              key={trouble}
              isSelected={userData.troubles[trouble]}
              onChange={() => handleTroubleChange(trouble)}
              isDisabled={!editing}
              className='text-xs md:text-sm'
            >
              {trouble.charAt(0).toUpperCase() + trouble.slice(1)}
            </Checkbox>
          ))}
        </div>
        {!editing
          ? (
            <Button
              color='secondary'
              variant='ghost'
              onPress={() => setEditing(true)}
              className='mx-auto mt-4 text-xs md:text-sm'
              size='sm'
            >
              Modifier
            </Button>
            )
          : (
            <div className='flex gap-2 justify-center mt-4'>
              <Button
                color='default'
                variant='flat'
                onPress={() => {
                  setEditing(false)
                  setConfirmVisible(false)
                }}
                className='text-xs md:text-sm'
                size='sm'
              >
                Annuler
              </Button>
              <Button
                color='secondary'
                onPress={() => setConfirmVisible(true)}
                className='text-xs md:text-sm'
                size='sm'
              >
                Enregistrer
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
            <ModalHeader className='text-base md:text-lg'>Confirmer les modifications</ModalHeader>
            <ModalBody>
              <p className='text-sm md:text-base'>
                Êtes-vous sûr de vouloir enregistrer ces modifications ?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant='flat'
                color='default'
                onPress={() => setConfirmVisible(false)}
                className='text-xs md:text-sm'
                size='sm'
              >
                Annuler
              </Button>
              <Button
                color='secondary'
                onPress={handleSave}
                isDisabled={loading}
                className='text-xs md:text-sm'
                size='sm'
              >
                {loading ? <Spinner size='sm' /> : 'Confirmer'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
