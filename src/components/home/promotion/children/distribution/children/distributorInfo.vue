<template>
   <!-- 促销 - 分销-会员管理 -->
  <div class="classify">
     <div class="g_att">
        <h1 class="t_title">
          <span class="size16">会员管理 - 会员信息</span>
        </h1>
        <div class="currency">
            <div class="z_info">
                <div class="z_price z_users">
                    <span> 会员昵称 :&nbsp;&nbsp;</span>
                    <input type="text" class="ss">
                </div>
                <div class="z_users">
                    <span> 用户积分 :&nbsp;&nbsp;</span>
                    <span><i>0</i> 积分</span>
                </div>
                <div class="z_users">
                    <span> 账户余额 :&nbsp;&nbsp;</span>
                    <span><i>0</i> 元</span>
                </div>
                <div class="z_price z_info">
                    <span><b>*</b> 电子邮箱 :&nbsp;&nbsp;</span>
                    <input type="text" class="ss">
                    <span>&nbsp;&nbsp;&nbsp; 请输入常用的邮箱，将用来找回密码，接受订单通知等。</span>
                </div>
                <div class="z_price z_info">
                    <span><b>*</b> 手机号码 :&nbsp;&nbsp;</span>
                    <input type="text" class="ss">
                    <span>&nbsp;&nbsp;&nbsp; 请输入常用的手机号码，将用来找回密码，接受订单通知等。</span>
                </div>
                <div class="z_price z_password">
                    <span> 新密码 :&nbsp;&nbsp;</span>
                    <input type="text" class="ss">
                    <span>&nbsp;&nbsp;&nbsp; 留空表示不修改密码</span>
                </div>
                <div class="z_price z_users">
                    <span> 确认密码 :&nbsp;&nbsp;</span>
                    <input type="text" class="ss">
                    <span>&nbsp;&nbsp;&nbsp; 留空表示不修改密码</span>
                </div>
                <div class="set clearfix z_double">
                    <span class="fl"> 性别 :&nbsp;&nbsp;</span>
                    <div class="opt fl">
                        <input type="radio" name="type" value="1">
                        保密 
                    </div>
                    <div class="opt fl">
                        <input type="radio" name="type" value="2">
                        男 
                    </div>
                    <div class="opt fl">
                        <input type="radio" name="type" value="3">
                        女 
                    </div>
                </div>
                <div class="z_price z_double z_qq">
                    <span> QQ :&nbsp;&nbsp;</span>
                    <input type="text" class="ss">
                </div>
                <div class="z_price z_users">
                    <span> 分销功能 :&nbsp;&nbsp;</span>
                    <el-switch
                        v-model="value"
                        active-text="开启"
                        inactive-text="关闭"
                        active-color="#f7bc0a">
                    </el-switch>
                    <div class="distribution-list">
                        <table width="60%" border="0" cellspacing="0" cellpadding="0" class="specification" >
                            <tr>
                                <th bgcolor="#f9fafa" class="black">用户余额</th>
                                <td bgcolor="#f9fafa" align="center"><i>123</i> 元</td>
                                <td bgcolor="#f9fafa" align="center" class="black bold">累计分佣金额</td>
                                <td bgcolor="#f9fafa" align="center"><i>78998</i> 元</td>
                            </tr>
                            <tr>
                                <th bgcolor="#f9fafa" class="black">上一级编号</th>
                                <td bgcolor="#f9fafa" align="center">0</td>
                                <td bgcolor="#f9fafa" align="center" class="black bold">一级下线数</td>
                                <td bgcolor="#f9fafa" align="center">56</td>
                            </tr>
                            <tr>
                                <th bgcolor="#f9fafa" class="black">上二级编号</th>
                                <td bgcolor="#f9fafa" align="center">0</td>
                                <td bgcolor="#f9fafa" align="center" class="black bold">二级下线数</td>
                                <td bgcolor="#f9fafa" align="center">121</td>
                            </tr>
                            <tr>
                                <th width="15%" bgcolor="#f9fafa" class="black">上三级编号</th>
                                <td width="20%" bgcolor="#f9fafa" align="center">0</td>
                                <td width="15%" bgcolor="#f9fafa" align="center" class="black bold">三级下线数</td>
                                <td width="20%" bgcolor="#f9fafa" align="center">5456</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="button">
                <span>确认提交</span>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
    name:'addsales',
    data (){
      return {
        defaultMsg: '',
        value:true,
        config: {
            initialFrameWidth: null,
            initialFrameHeight: 350
        }
      }
    },
    methods:{
        to(){
            this.$router.push('/FullCut'); 
        }
    },

}
</script>
<style lang="less">
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
            .t_m {
                background: url(../../../../../../assets/return.jpg) no-repeat 15px #ff9f24;
                width: 135px;
                height: 32px;
                border: 1px solid #ff920b;
                border-radius: 4px;
                font-size: 12px;
                font-weight: normal;
                cursor: pointer;
                color: #FFF;
                line-height: 32px;
                text-indent: 35px;
            }
        }
    }
    .el-switch {
      .el-switch__core {
        width: 35px!important;
        height:16px;
        .el-switch__button {
          width: 11px;
          height: 11px;
        }
      }
        .el-switch__label{
          color:#a4a5a7;
        }
          .el-switch__label.is-active {
            color: #f7bc0a;
        }
        .el-switch__label span {
            line-height: 20px;
            font-size: 12px;
        }
      }
</style>
<style lang="less" scoped>
    .classify {
        width: 1000px;
        .g_att{
            .currency {
                height: auto;
                min-height: 100px;
                line-height: 20px;
                padding: 10px;
                border-top: 0;
                color: #333;
                    .ss {
                    padding-left: 5px;
                    }
                    .z_info {
                    padding-left:30px;
                        .z_price {
                            span {
                                b {
                                color: #ff0000;
                                }
                            }
                            input {
                                margin: 10px 0;
                                width: 288px;
                                height: 32px;
                                border: 1px solid #cccccc;
                            }
                            .it_z {
                                margin-left:25px;
                            }
                            .price {
                                width: 80px;
                            }
                            .distribution-list {
                                padding-left:67px;
                                padding-top: 13px;
                                .specification {
                                    border-left: 1px solid #dddddd;
                                    border-top: 1px solid #dddddd;
                                    color: 000;
                                    tr {
                                        th {
                                            border-bottom: 1px solid #ddd;
                                            border-right: 1px solid #dddddd;
                                            padding: 5px 0;
                                            line-height:24px;
                                            font-size:12px; 
                                            text-align: center;
                                        }
                                        td {
                                            border-right: 1px solid #dddddd;
                                            border-bottom: 1px solid #ddd;
                                            padding: 5px 0;
                                            line-height:24px;
                                            font-size:12px; 
                                            i{
                                                color: #ff0000;
                                                font-weight: 600;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        .z_users {
                            padding-left: 40px;                            
                            span {
                                display: inline-block;
                                padding:10px 0;
                                i{
                                    color:#ff0000;
                                    font-weight:600;
                                }
                            }
                        }
                        .z_password {
                            padding-left: 50px;
                        }
                        .set {
                            padding-left: 45px;
                            b {
                                color: #ff0000;
                            }
                                span {
                                    padding: 10px 0;
                                }
                                .opt {
                                    padding-right:15px;
                                    margin: 10px 0;
                                }
                                input {
                                    border: 0;
                                    margin:0;
                                    width: 15px;
                                    height: 15px;
                                }
                            }
                            .z_double {
                                padding-left: 65px;
                                
                            }
                            .z_qq {
                                padding-left: 70px;
                            }
                    }    
                    .button {
                        height: 32px;
                        margin: 30px 0 20px 137px;
                        border-radius: 6px;
                        background: #f7bc0a;
                        width: 199px;
                        span {
                            display: block;
                            line-height: 32px;
                            color: #FFF;
                            text-align: center;
                            cursor: pointer;
                        }
                    }  
            } 
            
        }
    }
</style>
