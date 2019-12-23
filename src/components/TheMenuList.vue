<template>
    <div id="menulist">
        <a-button-group>
          <a-button type="primary" icon="plus" @click="createItem">新建菜单</a-button>
          <a-button>子菜单</a-button>
          <a-button>分割线</a-button>
          <!-- <a-button icon="stop">禁用</a-button> -->
          <a-button icon="delete" type="danger">删除</a-button>
        </a-button-group>
        <a-directory-tree 
          id="treelist"
          @select="onSelect"
          @expand="onExpand"
          draggable
          @drop="onDrop"
          :treeData="menuz_with_icon"
          :replaceFields="replaceFields"
          :selectedKeys="select_key"
        >
        </a-directory-tree>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { walk_by_mark } from '../store/utils'
import _ from 'lodash'

export default {
  data() {
    return {
      select_node: '',
      replaceFields: {
        children: "sub",
        title: "name",
      },
      select_key: ['0-0']
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

    createItem () {
      const pos = this.$store.state.menuz_select_pos
      const posList = pos.split('-')
      posList[posList.length] += 1
      window.console.log(posList)
      const menu = this.$store.state.menuz
      walk_by_mark(menu, pos, (item, menu, itemPos) => {
          menu.splice(itemPos+1, 0, {
            name: "新建菜单"
          })
      })
    },

    onExpand () {
    },

    onDrop(info) {
      // 到目标后面
      if (info.dropToGap) {
        const dragKey = info.dragNode.eventKey
        const dropKey = info.node.eventKey
        const dropPosList = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPosList[dropPosList.length - 1]);
        const menu = this.$store.state.menuz
        walk_by_mark(menu, dragKey, function (dragItem, dragMenu, dragPos) {
          if (!dragItem.hasOwnProperty('sub')) {
              dragMenu.splice(dragPos, 1, {mark: 'need_to_delete'})
              walk_by_mark(menu, dropKey, function (dropItem, dropMenu, dropPos) {
                  let insertPos = (dropPosition === -1 ) ? dropPos : dropPos + 1 
                  dropMenu.splice(insertPos, 0, dragItem)
              })
              dragMenu.splice(_.findIndex(dragMenu, {mark: 'need_to_delete'}), 1)
          }
        })
      }
      else {
        window.console.log('info.dropToSub')
      }
    },
    onDragEnter(info) {
      window.console.log(info)
    }
  }
};
</script>
<style >
#treelist {
  padding: 5px;
  height: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #2222;
}
#menulist {
  height: 100%;
}
</style>
