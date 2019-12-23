const state = {
    name: '',
    icon: '',
    filter: '',
    exec: '',
    param: ''
}

const mutations = {
    update (state, itemObject) {
        state.name = itemObject.name
        state.icon = itemObject.icon
        state.filter = itemObject.filter
        state.exec = itemObject.exec
        state.param = itemObject.param
    },

    update_name(state, newname) {
        state.name = newname
    },

    update_icon(state, newicon) {
        state.icon = newicon
    },
    update_filter(state, newfilter) {
        state.filter = newfilter
    },
    update_exec(state, newexec) {
        state.exec = newexec
    },
    update_param(state, newparam) {
        state.param = newparam
    }
}

export default {
    namespaced: true,
    state,
    mutations
}