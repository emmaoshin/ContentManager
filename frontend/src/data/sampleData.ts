import { nostr } from '@/types/nostr'

export const sampleEvents: nostr.Event[] = [
  {
    ID: "1",
    PubKey: "user1",
    CreatedAt: Date.now() / 1000,
    Kind: 1,
    Tags: [["p", "user2"], ["t", "nostr"]],
    Content: "Hello Nostr!",
    Sig: "signature1"
  },
  {
    ID: "2",
    PubKey: "user2",
    CreatedAt: Date.now() / 1000 - 3600,
    Kind: 1,
    Tags: [["p", "user1"]],
    Content: "This is a test note",
    Sig: "signature2"
  }
]

export const sampleUserInfo: { [key: string]: nostr.UserInfo } = {
  user1: {
    ID: "profile1",
    PubKey: "user1",
    CreatedAt: Date.now() / 1000,
    Kind: 0,
    Tags: [],
    Content: JSON.stringify({
      name: "Alice",
      about: "Nostr enthusiast",
      picture: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alice"
    }),
    Sig: "signature3"
  },
  user2: {
    ID: "profile2",
    PubKey: "user2",
    CreatedAt: Date.now() / 1000,
    Kind: 0,
    Tags: [],
    Content: JSON.stringify({
      name: "Bob",
      about: "Just testing Nostr",
      picture: "https://api.dicebear.com/6.x/avataaars/svg?seed=Bob"
    }),
    Sig: "signature4"
  }
} 