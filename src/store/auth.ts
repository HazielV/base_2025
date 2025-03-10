import { create } from 'zustand'
import Cookies from 'js-cookie'
interface PropiedadesType {
  icono?: string
  descripcion?: string
  orden: number
}

type SubModuloType = {
  id: string
  label: string
  url: string
  nombre: string
  propiedades: PropiedadesType
  estado: string
}

type ModuloType = {
  id: string
  label: string
  url: string
  nombre: string
  propiedades: PropiedadesType
  estado: string
  subModulo: SubModuloType[]
}

interface RoleType {
  idRol: string
  rol: string
  nombre: string
  modulos: ModuloType[]
}

interface PersonaType {
  nombres: string
  primerApellido: string
  segundoApellido: string
  tipoDocumento: string
  nroDocumento: string
  fechaNacimiento: string
}

interface UsuarioType {
  access_token: string
  id: string
  usuario: string
  ciudadania_digital: boolean
  estado: string
  roles: RoleType[]
  persona: PersonaType
  idRol: string
}

// Estado global con Zustand
interface UsuarioState {
  user: UsuarioType | null
  setUser: (user: UsuarioType) => void
  clearUser: () => void
}
const useAuthStore = create<UsuarioState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user })
    Cookies.set('token', user.access_token)
  },
  clearUser: () => set({ user: null }),
}))

export default useAuthStore
