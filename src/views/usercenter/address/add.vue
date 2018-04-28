<template>
    <article class="wrapper wrapper-address wrapper-flex">
        <div class="wrapper-bd">
            <div class="pl30 bg-white">
                <input-item :label="'收货人'" :placeholder="'请输入收货人姓名'" v-model="addressInfo.receiverName"></input-item>
                <input-item :label="'联系电话'" :placeholder="'请输入收货人的联系方式'" v-model="addressInfo.receiverphoneNumber"></input-item>
                <div @click="selectFn">
                    <input-item :label="'所在地区'" :placeholder="'请选择所在地区'" v-model="addressInfo.regionStr" readonly
                                isSelect></input-item>
                </div>
            </div>
            <div class="box-address-detail mb20">
                <textarea class="textarea" placeholder="请填写详细地址，不少于5个字" v-model="addressInfo.receiverAddressDetail"></textarea>
            </div>
            <div class="container flex bg-white pt20 pb20">
                <div class="flex-bd">设为默认地址</div>
                <div class="flex-ft">
                    <div class="i-check" :class="{'checked':addressInfo.isDefault}" @click="addressInfo.isDefault = !addressInfo.isDefault"></div>
                </div>
            </div>
        </div>
        <div class="wrapper-ft flex">
            <div class="btn btn-primary flex-bd is-square btn-lg" @click="saveFn">保存</div>
        </div>
        <div class="ker-mask ker-animate-fade-in" v-if="isSelect" @click="isSelect = false"></div>
        <div class="ker-picker ker-animate-slide-up" v-if="isSelect">
            <div class="ker-picker_hd">
                所在地区
                <div class="item item_cancel" @click="isSelect = false">&times;</div>
            </div>
            <div class="ker-picker_bd">
                <div class="section_picker_hd"><span v-for="(item,index) in addressText" :key="item.id"
                                                     @click="reSelect(index)">{{item}}</span><span
                    v-if="isEnd">请选择</span></div>
                <div class="section_picker_bd">
                    <div class="item" v-for="(item,index) in selectList" :key="item.id" @click="selectItem(item,index)">
                        {{item.regionName}}
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import inputItem from "@/components/inputItem"

    export default {
        name: "addressAdd",
        components: {
            inputItem
        },
        data() {
            return {
                isSelect: false,
                addressText: [],
                selectList: [],
                AllAddressMap: [],
                isEnd: true,
                currentIndex: [],
                saveApi:'addUserAddress',
                addressInfo:{
                    receiverName: '',
                    receiverphoneNumber: '',
                    receiverAddressDetail: '',
                    isDefault: false,
                    regionId:'',
                    regionStr: '',
                }
            }
        },
        mounted(){
            const query = this.$route.query;
            this.getAllAddressMap();
            if (query.id) {
                this.getAddressInfo();
                this.saveApi = 'updateUserAddress';
            }
        },
        methods:{
            selectFn(){
                this.isSelect = true
                this.isEnd = true
                this.addressText = []
                this.selectList = this.AllAddressMap
            },
            getAllAddressMap(){
                const addressMap = localStorage.getItem('addressMap')
                if (addressMap) {
                    this.AllAddressMap = JSON.parse(addressMap)
                    return false
                }
                this.$ajax({
                    api:'getAllAddressMap'
                }).then((response)=>{
                    this.AllAddressMap = response.data
                    localStorage.setItem('addressMap', JSON.stringify(response.data));
                })
            },
            getAddressInfo(){
                this.addressInfo = JSON.parse(sessionStorage.getItem('addressInfo'))
                this.addressInfo.regionId = this.addressInfo.regionData[this.addressInfo.regionData.length-1].regionId
            },
            selectItem(item, index) {
                this.isEnd = true;
                this.$set(this.addressText, item.regionLevel - 1, item.regionName);
                this.currentIndex[item.regionLevel - 1] = index;
                if (item.children && item.children.length > 0) {
                    this.selectList = item.children;
                } else {
                    this.isEnd = false;
                    let str = '';
                    this.isSelect = false;
                    this.addressText.forEach((obj) => {
                        str += obj;
                    });
                    this.addressInfo.regionStr = str;
                    this.addressInfo.regionId = item.regionId;
                }
            },
            reSelect(index) {
                this.addressText.splice(index + 1);
                this.currentIndex.splice(index);
                let temArr = this.AllAddressMap;
                this.currentIndex.forEach((key) => {
                    temArr = temArr[key].children;
                });
                this.selectList = temArr;
            },
            saveFn(){
                const params = {
                    api: this.saveApi,
                    params: {
                        userId: this.$cookies.get("userId"),
                        addressName: this.addressInfo.receiverName,
                        receiverName: this.addressInfo.receiverName,
                        phone: this.addressInfo.receiverphoneNumber,
                        detailAddress: this.addressInfo.receiverAddressDetail,
                        isDefault: this.addressInfo.isDefault,
                        regionId:this.addressInfo.regionId
                    }
                };
                const route = this.$route.query;
                if (this.saveApi == 'updateUserAddress') {
                    params.params.addressId = this.addressInfo.addressId;
                }
                this.$ajax(params).then((response)=>{
                    this.$msg(response.data)
                    window.location.href = route.retUrl;
                })
            }
        }
    }
</script>

<style lang="scss">
    .wrapper-address{
        .ker-mask {
            position: fixed;
            z-index: 500;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
        }

        .ker-picker {
            position: fixed;
            z-index: 501;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 5.4rem;
            background-color: #FFF;
            .ker-picker_hd {
                position: relative;
                padding: 0.2rem 0.3rem 0;
                color: #8F8F8F;
                text-align: center;
                font-size: 0.32rem;
                .item_cancel {
                    color: #8F8F8F;
                    position: absolute;
                    z-index: 2;
                    content: '';
                    font-size: 0.42rem;
                    line-height: 0.42rem;
                    width: 0.42rem;
                    top: 0.2rem;
                    right: 0.3rem;
                }
            }
            .section_picker_hd {
                padding: 0 0.3rem;
                font-size: 0.24rem;
                line-height: 0.6rem;
                position: relative;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                &:before {
                    position: absolute;
                    z-index: 2;
                    content: '';
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border-bottom: 0.02rem solid #E0E0E0;
                }
                span {
                    margin-right: 0.1rem;
                    &:last-child {
                        color: #448FF2;
                        position: relative;
                        &:before {
                            position: absolute;
                            z-index: 2;
                            content: '';
                            left: 0;
                            bottom: 0;
                            right: 0;
                            border-bottom: 0.02rem solid #448FF2;
                        }
                    }
                }
            }
            .section_picker_bd {
                padding: 0.1rem 0.3rem;
                font-size: 0.24rem;
                line-height: 2em;
                height: 4rem;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                .item.cur {
                    color: #448FF2;
                    &:after {
                        margin-left: 0.3rem;
                        content: '';
                        display: inline-block;
                        vertical-align: middle;
                        width: 0.1rem;
                        height: 0.2rem;
                        border-right: 0.02rem solid #448FF2;
                        border-bottom: 0.02rem solid #448FF2;
                        transform: rotate(45deg);
                        transform-origin: top center;
                    }
                }
            }
        }
    }
    .box-address-detail {
        padding: 0.2rem 0.3rem;
        background-color: #fff;
        position: relative;
    }
</style>
