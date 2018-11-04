<template>
<!-- 添加商品类型 -->
  <div class="type fl">
    <div class="t_tab">
      <h1 class="t_title">
        <span class="size16">添加商品类型</span>
        <div class="t_m fr" @click="to">返回商品类型列表</div>
      </h1>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="specification" >
        <tr>
            <td align="center" bgcolor="#f9fafa" class="bold black">商品类型详情 </td>
            <td bgcolor="#f9fafa" class="bold black">&nbsp;</td>
        </tr>
        <tr>
            <td width="139" align="right">商品类型名称：</td>
            <td><input type="text" name="textfield" value="123"></td>
        </tr>
        <tr>
            <td align="right">是否显示：</td>
            <td>
              <input type="radio" name="radio"  value="radio" style="width:15px; height:15px; border:none;">
              是
              <input type="radio" name="radio"  value="radio" style="width:15px; height:15px; border:none;">
              否</td>
        </tr>
    </table>
    <div class="button">
        <span>确认提交</span>
    </div>
    </div>
  </div>
  
</template>
<script>
export default {
  name:'type',
  data () {
    return {
      
    }
  },
    methods:{
        to() {
          this.$router.back();
        }
    },
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
              .t_add {
                  background: url(../../../../assets/plus2.jpg) no-repeat 15px #ff9f24;
                  width: 135px;
                  height: 32px;
                  border: 1px solid #ff920b;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: normal;
                  cursor: pointer;
                  color: #FFF;
                  line-height: 32px;
                  text-indent: 30px;
              }
              .t_m {
                  background: url(../../../../assets/return.jpg) no-repeat 10px #ff9f24;
                  width: 135px;
                  height: 32px;
                  border: 1px solid #ff920b;
                  border-radius: 4px;
                  font-size: 12px;
                  font-weight: normal;
                  cursor: pointer;
                  color: #FFF;
                  line-height: 32px;
                  text-indent: 30px;
              }
          }
    }
</style>

<style lang="less" scoped>
    .type {
        width: 1042px;
        .bold {
            font-weight: bold;
        }
        .black {
            color: #333;
        }
        .t_tab {
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
                }
                .edit {
                    border: 1px solid #dddddd;
                    color: #666666;
                    width: 40px;
                    line-height: 22px;
                    text-align: center;
                    display: block;
                    border-radius: 4px;
                    float: left;
                    margin-right: 15px;
                    cursor: pointer;
                }
              }
            }
            .button {
                height: 32px;
                margin: 20px 0;
                border-radius: 6px;
                background: #f7bc0a;
                width: 199px;
              span {
                display: block;
                line-height: 32px;
                color: #FFF;
                text-align: center;
                cursor: pointer;
              }
            }
          }
        }
</style>