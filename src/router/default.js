// Created by huangwenhao on 2018/4/3.

const Indexs = [
    {
        path: '/',
        redirect: '/index'
    }, {
        path: '/index',
        name: 'index',
        component: resolve => require(['../views/index.vue'], resolve),
        meta: {
            title: '首页',
            keepAlive:false
        }
    }, {
        path: '*',
        name: 'notFound',
        component: resolve => require(['../views/notFound.vue'], resolve),
        meta: {
            title: '404',
            keepAlive:true
        }
    },
]
export default Indexs
