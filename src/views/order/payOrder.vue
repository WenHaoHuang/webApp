<template>
    <div class="page page-flex page-pay-order">
        <div class="ker-mask ker-animate-fade-in" v-if="payLayer.show"></div>
        <div class="ker-picker layer-pay-method ker-animate-slide-up" v-if="payLayer.show">
            <div class="ker-picker_hd">
                <div class="text-center text-gray pt20 pb20 text-xl cells-line">选择支付方式</div>
                <div class="text-center text-gray pt20 pb20 text-xs cells-line">应付金额<span class="text-danger">￥{{payLayer.amount}}</span>请在{{orderLeftTime}}内完成支付
                </div>
            </div>
            <div class="ker-picker_bd text-xl">
                <div class="cells-flex pt20 pb20 pl30 pr30 cells-line">
                    <div class="cell_hd_icon icon_zhifubao"></div>
                    <div class="cell_bd text-gray">支付宝支付</div>
                    <div class="cell_ft">
                        <div class="i-check" :class="{'checked':payLayer.payMethod == 1}"
                             @click="payLayer.payMethod = 1"></div>
                    </div>
                </div>
                <div class="cells-flex pt20 pb20 pl30 pr30 cells-line">
                    <div class="cell_hd_icon icon_weixin"></div>
                    <div class="cell_bd text-gray">微信支付</div>
                    <div class="cell_ft">
                        <div class="i-check" :class="{'checked':payLayer.payMethod == 2}"
                             @click="payLayer.payMethod = 2"></div>
                    </div>
                </div>
                <div class="cells-flex pt20 pb20 pl30 pr30 cells-line">
                    <div class="cell_hd_icon icon_bank"></div>
                    <div class="cell_bd text-gray">银联在线支付</div>
                    <div class="cell_ft">
                        <div class="i-check" :class="{'checked':payLayer.payMethod == 3}"
                             @click="payLayer.payMethod = 3"></div>
                    </div>
                </div>
                <div class="flex mt80">
                    <section class="flex-bd btn btn-primary btn-lg is-square"
                             @click="payOrder(payLayer.orderId,payLayer.amount)">确认支付
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "payOrder",
        props:{
            payLayer:{
                type:Object,
                default: function () {
                    return {}
                }
            }
        },
        data(){
            return{
                orderLeftTime:'0时0分',
                timer:0
            }
        },
        watch: {
            'payLayer.leftTime': function (val) {
                this.showOrderLeftTime(val)
            }
        },
        methods: {
            showOrderLeftTime(seconds){
                const self = this;
                if(seconds <= 0){
                    clearTimeout(this.timer);
                    //待支付订单失效跳转到我的订单页
                    this.$router.push({
                        name:'orderList'
                    })
                    return;
                }
                let hours = Math.floor(seconds/60/60);
                let minutes = Math.ceil(seconds/60%60);//由于只显示到分所以分钟应该向上取整
                this.orderLeftTime = `${hours}时${minutes}分`;
                seconds--;
                this.timer = setTimeout(function(){
                    self.showOrderLeftTime(seconds)
                },1000)
            },
            payOrder(orderId,amount) {
                this.$ajax({
                    api: 'payOrder',
                    params: {
                        payMethod: this.payLayer.payMethod,
                        orderId: orderId,
                        userId:this.$cookies.get('userId')
                    }
                }).then((response) => {
                    if (response.success) {
                        this.$router.push({
                            name: 'orderResult',
                            query: {
                                orderId: orderId,
                                amount: amount,
                                result: 1
                            }
                        })
                    }
                }).catch((error) => {
                    this.$router.push({
                        name: 'orderResult',
                        query: {
                            orderId: orderId,
                            amount: amount,
                            result: 0,
                            errorMessage: error
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="scss">
    .page-pay-order {
        .ker-mask {
            position: fixed;
            z-index: 500;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
        }
        .ker-picker {
            position: fixed;
            z-index: 501;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #FFF;
        }
        .layer-pay-method {
            .cell_hd_icon {
                width: 0.48rem;
                height: 0.48rem;
                margin-right: 0.2rem;
                background: transparent none scroll center center no-repeat;
                background-size: 100% auto;
            }
            .icon_zhifubao {
                background-image: url("~assets/img/pay_alipay.png");
            }
            .icon_weixin {
                background-image: url("~assets/img/pay_wechatpay.png");
            }
            .icon_bank {
                background-image: url("~assets/img/pay_unionpay.png");
            }
        }
    }
</style>
