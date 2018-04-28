/**
* 订单物流
*/
<template>
    <scroll-box @pullUp="getOrderInfo" showTop class="page-consumerOrder-detail">
        <article class="order-log">
            <section class="section_hd container pt20 bg-white pb20">
                <div class="name pb10">物流公司：{{orderInfo.logName}}</div>
                <div class="logid">物流单号：{{orderInfo.logistics}}</div>
            </section>
            <div class="section_bd mt20 bg-white" v-if="orderInfo.orderLog && orderInfo.orderLog.length > 0">
                <div class="item_log" v-for="item in orderInfo.orderLog" :key="item.id">
                    <div class="info">{{item.info}}</div>
                    <div class="time">{{item.time}}</div>
                </div>
            </div>
        </article>
    </scroll-box>
</template>

<script>
    export default {
        name: 'logistics',
        data() {
            return {
                orderInfo: {}
            }
        },
        mounted() {
            this.getOrderInfo();
        },
        methods: {
            getOrderInfo() {
                this.$ajax({
                    api: 'getOrderInfo',
                    params: {
                        userId: this.$cookies.get('userId'),
                        orderId: this.$route.query.orderId
                    }
                }).then(res=>{
                    this.orderInfo = res.data;
                })
            }
        }
    }
</script>

<style lang="scss">
    .page-consumerOrder-detail {
        .section_bd {
            padding: 0.5rem 0.3rem 0 0.3rem;
            .item_log {
                position: relative;
                padding: 0 0 0.4rem 0.7rem;
                color: #8F8F8F;
                .log_time {
                    padding-top: 0.06rem;
                }
                &:before, &:after {
                    position: absolute;
                    content: '';
                }
                &:before {
                    top: 0;
                    bottom: 0;
                    left: 0.34rem;
                    border-left: 0.02rem solid #D0D0D0;
                }
                &:after {
                    top: 0.12rem;
                    left: 0.25rem;
                    width: 0.2rem;
                    height: 0.2rem;
                    border-radius: 0.2rem;
                    background-color: #D0D0D0;
                }
                &:first-child {
                    color: #5D3AE0;
                    &:before {
                        top: 0.12rem;
                    }
                    &:after {
                        background-color: #5D3AE0;
                        box-shadow: 0 0 0 0.04rem rgba(#5D3AE0,0.3);
                    }
                }
            }
        }
    }
</style>
