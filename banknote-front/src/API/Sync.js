import axios from 'axios'
const url = 'https://sync.paybook.com/v1'
const api_key_url = '?api_key=dd891f88f7b38e9483e865780076459f'
const api_key = "dd891f88f7b38e9483e865780076459f"


export const getAccouts = (id_user, token) => {
    return axios.get(`${url}/accounts?id_user=${id_user}&api_key=${api_key}&token=${token}`)
        .then(r => r)
        .catch(e => e.response)
}


export const createSyncUser = (dbUser) => {
    const { email } = dbUser
    return axios.post(url + '/users' + api_key_url, { name: email, api_key: api_key })
        .then(r => r)
        .catch(e => e.response)
}

export const initUserSession = (id_user) => {
    return axios.post(url + '/sessions' + api_key_url, { api_key: api_key, id_user: id_user })
        .then(response => {
            return response
        })
}

export const getTransactions = (id_credential, token) => {
    return axios.get(`${url}/transactions?id_credential=${id_credential}&api_key=${api_key}&token=${token}`)
        .then(r => r)
        .catch(e => e.response)
}