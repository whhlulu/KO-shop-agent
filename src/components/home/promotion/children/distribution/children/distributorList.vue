<template>
    <!-- 促销 - 分销-分销商列表 -->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">分销商列表</span>
                <i>（ 共 3 条记录 ）</i>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>点击查看操作将显示当前用户上三级分销ID和该用户的下三级分销商数量</p>
                    <p>列表可根据用户ID和昵称搜索</p>
                    <p>列表中的三级分销商数量可点击，点击后显示该级别下的会员列表</p>
                </div>
            </div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                <tr>
                    <td align="center" bgcolor="#f9fafa"><input type="checkbox" name="checkbox"></td>
                    <td bgcolor="#f9fafa" class="black bold" align="center">编号 </td>
                    <td bgcolor="#f9fafa" class="black bold" align="center">可用资金</td>
                    <td bgcolor="#f9fafa" class="black bold" align="center">冻结资金</td>
                    <td bgcolor="#f9fafa" align="center" class="black bold">总分成金额</td>
                    <td bgcolor="#f9fafa" align="center" class="black bold">下线会员总数</td>
                    <td bgcolor="#f9fafa" align="center" class="black bold">一级会员总数</td>
                    <td bgcolor="#f9fafa" align="center" class="black bold">二级会员总数</td>
                    <td bgcolor="#f9fafa" align="center" class="black bold">三级会员总数</td>
                    <td bgcolor="#f9fafa" class="black bold">操作</td>
                </tr>
                <tr>
                    <td bgcolor="#f9fafa" width="5%" align="center"><input type="checkbox" name="checkbox1"></td>
                    <td bgcolor="#f9fafa" width="12%" align="center">175</td>
                    <td bgcolor="#f9fafa" width="12%" align="center">1</td>
                    <td bgcolor="#f9fafa" width="12%" align="center">1</td>
                    <td bgcolor="#f9fafa" width="10%" align="center">1</td>
                    <td bgcolor="#f9fafa" width="14%" align="center">1</td>
                    <td bgcolor="#f9fafa" width="10%" align="center">1</td>
                    <td bgcolor="#f9fafa" width="14%" align="center">1</td>
                    <td bgcolor="#f9fafa" width="14%" align="center">1</td>
                    <td bgcolor="#f9fafa" width="18%" align="center">
                        <span class="edit" @click="tolink">查看</span>
                    </td>
                </tr>
                <tr>
                    <td bgcolor="#f9fafa" align="center"></td>
                    <td bgcolor="#f9fafa" colspan="9">
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
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'fullCut',
    data() {
        return {

        }
    },
    methods: {
        tolink() {
            this.$router.push({
                name: 'distributorInfo',
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
  .g_att {
    .list {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-top: 15px;
      tr {
        td {
          padding: 15px 0;
          border-bottom: 1px solid #ddd;
          input,
          select,
          textarea,
          button {
            outline: 0 none;
            vertical-align: middle;
            text-indent: 5px;
          }

          .paging {
            background: #fff;
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
                color: #fff;
                border: none;
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
    }
  }
}
</style>
