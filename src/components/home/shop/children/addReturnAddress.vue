<template>
    <div class="logistics fl">
        <!-- 店铺-添加发退货地址库 -->
        <div class="t_tab">
            <h1 class="t_title">
                <span class="size16">发退货地址库 - 添加</span>
                <div class="t_m fr" @click="to">返回发/退货地址</div>
            </h1>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="logistics_x">
                <tr>
                    <td align="right" class="black"><b>*</b>联系人： </td>
                    <td colspan="2"><input type="text" name="contacts"></td>
                </tr>
                <tr>
                    <td width="12%" align="right" class="black"><b>*</b> 所在地区： </td>
                    <td width="10%" colspan="2">
                        <select name="select" id="select">
                            <option>请选择</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td width="12%" align="right" class="black"><b>*</b> 详细地址： </td>
                    <td width="10%">
                        <input type="text" name="address">
                    </td>
                    <td width="200"><span class="notes">建议您如实填写详细发货地址，例如街道名称，门牌号码，楼层和房间号等信息</span></td>
                </tr>
                <tr>
                    <td align="right" class="black"><b>*</b>手机号码： </td>
                    <td colspan="2"><input type="text" name="textfield2"></td>
                </tr>
                <tr>
                    <td align="right" class="black">邮箱： </td>
                    <td colspan="2"><input type="text" name="textfield3"></td>
                </tr>
                <tr>
                    <td align="right" class="black">是否默认： </td>
                    <td colspan="2">
                        <el-switch v-model="value" inactive-text="否" active-text="是" active-color="#f7bc0a">
                        </el-switch>
                    </td>
                </tr>
                <tr>
                    <td align="right">&nbsp;</td>
                    <td><span class="Settled" style="background:#f7bc0a; width:199px;">确认提交</span></td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'addreturn',
    data() {
        return {
            value: false
        }
    },
    created() {
    },

    mounted() {
        
    },
    methods: {
        to() {
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
      color: #fff;
      line-height: 32px;
      text-indent: 35px;
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
          margin: 0;
        }
        b {
          color: #ff0000;
        }
        .notes {
          padding-left: 15px;
        }
        input,
        select {
          padding-left: 5px;
          width: 288px;
          height: 32px;
          border: 1px solid #cccccc;
        }
        .left {
          margin-left: 35px;
        }
        .Settled {
          height: 32px;
          line-height: 32px;
          color: #fff;
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