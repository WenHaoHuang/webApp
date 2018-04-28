<template>
    <div class="wrapper wrapper-flex wrapper-order-detail">
        <div class="wrapper-bd">
            <section class="order-summary mb20 flex flex-row flex-align-center">
                <div class="summary-left flex-bd">
                    <div class="summary-row mb10">订单编号：{{orderDetail.orderId}}</div>
                    <div class="summary-row mt10">下单时间：{{orderDetail.createTime}}</div>
                </div>
                <div class="summary-right text-xl" v-if="orderDetail.status == 1">待支付</div>
                <div class="summary-right text-xl" v-if="orderDetail.status == 2">待发货</div>
                <div class="summary-right text-xl" v-if="orderDetail.status == 3">已发货</div>
                <div class="summary-right text-xl" v-if="orderDetail.status == 4">已收货</div>
            </section>
            <!--已发货状态的物流显示-->
            <section class="deliver-info mb20 text-md" v-if="orderDetail.status != 1">
                <router-link :to="{name:'logistics',query:{orderId:orderDetail.orderId}}" class="flex flex-row flex-justify-between flex-align-center"><span
                    class="d-text flex-bd">物流信息:{{orderDetail.deliverInfo.status}}</span><span
                    class="right-arrow"></span></router-link>
            </section>
            <section class="address-box mb20">
                <div class="address-valid flex flex-align-center text-md">
                    <div class="left-info">
                        <div class="name-phone flex mb30">
                            <span class="name-left flex-bd">收货人：{{orderDetail.address.name}}</span><span
                            class="phone-right">{{orderDetail.address.phoneNumber}}</span>
                        </div>
                        <div class="address-detail">
                            收货地址:{{orderDetail.address.detail}}
                        </div>
                    </div>
                </div>
            </section>
            <section class="order-goods-list mb20">
                <order-goods-item v-for="item in orderDetail.proList" :item="item" :key="item.id"></order-goods-item>
            </section>
            <!--配送信息-->
            <section class="order-deliver mb20" v-if="orderDetail.status != 1 && orderDetail.stasus !=2">
                <div class="sec-hd">配送信息</div>
                <div class="sec-cell">配送方式：{{orderDetail.deliverInfo.shipMethod}}</div>
                <div class="sec-cell">联系电话：{{orderDetail.address.phoneNumber}}</div>
                <div class="sec-cell">快递费用：{{orderDetail.totalInfo.deliverFee}}元</div>
            </section>
            <!--支付信息-->
            <section class="order-pay mb20" v-if="orderDetail.status != 1 && orderDetail.stasus !=2">
                <div class="sec-hd">支付信息</div>
                <div class="sec-cell">支付方式：{{orderDetail.paymentInfo.payMethod}}</div>
                <div class="sec-cell">付款时间：{{orderDetail.paymentInfo.payTime}}</div>
                <div class="sec-cell">付款金额：￥{{orderDetail.totalInfo.totalPay}}</div>
            </section>
            <section class="order-total mb20">
                <div class="total-hd text-xl">支付金额</div>
                <div class="total-con">
                    <div class="total-cell text-md"><span>商品总额：</span><span>￥{{orderDetail.totalInfo.totalPrice}}</span>
                    </div>
                    <div class="total-cell text-md"><span>运费共计：</span><span>￥{{orderDetail.totalInfo.deliverFee}}</span>
                    </div>
                    <div class="total-cell text-md"><span>使用优惠券：</span><span>￥{{orderDetail.totalInfo.discount}}</span>
                    </div>
                </div>
                <div class="total-ft text-xl"><span>应付总额：</span><span
                    class="color-red">￥{{orderDetail.totalInfo.totalPay}}</span></div>
            </section>
        </div>
        <div class="wrapper-ft">
            <section class="order-bottom">
                <!--待支付-->
                <div class="wait-pay flex flex-row flex-justify-bettween flex-align-center" v-if="orderDetail.status == 1">
                    <div class="dead-line flex-bd">
                        <div>剩余付款时间</div>
                        <div class="text-xxs"><span class="color-red text-md">{{orderLeftTime.hours}}</span>小时<span
                            class="color-red text-md">{{orderLeftTime.minutes}}</span>分
                        </div>
                    </div>
                    <div class="btn-wrap"><span class="o-btn btn-g mr20"
                                                @click="cancelOrder(orderDetail.orderId)">取消订单</span><span
                        class="o-btn btn-b" @click="goPay()">立即支付</span></div>
                </div>
                <!--待发货待收货已收货-->
                <div class="wait-ship text-right" v-if="orderDetail.status != 1">
                    <div class="btn-wrap"><span class="o-btn btn-g mr20"
                                                @click="cancelOrder(orderDetail.orderId)">取消订单</span><span
                        class="o-btn btn-g" @click="saleAfterFn">联系售后</span></div>
                </div>
            </section>
        </div>
        <pay-order :payLayer="payLayer"></pay-order>
    </div>
</template>

<script>
    import orderGoodsItem from "@/components/orderGoodsItem";
    import payOrder from "@/views/order/payOrder";

    export default {
        name: "order-detail",
        components: {
            orderGoodsItem,
            payOrder
        },
        created() {
            const route = this.$route.query;
            this.getOrderDetail(route.orderId);
            this.payLayer.orderId = route.orderId;
            this.payLayer.userId = this.$cookies.get('userId');
        },
        data() {
            return {
                orderDetail: {
                    address: {},
                    paymentInfo: {},
                    deliverInfo: {},
                    totalInfo: {}
                },
                orderLeftTime: {
                    hours: 0,
                    minutes: 0
                },
                payLayer:{
                    payMethod:1,
                    show:false,
                    amount:0,
                    leftTime:0,
                    orderId:0
                }
            }
        },
        methods: {
            saleAfterFn(){
                this.$confirm({
                    content: '<div class="text-xxxl mb20 text-center">温馨提示</div>售后电话请拨打：400-008-8581',
                    btnText: ['取消', '确认拨打'],
                    callBack: () => {
                        location.href = 'tel:400-008-8581'
                    }
                });
            },
            getOrderDetail(orderId) {
                this.$ajax({
                    api: 'orderDetail',
                    params: {
                        userId:this.$cookies.get('userId'),
                        orderId: orderId
                    }
                }).then((response) => {
                    this.orderDetail = response.data;
                    if(response.data.status == 1){
                        this.showOrderLeftTime(response.data.leftTime)//待支付状态显示订单剩余时间
                        this.payLayer.leftTime = response.data.leftTime;
                        this.payLayer.amount = response.data.totalInfo.totalPay;
                    }
                })
            },
            cancelOrder(orderId) {
                this.$confirm({
                    content: '<div class="text-xxxl mb20 text-center">温馨提示</div>是否确认取消该订单？',
                    btnText: ['取消', '确认'],
                    callBack: () => {
                        this.$ajax({
                            api: 'deleteOrder',
                            params: {
                                userId: this.$cookies.get('userId'),
                                order:orderId
                            }
                        }).then((response) => {
                            this.$msg(response.data)
                            this.$router.push({
                                name: 'orderList'
                            })
                        })
                    }
                })
            },
            showOrderLeftTime(seconds) {
                const self = this;
                if (seconds <= 0) {
                    clearTimeout(timerBottom)
                    //待支付订单失效跳转到我的订单页
                    this.$router.push({
                        name: 'orderList'
                    })
                    return;
                }
                let hours = Math.floor(seconds / 60 / 60);
                let minutes = Math.ceil(seconds / 60 % 60);
                this.orderLeftTime = {
                    hours: hours,
                    minutes: minutes
                }
                seconds--;
                let timerBottom = setTimeout(function () {
                    self.showOrderLeftTime(seconds)
                }, 1000)
            },
            goPay(){
                this.payLayer.show = true;
            }
        }
    }
</script>

<style lang="scss">
    .wrapper-order-detail {
        .color-red {
            color: #F34E73;
        }
        .order-summary {
            padding: 0.2rem 0.3rem;
            background: #fff;
            .summary-row {
                font-size: 0.28rem;
                color: #888;
            }
            .summary-right {
                color: #5D3AE0;
            }
        }
        .address-box {
            background: #fff;
            padding: 0.28rem 0.3rem 0.46rem;
            .address-valid {
                position: relative;
                &:after {
                    content: '';
                    width: 7.5rem;
                    height: 0.06rem;
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    transform: translate(-50%, 0.46rem);
                    background: repeating-linear-gradient(135deg, #94BAEC, #94BAEC 0.3rem, white 0.3rem, white 0.4rem, #DC6D67 0.4rem, #DC6D67 0.7rem, white 0.7rem, white 0.8rem, #F2DAAB 0.8rem, #F2DAAB 1.1rem, white 1.1rem, white 1.2rem);
                }
            }
        }
        .order-goods-list {
            background: #fff;
            .item_pro .item_price .amount {
                color: #888;
            }
        }
        .order-total {
            background: #fff;
            padding: 0 0.3rem;
            .total-hd, .total-ft {
                padding: 0.22rem 0;
            }
            .total-hd {
                color: #888;
            }
            .total-ft {
                border-top: 1px solid #e0e0e0;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .total-cell {
                padding: 0.16rem 0;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
        }
        .order-bottom {
            background: #fff;
            padding: 0.1rem 0.3rem;
            .dead-line {
                color: #8f8f8f;
            }
            .o-btn {
                display: inline-block;
                line-height: 0.48rem;
                padding: 0 0.14rem;
                border-radius: 0.24rem;
            }
            .btn-g {
                border: 1px solid #888;
                color: #888;
            }
            .btn-b {
                border: 1px solid #5D3AE0;
                color: #5D3AE0;
            }
            .wait-ship {
                padding: 0.16rem 0;
            }
        }
        .deliver-info {
            padding: 0.26rem 0.3rem 0.22rem;
            background: #fff;
            .d-text {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            span {
                display: block;
            }
            .right-arrow {
                width: 0.2rem;
                height: 0.2rem;
                border-right: 1px solid #a0a0a0;
                border-bottom: 1px solid #a0a0a0;
                transform: rotate(-45deg);
            }
        }
        .order-deliver, .order-pay {
            background: #fff;
            padding: 0.2rem 0.3rem 0.04rem;
        }

        .sec-hd {
            color: #888;
            margin-bottom: 0.2rem;
        }
        .sec-cell {
            margin-bottom: 0.16rem;
        }
    }
</style>
