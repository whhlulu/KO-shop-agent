<template>
    <!-- 会员 - 会员列表-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">会员列表</span>
                <!-- <div class="t_add fr" @click="tolink">添加会员</div> -->
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>在店铺交易成功的会员</p>
                    <p>交易笔数，统计的是交易成功的订单数量</p>
                </div>
            </div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list search">
                <tr>
                    <td bgcolor="#f9fafa" width="30%" class="black bold" align="center">
                        <span>会员名称 ：</span>
                        <el-input v-model="menberName" clearable style="width: 180px;height: 40px;">
                        </el-input>
                    </td>
                    <td bgcolor="#f9fafa" class="black bold" align="left">
                        <el-button @click="search" size="small" type="success">搜索</el-button>
                    </td>
                </tr>
            </table>
            <h1 class="t_title">
                <span class="size16">会员列表</span>
                <i>（ 共 {{listData.length}} 条记录 ）</i>
            </h1>
            <el-table ref="multipleTable" :data="listData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="ID" prop="id" width="55">
                </el-table-column>
                <el-table-column prop="user_name" label="会员信息" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="member_id" label="会员等级" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="total_transaction" label="交易总额">
                </el-table-column>
                <el-table-column prop="transaction_number" label="交易笔数" width="100">
                </el-table-column>
                <el-table-column prop="transaction_number" label="平均交易额">
                </el-table-column>
                <el-table-column label="上次交易时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <time-Plunge :timePlunge="scope.row.last_time"></time-Plunge>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <!-- <el-button type="danger" style="float:left; margin-left:50px;" @click="deleteAll" size="mini">删除</el-button> -->
                <el-pagination style="float:right;" background layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="page_size" :total="page">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import timePlunge from '@/components/page/time';
export default {
    name: 'memberGrade',
    data() {
        return {
            menberName: '',
            listData: [],
            page: 0, //共多少页
            currentPage: 1, //当前页
            page_size: 10,//每页显示多少条数据
        }
    },
    created() {
        
        this.search();
    },
    methods: {
        tolink() {
            this.$router.push({
                name: 'addMember',
                // params: {
                //     status: 0
                // }
            });
        },
        search() {
            
            this.$HTTP(this.$httpConfig.getStoreMemberList,{member_id: this.menberName}).then((res) => {
                this.listData = [];
                if (res.data.data.data) {
                    let data = res.data.data.data;
                    for (let key in data) {
                        this.listData.push(data[key])
                    }
                }                
                this.page_size = res.data.data.page_size;
                this.page = Number(res.data.data.page);
            }).catch((err) => {
                console.log(err);
            })
        },
        del(id){
        },
        handleSelectionChange() {
        },
        /*页面跳转*/
        handleCurrentChange: function (currentPage) {
            // console.log(currentPage);
            this.currentPage = currentPage;
        },
    },
    components: {
        timePlunge
    }
}
</script>
<style lang="less">
body {
  overflow: inherit;
}
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
  padding-bottom: 80px;
  .g_att {
    .t_add {
      background: url(../../../../assets/plus2.jpg) no-repeat 28px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 48px;
    }
    .page {
      overflow: hidden;
      padding-top: 20px;
    }
    .list {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-top: 15px;
      tr {
        td {
          padding: 15px 0;
          border-bottom: 1px solid #ddd;
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
        margin-right: 10px;
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
