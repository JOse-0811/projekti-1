import axios from 'axios'
    const baseUrl = 'http://localhost:3001/entries'

const getAll = () => {
    return axios.get(baseUrl)
}



export default {
    getAll: getAll
}