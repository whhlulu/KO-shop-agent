<template>
    <div class="page">
        <div class="print-content">
            <div @click="print" class="print-box">
                <div class="print-btn">
                    <img src="../../../../assets/print-btn.png" alt="" srcset="">
                    <span>打印</span>
                </div>
            </div>
            <div class="content-box">
                <div class="content">
                    <header class="title">发货清单</header>
                    <div class="store-info">
                        <img :src="URL+store.store_logo" alt="">
                        <ul class="info">
                            <li>店铺名称：{{store.shop_name}}</li>
                            <li>店铺联系电话： {{store.mobile}}</li>
                        </ul>
                    </div>
                    <ul class="order-info">
                        <li>订单编号： {{order_data.order_sn_id}}</li>
                        <li>订购时间： {{order_data.create_time|formatDate}}</li>
                        <li>付款时间： {{order_data.pay_time|formatDate}}</li>
                        <li>买家用户名：{{order_data.user_name}}</li>
                        <li>收货人姓名： {{address.realname}}</li>
                        <li>收货人电话： {{address.mobile}}</li>
                        <li>下单会员手机号： {{order_data.mobile}}</li>
                        <li>支付方式： {{order_data.pay_type}}</li>
                        <li class="full-line">收货地址： {{address.prov}}-{{address.city}}-{{address.dist}} {{address.address}}</li>
                        <li>发货单号： {{order_data.express_id}}</li>
                        <li>发票类型： 普通发票</li>
                        <li>发票内容： 发票内容</li>
                        <li>发票抬头： 发票抬头</li>
                    </ul>
                    <table class="table" style="border-color: #000; color: #000;">
                        <tr>
                            <th>编号</th>
                            <th>商品名称</th>
                            <th>数量</th>
                            <th>单价</th>
                            <th>小计</th>
                        </tr>
                        <tr v-for="(item,index) in goods" :key="index">
                            <td>{{item.goods_id}}</td>
                            <td>{{item.title}}</td>
                            <td>{{item.goods_num}}</td>
                            <td>￥{{item.goods_price}}</td>
                            <td>￥{{item.goods_num*item.goods_price | keepTwoNum}}</td>
                        </tr>
                        <tr>
                            <td colspan="5">
                                <div class="sum">
                                    <span>商品总数量：{{goods.length}}</span>
                                    <span>商品总金额：￥{{order_data.price_sum}}</span>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="price-info">
                        <p>商品总金额：￥{{order_data.price_sum}} + 运费：￥{{order_data.shipping_monery}} - 优惠：￥{{order_data.coupon_deductible}} = <span class="strong">订单总金额：￥{{parseFloat(order_data.price_sum)+parseFloat(order_data.shipping_monery)-parseFloat(order_data.coupon_deductible)}}</span></p>
                    </div>
                    <div class="other-info">
                        <!-- <p>店铺发货地址： 河北省-秦皇岛市-海港区鲜农乐食品专营店</p> -->
                        <p>买家备注： {{order_data.remarks}}</p>
                        <p>打印时间： {{now_time | formatDate}}</p>
                    </div>
                    <div class="remarks">
                        <textarea placeholder="请输入备注信息" rows="3"></textarea>
                    </div>
                    <div class="check">
                        <p>审核签字：</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'print',
    data() {
        return {
            id: 0,
            order_data: '',
            goods: '',
            address: '',
            now_time: '',//打印时间（即此刻）
            store: {}
        }
    },
    created() {
    },
    mounted() {
        this.id = this.$route.params.order_id;
        this.getOrderDetail();
        this.now_time = new Date().getTime() / 1000;
        this.getStoreInfo();
    },
    methods: {
        getOrderDetail() {
            this.$HTTP(this.$httpConfig.getOrderDetail, { id: this.$route.params.order_id }).then((res) => {
                this.order_data = res.data.data.order;
                this.goods = res.data.data.goods;
                this.address = res.data.data.receive;
            }).catch((res) => {
                this.$message.error(res.data.message);
            });
        },
        getStoreInfo() {
            this.$HTTP(this.$httpConfig.getOrderStoreInfo, {}).then((res) => {
                this.store = res.data.data;
            }).catch((res) => {
                this.$message.error(res.data.message);
            });
        },
        print() {
            window.print();
        }
    }
}
</script>

<style type="text/css">
@media print {
  .print-box {
    display: none;
  }
}
</style>
<style lang="less">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body {
  overflow: scroll;
  .page {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .print-content {
      width: 1000px;
      height: auto;
      min-height: 373.5mm;
      margin: 0 auto;
      div.print-box {
        width: 1000px;
        height: 50px;
        position: relative;
        cursor: pointer;
        .print-btn {
          margin: 0 auto;
          background: #fff;
          border: solid 1px #ccc;
          // position: absolute;
          z-index: 3;
          top: 0;
          right: 0;
          line-height: 32px;
          padding: 5px 10px;
          border-radius: 5px;
          box-shadow: 2px 2px 0 rgba(153, 153, 153, 0.2);
          cursor: pointer;
          width: 115px;
          img {
            vertical-align: middle;
            display: inline-block;
            width: 32px;
            height: 32px;
            margin-right: 5px;
          }
          span {
            font-size: 20px;
            color: #555;
            font-weight: 600;
            letter-spacing: 0px;
          }
        }
      }

      .content-box {
        width: 1000px;
        height: auto;
        min-height: 373.5mm;
        background-color: #fafafa;
        border: 1px solid #ddd;
        margin: 0 auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        .content {
          width: 960px;
          height: auto;
          min-height: 373.5mm;
          background-color: #fff;
          border: 1px dashed #ddd;
          padding: 30px;
          color: #000;
          .title {
            width: 300px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            margin: 0 auto;
            font-weight: 700;
            font-size: 25px;
          }
          .store-info {
            width: 100%;
            height: 60px;
            margin: 20px 0;
            display: flex;
            flex-direction: row;
            img {
              width: 120px;
              height: 60px;
              border: 1px solid #ddd;
            }
            .info {
              margin: 0 0 0 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
            }
          }
          .order-info {
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            margin-bottom: 20px;
            li {
              width: 33.3%;
              margin: 5px 0;
            }
            li.full-line {
              width: 100%;
            }
            li.two-line {
              width: 66.6%;
            }
          }
          .table {
            border-color: #000;
            color: #000;
            background: #fff none repeat scroll 0% 0%;
            font-size: 12px;
            border: 1px solid #ddd;
            tr {
              font-family: 微软雅黑;
              font-size: 12px;
              th {
                background: rgb(255, 255, 255);
                padding: 7px;
                border-color: rgb(0, 0, 0);
                border-right-width: 1px;
                border-right-style: solid;
                font-weight: 200;
              }
              td {
                padding: 7px;
                border-color: rgb(0, 0, 0);
                border-top-width: 1px;
                border-top-style: solid;
                border-right-width: 1px;
                border-right-style: solid;
                .sum {
                  display: flex;
                  flex-direction: row;
                  justify-content: flex-end;
                  span {
                    margin: 0 7px;
                  }
                }
              }
            }
          }
          .price-info {
            margin: 10px 0;
            p {
              text-align: end;
              margin: 7px 0;
              .strong {
                font-weight: bold;
              }
              .red {
                color: #c00;
              }
            }
          }
          .other-info {
            p {
              margin: 7px 0;
            }
          }
          .remarks {
            margin: 20px 0;
            textarea {
              width: 100%;
              height: auto;
              resize: none;
              font-family: 微软雅黑;
              font-size: 12px;
              min-height: 32px;
              min-width: 280px;
            }
          }
          .check {
            height: 100px;
          }
        }
      }
    }
  }
}
</style>
