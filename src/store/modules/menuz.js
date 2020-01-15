import Vue from 'vue'
import { replace_icon, walk_by_mark, copy_list } from '../utils'

const state = {
    list: [],
    list_select_pos: [],
    list_edit_item: {}
}

const getters = {
    list_with_icon: state => {
        return copy_list(state.list, (newItem) => {
            newItem.icon = replace_icon(newItem.hasOwnProperty('icon') ? newItem.icon : "")
            return newItem
        })
    },

    select_item: state => {
        var menu = []
        walk_by_mark(state.list, state.list_select_pos, function (existMenu) {
            menu = copy_list([existMenu], (newItem) => {
                return newItem
            })
        })
        return menu[0]
    }
}

const mutations = {
    load_list(state, ml) {
        state.list = ml 
    },

    change_select_pos(state, pos) {
        state.list_select_pos = pos
    },

    change_edit_item_icon(state, icon) {
        state.list_edit_item.icon = icon
    },

    change_edit_item_name(state, name) {
        state.list_edit_item.name = name
    },

    change_edit_item_exec(state, name) {
        state.list_edit_item.exec = name
    },

    change_edit_item_param(state, name) {
        state.list_edit_item.param = name
    },

    save_edit_item(state) {
        walk_by_mark(state.list, state.list_select_pos, function (existMenu, parentMenu, existpos) {
            var m = copy_list([state.list_edit_item], (item) => {
                return item
            })
            parentMenu.splice(existpos, 1, m[0])
        })
    },
    
    insert_item(state, data) {
        walk_by_mark(state.list, data.pos, function (existMenu, parentMenu, existpos) {
            parentMenu.splice(existpos, 0, data.item)
        })
    },

    insert_item_sub(state, data) {
        const posList = state.list_select_pos[0].split('-')
        walk_by_mark(state.list, data.pos, function (existMenu) {
            const subMenu = existMenu.hasOwnProperty('sub') ? existMenu.sub : []
            subMenu.push(data.item)
            Vue.set(existMenu, 'sub', subMenu)
            posList.push(subMenu.length - 1)
            state.list_select_pos = [posList.join('-')]
        })
    },

    delete_item(state, data) {
        const posList = state.list_select_pos[0].split('-')
        walk_by_mark(state.list, data.pos, function (existMenu, parentMenu, existpos) {
            parentMenu.splice(existpos, 1)
            if (existpos >= parentMenu.length) {
                if (parentMenu.length == 0) {
                    posList.splice(posList.length - 1 , 1)
                }
                else {
                    posList[posList.length - 1] = parentMenu.length - 1
                }
                state.list_select_pos = [posList.join('-')]
            }
        })
    },
}

const actions = {
    change_edit_item({state, getters}) {
        state.list_edit_item =  getters.select_item
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}