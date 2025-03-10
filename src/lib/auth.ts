import { useToast } from '@/hooks/use-toast'
import { Constantes } from './constantes'
import { useRouter } from 'next/navigation'

const useAuth = () => {
  const { toast } = useToast()
  const router = useRouter()
  async function logout() {
    try {
      const response = await fetch(`${Constantes.selfUrl}/api/auth`, {
        method: 'delete',
      })
      toast({
        title: 'Sesion Cerrada',
        description: 'Friday, February 10, 2023 at 5:57 PM',
      })
      console.log(response)
      router.replace('/login')
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error al iniciar sesion ',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Error al iniciar sesion ',
          description: 'Error desconocido',
          variant: 'destructive',
        })
      }
    }
  }
  async function login(datos: object) {
    try {
      const response = await fetch(`${Constantes.selfUrl}/api/auth`, {
        method: 'post',
        ...datos,
      })
      const data = await response.json()
      toast({
        title: 'Inicio de sesion',
        description: data,
      })
      router.replace('/login')
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error al iniciar sesion ',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Error al iniciar sesion ',
          description: 'Error desconocido',
          variant: 'destructive',
        })
      }
    }
  }
  return { login, logout }
}
export default useAuth
