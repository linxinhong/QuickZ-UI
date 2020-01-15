<template>
    <div :style="{heigth: '100%'}" >
        <a-form>
            <div class='itemsetting-block'>
                <a-form-item
                    :label-col="formItemLayout.labelCol"
                    :wrapper-col="formItemLayout.wrapperCol"
                    label="菜单项名称"
                    :style="{'margin-bottom': '16px'}"
                >
                    <a-row>
                        <a-col :span="14" >
                            <a-input v-model="item_name">
                                <span @click="showDrawer" class="ant-input-group-addon" slot="addonBefore" :style="{'padding': '0px', border: '0px'}" >
                                    <img width="16px" height="16px"  :src="get_icon" v-if="item_icon"> 
                                    <div :style="{width:'16px', height:'16px'}"  v-else /> 
                                </span>
                            </a-input>
                        </a-col>
                        <a-col :span="10" :style="{'padding-left': '30px'}">
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
                    <a-input v-model="item_filter" />
                </a-form-item>
                <!-- <a-form-item
                    :label-col="formItemLayout.labelCol"
                    :wrapper-col="formItemLayout.wrapperCol"
                    label="代码模式"
                    :style="{'margin-bottom': '16px', 'margin-right': '30px'}"
                >
                    <a-switch />
                </a-form-item> -->
            </div>
            <div class='itemsetting-block'>
                <a-form-item
                    :label-col="formItemLayout.labelCol"
                    :wrapper-col="formItemLayout.wrapperCol"
                    label="命令"
                    :style="{'margin-bottom': '16px', 'margin-right': '30px'}"
                >
                    <a-input v-model="item_exec" />
                </a-form-item>
                <a-form-item
                    :label-col="formItemLayout.labelCol"
                    :wrapper-col="formItemLayout.wrapperCol"
                    label="参数"
                    :style="{'margin-bottom': '16px', 'margin-right': '30px'}"
                >
                    <a-textarea :rows="4" v-model="item_param"/>
                </a-form-item>
                <a-form-item
                    :style="{'margin-bottom': '16px', 'margin-right': '30px', 'text-align': 'right'}"
                >
                </a-form-item>
            </div>
        </a-form>
        <a-drawer
            title="图标"
            placement="right"
            :closable="true"
            :visible="drawer_visible"
            @close="HideDrawer"
            width="540"
        >
            <a-auto-complete
                :dropdownMatchSelectWidth="false"
                :dropdownStyle="{width: '300px'}"
                style="width: 100%"
                v-model="icon_search_value"
                @select="on_icon_search_change"
                @focus="focus_auto_complete"
                @blur="blur_auto_complete"
                :open="show_auto_complete"
            >
                <template slot="dataSource">
                    <!-- <a-select-opt-group v-for="group in icon_search_data" :key="group.title"> -->
                    <a-select-opt-group >
                    <span slot="label">
                        收藏夹
                    </span>
                    <a-select-option v-for="opt in icons_fav_list" :key="opt" :value="opt">{{opt}}</a-select-option>
                    </a-select-opt-group>
                    <a-select-opt-group v-if="icons_search_history">
                    <span slot="label">
                        历史
                        <a
                        style="float: right"
                        @click="clear_search_history"
                        >清空
                        </a>
                    </span>
                    <a-select-option v-for="opt in icons_search_history" :key="opt" :value="opt">{{opt}}</a-select-option>
                    </a-select-opt-group>
                    <!-- <a-select-option disabled key="all" class="show-all">
                    <a :style="{'text-align': 'center'}">
                        查看所有结果
                    </a>
                    </a-select-option> -->
                </template>
                <a-input-search  @pressEnter="icon_search_enter"></a-input-search>
            </a-auto-complete>
            <ul class="anticons-list">
                <template v-for="(item, index) in icon_data" >
                <li :key="index">
                    <a-popover trigger="hover" placement="bottom" v-if="icon_select_popover_visible">
                        <template slot="content">
                            <a-button-group size="small" slot="actions" :style="{}">
                                <a-button @click="icon_select_fav(item)" v-if="!is_fav_path"><a-icon type="star" />收藏</a-button>
                                <a-button type="primary" @click="icon_select_click(item)"><a-icon type="select" />选择</a-button>
                            </a-button-group>
                        </template>
                        <img width="16px" height="16px"  :src="icon_data_item_to_iconString(item)" >
                    </a-popover>
                </li>
                </template>
            </ul>
        </a-drawer>
    </div>
</template>

<script>
import { icon_to_request } from '../store/utils'
import api from '../store/api'
import Axios from 'axios'
import _ from 'lodash'

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
            icon_search_value: '',
            icon_select_img: '',
            icon_select_is_fav: false,
            show_auto_complete: false,
            icon_data: [],
        }
    },
    computed: {
        edit_item () {
            return this.$store.state.menuz.list_edit_item
        },

        item_name: {
            get () {
                return this.edit_item.name
            },
            set (value) {
                this.$store.commit('menuz/change_edit_item_name', value)
            }
        },
        item_icon: {
            get () {
                return this.edit_item.icon
            },
        },
        item_filter: {
            get () {
                return this.edit_item.filter
            }
        },
        item_exec: {
            get () {
                return this.edit_item.exec
            },
            set (value) {
                this.$store.commit('menuz/change_edit_item_exec', value)
            }
        },
        item_param: {
            get () {
                return this.edit_item.param
            },
            set (value) {
                this.$store.commit('menuz/change_edit_item_param', value)
            }
        },

        get_icon: function() {
            return icon_to_request(api.generateicon, this.item_icon)
        },
        is_fav_path: function () {
            return _.includes(this.icons_fav_list, this.icon_search_value)
        },
        icons_fav_list: function () {
            return ['User\\icons\\*']
        },
        icons_search_history: function () {
            return this.$store.state.setting.icons_search_history
        }
    },
    methods: {
        showDrawer: function () {
            this.drawer_visible = true
            this.icon_select_popover_visible = true
            this.icon_search_value = this.item_icon
            this.icon_select_search()
        },

        HideDrawer: function () {
            this.icon_select_popover_visible = false
            this.drawer_visible = false
        },

        icon_search_enter: function () {
            this.icon_select_search()
            this.$store.commit('setting/icons_search_history_update', this.icon_search_value)
        },

        on_icon_search_change: function(value) {
            this.icon_search_value = value
            this.icon_select_search()
        },
        
        focus_auto_complete: function() {
            this.show_auto_complete = true
        },

        blur_auto_complete: function() {
            this.show_auto_complete = false
        },

        auto_complete_filter: function(input, option) {
            // window.console.log(input)
            // window.console.log(option.componentOptions.children[1].key)
            var key = option.componentOptions.children[1].key 
            return (_.include(this.icons_fav_list, key)) ? true : (key.indexOf(input) >= 0 )
        },

        clear_search_history: function () {
            this.$store.commit('setting/icons_search_history_clear')
        },

        icon_select_search: async function () {
            this.show_auto_complete = false
            const resp = await Axios({
                method: 'GET',
                url: api.generateiconlist,
                params: {
                    query: this.icon_search_value
                }
            })
            if (resp.status === 200) {
                this.icon_data = resp.data
            }
            // this.itemIcon = this.icon_search_value
            // this.icon_select_img = getIconFromString(this.icon_search_value)
        },

        icon_data_item_to_iconString: function (icon) {
            return icon_to_request(api.generateicon, icon)
        },

        icon_select_click: function(icon) {
            this.$store.commit('menuz/change_edit_item_icon', icon)
            this.HideDrawer()
        },

        icon_select_fav: async function(icon) {
            // window.console.log(IconStringFormat(item))
            await Axios({
                method: 'GET',
                url: icon_to_request(api.savefavicon, icon)
            })
        },
    } 
}
</script>
<style>
.itemsetting-block {
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