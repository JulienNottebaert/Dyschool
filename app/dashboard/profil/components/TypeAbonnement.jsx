import React from 'react'

function TypeAbonnement ({ userData }) {
  return (
    <div className='bg-white shadow-lg p-8 rounded-lg w-[500px] h-64'>
      <h1 className='text-3xl text-center'>Mon abonnement</h1>
      <h3 className='text-primary bold text-center mt-4'>{userData.abonnement.type}</h3>
      <h3 className='text-secondary bold text-center mt-4'>{userData.abonnement.status}</h3>
      <div className='flex justify-between mt-4'>
        <p>Début : {userData.abonnement.startDate}</p>
        <p>Fin : {userData.abonnement.endDate}</p>
      </div>
    </div>
  )
}

export default TypeAbonnement
