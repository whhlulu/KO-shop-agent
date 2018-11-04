<template>
    <!-- 首页 -->
    <div class="right fl">
        <div class="Essential-information">
            <div class="commodity-logo" @click="shopEditors">
                <img :src="URL + store.store_logo" alt="">
                <div class="dianp clearfix">
                    <img src="../../../assets/edit.png" alt="">
                    <span>编辑店铺设置</span>
                </div>
            </div>
            <div class="QR-code">
                <img src="../../../assets/QR-code.png" alt="">
                <div class="xiazai">下载店铺二维码</div>
            </div>
            <div class="information">
                <ul>
                    <li class="title">{{store.shop_name}}</li>
                    <li>
                        <span>用户名：</span>
                        <span class="Basket">{{store.user_name}}</span>
                    </li>
                    <li>
                        <span>店铺有效期：</span>
                        <span class="Basket">
                            {{store.shop_long}}
                            <!-- 截止至 <time-Plunge :timePlunge="home_data.store.shop_long"></time-Plunge> -->
                            </span>
                    </li>
                    <li>
                        <span>上次登录IP：</span>
                        <span class="Basket">{{store.last_login_ip}}</span>
                    </li>
                    <li>
                        <span>上次登录时间：</span>
                        <span class="Basket">{{new Date(store.last_login_time * 1000).getFullYear()+'-'+(new Date(store.last_login_time * 1000).getMonth()+1)+'-'+new Date(store.last_login_time * 1000).getDate()+' '+new Date(store.last_login_time * 1000).getHours()+':'+new Date(store.last_login_time * 1000).getMinutes()+':'+new Date(store.last_login_time * 1000).getSeconds()}}</span>
                    </li>
                </ul>
            </div>
            <div class="score">
                <ul>
                    <div class="pingf">店铺动态评分</div>
                    <li>
                        <img src="../../../assets/5.jpg" alt="">
                        <div>描述相符</div>
                    </li>
                    <li>
                        <img src="../../../assets/5.jpg" alt="">
                        <div>服务态度</div>
                    </li>
                    <li>
                        <img src="../../../assets/5.jpg" alt="">
                        <div>物流速度</div>
                    </li>
                    <li>
                        <img src="../../../assets/5.jpg" alt="">
                        <div>综合服务</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="index-left">
            <div class="commodity">
                <h3 class="lm">商品管理</h3>
                <ul>
                   <li>
                        <el-badge @click.native="tolink" :value="goods.inTheSale" :max="99" class="item">
                            <el-button size="small">出售中的商品</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge @click.native="tolink" :value="goods.inTheWarehouse" :max="99" class="item">
                            <el-button size="small">仓库中的商品</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge @click.native="tolink" :value="goods.waitForAudit" :max="99" class="item">
                            <el-button size="small">等待审核的商品</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge @click.native="tolink" :value="goods.irregularities" :max="99" class="item">
                            <el-button size="small">违规下架的商品</el-button>
                        </el-badge>
                    </li>
                </ul>
            </div>
            <div class="commodity">
                <h3 class="lm">订单提醒 </h3>
                <ul>
                    <li>
                        <el-badge @click.native="orderFun" :value="order.pendingPayment" :max="99" class="item">
                            <el-button size="small">待付款订单</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge @click.native="orderFun" :value="order.pendingDelivery" :max="99" class="item">
                            <el-button size="small">待发货订单</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge @click.native="orderFun" :value="order.toBeEvaluated" :max="99" class="item">
                            <el-button size="small">待评价订单</el-button>
                        </el-badge>
                    </li>
                    <li>
                        <el-badge @click.native="orderFun" :value="order.refunds" :max="99" class="item">
                            <el-button size="small">退款中订单</el-button>
                        </el-badge>
                    </li>
                </ul>
            </div>
            <div class="commodity">
                <h3 class="lm">违规提醒 </h3>
                <ul>
                    <li>
                        <el-badge :value="home_data.illegal" :max="10" class="item">
                            <el-button size="small">待处理的投诉</el-button>
                        </el-badge>
                    </li>
                </ul>
            </div>
            <div class="commodity">
                <h3 class="lm">客户等级分析</h3>
                <el-table
                    max-height="200"
                    :data="home_data.userLevel"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                    prop="count"
                    label=""
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="level_name"
                    label="">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="index-right">
            <div class="Statistics">
                <h3 class="lm">今日统计</h3>
                <ul>
                    <li> 
                        今日营业总额
                        <span class="Orange">￥{{home_data.profitToday}}</span>
                    </li>
                    <li> 
                        今日订单量
                        <span class="Orange">￥{{home_data.orderToday}}</span>
                    </li>
                    <li> 
                        今日有效订单量
                        <span class="Orange">￥0.00</span>
                    </li>
                </ul>
            </div>
            <div class="Statistics">
                <h3 class="lm">平台联系方式</h3>
                <i class="mode" v-if="config[1]">电话：{{config[1].config_value}} </i>
                <i class="mode" v-if="config[4]">邮箱：{{config[4].config_value}} </i>
            </div>
            <div class="Statistics">
                <h3 class="lm">商家公告</h3>
                <el-table
                    max-height="150"
                    :data="home_data.announcement"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                    prop="title"
                    label=""
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    label="">
                        <template slot-scope="scope">
                            <time-Plunge v-if="scope" :timePlunge="scope.row.create_time"></time-Plunge>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="Statistics">
                <h3 class="lm">销售情况统计<span class="gray">（近10天）</span></h3>
                <el-table
                    max-height="150"
                    :data="home_data.salesStatistics"
                    tooltip-effect="dark"
                    style="width: 100%">
                    <el-table-column
                    prop="price"
                    label=""
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="time"
                    label="">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import timePlunge from '@/components/page/time';
    export default {
        name : 'index',
        data(){
            return {
                loading:true,
                topHeight: 90, //顶部高度
                footerHeight : 25,
                leftWidth : 190,
                home_data:'',
                store:{},
                goods:{},
                order:{},
                config:[]
            }
        },
        created(){
            this.$HTTP(this.$httpConfig.getHome,{}).then((res) =>{
                this.store = res.data.data.store;
                this.goods = res.data.data.goods;
                this.order = res.data.data.order;
                this.config = res.data.data.config;
                this.home_data = res.data.data;
            }).catch((err) =>{
                console.log(err);
            })
        },
        methods:{
            shopEditors(){
                parent.location.href = '#/shop';
            },
            tolink(){
                parent.location.href = '#/goods';
            },
            orderFun(){
                parent.location.href = '#/trade';
            }
        },
        mounted() {
            document.body.scrollTop = 0;
              console.log(this.$router);
        },
        components:{
            timePlunge
        }  
    }
</script>
<style lang="less">
    body{
        overflow: inherit;
    }
    .el-table td,.el-table td{
        border-bottom: none;
    }
    /*表格内容居中*/
	.el-table th>.cell,.el-table .cell{
		text-align: center;
	}
</style>

<style lang="less" scoped>
            .right{
                width: 1042px;
                padding-bottom:80px;
                .Essential-information{
                    border: 1px solid #dddddd;
                    padding: 36px;
                    background-color: #FFF;
                    overflow: hidden;
                    .commodity-logo{
                        float: left;
                        width: 192px;
                        margin-right: 50px;
                        overflow: hidden;
                        img{
                            max-width: 100%;
                            height: auto;
                            width: auto\9;
                            border: 0;
                        }
                        .dianp{
                            font-size: 12px;
                            padding-left: 50px;
                            padding-top:10px;
                            text-align:center;
                            display: block;
                            color: #555555;
                            cursor: pointer;
                            img{
                                float: left;
                                max-width: 100%;
                                height: auto;
                                width: auto\9;
                                border: 0;

                            }
                            span{
                            float: left;
                            line-height: 20px;
                            }
                        }
                    }
                    .QR-code{
                        float: left;
                        width: 100px;
                        height: 180px;
                        img{
                            width: 100px;
                            height: 100px;
                            display: block;
                        }
                        .xiazai{
                            font-size: 12px;
                            line-height: 50px;
                            cursor: pointer;
                            text-align: center;
                        }
                    }
                    .information{
                        width: 220px;
                        margin-left: 30px;
                        float: left;
                        .title{
                        line-height: 30px;
                        font-size: 18px;
                        color: #333;
                        }
                        li{
                            list-style: none outside none;
                            .Basket{
                                color: #26a2f1;
                            }
                        }
                    }
                    .score{
                        width: 300px;
                        margin-left: 70px;
                        float: left;
                        .pingf{
                            line-height: 30px;
                            color: #333;
                            font-size: 18px;
                        }
                        li{
                            float: left;
                            width: 56px;
                            text-align: center;
                            display: block;
                            margin: 19px 19px 13px 0;
                            div{
                                text-align: center;
                                line-height: 40px;
                            }
                        }
                    }
                }
                .index-left{
                    width: 610px;
                    float: left;
                    .commodity{
                        background-color: #FFF;
                        border: 1px solid #dddddd;
                        margin-top: 15px;
                        padding: 15px;
                        overflow: hidden;
                        .lm{
                            background: url(../../../assets/s.jpg) no-repeat left;
                            text-indent: 15px;
                            color: #333;
                        }
                        li{
                            position: relative;
                            // width: 92px;
                            // height: 22px;
                            // margin-top: 15px;
                            float: left;
                            margin: 10px 15px;
                            cursor: pointer;
                            i{
                                border: 1px solid #dddddd;
                                line-height: 22px;
                                display: block;
                                text-align: center;
                            }
                            span{
                                position: absolute;
                                height: 16px;
                                width: 16px;
                                background-color: #ff7840;
                                color: #FFF;
                                right: -10px;
                                top: -10px;
                                text-align: center;
                                border-radius: 10px;
                                line-height: 16px;
                            }
                        }
                    }
                }
                .index-right{
                    width: 420px;
                    float: right;
                    .Statistics{
                        background-color: #FFF;
                        border: 1px solid #dddddd;
                        margin-top: 15px;
                        padding: 15px;
                        overflow: hidden;
                        .lm{
                            background: url(../../../assets/s.jpg) no-repeat left;
                            text-indent: 15px;
                            color: #333;
                            .gray{
                                font-size: 12px;
                                color: #888;
                            }
                        }
                        li{
                            width: 120px;
                            float: left;
                            text-align: center;
                            border-right: 1px solid #eeeeee;
                            margin-top: 4px;
                            .Orange{
                                color: #fb6c45;
                                font-size: 14px;
                                display:block;
                            }
                        }
                        .mode{
                            width: 45%;
                            display: block;
                            margin-top: 5px;
                            float: left;
                            line-height: 30px;
                            margin-left: 15px;
                        }
                    }
                }
            } 
</style>