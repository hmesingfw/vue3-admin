import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import settings from './modules/settings'
import getters from './getters'

export default new Vuex.Store({
    modules: {
        app,
        user,
        tagsView,
        settings
    },
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters
})