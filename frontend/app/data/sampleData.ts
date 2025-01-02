import { nostr } from '@/types/nostr'

export const sampleEvents: nostr.Event[] = [
  {
    ID: "1",
    PubKey: "14MVEAHaocWbuZkGVqtfeKh1tWGdwbA2WeNV2ZM6HSpH",
    CreatedAt: 1625097600,
    Kind: 1,
    Tags: [["e", "reply-to-event-id"], ["p", "mentioned-pubkey"]],
    Content: "This is a sample post. #nostr",
    Sig: "signature1"
  },
  {
    ID: "2",
    PubKey: "14MVEAHaocWbuZkGVqtfeKh1tWGdwbA2WeNV2ZM6HSpH",
    CreatedAt: 1625184000,
    Kind: 1,
    Tags: [],
    Content: "Another sample post. This one is a bit longer to show how longer content looks in our UI.",
    Sig: "signature2"
  },
  {
    ID: "3",
    PubKey: "3MVEAHaocWbuZkGVqtfeKh1tWGdwbA2WeNV2ZM6HSpH",
    CreatedAt: 1625270400,
    Kind: 1,
    Tags: [["t", "nostr"], ["t", "sample"]],
    Content: "This is a post from a different user. It includes some tags.",
    Sig: "signature3"
  }
]

export const sampleUserInfo: { [key: string]: nostr.Event } = {
  "14MVEAHaocWbuZkGVqtfeKh1tWGdwbA2WeNV2ZM6HSpH": {
    ID: "user1",
    PubKey: "14MVEAHaocWbuZkGVqtfeKh1tWGdwbA2WeNV2ZM6HSpH",
    CreatedAt: 1620000000,
    Kind: 0,
    Tags: [],
    Content: JSON.stringify({
      name: "Alice",
      about: "Nostr enthusiast and developer",
      picture: "https://placekitten.com/200/200"
    }),
    Sig: "signature_user1"
  },
  "3MVEAHaocWbuZkGVqtfeKh1tWGdwbA2WeNV2ZM6HSpH": {
    ID: "user2",
    PubKey: "3MVEAHaocWbuZkGVqtfeKh1tWGdwbA2WeNV2ZM6HSpH",
    CreatedAt: 1620086400,
    Kind: 0,
    Tags: [],
    Content: JSON.stringify({
      name: "Bob",
      about: "Just trying out Nostr",
      picture: "https://placekitten.com/201/201"
    }),
    Sig: "signature_user2"
  }
}

