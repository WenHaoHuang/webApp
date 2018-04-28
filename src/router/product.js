// Created by huangwenhao on 2018/4/3.

const product = [ {
        path: '/product/list',
        name: 'productList',
        component: resolve => require(['../views/product/list.vue'], resolve),
        meta: {
            title: '商品列表',
            keepAlive:false
        }
    }, {
        path: '/product/detail',
        name: 'productDetail',
        component: resolve => require(['../views/product/detail.vue'], resolve),
        meta: {
            title: '商品详情'
        }
    },
]
export default product
