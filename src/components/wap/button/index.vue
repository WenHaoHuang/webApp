<template>
    <button class="btn"
            :class="[`btn-${type}`,`btn-${size}`,{'btn-loading':loading},{'disabled':disabled}]"
            :disabled="disabled" @click="onClick">
        <slot></slot>
        <span class="spinner" v-show="point">
            <div class="spinner_item_1"></div>
            <div class="spinner_item_2"></div>
            <div class="spinner_item_3"></div>
            <div class="spinner_item_4"></div>
        </span>
    </button>
</template>

<script>
    export default {
        name: "iButton",
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: ''
            }
        },
        data(){
            return {
                point: false
            }
        },
        methods: {
            onClick() {
                this.point = true
                this.$emit('onClick')
            }
        }
    }
</script>

<style lang="scss">
    .btn-loading{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        text-align: center;
        .spinner {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            text-align: center;
            margin-left: .1rem;
            & > div {
                width: .16rem;
                height: .16rem;
                margin-right: .1rem;
                border-radius: 50%;
                background: #ffffff;
                animation: loading 1.7s infinite ease-in-out both;
                &.spinner_item_1 {
                    animation-delay: -.6s;
                }
                &.spinner_item_2 {
                    animation-delay: -.4s;
                }
                &.spinner_item_3 {
                    animation-delay: -.2s;
                }
            }
        }
    }
    @keyframes loading {
        0%, 80%, 100% {
            transform: scale(0);
            opacity: 0;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>
