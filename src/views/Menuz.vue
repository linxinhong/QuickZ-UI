<template>
  <div id="menuz">
    <a-row>
      <a-col :span="16">
        <a-button-group>
          <a-button type="primary" icon="plus" @click="createItem">新建菜单</a-button>
          <a-button @click="createSubItem">子菜单</a-button>
          <a-button @click="createSep">分割线</a-button>
        </a-button-group>
        <a-button-group :style="{'padding-left': '10px'}">
          <!-- <a-button icon="stop" @click="disableItem">禁用</a-button> -->
          <a-button icon="delete" @click="deleteItem" type="danger">删除</a-button>
        </a-button-group>
      </a-col>
      <a-col :span="8" :style="{heigth: '100%',  'text-align': 'right', 'padding-right': '10px'}">
        <a-button-group v-if="IsShowItemSetting">
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
            draggable
            @drop="onDrop"
            :expandedKeys="expandedKeys"
            :treeData="menuz_with_icon"
            :replaceFields="replaceFields"
            :selectedKeys="select_pos"
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
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { mapState, mapGetters, mapMutations } from "vuex";

hljs.configure({
  languages: ["autohotkey", "json", "yaml", "ini", "markdown"]
});

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
    ...mapState(["menuz", "menuz_select_pos"]),
    ...mapGetters(["menuz_with_icon"]),
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
    ...mapMutations({
    }),

    onSelect(pos) {
      this.select_pos = pos
      this.$store.commit("menuz_select_item_mark", pos[0])
    },

    createItem() {
      this.$store.commit("menuz_select_item_insert", {
          name: "新建菜单"
      })
      this.select_pos = [this.$store.state.menuz_select_pos]
    },

    createSep() {
      this.$store.commit("menuz_select_item_insert", {
        sep: true
      })
      this.select_pos = [this.$store.state.menuz_select_pos]
    },

    createSubItem() {
      this.$store.commit("menuz_select_item_insert_subitem", {
          name: "新建子菜单"
      })
      this.expandedKeys = [...this.expandedKeys, ...this.select_pos]
      this.select_pos = [this.$store.state.menuz_select_pos]
    },

    disableItem() {
      this.$store.commit('menuz_select_item_update', {
        ...this.$store.state.menuz_select_item,
        disable: this.$store.state.menuz_select_item.hasOwnProperty('disable') 
              ? !this.$store.state.menuz_select_item.disable : true
      })
    },

    deleteItem() {
      this.$store.commit('menuz_select_item_delete')
    },

    onSave() {
      this.$store.commit('menuz_select_item_update', {
          name: this.$store.state.itemeditor.name,
          icon: this.$store.state.itemeditor.icon,
          filter: this.$store.state.itemeditor.filter,
          exec: this.$store.state.itemeditor.exec,
          param: this.$store.state.itemeditor.param,
      })
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