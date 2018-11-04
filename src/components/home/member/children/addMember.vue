<template>
    <!-- 会员 - 添加会员-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">添加会员</span>
                <div class="t_m fr" @click="tolink">返回会员列表</div>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>店铺管理可后台设置商城会员成为店铺会员，并为其设置享受的会员等级</p>
                </div>
            </div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                <tr>
                    <td align="right" class="black">
                        <b>*</b> 会员帐号： </td>
                    <td>
                        <input type="text" name="textfield1" v-model="account">
                    </td>
                </tr>
                <tr>
                    <td width="20%" align="right" class="black">
                        <b>*</b> 会员等级：
                    </td>
                    <td width="80%">
                        <el-select v-model="levelID" placeholder="请选择" style="width: 250px;">
                            <el-option v-for="item in levelList" :key="item.id" :label="item.level_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td align="right">&nbsp;</td>
                    <td>
                        <span class="Settled" style="background:#f7bc0a; width:199px;">确认提交</span>
                    </td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'memberGrade',
    data() {
        return {
            account: '',
            levelID: '',
            levelList: []
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        tolink() {
            this.$router.back();
        },
        getList() {
            this.$HTTP(this.$httpConfig.getMemberLevelList,{member_id: this.menberName}).then((res) => {
                this.level = [];
                if (res.data.data.data) {
                    let data = res.data.data.data;
                    for (let key in data) {
                        this.levelList.push(data[key])
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
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
</style>
<style lang="less" scoped>
.classify {
  width: 1000px;
  padding-bottom: 80px;
  .g_att {
    .list {
      margin-top: 15px;
      tr {
        td {
          padding: 15px 0;
          input,
          select,
          textarea,
          button {
            padding-left: 5px;
            width: 288px;
            height: 32px;
            border: 1px solid #cccccc;
          }
          b {
            color: #ff0000;
          }
          .Settled {
            height: 32px;
            line-height: 32px;
            color: #fff;
            text-align: center;
            display: block;
            border-radius: 6px;
            margin-top: 20px;
            float: left;
            margin-right: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
