import Vue from 'vue'
import Router from 'vue-router'

import App from '@/App'

const login = resolve => require(['@/pages/login/login'], resolve)
const footer = resolve => require(['@/components/footer'], resolve)
const home = resolve => require(['@/pages/home/home'], resolve)
const user = resolve => require(['@/pages/user/user'], resolve)
const addwl = resolve => require(['@/pages/wuliu/addwl'], resolve)
const editwl = resolve => require(['@/pages/wuliu/editwl'], resolve)
const wlrecord = resolve => require(['@/pages/wuliu/wlrecord'], resolve)

Vue.use(Router)

export default new Router({
//   mode: 'history',
  routes: [
        {
            path: '/',
            component: App, //顶层路由
            children: [//二级路由
                {
                    path: '/login', //登录
                    meta: { auth: false },
                    component: login
                },
                {
                    path: '/', //如果之前登录过则跳到这里.跳到home页
                    meta: { auth: false },
                    component: footer,
                    children:[
                        {
                            path: 'home', //首页
                            meta: { index:0 },
                            component: home,
                        },
                        {
                            path: 'user', //我的
                            meta: { index:1 },
                            component: user
                        }
                    ]
                },
                {
                    path: '/addwl', //新增运单
                    component: addwl
                },
                {
                    path: '/editwl', //修改运单
                    name:"editwl",
                    component: editwl
                },
                {
                    path: '/wlrecord', //运单记录
                    component: wlrecord
                },
                {
                    path: '*', //其他页面，强制跳转到登录页面
                    redirect: '/login'
                },
            ]
        }
    ]
})
