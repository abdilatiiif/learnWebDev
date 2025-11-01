'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { handleLogout } from '@/actions/handleLogout'
import { useState } from 'react'

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      await handleLogout()
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
