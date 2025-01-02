import { Event } from 'nostr-tools'
import UserProfile from './UserProfile'
import { cn } from '../lib/utils'

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="w-full border-b border-border py-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <UserProfile pubKey={event.pubkey} />
          <div className="text-sm text-muted-foreground">
            {new Date(event.created_at * 1000).toLocaleString()}
          </div>
        </div>
        <div>
          <p className="text-foreground">
            {event.content}
          </p>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <div>Kind: {event.kind}</div>
          <div className="ml-4">Tags: {event.tags.length}</div>
        </div>
        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, index) => (
              <div key={index} className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {tag[0]}: {tag[1]}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

