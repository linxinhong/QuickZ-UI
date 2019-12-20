<template>
  <div id="app">
    <a-layout id="layout-main">
      <a-layout-header :style="{padding: '0 20px'}">
        <a-row>
          <a-col :span="12">
            <span class="title">
              <img src="./assets/favicon.png" :style="{height: '1.2em', margin: '5px 5px 8px'}" />QuickZ
            </span>
          </a-col>
          <a-col :span="12" id="layout-button">
            <a-button type="primary" icon="reload" @click="apply_config">重新加载QuickZ</a-button>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="120" style="background: #fff">
          <a-menu
            mode="inline"
            :defaultSelectedKeys="['1']"
            :defaultOpenKeys="['sub1']"
            :style="{ height: '100%', borderRight: 0 }"
            @click="onclick"
          >
          <template v-for="item in navmenu">
            <template v-if="item.path" >
                <a-menu-item :key="item.path">
                    <a-icon :type="item.icon" v-if="typeof(item.icon) === 'string' "/>
                    <a-icon :component="item.icon" v-if="typeof(item.icon) === 'object' "/>
                    <span class="nav-text">{{ item.name}}</span>
                </a-menu-item>
            </template>
          </template>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0px 20px 0px">
          <a-layout-content :style="{ background: '#fff', padding: '24px', Height: '100%;' }">
            <router-view></router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import MouseIcon from './components/MouseIcon';
import { navmenu } from './router'
import api from './store/api'
import Axios from 'axios'

export default {
  name: "app",
  data() {
    return {
      MouseIcon,
      navmenu,
    }
  },
  mounted: async function () {
    await Axios.get(api.config).then((resp) => {
        this.$store.commit('loadconfig', resp.data)
    }).catch((err) => {
        window.console.log(err)
    })
  },
  methods: {
    onclick: function(obj) {
      this.$router.push({ path: obj.key }).catch( err => {
        window.console.log(err)
      })   
    },

    apply_config: async function() {
      let qzconfig = this.$store.getters.dumpconfig
      const resp = await Axios({
        method: 'POST',
        url: api.config,
        data: qzconfig
      })
      window.console.log(resp.status)
    }
  },
  components: {
  },
};
</script>

<style>
#app {
  color: rgb(44, 62, 80);
  height: 100%;
}
#layout-main {
  height: 100%;
}

.title {
  color: aliceblue;
  font-size: 1.5em;
}

#layout-main .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  padding: 0px;
  float: left;
}

#layout-button {
  text-align: right;
  padding: 0px 20px;
}
</style>
