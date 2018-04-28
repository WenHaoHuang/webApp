<template>
    <div class="wrapper wrapper-list wrapper-flex">
        <div class="wrapper-hd">
            <div class="tabs-menu">
                <div class="list-menu" :style="{width:categoryList.length*2 + 'rem'}">
                    <div class="item" v-for="list in categoryList" :key="list.id"
                         :class="{'selected':list.categoryId == categoryId}" @click="selectCategory(list.categoryId)">
                        {{list.categoryName}}
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper-bd">
            <scroll-list ref="scrollList" :data="listData" :empty="listEmpty" @pullUp="pullUpFn" @pullDown="pullDownFn">
                <goods-item v-for="(item,index) in listData" :key="item.id" :index="index" :item="item"></goods-item>
            </scroll-list>
        </div>
    </div>
</template>
<script>
    import scrollList from 'components/wap/scrollList'
    import goodsItem from '@/components/goodsItem'
    import dataList from 'mixins/dataList.js'

    export default {
        name: 'productList',
        mixins: [dataList],
        components: {
            scrollList,
            goodsItem
        },
        data() {
            return {
                categoryId: '',
                categoryList: '',
                listEmpty: 13,
                listOptions: {
                    api: "getSkuList",
                    params: {
                        categoryId: '',
                        limit: 10,
                        page: 1
                    }
                }
            }
        },
        created() {
            const route = this.$route.query
            this.categoryId = route.id ? route.id : ''
            this.listOptions.params.categoryId = this.categoryId + ''
            this.loadListData()
            this.getCategoryList()
        },
        methods: {
            getCategoryList() {
                this.$ajax({
                    api: 'getCategoryList'
                }).then((response) => {
                    this.categoryList = response.data
                })
            },
            selectCategory(id) {
                this.listOptions.params.categoryId = id
                this.categoryId = id

                this.loadListData()
            }
        }
    }
</script>
<style lang="scss">

</style>

