<template>
    <div class="z_index" v-loading="loading" style="width: 100%;height:100%;">
        <div v-title data-title="客服">客服</div>
        <!-- 头部 -->
         <header-Top></header-Top>
         <!-- 内容 -->
         <div class="content">
             <!-- 左边 -->
             <left :list="$store.state.leftNav"></left>
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
        name : 'service',
        data(){
            return {
                loading:true,
                // list:[
                //     {url:'servicetype',title:'客服类型'},{url:'servicemanage',title:'客服管理'},
                //     {url:'systemInfo',title:'系统信息'}
                //     ]
            }
        },
        created(){
            setTimeout(() => {
                this.loading = false;
                }, 500);
        },
          mounted() {

            this.$store.state.link = this.$store.state.leftNav[0].url;
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