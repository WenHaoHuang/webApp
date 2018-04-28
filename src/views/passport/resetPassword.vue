<template>
    <article class="wrapper bg-white">
        <div class="container pt30">
            <input-item label="旧的密码" type="password" placeholder="请输入旧的密码" v-model="password.old"></input-item>
            <input-item label="新的密码" type="password" placeholder="请输入新的密码" v-model="password.new"></input-item>
            <input-item label="确认密码" type="password" placeholder="请确认密码" v-model="password.confirm"></input-item>
            <div class="flex mt50">
                <i-button loading @onClick="submitFn" type="primary" size="lg" :disabled="disabled">确定</i-button>
            </div>
            <div class="flex text-gray text-center pt30">
                <router-link :to="{name:'forget'}" class="flex-bd">忘记密码</router-link>
            </div>
        </div>
    </article>
</template>

<script>
    import inputItem from "@/components/inputItem"

    export default {
        name: "reset-password",
        components: {
            inputItem
        },
        data() {
            return {
                password: {
                    old: '',
                    new: '',
                    confirm: ''
                }
            }
        },
        computed: {
            disabled() {
                return (this.$util.checkPassword(this.password.old) && this.$util.checkPassword(this.password.new) && this.password.new === this.password.confirm) ? false : true
            }
        },
        methods: {
            submitFn() {
                this.$ajax({
                    api: 'resetPassword',
                    params: {
                        userId: this.$cookies.get('userId'),
                        password: this.password.old,
                        newPassword: this.password.new
                    }
                }).then((response) => {
                    this.$msg(response.data)
                    this.$router.push({
                        name: 'setting'
                    })
                })
            }
        }
    }
</script>

<style lang="scss">

</style>
