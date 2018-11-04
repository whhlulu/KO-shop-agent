<template>
    <!-- 订单管理 -->
    <div class="tradeManage fl">
        <div class="t_tab">
            <h1 class="t_title">
                <span class="size16">套餐订单管理 - 订单列表</span>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>1.切换下方分类的状态，可以查看不同状态的订单</p>
                </div>
            </div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="Commodity-management">
                <tr>
                    <td width="8%" align="right">关键字：</td>
                    <td width="25%">
                        <el-input placeholder="用户账号" v-model="user_id" clearable style="width: 250px;height: 40px;">
                        </el-input>
                    </td>
                    <td width="8%" align="right">订单号：</td>
                    <td width="25%">
                        <el-input placeholder="订单标志" v-model="order_sn_id" clearable style="width: 250px;height: 40px;">
                        </el-input>
                    </td>
                    <td width="4%" align="right">分类：</td>
                    <td width="23%">
                        <el-select v-model="state" @change="selectedStaus" placeholder="请选择">
                            <el-option v-for="(item, index) in $store.state.orderStatus" :key="index" size="small" :label="item" :value="index">
                            </el-option>
                        </el-select>
                    </td>
                    <td width="50%" align="left">
                        <el-button type="success" size="small" @click="search">搜索</el-button>
                    </td>
                </tr>
            </table>
            <div class="order_list">
                <div class="order_minute">
                    <div class="col">
                        <div class="minute_g">
                            <input type="checkbox" v-model="select" @click="selected">
                        </div>
                        <div class="black">宝贝</div>
                        <div class="black">套餐单价</div>
                        <div class="black">套餐数量</div>
                        <div class="black">买家</div>
                        <div class="black">交易状态</div>
                        <div class="black">实收款</div>
                        <div class="black">套餐标题</div>
                        <!-- <div class="black">交易操作</div> -->
                    </div>
                    <div class="order_z" v-for="(item,index) in orderData" :key="index">
                        <div class="order_number">
                            <div class="minute_g">
                                <input type="checkbox" v-model="item.checkbox" @click="radio(index)">
                            </div>
                            <div class="delivery_btn fr">
                                <el-button size="mini" @click="detail(item.id)">查看</el-button>
                            </div>
                            <span class="black order_time">订单号: {{item.order_sn_id}} &nbsp;&nbsp;下单时间: <time-Plunge :timePlunge="item.create_time"></time-Plunge></span>
                        </div>
                        <ul>
                            <li v-for="(value,indexGoods) in goods" :key="indexGoods">
                                <div class="shop" v-if="value.id == item.id">
                                    <div class="shop_name">
                                        <img :src="URL + value.pic_url" alt="" class="shop_img">
                                        <span class="name">
                                            <span>{{value.title}}</span>
                                            <!-- <span>4171</span> -->
                                        </span>
                                    </div>
                                    <div class="fl ping">{{value.package_discount}}</div>
                                    <div class="fl ping">{{value.package_num}}</div>
                                    <!-- <div class="fl ping color">
                                <span class="cursor">
                                    没有这条数据
                                </span>
                            </div> -->
                                    <div :title="value.package_title" class="package-title">
                                        {{value.package_title}}
                                    </div>
                                    <div class="fl ping">{{value.user_name}}</div>
                                    <div class="fl ping">{{$store.state.orderStatus[value.order_status]}}</div>
                                    <div class="fl ping">{{value.package_discount}}</div>
                                    <!-- <div class="fl ping operation">
                                <el-button type="primary" size="mini">同意</el-button>
                            </div> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="Paging">
                        <!-- <div class="Paging_checkbox">
                    <input type="checkbox">
                </div> -->
                        <!-- <div class="fl pil">批量发货</div> -->
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
import { OrderStatus } from '../../../../.././es-2015/order-status';
import returnDetailsVue from './returnDetails.vue';
export default {
    name: 'tradeManage',
    data() {
        return {
            select: false,
            state: '',
            order_sn_id: '',
            user_id: '',
            orderData: {},
            orderStatus: '',
            page: 0, //共多少页
            currentPage: 1, //当前页
            page_size: 0, //每页显示多少条数据
            selectList: [], //单选选中
            goods: [],
        }
    },
    created() {
        (new OrderStatus(this.$store)).orderState();
        this.search();
    },
    //深度监视
    watch: {
        selectList() {
            if (this.selectList.length >= this.orderData.length) {
                this.select = true;
            } else {
                this.select = false;
            }
        }
    },
    methods: {
        detail(id) {
            this.$router.push({
                name: 'combinationOrderDetail',
                params: {
                    id: id
                }
            })
        },
        //全选
        selected() {
            this.select = !this.select;
            if (this.select === true) {
                this.orderData.forEach(ele => {
                    ele.checkbox = true;
                });
            } else {
                this.orderData.forEach(ele => {
                    ele.checkbox = false;
                });
            }
        },
        //单选
        radio(index) {
            this.orderData[index].checkbox = !this.orderData[index].checkbox;
            this.selectList = [];
            if (this.orderData[index].checkbox) {
                this.orderData.forEach(ele => {
                    if (ele.checkbox == true) {
                        this.selectList.push(ele.checkbox);
                    }
                });
            } else {
                this.selectList = [];
            }
            console.log(this.selectList)
        },
        //内容改变时的状态
        selectedStaus() {
        },
        //搜索订单列表
        search() {
            this.$HTTP(this.$httpConfig.getPackageOrderList + '/p/' + this.currentPage, {
                user_id: this.user_id,
                order_status: this.state,
                order_sn_id: this.order_sn_id
            }, 'post').then((res) => {
                this.page_size = parseInt(res.data.data.page_size);
                this.page = parseInt(res.data.data.page);
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: '数据加载完毕！'
                });
                for (let index = 0; index < res.data.data.data.length; index++) {
                    res.data.data.data[index]['checkbox'] = false;
                }
                this.orderData = res.data.data.data;
                this.goods = res.data.data.goods;
            }).catch((res) => {
                this.$message({
                    duration: 1000,
                    type: 'error',
                    message: res.data.message
                });
                this.page_size = 0;
                this.orderData = {};
                this.goods = [];
                this.page = 0;
                return;
                console.log(err);
            })
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

.package-title {
  display: inline-block;
  width: 12%;
  height: 100%;
  line-height: 86px;
  margin-left: 25px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
<style>
body {
  overflow: inherit;
}
.tradeManage {
  width: 1000px !important;
  padding-bottom: 80px;
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
          width: 100%;
          background-color: #f9fafa;
          overflow: hidden;
          border-bottom: 1px solid #ddd;
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
            .delivery_btn {
              padding: 6px 50px 6px 0;
            }

            .order_time {
              display: inline-block;
              height: 100%;
              line-height: 40px;
              p {
                display: inline;
              }
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
                  width: 25%;
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
                  width: 10%;
                  line-height: 88px;
                  text-align: center;
                }
                .operation {
                  padding: 30px 0;
                }
                .color {
                  color: #259d0e;
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
          .Paging_checkbox {
            width: 5%;
            float: left;
            height: 50px;
            input {
              display: block;
              margin: auto;
              margin-top: 20px;
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
          .pil {
            border: 1px solid #dddddd;
            color: #666666;
            margin: 13px 0;
            width: 60px;
            line-height: 22px;
            text-align: center;
            display: block;
            border-radius: 4px;
            background-color: #f7f7f7;
            cursor: pointer;
          }
          .Paging_r {
            float: right;
            padding: 10px;
          }
        }

        .col div {
          height: 40px;
          line-height: 40px;
          width: 10%;
        }
        .col div:nth-child(1) {
          width: 5%;
        }
        .col div:nth-child(2) {
          width: 25%;
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
          .search {
            width: 58px;
            height: 32px;
            line-height: 32px;
            background-color: #f7bc0a;
            color: #fff;
            text-align: center;
            display: block;
            border-radius: 6px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>