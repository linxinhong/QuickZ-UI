import Vue from 'vue'
import Vuex from 'vuex'
import { replaceIcon, walk_by_mark, copyItem, insert_to, } from './utils'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuz: {},
        vimd: {},
        gesturez: {},
        var: {},
        plugins: {},
        setting: {},

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
        },

        dumpconfig (state) {
            return {
                menuz: state.menuz,
                vimd: state.vimd,
                gesturez: state.gesturez,
                var: state.var,
                plugins: state.plugins,
                setting: state.setting
            }
        },
    },
    mutations: {
        loadconfig (state, config) {
            state.menuz = config.menuz
            state.vimd = config.vimd
            state.gesturez = config.gesturez
            state.var = config.var
            state.plugins = config.plugins
            state.setting = config.setting
        },

        menuz_select_item_mark (state, keyIndex) {
            state.menuz_select_pos = keyIndex
            state.menuz_select_item = walk_by_mark(state.menuz, state.menuz_select_pos[0])
        },

        menuz_select_item_update (state, itemObject) {
            copyItem(itemObject, state.menuz_select_item)
        },

        // menuz_insertTo (state, keyIndex, itemObject) {

        // },

        menuz_dropToGap (state, pos) {
            let dragItems = []
            pos.drag.forEach(pos => {
                dragItems.push(walk_by_mark(state.menuz, pos))
            })
            insert_to(state.menuz, pos.drop, dragItems)
        },

        // menuz_dropToSub (state, drag, drop) {
        //     let dragItem = walk_by_mark(state.menuz, [drag])
        //     let dropItem = walk_by_mark(state.menuz, [drop])
        //     window.console.log(dragItem)
        //     window.console.log(drop)
        //     window.console.log(dropItem)
        // }
    }
})

export default store