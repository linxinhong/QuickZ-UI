<template>
    <div :style="{heigth: '100%'}" v-if="IsShowItemSetting">
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
                            <span @click="showDrawer" class="ant-input-group-addon" slot="addonBefore" :style="{'padding': '0px', border: '0px'}" >
                                <img width="16px" height="16px"  :src="getIcon" v-if="itemIcon"> 
                                <div :style="{width:'16px', height:'16px'}"  v-else /> 
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
            </a-form-item>
            {{menuz_select_item}}
        </a-form>
        <a-drawer
            title="图标"
            placement="right"
            :closable="false"
            :visible="drawer_visible"
            @close="HideDrawer"
            width="540"
            >
            <a-input-search v-model="icon_select_value" @pressEnter="icon_select_search"></a-input-search>
            <ul class="anticons-list">
                <template v-for="(item, index) in icon_data" >
                <li :key="index">
                    <a-popover trigger="hover" placement="bottom" v-if="icon_select_popover_visible">
                        <template slot="content">
                            <a-button-group size="small" slot="actions" :style="{}">
                                <a-button @click="icon_select_fav(item)" ><a-icon type="star" />收藏</a-button>
                                <a-button type="primary" @click="icon_select_click(item)"><a-icon type="select" />选择</a-button>
                            </a-button-group>
                        </template>
                        <img width="16px" height="16px"  :src="icon_data_item_to_iconString(item)" >
                    </a-popover>
                </li>
                </template>
            </ul>
            <!-- <a-list size="small" bordered :dataSource="icon_data" :style="{'margin-top': '16px', heigth: '100%'}">
                <a-list-item slot="renderItem" slot-scope="item" >
                    <img width="16px" height="16px"  :src="icons_data_item_to_iconString(item)" :style="{'margin-top': '4px', 'margin-right': '10px'}"> 
                    <a-input :value="item" size="small" :style="{'width': '100%'}" readOnly></a-input>
                    <a-button-group size="small" slot="actions" :style="{}">
                        <a-button ><a-icon type="heart" />收藏</a-button>
                        <a-button type="primary"><a-icon type="select" />选择</a-button>
                    </a-button-group>
                </a-list-item>
            </a-list> -->
        </a-drawer>
    </div>
</template>

<script>
import { getIconFromString, IconStringFormat } from '../store/utils'
import api from '../store/api'
import Axios from 'axios'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
export default {
    data() {
        return {
            formItemLayout,
            drawer_visible: false,
            icon_select_popover_visible: false,
            icon_select_value: '',
            icon_select_img: '',
            icon_select_is_fav: false,
            icon_data: [],
        }
    },
    computed: {
        menuz_select_item: function() {
            this.loadItem()
            return ''
        },
        getIcon: function() {
            return getIconFromString(this.itemIcon)
        },
        IsShowItemSetting: function() {
            if (!this.$store.state.menuz_select_pos) {
                return false
            }
            return this.$store.state.menuz_select_item.hasOwnProperty('sep') 
                ? !this.$store.state.menuz_select_item.sep 
                : true
        },
        itemName: {
            get () {
                return this.$store.state.itemeditor.name
            },

            set (newname) {
                this.$store.commit('itemeditor/update_name', newname)
            }
        },

        itemIcon: {
            get () {
                return this.$store.state.itemeditor.icon
            },

            set (newicon) {
                this.$store.commit('itemeditor/update_icon', newicon)
            }
        },

        itemFilter: {
            get () {
                return this.$store.state.itemeditor.filter
            },

            set (newfilter) {
                this.$store.commit('itemeditor/update_filter', newfilter)
            }
        },
        
        itemExec: {
            get () {
                return this.$store.state.itemeditor.exec
            },

            set (newexec) {
                this.$store.commit('itemeditor/update_exec', newexec)
            }
        },

        itemParam: {
            get () {
                return this.$store.state.itemeditor.param
            },

            set (newparam) {
                this.$store.commit('itemeditor/update_param', newparam)
            }
        },
    },
    methods: {
        loadItem: function() {
            const select_item = this.$store.state.menuz_select_item
            this.$store.commit('itemeditor/update', {
                name : select_item.hasOwnProperty('name') ? select_item.name : '',
                icon : select_item.hasOwnProperty('icon') ? select_item.icon : '',
                filter : select_item.hasOwnProperty('filter') ? select_item.filter : '',
                exec : select_item.hasOwnProperty('exec') ? select_item.exec : '',
                param : select_item.hasOwnProperty('param') ? select_item.param : ''
            })
        },

        showDrawer: function () {
            this.drawer_visible = true
            this.icon_select_popover_visible = true
            this.icon_select_value = this.itemIcon
            // this.icon_data = [this.itemIcon, this.itemIcon, this.itemIcon ,this.itemIcon]
            this.icon_select_search()
        },

        HideDrawer: function () {
            this.icon_select_popover_visible = false
            this.drawer_visible = false
        },

        icon_select_search: async function () {
            const resp = await Axios({
                method: 'GET',
                url: api.generateiconlist,
                params: {
                    query: this.icon_select_value
                }
            })
            if (resp.status === 200) {
                this.icon_data = resp.data
            }
            // this.itemIcon = this.icon_select_value
            // this.icon_select_img = getIconFromString(this.icon_select_value)
        },

        icon_data_item_to_iconString: function (item) {
            return getIconFromString(item)
        },

        icon_select_click: function(item) {
            // this.itemIcon = item
            this.$store.commit('itemeditor/update_icon', item)
            this.HideDrawer()
        },

        icon_select_fav: async function(item) {
            window.console.log(IconStringFormat(item))
            await Axios({
                method: 'GET',
                url: api.savefavicon + '?' + IconStringFormat(item)
            })
        },

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
ul.anticons-list {
    margin: 10px 0;
    padding: 10px;
    list-style: none;
    overflow: hidden;
    border: 1px solid #2222;;
}
ul.anticons-list li {
    float: left;
    width: 8.9%;
    height: 100%;
    text-align: center;
    list-style: none;
    cursor: pointer;
    color: #555;
    transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
    position: relative;
    border: 1px solid #2222;;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    margin: 5px;
    padding: 6px;
}
</style>