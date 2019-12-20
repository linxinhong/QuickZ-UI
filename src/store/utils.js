import qs from 'qs'
import api from './api'
// import _ from 'lodash'

function insert_to(menu, pos, items) {
    window.console.log(pos)
    // window.console.log(items)
    let mark_string = '' + pos
    let list = mark_string.split('-')
    let pm = menu
    let insert_pos = 0
    window.console.log('0')
    for (let index = 1; index < list.length; index++) {
        insert_pos = list[index]
        window.console.log(insert_pos)
    }
    items.forEach(item => {
        pm.splice(insert_pos, 0, item)
    })
}

function walk_by_mark(menu, mark) {
    let mark_string = '' + mark
    let list = mark_string.split('-')
    if (list.length > 0) {
        let pm = [menu]
        list.forEach(pos => {
            if (pm.hasOwnProperty('sub')) {
                pm = pm.sub[pos]
            }
            else {
                pm = pm[pos]
            }
        })
        return pm
    }
}

function getIconFromString(iconString) {
    let pos = iconString.split(':')
    let maxindex = pos.length - 1
    let p_filepath = pos[0] + ':'
    let p_number = pos[maxindex]
    for (let index = 1; index < maxindex; index++) {
        p_filepath += pos[index]
    }
    let params = qs.stringify({
        filepath: p_filepath,
        number: p_number
    })
    return api.generateicon + '?' + params
}

function copyItem (item, newItem) {
    let list = ['name', 'icon', 'filter', 'exec', 'param']
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
    copyItem(item, newItem)
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
    copyItem,
    insert_to,
}