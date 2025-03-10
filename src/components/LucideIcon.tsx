'use client'
import { icons } from 'lucide-react'
type IconName = keyof typeof icons
interface props {
  name: IconName
  size?: number
  strokeWidth?: string | number | undefined
}
export default function Icon({ name, size = 24, strokeWidth = 2 }: props) {
  const LucideIcon = icons[name]

  return <LucideIcon size={size} strokeWidth={strokeWidth} />
}
