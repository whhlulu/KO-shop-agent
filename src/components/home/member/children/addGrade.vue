<template>
    <div class="logistics fl">
        <!-- 会员等级-添加 -->
        <div class="t_tab">
            <h1 class="t_title">
                <span class="size16" v-if="$route.params.id === 'add'">会员等级 - 添加</span>
                <span class="size16" v-else>会员等级 - 编辑</span>
                <div class="t_m fr" @click="to">返回会员等级列表</div>
            </h1>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="logistics_x">
                <tr>
                    <td align="right" class="black" width="12%"><b>*</b>等级名称： </td>
                    <td width="10%">
                        <el-select v-model="gradeList.level_id" placeholder="请选择" style="width: 250px;">
                            <el-option v-for="item in memberList" :key="item.id" :label="item.level_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td align="right" class="black"><b>*</b>折扣：</td>
                    <td>
                        <el-input v-model="gradeList.discount" size="medium" style="width: 200px;" :maxlength='2' clearable>
                        </el-input>
                        <span class="notes">%</span>
                    </td>
                    <td> <span>折扣率不能低于1,折扣率范围为1~99之间</span></td>
                </tr>
                <tr>
                    <td align="right" class="black"><b>*</b>会员等级条件：</td>
                    <td><span>累计消费金额</span>
                        <el-input v-model="gradeList.condition_money" size="medium" style="width: 150px;margin-left: 10px;" clearable>
                        </el-input>
                    </td>
                    <td><span>元</span></td>
                </tr>
                <tr>
                    <td align="right" class="black"><b>*</b>或：</td>
                    <td><span>累计成功交易</span>
                        <el-input v-model="gradeList.condition_num" size="medium" style="width: 150px;margin-left: 10px;" clearable>
                        </el-input>
                    </td>
                    <td align="left"><span>笔</span></td>
                </tr>
                <tr>
                    <td align="right">&nbsp;</td>
                    <td>
                        <el-button @click="submit" type="success">确认提交</el-button>
                    </td>
                    <td>&nbsp;</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'addgrade',
    data() {
        return {
            value1: '',
            value: false,
            memberList: [],
            gradeList: {
                condition_money: "",
                condition_num: "",
                discount: "",
                id: "",
                level_id: ""
            }
        }
    },
    created() {
        this.levealList();
        //是编辑的条件下
        if (this.$route.params.id != 'add') {
            //获取单条数据
            this.$HTTP(this.$httpConfig.getMemberLevelDetail, { id: this.$route.params.id }, 'post').then((res) => {
                this.gradeList = res.data.data.store;
                this.gradeList.discount = parseInt(res.data.data.store.discount);
                this.gradeList.condition_money = parseInt(res.data.data.store.condition_money);
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: res.data.message
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    mounted() {
    },
    methods: {
        //会员等级列表
        levealList() {
            this.$HTTP(this.$httpConfig.getStoreLevelNameList, {}, 'post').then((res) => {
                this.memberList = res.data.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        //提交
        submit() {
            let discount = this.gradeList.discount;
            let condition_money = this.gradeList.condition_money;
            let number = this.gradeList.condition_num;
                if (!this.gradeList.level_id) {
                    this.$message({
                        duration: 1000,
                        type: 'error',
                        message: '请选择等级'
                    });
                    return false;
                }
                if (!/^[1-9]\d*$/.test(discount)) {
                    this.$message({
                        duration: 1000,
                        type: 'error',
                        message: '折扣错误'
                    });
                    return false;
                }
                if (!/^[1-9]\d*$/.test(condition_money)) {
                    this.$message({
                        duration: 1000,
                        type: 'error',
                        message: '消费金额错误'
                    });
                    return false;
                }
                if (!/^[1-9]\d*$/.test(number)) {
                    this.$message({
                        duration: 1000,
                        type: 'error',
                        message: '笔数错误'
                    });
                    return false;
                }
                var url_ = this.$route.params.id == 'add' ? this.$httpConfig.addStoreMemberLevel : this.$httpConfig.saveStoreMemberLevel;
                this.$route.params.id = this.$route.params.id == 'add' ? 0 : this.$route.params.id;
                this.$HTTP(url_, {
                    id: this.$route.params.id,
                    level_id: this.gradeList.level_id,
                    discount: this.gradeList.discount,
                    condition_money: this.gradeList.condition_money,
                    condition_num: this.gradeList.condition_num,
                }, 'post').then((res) => {
                    this.$message({
                        duration: 1000,
                        type: 'success',
                        message: res.data.message
                    });
                    this.$router.push('memberGrade')
                }).catch((err) => {
                    console.log(err)
                });
        },
        to() {
            this.$router.back();
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
.logistics {
  width: 1000px;
  padding-bottom: 80px;
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
        .discount {
          width: 150px;
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
          margin-top: 50px;
          float: left;
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>