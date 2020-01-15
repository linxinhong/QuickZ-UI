import _ from 'lodash'

const state = {
    icons_fav: [],
    icons_search_history: []
}

const getters = {
    // icons_fav_list: state => {
    //     const default_fav = ['User\\icons\\*']
    //     return state.icons_fav ? [...default_fav, ...state.icons_fav] : default_fav
    // },
    config (state) {
        return {
            icons_search_history: state.icons_search_history
        }
    }
}

const mutations = {
    load(state, setting) {
        // state.icons_fav = setting.icons_fav_list
        state.icons_search_history = setting.icons_search_history 
    },
    icons_search_history_update(state, search) {
        if (state.icons_search_history) {
            state.icons_search_history.splice(0, 0, search)
            state.icons_search_history = _.uniq(state.icons_search_history)
            if (state.icons_search_history.length > 20) {
                state.icons_search_history.splice(20, 1)
            }
        }
        else {
            state.icons_search_history = [search]
        }
    },
    icons_search_history_clear(state) {
        state.icons_search_history = ''
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}