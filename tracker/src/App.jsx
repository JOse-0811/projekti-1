import { useState, useEffect } from 'react'
import tietoservice from './servise/entries'
import styled from 'styled-components'

const App = () => {

  const [entries, setEntries] = useState([])
  
  useEffect(() => {
    tietoservice.getAll().then(response => {setEntries(response.data)})
  }, [])

  

  return (
    <Paivat>
      <h3>Viimeisimmät merkinnät</h3>
      {entries.map(paiva => <Laatikko key={paiva.id}>
        {paiva.date}
        mieliala: {paiva.mood}
      </Laatikko>
    )}
    </Paivat>
  )
}

const Paivat = styled.div`
  background-color: lavenderblush;
  margin: 35px;
  padding: 85px;
  padding-left: 25px;
  width: 500px;
`
const Laatikko = styled.p`
  background-color: pink;
  margin: 8px;
  padding: 20px;
  width: 490px;
`

export default App
