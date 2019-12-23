import qs from 'qs'
import api from './api'
// import _ from 'lodash'

function walk_by_mark(menu, mark, callback) {
    const mark_string = '' + mark
    const pos_list = mark_string.split('-')
    pos_list.splice(0, 1)
    var parentMenu = menu
    var existMenu = menu
    var existPos = 0
    pos_list.forEach((pos, index) => {
        parentMenu = existMenu
        pos = Number(pos)
        existPos = pos > ( existMenu.length - 1 ) ? ( existMenu.length - 1) : pos
        existMenu = existMenu[existPos]
        if (existMenu.hasOwnProperty('sub') && index < pos_list.length - 1) {
            existMenu = existMenu.sub
        }
    })
    callback(existMenu, parentMenu, existPos)
}

function IconStringFormat(iconString) {
    var p_filepath
    var p_number
    var found = iconString.match(/:(\d+)$/)
    if (found) {
        p_filepath = iconString.substring(0, found.index)
        p_number = iconString.substring(found.index + 1)
    }
    else {
        // p_filepath = iconString.replace(/:$/)
        p_filepath = iconString
        p_number = 0
    }
    var params = qs.stringify({
        filepath: p_filepath,
        number: p_number
    })
    return params
}

function getIconFromString(iconString) {
    return api.generateicon + '?' + IconStringFormat(iconString)
}

function copy_to_item (item, newItem) {
    let list = ['name', 'icon', 'filter', 'exec', 'param', 'sep', 'disable']
    list.forEach(key=> {
        newItem[key] = item[key]
    })
    if (item.hasOwnProperty('sub')) {
        newItem['sub'] = []
        item.sub.forEach(subitem => {
            newItem['sub'].push(replaceIcon(subitem))
        })
    }
}

function replaceIcon(item) {
    let iconurl = ''
    let newItem = {}
    copy_to_item(item, newItem)
    if (item.hasOwnProperty('icon')) {
        if (item.icon.length > 0) {
            iconurl = getIconFromString(item.icon)
        } 
    }
    newItem.icon = (iconurl.length > 0) ? function (props, h) {
        return h('img', {
            attrs: {
                width: '16px',
                height: '16px',
                src: iconurl
            },
            class: [
                'anticon',
            ],
            style: {
            },
        })
    } : function (props, h) {
        return h('div', {

        })
    }
    return newItem
}

export {
    replaceIcon,
    walk_by_mark,
    getIconFromString,
    IconStringFormat,
    copy_to_item,
}