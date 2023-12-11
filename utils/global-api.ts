import axios from 'axios'

const sendEmail = (data: any) => axios.post('/api/send', data)

export { sendEmail }
