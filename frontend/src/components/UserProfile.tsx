import { useState, useEffect } from 'react'
import { Event } from 'nostr-tools'
import { getProfileData } from '../lib/nostr'
import { cn } from '../lib/utils'

interface Profile {
  name?: string
  about?: string
  picture?: string
}

export default function UserProfile({ pubKey }: { pubKey: string }) {
  const [showProfile, setShowProfile] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileEvent, setProfileEvent] = useState<Event | null>(null)

  useEffect(() => {
    if (showProfile && !profile) {
      const fetchProfile = async () => {
        const event = await getProfileData(pubKey)
        if (event) {
          setProfileEvent(event)
          try {
            const content = JSON.parse(event.content)
            setProfile(content)
          } catch (e) {
            console.error('Failed to parse profile content:', e)
          }
        }
      }

      fetchProfile()
    }
  }, [pubKey, showProfile, profile])

  const handleClick = () => {
    setShowProfile(!showProfile)
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="text-sm font-medium text-primary hover:text-primary/80"
      >
        {profile?.name || pubKey.slice(0, 8)}...
      </button>
      {showProfile && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none">
          <div className="flex items-center space-x-2">
            {profile?.picture && (
              <img
                src={profile.picture}
                alt={profile.name || 'Profile'}
                className="h-10 w-10 rounded-full bg-muted"
              />
            )}
            <div>
              <div className="font-medium">{profile?.name || 'Anonymous'}</div>
              {profile?.about && (
                <div className="text-xs text-muted-foreground">{profile.about}</div>
              )}
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="text-xs">
              <span className="font-medium text-muted-foreground">Public Key:</span>{' '}
              <span className="font-mono">{pubKey.slice(0, 16)}...</span>
            </div>
            {profileEvent && (
              <div className="text-xs">
                <span className="font-medium text-muted-foreground">Created:</span>{' '}
                <span className="font-mono">{new Date(profileEvent.created_at * 1000).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

