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
        const dragKey = info.dragNodesKeys
        const dropKey = info.node.eventKey
        this.$store.commit('menuz_dropToGap', {drag: dragKey, drop: dropKey})
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
