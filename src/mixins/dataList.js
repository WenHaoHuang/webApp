// Created by huangwenhao on 2018/4/3.

export default {
    data() {
        return {
            isAll: false,
            listData: []
        }
    },
    methods: {
        pullDownFn() {
            // 下拉刷新
            this.loadListData();
        },
        pullUpFn() {
            // 上拉加载更多
            this.listOptions.params.page +=1
            this.$refs.scrollList.bottomStatus = 'in'
            this.loadListData(true)
        },
        loadListData(flag) {
            this.$loading.start()
            if (this.isAll) return false
            const options = this.listOptions
            let {api=1, params, version='1.0'} = options
            params.limit = params.limit || 10
            params.page = params.categoryId ? 1 : params.page
            this.$ajax({
                api,
                params,
                version
            }).then((response) => {
                const lists = response['data']['list']
                if (lists.length < options['params']['limit']) { //全部加载完
                    this.isAll = true
                    this.$refs.scrollList.bottomStatus = 'over'
                } else {
                    this.isAll = false
                    this.$refs.scrollList.bottomStatus = 'more'
                }
                this.$loading.stop()
                this.listData = flag ? this.listData : [];//重置商品列表
                this.listData = this.listData.concat(lists)
            });
        }
    }
}
