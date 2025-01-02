import { useState, useEffect } from 'react'
import { cn } from '../lib/utils'

interface RelayManagerProps {
  defaultRelay: string
}

export default function RelayManager({ defaultRelay }: RelayManagerProps) {
  const [relays, setRelays] = useState<string[]>([defaultRelay])
  const [newRelay, setNewRelay] = useState('')
  const [connectedRelays, setConnectedRelays] = useState<string[]>([defaultRelay])

  const addRelay = () => {
    if (newRelay && !relays.includes(newRelay)) {
      setRelays([...relays, newRelay])
      setNewRelay('')
    }
  }

  const removeRelay = (relay: string) => {
    if (relay !== defaultRelay) {
      setRelays(relays.filter(r => r !== relay))
      setConnectedRelays(connectedRelays.filter(r => r !== relay))
    }
  }

  const toggleConnect = (relay: string) => {
    if (connectedRelays.includes(relay)) {
      setConnectedRelays(connectedRelays.filter(r => r !== relay))
    } else {
      setConnectedRelays([...connectedRelays, relay])
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newRelay}
            onChange={(e) => setNewRelay(e.target.value)}
            placeholder="wss://relay.example.com"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            onClick={addRelay}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Add Relay
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {relays.map((relay) => (
          <div key={relay} className="flex items-center justify-between rounded-lg border p-3">
            <span className="text-sm font-medium">{relay}</span>
            <div className="flex gap-2">
              <button
                onClick={() => toggleConnect(relay)}
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium h-8 px-3",
                  connectedRelays.includes(relay)
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                )}
              >
                {connectedRelays.includes(relay) ? "Connected" : "Connect"}
              </button>
              {relay !== defaultRelay && (
                <button
                  onClick={() => removeRelay(relay)}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600 h-8 px-3"
                >
                  Remove
                </button>
              )}
              {relay === defaultRelay && (
                <span className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-gray-200 text-gray-600 h-8 px-3">
                  Default
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 