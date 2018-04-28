/**consumer
* @author wenhao.huang
* 优享页面
*/
<template>
    <scroll-box class="wrapper wrapper-index" @pullUp="getHomeInfo" showTop>
        <div class="wrapper_bd">
            <swiper-pic :img-list="data.bannerList" :height="'3.8rem'"></swiper-pic>
            <div class="container">
                <div class="hot-recommend">
                    <h1 class="title"><i class="icon icon-title-left"></i>热门推荐<i class="icon icon-title-right"></i></h1>
                    <div class="recommend-list">
                        <a :href="item.redirectUrl" class="recommend-item" v-for="item in data.hotList" :key="item.skuId">
                            <img :src="item.picUrl" :alt="item.descText">
                        </a>
                    </div>
                </div>
                <div class="classic-product">
                    <h1 class="title"><i class="icon icon-title-left"></i>精选商品<i class="icon icon-title-right"></i></h1>
                    <div class="product-list clearfix">
                        <router-link :to="{name:'productDetail',query:{id:item.skuId}}" class="product-item" v-for="item in data.skuList" :key="item.skuId">
                            <div class="picture">
                                <img :src="item.skuPic" :alt="item.skuName">
                            </div>
                            <div class="desc-info">
                                <div class="desc">{{item.skuName}}</div>
                                <div class="price">¥{{item.skuPrice}}</div>
                            </div>
                        </router-link>
                    </div>
                    <div class="more-product" @click="$router.push({name: 'productList'})">查看更多商品>></div>
                </div>
            </div>
        </div>
    </scroll-box>
</template>

<script>
    import swiperPic from 'components/wap/swiperPic'

    export default {
        name: "Index",
        components:{
            swiperPic
        },
        data() {
            return {
                data:{
                    bannerList:[],
                    hotList:[],
                    skuList:[]
                }
            }
        },
        created(){
            this.getHomeInfo()
        },
        methods:{
            getHomeInfo(){
                this.$ajax({
                    api:'getHome'
                }).then((response)=>{
                    this.data = response.data
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .wrapper-index {
        .swiper {
            width: 7.5rem;
            height: 3.8rem;
        }
        .container {
            margin-top: .22rem;
            margin-bottom: .22rem;
            background: #fff;
            .title {
                padding: .3rem 0;
                font-size: .32rem;
                color: #333333;
                font-weight: 400;
                text-align: center;
                i {
                    color: #5D3AE0;
                    padding: 0 .2rem;
                }
            }
            .hot-recommend {
                background: #ffffff;
                .recommend-item {
                    display:block;
                    margin-bottom: .2rem;
                }
            }
            .classic-product {
                .product-list {
                    display:flex;
                    flex-direction:row;
                    justify-content:space-between;
                    align-items:flex-start;
                    flex-wrap:wrap;
                    .product-item{
                        margin-bottom:0.3rem;
                        width:3.3rem;
                        box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
                        padding:0.2rem;
                        .picture {
                            width: 2.9rem;
                            height: 2.9rem;
                        }
                        .desc-info {
                            margin-top: .4rem;
                            .desc {
                                font-size: .26rem;
                                color: #4A4A4A;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                            }
                            .price {
                                margin-top: .1rem;
                                font-size: .34rem;
                                color: #F34E73;
                            }
                        }
                        &:nth-child(2n+1){
                            margin-right:0.3rem;
                        }
                    }
                }
                .more-product {
                    padding: .1rem 0 0.4rem;
                    font-size: 15px;
                    color: #888888;
                    text-align: center;
                }
            }
        }
    }
</style>
