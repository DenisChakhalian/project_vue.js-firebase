import {createStore, createLogger} from 'vuex'
import auth from './modules/auth.module'
import request from './modules/request.module';

const plugins = []

if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger())
}

export default createStore({
    plugins,
    state() {
        return {
            message: null,
            error: null
        }
    },
    mutations: {
        setMessage(state, message) {
            state.message = message;
        },
        clearMessage(state) {
            state.message = null;
        },
        setError(state, message) {
            state.error = message;
        },
        clearError(state) {
            state.error = null;
        }
    },
    actions: {
        setMessage({commit}, message) {
            commit('setMessage', message)
            setTimeout(() => {
                commit('clearMessage')
            }, 5000)
        },
        setError({commit}, message) {
            commit('setError', message)
        }
    },
    modules: {
        auth,
        request
    }
})
