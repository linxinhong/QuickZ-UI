import Vue from 'vue'
import Vuex from 'vuex'
import { replaceIcon, walk_by_mark, } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuz: {},
        menuz_select_item: ''
    },
    getters: {
        menuz_with_icon: state => {
            let newMenu = []
            state.menuz.forEach(item => {
                newMenu.push(replaceIcon(item))
            });
            return newMenu
        },
        menuz_item_by_mark (state) {
            return walk_by_mark(state.menuz, state.menuz_select_item)
        },
    },
    mutations: {
        loadconfig (state, config) {
            state.menuz = config.menuz
        },
        menuz_select_item_mark (state, keyIndex) {
            state.menuz_select_item = keyIndex
        },
        menuz_select_item_update (state, itemObject) {
            window.console.log(state)
            window.console.log(itemObject)
        }
    }
})

export default store