<template>
	<!-- 促销-满赠 -->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">满赠列表</span>
				<i>（ 共 {{dataTable.length}} 条记录 ）</i>
				<div @click="to" class="t_add fr">添加商品赠品</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>1.点击右上角添加按钮即可添加满赠信息</p>
				</div>
			</div>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Commodity-management">
				<tr>
					<td width="7%" align="right">活动名称：</td>
					<td width="22%">
						<el-input style="width: 200px;" v-model="params.activeName" clearable></el-input>
					</td>
					<td width="6%" align="right"> 活动状态： </td>
					<td width="20%">
						<el-select v-model="params.activeStatus" placeholder="请选择">
							<el-option v-for="(item, index) in status" :key="index" :label="item" :value="index">
							</el-option>
						</el-select>
					</td>
					<td width="12%" align="left">
						<el-button @click="getData" type="success">搜索</el-button>
					</td>
				</tr>
			</table>
			<el-table border :data="dataTable" style="width: 100%;text-align: center;" max-width="900">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column width="150" label="促销类型">
					<template slot-scope="scope">
						<span>满赠</span>
					</template>
				</el-table-column>
				<el-table-column width="200" show-overflow-tooltip prop="name" label="赠品名称/使用满金额">
				</el-table-column>
				<el-table-column prop="range" label="使用范围">
				</el-table-column>
				<el-table-column prop="start_time" label="开始时间">
				</el-table-column>
				<el-table-column prop="end_time" label="结束时间">
				</el-table-column>
				<el-table-column width="140" label="操作">
					<template slot-scope="scope">
						<el-button @click="edit(scope.row.id)" size="mini" icon="el-icon-edit"></el-button>
						<el-button @click="deleteItem(scope.row.id)" size="mini" icon="el-icon-delete"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="Paging">
				<div class="fl pil">删除</div>
				<div class="Paging_r">
					<el-pagination background layout="prev, pager, next,jumper" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'groupbuy',
	data() {
		return {
			dataTable: [],
			status: ['全部', '开启', '关闭'],
			params: {
				activeName: '',
				activeStatus: '',
				page: 1
			},
			page_size: 0, //每页显示几个
			page: 0, //总页数
			currentPage: 1, //当前页
		}
	},
	created() {
	},
	mounted() {
		
		this.getData();
	},
	methods: {
		to() {
			this.$router.push({
				name: 'addSales',
				params: {
					status: 0
				}
			});
		},
		/*页面跳转*/
		handleCurrentChange: function (currentPage) {
			console.log(currentPage);
			this.currentPage = currentPage;
			this.getData();
		},
		getData() {
			this.params.page = this.currentPage;
			this.$HTTP(this.$httpConfig.getFullGiftList,this.params).then((res) => {
				this.dataTable = res.data.data.data;
				this.page_size = res.data.data.page_size;
				this.page = Number(res.data.data.page * res.data.data.page_size);
				this.$message.success(res.data.message);
			}).catch((res) => {
				this.$message.error(res.data.message);
			})
		},
		edit: function (value) {
			this.$router.push({
				name: 'addSales',
				params: {
					status: 1,
					id: value
				}
			});
		},
		deleteItem(value) {
			this.$confirm('此操作将永久删除此活动，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$HTTP(this.$httpConfig.delFullGift,{id: value}).then((res) => {
					this.$message.success(res.data.message);
					this.getData();
				}).catch((err) => {
					this.$message.error(err);
				});
			}).catch(() => {
				this.$message.info('已取消删除');
			});
		}
	}
}
</script>
<style type="text/css">
.classify {
  width: 1000px !important;
  padding-bottom: 80px;
}
.shopManage {
  padding-bottom: 80px;
}
.logistics {
  padding-bottom: 80px;
}
/*表格内容居中*/
.el-table th > .cell,
.el-table .cell {
  text-align: center;
}
.el-switch {
  padding: 0;
}
</style>
<style lang="less">
body {
  overflow: inherit;
}
.Paging {
  width: 100%;
  height: 50px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  .pil {
    border: 1px solid #e9573e;
    color: #fff;
    text-align: center;
    display: block;
    border-radius: 4px;
    background-color: #e9573e;
    float: left;
    margin: 10px 10px 10px 70px;
    cursor: pointer;
    width: 58px;
    height: 32px;
    line-height: 32px;
  }
  .Paging_r {
    float: right;
    padding: 10px;
  }
}
</style>
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
</style>
<style lang="less" scoped>
.classify {
  width: 1042px;
  .g_att {
    .Commodity-management {
      background-color: #f6f6f6;
      border: 1px solid #dddddd;
      margin-top: 15px;
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
            width: 170px;
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
    .list {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-top: 15px;
      tr {
        td {
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
          input,
          select,
          textarea,
          button {
            outline: 0 none;
            vertical-align: middle;
            text-indent: 5px;
          }
          .paging {
            background: #fff;
            line-height: 30px;
            float: right;
            width: 850px;
            input {
              border: 1px solid #dddddd;
              height: 28px;
            }
            .number {
              float: right;
              span {
                width: 30px;
                height: 28px;
                float: left;
                text-align: center;
                line-height: 30px;
                border: 1px solid #dddddd;
              }
              .page {
                width: 30px;
                height: 30px;
                line-height: 30px;
                background-color: #f7bc0a;
                text-align: center;
                color: #fff;
                border: none;
                border-right: 1px solid #eeb407;
                cursor: pointer;
              }
            }
            .go {
              width: 37px;
              border: 1px solid #dddddd;
              height: 28px;
              border-radius: 6px;
              background-color: #f7f7f7;
              display: block;
              float: right;
              text-align: center;
              margin: 0 15px;
              cursor: pointer;
            }
            span {
              float: right;
            }
          }
          .edit {
            border: 1px solid #dddddd;
            color: #666666;
            width: 40px;
            line-height: 22px;
            text-align: center;
            display: block;
            border-radius: 4px;
            float: left;
            margin-right: 15px;
            cursor: pointer;
          }
        }
      }
      .delete {
        background-color: #e9573e;
        color: #fff;
        width: 56px;
        line-height: 30px;
        text-align: center;
        display: block;
        border-radius: 4px;
        float: left;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
