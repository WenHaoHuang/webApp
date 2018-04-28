<template>
    <div class="wrapper bg-white">
        <welcome></welcome>
        <div class="container">
            <input-item icon="mobile" placeholder="请输入手机号" v-model="phoneNumber"></input-item>
            <div class="input-sms">
                <input-item icon="key" placeholder="请输入短信验证码" v-model="smsCode"></input-item>
                <div class="btn-sms" :class="{'disabled':canSms()}" @click="getSmsCode">{{smsCodeText}}</div>
            </div>
            <input-item type="password" icon="user" placeholder="请设置新的登录密码" v-model="password"></input-item>
            <div class="flex mt60">
                <i-button loading @onClick="submitFn" type="primary" size="lg" :disabled="disabled">重置密码</i-button>
            </div>
        </div>
    </div>
</template>

<script>
    import welcome from "@/components/weicome";
    import inputItem from "@/components/inputItem";
    import smsCode from '@/mixins/smsCode.js'

    export default {
        name: "forget",
        mixins: [smsCode],
        components: {
            welcome,
            inputItem
        },
        data() {
            return {
                phoneNumber: "",
                smsCode: "",
                password: "",
            };
        },
        computed: {
            disabled() {
                return (this.$util.checkPhone(this.phoneNumber) && this.$util.checkCode(this.smsCode) && this.$util.checkPassword(this.password)) ? false : true
            }
        },
        methods: {
            submitFn() {
                this.$ajax({
                    api: 'forgetPassword',
                    params: {
                        phoneNumber: this.phoneNumber,
                        password: this.password,
                        smsCode: this.smsCode
                    }
                }).then(() => {
                    this.$msg('密码重置成功，请重新登录！')
                    this.$router.push({
                        name:'login'
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
        }
    };
</script>

<style lang="scss">

</style>
