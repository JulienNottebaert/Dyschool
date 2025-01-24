'use client'

import { useState } from 'react'
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Checkbox, Spinner } from '@nextui-org/react'
import { auth, db } from '@/lib/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

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
    <div className='bg-white flex flex-col justify-center gap-4 p-8 shadow-md rounded-lg col-span-2 items-center'>
      <div className='flex gap-4 w-full'>
        <Input
          label='Nom'
          name='nom'
          placeholder={userData.nom || 'Nom'}
          value={userData.nom}
          onChange={handleChange}
          isDisabled={!editing}
        />
        <Input
          label='Prénom'
          name='prenom'
          placeholder={userData.prenom || 'Prénom'}
          value={userData.prenom}
          onChange={handleChange}
          isDisabled={!editing}
        />
        <Input
          label='Âge'
          name='age'
          placeholder={userData.age || 'Âge'}
          value={userData.age}
          onChange={handleChange}
          isDisabled={!editing}
        />
      </div>
      <div className='flex flex-wrap gap-4 justify-center'>
        {Object.keys(userData.troubles).map((trouble) => (
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
      {!editing ? (
        <Button color='secondary' className='mt-4' onPress={() => setEditing(true)}>
          Modifier
        </Button>
      ) : (
        <div className='flex gap-4'>
          <Button
            color='default'
            className='mt-4'
            onPress={() => setEditing(false)}
            isDisabled={loading} // Empêche l'annulation pendant le chargement
          >
            Annuler
          </Button>
          <Button
            color='secondary'
            className='mt-4'
            onPress={() => setConfirmVisible(true)}
            isDisabled={loading} // Empêche l'enregistrement pendant le chargement
          >
            {loading ? <Spinner size='sm' /> : 'Enregistrer'}
          </Button>
        </div>
      )}
      <Modal isOpen={confirmVisible} onClose={() => setConfirmVisible(false)}>
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir enregistrer les modifications ?
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setConfirmVisible(false)}>Annuler</Button>
            <Button onPress={handleSave} isDisabled={loading}>
              {loading ? <Spinner size='sm' /> : 'Confirmer'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
