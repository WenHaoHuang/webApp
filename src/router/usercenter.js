// Created by huangwenhao on 2018/4/3.

const usercenter = [
    {
        path: '/usercenter',
        name: 'usercenter',
        component: resolve => require(['../views/usercenter/index.vue'], resolve),
        meta: {
            title: '个人中心',
            keepAlive:true
        }
    }, {
        path: '/usercenter/order/list',
        name: 'orderList',
        component: resolve => require(['../views/usercenter/order/list.vue'], resolve),
        meta: {
            title: '我的订单',
            keepAlive:false
        }
    }, {
        path: '/usercenter/order/detail',
        name: 'orderDetail',
        component: resolve => require(['../views/usercenter/order/detail.vue'], resolve),
        meta: {
            title: '订单详情',
            keepAlive:false
        }
    },{
        path: '/usercenter/order/logistics',
        name: 'logistics',
        component: resolve => require(['../views/usercenter/order/logistics.vue'], resolve),
        meta:{
            title:'物流信息',
            keepAlive:false
        }
    }, {
        path: '/usercenter/address',
        name: 'address',
        component: resolve => require(['../views/usercenter/address/index.vue'], resolve),
        meta: {
            title: '收货地址',
            keepAlive:false
        }
    }, {
        path: '/usercenter/address/add',
        name: 'addressAdd',
        component: resolve => require(['../views/usercenter/address/add.vue'], resolve),
        meta: {
            title: '新增收货地址',
            keepAlive:false
        }
    }, {
        path: '/usercenter/setting',
        name: 'setting',
        component: resolve => require(['../views/usercenter/setting/index.vue'], resolve),
        meta: {
            title: '账户信息',
            keepAlive:true
        }
    }, {
        path: '/usercenter/setting/nickname',
        name: 'settingName',
        component: resolve => require(['../views/usercenter/setting/nickname.vue'], resolve),
        meta: {
            title: '昵称'
        }
    }, {
        path: '/usercenter/setting/email',
        name: 'settingEmail',
        component: resolve => require(['../views/usercenter/setting/email.vue'], resolve),
        meta: {
            title: '修改/绑定邮箱'
        }
    }, {
        path: '/passport/resetpassword',
        name: 'resetPassword',
        component: resolve => require(['../views/passport/resetPassword.vue'], resolve),
        meta: {
            title: '修改登录密码'
        }
    },{
        path: '/usercenter/coupon',
        name: 'couponList',
        component: resolve => require(['../views/usercenter/coupon.vue'], resolve),
        meta: {
            title: '我的优惠券'
        }
    },
]
export default usercenter
