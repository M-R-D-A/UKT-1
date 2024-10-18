import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const [loading, setLoading] = React.useState(false)
  return (
    <>
      <div className="h-auto pointer-events-none select-none">
        <img className={loading ? '' : 'hidden'} src="/images/home.jpg" alt="page" onLoad={() => setLoading(true)}/>
      </div>
    </>
  )
}
