'use client'

import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import {
  Switch, Button, ButtonGroup, Dropdown, DropdownTrigger,
  DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader,
  ModalBody, ModalFooter, Spinner
} from '@nextui-org/react'
import { auth, db } from '@/lib/firebase'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

export const ChevronDownIcon = () => {
  return (
    <svg fill='none' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z'
        fill='currentColor'
      />
    </svg>
  )
}

function Options ({ userData, setUserData }) {
  const [editing, setEditing] = useState(false) // Mode édition
  const [confirmVisible, setConfirmVisible] = useState(false) // Modal de confirmation
  const [loading, setLoading] = useState(false) // État de chargement
  const [selectedTypo, setSelectedTypo] = useState(userData.typographie || 'poppins') // Valeur par défaut

  const descriptionsMap = {
    poppins: 'Toutes les polices sont optimisées pour la lecture standard.',
    roboto: 'Une police équilibrée pour améliorer la lisibilité.',
    openDyslexic: 'Police conçue pour les lecteurs atteints de dyslexie.'
  }

  const labelsMap = {
    poppins: 'Poppins',
    roboto: 'Roboto',
    openDyslexic: 'Open Dyslexic'
  }

  // Mettre à jour l'affichage dès qu'on sélectionne une nouvelle typographie
  const handleTypoChange = (keys) => {
    const newTypo = Array.from(keys)[0]
    setSelectedTypo(newTypo)
  }

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
        typographie: selectedTypo,
        controleParental: userData.controleParental ?? false,
        jeuxAdaptes: userData.jeuxAdaptes ?? false
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
        Options <FontAwesomeIcon icon={faGear} className='ml-2 text-base md:text-lg' />
      </h3>

      <div className='flex flex-col w-full mt-4 md:mt-6 gap-3 md:gap-4'>
        {/* Typographie */}
        <div className='flex justify-between items-center'>
          <p className='text-xs md:text-sm'>Choix de la typographie</p>
          <ButtonGroup variant='flat' size='sm'>
            <Button
              color='primary'
              isDisabled={!editing}
              className='text-xs md:text-sm'
            >
              {labelsMap[selectedTypo] || 'Poppins'}
            </Button>
            <Dropdown placement='bottom-end'>
              <DropdownTrigger>
                <Button
                  color='primary'
                  isIconOnly
                  isDisabled={!editing}
                  className='text-xs md:text-sm'
                >
                  <ChevronDownIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label='Choix de la typographie'
                selectedKeys={new Set([selectedTypo])}
                selectionMode='single'
                onSelectionChange={handleTypoChange}
                className='text-xs md:text-sm'
              >
                <DropdownItem key='poppins' description={descriptionsMap.poppins}>
                  {labelsMap.poppins}
                </DropdownItem>
                <DropdownItem key='roboto' description={descriptionsMap.roboto}>
                  {labelsMap.roboto}
                </DropdownItem>
                <DropdownItem key='openDyslexic' description={descriptionsMap.openDyslexic}>
                  {labelsMap.openDyslexic}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
        </div>

        {/* Contrôle Parental */}
        <div className='flex justify-between items-center'>
          <p className='text-xs md:text-sm'>Contrôle parental</p>
          <Switch
            size='sm'
            isSelected={userData.controleParental}
            isDisabled={!editing}
            onValueChange={(value) => handleUpdate('controleParental', value)}
          />
        </div>

        {/* Jeux adaptés */}
        <div className='flex justify-between items-center'>
          <p className='text-xs md:text-sm'>Jeux proposés adaptés</p>
          <Switch
            size='sm'
            isSelected={userData.jeuxAdaptes}
            isDisabled={!editing}
            onValueChange={(value) => handleUpdate('jeuxAdaptes', value)}
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

export default Options
