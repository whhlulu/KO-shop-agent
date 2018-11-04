<template>
  <div class="logistics fl">
    <!-- 店铺-添加文章 -->
    <div class="t_tab">
        <h1 class="t_title">
            <span class="size16">文章列表 - 文章添加</span>
            <div class="t_m fr" @click="to">返回文章列表</div>
        </h1>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="logistics_x" >
            <tr>
                <td width="15%" align="right" class="black"><b>*</b> 文章分类： </td>
                <td width="85%">
                    <select name="select" id="select">
                        <option>电视</option>
                        <option>全部 </option>
                        <option>全部 </option>
                    </select>
                </td>         
            </tr>
            <tr>
                <td align="right" class="black"><b>*</b>文章标题： </td>
                <td>
                    <input type="text" name="textfield2">
                    <span class="notes">最多输入30个字</span> 
                </td>
            </tr>
            <tr>
                <td align="right" class="black"><b>*</b>关键字：</td>
                <td>
                    <textarea name="textarea"  cols="60" rows="2"></textarea>
                    <span class="notes">最多输入50个字，多关键词之前用空格或者 "," 隔开</span>
                </td>   
            </tr>
            <tr>
                <td align="right" class="black">来源：</td>
                <td>
                    <input type="text">
                </td>               
            </tr>
            <tr>
                <td align="right" class="black">文章缩略图：</td>
                <td>
                    <input type="text" class="up"><span class="up_btn">选择上传...</span>
                    <span class="notes">建议上传 300*200 像素的图片</span>
                </td>               
            </tr>
            <tr>
                <td align="right" class="black">是否显示：</td>
                <td>
                    <el-switch
                        v-model="value"
                        inactive-text="否"
                        active-text="是"
                        active-color="#f7bc0a">
                    </el-switch>
                </td>               
            </tr>
            <tr>
                <td align="right" class="black">是否显示：</td>
                <td>
                    <el-switch
                        v-model="value"
                        inactive-text="否"
                        active-text="是"
                        active-color="#f7bc0a">
                    </el-switch>
                    <span class="notes">控制文章是否在前台列表推荐位上展示</span>                    
                </td>               
            </tr>
             <tr>
                <td align="right" class="black">文章摘要：</td>
                <td>
                    <textarea class="abstract" name="textarea"  cols="45" rows="2"></textarea>
                    <span class="notes">最多输入100字</span>
                </td>   
            </tr>
            <tr>
                <td align="right" class="black">文章摘要：</td>
                <td>
                    <div class="fl">
                        <UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
                    </div>
                </td>               
            </tr>
            <tr>
                <td align="right" class="black">排序：</td>
                <td>
                    <input type="text">
                    <span class="notes">数字范围 0~9999 ，数字越小越靠前</span>
                </td>   
            </tr>
            <tr>
                <td align="right">&nbsp;</td>
                <td colspan="2"><span class="Settled" style="background:#f7bc0a; width:199px;">确认提交</span></td>
            </tr>
        </table>
    </div>
  </div>
</template>
<script>
import UE from '../../goods/children/goodsRelease/children/UE';
export default {
  name:'addarticle',
  data () {
    return {
        defaultMsg: '',
        config: {
            initialFrameWidth: null,
            initialFrameHeight: 350
        },
        value:false
    }
  },
  components:{
    UE
  },
  created(){
  },
	mounted() {
			
  },
    methods:{
       to(){
            this.$router.back(); 
        },
    }
}
</script>
<style lang="less">
    .t_tab {
        .t_title {
              color: #333;
              border-bottom: 1px solid #dddddd;
              overflow: hidden;
              margin-bottom: 22px;
              line-height: 50px;
              span {
                float: left;
                color: #333;
              }
              .t_m {
                    background: url(../../../../assets/return.jpg) no-repeat 15px #ff9f24;
                    width: 135px;
                    height: 32px;
                    border: 1px solid #ff920b;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: normal;
                    cursor: pointer;
                    color: #FFF;
                    line-height: 32px;
                    text-indent: 35px;
                }
          }
    }
    .el-switch {
      .el-switch__core {
        width: 35px!important;
        height:16px;
        .el-switch__button {
          width: 11px;
          height: 11px;
        }
      }
        .el-switch__label{
          color:#a4a5a7;
        }
          .el-switch__label.is-active {
            color: #f7bc0a;
        }
        .el-switch__label span {
            line-height: 20px;
            font-size: 12px;
        }
      }
</style>

<style lang="less" scoped>
    .logistics {
        width: 1042px;
        .Commodity-management {
                background-color: #f6f6f6;
                border: 1px solid #dddddd;
                margin-top: 15px;
                line-height: 50px;
                margin-bottom: 20px;
                input {
                    width: 140px;
                    border: 1px solid #ddd;
                    line-height: 29px;
                    height: 29px;
                    color: #999;
                    text-indent: 5px;
                }
            }
        .bold {
            font-weight: bold;
        }
        .black {
            color: #333;
        }
          .logistics_x {
              tr {
                  td {
                    padding: 10px 0;
                    .ss {
                        margin:0;
                    }
                    b{
                        color: #ff0000;
                    }
                    .notes {
                        padding-left:15px;
                    }
                    input,select {
                        padding-left: 5px;
                        width: 288px;
                        height: 32px;
                        border: 1px solid #cccccc;
                    }
                    .up{
                        width:220px;
                    }
                    .up_btn {
                        display: inline-block;
                        width:70px;
                        height:36px;
                        text-align:center;
                        background:#e6e6e6;
                        line-height:34px;
                        cursor: pointer;
                    }
                    textarea {
                        padding-left: 5px;
                        padding-top: 5px;
                        min-height: 50px;
                        border: 1px solid #cccccc;
                    }
                    .abstract {
                        min-height: 70px;
                    }
                    .Settled {
                        height: 32px;
                        line-height: 32px;
                        color: #FFF;
                        text-align: center;
                        display: block;
                        border-radius: 6px;
                        margin-top: 30px;
                        float: left;
                        margin-right: 20px;
                        cursor: pointer;
                    }
                  }
              }
          }
        }
</style>