'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import useQueryForm from '@/hooks/use-query-form'
import InputGroup from '@/components/inputs/inputGroup'
import { Lock, User } from 'lucide-react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const userSchema = z.object({
  usuario: z.string().min(5, { message: 'minimo 5 caracteres' }),
  password: z.string().min(7, { message: 'minimo 7 caracteres' }),
})

export default function Form() {
  const router = useRouter()
  type SchemaType = z.infer<typeof userSchema>

  const {
    zodError,
    formExecute,
    isPending,
    onChangeData,
    dataForm: dataSinTypes,
  } = useQueryForm({
    funcion: async () => {
      const formdata = userSchema.safeParse(dataForm)
      if (!formdata.success) {
        throw new Error(JSON.stringify(formdata.error.flatten().fieldErrors))
      }
      const resp = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(dataForm),
      })

      const json = await resp.json()

      return json
    },
    onSuccess: (respuesta) => {
      console.log('respuesta server', respuesta)
      router.replace('admin')
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const dataForm = dataSinTypes as SchemaType

  return (
    <form onSubmit={formExecute} className="grid gap-5 w-full max-w-sm">
      <h1 className="text-2xl font-medium pb-5">Bienvenido al sistema</h1>

      <InputGroup
        Icono={<User size={18} />}
        name="usuario"
        label="Usuario"
        placeholder="Usuario"
        required
        error={zodError}
        onChange={(e) => onChangeData(e.target.name, e.target.value)}
      />
      <InputGroup
        Icono={<Lock size={18} />}
        error={zodError}
        name="password"
        label="Contraseña"
        type="password"
        placeholder="Contrase"
        required
        onChange={(e) => onChangeData(e.target.name, e.target.value)}
      />

      <div className="flex w-full justify-between pt-4">
        <Button type="submit" className="capitalize" disabled={isPending}>
          iniciar sesion
        </Button>
        <Link href={'/'}>
          <Button variant={'outline'} type="button" className="capitalize">
            cancelar
          </Button>
        </Link>
      </div>
    </form>
  )
}
