<template>
  <div class="commodity" v-loading="loading" style="width: 100%;height:100%;">
     <div v-title data-title="物流">商户-物流</div>
     <!-- 头部 -->
      <header-Top></header-Top>
      <div class="content">
          <!-- 左边 -->
          <left :list="$store.state.leftNav"></left>
          <!-- 右边 -->
          <iframe-Label></iframe-Label>
      </div>
      <!-- 脚部 -->
      <Merchant-Foot></Merchant-Foot>
      <!-- 添加地区 -->
      <div v-show="$store.state.add_region">
          <add-Region></add-Region>
      </div>
  </div>
</template>
<script>
import headerTop from '@/components/header/top'; //头部
import left from '../../page/left' //左边
import iframeLabel from '../../page/iframe' //iframe 
import MerchantFoot from '@/components/foot/foot'; //脚部
import addRegion from '../../page/add_region' //添加地区
export default {
    name:'logistics',
    data (){
      return {
          loading:true
        //   list:[{url:'shipAddress',title:'发货地址'},{url:'expressList',title:'快递公司列表'},{url:'freightTemplet',title:'运费模板'},{url:'freightFit',title:'运费设置'},],
      }
    },
    created(){
           setTimeout(() => {
            this.loading = false;
            }, 500);
        },
    methods:{
        
    },
    
    mounted() {
        
        this.$store.state.link = this.$store.state.leftNav[0].url;
    },
    components: {
      headerTop,
      MerchantFoot,
      iframeLabel,
      left,
      addRegion
    }
            
}
</script>
<style lang="less" scoped>
body{
        overflow: inherit;
    }
   .commodity {
       position: relative;
      .content {
          width: 1266px;
          color: #a4a5a7;
          margin: 0 auto;
          overflow: hidden;
          .left{
            width: 190px;
            line-height: 34px;
            margin-top: 26px;
            float: left;
            .nav {
                border: none;
                li {
                    height: 34px;
                    margin: 0;
                    float: none;
                    a {
                        text-indent: 40px;
                        font-size: 13px;
                        height: 34px;
                        margin: 0;
                        line-height: inherit;
                        border: none;
                        border-radius:0;
                        padding: 0;
                        display: block;
                        color: #666666;
                        background: url(../../../assets/lm-bj1.png);
                        transition: color .0s ease;
                    }
                    
                    a.hover{
                        background: url(../../../assets/lm-bj2.png) no-repeat;
                        text-indent: 40px;
                        height: 34px;
                        display: block;
                        color: #FFF;
                    }
                }
                li:hover a{
                        background: url(../../../assets/lm-bj2.png) no-repeat;
                        text-indent: 40px;
                        height: 34px;
                        display: block;
                        color: #FFF;
                        transition: color 0s ease;
                    }
            }
        }
      }
   }
</style>