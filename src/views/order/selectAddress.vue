<template>
    <div class="wrapper page-select-address wrapper-flex">
        <div class="address-list wrapper-bd">
            <div class="address-item bg-white mb20 text-lg" v-for="(item,index) in dataList" :key="item.addressId"   :class="{'stripe':item.isDefault}">
                <div class="item-hd flex text-gray pt10 flex-justify-between">
                    <div class="flex-hd flex" @click="selectFn(item)">
                        <div class="i-check" :class="{'checked':item.isDefault}"></div>&nbsp;选择<span v-if="item.isDefault">(默认地址)</span>
                    </div>
                    <div class="flex-ft flex">
                        <div class="item-edit" @click="editFn(item)"><i class="icon icon-edit"></i> 编辑</div>
                    </div>
                </div>
                <div class="item-cell flex">
                    <div class="flex-bd">{{item.receiverName}}</div>
                    <div class="flex-ft">{{item.receiverphoneNumber}}</div>
                </div>
                <div class="item-cell address-detail">{{item.receiverFullAddress}}</div>
            </div>
        </div>
        <div class="add-address flex wrapper-ft">
            <div class="btn btn-primary btn-lg flex-bd is-square text-xxl" @click="goAddAddress()">新增收货地址</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "select-address",
        data(){
            return{
                dataList:{}
            }
        },
        created(){
            this.getData();
        },
        methods:{
            goAddAddress(){
                this.$router.push({
                    name:'addressAdd',
                    query:{
                        retUrl:window.location.href
                    }
                })
            },
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
            selectFn(item){
                const route = this.$route.query;
                this.$router.push({
                    name:'orderConfirm',
                    query:{
                        from:route.from,
                        addressId:item.addressId
                    }
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
            }
        }
    }
</script>

<style lang="scss">
    .page-select-address{
        .address-item{
            padding-bottom:0.46rem;
        }
        .stripe{
            position:relative;
            &:after {
                content: '';
                width: 7.5rem;
                height: 0.06rem;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translate(-50%,0);
                background: repeating-linear-gradient(135deg, #94BAEC, #94BAEC 0.3rem, white 0.3rem, white 0.4rem, #DC6D67 0.4rem, #DC6D67 0.7rem, white 0.7rem, white 0.8rem, #F2DAAB 0.8rem, #F2DAAB 1.1rem, white 1.1rem, white 1.2rem);
            }
        }
        .item-hd{
            border-bottom:1px solid #e0e0e0;
            margin:0 .3rem;
            padding:0.26rem 0;
        }
        .item-cell{
            padding-left: .3rem;
            padding-right: .3rem;
            padding-top:0.3rem;
        }
    }
</style>
