<template>
  <a-directory-tree
    @select="onSelect"
    @expand="onExpand"
    draggable
    @drop="onDrop"
    :treeData="menuz_with_icon"
    :replaceFields="replaceFields"
  >
  </a-directory-tree>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
// import Vue from 'vue'

export default {
  data() {
    return {
      select_node: '',
      replaceFields: {
        children: "sub",
        title: "name",
      }
    };
  },
  computed: {
    ...mapState([
      'menuz'
    ]),
    ...mapGetters([
      'menuz_with_icon'
    ])
  },
  methods: {
    ...mapMutations({
      onSelect: 'menuz_select_item_mark'
    }),

    onExpand () {
    },
    onDrop(info) {

      // 到目标后面
      if (info.dropToGap) {
        const dragPos = info.dragNodesKeys[0].split('-')
        const dropPos = info.node.pos.split('-')
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        const process = (data, pos, callback) => {
                pos.forEach(p => {
                    if (data[p].hasOwnProperty('sub')) {
                        data = data[p].sub
                    }
                    else {
                        window.console.log(data, p)
                        callback(data, p)
                    }
                })
            }
        let dragObject
        process([{sub: this.$store.state.menuz}], dragPos, (data, p) => {
            dragObject = data[p]
            data.splice(p, 1)
        })
        process([{sub: this.$store.state.menuz}], dropPos, (ddata, dp) => {
            window.console.log(dp)
            ddata.splice(((dropPosition === -1) ? dp : dp + 1), 0, dragObject)
        })
        window.console.log('----')
        window.console.log(dragPos)
        window.console.log(dropPos)
        window.console.log(dropPosition)
        // this.$store.commit('menuz_dropToGap', {drag: dragKey, drop: dropKey})
      }
      // else {
      //   this.$store.commit('menuz_dropToSub', dragKey, dropKey)
      // }
    },
    onDragEnter(info) {
      window.console.log(info)
    }
  }
};
</script>
