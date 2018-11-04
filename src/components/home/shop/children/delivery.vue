<template>
    <!-- 店铺 - 配送方式-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">快递公司列表</span>
                <i>（ 共 21 条记录 ）</i>
                <div class="t_add fr" @click="tolink">设置运费模板</div>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>列表中展示平台方已开启供货商家使用的第三方快递公司</p>
                    <p>商家可启用和禁用快递公司，开启快递公司，商家发货时才可以用，商家可单独设置运单模板</p>
                </div>
            </div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list search">
                <tr>
                    <td bgcolor="#f9fafa" width="25%" class="black bold" align="center">
                        <span>快递公司名称 ：</span>
                        <input type="text" name="text">
                    </td>
                    <td bgcolor="#f9fafa" class="black bold" align="center">
                        <span class="search_btn delete">搜索</span>
                    </td>
                </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                <tr>
                    <td align="center" bgcolor="#f9fafa"><input type="checkbox" name="checkbox"></td>
                    <td bgcolor="#f9fafa" class="black bold" align="center">ID</td>
                    <td bgcolor="#f9fafa" class="black bold" align="center">快递公司名称</td>
                    <td bgcolor="#f9fafa" class="black bold" align="center">是否启用</td>
                    <td bgcolor="#f9fafa" align="center" class="black bold">排序</td>
                    <td bgcolor="#f9fafa" class="black bold">操作</td>
                </tr>
                <tr>
                    <td bgcolor="#f9fafa" width="5%" align="center"><input type="checkbox" name="checkbox1"></td>
                    <td bgcolor="#f9fafa" width="6%" align="center">175</td>
                    <td bgcolor="#f9fafa" width="12%" align="center">1</td>
                    <td bgcolor="#f9fafa" width="12%" align="center">
                        <el-switch v-model="value" active-text="是" active-color="#f7bc0a">
                        </el-switch>
                    </td>
                    <td bgcolor="#f9fafa" width="12%" align="center">1</td>
                    <td bgcolor="#f9fafa" width="6%"><span class="edit">删除</span></td>
                </tr>
                <tr>
                    <td bgcolor="#f9fafa" align="center"><input type="checkbox" name="checkbox2"></td>
                    <td bgcolor="#f9fafa" colspan="5"><span class="delete">删除</span>
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
    name: 'delivery',
    data() {
        return {
            value: true
        }
    },
    mounted() {
        
    },
    methods: {
        tolink() {
            // this.$router.push({
            //     name: 'addMember',
            //     // params: {
            //     //     status: 0
            //     // }
            // }); 
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
    .t_add {
      background: url(../../../../assets/plus2.jpg) no-repeat 20px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 38px;
    }
    span {
      float: left;
      color: #333;
    }
    i {
      color: #999;
    }
  }
}
.el-switch {
  .el-switch__core {
    width: 35px !important;
    height: 16px;
    .el-switch__button {
      width: 11px;
      height: 11px;
    }
  }
  .el-switch__label {
    color: #a4a5a7;
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
.classify {
  width: 1042px;
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
      .delete {
        background-color: #e9573e;
        color: #fff;
        width: 56px;
        line-height: 30px;
        text-align: center;
        display: block;
        border-radius: 4px;
        float: left;
        margin-left: 30px;
        cursor: pointer;
      }
    }
    .search {
      tr {
        td {
          input,
          select {
            width: 150px;
            border: 1px solid #ddd;
            line-height: 30px;
            height: 30px;
            color: #999;
            text-indent: 6px;
          }
          .search_btn {
            background: #f7bc0a;
          }
        }
      }
    }
  }
}
</style>
