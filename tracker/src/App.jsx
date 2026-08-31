import { useState, useEffect } from 'react'
import tietoservice from './servise/entries'
import styled from 'styled-components'

const App = () => {

  const [entries, setEntries] = useState([])

  const [paiva, setPaiva] = useState (
    new Date().toISOString().split('T')[0] 
  )

  const [mieliala, setMieliala] = useState(4)
  const [uni,setUni] = useState(">8")

  const mielialanVaihtoehdot = [1,2,3,4]
  const uniVaihtoehdot = ["<5", "5-6", "6-7", "7-8", ">8"]
  
  useEffect(() => {
    tietoservice.getAll().then(response => {setEntries(response.data)})
  }, [])

  const lisaa = (event) => {
    event.preventDefault()
    const uusiTieto = {date: paiva, mood: mieliala, sleep: uni}
    tietoservice.lisaa(uusiTieto).then(response => setEntries(entries.concat(response.data)))
  }

  

  return (
    <Sivu>
      <Uusi>
      <form onSubmit={lisaa}>
        <h3>Mille päivällehaluat lisätä merkinnän</h3>
        <PaivaMaara type="date" value={paiva} onChange={event => setPaiva(event.target.value)}/>

        <h3>Millainen mieliala sinulla on tänään?</h3>
          <Napit>
            {mielialanVaihtoehdot.map(vaihtoEhto => <MielialaUni key={vaihtoEhto} type="button" onClick={() => setMieliala(vaihtoEhto)}>{vaihtoEhto}</MielialaUni>)}
          </Napit>
        
        <h3>Kuinka monta tuntia nukuin viime yönä</h3>
          <Napit>
            {uniVaihtoehdot.map(vaihtoEhto => <MielialaUni key={vaihtoEhto} type="button" onClick={() => setUni(vaihtoEhto)}>{vaihtoEhto}</MielialaUni>)}
          </Napit>
          <br/>
          <Lisaa type="submit">Lisää</Lisaa>
      </form>
      </Uusi>

    <Paivat>
      <h3>Viimeisimmät merkinnät</h3>
      {entries.map(paiva => <Laatikko key={paiva.id}>
        <p>{paiva.date}</p>
        <p>mieliala: {paiva.mood}</p>
        <p>uni: {paiva.sleep}</p>
      </Laatikko>
    )}
    </Paivat>
    </Sivu>
  )
}

const Sivu = styled.div`
  display: flex;
  padding: 30px;
`

const Uusi = styled.div`
  background-color: lavenderblush;
  width: 430px;
  padding: 20px;
`

const Paivat = styled.div`
  background-color: lavenderblush;
  margin-left: auto;
  padding: 55px;
  padding-left: 25px;
  padding-right: 20px;
  padding-top: 30px;
  width: 650px;
  
`
const Laatikko = styled.div`
  display: flex;
  background-color: pink;
  margin: 8px;
  padding: 7px;
  justify-content: space-between;
  border-radius: 6px;
`
const PaivaMaara = styled.input`
  border: 3px solid pink;
  border-radius: 3px;
`
const Napit = styled.div`
 display: flex;
 gap: 3px;
`
const MielialaUni = styled.button`
  background-color: MediumTurquoise;
  border: 2px solid pink;
  border-radius: 5px;
  font-family: 'Brush Script MT', cursive;

`
const Lisaa = styled.button`
  background-color: pink;
  border: 2px solid pink;
  border-radius: 2px;
`


export default App
