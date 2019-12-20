import { replaceIcon, walk_by_mark, copyItem, } from './utils'

const state = {
    menuz: {},
    menuz_select_item: '',
    menuz_select_pos: '',
}

const getters = {
    menuz_with_icon: state => {
        let newMenu = []
        state.menuz.forEach(item => {
            newMenu.push(replaceIcon(item))
        });
        return newMenu
    }
}

const mutations = {
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

export default {
    state,
    getters,
    mutations,
}