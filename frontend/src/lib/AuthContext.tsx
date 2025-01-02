import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContextType {
  isLoggedIn: boolean
  privateKey: string | null
  login: (key: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [privateKey, setPrivateKey] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check for existing session on mount
    const storedKey = localStorage.getItem('nostr_private_key')
    const loginTime = localStorage.getItem('nostr_login_time')

    if (storedKey && loginTime) {
      const loginTimestamp = parseInt(loginTime)
      const now = Date.now()

      if (now - loginTimestamp < SESSION_DURATION) {
        setIsLoggedIn(true)
        setPrivateKey(storedKey)
      } else {
        // Session expired
        localStorage.removeItem('nostr_private_key')
        localStorage.removeItem('nostr_login_time')
      }
    }
  }, [])

  const login = (key: string) => {
    localStorage.setItem('nostr_private_key', key)
    localStorage.setItem('nostr_login_time', Date.now().toString())
    setIsLoggedIn(true)
    setPrivateKey(key)
  }

  const logout = () => {
    localStorage.removeItem('nostr_private_key')
    localStorage.removeItem('nostr_login_time')
    setIsLoggedIn(false)
    setPrivateKey(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, privateKey, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 