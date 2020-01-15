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
        existPos = Number(pos)
        existMenu = parentMenu[existPos < parentMenu.length ? existPos : parentMenu.length - 1]
        if (existMenu.hasOwnProperty('sub') && index < pos_list.length - 1) {
            existMenu = existMenu.sub
        }
    })
    callback(existMenu, parentMenu, existPos)
}

function copy_list (list, callback) {
    const newList = []
    list.forEach((item, index) => {
        var newItem = {}
        const keys = Object.keys(item)
        for (var i in keys) {
            newItem[keys[i]] = item[keys[i]]
        }
        newItem = callback(newItem)
        if (newItem.hasOwnProperty('sub')) {
            newItem.sub = copy_list(newItem.sub, callback)
        }
        newList[index] = newItem
    })
    return newList
}

function icon_to_request (url, icon) {
    const found = icon.match(/:(\d+)$/)
    const iconurl = url + '?' + qs.stringify({
        filepath: found ? icon.substring(0, found.index) : icon,
        number: found ? icon.substring(found.index + 1) : 0
    })
    return iconurl
}

function replace_icon (icon) {
    return (icon.length > 0) ? function (props, h) {
        return h('img', {
            attrs: {
                width: '16px',
                height: '16px',
                src: icon_to_request(api.generateicon, icon) 
            },
            class: [
                'anticon',
            ],
            style: {}
        }) 
    } : function (props, h) {
        return h('div', {})
    }
}

export {
    replace_icon,
    icon_to_request,
    walk_by_mark,
    copy_list,
}