'use client'
import useSidebarStore from '@/store/sidebar'
import Icon from '@/components/LucideIcon'
import { icons } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, useMemo } from 'react'

interface props extends ComponentProps<'div'> {
  submenu?: boolean
  href: string
  texto: string
  path: string
  icono: keyof typeof icons
  exact?: boolean
}
export default function ItemMenu({
  texto,
  href,
  path,
  icono,
  exact = false,
  ...rest
}: props) {
  const pathname = usePathname()
  const iconNames = useMemo(
    () => Object.keys(LucideIcons) as (keyof typeof LucideIcons)[],
    []
  )
  const { isOpen } = useSidebarStore()
  const buscarIcono = (iconoBuscar: string) => {
    return iconNames.findIndex((elem) => elem === iconoBuscar) !== -1
      ? true
      : false
  }
  return (
    <div
      {...rest}
      className={'relative flex items-center gap-0 group/itemMenu '}
    >
      {isOpen && (
        <div className="absolute  left-full invisible -z-10 group-hover/itemMenu:visible group-hover/itemMenu:z-50 -translate-x-1 group-hover/itemMenu:translate-x-0 duration-300 transition-all origin-center opacity-0 group-hover/itemMenu:opacity-100">
          <div className="bg-black dark:text-background dark:bg-gray-100 p-3 py-1.5  rounded-md text-white ml-1 border first-letter:uppercase text-sm whitespace-nowrap font-medium ">
            {texto}
          </div>
        </div>
      )}
      <Link href={href} className="w-full">
        <div
          className={
            'flex p-3  rounded-full cursor-pointer items-center gap-3 font-medium capitalize text-sm ' +
            ((exact ? pathname === path : pathname.includes(path))
              ? ' bg-indigo-400/10 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300'
              : ' group-hover/itemMenu:bg-indigo-400/10 text-gray-400 group-hover/itemMenu:text-indigo-600 dark:text-indigo-200/50 dark:group-hover/itemMenu:bg-indigo-500/10 dark:group-hover/itemMenu:text-indigo-300')
          }
        >
          {icono && buscarIcono(icono) && (
            <Icon
              name={
                buscarIcono(icono)
                  ? (icono.trim() as keyof typeof icons)
                  : 'LayoutDashboard'
              }
              size={20}
              strokeWidth={2}
            />
          )}

          {!isOpen && <span className=""> {texto}</span>}
        </div>
      </Link>
    </div>
  )
}
