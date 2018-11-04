<template>
    <div class="deliver-goods">
        <!-- 立即发货 -->
        <div class="t_tab">
            <h1 class="t_title">
                <span class="size16">发货单管理 - 发货单详情</span>
                <div class="t_m fr" @click="to">返回发货单列表</div>
            </h1>
            <div class="center">
                <div class="center-top">
                    <div class="left">
                        <div class="status">当前订单状态</div>
                        <div class="detail">
                            <div class="button">
                                <el-button size="small" type="success">{{$store.state.orderStatus[order_data.order_status]}}</el-button>
                            </div>
                            <ul class="info">
                                <li>1.买家已付款，请尽快发货，否则买家有权申请退款。</li>
                                <li>2.如果无法发货，请及时与买家联系并说明情况。</li>
                                <li>3.买家申请退款后，卖家须征得买家同意后再操作发货，否则买家有权拒收货物。</li>
                            </ul>
                        </div>
                    </div>
                    <div class="right">
                        <ul class="info">
                            <li>
                                <span class="left">订单编号：</span>
                                <span class="right">{{order_data.order_sn_id}}</span>
                            </li>
                            <li>
                                <span class="left">下单时间：</span>
                                <span class="right">{{order_data.create_time | formatDate}}</span>
                            </li>
                            <li>
                                <span class="left">付款时间：</span>
                                <span class="right">{{order_data.pay_time | formatDate}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul class="center-bottom">
                    <li class="center-info">
                        <div class="title">订单信息</div>
                        <ul>
                            <li>
                                <span class="left">收 货 人：</span>
                                <span class="right">{{address.realname}}，{{address.mobile}}， {{address.prov}}-{{address.city}}-{{address.dist}} {{address.address}}</span>
                            </li>
                            <li>
                                <span class="left">支付方式：</span>
                                <span class="right">{{order_data.pay_type}}</span>
                            </li>
                            <li>
                                <span class="left">配送时间：</span>
                                <span class="right">--</span>
                            </li>
                             <li>
                                <span class="left">运费：</span>
                                <span class="right">{{order_data.shipping_monery}}</span>
                            </li>
                            <li>
                                <span class="left">配送方式：</span>
                                <span class="right" v-if="order_data.exp_id">{{order_data.exp_id}}</span>
                                <span class="right" v-else>未配送</span>
                            </li>
                        </ul>
                    </li>
                    <li class="center-info">
                        <div class="title">订单信息</div>
                        <ul>
                            <li>
                                <span class="left">买家留言：</span>
                                <span class="right">{{order_data.remarks}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <el-table :data="goods" border style="width: 100%" class="order-details">
                <el-table-column label="商品图片" width="85">
                    <template slot-scope="scope">
                        <img class="goods-img" :src="URL+scope.row.pic_url" :alt="scope.row.title">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="商品名称" width="400" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="goods_num" label="发货数量">
                </el-table-column>
                <el-table-column prop="goods_price" label="价格">
                </el-table-column>
            </el-table>
            <table width="100%" cellspacing="0" cellpadding="0" class="logistics_x" v-if="order_data.order_status == 1">
                <tr>
                    <td width="9%" align="right" class="black">
                        <b>*</b>物流公司名称： </td>
                    <td>
                        <el-select v-model="express_id" placeholder="请选择" style="width: 250px;height: 40px;">
                            <el-option v-for="item in typeList" :key="item.name" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="black">
                        <b>*</b>运单号码： </td>
                    <td>
                        <el-input v-model="order_number" clearable style="width: 250px;height: 40px;">
                        </el-input>
                    </td>
                </tr>
                <tr>
                    <td align="right">&nbsp;</td>
                    <td colspan="2">
                        <el-button type="success" size="medium" style="width:199px;" @click="delivery">立即发货</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import returnDetailsVue from './returnDetails.vue';
import {OrderStatus} from '../../../../.././es-2015/order-status';
export default {
    name: 'combinationOrderDetail',
    data() {
        return {
            express_id: '',
            typeList: [],
            order_data: {},
            order_source: ['PC端', 'APP端', 'WAP端'],
            order_number: '',
            address: {},
            goods:[],
        }
    },
    created() {
        this.getOrderData();
      
        (new OrderStatus(this.$store)).orderState();
    },
    methods: {
        //获取快递列表
        getExpressList() {
            this.$HTTP(this.$httpConfig.getExpressOpened,{}).then((res) => {
                this.typeList = res.data.data;
            }).catch((res) => {
                this.$message.error(res.data.message);
            });
        },
        //获取订单详情
        getOrderData() {
            this.$HTTP(this.$httpConfig.getOrderPackageDetail,{id: this.$route.params.order_id}).then((res) => {
                this.order_data = res.data.data.order;
                this.goods = res.data.data.goods;
                this.address = res.data.data.receive;
                if (this.order_data.order_status ==1 ) {
                    this.getExpressList();
                }
            }).catch((res) => {
                this.$message.error(res.data.message);
            });
        },
        to() {
            this.$router.back();
        },
        delivery(){
            if(!this.express_id){
                this.$message({
                    duration:1000,
                    type:'error',
                    message: '选择物流公司'
                });
                return;
            };
            if(!/^\d+$/.test(this.order_number)){
                this.$message({
                    duration:1000,
                    type:'error',
                    message: '请输入正确的运单号码'
                });
                return;
            }
            
            this.$HTTP(this.$httpConfig.setOrderSendGoods,{
                id:this.order_data.id,
                exp_id:this.express_id,
                express_id: this.order_number
            }).then((res) => {
                this.$message({
                    duration:1000,
                    type:'success',
                    message: res.data.message
                });
            }).catch((res) => {
                this.$message.error(res.data.message);
            });
        }
    }
}
</script>
<style lang="less" scoped>
.deliver-goods {
  width: 1042px;
  .t_tab {
    margin-bottom: 80px;
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
        background: url(../../../../assets/return.jpg) no-repeat 10px #ff9f24;
        width: 135px;
        height: 32px;
        border: 1px solid #ff920b;
        border-radius: 4px;
        font-size: 12px;
        font-weight: normal;
        cursor: pointer;
        color: #fff;
        line-height: 32px;
        text-indent: 32px;
      }
    }
    .center {
      border: 1px solid #eee;
      box-sizing: border-box;
      .center-top {
        display: flex;
        flex-direction: row;
        .left {
          display: flex;
          flex-direction: column;
          border-right: 1px solid #eee;
          padding: 20px;
          width: 70%;
          .status {
            padding: 0 0 15px 0;
            font-size: 15px;
            font-weight: bold;
            border-bottom: 1px dotted #eee;
            color: #333;
          }
          .detail {
            .button {
              padding: 25px;
            }
            .info {
              padding-left: 25px;
              li {
                display: flex;
                flex-direction: row;
                padding-bottom: 5px;
                color: #333;
              }
            }
          }
        }
        .right {
          width: 30%;
          .store {
            color: #666;
            padding: 10px;
            border-bottom: 1px dotted #eee;
            font-size: 15px;
            font-weight: bold;
          }
          .info {
            padding: 20px;
            li {
              padding-top: 10px;
              display: flex;
              flex-direction: row;
              span.left {
                color: #888;
                width: 30%;
                padding: 0;
                border: none;
              }
              span.right {
                color: #666;
                width: 70%;
                padding: 0;
              }
            }
          }
        }
      }
      ul.center-bottom {
        li.center-info {
          .title {
            background-color: #fafafa;
            padding: 10px;
            border: 1px solid #eee;
            border-left: none;
            border-right: none;
          }
          ul {
            padding: 20px;
            li {
              padding-left: 30px;
              padding-bottom: 10px;
              span.left {
                width: 50px;

                color: #888;
              }
              span.right {
                color: #666;
                padding-left: 10px;
              }
            }
          }
        }
      }
    }
    .order-details {
      margin-top: 20px;
      .goods-img {
        width: 60px;
        height: 60px;
      }
    }
    .logistics_x {
      padding-bottom: 80px;
      tr {
        td {
          padding: 10px 0;
          b {
            color: #ff0000;
          }
          .notes {
            padding-left: 15px;
          }
        }
      }
    }
  }
}
</style>