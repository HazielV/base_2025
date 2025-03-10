'use client'
import { ModeToggle } from '@/components/ModeToggle'
import useAuth from '@/lib/auth'
import { LogOut, Menu } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import useSidebarStore from '@/store/sidebar'
interface Persona {
  nombres: string
  primerApellido: string
  segundoApellido: string
}
interface dataPersona {
  id: number
  usuario: string
  persona: Persona
}
export default function Header({
  dataPersona = null,
}: {
  dataPersona: dataPersona | null
}) {
  const { logout } = useAuth()
  const { toggle } = useSidebarStore()
  const [open, setOpen] = useState(false)

  return (
    <div className=" bg-white print:hidden  dark:dark:bg-[#15161A] px-8 py-4  flex justify-between   border-b darkborder-white/5">
      <button onClick={toggle} className="outline-none">
        <Menu />
      </button>
      <div className="flex items-center gap-1">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" variant="outline" size="icon">
              {dataPersona
                ? `${dataPersona.persona.nombres.at(
                    0
                  )}${dataPersona.persona.primerApellido.at(0)}`
                : 'AA'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuLabel>
              {dataPersona
                ? `${dataPersona.persona.nombres} ${dataPersona.persona.primerApellido}`
                : 'AA'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuItem>Configuraciones</DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => logout()}
              className="flex justify-between cursor-pointer"
            >
              <span>Cerrar sesion</span>
              <LogOut size={16} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </div>
    </div>
  )
}
