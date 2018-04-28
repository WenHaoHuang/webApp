<template>
    <div class="page order-result">
        <div class="order-success" v-if="result">
            <section class="result-box">
                <div class="r-icon s-icon mb40"></div>
                <div class="r-txt text-xl mb20">订单已支付成功</div>
                <div class="r-tips text-sm mb80">您已成功支付{{amount}}元，我们将尽快为您处理</div>
            </section>
            <section class="btn-wrap flex flex-row flex-justify-between text-xxxl">
                <router-link :to="{name:'productList'}" class="item-btn left">继续逛逛</router-link>
                <router-link :to="{ name: 'orderDetail', query: { orderId: orderId }}" class="item-btn right">查看订单</router-link>
            </section>
        </div>
        <div class="order-fail" v-else>
            <section class="result-box">
                <div class="r-icon f-icon mb40"></div>
                <div class="r-txt text-xl mb20">订单已支付失败</div>
                <div class="r-tips text-sm mb80">错误原因：{{errorMessage}}</div>
            </section>
            <section class="btn-wrap flex flex-row flex-justify-between text-xxxl">
                <a href="tel:4000088581" class="item-btn left">联系客服</a>
                <router-link :to="{ name: 'orderDetail', query: { orderId: orderId }}" class="item-btn right">重新支付</router-link>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderResult",
        data() {
            return {
                orderId:0,
                amount:0,
                result:1,
                errorMessage:''
            };
        },
        created(){
            const route = this.$route.query;
            this.orderId = route.orderId;
            this.amount = route.amount;
            this.result = route.result;
            if(!this.result){
                this.errorMessage = route.errorMessage;
            }
        },
        methods: {
        }
    };
</script>

<style lang="scss">
    .order-result{
        width:100%;
        height:100%;
        background:#fff;
        .result-box{
            text-align: center;
            padding:0.8rem 0 0 0;
            .r-icon{
                width:1.2rem;
                height:1.2rem;
                margin:0 auto 0.4rem;
                &.s-icon{
                    background:transparent url('~assets/img/order-s-i.png') no-repeat center center;
                    background-size:cover;
                }
                &.f-icon{
                    background:transparent url('~assets/img/order-f-i.png') no-repeat center center;
                    background-size:cover;
                }
            }
            .r-txt{
                color:#333;
            }
            .r-tips{
                color:#888;
            }
        }
        .btn-wrap{
            padding:0 0.3rem;
            .item-btn{
                width:3.3rem;
                height:0.88rem;
                display:flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                border-radius: 5px;
                &.left{
                    border: 1px solid #5D3AE0;
                    color:#5D3AE0;
                }
                &.right{
                    background-image: linear-gradient(-90deg, #9F43B0 0%, #5D3AE0 100%);
                    color:#fff;
                }
            }
        }
    }
</style>
