/**
 * @author : wenhao.huang
 * @date   : 2018/4/12
 * @project: 购物车
 */

const Indexs = [
    {
        path: '/cart',
        name: 'cart',
        component: resolve => require(['../views/cart/index.vue'], resolve),
        meta: {
            title: '购物车'
        }
    },
]
export default Indexs
