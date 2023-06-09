import Header from "./header"
import Footer from "./footer"
import type { ReactNode } from "react"
import { useSession } from "next-auth/react"

export default function Layout({ children }: { children: ReactNode }) {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex flex-col justify-between">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    )
  }

  return (
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
  )
}
