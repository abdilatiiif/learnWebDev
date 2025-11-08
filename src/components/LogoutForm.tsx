'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { logoutAction } from '@/actions/logoutAction'
import { useFormStatus } from 'react-dom'

function LogoutButtonContent() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      variant="outline"
      className="flex items-center gap-2"
    >
      {pending ? (
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

export default function LogoutForm() {
  return (
    <form action={logoutAction}>
      <LogoutButtonContent />
    </form>
  )
}