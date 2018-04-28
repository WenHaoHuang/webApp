<template>
    <article class="wrapper wrapper-cart">
        <div class="wrapper flex flex-column flex-justify-center flex-align-center">
            <div class="item-desc text-center text-gray text-lg mb40">暂时没有可用的优惠券<br>可以去逛逛，参加活动赢取优惠券哦～</div>
            <router-link :to="{name:'index'}" class="btn btn-primary is-square btn-empty btn-lg">去逛逛</router-link>
        </div>
    </article>
</template>

<script>

    export default {
        name: "index",
    }
</script>

<style lang="scss">
    @import "~assets/css/variable";

    .wrapper-cart {
        .btn-empty {
            width: 4rem;
        }
    }
</style>
