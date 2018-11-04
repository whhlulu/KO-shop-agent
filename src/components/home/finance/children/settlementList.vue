<template>
    <!-- 账号管理-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">结算管理 - 列表</span>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>每个商家都有自己的结算周期，每个结算周期都会生成一个结算账单，周期内所有订单出账后，金额会自动打款到店铺的会员账户余额中，店铺可二次消费或者提现</p>
                    <p>账单计算公式：平台应结金额 = 付款金额( 不含运费 )+ 平台承担活动 + 运费 - 平台佣金 - 站点佣金；(如发现金额计算不准，是因为存在货到付款情况，请以本期应结金额为准)</p>
                    <p>付款金额：商品总金额 - 店铺红包 - 店铺优惠 - 平台红包</p>
                    <p>订单处理流程：系统自动出账 > 系统自动打款到商家的会员账户余额中，共2个环节</p>
                    <p>账单出账时间：当周期内的所有订单都已经确认收货，并不在发生退款退货时，即可出账，例如：订单在1号确认收货，商城设置 "申请售后期限" 为7天，那么此笔账单会在8号出账</p>
                    <p>平台承担贷款：是指由平台发起的活动所产生的金额。此金额是由平台承担，；例如：平台方红包</p>
                </div>
            </div>
            <div class="info">s-h-o-p-s-n</div>
            <el-table ref="multipleTable" :data="settleList" tooltip-effect="dark" style="width: 100%">
                <el-table-column label="编码" prop="stment_sn" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="开始时间" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <time-Plunge :timePlunge="scope.row.start_time"></time-Plunge>
                    </template>
                </el-table-column>
                <el-table-column label="结束时间" width="120" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <time-Plunge :timePlunge="scope.row.end_time"></time-Plunge>
                    </template>
                </el-table-column>
                <el-table-column label="订单总价" prop="order_price">
                </el-table-column>
                <el-table-column label="备注" prop="pay_remarks" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="平台抽成" prop="platform_percentage">
                </el-table-column>
                <el-table-column label="总运费" prop="total_shipping">
                </el-table-column>
                <el-table-column label="付款时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <time-Plunge :timePlunge="scope.row.pay_time"></time-Plunge>
                    </template>
                </el-table-column>
                <el-table-column label="订单状态">
                    <template slot-scope="scope">
                        <span>{{accounts_status[scope.row.status]}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <!--弹出详情信息-->
                        <el-popover placement="top-start" width="100%" trigger="click">
                            <el-table :data="gridData" border>
                                <el-table-column width="100" property="id" label="ID"></el-table-column>
                                <el-table-column width="150" label="创建时间">
                                    <template slot-scope="scope">
                                        <time-Plunge :timePlunge="scope.row.create_time"></time-Plunge>
                                    </template>
                                </el-table-column>
                                <el-table-column width="200" property="order_sn_id" label="订单号"></el-table-column>
                                <el-table-column width="150" property="user_name" label="用户名"></el-table-column>
                                <el-table-column width="150" property="mobile" label="手机号"></el-table-column>
                                <el-table-column width="150" property="price_sum" label="总价"></el-table-column>
                                <el-table-column label="订单状态">
                                    <template slot-scope="scope">
                                        <span>{{accounts_status[scope.row.order_status]}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button @click="goodsDetail(scope.row.id)" size="mini" slot="reference">查看</el-button>
                        </el-popover>
                        <el-button size="mini" @click.native="confirm(scope.row.id,scope.row.status)" type="success">确认</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination style="float:right;" background layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="page_size" :total="page">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import timePlunge from '@/components/page/time';
export default {
    name: 'servicemanage',
    data() {
        return {
            gridData: [],
            accounts_status: '',
            settleList: [],
            page_size: 0, //每页显示几个
            page: 0, //总页数
            currentPage: 0 //当前页
        }
    },
    created() {
        
        this.getData();
    },
    methods: {
        /*页面跳转*/
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            this.getData();
        },
        getData() {
            //结算列表
            this.$HTTP(this.$httpConfig.getSettlementList,{page: 1}).then((res) => {
                this.accounts_status = res.data.data.status;
                this.page_size = res.data.data.settle.data.page_size;
                this.page = Number(res.data.data.settle.page * res.data.data.settle.page_size);
                let dataList = res.data.data.settle.data;
                for (let key in dataList) {
                    this.settleList.push(dataList[key]);
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        /* 确认 */
        confirm(id, status) {
            this.$HTTP(this.$httpConfig.setSettlement,{
                id: id,
                status: status
            }).then((res) => {
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: res.data.message
                });
            }).catch((err) => {
                console.log(err);
            })
        },
        //查看
        goodsDetail(goods_id) {
            this.$HTTP(this.$httpConfig.getSettlementOrderList,{id: goods_id}).then((res) => {
                let url = res.data.data.ajaxURL;
                this.gridData = [];
                let dataList = res.data.data.data;
                for (let key in dataList) {
                    this.gridData.push(dataList[key]);
                }
            }).catch((err) => {
                console.log(err)
            });
        }
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
  }
}
</style>
<style lang="less" scoped>
.classify {
  width: 1000px;
  padding-bottom: 80px;
  .g_att {
    .page {
      overflow: hidden;
      padding-top: 20px;
    }
    .info {
      display: none;
    }
  }
}
</style>
