<template>
    <div class="z_index" v-loading="loading" style="width: 100%;height:100%;">
        <div v-title data-title="订单管理-订单列表">促销</div>
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
        name : 'promotion',
        data(){
            return {
                loading:true,
                // list:[
                //     /*{url:'groupBuy',title:'团购'},*/
                //     {url:'fullGifts',title:'满赠'},
                //     {url:'fullCut',title:'满减'},
                //     {url:'coupon',title:'优惠券'},
                //     {url:'discountPackage',title:'优惠套餐'},
                //     {url:'combination',title:'最佳组合'}, 
                //     {url:'parts',title:'推荐配件'},                                 
                //     /*{url:'distribution',title:'分销',
                //         children:[
                //             {src:'distribution',list_name:'分销商品列表'},
                //             {src:'distributorList',list_name:'分销商列表'},
                //             {src:'distributionNexus',list_name:'分销关系'},
                //             {src:'distributionFit',list_name:'分销设置'},
                //             {src:'dividedInto',list_name:'分成日志'}
                //             ]
                //     },*/
                //     {url:'integralMall',title:'积分商城'},
                //     {url:'panicBuying',title:'抢购'},
                // ]
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