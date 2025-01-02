import { Link, useLocation } from 'react-router-dom'
import { cn } from '../lib/utils'
import { useAuth } from '../lib/AuthContext'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Profile', path: '/profile' },
  { name: 'Explore', path: '/explore' },
  { name: 'Post Note', path: '/post' },
  { name: 'Settings', path: '/settings' },
]

export default function Navigation() {
  const location = useLocation()
  const { isLoggedIn, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">NostrUI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  location.pathname === item.path ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
} 