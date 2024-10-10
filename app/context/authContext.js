'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

// Créer un contexte d'authentification
const AuthContext = createContext()

// Exporter un hook personnalisé pour accéder au contexte Auth
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Écoute les changements d'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser) // Mettre à jour l'utilisateur lorsque l'état change
    })

    return () => unsubscribe() // Cleanup lors du démontage
  }, [])

  const logout = async () => {
    await signOut(auth)
    setUser(null) // Réinitialiser l'utilisateur après la déconnexion
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
