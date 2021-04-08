import { useState, useEffect } from 'react'
import PlayButton from './components/buttons/PlayButton'

function App() {
  let [count, setCount] = useState(0)

  useEffect(() => {
    console.log(`side effect and ${count}`)
  }, [count])

  const handleClick = (e) => {
    if (e.target.id === 'increment') setCount((count += 1))
    if (e.target.id === 'decrement') setCount((count -= 1))
  }

  return (
    <div className='App'>
      <PlayButton />
    </div>
  )
}

export default App
