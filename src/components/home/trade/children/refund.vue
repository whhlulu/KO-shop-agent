<template>
    <!-- 退款退货-->
    <div class="tradeManage fl">
        <div class="t_tab">
            <h1 class="t_title">
                <span class="size16">退款/退货管理 - 退款、退货列表</span>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>1.先查看订单再同意/拒绝申请</p>
                </div>
            </div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="Commodity-management line-height5">
                <tr>
                    <td width="7%" align="right">订单编号：</td>
                    <td width="22%">
                        <el-input v-model="order_id" clearable style="width: 200px;height: 40px;">
                        </el-input>
                    </td>
                    <td width="6%" align="right"> 买家帐号： </td>
                    <td width="20%">
                        <el-input v-model="user_id" clearable style="width: 200px;height: 40px;">
                        </el-input>
                    </td>
                    <td width="12%" align="left">
                        <el-button type="success" size="small" @click="search">搜索</el-button>
                    </td>
                </tr>
            </table>
            <div class="order_list">
                <div class="order_minute">
                    <div class="col">
                        <div class="black">商品信息</div>
                        <div class="black">买家</div>
                        <div class="black">退款金额</div>
                        <div class="black">申请时间</div>
                        <div class="black">退款/退货状态</div>
                        <div class="black">操作</div>
                    </div>
                    <div class="order_z" v-for="(item,index) in returnList" :key="index">
                        <div class="order_number">
                            <span class="black order_time">订单号: {{item.order_sn_id}}
                                <!-- &nbsp;&nbsp;成交时间: <time-Plunge :timePlunge="item.over_time"></time-Plunge> -->
                            </span>
                        </div>
                        <ul>
                            <li>
                                <div class="shop">
                                    <div class="shop_name">
                                        <img :src="URL + item.pic_url" alt="" class="shop_img">
                                        <span class="name">
                                            <span>{{item.title}}</span>
                                        </span>
                                    </div>
                                    <div class="fl ping">{{item.user_name}}</div>
                                    <div class="fl ping">{{item.price}}</div>
                                    <div class="fl ping">
                                        <time-Plunge :timePlunge="item.create_time"></time-Plunge>
                                    </div>
                                    <div class="fl ping" v-show="item.status == 0">审核中</div>
                                    <div class="fl ping" v-show="item.status == 1">审核失败</div>
                                    <div class="fl ping" v-show="item.status == 2">审核通过</div>
                                    <div class="fl ping" v-show="item.status == 3">退货中</div>
                                    <div class="fl ping" v-show="item.status == 4">换货中</div>
                                    <div class="fl ping" v-show="item.status == 5">换货完成</div>
                                    <div class="fl ping" v-show="item.status == 6">退货完成</div>
                                    <div class="fl ping" v-show="item.status == 7">已撤销</div>
                                    <div class="fl ping">
                                        <el-button type="success" size="mini" @click="operation(item.id,'t')">同意</el-button>
                                        <el-button type="danger" size="mini" @click="operation(item.id,'j')">拒绝</el-button>
                                        <el-button type="primary" size="mini" @click="see(item)">查看</el-button>
                                        <el-button type="primary" size="mini" @click="refund(item)">退款</el-button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="Paging">
                        <div class="Paging_r">
                            <el-pagination background layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="page_size" :total="page">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import timePlunge from '@/components/page/time';
export default {
    name: 'refund',
    data() {
        return {
            order_id: '',
            refundNum: '',
            user_id: '',
            page: 0, //共多少页
            currentPage: 1, //当前页
            page_size: 0, //每页显示多少条数据
            returnList: {},
        }
    },
    created() {
        this.search();
    },
    methods: {
        //退款
        refund(item) {
            this.$HTTP(this.$httpConfig.setRefundMoney,{id: item.id}).then(res => {
                    this.$message({
                        duration: 1000,
                        type: 'success',
                        message: res.data.message
                    });
            }).catch(err => {
                console.log(err);
            })
        },
        /* 同意 O(∩_∩)O or 拒绝  */
        operation(id, s) {
            let status = s === 't' ? 2 : 1;
            this.$HTTP(this.$httpConfig.setRefundStatus,{
                id: id,
                status: status,
            }).then(res => {
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: res.data.message
                });
                this.search();
            }).catch(err => {
                console.log(err);
            })
        },
        //搜索退款/货订单
        search() {
            this.$HTTP(this.$httpConfig.getRefundList+ '/p/' + this.currentPage,{
                order_id: this.order_id,
                user_id: this.user_id,
            }).then((res) => {
                this.page_size = parseInt(res.data.data.page_size);
                this.page = Number(res.data.data.page * this.page_size);
                if (res.data.data == '') {
                    this.$message({
                        duration: 1000,
                        type: 'error',
                        message: '暂无数据！'
                    });
                    return;
                }
                this.returnList = res.data.data.data;
            }).catch((err) => {
                console.log(err);
            })
        },
        //查看
        see(item) {
            this.$router.push({
                name: 'returnDetails',
                params: {
                    id: item.id
                }
            });
        },
        /*页面跳转*/
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            this.search();
        },
    },
    components: {
        timePlunge
    }
}
</script>
<style lang="less">
.el-button + .el-button {
  margin-left: 3px;
}
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
  }
}
</style>

<style lang="less" scoped>
.tradeManage {
  width: 1042px;
  .bold {
    font-weight: bold;
  }
  .black {
    color: #333;
  }
  .t_tab {
    .order_list {
      .order_minute {
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-top: 1px solid #ddd;
        margin-top: 15px;
        width: 100%;
        overflow: hidden;
        .m_t {
          margin-top: 25px;
          width: 100%;
        }
        .col {
          border: none;
          background-color: #f9fafa;
          overflow: hidden;
          border-bottom: 1px solid #ddd;
          .black {
            color: #333;
            font-size: 12px;
            // text-align: center;
            font-weight: 600;
            float: left;
          }
          .hm {
            line-height: 40px;
          }
        }
        .order_z {
          .order_number {
            background-color: #f9fafa;
            overflow: hidden;
            padding-left: 20px;
            border-bottom: 1px solid #ddd;
            border-top: 1px solid #ddd;
            height: 40px;
            margin-top: 15px;
            .minute_g {
              width: 5%;
              float: left;
              input {
                display: block;
                margin: auto;
                margin-top: 14px;
                width: 20px;
              }
            }

            .order_time {
              display: inline-block;
              height: 100%;
              line-height: 40px;
            }
          }
          ul {
            li {
              .shop {
                width: 100%;
                overflow: hidden;
                background-color: #fff;
                height: 88px;
                border-bottom: 1px solid #ddd;
                .shop_img {
                  width: 58px;
                  height: 58px;
                  border: 1px solid #ddd;
                  float: left;
                  margin-top: 12px;
                  margin-left: 20px;
                }
                .minute_g {
                  width: 5%;
                  float: left;
                  input {
                    display: block;
                    margin: auto;
                    margin-top: 14px;
                    width: 20px;
                  }
                }
                .shop_name {
                  width: 23%;
                  float: left;
                  padding-left: 32px;
                  .name {
                    display: block;
                    float: left;
                    padding-left: 25px;
                    padding-top: 20px;
                    span {
                      width: 150px;
                      overflow: hidden;
                      line-height: 25px;
                      height: 25px;
                    }
                  }
                }
                .ping {
                  width: 11%;
                  // line-height: 88px;
                  padding-top: 30px;
                  text-align: center;
                }
                .ping:last-child {
                  width: 26%;
                }
                .danj {
                  width: 24%;
                  line-height: 88px;
                  text-align: center;
                  span {
                    border: 1px solid #dddddd;
                    color: #666666;
                    width: 40px;
                    line-height: 22px;
                    text-align: center;
                    display: block;
                    border-radius: 4px;
                    float: left;
                    margin-right: 15px;
                    margin-top: 30px;
                    cursor: pointer;
                  }
                  span:nth-child(1) {
                    margin-left: 20px;
                  }
                }
                .caozu {
                  width: 15%;
                  line-height: 88px;
                  text-align: center;
                }
              }
            }
          }
        }
        .Paging {
          width: 100%;
          height: 50px;
          border-bottom: 1px solid #ddd;
          .Paging_r {
            float: right;
            padding: 10px;
          }
        }

        .col div {
          height: 40px;
          text-align: center;
          line-height: 40px;
          width: 11%;
        }
        .col div:nth-child(1) {
          width: 27%;
        }
        .col div:last-child {
          width: 24%;
        }
        .all {
          outline: 0 none;
          vertical-align: middle;
          text-indent: 5px;
          border: 1px solid blue;
          display: block;
          margin: auto;
          margin-top: 14px;
          width: 20px;
          height: 20px;
        }
      }
    }
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
            width: 140px;
            border: 1px solid #ddd;
            line-height: 29px;
            height: 29px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>