<template>
    <!-- 评价管理-->
    <div class="tradeManage fl">
        <div class="t_tab">
            <h1 class="t_title">
                <span class="size16">评价管理 - 评价列表</span>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>1.遇到买家恶意评价，卖家可联系平台方处理，如证据充足，平台管理员可删除买家评价</p>
                    <p>2.删除评价记录只删除了“宝贝与描述相符”及其对应的评价内容（删除后将不再计入评分），不会影响“卖家的服务态度、卖家的发货速度、物流公司的服务”三项内容</p>
                </div>
            </div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="Commodity-management line-height5">
                <tr>
                    <td width="8%" align="right">评价：</td>
                    <td width="20%" align="right">
                        <el-select v-model="evaluate_id" placeholder="请选择">
                            <el-option v-for="(item, index) in evaluate_status" :key="index" :label="item" :value="index+1">
                            </el-option>
                        </el-select>
                        <!-- <select name="select" id="select">
                <option> 买家帐号/买家姓名</option>
                </select> -->
                    </td>
                    <td width="10%" align="right">评论内容：</td>
                    <td width="20%" align="center">
                        <el-select v-model="content_id" placeholder="请选择">
                            <el-option v-for="(item, index) in evaluate_content" :key="index" :label="item" :value="index+1">
                            </el-option>
                        </el-select>
                        <!-- <select name="select3" id="select3">
                <option> 买家帐号/买家姓名</option>
                </select> -->
                    </td>
                    <!-- <td width="8%" align="right"> 回复状态：</td>
                <td width="20%">
                    <el-select v-model="evaluate_id" placeholder="请选择">
						<el-option v-for="(item, index) in evaluate_status" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
                    <select name="select2" id="select2">
                <option> 买家帐号/买家姓名</option>
                </select>
                </td> -->
                    <td width="27%" align="left">
                        <el-button type="success" size="small" @click="search">搜索</el-button>
                    </td>
                </tr>
            </table>
            <el-table ref="multipleTable" :data="evaluateList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="宝贝信息" prop="id" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="shop_name clearfix">
                            <img :src="URL + scope.row.pic_url" alt="" class="shop_img">
                            <span class="name">{{scope.row.title}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="评价" prop="content" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="评价人" prop="user_name">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini">删除</el-button>
                        <el-button slot="reference" size="mini" type="primary">回复</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-button type="danger" style="float:left; margin-left:50px;" size="mini">删除</el-button>
                <el-button type="primary" style="float:left; margin-left:20px;" size="mini">回复</el-button>
                <el-pagination style="float:right;" background layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="page_size" :total="page">
                </el-pagination>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name: 'evaluate',
    data() {
        return {
            select: false,
            page: 0, //共多少页
            currentPage: 1, //当前页
            page_size: 0, //每页显示多少条数据
            selectList: [],//单选选中
            evaluate_id: '',
            content_id: '',
            evaluateList: [],
            evaluate_status: [
                '差评',
                '一般',
                '好评'
            ],
            evaluate_content: [
                '有评价内容',
                '无评价内容'
            ]
        }
    },
    created() {
        
        this.search();
    },
    mounted() {
    },
    methods: {
        handleSelectionChange() {
        },
        //搜索
        search() {
            this.$HTTP(this.$httpConfig.getTransactionList,{
                level: this.evaluate_id,
                content: this.content_id,
                page: this.currentPage,
            }).then((res) => {
                this.evaluateList = res.data.data.data;
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: res.data.message
                });
            }).catch((err) => {
                console.log(err);
            })
        },
        /*页面跳转*/
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            this.search();
        },
    },
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
    .Commodity-management {
      background-color: #f6f6f6;
      border: 1px solid #dddddd;
      margin: 15px 0;
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
    .shop_name {
      .shop_img {
        width: 58px;
        height: 58px;
        float: left;
        margin-top: 12px;
      }
      .name {
        padding-left: 12px;
        padding-top: 20px;
        display: inline-block;
        line-height: 25px;
        height: 25px;
      }
    }
    .page {
      overflow: hidden;
      padding-top: 20px;
    }
  }
}
</style>