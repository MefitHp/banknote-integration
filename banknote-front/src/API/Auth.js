import axios from 'axios'
import { createSyncUser, initUserSession } from './Sync';
const urlBack = 'https://banknote.herokuapp.com/api'

export const loginUser = (user) => {
    return axios.post(urlBack + '/login', user, { withCredentials: true })
        .then(userRes => {
            if (userRes.status === 200) {
                return initUserSession(userRes.data.id_user)
                    .then(tokenObject => {
                        const { token } = tokenObject.data.response
                        userRes.data.token = token
                        return userRes
                    })
            }
            else return userRes
        })
        .catch(e => e.response)
}

export const updateUser = (_id, id_user) => {
    return axios.post(urlBack + '/update/', { _id, id_user })
        .then(r => {
            console.log('updateUser:', r)
            return r
        })
        .catch(e => e.response)
}

export const signupUser = (user) => {
    return axios.post(urlBack + '/signup', user)
        .then(userRes => {
            if (userRes.status === 201) {
                return createSyncUser(userRes.data)
                    .then(syncRes => {
                        if (syncRes.data.code === 200) {
                            const { _id } = userRes.data
                            const { id_user } = syncRes.data.response
                            return updateUser(_id, id_user)
                                .then(updatedRes => {
                                    if (updatedRes.status === 200) return updatedRes
                                })
                                .catch(e => e.response)
                        }
                    }).catch(e => e.response)
            }
        })
        .catch(e => e.response)
}

export const logoutUser = () => {
    return axios.get(urlBack + '/logout')
        .then(r => r)
        .catch(e => e.response)
}
