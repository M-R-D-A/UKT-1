import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div className="h-auto pointer-events-none select-none">
        <img className={loading ? '' : 'hidden'} src="/images/home.jpg" alt="page" onLoad={() => setLoading(true)}/>
      </div>
    </>
  )
}
