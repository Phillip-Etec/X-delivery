import axios from 'axios'

import config from './config'

const client = axios.create({

    baseURL: 'http://localhost:' + config.api_port + '',

    headers: {
        'Content-Type': 'application/json'
    }

})

export default client
