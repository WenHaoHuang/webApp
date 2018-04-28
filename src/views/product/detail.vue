<template>
    <div class="wrapper wrapper-flex wrapper-detail">
        <div class="wrapper-bd" ref="pageBd">
            <scroll-box showTop @pullUp="getSkuDetail">
                <!-- 商品图展示 -->
                <div class="section_pro">
                    <swiper-pic :img-list="skuPicUrlArr" page-style="dot" page-pos="center"
                                height="7.5rem"></swiper-pic>
                    <div class="pro_content">
                        <div class="pro_name">{{data.skuName}}</div>
                        <div class="pro_desc">{{data.skuDesc}}</div>
                        <div class="pro_price">¥{{data.skuPrice}}</div>
                    </div>
                </div>
                <div class="service-promise">
                    <div class="name">服务承诺：</div>
                    <div class="honor">
                        <span><i class="icon icon-success-o"></i>正品保障</span>
                        <span><i class="icon icon-success-o"></i>官方授权</span>
                    </div>
                </div>
                <div class="section_tag mt20">
                    <div class="hd_tag">请选择商品</div>
                    <div class="bd_tag" v-for="(item,key,index) in data.propertyArr" :key="item.id">
                        <div class="hd_label">{{key}}</div>
                        <div class="list_label">
                            <div class="item"
                                 :class="{'cur':isCurrentPro(label.propertyId),'active':isDisabledPro(index,label.propertyId)}"
                                 v-for="label in item" :key="label.id"
                                 @click="selectPro($event,index,label.propertyId)">
                                {{label.propertyName}}
                            </div>
                        </div>
                    </div>
                    <div class="bd_tag">
                        <div class="hd_label">数量</div>
                        <div class="pro_num clearfix">
                            <div class="pro_reduce" :class="{unactive:buyNum==1}" @click="changeBuyNumFn(-1)"></div>
                            <input type="text" class="cart_num" v-model="buyNum">
                            <div class="pro_add" @click="changeBuyNumFn(+1)"></div>
                        </div>
                    </div>
                </div>

                <!-- 商品详情 -->
                <div class="section_title_pro mt20">商品详情</div>
                <div class="section_detail" v-html="data.skuDetail"></div>
            </scroll-box>
        </div>
        <div class="wrapper-ft">
            <div class="foot-item-left">
                <div class="left-item" @click="toCustomServiceFn">
                    <i class="icon icon-kefu"></i>
                    <span class="name">客服</span>
                </div>
                <div class="left-item" @click="toCartShopFn">
                    <i class="icon icon-cart-o"></i>
                    <div class="name">购物车</div>
                    <span class="bage" v-show="cartNum>0">{{cartNum}}</span>
                </div>
            </div>
            <div class="foot-item-right">
                <button class="btn btn-warning is-square btn-empty btn-lg" @click="addShopCartFn">加入购物车</button>
                <button class="btn btn-primary  is-square btn-empty btn-lg" @click="immediatePurchaseFn">立即购买</button>
            </div>
        </div>
    </div>
</template>

<script>
    import swiperPic from "components/wap/swiperPic";

    export default {
        name: 'ProductDetail',
        components: {
            swiperPic
        },
        data() {
            return {
                skuId: '',
                data: {},
                skuPicUrlArr: [],
                buyNum: 1,
                cartNum: 0,
                maxCount: 1,
                isCanBuy: false,
                skuProperty: []
            }
        },
        mounted() {
            const route = this.$route.query;
            this.skuId = route.id;
            // 获取商品详情
            this.getSkuDetail();
        },
        methods: {
            getSkuDetail() {
                this.$ajax({
                    api: 'getSkuDetail',
                    params: {
                        skuId: this.skuId
                    }
                }).then(res => {
                    let result = res.data
                    // todo mock使用 后续删除
                    this.skuId = result.skuId
                    // 根据取回的数据将轮播图装填成需要的格式
                    this.skuPicUrlArr = result.skuPic;
                    // 当前商品最大可购买数量
                    this.maxCount = result.skuMax;
                    // 获取当前商品的标签信息组
                    result.skuPropertyArr.forEach((obj) => {
                        if (obj.skuId == this.skuId) {
                            this.skuProperty = obj.propertyDetail;
                        }
                    });
                    this.data = result
                });
            },
            isContained(a, b) {
                // 判断a是否包含在b内
                if (!(a instanceof Array) || !(b instanceof Array)) {
                    return false
                }
                if (a.length < b.length) {
                    return false
                }
                let aStr = a.toString();
                for (var i = 0, len = b.length; i < len; i++) {
                    if (aStr.indexOf(b[i]) == -1) {
                        return false;
                    }
                }
                return true;
            },
            isCurrentPro(id) {
                const $this = this;
                let isClass = false;
                // 当前 propertyId 标记
                $this.skuProperty.forEach((obj) => {
                    if (id == obj) {
                        isClass = true;
                    }
                });
                return isClass;
            },
            isDisabledPro(index, id) {
                const $this = this;
                let isClass = false, _propertyArr = JSON.parse(JSON.stringify($this.skuProperty));
                // 当前propertyId组合进已选标签内是否有对应商品
                _propertyArr[index] = id;
                $this.data.skuPropertyArr.forEach((item) => {
                    if ($this.isContained(item.propertyDetail, _propertyArr)) {
                        isClass = true;
                    }
                });
                return isClass;
            },
            selectPro(e, index, id) {
                const $this = this;
                // 已选标签，可选标签对应的className
                let isCurrentClass = 'cur', isActiveClass = 'active',
                    // 取出当前点击标签的class
                    classArr = e.currentTarget.className,
                    // 获取当前商品的propertyId数组
                    propertyIdArr = JSON.parse(JSON.stringify($this.skuProperty));
                // 根据所选标签情况进行区别操作
                if (new RegExp(isCurrentClass).test(e.currentTarget.className)) {
                    // 如果当前标签已选，不进行操作
                    return;
                } else if (new RegExp(isActiveClass).test(e.currentTarget.className)) {
                    // 如果当前标签可选，组装新的数组
                    $this.skuProperty[index] = id;
                    // 获取当前商品的propertyId数组
                    let propertyIdArr = JSON.parse(JSON.stringify($this.skuProperty));
                    // 遍历可能的商品skuPropertyArr
                    $this.data.skuPropertyArr.forEach((item) => {
                        if (propertyIdArr == item.propertyDetail) {
                            // 新数组和当前遍历的完全相同，输出skuId
                            $this.skuId = item.skuId;
                            $this.updateDetail();
                            return;
                        } else if (propertyIdArr.length == item.propertyDetail.length) {
                            // 新数组和当前遍历的数组长度一致，再次进行比对，减少数组的遍历对性能的消耗
                            if ($this.isContained(propertyIdArr, item.propertyDetail)) {
                                // 新数组和当前数组一致，输出skuId
                                $this.skuId = item.skuId;
                                $this.updateDetail();
                                return;
                            }
                        }
                    });
                } else {
                    // 当前标签不可选，清空商品的propertyId数组
                    $this.skuProperty = [];
                    $this.skuProperty.push(id);
                    this.isCanBuy = true;
                }
                $this.$forceUpdate();
            },
            updateDetail() {
                this.$router.push({
                    path: '/product/detail',
                    query: {id: this.skuId}
                });
                this.getSkuDetail();
                this.isCanBuy = false;
            },
            changeBuyNumFn(num){
                if(this.buyNum == 1 && num<0){
                    return
                }
                if(this.buyNum == this.maxCount && num>0){
                    this.$msg({
                        text: '限购' + this.maxCount + '件'
                    });
                    return
                }
                this.buyNum += num
            },
            toCustomServiceFn(){
                this.$confirm({
                    content: '<div class="text-xxxl mb20 text-center">温馨提示</div>客服电话请拨打：400-008-8581',
                    btnText: ['取消', '确认拨打'],
                    callBack: () => {
                        location.href = 'tel:400-008-8581'
                    }
                });
            },
            toCartShopFn() {
                this.$router.push({path: '/cart'})
            },
            addShopCartFn() {
                this.$isLogin().then(()=>{
                    this.cartNum = this.buyNum
                }).catch(()=>{
                    this.$msg('请登录后加入购物车')
                    this.$router.push({
                        name: 'login',
                        query: {
                            retUrl: this.$router
                        }
                    })
                })
            },
            immediatePurchaseFn() {
                this.$isLogin().then(()=>{
                    //立即购买 --> 订单确认页
                    var arr = [
                        {skuId: this.skuId,count: this.buyNum}
                    ]
                    window.sessionStorage.setItem('sku',JSON.stringify(arr))
                    this.$router.push({
                        name: 'orderConfirm',
                        query: {
                            from: 'immediate'
                        }
                    })
                }).catch(()=>{
                    this.$msg('请登录后加入购物车')
                    this.$router.push({
                        name: 'login',
                        query: {
                            retUrl: this.$router
                        }
                    })
                })
            },
        }
    };
</script>

<style lang="scss" scoped>
    .wrapper-detail {
        .section_pro {
            width: 100%;
            background-color: #FFF;
            .pro_content{
                padding: .3rem;
                .pro_name {
                    font-size: 0.3rem;
                }
                .pro_desc {
                    padding: 0.1rem 0;
                    color: #888;
                    font-size: 0.26rem;
                }
                .pro_price {
                    font-size: .4rem;
                    color: #5D3AE0;
                }
            }
        }
        .service-promise{
            margin: .2rem 0;
            padding: .24rem .3rem;
            background: #ffffff;
            font-size: .28rem;
            color: #888888;
            .name{
                display: inline-block;
            }
            .honor{
                display: inline-block;
                span{
                    margin-right: .3rem;
                    .icon{
                        margin-right: .1rem;
                        color: #38DAB6;
                    }
                }


            }
        }
        .sku_detail{
            .cell-bar{
                display: flex;
                align-items: center;
                padding: .24rem .3rem;
                font-size: .28rem;
                background: #ffffff;
                .cell-hb{
                    color: #888;
                }
                .cell-bd{
                    flex: 1;
                    max-width: 6rem;
                    margin-left:.1rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                .cell-ft{
                    text-align: right;
                    position: relative;
                }
                &.cell_access{
                    color: inherit;
                    .cell-ft:after{
                        content: '';
                        display: block;
                        width: 0.24rem;
                        height: 0.24rem;
                        border-top: 0.02rem solid #D0D0D0;
                        border-right: 0.02rem solid #D0D0D0;
                        transform: rotate(45deg);
                    }
                }
            }
        }
        .section_title_pro {
            width: 100%;
            height: 0.88rem;
            text-align: center;
            font-size: 0.32rem;
            line-height: 0.88rem;
            border-bottom: 0.02rem solid #E0E0E0;
            background-color: #FFF;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }
        .section_detail {
            overflow: hidden;
        }
        .section_tag {
            width: 7.5rem;
            padding-bottom: 0.2rem;
            font-size: 0.28rem;
            background-color: #FFF;
            .hd_tag {
                padding: 0.2rem 0.3rem;
                font-size: 0.32rem;
                border-bottom: 0.01rem solid #E0E0E0;
            }
            .bd_tag {
                padding: 0.2rem 0.3rem 0;
                color: #888;
            }
            .list_label {
                margin: 0 -0.1rem;
                font-size: 0;
                .item {
                    display: inline-block;
                    font-size: 0.28rem;
                    line-height: 0.48rem;
                    padding: 0.01rem 0.2rem 0;
                    margin: 0.2rem 0.1rem 0;
                    border: 0.02rem dashed #E0E0E0;
                    border-radius: 0.5rem;
                    text-align: center;
                    color: #A0A0A0;
                    &.active {
                        color: #333;
                    }
                    &.cur {
                        color: #333;
                        border-style: solid;
                        border-color: #5D3AE0;
                    }
                }
            }
            .pro_num {
                padding-top: 0.2rem;
                padding-bottom: 0.1rem;
                text-align: left;
                font-size: 0;
                .pro_reduce, .pro_add {
                    position: relative;
                    float: left;
                    width: 0.6rem;
                    height: 0.6rem;
                    background-color: #EFEFEF;
                    border: 0.01rem solid #D0D0D0;
                    &:before {
                        position: absolute;
                        z-index: 2;
                        top: 0.28rem;
                        left: 0.13rem;
                        display: block;
                        content: '';
                        margin: 0 auto;
                        height: 0.02rem;
                        width: 0.32rem;
                        background-color: #888;
                    }
                    &.unactive:before{
                        background-color: #ddd;
                    }
                }
                .pro_add {
                    &:after {
                        position: absolute;
                        z-index: 3;
                        top: 0.13rem;
                        left: 0.28rem;
                        display: block;
                        content: '';
                        margin: 0 auto;
                        height: 0.32rem;
                        width: 0.02rem;
                        background-color: #888;
                    }
                }
                .cart_num {
                    float: left;
                    width: 0.6rem;
                    height: 0.6rem;
                    text-align: center;
                    font-size: 0.3rem;
                    line-height: 0.58rem;
                    border: none;
                    border-top: 0.01rem solid #D0D0D0;
                    border-bottom: 0.01rem solid #D0D0D0;
                }
            }
        }
        .wrapper-ft {
            height: 1rem;
            width: 100%;
            height: 1rem;
            background-color: #FFF;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .foot-item-left{
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 2.7rem;
                height: 1rem;
                .left-item{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    text-align: center;
                    position: relative;
                    .name{
                        font-size: .24rem;
                        color: #888888;
                    }
                    .bage{
                        position: absolute;
                        top: .04rem;
                        right: .24rem;
                        width: .36rem;
                        height: .3rem;
                        line-height: .3rem;
                        color: #FFFFFF;
                        font-size: .24rem;
                        text-align: center;
                        background: #FF6058;
                        border-radius: 1rem;

                    }
                }
            }
            .foot-item-right{
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                width: 4.8rem;
                height: 1rem;
            }
        }

    }
</style>
