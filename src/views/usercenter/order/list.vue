<template>
    <article class="wrapper wrapper-order-list">
        <tabs @onClick="tabShowFn">
            <tab-item title="全部">
                <order-list-item v-if="activeIndex == 0"></order-list-item>
            </tab-item>
            <tab-item title="待支付">
                <order-list-item v-if="activeIndex == 1" status="newOrder"></order-list-item>
            </tab-item>
            <tab-item title="待发货">
                <order-list-item v-if="activeIndex == 2" status="paidOrder"></order-list-item>
            </tab-item>
            <tab-item title="待收货">
                <order-list-item v-if="activeIndex == 3" status="deliveredOrder"></order-list-item>
            </tab-item>
            <tab-item title="已收货">
                <order-list-item v-if="activeIndex == 4" status="received"></order-list-item>
            </tab-item>
        </tabs>
    </article>
</template>

<script>
    import {tabs,tabItem} from 'components/wap/tabs'
    import orderListItem from '@/components/orderList'

    export default {
        name: "orderList",
        components: {
            tabs,
            tabItem,
            orderListItem
        },
        data() {
            return {
                activeIndex: -1
            }
        },
        methods: {
            tabShowFn(index) {
                this.activeIndex = index
            }
        }
    }
</script>

<style lang="scss">
    .wrapper-order-list {
        .tabs-container .tab-menu {
            .item-tab.active {
                color: #5D3AE0;
                &:after {
                    border-bottom-color: #5D3AE0;
                }
            }
        }
    }
</style>
