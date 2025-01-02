import RelayManager from '../components/RelayManager'

export default function Settings() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-medium tracking-tight">Relay Management</h2>
        <div className="rounded-lg border bg-card">
          <RelayManager defaultRelay="wss://ammetronics.com" />
        </div>
      </div>
    </div>
  )
} 