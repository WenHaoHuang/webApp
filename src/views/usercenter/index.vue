<template>
        <article class="wrapper wrapper-uc wrapper-uc-index">
            <div class="uc-kf" @click="kfFn">联系客服</div>
            <scroll-box @pullUp="getUserInfo" showTop>
                <div class="container-uc-index">
                    <div class="uc-header pt40  text-center text-white">
                        <div class="text-xxxl">Hi，{{userInfo.nickname}}</div>
                        <div class="text-sm">{{userInfo.textTip}}</div>
                    </div>
                    <div class="container">
                        <div class="uc-box uc-order">
                            <div class="title-box">我的订单
                                <router-link :to="{name:'orderList'}">全部 &gt;</router-link>
                            </div>
                            <div class="tbody-box">
                                <router-link :to="{name:'orderList',query:{status:1}}" class="item-order">
                                    <span class="pop" v-if="userInfo.orderInfo.newOrder != 0">{{userInfo.orderInfo.newOrder}}</span>
                                    <div class="item-icon">
                                        <i class="icon icon-await"></i>
                                    </div>
                                    待支付
                                </router-link>
                                <router-link :to="{name:'orderList',query:{status:2}}" class="item-order">
                                    <span class="pop" v-if="userInfo.orderInfo.paidOrder != 0">{{userInfo.orderInfo.paidOrder}}</span>
                                    <div class="item-icon">
                                        <i class="icon icon-bag"></i>
                                    </div>
                                    待发货
                                </router-link>
                                <router-link :to="{name:'orderList',query:{status:3}}" class="item-order">
                            <span class="pop"
                                  v-if="userInfo.orderInfo.deliveredOrder != 0">{{userInfo.orderInfo.deliveredOrder}}</span>
                                    <div class="item-icon">
                                        <i class="icon icon-car"></i>
                                    </div>
                                    待收货
                                </router-link>
                                <router-link :to="{name:'orderList',query:{status:4}}" class="item-order">
                            <span class="pop"
                                  v-if="userInfo.orderInfo.receivedOrder != 0">{{userInfo.orderInfo.receivedOrder}}</span>
                                    <div class="item-icon">
                                        <i class="icon icon-bag-o"></i>
                                    </div>
                                    已收货
                                </router-link>
                            </div>
                        </div>
                        <div class="uc-box uc-account">
                            <div class="title-box">我的账户</div>
                            <div class="tbody-box">
                                <div class="item-order" @click="kfFn">
                                    <div class="item-icon item-kf"></div>
                                    客户服务
                                </div>
                                <router-link :to="{name:'couponList'}" class="item-order">
                                    <div class="item-icon item-yh"></div>
                                    优惠券
                                </router-link>
                                <router-link :to="{name:'address'}" class="item-order">
                                    <div class="item-icon item-address"></div>
                                    收货地址
                                </router-link>
                                <router-link :to="{name:'setting'}" class="item-order">
                                    <span class="pop" v-if="userInfo.accountStatus">去完善</span>
                                    <div class="item-icon item-user">
                                    </div>
                                    账户信息
                                </router-link>
                            </div>
                        </div>
                        <div class="uc-box uc-flow">
                            <div class="title-box">最新物流</div>
                            <div class="tbody-box">
                                <router-link :to="{name:'logistics',query:{orderId:item.orderId}}" class="cells-flex cells-arrow item-flow" v-for="item in userInfo.logistics" :key="item.id">
                                    <div class="cell_hd item-thumb"><img :src="item.pic" :alt="item.status"></div>
                                    <div class="cell_bd">
                                        <div class="item-status text-primary text-lg">{{item.status}}</div>
                                        <div class="item-desc">{{item.desc}}</div>
                                    </div>
                                    <div class="cell_ft"></div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </scroll-box>
        </article>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                userInfo: {
                    orderInfo: {
                        newOrder: 0,
                        paidOrder: 0,
                        deliveredOrder: 0,
                        receivedOrder: 0
                    }
                }
            }
        },
        activated() {
            this.getUserInfo()
        },
        methods: {
            getUserInfo() {
                this.$ajax({
                    api: 'getUserInfo',
                    params: {
                        userId: this.$cookies.get('userId')
                    }
                }).then((response) => {
                    this.userInfo = response.data
                })
            },
            kfFn() {
                this.$confirm({
                    content: '<div class="text-xxxl mb20 text-center">温馨提示</div>客服电话请拨打：400-008-8581',
                    btnText: ['取消', '确认拨打'],
                    callBack: () => {
                        location.href = 'tel:400-008-8581'
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    @import "~assets/css/usercenter.scss";
</style>
