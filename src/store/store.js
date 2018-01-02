import Vue from 'vue';
import Vuex from 'vuex';

/* Persisted State */
import createPersistedState from 'vuex-persistedstate'

/* Modules */
import Users from './modules/users'

Vue.use(Vuex);

/* DEBUG MODE */
const debug = process.env.NODE_ENV !== 'production';

/* MODULES */
const ModuleUsers = Users;

export const store = new Vuex.Store({
    modules: {
        users: ModuleUsers,
    },

    plugins: [
        createPersistedState({
            key: 'AppName',
            paths: [
                'users.tokens',
                'users.theme'
            ],
        })
    ],
    strict: false, /* use debug without persisted */
});