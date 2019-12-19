<template>
  <a-directory-tree
    @select="onSelect"
    @expand="onExpand"
    :multiple="true"
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
    onExpand() {
    }
  }
};
</script>
