import { ComponentProps, useId } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { LucideAlertTriangle } from 'lucide-react'

interface props extends ComponentProps<'input'> {
  error?: Record<string, string[]> | null
  label?: string
  Icono?: JSX.Element
}

export default function InputGroup({
  label,
  Icono,
  name = '',
  error,
  children,
  ...rest
}: props) {
  const id = useId()
  return (
    <div className="flex flex-col gap-2 h-auto relative">
      <Label
        data-required={rest.required}
        className='relative data-[required=true]:after:content-["*"] data-[required=true]:after:absolute data-[required=true]:after:-mt-[7px] data-[required=true]:after:ml-0.5 data-[required=true]:after:text-red-500 data-[required=true]:after:text-xl data-[required=true]:after:font-semibold '
        htmlFor={id}
      >
        {label}
      </Label>
      <div className="relative">
        {children ? (
          children
        ) : (
          <Input
            name={name}
            id={id}
            {...rest}
            className={cn(
              'p-2.5 px-4 h-auto rounded-lg dark:placeholder-shown:bg-background placeholder-shown:bg-transparent disabled:bg-gray-200 data-[disabled=true]:bg-gray-200 data-[disabled=true]:border dark:data-[disabled=true]:bg-opacity-15  data-[disabled=true]:border-gray-400 dark:disabled:bg-gray-50',
              Icono && 'peer ps-9',
              error &&
                error[name] &&
                ' ring-[1px] ring-red-500 dark:ring-1 dark:ring-red-400'
            )}
          />
        )}
        {Icono && (
          <div className="text-muted-foreground/60 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 peer-focus:text-gray-600">
            {Icono}
          </div>
        )}
        {error && error[name] && (
          <div className="text-xs absolute -bottom-4 font-semibold text-red-600 first-letter:capitalize dark:text-red-400 right-0 ">
            {error[name][0]}
          </div>
        )}
        {error && error[name] && (
          <div className="absolute top-2.5 right-3 text-red-600 dark:text-red-400">
            <LucideAlertTriangle />
          </div>
        )}
      </div>
    </div>
  )
}
