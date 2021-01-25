import axios from 'axios'

const instance=axios.create({     
       // baseURL:'http://localhost:8000',
       baseURL:' https://56b1f2cab7e1.ngrok.io',
})

export default instance;