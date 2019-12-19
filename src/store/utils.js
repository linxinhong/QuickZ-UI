import qs from 'qs'
import api from './api'

function walk_by_mark(menu, mark) {
    let mark_string = '' + mark[0]
    let list = mark_string.split('-')
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

function Item_copy(item) {
    let newItem = {}
    let list = ['name', 'icon']
    list.forEach(key=> {
        newItem[key] = item[key]
    })
    if (item.hasOwnProperty('sub')) {
        newItem['sub'] = []
        item.sub.forEach(subitem => {
            newItem['sub'].push(replaceIcon(subitem))
        })
    }
    return newItem
}

function replaceIcon(item) {
    let iconurl = ''
    let newItem = Item_copy(item)
    if (item.hasOwnProperty('icon')) {
        iconurl = getIconFromString(item.icon)
    }
    newItem.icon = function (props, h) {
        return h('img', {
            attrs: {
                width: '16px',
                height: '16px',
                src: iconurl
            }
        })
    }
    return newItem
}

export {
    replaceIcon,
    walk_by_mark,
    getIconFromString,
    Item_copy,
}