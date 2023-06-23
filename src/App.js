import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [flag, setFlag] = useState(null)
  const [items, setItems] = useState([])
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    fetch('https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/70726f')
      .then((response) => response.text())
      .then((text) => setFlag(text))
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    let i = 0
    const timeId = setInterval(() => {
      const itemsToSet = flag.split('').slice(0, i)
      setItems(itemsToSet)
      i += 1
    }, 500)
    setIntervalId(timeId)
    return () => {
      clearInterval(timeId)
    }
  }, [flag])

  useEffect(() => {
    if (intervalId && items?.length >= flag?.length) clearInterval(intervalId)
  }, [items, intervalId, flag])

  return (
    <div className='App'>
      <header className='App-header'>
        {flag && items ? (
          <ul>
            {items.map((each) => (
              <li key={each}>{each}</li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  )
}

export default App
