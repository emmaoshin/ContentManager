import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NostrService } from '../lib/NostrService'
import { useAuth } from '../lib/AuthContext'

const nostrService = new NostrService()

export default function Login() {
  const [privateKey, setPrivateKey] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      // Validate private key format
      const validatedKey = nostrService.validateAndFormatKey(privateKey)
      
      // Use the auth context's login function
      login(validatedKey)
      
      // Redirect to home page
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Invalid private key format')
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login to NostrUI</h1>
          <p className="text-muted-foreground">
            Enter your private key to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <input
              type="password"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="Private Key (hex or nsec format)"
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <p className="text-xs text-muted-foreground">
              Your private key is stored locally and never sent to any server
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
} 