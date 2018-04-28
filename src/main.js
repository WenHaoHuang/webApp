// Created by huangwenhao on 2018/3/8.

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import notify from 'components/wap/notify/index'
Vue.use(notify)
import Toast from 'components/wap/toast/index';
Vue.use(Toast);

import api from './api'
Vue.use(api);

import util from './util/utils'
Vue.use(util);

import * as myCookies from 'js-cookie'
Vue.prototype.$cookies = myCookies

import IButton from 'components/wap/button/';
Vue.use(IButton);

import loading from 'components/wap/loading/index.js';
Vue.use(loading);

import scrollBox from 'components/wap/scrollBox'
Vue.component('scrollBox',scrollBox)

import router from './router'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
