<template>
    <!-- 会员 - 会员等级-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">会员等级 - 列表</span>
                <div class="t_add fr" @click="tolink">添加会员等级</div>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>非特殊会员等级 : 会员等级按照累计交易次数或累计消费金额的变化自动升级</p>
                    <p>特殊会员等级的会员不会随着累计交易次数或累计消费金额的变化而变化</p>
                    <p>是否启用 : 是, 则会员等级可供使用; 否 : 则会员等级不可用</p>
                </div>
            </div>
            <h1 class="t_title">
                <span class="size16">会员等级列表</span>
                <i>（ 共 {{listData.length}} 条记录 ）</i>
            </h1>
            <el-table ref="multipleTable" :data="listData" tooltip-effect="dark" style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="编号" prop="id">
                </el-table-column>
                <el-table-column label="折扣" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{parseFloat(scope.row.discount)/100}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="level_name" label="等级名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="condition_money" label="金额条件">
                </el-table-column>
                <el-table-column prop="condition_num" label="交易笔数">
                </el-table-column>
                <el-table-column label="是否启用">
                    <template slot-scope="scope">
                        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button slot="reference" @click="edit(scope.row.id)" size="mini" icon="el-icon-edit"></el-button>
                        <!-- <el-button size="mini" icon="el-icon-delete" @click="clear(scope.row.id)"></el-button> -->

                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-button type="danger" style="float:left; margin-left:50px;" @click="deleteAll" size="mini">删除</el-button>
                <el-pagination style="float:right;" background layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="page_size" :total="page">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'memberGrade',
    data() {
        return {
            value: true,
            listData: [],
            page: 0, //共多少页
            currentPage: 1, //当前页
            page_size: 10,//每页显示多少条数据
        }
    },
    created() {
        
        this.getData();
    },
    methods: {
        //获取数据
        getData() {
            this.$HTTP(this.$httpConfig.getMemberLevelList,{page: 1}).then((res) => {
                let data = res.data.data.data;
                for (let key in data) {
                    this.listData.push(data[key])
                }
                this.page_size = res.data.data.page_size;
                this.page = Number(res.data.data.page);
            }).catch((err) => {
                console.log(err);
            })
        },
        /*页面跳转*/
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
        },
        //编辑
        edit(id) {
            this.$router.push({
                name: 'addGrade',
                params: {
                    id: id
                }
            })
        },
        deleteAll() {
        },
        tolink() {
            this.$router.push({
                name: 'addGrade',
                params: {
                    id: 'add'
                }
            });
        },
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
    i {
      color: #999;
    }
    .t_add {
      background: url(../../../../assets/plus2.jpg) no-repeat 15px #ff9f24;
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
}
.el-switch {
  .el-switch__core {
    width: 35px !important;
    height: 16px;
    .el-switch__button {
      width: 11px;
      height: 11px;
    }
  }
  .el-switch__label span {
    line-height: 20px;
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
  }
}
</style>
