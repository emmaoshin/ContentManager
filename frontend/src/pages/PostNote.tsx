import SendNote from '../components/SendNote'

export default function PostNote() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Post Note</h1>
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <SendNote />
      </div>
    </div>
  )
} 