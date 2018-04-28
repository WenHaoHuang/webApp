<template>
    <article class="wrapper wrapper-cart">
        <div class="wrapper flex flex-column flex-justify-center flex-align-center" v-if="isEmpty">
            <div class="item-desc text-center text-gray text-lg mb40">您的购物车还空着呢，<br>商品那么多，快去看看吧~</div>
            <router-link :to="{name:'index'}" class="btn btn-primary is-square btn-empty btn-lg">去逛逛</router-link>
        </div>
        <div class="wrapper wrapper-flex" v-if="!isEmpty">
            <div class="wrapper-bd">
                <scroll-box @pullUp="getCartData" showTop>
                    <delete-item v-for="(item,index) in cartData" :key="item.skuId" @onDelete="deleteFn(item,index)">
                        <div class="cart-list bg-white">
                            <div class="item-cart">
                                <div class="i-check" :class="{'checked':item.checked}" @click="checkFn(item)"></div>
                                <div class="item-thumb">
                                    <img :src="item.skuPic" :alt="item.skuName">
                                </div>
                                <div class="item-info">
                                    <div class="sku-name">{{item.skuName}}</div>
                                    <div class="sku-desc">{{item.skuDesc}}</div>
                                </div>
                            </div>
                            <div class="cart-desc">
                                <div class="item-price">￥{{item.price}}</div>
                                <div class="item-num">
                                    <div class="reduce" @click="itemNumFn(item,-1)"></div>
                                    <div class="num">{{item.count}}</div>
                                    <div class="add" @click="itemNumFn(item,1)"></div>
                                </div>
                            </div>
                        </div>
                    </delete-item>
                </scroll-box>
            </div>
            <div class="wrapper-ft flex cart-count flex-align-center">
                <div class="check-all" @click="checkAllFn">
                    <div class="i-check" :class="{'checked': allSelect}"></div>
                    全选
                </div>
                <div class="item-total">合计：<span class="text-danger">￥{{total}}</span></div>
                <div class="btn btn-primary is-square btn-lg" @click="orderFn" :class="{'disabled':selectedGoods.length==0}">结算({{selectedGoods.length}})</div>
            </div>
        </div>
    </article>
</template>

<script>
    import deleteItem from '@/components/deleteItem'

    export default {
        name: "index",
        components: {
            deleteItem
        },
        data() {
            return {
                isEmpty: false,
                cartData: '',
                total: '0.00'
            }
        },
        created() {
            this.$isLogin().then(() => {
                this.getCartData()
            }).catch(() => {
                this.$msg('请登录后查看购物车')
                this.$router.push({
                    name: 'login',
                    query: {
                        retUrl: this.$router
                    }
                })
            })
        },
        computed: {
            allSelect: {
                get() {
                    if (this.cartData.length == 0)return false
                    return this.cartData.every(item => item.checked)

                },
                set(val) {
                    if (this.cartData.length == 0) return false
                    this.cartData.forEach(item => {
                        item.checked = val
                    })

                }
            },
            selectedGoods(){
                let temp = []
                let sum = 0
                if(this.cartData.length==0) return []
                this.cartData.forEach(item=>{
                    if(item.checked){
                        temp.push(item)
                        sum += item.price * item.count
                    }
                })
                this.total = sum.toFixed(2)
                return temp
            }
        },
        methods: {
            getCartData() {
                this.$loading.start()
                this.$ajax({
                    api: 'getCartData',
                    params: {
                        userId: this.$cookies.get('userId')
                    }
                }).then((response) => {
                    let result = response.data
                    result.forEach(item => {
                        item.checked = false
                    })
                    this.cartData = result
                    if (this.cartData.length <= 0) {
                        this.isEmpty = true
                    }
                    this.$loading.stop()
                })
            },
            checkFn(item) {
                item.checked = !item.checked
            },
            itemNumFn(item, num) {
                item.count += num;
                if (item.count <= 0) {
                    item.count = 1
                }
            },
            checkAllFn() {
                this.allSelect = !this.allSelect
            },
            deleteFn(item, index) {
                this.$confirm({
                    content: '<div class="text-xxxl mb20 text-center">删除商品</div>是否确认从购物车中删除该商品？',
                    btnText: ['再想想', '确认删除'],
                    callBack: () => {
                        this.$ajax({
                            api: 'deleteCart',
                            params: {
                                userId: this.$cookies.get('userId'),
                                skuId: item.skuId
                            }
                        }).then(() => {
                            this.cartData.splice(index, 1)
                        })
                    }
                });
            },
            orderFn() {
                if (this.selectedGoods.length <= 0) {
                    this.$msg('您还没有选择任何商品~')
                    return false
                }
                //立即购买 --> 订单确认页
                let sku = [];
                this.selectedGoods.forEach((item) => {
                    sku.push({
                        skuId:item.skuId,
                        count:item.count
                    })
                });
                window.sessionStorage.setItem('sku',JSON.stringify(sku));
                this.$router.push({
                    name: 'orderConfirm',
                    query: {
                        from: 'cart'
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "~assets/css/variable";

    .wrapper-cart {
        .btn-empty {
            width: 4rem;
        }
        .cart-list {
            padding: 0.3rem 0;
            border-bottom: 0.02rem solid $lineColor
        }
        .item-cart {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            padding: 0 0.3rem;
        }
        .item-thumb {
            margin: 0 0.2rem;
            width: 1.42rem;
            height: 1.42rem;
        }
        .item-info {
            height: 1.42rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
        }
        .sku-name {
            flex: 1;
            line-height: 1.2;
        }
        .sku-desc {
            width: 100%;
            font-size: 0.24rem;
            padding: 0.1rem 0.2rem;
            background-color: $bgColor;
            color: $gray;
        }
        .cart-desc {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0.2rem 0.3rem 0 2.52rem;
        }
        .item-price {
            flex: 1;
            color: $danger;
            font-size: 0.30rem;
        }
        .item-num {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border: 0.02rem solid $light;
            .num {
                text-align: center;
                width: 2em;
            }
            .reduce, .add {
                width: 0.6rem;
                height: 0.6rem;
                background-color: $bgColor;
                position: relative;
                cursor: pointer;
                &:before {
                    position: absolute;
                    content: '';
                    width: 0.4rem;
                    border-top: 0.03rem solid $light;
                    left: 0.1rem;
                    top: 0.28rem;
                }
            }
            .reduce {
                border-right: 0.02rem solid $light;
            }
            .add {
                border-left: 0.02rem solid $light;
                &:after {
                    position: absolute;
                    content: '';
                    height: 0.4rem;
                    border-left: 0.03rem solid $light;
                    left: 0.28rem;
                    top: 0.1rem;
                }
            }
        }
        .cart-count {
            background-color: $white;
            border-top: 0.02rem solid $lineColor;
            .item-total {
                flex: 1;
            }
            .check-all {
                padding: 0 0.3rem;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                .i-check {
                    margin-right: 0.2rem;
                }
            }
        }
    }
</style>
