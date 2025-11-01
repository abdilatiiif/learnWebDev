'use server'

async function grantAdmin({ code }: { code: number }) {
  const ADMIN_CODE = Number(process.env.ADMIN_CODE) //  ADMIN_CODE fra env filen
  if (code === ADMIN_CODE) {
    return true
  } else {
    return false
  }
}
export default grantAdmin
