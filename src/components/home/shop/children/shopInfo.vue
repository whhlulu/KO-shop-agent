<template>
    <!-- 店铺 -店铺信息 -->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">店铺信息</span>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>界面展示店主基本信息，结算账户，店铺经营等信息，仅供查看</p>
                </div>
            </div>
            <div v-if="type == 0">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                    <tr>
                        <th colspan="6">
                            <span class="black bold size14 shop_news">店铺联系人信息</span>
                        </th>
                    </tr>
                    <tr>
                        <td align="right" width="20%" class="black border_right">联系人姓名：</td>
                        <td align="left" width="15%" class="border_right space">{{dataTable.person_name}}</td>
                        <td align="right" width="20%" class="black border_right">联系人电话：</td>
                        <td align="left" width="15%" class="border_right space">{{dataTable.mobile}}</td>
                        <td align="right" width="20%" class="black border_right">电子邮箱：</td>
                        <td align="left" width="15%" class="space">--</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">联系地址：</td>
                        <td colspan="5" class="space">{{region.prov_id}}--{{region.city}}--{{region.dist}}--{{region.address}}</td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                    <tr>
                        <th colspan="6">
                            <span class="black bold size14 shop_news">身份信息</span>
                        </th>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">身份证号：</td>
                        <td colspan="5" class="space">{{dataTable.id_card}}</td>
                    </tr>
                    <tr>
                        <td width="20%" align="right" class="black border_right">身份证正面： </td>
                        <td width="90%" colspan="5" class="space">
                            <img :src="URL+dataTable.other_side" alt="">
                        </td>
                    </tr>
                    <tr>
                        <td width="20%" align="right" class="black border_right">身份证背面： </td>
                        <td width="90%" colspan="5" class="space">
                            <img :src="URL+dataTable.idcard_positive" alt="">
                        </td>
                    </tr>
                    <tr>
                        <td width="20%" align="right" class="black border_right">手持身份证照片： </td>
                        <td width="90%" colspan="5" class="space">
                            <img :src="URL+dataTable.other_side" alt="">
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                    <tr>
                        <th colspan="6">
                            <span class="black bold size14 shop_news">店铺经营信息</span>
                        </th>
                    </tr>
                    <tr>
                        <td align="right" width="13%" class="black border_right">商家账号：</td>
                        <td colspan="2" align="left" width="65%" class="border_right space">鲜农乐店长</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">店铺名称：</td>
                        <td colspan="2" class="space">{{dataTable.store_name}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">开店时长：</td>
                        <td colspan="2" class="space">{{information.shop_long}}/年</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">店铺分类保证金：</td>
                        <td colspan="2" class="space">
                            <span>{{information.sc_bail}}元</span>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">店铺等级：</td>
                        <td colspan="2" class="space">
                            <span>{{information.level_name}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">店铺经营目录：</td>
                        <td colspan="3" class="space">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list content-table">
                                <tr>
                                    <td>一级目录</td>
                                    <td>二级目录</td>
                                    <td>三级目录</td>
                                </tr>
                                <tr v-show="ctrlShowPerson" v-for="(item ,i) in classResult" :key="i">
                                    <td>{{item[0]}}</td>
                                    <td>{{item[1]}}</td>
                                    <td>{{item[2]}}</td>
                                </tr>
                                <tr class="bottom-ctrl">
                                    <td colspan="3" v-if="ctrlShowPerson" @click="ctrlShowPer">收起</td>
                                    <td colspan="3" v-else @click="ctrlShowPer">展开</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">店铺二维码： </td>
                        <td class="space">
                            <img src="../../../../assets/1.jpg" alt="">
                        </td>
                        <td align="left" class="black" width="60%">【下载店铺二维码】</td>
                    </tr>
                </table>
            </div>
            <div v-else>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                    <tr>
                        <th colspan="6">
                            <span class="black bold size14 shop_news">公司及联系人信息</span>
                        </th>
                    </tr>
                    <tr>
                        <td align="right" width="20%" class="black border_right">公司名称：</td>
                        <td align="left" width="15%" class=" space">{{dataTable.company_name}}</td>
                        <td align="right" width="20%" class="black border_right">申请人：</td>
                        <td align="left" width="15%" colspan="3" class=" space">{{dataTable.user_name}}</td>
                    </tr>
                    <tr>
                        <td align="right" width="20%" class="black border_right">注册资金数：</td>
                        <td align="left" width="15%" class=" space">{{dataTable.registered_capital}}</td>
                        <td align="right" width="20%" class="black border_right">员工数：</td>
                        <td align="left" width="15%" class="border_right space">{{dataTable.number_employees}}</td>
                        <td align="right" width="20%" class="black ">联系人手机：</td>
                        <td align="left" width="15%" class="space">{{dataTable.mobile}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">联系地址：</td>
                        <td colspan="5" class="space">{{region.prov_id}}--{{region.city}}--{{region.dist}}--{{region.address}}</td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                    <tr>
                        <th colspan="6">
                            <span class="black bold size14 shop_news">营业执照信息（副本）</span>
                        </th>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">营业执照号：</td>
                        <td colspan="5" class="space">{{dataTable.license_number}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">营业执照结束日期：</td>
                        <td colspan="5" class="space">{{dataTable.validity_start|formatDate}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">营业执照开始日期：</td>
                        <td colspan="5" class="space">{{dataTable.validity_end|formatDate}}</td>
                    </tr>
                    <tr>
                        <td width="20%" align="right" class="black border_right">营业执照电子版：</td>
                        <td width="90%" colspan="5" class="space">
                            <img :src="URL+dataTable.electronic_version" alt="">
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                    <tr>
                        <th colspan="6">
                            <span class="black bold size14 shop_news">组织机构代码证</span>
                        </th>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">组织机构代码：</td>
                        <td colspan="5" class="space">{{dataTable.organization_code}}</td>
                    </tr>
                    <tr>
                        <td width="20%" align="right" class="black border_right">组织机构代码证电子版：</td>
                        <td width="90%" colspan="5" class="space">
                            <img :src="URL+dataTable.organization_electronic" alt="">
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                    <tr>
                        <th colspan="6">
                            <span class="black bold size14 shop_news">一般纳税人证明</span>
                        </th>
                    </tr>
                    <tr>
                        <td width="20%" align="right" class="black border_right">一般纳税人证明：</td>
                        <td width="90%" colspan="5" class="space">
                            <img :src="URL+dataTable.taxpayer_certificate" alt="">
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                    <tr>
                        <th colspan="6">
                            <span class="black bold size14 shop_news">开户银行信息</span>
                        </th>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">开户名：</td>
                        <td colspan="5" class="space">{{bankInfo.account_name}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">开户银行支行名称：</td>
                        <td colspan="5" class="space">{{bankInfo.branch_bank}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">支行联行号：</td>
                        <td colspan="5" class="space">{{bankInfo.branch_number}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">结算账户开户名：</td>
                        <td colspan="5" class="space">{{bankInfo.settle_name}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">结算公司银行账号：</td>
                        <td colspan="5" class="space">{{bankInfo.settle_account}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">结算开户银行支行名称：</td>
                        <td colspan="5" class="space">{{bankInfo.settle_bank}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">结算支行联行号：</td>
                        <td colspan="5" class="space">{{bankInfo.settle_number}}</td>
                    </tr>
                    <tr>
                        <td width="20%" align="right" class="black border_right">开户银行许可证电子版：</td>
                        <td width="90%" colspan="5" class="space">
                            <img :src="URL+bankInfo.bank_electronic" alt="">
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                    <tr>
                        <th colspan="6">
                            <span class="black bold size14 shop_news">税务登记证</span>
                        </th>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">税务登记证号：</td>
                        <td colspan="5" class="space">{{bankInfo.certificate_number}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">纳税人识别号：</td>
                        <td colspan="5" class="space">{{bankInfo.identification_number}}</td>
                    </tr>
                    <tr>
                        <td width="20%" align="right" class="black border_right">税务登记证号电子版：</td>
                        <td width="80%" colspan="5" class="space">
                            <img :src="URL+bankInfo.registration_electronic" alt="">
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
                    <tr>
                        <th colspan="6">
                            <span class="black bold size14 shop_news">店铺经营信息</span>
                        </th>
                    </tr>
                    <tr>
                        <td align="right" width="13%" class="black border_right">商家账号：</td>
                        <td colspan="2" align="left" width="65%" class="border_right space">--</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">店铺名称：</td>
                        <td colspan="2" class="space">{{dataTable.store_name}}</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">开店时长：</td>
                        <td colspan="2" class="space">{{information.shop_long}}/年</td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">店铺分类保证金：</td>
                        <td colspan="2" class="space">
                            <span>{{information.sc_bail}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">店铺等级：</td>
                        <td colspan="2" class="space">
                            <span>{{information.level_name}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">店铺经营目录：</td>
                        <td colspan="3" class="space">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list content-table">
                                <tr>
                                    <td>一级目录</td>
                                    <td>二级目录</td>
                                    <td>三级目录</td>
                                </tr>
                                <tr v-show="ctrlShow" v-for="(scc, i) in classResult" :key="i">
                                    <td>{{scc[0]}}</td>
                                    <td>{{scc[1]}}</td>
                                    <td>{{scc[2]}}</td>
                                </tr>
                                <tr class="bottom-ctrl">
                                    <td colspan="3" v-if="ctrlShow" @click="ctrlShowCom">收起</td>
                                    <td colspan="3" v-else @click="ctrlShowCom">展开</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="right" class="black border_right">店铺二维码： </td>
                        <td class="space">
                            <img src="../../../../assets/1.jpg" alt="">
                        </td>
                        <td align="left" class="black" width="60%">【下载店铺二维码】</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'shopfit',
    data: function () {
        return {
            startTime: '',
            endTime: '',
            value: true,
            dataTable1: {},
            dataTable: {},
            types: [], //店铺分类
            region: {},
            type:1,
            ctrlShowPerson:true,
            ctrlShow:true,
            typeMetod:['person', 'company'],
            bankInfo:{},
            classResult:[],
            information: {},
        }
    },
    
    mounted() {
        
        this.getData();
       
    },
    methods: {
        ctrlShowCom(){
            this.ctrlShow = !this.ctrlShow;
        },
        ctrlShowPer(){
            this.ctrlShowPerson = !this.ctrlShowPerson;
        },
        tolink() {
            this.$router.push({
                name: 'addGrade',
                // params: {
                //     status: 0
                // }
            });
        },
        getData() {
            let obj = this;
            this.$HTTP(this.$httpConfig.getStoreMoreInfor,{}).then((res) => {
                this.dataTable = res.data.data.store;
                this.region = res.data.data.region;
                this.type = parseInt(this.dataTable.type);
                this.$message.success(res.data.message);
                let method = this.typeMetod[this.type];
                console.log(this.typeMetod[this.type]);
                let storeId = this.dataTable.id;
                eval('obj.'+method+'(storeId)');
                this.storeInformation(storeId);
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        person(storeId){
        },
        /**
         * 经营信息
         */
        storeInformation(storeId) {
            this.$HTTP(this.$httpConfig.getStoreOperationInfo,{store_id: storeId}).then(res => {
                this.classResult = res.data.data.class_result;
                this.information = res.data.data.store_information;
                this.cardNumberInformation(storeId);
            })
        },
        /**
         * 卡号信息
         */
        cardNumberInformation(storeId) {
            this.$HTTP(this.$httpConfig.getStoreBankInfo,{store_id: storeId}).then(res => {
                this.bankInfo = res.data.data;
            })
        },
        /*获取分类*/
        getType() {
        }
    }

}
</script>
<style lang="less" scoped>
.classify {
  width: 1000px;
  margin-bottom: 100px;
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
    .list {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-top: 15px;
      tr {
        th {
          border-bottom: 1px solid #ddd;
          padding: 10px;
          background-color: #ddd;
        }
        td {
          border: 1px solid #ddd;
          padding: 10px 0;
          .shop_news {
            padding-left: 15px;
          }

          input,
          select {
            padding-left: 5px;
            width: 288px;
            height: 32px;
            border: 1px solid #cccccc;
          }
          select {
            width: 180px;
          }
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding: 10px 0;
          }
          textarea {
            padding-left: 5px;
            padding-top: 5px;
            min-height: 80px;
            border: 1px solid #cccccc;
          }
        }
        .border_right {
          border-right: 1px solid #ddd;
          text-align: left;
          padding: 0 10px;
        }
        .space {
          padding: 10px;
          .content-table {
            margin: 0 !important;
            text-align: center;
            tr:nth-of-type(1) {
              background-color: #eee;
            }
              tr.bottom-ctrl{
                  padding: 0!important;
                  height: 20px;
                  background-color: #eee;
                  cursor: pointer;
                  td{

                  padding: 0!important;
                  height: 20px;
                  }
              }
          }
        }
      }
    }
  }
}
</style>
