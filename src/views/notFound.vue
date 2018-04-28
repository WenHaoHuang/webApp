<template>
    <div class="nofound">
        <div class="item-title">404</div>
        抱歉！您所访问的页面不存在！
        <div class="item-ft mt40">
            <a href="#/index" class="btn btn-primary">返回首页</a>
        </div>
    </div>
</template>

<script>
  export default {
      name: 'notFound',
  }
</script>

<style lang="scss">
    .nofound{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        font-size:0.32rem;
        color:#448FF2;
        .item-title{
            font-size:1.8rem;
        }
    }
</style>
