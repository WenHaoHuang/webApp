// Created by huangwenhao on 2018/4/3.

const order = [
    {
        path: '/orderConfirm',
        name: 'orderConfirm',
        component: resolve => require(['../views/order/orderConfirm.vue'], resolve),
        meta:{
            title:'订单确认'
        }
    },{
        path: '/selectAddress',
        name: 'selectAddress',
        component: resolve => require(['../views/order/selectAddress.vue'], resolve),
        meta:{
            title:'选择地址'
        }
    },{
        path: '/orderResult',
        name: 'orderResult',
        component: resolve => require(['../views/order/orderResult.vue'], resolve),
        meta:{
            title:'支付结果'
        }
    },
]
export default order
