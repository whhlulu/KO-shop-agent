<template>
    <!-- 图片空间 -->
      <div class="tab_content">
        <h1 class="t_title">
            <span class="size16">图片空间 - 广告图</span>
            <i>（ 共 10 条记录 ）</i>
            <div class="recovery fr" @click="go">返回相册列表</div>
            <div class="found fr" @click="add">上传图片</div>
        </h1>
        <div class="operation">
            <span class="fl">批量处理</span>
            <span class="fl blue">全选</span>
            <span class="fl blue">取消</span>
            <span class="fl blue">删除</span>
            <span class="fl blue">移动</span>
        </div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="specification" >
            <tr>
                <td align="center" bgcolor="#f9fafa" class="bold black">
                    <input type="checkbox" name="checkbox" id="checkbox" style="width:15px; height:15px; border:none;">
                </td>
                <td bgcolor="#f9fafa" class="bold black">名称 </td>
                <td bgcolor="#f9fafa" class="bold black">类型 </td>
                <td bgcolor="#f9fafa" class="bold black">尺寸</td>
                <td bgcolor="#f9fafa" class="bold black">大小</td>
                <td bgcolor="#f9fafa" class="bold black">操作</td>
                <td bgcolor="#f9fafa" class="bold black">&nbsp;</td>
                <td bgcolor="#f9fafa" class="bold black">&nbsp;</td>
                <td bgcolor="#f9fafa" class="bold black">&nbsp;</td>
            </tr>
            <tr>
                <td width="70" align="center" bgcolor="#f9fafa" class="bold black">
                    <input type="checkbox" name="checkbox" id="checkbox" style="width:15px; height:15px; border:none;">
                </td>
                <td width="180"><img class="list_image fl" src="../../../../assets/1.jpg"><i class="fl title">板块</i></td>
                <td width="130">png</td>
                <td width="130" class="td">200*200</td>
                <td width="130">150kb</td>
                <td width="33"><span class="put">设为封面</span></td>
                <td width="33"><span>替换</span></td>
                <td width="33"><span>移动</span></td>
                <td width="71"><span>删除</span></td>
            </tr>
        </table>
        <div class="Paging">
              <div class="Paging_r">
                  <span class="jilu">共1条记录，每页显示： 1条</span>
                  <span class="zuyou"></span>
                  <span class="num">1</span>    
                  <span class="zuyou">></span>
                  <input type="text" class="shuru">
                  <span class="go">GO</span>   
              </div>  
          </div>
          <div v-if="$store.state.upload_show">
                <upload-Image></upload-Image>
        </div>
    </div>
</template>
<script>
import uploadImage from '../../../page/uploadImage' //上传图片遮罩层

export default {
    name:'picturelist',
    data (){
      return {
          disabled:false
      }
    },
    methods:{
        add() {
            this.$store.state.upload_show = true;
        },
       choose(){
           this.disabled = true;
       },
       go(){
            this.$router.back();
       }
    },
    components: {
      uploadImage
    }
          
}
</script>
<style lang="less" scoped>
        .tab_content {
            .t_title {
                color: #333;
                border-bottom: 1px solid #dddddd;
                overflow: hidden;
                margin-bottom: 10px;
                line-height: 50px;
                i {
                    color: #999;
                    }
                .found {
                    background: url(../../../../assets/sci_03.jpg) no-repeat 22px #ff9f24;
                    width: 125px;
                    height: 32px;
                    border: 1px solid #ff920b;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: normal;
                    cursor: pointer;
                    color: #FFF;
                    line-height: 32px;
                    text-indent: 45px;
                    
                }
                .recovery {
                    background: url(../../../../assets/return.jpg) no-repeat 15px #ff9f24;
                    width: 125px;
                    height: 32px;
                    border: 1px solid #ff920b;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: normal;
                    cursor: pointer;
                    color: #FFF;
                    line-height: 32px;
                    text-indent: 35px;
                    margin-left: 20px;
                }
            }
            .operation {
                height: 30px;
                line-height: 30px;
                margin-bottom:10px; 
                .blue {
                    margin-top: 3px;
                    height: 20px;
                    width: 50px;
                    margin-left:10px;
                    border-radius: 3px;
                    line-height: 20px;
                    color: #fff;
                    background-color: #58b4ff;
                    text-indent: 20px;
                    cursor: pointer;
                }
                 span:nth-child(2){
                    background: url(../../../../assets/select01.png) no-repeat 5px #58b4ff;
                }
                span:nth-child(3){
                    background: url(../../../../assets/cancel.png) no-repeat 5px #58b4ff;
                }
                span:nth-child(4){
                    background: url(../../../../assets/delete01.png) no-repeat 5px #58b4ff;
                }
                span:nth-child(5){
                    background: url(../../../../assets/move.png) no-repeat 5px #58b4ff;
                }
            }
            .specification {
              border-left: 1px solid #dddddd;
              border-right: 1px solid #dddddd;
              border-top: 1px solid #dddddd;
              color: #a4a5a7;
              input {
                width: 288px;
                height: 32px;
                border: 1px solid #cccccc;
                padding-left:5px;
              }
              input[type=checkbox], input[type=radio] {
                  margin:0;
              }
              tr {
                td {
                    border-bottom: 1px solid #ddd;
                    padding: 10px 0;
                    line-height:24px;
                    font-size:12px; 
                    .list_image{
                        height:80px;
                        width: 80px;
                    }
                    .title{
                        padding-top: 30px;
                    }
                }
                .td{
                    position: relative;
                        .default {
                            width: 20px;
                            height: 20px;
                            cursor: pointer;
                            }
                    }
                span {
                    border: 1px solid #dddddd;
                    color: #666666;
                    width: 40px;
                    line-height: 22px;
                    text-align: center;
                    display: block;
                    border-radius: 4px;
                    float: left;
                    cursor: pointer;
                }
                .put{
                    width: 60px 
                }
                
              }
            }
            .Paging{
                height: 50px;
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                .Paging_r{
                    float: right;
                    span{
                        display: block;
                        float: left;
                    }
                    .jilu{
                        height: 50px;
                        line-height: 50px;
                        margin-right: 5px;
                    }
                    .zuyou{
                        width: 30px;
                        height: 28px;
                        float: left;
                        text-align: center;
                        line-height: 28px;
                        border: 1px solid #dddddd;
                        margin-top: 10px;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    .num{
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        background-color: #f7bc0a;
                        text-align: center;
                        color: #FFF;
                        display: block;
                        float: left;
                        margin-top: 10px;
                        cursor: pointer;
                    }
                    .shuru{
                        width: 30px;
                        border: 1px solid #dddddd;
                        height: 28px;
                        float: left;
                        margin-left: 15px;
                        margin-right: 15px;
                        margin-top: 10px;
                        text-align: center;
                    }
                    .go{
                        width: 37px;
                        border: 1px solid #dddddd;
                        height: 28px;
                        border-radius: 6px;
                        background-color: #f7f7f7;
                        display: block;
                        float: right;
                        text-align: center;
                        margin-top: 10px;
                        margin-right: 15px;
                        line-height: 28px;
                        cursor: pointer;
                    }
                }
            }
        }
        // .mask{
        //     width: 100%;
        //     height: 100%;
        //     background-color:#000;
        //     opacity: .5; 
        // }
      
</style>