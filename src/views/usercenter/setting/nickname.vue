<template>
    <article class="wrapper bg-white">
        <div class="container pt30">
            <input-item :placeholder="'请输入您的昵称'" v-model="nickname"></input-item>
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
                nickname: ''
            }
        },
        mounted(){
            const userInfo = JSON.parse(sessionStorage.getItem('userInfo') || {})
            this.nickname = userInfo.nickname
        },
        methods: {
            submitFn() {
                this.$ajax({
                    api:'updateNickName',
                    params:{
                        userId:this.$cookies.get('userId'),
                        nickname:this.nickname
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
