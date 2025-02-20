import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden grid  place-items-center">
      <div>
        <p>Bienvenido a LigasBol</p>
        <div className="flex gap-2">
          <button className="inline-flex p-1.5 px-3 rounded-lg bg-blue-600 text-white">
            <Link href={'login'}>login</Link>
          </button>
          <button className="inline-flex p-1.5 px-3 rounded-lg bg-purple-600 text-white">
            <Link href={'admin'}>admin</Link>
          </button>
        </div>
      </div>
    </div>
  )
}
