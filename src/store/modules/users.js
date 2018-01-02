import axios from 'axios';
import config from '../config'
import router from '../../router/index'
export default {
    state: {
        tokens: {
            access_token: null,
            expires_in: null,
            refresh_token: null,
            token_type: null
        },
        authenticatedUser: {
            id: null,
            name: null,
            email: null,
            picture: null,
            created_at: null,
            updated_at: null,
        }
    },

    mutations: {
        UPDATE_TOKENS(state, tokens){
            state.tokens = tokens
        },
        DESTROY_TOKENS(state){
            state.tokens.access_token = null,
            state.tokens.expires_in = null,
            state.tokens.refresh_token = null,
            state.tokens.token_type = null,

            state.authenticatedUser.id = null,
            state.authenticatedUser.name = null,
            state.authenticatedUser.email = null,
            state.authenticatedUser.picture = null,
            state.authenticatedUser.created_at = null,
            state.authenticatedUser.updated_at = null

        },
        SET_AUTH_USER(state, authUser){
            state.authenticatedUser = authUser
        },
    },

    actions: {
        login(state, loginDetails){
            return new Promise((resolve, reject) => {
                let data = {
                    grant_type: 'password',
                    client_id: 2,
                    client_secret: 'BaPLoB7xK3iyMeaErx9jSQo9mx6uSnbKnh5wGGlH',
                    username: loginDetails.email,
                    password: loginDetails.password,
                    remember: loginDetails.remember,
                    scope: ''
                };
                axios[config.loginMethod](config.apiUrl + config.loginRequest, data)
                    .then(response => {
                        let responseData = response.data;
                        let now = Date.now();

                        responseData.expires_in = responseData.expires_in + now;
                        state.commit('UPDATE_TOKENS', responseData);

                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })

            })
        },
        setAuthenticatedUser({commit, getters}) {
            return new Promise((resolve, reject) => {
                axios[config.getUserMethod](config.apiUrl + config.getUserRequest, {headers: getters.getHeader})
                    .then(response => {
                        let authUser = response.data;
                        commit('SET_AUTH_USER', authUser);
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        logout(state) {
            let redirect = '/';

            state.commit('DESTROY_TOKENS');
            router.push(redirect);
        },
        register(state, registerDetails){
            return new Promise((resolve, reject) => {
                axios[config.registerMethod](config.apiUrl + config.registerRequest, registerDetails)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })

            })
        },
    },

    getters: {
        getToken(state) {
                let token = state.tokens.access_token;
                let expiration = state.tokens.expires_in;

                if ( !token || !expiration ) {
                    return null
                }
                if (Date.now() > parseInt(expiration)) {
                    /* Arreglar esto! */
                    state.commit('DESTROY_TOKENS');
                    return null
                } else {
                    return token
                }
        },
        isAuthenticated(state, getters) {
            if (getters.getToken) {
                return true
            } else {
                return false
            }
        },
        getHeader(state, getters) {
            let header = {
                'Aceept': 'application/json',
                'Authorization': 'Bearer ' + getters.getToken
            };
            return header
        },
        getAuthenticatedUser(state) {
            return state.authenticatedUser
        },
    },
}