<template>
    <!-- 发货单列表 -->
    <div class="tradeManage fl">
        <div class="t_tab">
            <h1 class="t_title">
                <span class="size16">发货单管理 - 发货单列表</span>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>1.卖家对订单进行发货，在发货页面，点击确认发货后，发货单状态则变为"已发货"。 如果卖家对订单进行发货，在发货页面，未点击确认发货，将发货页面关闭，此时也会生成发货单，发货单的状态是"待发货"， 待发货状态的发货单，卖家可以进行取消发货单和继续发货操作。取消发货单，则发货单被删除
                    </p>
                </div>
            </div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="Commodity-management">
                <tr>
                    <!-- <td width="16%" align="right">
                <select name="select">
            <option> 买家帐号/买家姓名</option>
            </select>
            </td> -->
                    <td width="10%" align="right">请输入关键字：</td>
                    <td width="28%" align="center">
                        <el-input placeholder="商品名称/订单编号/买家帐号" v-model="title" clearable style="width: 250px;height: 40px;">
                        </el-input>
                    </td>
                    <td width="8%" align="right">发货单状态：</td>
                    <td width="23%">
                        <el-select v-model="state" @change="selectedStaus" placeholder="请选择">
                            <el-option v-for="item in invoice_status" :key="item.id" size="small" :label="item.status" :value="item.id">
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
                            <!-- <input type="checkbox" v-model="select"  @click="selected"> -->
                        </div>
                        <div class="black">商品</div>
                        <div class="black">单价</div>
                        <div class="black">数量</div>
                        <div class="black">买家</div>
                        <div class="black">发货单状态</div>
                        <div class="black">交易操作</div>
                    </div>
                    <div class="order_z" v-for="(item,index) in orderData" :key="index">
                        <div class="order_number">
                            <span class="black order_time">订单号: {{item.order_sn_id}} &nbsp;&nbsp;下单时间:
                                <time-Plunge :timePlunge="parseInt(item.create_time)"></time-Plunge>
                            </span>
                            <div class="delivery_btn fr">
                                <el-button size="mini" @click.native="print(item.id)">打印发货单</el-button>
                            </div>
                            <div class="fl ping">{{order_status[Number(item.order_status)+1]}}</div>
                        </div>
                        <ul>
                            <li v-for="values in goods" :key="values.id">
                                <div class="shop" v-if="values.id == item.id">
                                    <div class="shop_name">
                                        <img :src="URL + values.pic_url" alt="" class="shop_img">
                                        <span class="name">
                                            <span class="text2-hidden">{{values.title}}</span>
                                            <!-- <span>4171</span> -->
                                        </span>
                                    </div>
                                    <div class="fl ping">{{values.price_sum}}</div>
                                    <div class="fl ping">{{values.goods_num}}</div>
                                    <div class="fl ping">{{values.user_name}}</div>
                                    <div class="fl ping">{{$store.state.orderStatus[goods.status]}}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="Paging">
                        <div class="Paging_checkbox">
                            <!-- <input type="checkbox" v-model="select" @click="selected"> -->
                        </div>
                        <!-- <div class="fl pil"><el-button @click.native="delivery(0)" type="primary" size="mini">批量发货</el-button></div> -->
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
export default {
    name: 'Invoice',
    data() {
        return {
            order_status: ['取消订单', '未支付', '已支付', '发货中', '已发货', '已收货', '退货审核中', '审核失败', '审核成功', '退款中', '退款成功'],
            title: '',
            state: '',
            select: false,
            page: 0, //共多少页
            currentPage: 1, //当前页
            page_size: 0, //每页显示多少条数据
            orderData: '',
            selectList: [], //单选选中
            goods: [],
            invoice_status: [
                {
                    status: '未发货',
                    id: 2
                },
                {
                    status: '已发货',
                    id: 3
                }
            ]
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
        //全选
        selected() {
            this.select = !this.select;
            if (this.select === true) {
                this.selectList = [];
                this.orderData.forEach(ele => {
                    ele.checkbox = true;
                    this.selectList.push(ele.order_id);
                });
            } else {
                this.orderData.forEach(ele => {
                    ele.checkbox = false;
                    this.selectList = [];
                });
            }
        },
        //单选
        radio(index) {
            this.orderData[index].checkbox = !this.orderData[index].checkbox;
            if (this.orderData[index].checkbox) {
                this.selectList = [];
                this.orderData.forEach(ele => {
                    if (ele.checkbox == true) {
                        this.selectList.push(ele.order_id);
                    }
                });
            } else {
                this.selectList.forEach((e, i) => {
                    if (this.orderData[index].order_id == e) {
                        this.selectList.splice(i, 1);
                    }
                })
            }
        },
        //立即发货
        delivery(id) {
            this.$router.push({
                name: 'orderDelivery',
                params: {
                    order_id: id
                }
            })
        },
        // 打印发货单
        print(id) {
            window.open(window.location.origin+'#/print/'+id);
            // this.$router.push({
            //     name: 'print',
            //     params: {
            //         order_id: id
            //     }
            // })
        },
        //搜索发货单
        search() {
            this.$HTTP(this.$httpConfig.getOrderInvoiceList+ '/p/'+ this.currentPage,{
                keyword: this.title,
                order_status: this.state,
            }).then((res) => {
                // console.log(res);
                this.page_size = parseInt(res.data.data.page_size);
                this.page = parseInt(res.data.data.page);
                if (res.data.data.data == '') {
                    this.$message({
                        duration: 1000,
                        type: 'error',
                        message: '暂无数据！'
                    });
                    this.orderData = [];
                    return;
                }
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: '数据加载完毕！'
                });
                for (let index = 0; index < res.data.data.data.length; index++) {
                    res.data.data.data[index]['checkbox'] = false;
                    res.data.data.data[index].expressId = '';
                }
                this.orderData = res.data.data.data;
                this.goods = res.data.data.goods;
            }).catch((err) => {
                console.log(err);
            })
        },
        /*页面跳转*/
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            this.search();
        },
        //内容改变时的状态
        selectedStaus() {
            // console.log(this.state)
        },
    },
    components: {
        timePlunge
    }
}
</script>
<style lang="less">
.express-id .el-input__inner {
  height: 30px !important;
  line-height: 30px !important;
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
.shop_name {
  width: 25% !important;
  float: left;
  padding-left: 32px;
  .name {
    display: block;
    float: left;
    padding-left: 25px;
    padding-top: 20px;
    span {
      width: 140px !important;
      line-height: 22px !important;
      height: 44px !important;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
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
            position: relative;
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

            .order_time {
              padding-left: 20px;
              display: inline-block;
              height: 100%;
              line-height: 40px;
              p {
                display: inline;
              }
            }
            .delivery_btn {
              padding: 6px 50px 6px 0;
            }
            .ping {
              position: absolute;
              top: 0;
              right: 160px;
              width: 145px;
              text-align: center;
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

                .ping {
                  width: 14%;
                  line-height: 88px;
                  text-align: center;
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
          width: 14%;
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