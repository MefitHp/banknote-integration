import axios from 'axios'

const url = 'http://localhost:5000'

export const createPayment = (payment) => {
    return axios.post(`${url}/payments/add`, payment)
        .then(r => r)
        .catch(e => e.response)
}

export const getPayments = (user) => {
    return axios.get(`${url}/payments/${user._id}`)
        .then(r => r)
        .catch(e => e.response)
}