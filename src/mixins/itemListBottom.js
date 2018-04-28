
let stopPullDown = false;

export default {
    mounted() {
        this.loadListData();
    },
    methods: {
        bottomStatus(type){
            this.$refs.scrollList.bottomStatus = type;
        },
        loadListData() {
            const self = this;
            stopPullDown = false;
            if(this.listOption['params']){
                this.listOption['params']['page'] = 1;
                this.listData = [];
                const params = this.listOption['params'];
                params['limit'] = params['limit'] || 10;

                this.$ajax({
                    api: self.listOption.api,
                    params: params,
                    version: self.listOption.version || '1.0'
                },(res)=>{
                    if(res.success){
                        const lists = res['data']['list'];
                        if(lists.length == 0 && self.listOption.params['page'] == 1){
                            self.$refs.scrollList.loadingShow = false;
                            self.$refs.scrollList.noData = true;
                            return;
                        }
                        lists.forEach(val=>{
                            self.listData.push(val);
                        });
                        if(lists.length < params.limit){
                            stopPullDown = true;
                            self.bottomStatus('done');
                            return;
                        }else {
                            stopPullDown = false;
                            self.bottomStatus('more');
                        }
                    }else {
                        self.$refs.scrollList.noData = true;
                        this.noDataType = '6';
                    }
                    
                },(err)=>{console.log(err)});
            }
        },
        pullDownFn(){
            const self = this;
            if(!stopPullDown){
                self.listOption.params['page']++;
                self.bottomStatus('loading');

                this.$ajax({
                    api: self.listOption.api,
                    params: self.listOption.params,
                    version: self.listOption.version || '1.0'
                },(res)=>{
                    const lists = res['data']['list'];
                    if(lists.length < self.listOption.params.limit){
                        stopPullDown = true;
                        self.bottomStatus('done');
                    }else {
                        self.bottomStatus('more');
                    }
                    lists.forEach(val=>{
                        self.listData.push(val);
                    });
                },(err)=>{console.log(err)});
            }else {
                self.bottomStatus('done');
            }
        }
    }
};