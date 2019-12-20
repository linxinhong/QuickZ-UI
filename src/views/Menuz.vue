<template>
  <div id="menuz">
        <a-button-group>
          <a-button type="primary" icon="plus">新建菜单</a-button>
          <a-button>子菜单</a-button>
          <a-button>分割线</a-button>
          <!-- <a-button icon="stop">禁用</a-button> -->
          <!-- <a-button icon="delete" type="danger">删除</a-button> -->
        </a-button-group>
    <a-row style="height: 90%">
      <a-col :span="8" style="height: 100%">
        <div id="treelist">
          <MenuList />
        </div>
      </a-col>
      <a-col :span="16">
        <ItemSetting />
        <!-- <quill-editor
          id="editor"
          v-model="editorContext"
          ref="myQuillEditor"
          :options="editorOption"
        ></quill-editor> -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
import MenuList from "../components/MenuList";
import ItemSetting from "../components/ItemSetting";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

hljs.configure({
  languages: ["autohotkey", "json", "yaml", "ini", "markdown"]
});

export default {
  data() {
    return {
      editorContext: "!z::reload",
      editorOption: {
        modules: {
          toolbar: [
            ["code-block"],
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text, ["autohotkey"]).value
          }
        }
      }
    };
  },
  components: {
    MenuList,
    ItemSetting
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
</style>