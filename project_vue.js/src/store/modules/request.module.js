import axios from "../../axios/request";
import store from "../index";
import http_helper from "../../axios/request";
import {useStore} from "vuex";
// import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
        }
    },
    actions: {
        async create({commit, dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/posts.json?auth=${token}`, payload)
                commit('addRequest', {
                    ...payload,
                    id: data.name
                })
                dispatch('setMessage', {
                    value: 'Публікація була створена!',
                    type: 'alert-success'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'alert-danger'
                }, {root: true})
            }
        },
        async load({commit, dispatch}) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/posts.json?auth=${token}`)
                const requests = Object.keys(data).map(id => ({...data[id], id}))
                    .sort((a,b) => new Date(b.date) - new Date(a.date))
                commit('setRequests', requests)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'alert-danger'
                }, {root: true})
            }
        },
        async loadOne({dispatch}, id) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/posts/${id}.json?auth=${token}`)
                return data
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'alert-danger'
                }, {root: true})
            }
        },
        async remove({dispatch}, id) {
            try {
                const token = store.getters['auth/token']
                await axios.delete(`/posts/${id}.json?auth=${token}`)
                dispatch('setMessage', {
                    value: 'Публікацію було видалено!',
                    type: 'alert-success'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'alert-danger'
                }, {root: true})
            }
        },
        async update({dispatch}, request) {
            try {
                const token = store.getters['auth/token']
                await axios.put(`/posts/${request.id}.json?auth=${token}`, request)
                dispatch('setMessage', {
                    value: 'Публікацію було змінено!',
                    type: 'alert-success'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'alert-danger'
                }, {root: true})
            }
        }
    },
    getters: {
        requests(state) {
            return state.requests
        }
    }
}
