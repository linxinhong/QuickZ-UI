<template>
  <a-tree
    class="draggable-tree"
    draggable
    @dragenter="onDragEnter"
    @drop="onDrop"
    :treeData="gData"
    :replaceFields="replaceFields"
  />
</template>

<script>
  export default {
    data() {
      return {
        replaceFields: {
            children: "sub",
            title: "name",
        }
      };
    },
    computed: {
        gData: function () {
            return this.$store.getters.menuz_with_icon
        }
    },
    methods: {
      onDragEnter(info) {
        window.console.log(info);
        // expandedKeys 需要受控时设置
        // this.expandedKeys = info.expandedKeys
      },
      onDrop(info) {
        window.console.log(info);
        const dropKey = info.node.eventKey;
        const dragKey = info.dragNode.eventKey;
        const dropPos = info.node.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        const loop = (data, key, callback) => {
          data.forEach((item, index, arr) => {
            if (item.key === key) {
              return callback(item, index, arr);
            }
            if (item.children) {
              return loop(item.children, key, callback);
            }
          });
        };
        const data = [...this.gData];

        // Find dragObject
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
          arr.splice(index, 1);
          dragObj = item;
        });
        if (!info.dropToGap) {
          // Drop on the content
          loop(data, dropKey, item => {
            item.children = item.children || [];
            // where to insert 示例添加到尾部，可以是随意位置
            item.children.push(dragObj);
          });
        } else if (
          (info.node.children || []).length > 0 && // Has children
          info.node.expanded && // Is expanded
          dropPosition === 1 // On the bottom gap
        ) {
          loop(data, dropKey, item => {
            item.children = item.children || [];
            // where to insert 示例添加到尾部，可以是随意位置
            item.children.unshift(dragObj);
          });
        } else {
          let ar;
          let i;
          loop(data, dropKey, (item, index, arr) => {
            ar = arr;
            i = index;
          });
          if (dropPosition === -1) {
            ar.splice(i, 0, dragObj);
          } else {
            ar.splice(i + 1, 0, dragObj);
          }
        }
        this.gData = data;
      },
    },
  };
</script>