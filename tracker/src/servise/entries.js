import axios from 'axios'
    const baseUrl = 'http://localhost:3001/entries'

const getAll = () => {
    return axios.get(baseUrl)
}

const lisaa = (tiedot) => {
    return axios.post(baseUrl, tiedot)
}

export default {
    getAll: getAll,
    lisaa: lisaa
}