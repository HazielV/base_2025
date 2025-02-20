'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useQueryForm from '@/hooks/use-query-form'

export default function Form() {
  const { formExecute, isPending, onChangeData, dataForm } = useQueryForm({
    funcion: async () => {
      console.log('envia')
      const resp = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(dataForm),
      })
      const json = await resp.json()

      return json
    },
  })
  return (
    <form onSubmit={formExecute} className="grid gap-5 w-full max-w-sm">
      <h1 className="text-2xl font-medium pb-5">Bienvenido al sistema</h1>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="usuario">Usuario</Label>
        <Input
          onChange={(e) => onChangeData(e.target.name, e.target.value)}
          type="text"
          id="usuario"
          name="usuario"
          placeholder="Usuario"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          onChange={(e) => onChangeData(e.target.name, e.target.value)}
          name="password"
          type="password"
          id="password"
          placeholder="Contraseña"
          required
        />
      </div>
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
