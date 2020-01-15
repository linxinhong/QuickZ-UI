import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import api from './api'
import menuz from './modules/menuz'
import setting from './modules/setting'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        config: {}
    },

    getters: {
    },

    actions: {
       async loadconfig( { commit, state })  {
            await Axios.get(api.config).then((resp) => {
                state.config = resp.data
                commit('menuz/load_list', state.config.menuz)
                commit('setting/load', state.config.setting)
            }).catch((err) => {
                window.console.log(err)
            })
       },

       async dumpconfig({state, getters}) {
            const qzconfig = {
                menuz: state.menuz.list,
                setting: getters['setting/config']
            }
            const resp = await Axios({
              method: 'POST',
              url: api.config,
              data: qzconfig
            })
            window.console.log(resp.status)
       }
    },

    modules: {
        menuz,
        setting,
    }
})

export default store