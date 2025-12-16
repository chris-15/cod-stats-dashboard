import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      hello world
      <Button variant="destructive" onClick={() => console.log('clicked')}>
        Click me
      </Button>
    </div>
  )
}
