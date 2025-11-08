'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { handleLogout } from '@/actions/handleLogout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const result = await handleLogout()
      if (result.success) {
        // Redirect to login page after successful logout
        router.push('/login')
        router.refresh()
      } else {
        console.error('Logout failed:', result.error)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isLoading ? (
        'Logger ut...'
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          Logg ut
        </>
      )}
    </Button>
  )
}
