import { useState } from 'react'
import { NostrService } from '../lib/NostrService'
import { useAuth } from '../lib/AuthContext'

const nostrService = new NostrService()

export default function SendNote() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const { privateKey } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!message) {
      setError('Please enter a message')
      return
    }

    try {
      // Connect to relay first
      await nostrService.connect(['wss://ammetronics.com'])

      // Create and sign the event
      const event = await nostrService.createAndSignEvent(1, privateKey!, message, [])
      
      // Get the current relay and check if it exists
      const currentRelay = nostrService.getCurrentRelay()
      if (!currentRelay) {
        throw new Error('No relay connected')
      }

      // Publish the event
      await currentRelay.publish(event)
      setSuccess(`Note published successfully! ID: ${event.id.slice(0, 8)}...`)
      setMessage('') // Clear message after successful send
    } catch (err: any) {
      setError('Error sending note: ' + (err.message || err))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-medium text-center">Send Message</h2>

      {error && (
        <div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-500/15 px-4 py-3 text-sm text-green-600">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="w-full min-h-[150px] rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Send Note
        </button>
      </div>
    </form>
  )
}
