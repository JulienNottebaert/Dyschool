'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '@/lib/firebase' // Assurez-vous que Firebase est bien configuré et que le chemin est correct
import { onAuthStateChanged, signOut } from 'firebase/auth'

// Créer un contexte d'authentification
const AuthContext = createContext()

// Exporter un hook personnalisé pour accéder au contexte Auth
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser) // Mettre à jour l'utilisateur lorsque l'état change
    })

    return () => unsubscribe() // Cleanup l'écouteur lors du démontage du composant
  }, [])

  const logout = async () => {
    await signOut(auth)
    setUser(null) // Réinitialiser l'utilisateur après déconnexion
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
