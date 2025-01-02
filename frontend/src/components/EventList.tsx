import { useState, useEffect } from 'react'
import EventCard from './EventCard'
import { subscribeToEvents } from '../lib/nostr'
import type { Event } from 'nostr-tools'

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    let cleanup: (() => void) | undefined

    const setup = async () => {
      cleanup = await subscribeToEvents((event: Event) => {
        setEvents(prev => {
          // Check if event already exists
          if (prev.some(e => e.id === event.id)) {
            return prev
          }
          // Add new event at the beginning of the array
          return [event, ...prev]
        })
      })
    }

    setup()

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <div className="divide-y divide-border">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

