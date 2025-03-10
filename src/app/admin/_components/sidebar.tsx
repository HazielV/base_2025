'use client'
import useSidebarStore from '@/store/sidebar'
import ItemMenu from './ItemMenu'
import ItemSubmenu from './ItemSubmenu'

import Image from 'next/image'

export default function Sidebar() {
  const { isOpen } = useSidebarStore()

  return (
    <div
      id="elemento"
      data-sidebar={isOpen}
      className="z-30  px-3.5 fixed transition-all duration-300 bg-white w-60 h-screen  data-[sidebar=true]:-translate-x-full md:data-[sidebar=true]:translate-x-0 md:data-[sidebar=true]:w-[72px] md:relative md:data-[sidebar=false]:w-60 flex flex-col gap-8 py-5 dark:bg-[#15161A] border-r darkborder-white/5 print:hidden   "
    >
      <div className="flex items-center gap-4 w-full justify-center">
        <div className="relative w-[43px] h-[43px]  overflow-hidden">
          <Image alt="logo-trans" src={'/logo_renal.png'} fill />
        </div>
        {!isOpen && (
          <div className="font-medium leading-4 grid">
            <span className="font-medium leading-4 whitespace-nowrap">
              Sistema de
            </span>
            <span className="font-medium leading-4">trasplantes</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between h-full relative after:-inset-3 after:absolute after:border-t after:-top-3 after:-left-2 after:h-0 after:dark:border-white/5 ">
        <ul className="grid gap-1.5 ">
          <ItemMenu
            href={'/admin'}
            icono={'House'}
            texto={'Inicio'}
            path="/admin"
            exact={true}
          />
          {/* {rolElegido &&
            rolElegido.modulos.map((modulo, index) => (
              <ItemSubmenu
                path={modulo.nombre.toLocaleLowerCase()}
                key={index}
                submenus={modulo.subModulo.map((submod) => ({
                  id: Number(submod.id),
                  descripcion: submod.label || 'des',
                  icono: (submod.propiedades.icono as IconName) || 'File',
                  url: `/admin/${modulo.nombre.toLocaleLowerCase()}/${
                    submod.url.split('/')[2]
                  }`,
                  path: (() => {
                    return `${modulo.nombre.toLocaleLowerCase()}/${
                      submod.url.split('/')[2]
                    }`
                  })(),
                }))}
                texto={modulo.label}
                icono={
                  (modulo.propiedades.icono as IconName) || 'LayoutDashboard'
                }
              />
            ))} */}
        </ul>
      </div>
    </div>
  )
}
