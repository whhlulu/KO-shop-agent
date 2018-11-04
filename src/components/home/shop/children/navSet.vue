<template>
    <!-- 店铺 - 导航设置-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">店铺导航 - 店铺导航设置</span>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>可以给店铺导航添加背景颜色</p>
                </div>
            </div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="search">
                <tr>
                    <td width="15%" align="right" class="black">
                        <b>*</b>导航背景色： </td>
                    <td width="85%">
                        <input type="text" v-model="color" name="textfield2" class="fl">
                        <span class="fl">
                            <el-color-picker v-model="color" size="small"></el-color-picker>
                        </span>
                        <span class="fl explain">设置导航背景颜色，如果为空则显示默认颜色</span>
                    </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td colspan="2">
                        <el-button v-if="isNew" type="success" @click="submit">确认新建</el-button>
                        <el-button v-else type="success" @click="update">确认修改</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'navset',
    data() {
        return {
            color: '',
            isNew: true
        }
    },
    mounted() {
        
        this.getColor();
    },
    methods: {
        tolink() {
            this.$router.push({
                name: 'addshopnav',
            });
        },
        getColor() {
            this.$HTTP(this.$httpConfig.getStoreNavColorList,{}).then((res) => {
                var keysList = Object.keys(res.data.data.data);
                var value = keysList[0];
                this.color = res.data.data.data[value].color;
                this.$message.info(res.message);
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        submit() {
            this.$HTTP(this.$httpConfig.addStoreNavColor,{color: this.color}).then((res) => {
                console.log(res.data);
                this.$message.success(res.data.message);
            }).catch((err) => {
                this.$message.error(err);
            });
        },
        update() {
            this.$HTTP(this.$httpConfig.saveStoreNavColor,{color: this.color}).then((res) => {
                console.log(res.data);
                this.$message.info(res.message);
            }).catch((err) => {
                this.$message.error(err);
            });
        }
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
  }
}
</style>
<style lang="less" scoped>
.classify {
  width: 1042px;
  .g_att {
    .search {
      margin-top: 15px;
      tr {
        td {
          padding: 15px 0;

          b {
            color: #ff0000;
          }
          input,
          select {
            width: 200px;
            border: 1px solid #ddd;
            line-height: 30px;
            height: 30px;
            color: #999;
            text-indent: 6px;
          }
          span {
            padding-left: 10px;
          }
          .explain {
            height: 32px;
            line-height: 32px;
          }
          .search_btn {
            background: #f7bc0a;
          }
          .Settled {
            height: 32px;
            line-height: 32px;
            color: #fff;
            text-align: center;
            display: block;
            border-radius: 6px;
            margin-top: 10px;
            float: left;
            margin-right: 20px;
            cursor: pointer;
            padding: 0;
            background: #f7bc0a;
            width: 200px;
          }
        }
      }
    }
  }
}
</style>
