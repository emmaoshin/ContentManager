import { SimplePool, Event } from 'nostr-tools'

const RELAY_URL = 'wss://ammetronics.com'
const pool = new SimplePool()

export async function subscribeToEvents(onEvent: (event: Event) => void): Promise<() => void> {
  const sub = pool.sub([RELAY_URL], [{
    kinds: [1], // text notes
    limit: 20,
  }])

  sub.on('event', onEvent)

  return () => {
    sub.unsub()
  }
}

export async function getProfileData(pubKey: string): Promise<Event | null> {
  const events = await pool.list([RELAY_URL], [{
    kinds: [0], // metadata
    authors: [pubKey],
  }])
  
  return events.length > 0 ? events[0] : null
} 