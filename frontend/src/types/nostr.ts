export namespace nostr {
  export interface Event {
    ID: string
    PubKey: string
    CreatedAt: number
    Kind: number
    Tags: string[][]
    Content: string
    Sig: string
  }

  export interface UserInfo extends Event {
    Content: string // JSON string containing profile information
  }
} 