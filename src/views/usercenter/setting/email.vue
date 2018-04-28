<template>
    <article class="wrapper bg-white">
        <div class="container pt30">
            <input-item :placeholder="'请输入您的邮箱地址'" v-model="email"></input-item>
            <div class="flex mt50">
                <div class="btn btn-primary flex-bd btn-lg" @click="submitFn">保存</div>
            </div>
        </div>
    </article>
</template>

<script>
    import inputItem from "@/components/inputItem"

    export default {
        name: "name",
        components: {
            inputItem
        },
        data() {
            return {
                email: ''
            }
        },
        mounted(){
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || {})
            this.email = userInfo.email
        },
        methods: {
            submitFn() {
                this.$ajax({
                    api:'updateEmail',
                    params:{
                        userId:this.$cookies.get('userId'),
                        email:this.email
                    }
                }).then((response)=>{
                    this.$msg(response.data)
                    this.$router.push({
                        name:'setting'
                    })
                })
            }
        }
    }
</script>

<style lang="scss">

</style>
