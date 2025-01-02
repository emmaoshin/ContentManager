import EventList from '../components/EventList'

export default function Home() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Nostr Events</h1>
      </div>
      <div className="rounded-lg border bg-card">
        <EventList />
      </div>
    </div>
  )
} 