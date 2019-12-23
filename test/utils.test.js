// import { walk_by_mark } from '../src/store/utils'

const menu = { "menuz": [{ "name": "首菜单一", "icon": "C:\\Windows\\System32\\Shell32.dll:20", "exec": "cmd", "param": "", "filter": "" }, { "name": "第二菜单", "icon": "", "filter": "", "exec": "", "param": "" }, { "name": "第三菜单", "sub": [{ "name": "test4" }, { "name": "test5", "icon": "C:\\Windows\\System32\\Shell32.dll:22" }, { "name": "test6", "sub": [{ "name": "test7", "exec": "jklfjdslkfjkjdskflsjafdlksa" }, { "name": "test8", "icon": "C:\\Windows\\System32\\Shell32.dll:23" }] }], "icon": "", "filter": "", "exec": "", "param": "" }], "vimd": { "winList": {} }, "gesturez": {}, "var": { "exec": {}, "filter": {} }, "plugins": {}, "setting": {} }


function walk_by_mark(menu, mark) {
    const mark_string = '' + mark
    const pos_list = mark_string.split('-')
    pos_list.splice(0, 1)
    var pm = menu
    pos_list.forEach(pos => {
        index = pos > pm.length ? pm.length : pos
        pm = pm[index]
        if (typeof(pm) === 'object') {
            if (pm.hasOwnProperty('sub')) {
                pm = pm.sub
            }
        }
    })
    return pm
}

// test('walk_by_mark Test1 => mark: 0-0', () => {
//     expect(walk_by_mark(menu.menuz, '0-0')).toEqual(menu.menuz[0]);
// });

test('walk_by_mark Test2 => mark: 0-2-0', () => {
    expect(walk_by_mark(menu.menuz, '0-2-0')).toBe(menu.menuz[2].sub[0]);
});

test('walk_by_mark Test2 => mark: 0-2-1', () => {
    expect(walk_by_mark(menu.menuz, '0-2-1')).toBe(menu.menuz[2].sub[1]);
});