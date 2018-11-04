<template>
    <div class="deliver-goods">
        <!-- 立即发货 -->
        <div class="t_tab">
            <h1 class="t_title">
                <span class="size16">发货单管理 - 发货单-发货</span>
                <div class="t_m fr" @click="to">返回发货单列表</div>
            </h1>
            <div class="order_details">
                <div class="step-title">确认收货信息及交易详情</div>
                <table class="table-bordered"  width="100%" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr class="order-h">
                            <th colspan="20">
                                <div class="order-info">
                                    <span class="order-num">订单编号：{{order_data.order_sn_id}}</span>
                                    <span class="order-time">下单时间：{{new Date(order_data.create_time * 1000).getFullYear()+'-'+(new Date(order_data.create_time * 1000).getMonth()+1)+'-'+new Date(order_data.create_time * 1000).getDate()+' '+new Date(order_data.create_time * 1000).getHours()+':'+new Date(order_data.create_time * 1000).getMinutes()+':'+new Date(order_data.create_time * 1000).getSeconds()}}</span>
                                    <span class="order-source">订单来源：{{order_source[order_data.platform]}}</span>    
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="order-item"  v-for="(item,index) in order_data.goods" :key="index">
                            <td>
                               <div class="img-info fl">
                                   <img :src="URL + item.pic_url" alt=""></div> 
                               <div class="g-text-info fl">
                                   <div class="g-name">{{item.title}}</div>
                                   <div class="g-num">
                                       <span>{{item.goods_price}} x {{item.goods_num}}</span>
                                   </div>
                               </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="buyer-address">
                    <div class="address-info fl">
                        <p>
                            <strong>买家收货信息：</strong>
                            <span>{{address.prov_name+"-"+address.city_name+"-"+address.dist_name}} {{address.address}}，{{address.realname}}，{{address.mobile}}</span>
                        </p>
                    </div>
                </div>
            </div>
            <table width="100%" cellspacing="0" cellpadding="0" class="logistics_x" >
                <tr>
                    <td width="9%" align="right" class="black"><b>*</b>物流公司名称： </td>
                    <td>
                        <el-select v-model="express_id" placeholder="请选择" style="width: 250px;height: 40px;">
                            <el-option
                            v-for="item in typeList"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td align="right" class="black"><b>*</b>运单号码： </td>
                    <td>
                        <el-input 
                            v-model="order_number"
                            clearable 
                            style="width: 250px;height: 40px;" 
                            >
                        </el-input>
                    </td>
                </tr>
                <tr>
                    <td align="right">&nbsp;</td>
                    <td colspan="2"> <el-button type="success"  size="medium" style="width:199px;" @click="delivery">立即发货</el-button></td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name:'delivery',
    data () {
        return {
            express_id:'',
            typeList:[],
            order_data:{},
            order_source:['PC端','APP端','WAP端'],
            order_number:'',
            address:{}
        }
    },
    created(){
        this.getOrderData();
        this.getExpressList();
    },
    methods:{
        //获取快递列表
        getExpressList(){
            this.$HTTP(this.$httpConfig.getExpressOpened,{}).then((res) => {
                this.typeList = res.data.data;
            }).catch((res) => {
                this.$message.error(res.data.message);
            });
        },
        //获取订单详情
        getOrderData(){
            this.$HTTP(this.$httpConfig.getOrderDetail,{id: this.$route.params.order_id}).then((res) => {
                this.order_data = res.data.data;
                this.address = res.data.data.address;
                console.log(res)
            }).catch((res) => {
                this.$message.error(res.data.message);
            });
        },
        to(){
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
    .deliver-goods{
        width: 1042px;
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
                        background: url(../../../../assets/return.jpg) no-repeat 10px #ff9f24;
                        width: 135px;
                        height: 32px;
                        border: 1px solid #ff920b;
                        border-radius: 4px;
                        font-size: 12px;
                        font-weight: normal;
                        cursor: pointer;
                        color: #FFF;
                        line-height: 32px;
                        text-indent: 32px;
                    }
            }
            .order_details{
                padding-bottom:20px; 
                .step-title{
                    margin: 12px 0px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #555;
                }
                .table-bordered{
                    height:auto;
                    border:1px solid #eee;
                    border-bottom:none; 
                    border-right: none;
                    .order-h{
                        th{
                            line-height: 18px;
                            padding: 7px 0px;
                            font-size: 12px;
                            color: #333;
                            border:none;
                            border-right: 1px solid #eee;
                            border-bottom: 1px solid #eee;
                            .order-info{
                                float: left;
                                span {
                                    display: inline-block;
                                    margin-right: 10px;
                                    height: 18px;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    vertical-align: middle;
                                    max-width: 250px;
                                }
                                .order-num{
                                    margin-left: 10px
                                }
                                .order-time{
                                    p{
                                        display: inline;
                                    }
                                }
                            }
                        }
                    }
                    tbody{
                        tr{
                            td{
                                border:none ;
                                border-right: 1px solid #eee;
                                padding: 10px 4px; 
                                .img-info{
                                    margin-right: 10px;
                                    img{
                                       width: 60px;
                                        height: 60px; 
                                    }
                                    
                                }
                                .g-text-info{
                                    text-align: left;
                                    line-height: 18px;
                                    display: inline;
                                    width: 50%;
                                    padding-bottom: 2px;
                                }
                            }
                        }
                    }
                }
                .buyer-address{
                    border: 1px solid #eee;
                    padding: 8px;
                    line-height: 20px;
                    overflow: hidden;
                    .address-info {
                        p{
                            strong {
                                font-weight: 700;
                                color: #666;
                            }
                        }
                    }
                }
            }
            .logistics_x {
                tr {
                    td {
                        padding: 10px 0;
                        b{
                            color: #ff0000;
                        }
                        .notes {
                            padding-left:15px;
                        }
                    }
                }
            }
        }
    }
</style>

