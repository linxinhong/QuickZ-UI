<template>
  <div id="menuz">
    <a-row>
      <a-col :span="16">
        <a-button-group>
          <a-button type="primary" icon="plus" @click="menuz_insert_item">
            新建菜单
          </a-button>
          <a-button @click="menuz_insert_item_before">菜单(之前)</a-button>
          <a-button @click="menuz_insert_item_sub">子菜单</a-button>
          <a-button @click="menuz_insert_item_sep">分割线</a-button>
        </a-button-group>
        <a-button-group :style="{'padding-left': '10px'}">
          <a-button icon="copy" @click="menuz_duplicate_item">复用</a-button>
          <!-- <a-button icon="stop" @click="disableItem">禁用</a-button> -->
          <a-button icon="delete" @click="menuz_delete_item" type="danger">删除</a-button>
        </a-button-group>
      </a-col>
      <a-col :span="8" :style="{heigth: '100%',  'text-align': 'right', 'padding-right': '10px'}">
        <a-button-group >
          <!-- <a-button icon="undo">还原</a-button> -->
          <a-button icon="save" type="primary" @click="onSave">保存</a-button>
        </a-button-group>
      </a-col>
    </a-row>
    <a-row style="height: 90%">
      <a-col :span="9" style="height: 100%">
        <div id="menulist">
          <a-directory-tree
            id="treelist"
            @select="onSelect"
            @expand="onExpand"
            @drop="onDrop"
            draggable
            :expandedKeys="expandedKeys"
            :replaceFields="replaceFields"
            :treeData="menuz_list_with_icon"
            :selectedKeys="menuz_list_select_pos"
            expandAction="dblclick"
          ></a-directory-tree>
        </div>
      </a-col>
      <a-col :span="15">
        <TheItemSetting />
        <!-- <quill-editor
          id="editor"
          v-model="editorContext"
          ref="myQuillEditor"
          :options="editorOption"
        ></quill-editor>-->
      </a-col>
    </a-row>
  </div>
</template>

<script>
import TheItemSetting from "../components/TheItemSetting";
// import hljs from "highlight.js";
// import "highlight.js/styles/monokai-sublime.css";

// hljs.configure({
  // languages: ["autohotkey", "json", "yaml", "ini", "markdown"]
// });

// data() {
//   return {
//     editorContext: "!z::reload",
//     editorOption: {
//       modules: {
//         toolbar: [
//           ["code-block"],
//         ],
//         syntax: {
//           highlight: text => hljs.highlightAuto(text, ["autohotkey"]).value
//         }
//       }
//     }
//   };
// },

export default {
  data() {
    return {
      expandedKeys: [],
      select_pos: [], 
      replaceFields: {
        children: "sub",
        title: "name"
      },
      
    };
  },

  computed: {
    menuz_list_with_icon: function () {
      return this.$store.getters['menuz/list_with_icon']
    },

    menuz_list_select_pos: function () {
      return this.$store.state.menuz.list_select_pos
    },

    IsShowItemSetting: function() {
        if (!this.$store.state.menuz_select_pos) {
            return false
        }
        return this.$store.state.menuz_select_item.hasOwnProperty('sep') 
            ? !this.$store.state.menuz_select_item.sep 
            : true
    },
  },

  mounted: function () {
  },

  methods: {

    onSelect(pos) {
      this.$store.commit('menuz/change_select_pos', pos)
      this.$store.dispatch('menuz/change_edit_item')
    },

    insert_item(item) {
      var posList = this.menuz_list_select_pos[0].split('-')
      posList[posList.length-1] = Number(posList[posList.length-1]) + 1;
      this.$store.commit('menuz/insert_item', {pos: [posList.join('-')], item})
      if (this.$store.state.menuz.list.length == 1) {
        posList = ['0-0']
      }
      this.onSelect([posList.join('-')])
    },

    menuz_insert_item() {
      this.insert_item({name: '新建菜单'})
    },

    menuz_insert_item_sep() {
      this.insert_item({sep: true})
    },

    menuz_insert_item_before() {
      this.$store.commit('menuz/insert_item', {pos: this.menuz_list_select_pos, item: {
        name: '新建菜单'
      }})
    },

    menuz_insert_item_sub() {
      this.expandedKeys = [...this.expandedKeys, ...this.menuz_list_select_pos]
      this.$store.commit('menuz/insert_item_sub', {pos: this.menuz_list_select_pos, item: {
        name: '新建子菜单'
      }})
    },

    menuz_delete_item() {
      this.$store.commit('menuz/delete_item', {pos: this.menuz_list_select_pos})
    },

    menuz_duplicate_item() {
      const item = this.$store.getters['menuz/select_item']
      this.insert_item(item)
    },

    disableItem() {
      this.$store.commit('menuz_select_item_update', {
        ...this.$store.state.menuz_select_item,
        disable: this.$store.state.menuz_select_item.hasOwnProperty('disable') 
              ? !this.$store.state.menuz_select_item.disable : true
      })
    },

    onSave() {
      this.$store.commit('menuz/save_edit_item')
    },

    onExpand(info) {
      this.expandedKeys = info
    },

    onDrop(info) {
      // 到目标后面
      if (info.dropToGap) {
        const dragKey = info.dragNode.eventKey;
        const dropKey = info.node.eventKey;
        const dropPosList = info.node.pos.split("-");
        const dropPosition =
          info.dropPosition - Number(dropPosList[dropPosList.length - 1]);
        this.$store.commit('menuz_select_item_dragdrop', {
          dragKey,
          dropKey,
          dropPosition
        })
      } 
      else {
        window.console.log("info.dropToSub");
      }
    },

    onDragEnter(info) {
      window.console.log(info);
    },
  },
  components: {
    TheItemSetting
  }
};
</script>

<style>
#editor {
  height: 500px;
}

#menuz {
  height: 100%;
}

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