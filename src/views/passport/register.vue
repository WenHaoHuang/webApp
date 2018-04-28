<template>
    <div class="wrapper bg-white">
        <welcome text="Hi！欢迎加入"></welcome>
        <div class="container">
            <input-item icon="mobile" placeholder="请输入手机号" v-model="phoneNumber"></input-item>
            <div class="input-sms">
                <input-item icon="key" placeholder="请输入短信验证码" v-model="smsCode"></input-item>
                <div class="btn-sms" :class="{'disabled':canSms()}" @click="getSmsCode">{{smsCodeText}}</div>
            </div>
            <input-item type="password" icon="user" placeholder="请设置新的登录密码" v-model="password"></input-item>
            <input-item icon="users" placeholder="邀请人手机号(选填)" v-model="invite"></input-item>
            <div class="flex mt60">
                <i-button loading @onClick="submitFn" type="primary" size="lg" :disabled="disabled">注册</i-button>
            </div>
            <div class="pt40 text-center text-gray">注册代表您同意
                <router-link :to="{name:'agreenmentRegister'}" class="text-info">《西牛买买会员注册协议》</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import welcome from "@/components/weicome";
    import inputItem from "@/components/inputItem";
    import smsCode from '@/mixins/smsCode.js'

    export default {
        name: "register",
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
                invite: ""
            };
        },
        computed: {
            disabled() {
                return (this.$util.checkPhone(this.phoneNumber) && this.$util.checkCode(this.smsCode) && this.$util.checkPassword(this.password)) ? false : true
            }
        },
        methods: {
            submitFn() {
                this.$login({
                    api: 'register',
                    params: {
                        phoneNumber: this.phoneNumber,
                        password: this.password,
                        smsCode: this.smsCode,
                        invite: this.invite
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
        }
    };
</script>

<style lang="scss">

</style>
