<template>
    <!-- 商品属性 -->
  <div class="attribute fl">
      <div class="g_att">
          <h1 class="t_title">
            <span class="size16">商品属性</span>
            <div @click="to" class="t_add fr">添加商品属性</div>
          </h1>
          <table width="100%" border="0" cellspacing="0" cellpadding="0"   class="Commodity-management" style="margin-bottom:20px;">
            <tr>
              <td width="7%" align="right"></td>
              <td width="16%">
                <select name="select" id="select">
                    <option>电视</option>
                    <option>全部 </option>
                    <option>全部 </option>
              </select></td>
              <td width="77%"><span class="search">搜索</span></td>
            </tr>
          </table>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="Shop specification" >
            <tr class="black bold">
              <td align="center" bgcolor="#f9fafa" class="bold black">
                <input type="checkbox" name="checkbox" id="checkbox" style="width:15px; height:15px; border:none;">
              </td>
              <td align="center" bgcolor="#f9fafa" class="bold black">ID</td>
              <td bgcolor="#f9fafa" class="bold black">属性名称 </td>
              <td bgcolor="#f9fafa" class="bold black">商品类型</td>
              <td bgcolor="#f9fafa" class="bold black">属性值的输入方式 </td>
              <td align="center" bgcolor="#f9fafa" class="bold black">可选值列表</td>
              <td bgcolor="#f9fafa" class="bold black">筛选</td>
              <td bgcolor="#f9fafa" class="bold black">排序</td>
              <td bgcolor="#f9fafa" class="bold black">操作</td>
              <td bgcolor="#f9fafa" class="bold black">&nbsp;</td>
              </tr>
            <tr>
              <td width="70" align="center">
                <span class="bold black">
                  <input type="checkbox" name="checkbox2" id="checkbox2" style="width:15px; height:15px; border:none;">
                </span>
              </td>
              <td width="69" align="center">20</td>
              <td width="161"> 操作系统 </td>
              <td width="133"> 电视</td>
              <td width="121">手工录入</td>
              <td width="133" align="center">VIDAA10 </td>
              <td width="132">
                <el-switch
                v-model="value"
                active-color="#f7bc0a">
              </el-switch>
              </td>
              <td width="131">50</td>
              <td width="53">
                <span class="edit">编辑</span>
              </td>
              <td width="71">
                <span class="edit">删除</span>
              </td>
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
      name:'attribute',
      data () {
        return {
          value:true
        }
      },
      methods:{
            to(){
                this.$router.push({
                  name: 'addGoodsAttribute',
                  // params: {
                  //     status: 0
                  // }
              }); 
            },
        },
}
</script>
<style lang="less">
  .g_att {
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
</style>

<style lang="less" scoped>
    .attribute {
        width: 1042px;
          .Commodity-management {
            background-color: #f6f6f6;
            border: 1px solid #dddddd;
            margin-top: 15px;
            tr {
                td {
                    border-bottom: 1px solid #ddd;
                    padding: 10px 0;
                    line-height:24px;
                    font-size:12px; 
                }
            }
              select {
                width: 140px;
                border: 1px solid #ddd;
                line-height: 29px;
                height: 29px;
                color: #999;
                font: 400 11px system-ui;
            }
              .search {
                  width: 58px;
                  height: 32px;
                  line-height: 32px;
                  background-color: #f7bc0a;
                  color: #FFF;
                  text-align: center;
                  display: block;
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 12px;
              }
            }
            .specification {
              border-left: 1px solid #dddddd;
              border-right: 1px solid #dddddd;
              border-top: 1px solid #dddddd;
              .black {
                  color: #333;
                }
                .bold {
                  font-weight: bold;
              }
              tr {
                 td {
                    border-bottom: 1px solid #ddd;
                    padding: 10px 0;
                    line-height:24px;
                    .el-switch {
                        padding-left: 0;
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
                    }
                 }
              }
          }
          .Shop{
            input {
              padding-left:5px;
            }
            input, select {
                margin:0;
                width: 288px;
                height: 32px;
                border: 1px solid #cccccc;
            }
          } 
        }
</style>