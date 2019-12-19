import Vue from 'vue'
import Vuex from 'vuex'
import { replaceIcon, walk_by_mark, copyItem, } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuz: {},
        menuz_select_item: '',
        menuz_select_pos: ''
    },
    getters: {
        menuz_with_icon: state => {
            let newMenu = []
            state.menuz.forEach(item => {
                newMenu.push(replaceIcon(item))
            });
            return newMenu
        }
    },
    mutations: {
        loadconfig (state, config) {
            state.menuz = config.menuz
        },
        menuz_select_item_mark (state, keyIndex) {
            state.menuz_select_pos = keyIndex
            state.menuz_select_item = walk_by_mark(state.menuz, state.menuz_select_pos)
        },
        menuz_select_item_update (state, itemObject) {
            copyItem(itemObject, state.menuz_select_item)
        }
    }
})

export default store