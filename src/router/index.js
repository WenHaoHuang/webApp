import Router from 'vue-router'

import Indexs from './default.js'
import product from './product.js'
import order from './order.js'
import usercenter from './usercenter.js'
import passport from './passport.js'
import cart from './cart.js'

const routes = [].concat(Indexs, usercenter, product, order, passport, cart)

const router = new Router({
    routes: routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title + ' - 西牛买买'
    next()
})

export default router;
