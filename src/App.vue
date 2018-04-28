<template>
    <div id="app" class="wrapper-flex">
        <div class="wrapper-bd">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <transition name="slide-up">
            <div class="wrapper-ft">
                <footer-bar v-if="isHost" :router-name="routerName"></footer-bar>
            </div>
        </transition>
    </div>
</template>

<script>
    import footerBar from '@/components/footerBar';

    export default {
        name: 'app',
        components: {
            footerBar
        },
        data() {
            return {
                isHost: true,
                routerName: ''
            }
        },
        watch: {
            '$route'(to) {
                const routerConfig = ['index', 'cart', 'usercenter', 'notFound'];
                if (routerConfig.includes(this.$route.name)) {
                    this.routerName = this.$route.name;
                    this.isHost = true;
                } else {
                    this.isHost = false;
                }
            }
        },
        created() {
            this.title = this.$route.meta.title;
            this.set();
            window.onresize = () => {
                this.set();
            }
        },
        methods: {
            set() {
                const width = document.documentElement.clientWidth;
                const discount = 750 / 100;
                const fontSize = width / discount;
                document.documentElement.style.fontSize = fontSize + 'px';
            },
        }
    }
</script>

<style lang="scss">
    @import "~assets/css/basic.scss";
    @import "~assets/css/style.scss";
</style>
