<template>
    <div class="z_index" v-loading="loading" style="width: 100%;height:100%;">
        <div v-title data-title="商户中心">商户中心</div>
        <!-- 头部 -->
         <header-Top></header-Top>
         <!-- 内容 -->
         <div class="content clearfix">
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
import left from '../page/left' //左边
import iframeLabel from '../page/iframe' //iframe 
    export default {
        name : 'home',
        data(){
            return {
                loading:true,
                // list:[{url:'index',title:'欢迎页'}]
            }
        },
        created(){
            console.log(this.$router);
            setTimeout(() => {
                this.loading = false;
                }, 500);
        },
          mounted() {

            this.$store.state.link = this.$store.state.leftNav[0].url;
            console.log(this.$store.state.link);
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
    .z_index{
        .content{
            width: 1266px;
            color: #a4a5a7;
            margin: 0 auto;
            overflow: hidden;
            .left{
                width: 190px;
                line-height: 34px;
                margin-top: 26px;
                float: left;
                i{
                    text-decoration: none;
                    display: block;
                    text-indent: 40px;
                    font-size: 13px;
                    height: 34px;
                    display: block;
                    color: #666666;
                    background: url(../../assets/lm-bj1.png);
                    cursor: pointer;
                    &.active{
                        background: url(../../assets/lm-bj2.png) no-repeat;
                        text-indent: 40px;
                        height: 34px;
                        display: block;
                        color: #FFF;
                    }
                }
                i:hover{
                    background: url(../../assets/lm-bj2.png) no-repeat;
                    text-indent: 40px;
                    height: 34px;
                    display: block;
                    color: #FFF;
                }
            }
            .right{
                width: 1042px;
                border-left: 1px solid #dddddd;
                border-right: 1px solid #dddddd;
                padding: 16px;
                background-color: #FFF;
                min-height: 800px;
                overflow: hidden;
                float: left;
            }
        }
    }
        
</style>