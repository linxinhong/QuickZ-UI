import Vue from 'vue'
import VueRouter from 'vue-router'
import TheMouseIcon from './components/TheMouseIcon';

Vue.use(VueRouter)

const navmenu = [
    {
        name: '菜单',
        icon: 'profile',
        path: '/menuz',
        component: () => import('./views/Menuz.vue') 
    },
    {
        name: '热键',
        icon: 'down-square',
        path: '/vimd',
        component: () => import('./views/Menuz.vue') 
    },
    {
        name: '手势',
        icon: TheMouseIcon,
        path: '/gesturez',
        component: () => import('./views/Menuz.vue') 
    },
    {
        name: '变量',
        icon: 'thunderbolt',
        path: '/var',
        component: () => import('./views/Menuz.vue') 
    },
    {
        name: '插件',
        icon: 'appstore',
        path: '/plugin',
        component: () => import('./views/Menuz.vue') 
    },
    {
        name: '设置',
        icon: 'setting',
        path: '/setting',
        component: () => import('./views/Menuz.vue') 
    },
]

const router = new VueRouter({
    routes: function () {
        var routes = []
        navmenu.forEach((item) => {
            routes.push({
                path: item.path,
                component: item.component
            })
        })
        return routes
    }()
})

export {
    navmenu,
    router
}