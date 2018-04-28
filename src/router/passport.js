// Created by huangwenhao on 2018/4/3.

const Indexs = [
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../views/passport/login.vue'], resolve),
        meta: {
            title: '西牛买买 - 登录'
        }
    }, {
        path: '/register',
        name: 'register',
        component: resolve => require(['../views/passport/register.vue'], resolve),
        meta: {
            title: '西牛买买 - 注册'
        }
    }, {
        path: '/login/register',
        name: 'loginRegister',
        component: resolve => require(['../views/passport/loginRegister.vue'], resolve),
        meta: {
            title: '西牛买买 - 注册'
        }
    }, {
        path: '/passport/forget',
        name: 'forget',
        component: resolve => require(['../views/passport/forget.vue'], resolve),
        meta: {
            title: '忘记密码'
        }
    }, {
        path: '/agreenmentRegister',
        name: 'agreenmentRegister',
        component: resolve => require(['../views/passport/agreenmentRegister.vue'], resolve),
        meta: {
            title: '西牛买买会员注册协议'
        }
    },
]
export default Indexs
