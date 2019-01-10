import axios from 'axios'

const url = 'https://banknote.herokuapp.com'

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

export const deletePaymentAPI = (id) => {
    return axios.delete(`${url}/payments/delete/${id}`)
        .then(r => r)
        .catch(e => e.response)
}