<template>
    <div class="logistics fl">
        <!-- 店铺-添加店铺导航 -->
        <div class="t_tab">
            <h1 class="t_title">
                <span v-if="!status" class="size16">店铺导航 - 添加</span>
                <span v-else class="size16">店铺导航 - 修改</span>
                <div class="t_m fr" @click="to">返回店铺导航列表</div>
            </h1>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="logistics_x">
                <tr>
                    <td align="right" class="black">
                        <b>*</b>导航名称： </td>
                    <td>
                        <el-input placeholder="请输入内容" v-model="params.name" class="el-input" clearable>
                        </el-input>
                        <span class="notes">建议添加 2~4 个字显示效果更佳</span>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="black">
                        <b>*</b>链接地址：</td>
                    <td>
                        <el-input placeholder="请输入内容" v-model="params.url" class="el-input" clearable>
                        </el-input>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="black">
                        <b>*</b>是否显示：</td>
                    <td>
                        <el-switch v-model="params.is_show" inactive-text="否" active-text="是" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="black">排序：</td>
                    <td>
                        <el-input placeholder="请输入内容" v-model="params.order_by" class="el-input" clearable>
                        </el-input>
                        <span class="notes">数字范围 0~9999 ，数字越小越靠前</span>
                    </td>
                </tr>
                <tr>
                    <td align="right">&nbsp;</td>
                    <td colspan="2">
                        <el-button type="success" @click="submit">确认提交</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'addshopnav',
    data() {
        return {
            status: 0, //0代表是新增，1代表是修改
            id: 0,
            defaultMsg: '',
            textfield2: 'te',
            config: {
                initialFrameWidth: null,
                initialFrameHeight: 350
            },
            value: false,
            value2: "",
            params: {
                id: "",
                is_show: true,
                name: "",
                order_by: "",
                store_id: "",
                url: ""
            }
        }
    },
    created() {
    },
    mounted() {
        
        this.status = this.$route.params.status;
        if (this.status) {
            /*修改*/
            this.id = this.$route.params.id;
            this.queryData();
        }
        console.log(this.id)
    },
    methods: {
        to() {
            this.$router.back();
        },
        queryData() {
            this.$HTTP(this.$httpConfig.getStoreNavDetail, { id: this.id }, 'post').then((res) => {
                this.params = res.data.data;
                this.params.is_show = this.params.is_show == 1 ? true : false;
                this.$message.success(res.message);
            }).catch((err) => {
                this.$message.error(err);
            });
        },
        submit() {
            let isShow = Number(this.params.is_show);
            this.params.is_show = isShow;
            if (this.status) {
                /*修改*/
                this.$HTTP(this.$httpConfig.saveStoreNav, this.params, 'post').then((res) => {
                    this.$message.success('修改成功！！');
                }).catch((err) => {
                    this.$message.error(err);
                });
            } else {
                /*添加*/
                this.$HTTP(this.$httpConfig.addStoreNav, this.params, 'post').then((res) => {
                    this.$message.success(res.data.message);
                }).catch((err) => {
                    this.$message.error(err);
                });
            }
            this.to();
        }
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
      background: url(../../../../assets/return.jpg) no-repeat 7px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 28px;
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
  .logistics_x {
    tr {
      td {
        padding: 10px 0;
        .el-input {
          width: 500px;
        }
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
        textarea {
          padding-left: 5px;
          padding-top: 5px;
          min-height: 50px;
          border: 1px solid #cccccc;
        }
      }
    }
  }
}
</style>