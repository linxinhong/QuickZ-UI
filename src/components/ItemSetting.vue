<template>
    <a-form id="itemsetting">
        <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="菜单项名称"
            :style="{'margin-bottom': '16px'}"
        >
            <a-row>
                <a-col :span="14" >
                    <a-input v-model="itemName">
                        <span class="ant-input-group-addon" slot="addonBefore" :style="{'padding': '0px', border: '0px'}" >
                            <img width="16px" height="16px"  :src="getIcon"> 
                        </span>
                    </a-input>
                </a-col>
                <a-col :span="10" :style="{'padding-left': '20px'}">
                    <a-button-group>
                        <a-button><a-icon type="font-colors" /></a-button>
                        <a-button><a-icon type="bg-colors" /></a-button>
                        <a-button><a-icon type="bold" /></a-button>
                    </a-button-group>
                </a-col>
            </a-row>
        </a-form-item>
        <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="筛选器"
            :style="{'margin-bottom': '16px', 'margin-right': '30px'}"
        >
            <a-input v-model="itemFilter" />
        </a-form-item>
        <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="命令"
            :style="{'margin-bottom': '16px', 'margin-right': '30px'}"
        >
            <a-input v-model="itemExec" />
        </a-form-item>
        <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="参数"
            :style="{'margin-bottom': '16px', 'margin-right': '30px'}"
        >
            <a-textarea :rows="3" v-model="itemParam"/>
        </a-form-item>
        <a-form-item
            :style="{'margin-bottom': '16px', 'margin-right': '30px', 'text-align': 'right'}"
        >
            <a-button type="primary" @click="onSave">
                保存
            </a-button>
        </a-form-item>
        {{menuz_select_item}}
    </a-form>
</template>

<script>
import { getIconFromString } from '../store/utils'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
export default {
    data() {
        return {
            formItemLayout,
            itemIcon: '',
            itemName: '',
            itemFilter: '',
            itemExec: '',
            itemParam: ''
        }
    },
    computed: {
        menuz_select_item: function() {
            this.loadItem()
            return ''
        },
        getIcon: function() {
            return getIconFromString(this.itemIcon)
        }
    },
    methods: {
        loadItem: function() {
            let select_item = this.$store.state.menuz_select_item
            this.itemName = select_item.hasOwnProperty('name') ? select_item.name : ''
            this.itemIcon = select_item.hasOwnProperty('icon') ? select_item.icon : ''
            this.itemFilter = select_item.hasOwnProperty('filter') ? select_item.filter : ''
            this.itemExec = select_item.hasOwnProperty('exec') ? select_item.exec : ''
            this.itemParam = select_item.hasOwnProperty('param') ? select_item.param : ''
        },
        update: function () {
            window.console.log()
        },
        onSave: function () {
            this.$store.commit('menuz_select_item_update', {
                name: this.itemName,
                icon: this.itemIcon,
                filter: this.itemFilter,
                exec: this.itemExec,
                param: this.itemParam
            })
        }
    } 
}
</script>
<style>
#itemsetting {
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 30px;
    margin: 10px;
    border: 1px solid #2222;;
}
</style>