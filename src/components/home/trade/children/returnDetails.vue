<template>
    <div class="datails">
        <h1 class="t_title">
            <span class="size16">退款/退货详情</span>
            <div class="t_m fr" @click="tolink">返回退款/退货</div>
        </h1>
        <div class="notes-box">
            <div class="notes_title">温馨提示</div>
            <div class="notes_content">
                <p>已收到货的话商品会自动回归库存</p>
            </div>
        </div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
            <tr>
                <td align="right" class="black border_right">订单编号：</td>
                <td colspan="5" class="space">{{goodsData.order_sn_id}}</td>
            </tr>
            <tr>
                <td align="right" class="black border_right">用户：</td>
                <td colspan="5" class="space">{{goodsData.user_name}}</td>
            </tr>
            <tr>
                <td align="right" class="black border_right">申请时间：</td>
                <td colspan="5" class="space">
                    {{new Date(goodsData.create_time * 1000).getFullYear()+'/'+(new Date(goodsData.create_time * 1000).getMonth()+1)+'/'+new Date(goodsData.create_time * 1000).getDate()+' '+new Date(goodsData.create_time * 1000).getHours()+':'+new Date(goodsData.create_time * 1000).getMinutes()+':'+new Date(goodsData.create_time * 1000).getSeconds()}}
                </td>
            </tr>
            <tr>
                <td align="right" class="black border_right">商品名称：</td>
                <td colspan="5" class="space">{{goodsData.title}}</td>
            </tr>
            <tr>
                <td width="13%" align="right" class="black border_right">商品图片： </td>
                <td width="80%" colspan="5" class="space">
                    <img :src="URL+item" alt="" v-for="(item,index) in goodsData.apply_img" :key="index">
                </td>
            </tr>
            <tr>
                <td align="right" class="black border_right">退款金额：</td>
                <td colspan="5" class="space">{{goodsData.price}}</td>
            </tr>
            <tr>
                <td align="right" class="black border_right">商家说明：</td>
                <td colspan="5" class="space">
                    <el-input style="width: 350px;" :autosize="{ minRows: 2, maxRows: 5}" type="textarea" :rows="2" placeholder="请输入内容" v-model="goodsData.content">
                    </el-input>
                </td>
            </tr>
            <tr>
                <td align="right" class="black border_right">退货理由：</td>
                <td colspan="5" class="space">{{goodsData.tuihuo_case}}</td>
            </tr>
            <tr>
                <td align="right" class="black border_right">退款说明：</td>
                <td colspan="5" class="space">{{goodsData.explain}}</td>
            </tr>
            <tr>
                <td align="right" class="black border_right">是否收到货：</td>
                <td colspan="5" class="space">
                    <el-radio v-model="radio" label="1">已收到</el-radio>
                    <el-radio v-model="radio" label="0">未收到</el-radio>
                </td>
            </tr>
        </table>
        <div class="submit">
            <el-button @click="submit" type="success">确认提交</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio: '0',
            dataTable: [],
            goodsData: {}
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.$HTTP(this.$httpConfig.getRefundDetail,{id: this.$route.params.id}).then(res => {
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: res.data.message
                });
                this.goodsData = res.data.data;
                this.radio = this.goodsData.is_receive;
                this.goodsData.apply_img = this.goodsData.apply_img.split(',');
            }).catch(err => {
                console.log(err);
            })
        },
        submit() {
            
            this.$HTTP(this.$httpConfig.setRefundGoods,{
                id: this.goodsData.id,
                content: this.goodsData.content,
                is_receive: this.radio,
            }).then(res => {
                    this.$message({
                        duration: 1000,
                        type: 'success',
                        message: res.data.message
                    });
                    this.tolink();
            }).catch(err => {
                console.log(err);
            })
        },
        tolink() {
            this.$router.back();
        }
    },
}
</script>
<style lang="less" scoped>
.datails {
  width: 1000px;
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
    i {
      color: #999;
    }
    .t_m {
      background: url(../../../../assets/return.jpg) no-repeat 15px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 35px;
    }
  }
  .list {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-top: 1px solid #ddd;
    margin-top: 15px;
    tr {
      td {
        border-bottom: 1px solid #ddd;
        padding: 15px 0;
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
          margin: 0 10px;
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
      }
      .space {
        padding-left: 10px;
      }
    }
  }
  .submit {
    padding-left: 80px;
    padding-top: 30px;
    margin-bottom: 100px;
  }
}
</style>
