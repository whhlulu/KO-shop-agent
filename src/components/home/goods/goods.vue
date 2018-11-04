<template>
  <div class="commodity" v-loading="loading" style="width: 100%;height:100%;">
     <div v-title data-title="商品管理">商户-商品管理</div>
     <!-- 头部 -->
      <header-Top></header-Top>
      <div class="content clearfix">
          <!-- 左边 -->
        <left :list="$store.state.leftNav"></left>
        <!-- 右边 -->
        <iframe-Label></iframe-Label>
      </div>
      <!-- 脚部 -->
      <Merchant-Foot></Merchant-Foot>
      <!-- 新建图片遮罩层 -->
      <!-- 上传图片遮罩层 -->
      <!-- <div v-if="$store.state.upload_show">
            <upload-Image></upload-Image>
      </div> -->
  </div>
</template>
<script>
import headerTop from '@/components/header/top'; //头部
import MerchantFoot from '@/components/foot/foot'; //脚部
import left from '../../page/left' //左边
import uploadImage from '../../page/uploadImage' //上传图片遮罩层
import iframeLabel from '../../page/iframe' //iframe
export default {
    name:'goods',
    data (){
      return {
          loading:true,
        //   list:[
        //         {url:'goodsManage',title:'商品管理'},
        //         {url:'goodsRelease',title:'发布商品'},
        //         /*{url:'classification',title:'店铺商品分类'},*/
        //         /*{url:'imgageSpace',title:'图片空间'},*/
        //         // {url:'goodsType',title:'商品类型'},
        //         {url:'goodsSpec',title:'商品规格'},
        //         // {url:'goodsAttribute',title:'商品属性'},
        //     ],
          status :[true,false]
      }
    },
    created(){
            setTimeout(() => {
                this.loading = false;
                }, 300);
        },
    methods:{
        
    },
    mounted() {
        
        this.$store.state.link = this.$store.state.leftNav[0].url;
        document.body.scrollTop = 0;
        },
    components: {
      headerTop,
      uploadImage,
      MerchantFoot,
      left,
      iframeLabel
    }
            
}
</script>
<style lang="less" scoped>
   .commodity {
       position: relative;
      .content {
          width: 1266px;
          color: #a4a5a7;
          margin: 0 auto;
          overflow: hidden;
            .right{
                width: 1042px;
                border-left: 1px solid #dddddd;
                border-right: 1px solid #dddddd;
                padding: 16px;
                background-color: #FFF;
                float: left;
            }
      }
   }
</style>