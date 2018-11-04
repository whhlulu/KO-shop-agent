<template>
  <!-- 广告 - 广告位列表-->
  <div class="classify">
     <div class="g_att">
        <h1 class="t_title">
          <span class="size16">广告位置列表</span>
        </h1>
        <el-table
            ref="multipleTable"
            :data="positionList"
            tooltip-effect="dark"
            style="width: 100%;padding-top:30;">
            <el-table-column
            label="广告位ID"
            prop="id"
            >
            </el-table-column>
            <el-table-column
            prop="ap_name"
            label="广告位名称"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="ap_width"
            label="广告位宽度"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="ap_height"
            label="广告位高度"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            label="是否启用"
            show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.is_use"
                        disabled
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
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
export default {
    name:'advertisingPosition',
    data (){
      return {
        listData:[],
        page : 0, //共多少页
        currentPage : 1, //当前页
        page_size : 0 ,//每页显示多少条数据
        positionList:[],
      }
    },
    created(){
        this.getData();
    },
    methods:{
        getData(){
            
            this.$HTTP(this.$httpConfig.getAdvPostionList,{page:this.currentPage}).then(res =>{
                this.page_size = parseInt(res.data.data.size);
                this.page = Number(res.data.data.count);
                for (let key in res.data.data.data) {
                    res.data.data.data[key].is_use = res.data.data.data[key].is_use == 1?true:false; 
                }
                this.positionList = res.data.data.data;
            }).catch(err =>{
                console.log(err);
            })
        },  
        /*页面跳转*/
        handleCurrentChange: function(currentPage) {
            console.log(currentPage);
            this.currentPage = currentPage;
            this.getData();
        },
    }
}
</script>
<style lang="less">
    .el-switch {
      .el-switch__core {
        width: 35px!important;
        height:16px;
        .el-switch__button {
          width: 11px;
          height: 11px;
        }
      }
        .el-switch__label span {
            line-height: 20px;
            font-size: 12px;
        }
      }
    /*表格内容居中*/
	.el-table th>.cell,.el-table .cell{
		text-align: center;
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
        }
    }
</style>
<style lang="less" scoped>
    .classify {
        width: 1042px;
        .g_att{
            .t_add {
                background: url(../../../../assets/plus2.jpg) no-repeat 28px #ff9f24;
                width: 135px;
                height: 32px;
                border: 1px solid #ff920b;
                border-radius: 4px;
                font-size: 12px;
                font-weight: normal;
                cursor: pointer;
                color: #FFF;
                line-height: 32px;
                text-indent: 48px;
            }
            .page {
                overflow: hidden;
                padding-top:20px;
            }
        }
    }
</style>
