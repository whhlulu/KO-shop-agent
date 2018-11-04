<template>
	<!-- 客服-系统信息-->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">系统信息 - 站内信</span>
				<i>（ 共 {{dataTable.length}} 条记录 ）</i>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>店铺超级管理员可看全部消息</p>
					<p>只有店铺超级管理员可删除消息，删除后，其它子账号管理员的该条信息也将被删除</p>
				</div>
			</div>
			<el-table border :data="dataTable" style="width: 100%" max-width="900">
				<el-table-column fixed prop="id" width="50" label="ID">
				</el-table-column>
				<el-table-column prop="sm_content" label="消息内容" show-overflow-tooltip>
				</el-table-column>
				<el-table-column width="140" label="发送时间">
					<template slot-scope="scope">
						<time-Plunge :timePlunge="scope.row.sm_addtime"></time-Plunge>
					</template>
				</el-table-column>
				<el-table-column fixed="right" width="150" label="操作">
					<template slot-scope="scope">
						<el-button @click="deleteItem(scope.row.id)" size="mini" icon="el-icon-delete"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="Paging">
			<div class="Paging_r">
				<el-pagination background layout="total,prev, pager, next,jumper" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import timePlunge from "../../../page/time";
export default {
	name: 'servicetype',
	data() {
		return {
			dataTable: [],
			page_size: 0,
			page: 0,
			currentPage: 1,
		}
	},
	components: {
		timePlunge,
	},
	mounted() {
		
		this.getData();
	},
	methods: {
		tolink() {
			this.$router.push({
				name: 'addservicetype',
				// params: {
				//     status: 0
				// }
			});
		},
		getData() {
			this.$HTTP(this.$httpConfig.getSystemMsg,{}).then((res) => {
				this.dataTable = res.data.data.data;
				this.page_size = parseInt(res.data.data.page_size);
				this.page = parseInt(res.data.data.page);
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			})
		},
		/*页面跳转*/
		handleCurrentChange: function (currentPage) {
			console.log(currentPage);
			this.currentPage = currentPage;
			this.getGoodsList();
		},
		deleteItem(value) {
			console.log(value);
			this.$confirm('此操作将永久删除此消息，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$HTTP(this.$httpConfig.delSystemMsg,{id: value}).then((res) => {
					console.log(res.data);
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
/*表格内容居中*/
.el-table th > .cell,
.el-table .cell {
  text-align: center;
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
  .el-switch__label {
    color: #a4a5a7;
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
.Paging_r {
  float: right;
  padding: 10px;
}
.classify {
  width: 1042px;
  padding-bottom: 80px;
  .g_att {
    .list {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-top: 15px;
      tr {
        td {
          padding: 15px 0;
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
        margin-left: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
