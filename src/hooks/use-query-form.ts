import { useToast } from './use-toast'
import { useCallback, useState } from 'react'
type FetchFunction = (data?: object) => Promise<object>
interface UseQueryProps {
  funcion: FetchFunction
  onSuccess?: (data: object) => void
  onError?: (error: object) => void
  configToast?: {
    titulo: string
    tituloBad: string
    mensaje: string
  }
  defaultData?: object
}

export default function useQueryForm({
  funcion,
  onSuccess,
  onError,
  configToast,
  defaultData,
}: UseQueryProps) {
  const [isPending, setIsPending] = useState(false)
  const [isError, setIsError] = useState(false)
  const [dataForm, setData] = useState(defaultData ?? {})
  const [error, setError] = useState<Error | null>(null)
  const [zodError, setZodError] = useState<Record<string, string[]> | null>(
    null
  )
  const [result, setResult] = useState<object | null>(null)
  const { toast } = useToast()

  const onChangeData = useCallback(
    (name: string, value: string | string[]) => {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    [setData]
  )
  const formExecute = async (event: React.FormEvent) => {
    setZodError(null)
    event.preventDefault() // Evita que el formulario se envíe por defecto
    setIsPending(true)
    setIsError(false)
    setError(null)
    // Convierte FormData a JSON

    const formData = new FormData(event.target as HTMLFormElement)
    const formDataJson = Object.fromEntries(formData.entries())

    try {
      const result = await funcion(formDataJson)
      setResult(result)
      toast({
        title: configToast?.titulo,
        description: configToast?.mensaje,
      })
      if (onSuccess) onSuccess(result) // Llama a onSuccess si existe
    } catch (err: unknown) {
      if (err instanceof Error) {
        try {
          const parsedError = JSON.parse(err.message)
          setZodError(parsedError)
        } catch {
          // Si el error no es de Zod, lo maneja como un error general
          setIsError(true)
          setError(err)
          toast({
            title: configToast?.tituloBad,
            description: err.message,
            variant: 'destructive',
          })
          if (onError) onError(err) // Llama a onError si existe
        }
      } else {
        console.error('Ocurrió un error desconocido', err)
        toast({
          title: configToast?.tituloBad,
          description: 'Ocurrio un error desconocido',
          variant: 'destructive',
        })
      }
    } finally {
      setIsPending(false)
    }
  }

  return {
    isPending,
    isError,
    dataForm,
    result,
    error,
    zodError,
    formExecute,
    onChangeData,
  }
}
