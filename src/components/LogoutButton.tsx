'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { logoutAction } from '@/actions/logoutAction'
import { useState, useTransition } from 'react'

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    startTransition(async () => {
      try {
        await logoutAction()
      } catch (error) {
        console.error('Logout failed:', error)
        setIsLoading(false)
      }
    })
  }

  const loading = isPending || isLoading

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant="outline"
      className="flex items-center gap-2"
    >
      {loading ? (
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
