import Header from '../_components/header'
import Sidebar from '../_components/sidebar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen w-screen flex print:p-5">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-[#f7f7f7] dark:bg-[#070707] overflow-hidden print:text-black">
        <Header dataPersona={null} />
        {children}
      </main>
    </div>
  )
}
