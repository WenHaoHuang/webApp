<template>
    <article class="wrapper wrapper-flex wrapper-order-confirm">
        <div class="wrapper-bd">
            <section class="container pt30 pb30 bg-white text-md">
                <router-link class="address-valid flex flex-row flex-align-center flex-justify-between"
                             :to="{ name: 'selectAddress',query:{from:orderFrom}}" v-if="userAddress.length">
                    <div class="left-info flex-bd" v-for="item in userAddress"
                         v-if="item.addressId == orderData.addressId">
                        <div class="name-phone flex flex-justify-between mb30">
                            <span class="name-left">收货人：{{item.addressName}}</span><span class="phone-right">{{item.receiverphoneNumber}}</span>
                        </div>
                        <div class="address-detail">
                            收货地址:{{item.receiverAddressDetail}}
                        </div>
                    </div>
                    <div class="right-arrow"></div>
                </router-link>
                <router-link class="no-address address-valid flex flex-row flex-align-center  flex-justify-between"
                             :to="{name:'selectAddress',query:{from:orderFrom}}" v-else>
                    <div class="left-info">
                        请先填写收获地址
                    </div>
                    <div class="right-arrow"></div>
                </router-link>
            </section>
            <section class="commodity_box mt20 bg-white">
                <order-goods-item :item="item" v-for="item in proList" :key="item.id"></order-goods-item>
            </section>
            <section class="text-lg bg-white mt20 mb20">
                <div class="pt20 pb20 pl30 text-gray cells-line">支付金额</div>
                <div class="cells-flex cells-before">
                    <div class="cell_bd text-gray">商品总额</div>
                    <div class="cell_ft">￥{{orderData.total.amount}}</div>
                </div>
                <div class="cells-flex cells-before">
                    <div class="cell_bd text-gray">运费总计</div>
                    <div class="cell_ft">￥{{orderData.total.deliverFee}}</div>
                </div>
                <router-link :to="{name:'couponList'}" class="cells-flex cells-before cells-arrow">
                    <div class="cell_bd text-gray">使用优惠券</div>
                    <div class="cell_hd">-￥{{orderData.total.coupon}}</div>
                    <div class="cell_ft"></div>
                </router-link>
                <div class="cells-flex cells-before">
                    <div class="cell_bd text-gray">总计</div>
                    <div class="cell_ft text-danger">￥{{orderData.total.needPay}}</div>
                </div>
            </section>
        </div>
        <div class="wrapper-ft flex">
            <section class="flex-bd btn btn-primary btn-lg is-square" @click="createOrder">提交订单</section>
        </div>
        <pay-order :payLayer="payLayer"></pay-order>
    </article>
</template>

<script>
    import orderGoodsItem from "@/components/orderGoodsItem";
    import payOrder from "./payOrder";

    export default {
        name: "orderConfirm",
        components: {
            orderGoodsItem,
            payOrder
        },
        data() {
            return {
                localUrl: '',
                orderFrom: '',
                orderData: {
                    addressId: '',
                    wareInfo: [],
                    total: {
                        amount: 0,
                        deliverFee: 0,
                        coupon:0,
                        needPay: 0
                    }
                },
                phoneNumber: "",
                proInfo: {},
                userAddress: [],
                proList: [],
                skuIdArr: [],
                skuNumArr: [],
                payLayer: {
                    payMethod: 1,
                    show: false,
                    amount: 0,
                    leftTime: 0,
                    orderId: 0
                }
            };
        },
        created() {
            this.localUrl = window.location.href;
            this.skuIdArr = [];
            const route = this.$route.query;
            this.orderFrom = route.from;
            //是否选择了优惠券
            if(route.coupon){
                this.orderData.total.coupon = route.coupon;
            }
            //获取地址信息
            this.getAddress();
            //获取选择的商品信息
            const wareInfo = JSON.parse(sessionStorage.getItem('sku'));
            this.orderData.wareInfo = wareInfo;
            this.getProList(wareInfo);
        },
        methods: {
            getAddress() {
                this.$loading.start();
                const route = this.$route.query;
                this.$ajax({
                    api: 'getUserAddress',
                    params: {
                        userId: this.$cookies.get('userId')
                    }
                }).then((response) => {
                    this.$loading.stop();
                    if (response.data.length) {
                        this.userAddress = response.data;
                        this.orderData.addressId = route.addressId ? route.addressId : this.userAddress[0].addressId;
                    }
                })
            },
            getProList(wareInfo) {
                this.$ajax({
                    api: 'getOrderConfirmSkuList',
                    params: {
                        sku: wareInfo
                    }
                }).then((response) => {
                    if (response.success) {
                        this.proList = response.data.list;
                        this.orderData.total.amount = response.data.totalAmount;
                        this.orderData.total.deliverFee = response.data.deliverFee;
                        this.calculationTotal();
                    }
                })
            },
            calculationTotal() {
                let amount = this.orderData.total.amount;
                let deliverFee = this.orderData.total.deliverFee;
                let coupon = this.orderData.total.coupon;
                let needPay = amount + deliverFee - coupon;
                this.orderData.total.needPay = needPay.toFixed(2);
            },
            createOrder() {
                this.$loading.start();
                this.$ajax({
                    api: 'createOrder',
                    params: {
                        form:this.orderFrom,
                        sku:this.orderData.wareInfo,
                        addressId: this.orderData.addressId,
                        userId:this.$cookies.get('userId')
                    }
                }).then((response) => {
                    this.$loading.stop();
                    this.payLayer.show = true;
                    this.payLayer.amount = response.data.amount;
                    this.payLayer.orderId = response.data.orderId;
                    this.payLayer.leftTime = response.data.leftTime;
                })
            }
        }
    };
</script>

<style lang="scss">
    .wrapper-order-confirm {
        .address-valid {
            position: relative;
            .right-arrow {
                width: 0.2rem;
                height: 0.2rem;
                border-right: 1px solid #a0a0a0;
                border-bottom: 1px solid #a0a0a0;
                transform: rotate(-45deg);
            }
            &:after {
                content: '';
                width: 7.5rem;
                height: 0.06rem;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translate(-50%, 500%);
                background: repeating-linear-gradient(135deg, #94BAEC, #94BAEC 0.3rem, white 0.3rem, white 0.4rem, #DC6D67 0.4rem, #DC6D67 0.7rem, white 0.7rem, white 0.8rem, #F2DAAB 0.8rem, #F2DAAB 1.1rem, white 1.1rem, white 1.2rem);
            }
        }
    }
</style>
