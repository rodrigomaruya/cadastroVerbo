import axios from 'axios'

const api=axios.create({
	baseURL:'https://api-verbos.vercel.app'
})

export default api