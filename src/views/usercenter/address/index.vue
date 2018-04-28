<template>
    <article class="wrapper wrapper-address">
        <div class="wrapper flex flex-column flex-justify-center flex-align-center" v-if="dataList.length == 0">
            <div class="item-desc text-center text-gray text-lg mb40">您还没有添加收货地址<br>赶紧添加收货地址，抢购更加快人一步~</div>
            <router-link :to="{name:'addressAdd',query:{retUrl:localUrl}}" class="btn btn-primary btn-empty btn-lg">新建地址</router-link>
        </div>
        <div class="wrapper wrapper-flex" v-if="dataList.length != 0">
            <div class="wrapper-bd">
                <scroll-box @pullUp="getData" showTop>
                    <div class="list-address bg-white mb20 text-lg" v-for="(item,index) in dataList" :key="item.addressId">
                        <div class="item-address flex">
                            <div class="flex-bd">{{item.receiverName}}</div>
                            <div class="flex-ft">{{item.receiverphoneNumber}}</div>
                        </div>
                        <div class="item-address address-detail">{{item.receiverFullAddress}}</div>
                        <div class="item-address flex text-gray pt10 flex-justify-between">
                            <div class="flex-hd flex" @click="checkFn(item)">
                                <div class="i-check" :class="{'checked':item.isDefault}"></div>&nbsp;设为默认
                            </div>
                            <div class="flex-ft flex">
                                <div class="item-edit" @click="editFn(item)"><i class="icon icon-edit"></i> 编辑</div>&emsp;
                                <div class="item-del" @click="delFn(item,index)"><i class="icon icon-detele"></i> 删除</div>
                            </div>
                        </div>
                    </div>
                </scroll-box>
            </div>
            <div class="wrapper-ft flex">
                <router-link :to="{name:'addressAdd',query:{retUrl:localUrl}}" class="btn btn-primary flex-bd is-square btn-lg">添加新地址</router-link>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                localUrl:'',
                dataList: false,
                counts: 0,
                total: '0.00',
                checkedData:[]
            }
        },
        mounted() {
            this.localUrl = window.location.href;
            this.$isLogin().then(() => {
                this.getData()
            }).catch(() => {
                this.$msg('请登录后查看收货地址')
                this.$router.push({
                    name: 'login',
                    query: {
                        retUrl: this.$router
                    }
                })
            })
        },
        methods: {
            getData() {
                this.$ajax({
                    api: 'getUserAddress',
                    params: {
                        userId: this.$cookies.get('userId')
                    }
                }).then((response) => {
                    this.dataList = response.data
                })
            },
            checkFn(item){
                if(item.isDefault){return}
                this.$ajax({
                    api:'setUserAddressDefault',
                    params:{
                        userId:this.$cookies('userId'),
                        addressId:item.addressId
                    }
                }).then((response)=>{
                    this.$msg(response.data)
                    this.dataList.forEach((obj)=>{
                        if(obj.isDefault){
                            obj.isDefault = false
                        }
                    })
                    item.isDefault = true
                })
            },
            editFn(item){
                sessionStorage.setItem('addressInfo',JSON.stringify(item))
                this.$router.push({
                    name:'addressAdd',
                    query:{
                        id:item.addressId,
                        retUrl:window.location.href
                    }
                })
            },
            delFn(item,index){
                this.$ajax({
                    api:'delUserAddress',
                    params:{
                        userId:this.$cookies('userId'),
                        addressId:item.addressId
                    }
                }).then((response)=>{
                    this.dataList.splice(index,1)
                    this.$msg(response.data)
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "~assets/css/variable";

    .wrapper-address {
        .btn-empty {
            width: 4rem;
        }
        .list-address{
            color:#555;
            padding:0.16rem 0 0.1rem;
            .item-address{
                padding-left:0.3rem;
                padding-right:0.3rem;
            }
            .address-detail{
                padding-top:0.16rem;
                padding-bottom:0.24rem;
                border-bottom:0.02rem solid $bgColor;
            }
        }
    }
</style>
