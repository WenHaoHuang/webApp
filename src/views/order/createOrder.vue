<template>
    <div class="page page-full white page-createconsumerorder">
        <div class="page_wrap">
            <div class="section_create_success cells-flex">
                <div class="item_icon cell_hd"></div>
                <div class="item_msg cell_bd">
                    <div class="msg_tit">恭喜您下单成功！</div>
                    请完成以下信息校验，即可前往支付
                </div>
            </div>
            <div class="section_user mt30">
                <div class="item_title">账户信息</div>
                <div class="cells cells-flex">
                    <div class="cell_dot dot_1"></div>
                    <div class="cell_hd">理财人姓名：</div>
                    <div class="cell_bd text-right">{{orderInfo.realName}}</div>
                </div>
                <div class="cells cells-flex">
                    <div class="cell_dot dot_2"></div>
                    <div class="cell_hd">账号：</div>
                    <div class="cell_bd text-right">{{orderInfo.username}}</div>
                </div>
                <div class="cells cells-flex">
                    <div class="cell_dot dot_3"></div>
                    <div class="cell_hd">身份证号：</div>
                    <div class="cell_bd text-right">{{orderInfo.idNumber}}</div>
                </div>
            </div>
            <div class="section_auto_invest">
                <div class="item_title">自动投标授权</div>
                <div class="check_auto_invest cells-flex" :class="{'checked':isAutoInvest}" @click="checkAutoInvest">
                    <div class="i-check" :class="{'selected':isAutoInvest}"></div>
                    <div class="check_bd">
                        我已知晓并授权代我行使投资决策
                        <div class="check_err" v-if="!isAutoInvest">请勾选</div>
                    </div>
                </div>
            </div>
            <div class="section_amount">
                <div class="item_title">账户余额</div>
                <div class="cells cells-flex">
                    <div class="cell_dot dot_4"></div>
                    <div class="cell_hd">当前余额：</div>
                    <div class="cell_bd text-right">{{orderInfo.balanceAmount}}元</div>
                </div>
                <div class="cells cells-flex">
                    <div class="cell_dot dot_4"></div>
                    <div class="cell_hd">应付金额：</div>
                    <div class="cell_bd text-right text-danger">{{orderInfo.payAmount}}元</div>
                </div>
            </div>
            <div class="section_tip mt30" v-if="orderInfo.payStatus == 2">您的余额不足，请充值9999.99元</div>
            <div class="section_tip mt30" v-if="orderInfo.payStatus == 3">您还未开户，请先开通北京银行存管账户</div>
            <div class="cells text-center btn btn-danger mt30" v-if="orderInfo.payStatus == 1" @click="pageFn">确认</div>
            <div class="cells text-center btn btn-danger mt30" v-if="orderInfo.payStatus == 2" @click="pageFn">立即充值
            </div>
            <div class="cells text-center btn btn-danger mt30" v-if="orderInfo.payStatus == 3" @click="pageFn">立即开户
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "consumerTradeCreatOrder",
        data() {
            return {
                queryData: {},
                orderInfo: {},
                isAutoInvest: true,
            };
        },
        activated() {
            const route = this.$route.query;
            this.queryData = route;
            this.creatOrder();
        },
        methods: {
            creatOrder() {
                this.$ajax(
                    {
                        api: "createOrder",
                        params: {
                            addressId: this.queryData.addressId,
                            couponType: this.queryData.couponType,
                            phoneNumber: this.queryData.phoneNumber,
                            cycle: this.queryData.cycle,
                            num: this.queryData.num,
                            skuId: this.queryData.skuId
                        }
                    },
                    response => {
                        if (response.success) {
                            this.orderInfo = response.data;
                            // 未开户，理财人姓名和身份证账号均显示未开户
                            if (response.data.payStatus == 3) {
                                this.orderInfo.idNumber = '未开户';
                                this.orderInfo.realName = '未开户';
                            }
                            // this.orderInfo.payStatus:1,立即支付2,立即充值3,立即开户
                        } else {
                            this.$toast({
                                text: response.errorMessage
                            });
                        }
                    }
                );
            },
            checkAutoInvest() {
                this.isAutoInvest = !this.isAutoInvest;
            },
            pageFn() {
                if (this.orderInfo.payStatus == 3) {
                    // 立即开户
                    this.$router.push({
                        path: '/passport/user/openAccount'
                    });
                } else if (this.orderInfo.payStatus == 2) {
                    // 立即充值
                    this.$router.push({
                        path: '/passport/user/recharge'
                    });
                } else if (!this.isAutoInvest) {
                    this.$toast({
                        text: '请开启自动投标授权'
                    });
                } else {
                    // 立即支付
                    // 缓存orderInfo
                    sessionStorage.setItem('createOrder', JSON.stringify(this.orderInfo));
                    this.$router.push({
                        path: '/consumer/trade/payOrder',
                        query: {
                            id: this.orderInfo.consumerOrderId
                        }
                    });
                }
            }
        }
    };
</script>

<style lang="scss">
    .page-createconsumerorder {
        .section_user,
        .section_amount, .section_auto_invest {
            position: relative;
            box-shadow: 0 0 0.2rem 0 #d0d0d0;
            font-size: 0.28rem;
            padding: 0.4rem 0.3rem;
            .item_title {
                position: absolute;
                z-index: 2;
                left: 50%;
                top: -0.24rem;
                width: 1.76rem;
                height: 0.48rem;
                margin-left: -0.88rem;
                text-align: center;
                line-height: 0.5rem;
                color: #fff;
                font-size: 0.28rem;
            }
            .cells {
                padding-top: 0.1rem;
            }
            .cell_dot {
                margin-right: 0.1rem;
                content: "";
                width: 0.1rem;
                height: 0.1rem;
                background-color: #fb7c75;
                border-radius: 0.1rem;
                &.dot_1 {
                    background-color: #fb7c75;
                }
                &.dot_2 {
                    background-color: #1bc289;
                }
                &.dot_3 {
                    background-color: #448ff2;
                }
                &.dot_4 {
                    background-color: #ff9a2d;
                }
            }
        }
        .section_user .item_title {
            background: transparent url("~assets/img/3index_consumer/life_yz_zhanghuxinxi.png") scroll center center no-repeat;
            background-size: 100% 100%;
        }
        .section_auto_invest {
            margin-top: 0.5rem;
            .item_title {
                width: 2.32rem;
                margin-left: -1.16rem;
                background: transparent url("~assets/img/3index_consumer/youxiang_yanzheng_bg.png") scroll center center no-repeat;
                background-size: 100% 100%;
            }
            .check_auto_invest {
                align-items: flex-start;
                .check_err {
                    color: #FB7C75;
                    font-size: 0.24rem;
                }
                .i-check {
                    position: relative;
                    margin-right: 0.1rem;
                    width: 0.4rem;
                    height: 0.4rem;
                    border-radius: 0.4rem;
                    border: 1px solid #fb7c75;
                    background-color: transparent;
                    &.selected {
                        &:after {
                            content: "";
                            position: absolute;
                            border-left: 1px solid #fff;
                            border-bottom: 1px solid #fff;
                            width: 0.18rem;
                            height: 0.08rem;
                            left: 50%;
                            top: 50%;
                            margin-left: -0.1rem;
                            margin-top: -0.08rem;
                            transform: rotate(-45deg);
                        }
                        background-color: #fb7c75;
                    }
                }

            }
        }
        .section_amount {
            margin-top: 0.5rem;
            .item_title {
                background: transparent url("~assets/img/3index_consumer/life_yz_zhanghuyue.png") scroll center center no-repeat;
                background-size: 100% 100%;
            }
        }
        .section_tip {
            border-radius: 1rem;
            color: #fb7c75;
            text-align: center;
            font-size: 0.28rem;
            line-height: 0.4rem;
            padding: 0.3rem;
            background-color: #ffefee;
        }
        .section_create_success {
            padding: 0.4rem 0.3rem;
            font-size: 0.26rem;
            .item_icon {
                margin-right: 0.3rem;
                width: 0.6rem;
                height: 0.6rem;
                background: transparent url("~assets/img/3index_consumer/life_xiadan_success.png") scroll center center no-repeat;
                background-size: 100% 100%;
            }
            .msg_tit {
                padding-bottom: 0.1rem;
                font-size: 0.32rem;
                font-weight: bold;
            }
        }
    }
</style>
