import itemListBottom from './itemListBottom.js';

itemListBottom['methods']['pullUpFn'] = function(){
    setTimeout(()=>{
        this.loadListData();
    },50);
} 

export default itemListBottom