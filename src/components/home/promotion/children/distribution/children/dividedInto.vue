<template>
  <!-- 促销-分销-分成日志 -->
  <div class="classify">
     <div class="g_att">
        <h1 class="t_title">
          <span class="size16">分销商品管理</span>
          <i>（ 共 3 条记录 ）</i>
        </h1>
        <table width="100%" border="0" cellspacing="0" cellpadding="0"   class="Commodity-management">
            <tr>
                <td width="7%" align="right">分类：</td>
                <td width="22%">
                    <select name="select1" >
                        <option></option>
                    </select></td>
                <td width="10%" align="right"> 商品名称： </td>
                <td width="23%">
                    <input name="textfield" type="text" style="width:200px">
                </td>
                <td width="28%" align="left"><span class="search">搜索</span></td>
            </tr>
      </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
            <tr>
                <td align="center" bgcolor="#f9fafa"><input type="checkbox" name="checkbox"></td>
                <td bgcolor="#f9fafa" class="black bold" align="center">ID </td>
                <td bgcolor="#f9fafa" class="black bold" align="center">下单会员</td>
                <td bgcolor="#f9fafa" class="black bold" align="center">获佣用户</td>
                <td bgcolor="#f9fafa" align="center" class="black bold">订单编号</td>
                <td bgcolor="#f9fafa" align="center" class="black bold">获佣金额</td>
                <td bgcolor="#f9fafa" align="center" class="black bold">订单金额</td>
                <td bgcolor="#f9fafa" align="center" class="black bold">获佣用户级别</td>
                <td bgcolor="#f9fafa" class="black bold">记录生成时间</td>
                <td bgcolor="#f9fafa" class="black bold">状态</td>
            </tr>
            <tr>
                <td bgcolor="#f9fafa" width="5%" align="center"><input type="checkbox" name="checkbox1"></td>
                <td bgcolor="#f9fafa" width="7%" align="center">1311</td>
                <td bgcolor="#f9fafa" width="7%" align="center">张三</td>
                <td bgcolor="#f9fafa" width="7%" align="center">李四</td>
                <td bgcolor="#f9fafa" width="12%" align="center">20164551548455</td>
                <td bgcolor="#f9fafa" width="7%" align="center">315</td>
                <td bgcolor="#f9fafa" width="7%" align="center">69.00</td>
                <td bgcolor="#f9fafa" width="10%" align="center">二级分销</td>
                <td bgcolor="#f9fafa" width="14%" >2016-01-01-10:59:38</td>
                <td bgcolor="#f9fafa" width="10%">未付款</td>
            </tr>
            <tr>
                <td bgcolor="#f9fafa" align="center"><input type="checkbox" name="checkbox2" id="checkbox2"></td>
                <td bgcolor="#f9fafa" colspan="9"><span class="delete">删除</span>
                <div class="paging">
                    <span class="go">GO</span>
                    <span style="margin-left:15px;"><input name="textfield" type="text" id="textfield" style="width:30px;"></span>
                    <div class="number">
                    <span></span>
                    <span class="page">1</span>
                    <span>></span>
                    </div>
                    <span style="margin:0 10px;">条</span>
                    <span><input name="textfield" type="text" id="textfield" size="10"></span>
                    <span>共1条记录，每页显示： </span>
                </div>    </td>
            </tr>
        </table>
      </div>
  </div>
</template>
<script>
export default {
    name:'fullCut',
    data (){
      return {
        
      }
    },
    methods:{
        to(){
            this.$router.push({
                name: 'addFullCut',
                // params: {
                //     status: 0
                // }
            }); 
        },
    }  

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
            i {
              color: #999;
            }
        }
    }
</style>
<style lang="less" scoped>
    .classify {
        width: 1000px;
        .g_att{
            .Commodity-management {
                background-color: #f6f6f6;
                border: 1px solid #dddddd;
                margin-top: 15px;
                line-height: 50px;
                tr {
                     td {
                         input {
                            border: 1px solid #ddd;
                            line-height: 29px;
                            height: 29px;
                            color: #999;
                            text-indent: 5px;
                        }
                        select {
                            width: 200px;
                            border: 1px solid #ddd;
                            line-height: 29px;
                            height: 29px;
                            color: #999;
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
                        }
                     }
                }
            }
            .list {
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                border-top: 1px solid #ddd;
                margin-top: 15px;
                tr {
                    td {
                        padding: 10px 0;
                        border-bottom: 1px solid #ddd;
                        input, select, textarea, button {
                            outline: 0 none;
                            vertical-align: middle;
                            text-indent: 5px;
                        }
                       
                        .paging {
                            background:#fff;
                            line-height: 30px;
                            float: right;
                            width: 850px;
                            input {
                                border: 1px solid #dddddd;
                                height: 28px;
                            }
                            .number {
                                float: right;
                                
                                span {
                                    width: 30px;
                                    height: 28px;
                                    float: left;
                                    text-align: center;
                                    line-height: 30px;
                                    border: 1px solid #dddddd;
                                }
                                .page {
                                    width: 30px;
                                    height: 30px;
                                    line-height: 30px;
                                    background-color: #f7bc0a;
                                    text-align: center;
                                    color: #FFF;
                                    border:none;
                                    border-right: 1px solid #eeb407;
                                    cursor: pointer;
                                }
                            }
                            .go {
                                width: 37px;
                                border: 1px solid #dddddd;
                                height: 28px;
                                border-radius: 6px;
                                background-color: #f7f7f7;
                                display: block;
                                float: right;
                                text-align: center;
                                margin: 0 15px;
                                cursor: pointer;
                            }
                            span {
                                float: right;
                            }
                        }

                    }
                }
                .delete {
                    background-color: #e9573e;
                    color: #fff;
                    width: 56px;
                    line-height: 30px;
                    text-align: center;
                    display: block;
                    border-radius: 4px;
                    float: left;
                    margin-left: 17px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
