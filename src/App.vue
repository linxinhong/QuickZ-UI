<template>
  <div id="app">
    <a-layout id="layout-main">
      <a-layout-header :style="{padding: '0 20px'}">
        <a-row>
          <a-col :span="4">
            <span class="title">
              <img src="./assets/favicon.png" :style="{height: '1.2em', margin: '5px 5px 8px'}" />QuickZ
            </span>
          </a-col>
          <a-col :span="16">
            <a-menu
              mode="horizontal"
              theme="dark"
              :selectedKeys="selectItemPos"
              :style="{margin: '18px 0px 0px'}"
              @click="onclick"
            >
            <template v-for="( item, index ) in navmenu">
              <template v-if="item.path" >
                  <a-menu-item :key="index"
                  >
                      <a-icon :type="item.icon" v-if="typeof(item.icon) === 'string' "/>
                      <a-icon :component="item.icon" v-if="typeof(item.icon) === 'object' "/>
                      <span class="nav-text">{{ item.name }}</span>
                  </a-menu-item>
              </template>
            </template>
            </a-menu>
          </a-col>
          <a-col :span="4" id="layout-button">
          <a-button-group>
              <!-- <a-button icon="export" >导出配置</a-button> -->
              <a-button type="primary" icon="build" @click="apply_config" :style="{ 'background-color': reloadbuttoncolor, 'border-left-color': reloadbuttoncolor, 'border-color': reloadbuttoncolor }">重新部署</a-button>
          </a-button-group>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout>
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
import { navmenu } from './router'
// import api from './store/api'
// import Axios from 'axios'

export default {
  name: "app",
  data() {
    return {
      navmenu,
      selectpath: '',
      reloadbuttoncolor: '#dd6347',
    }
  },

  computed: {
    selectItemPos: function () {
      var pos = 0
      for (let index = 0; index < navmenu.length; index++) {
        const item = navmenu[index];
        if (item.path == this.selectpath) {
          pos = index
        }
      }
      return [pos]
    }
  },

  mounted: function () {
    this.$store.dispatch('loadconfig')
    if (this.$router.history.current.path == '/') {
      this.$router.push({path: '/menuz'})
    } 
  },

  methods: {
    onclick: function(obj) {
      this.selectpath = navmenu[obj.key].path
      this.$router.push({ path: navmenu[obj.key].path }).catch( err => {
        window.console.log(err)
      })   
    },

    apply_config: function() {
      this.$store.dispatch('dumpconfig')
      // window.console.log(this.$store.getters.dumpconfig)
      // let qzconfig = this.$store.getters.dumpconfig
      // const resp = await Axios({
      //   method: 'POST',
      //   url: api.config,
      //   data: qzconfig
      // })
      // window.console.log(resp.status)
    }
  },

  watch: {
    '$route' (to) {
      // 对路由变化作出响应...
      this.selectpath = to.path
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
  padding: 0px 40px;
}
</style>
