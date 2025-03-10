'use client'
import useSidebarStore from '@/app/store/sidebar'
import Icon from '@/components/LucideIcon'
import { cn } from '@/lib/utils'
import { ChevronDown, icons } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, useMemo, useState } from 'react'
type IconName = keyof typeof icons
interface menu {
  id: number
  descripcion: string
  icono: IconName
  url: string
  path: string
  submenus?: menu[]
}
interface props extends ComponentProps<'div'> {
  submenu?: boolean
  href?: string
  texto: string
  path: string
  icono: keyof typeof icons
  submenus: menu[] | undefined
}
export default function ItemSubmenu({
  texto,
  submenus,
  icono,
  path,
  ...rest
}: props) {
  const pathname = usePathname()
  const iconNames = useMemo(
    () => Object.keys(LucideIcons) as (keyof typeof LucideIcons)[],
    []
  )
  const [isDropOpen, setDropOpen] = useState(false)
  const toggleOpen = () => {
    setDropOpen((prev) => !prev)
  }

  const { isOpen } = useSidebarStore()
  const buscarIcono = (iconoBuscar: string) => {
    return iconNames.findIndex((elem) => elem === iconoBuscar) !== -1
      ? true
      : false
  }
  return (
    <div
      onClick={toggleOpen}
      /* onMouseLeave={closeDrop} */
      {...rest}
      className={
        'relative flex items-center gap-0 group/itemMenu ' +
        (isDropOpen && ' group/dropdownMenu ')
      }
    >
      {isOpen && (
        <div className="absolute  left-full invisible -z-10 group-hover/itemMenu:visible group-hover/itemMenu:z-50 -translate-x-1 group-hover/itemMenu:translate-x-0 duration-300 transition-all origin-center opacity-0 group-hover/itemMenu:opacity-100">
          <div className="bg-black dark:text-background dark:bg-gray-100 p-3 py-1.5  rounded-md text-white ml-1 border first-letter:uppercase text-sm whitespace-nowrap font-medium ">
            {texto}
          </div>
        </div>
      )}
      <div className="flex-1">
        <div
          className={
            'flex p-3  rounded-full cursor-pointer items-center gap-3 font-medium capitalize text-sm ' +
            (pathname.includes(path)
              ? ' bg-indigo-400/10 text-indigo-600 dark:bg-indigo-100/5 dark:text-indigo-400'
              : ' group-hover/itemMenu:bg-indigo-400/10 text-gray-400 group-hover/itemMenu:text-indigo-600 dark:text-gray-600 dark:group-hover/itemMenu:bg-indigo-100/5 dark:group-hover/itemMenu:text-indigo-400')
          }
        >
          <Icon name={icono} size={20} />

          {!isOpen && (
            <div className="">
              <span className="whitespace-nowrap">{texto}</span>
              <div
                className={cn(
                  'absolute top-3 right-2.5 -rotate-90 transition duration-150',
                  isDropOpen && 'rotate-0'
                )}
              >
                <ChevronDown size={20} strokeWidth={2.5} />
              </div>
            </div>
          )}
          {isOpen && (
            <div
              className={cn(
                'absolute top-8 -right-1.5 bg-gray-600/60 dark:bg-gray-50/20 text-gray-100 rounded-full p-0.5 -rotate-90 transition duration-150 dark:text-black',
                isDropOpen ? 'rotate-0 bg-gray-900 dark:bg-gray-200' : ''
              )}
            >
              <ChevronDown size={13} strokeWidth={3} />
            </div>
          )}
        </div>
        {/* dropdown */}

        {isOpen ? (
          <div
            onClick={(e) => e.stopPropagation()}
            id="dropfloat"
            className="absolute top-full flex-1 -mt-2 invisible group-hover/dropdownMenu:visible -z-10 group-hover/dropdownMenu:z-10 opacity-0 group-hover/dropdownMenu:opacity-100 -translate-y-2 group-hover/dropdownMenu:translate-y-0 duration-300 transition-all pointer-events-none group-hover/dropdownMenu:pointer-events-auto "
          >
            <div
              className={
                'relative whitespace-nowrap bg-white dark:bg-background   left-0 top-3  rounded-md border px-[18px] py-3 text-sm  capitalize font-medium  text-gray-500  cursor-default pr-2.5'
              }
            >
              <div className="flex flex-col gap-0.5 border-l-[1.5px] ">
                {/* items */}
                {submenus &&
                  submenus.map((item, index) => (
                    <Link
                      key={index}
                      onClick={(e) => e.stopPropagation()}
                      href={item.url}
                      className={
                        ' cursor-pointer px-3 py-2  pr-8 rounded-full  ml-4 relative flex items-center gap-3 ' +
                        (pathname.includes(item.path)
                          ? ' bg-indigo-800/5 text-black dark:bg-indigo-100/5 dark:text-indigo-400'
                          : 'hover:bg-indigo-800/5 hover:text-black dark:hover:bg-indigo-100/5 dark:hover:text-indigo-400 dark:text-gray-500')
                      }
                    >
                      {pathname.includes(item.path) && (
                        <span className="bg-black w-0.5 -left-4 h-4/6  absolute"></span>
                      )}
                      {item.icono && buscarIcono(item.icono) ? (
                        <Icon
                          name={
                            buscarIcono(item.icono)
                              ? (item.icono.trim() as IconName)
                              : 'Settings2'
                          }
                          size={17}
                          strokeWidth={2}
                        />
                      ) : (
                        <span className="bg-blue-600 w-[5px] h-[5px] rounded-full"></span>
                      )}
                      {item.descripcion}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            id="drop"
            className={
              'relative whitespace-nowrap bg-white dark:bg-transparent rounded-md pl-[20px] py-3 text-sm  capitalize font-medium  text-gray-500  cursor-default ' +
              (isDropOpen ? 'block' : 'hidden')
            }
          >
            <div className="flex flex-col gap-0.5 border-l-[1.5px] ">
              {/* items */}
              {submenus &&
                submenus.map((item, index) => (
                  <Link
                    key={index}
                    onClick={(e) => e.stopPropagation()}
                    href={item.url}
                    className={
                      ' cursor-pointer px-3 py-2  pr-8 rounded-full ml-3 relative flex items-center gap-3 ' +
                      (pathname.includes(item.path)
                        ? ' bg-indigo-800/5 text-black dark:bg-indigo-100/5 dark:text-indigo-400 '
                        : 'hover:bg-indigo-800/5 hover:text-black dark:hover:bg-indigo-100/5 dark:hover:text-indigo-400 dark:text-gray-500')
                    }
                  >
                    {pathname.includes(item.path) && (
                      <span className="bg-black dark:bg-indigo-500 w-0.5 -left-3 h-4/6  absolute"></span>
                    )}
                    {item.icono && buscarIcono(item.icono) ? (
                      <Icon
                        name={
                          buscarIcono(item.icono)
                            ? (item.icono.trim() as IconName)
                            : 'Settings2'
                        }
                        size={17}
                        strokeWidth={2}
                      />
                    ) : (
                      <span className="bg-blue-600 w-[5px] h-[5px] rounded-full"></span>
                    )}

                    {item.descripcion}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
