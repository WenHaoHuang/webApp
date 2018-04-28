<template>
    <div class="wrapper bg-white">
        <welcome text="Hi！欢迎加入"></welcome>
        <div class="container">
            <div class="tabs flex text-center text-lg mb60">
                <router-link :to="{name:'login'}" class="item flex-bd">账号密码登录</router-link>
                <div class="item flex-bd text-primary">短信验证码登录</div>
            </div>
            <input-item icon="mobile" placeholder="请输入手机号" v-model="phoneNumber"></input-item>
            <div class="input-sms">
                <input-item icon="key" placeholder="请输入短信验证码" v-model="smsCode"></input-item>
                <div class="btn-sms" :class="{'disabled':canSms()}" @click="getSmsCode">{{smsCodeText}}</div>
            </div>
            <div class="flex mt60">
                <i-button loading @onClick="submitFn" type="primary" size="lg" :disabled="disabled">登录</i-button>
            </div>
            <div class="pt40 text-center text-gray">未注册手机登录成功后将自动注册，且代表您同意<br>
                <router-link :to="{name:'agreenmentRegister'}" class="text-info">《西牛买买会员注册协议》</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import welcome from "@/components/weicome"
    import inputItem from "@/components/inputItem"
    import smsCode from '@/mixins/smsCode.js'

    export default {
        name: "loginRegister",
        mixins: [smsCode],
        components: {
            welcome,
            inputItem
        },
        data() {
            return {
                phoneNumber: "",
                smsCode: ""
            };
        },
        computed: {
            disabled() {
                return (this.$util.checkPhone(this.phoneNumber) && this.$util.checkCode(this.smsCode)) ? false : true
            }
        },
        methods: {
            submitFn() {
                this.$login({
                    api: 'loginRegister',
                    params: {
                        username: this.phoneNumber,
                        verifyCode: this.smsCode
                    }
                }).then(() => {
                    this.$router.push({
                        name:'usercenter'
                    })
                })
            },
            getSmsCode() {
                this.frozenSms = true
                this.$ajax({
                    api: 'getVerifyCode',
                    params: {
                        phoneNumber: this.phoneNumber
                    }
                }).then(() => {
                    this.smsCountDown()
                })
            }
        },
    };
</script>

<style lang="scss">

</style>
