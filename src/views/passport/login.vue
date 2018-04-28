<template>
    <div class="wrapper bg-white">
        <welcome :text="'Hi！欢迎加入'"></welcome>
        <div class="container">
            <div class="tabs flex text-center text-lg mb60">
                <div class="item flex-bd text-primary">账号密码登录</div>
                <router-link :to="{name:'loginRegister'}" class="item flex-bd">短信验证码登录</router-link>
            </div>
            <input-item icon="user" placeholder="请输入用户名或者手机号" v-model="username"></input-item>
            <input-item type="password" icon="lock" placeholder="请输入登录密码" v-model="password"></input-item>
            <div class="flex mt60">
                <i-button loading @onClick="submitFn" type="primary" size="lg" :disabled="disabled">登录</i-button>
            </div>
            <div class="flex text-info pt30">
                <router-link :to="{name:'forget'}" class="flex-bd">忘记密码</router-link>
                <router-link :to="{name:'register'}" class="flex-ft">快速注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import welcome from "@/components/weicome";
    import inputItem from "@/components/inputItem";

    export default {
        name: "login",
        components: {
            welcome,
            inputItem
        },
        data() {
            return {
                username: "",
                password: ""
            };
        },
        computed: {
            disabled() {
                return (this.$util.checkPhone(this.username) && this.$util.checkPassword(this.password)) ? false : true
            }
        },
        methods: {
            submitFn() {
                this.$login({
                    api: 'login',
                    params: {
                        username: this.username,
                        password: this.password
                    }
                }).then(() => {
                    this.$router.push({
                        name:'usercenter'
                    })
                })
            }
        },
    };
</script>

<style lang="scss">

</style>
