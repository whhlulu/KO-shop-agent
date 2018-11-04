<template>
    <div class="z_index" v-loading="loading" style="width: 100%;height:100%;">
        <div v-title data-title="广告">广告</div>
        <!-- 头部 -->
         <header-Top></header-Top>
         <!-- 内容 -->
         <div class="content">
             <!-- 左边 -->
             <left :list="list"></left>
            <!-- 右边 -->
            <iframe-Label></iframe-Label>
         </div>
         <!-- 脚部 -->
         <Merchant-Foot></Merchant-Foot>
    </div>
</template>
<script>
import headerTop from '@/components/header/top';
import MerchantFoot from '@/components/foot/foot';
import left from '../../page/left' //左边
import iframeLabel from '../../page/iframe' //iframe 
    export default {
        name : 'advertisement',
        data(){
            return {
                loading:true,
                list:[
                    {url:'adslist',title:'广告列表'},
                    {url:'adsposition',title:'广告位置'},
                ]
            }
        },
        created(){
            this.$store.state.link = this.list[0].url;
            setTimeout(() => {
                this.loading = false;
                }, 500);
        },
          mounted() {
           
        },
        components: {
            headerTop,
            MerchantFoot,
            left,
            iframeLabel
        },
    }
</script>
<style lang="less" scoped>
    body{
        overflow: inherit;
    }
    .z_index{
        .content{
            width: 1266px;
            color: #a4a5a7;
            margin: 0 auto;
            overflow: hidden;
        }
    }
        
</style>