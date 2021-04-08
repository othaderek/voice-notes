import { useState, useEffect } from 'react'

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
      <marquee behavior='' direction=''>
        <>{count}</>
      </marquee>
      <button id='increment' onClick={handleClick}>
        increment
      </button>
      <button id='decrement' onClick={handleClick}>
        decrement
      </button>
    </div>
  )
}

export default App
