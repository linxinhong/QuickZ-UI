import Vue from 'vue'
import Vuex from 'vuex'
import itemeditor from './modules/itemeditor'
import { replaceIcon, walk_by_mark, copy_to_item, } from './utils'
import _ from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuz: {},
        vimd: {},
        gesturez: {},
        var: {},
        plugins: {},
        setting: {},

        menuz_select_item: {},
        menuz_select_pos: '', 
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
            walk_by_mark(state.menuz, state.menuz_select_pos, function (existMenu) {
                state.menuz_select_item = existMenu
            })
        },

        menuz_select_item_dragdrop (state, dd) {
            walk_by_mark(state.menuz, dd.dragKey, function(dragItem, dragMenu, dragPos) {
                if (!dragItem.hasOwnProperty("sub")) {
                    dragMenu.splice(dragPos, 1, { mark: "need_to_delete" });
                    walk_by_mark(state.menuz, dd.dropKey, function(dropItem, dropMenu, dropPos) {
                        let insertPos = dd.dropPosition === -1 ? dropPos : dropPos + 1;
                        dropMenu.splice(insertPos, 0, dragItem);
                    });
                    dragMenu.splice(_.findIndex(dragMenu, { mark: "need_to_delete" }), 1);
                }
            });
        },

        menuz_select_item_update (state, itemObject) {
            copy_to_item(itemObject, state.menuz_select_item)
        },

        menuz_select_item_insert (state, itemObject) {
            walk_by_mark(state.menuz, state.menuz_select_pos, function (existMenu, parentMenu, existPos) {
                const posList = state.menuz_select_pos.split("-");
                posList[posList.length-1] = Number(posList[posList.length-1]) + 1;
                parentMenu.splice(existPos + 1, 0, itemObject)
                state.menuz_select_pos = posList.join('-')
                state.menuz_select_item = itemObject
            })
        },

        menuz_select_item_insert_subitem (state, itemObject) {
            walk_by_mark(state.menuz, state.menuz_select_pos, (existMenu) => {
                const posList = state.menuz_select_pos.split("-");
                var subMenu = existMenu.hasOwnProperty('sub') ? existMenu.sub : []
                subMenu.push(itemObject)
                Vue.set(existMenu, 'sub', subMenu)
                posList.push(existMenu.sub.length-1)
                state.menuz_select_pos = posList.join('-')
                state.menuz_select_item = itemObject
            })
        },

        menuz_select_item_delete (state) {
            walk_by_mark(state.menuz, state.menuz_select_pos, (existMenu, parentMenu, existPos) => {
                parentMenu.splice(existPos, 1)
            })
        },

    },

    modules: {
        itemeditor
    }

})

export default store