<template>
	<!-- 角色管理-->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">用户组列表</span>
				<i>（ 共 {{page}} 条记录 ）</i>
				<div class="t_add fr" @click="tolink">添加用户组</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>1.用户组代表用户人员的类型</p>
					<p>2.正在使用中的角色不可进行删除操作</p>
				</div>
			</div>
			<el-table border ref="multipleTable" :data="accountList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="ID" prop="id" width="60">
				</el-table-column>
				<el-table-column prop="title" label="角色名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="explain" label="角色说明" show-overflow-tooltip>
				</el-table-column>
				<el-table-column width="200" label="操作">
					<template slot-scope="scope">
						<el-button slot="reference" @click="edit(scope.row.id)" size="mini" icon="el-icon-edit"></el-button>
						<el-button size="mini" icon="el-icon-delete" @click="clear(scope.row.id)"></el-button>
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
import timePlunge from '@/components/page/time';
export default {
	name: 'servicemanage',
	data() {
		return {
			accountList: [],
			page: 0, //共多少页
			currentPage: 1, //当前页
			page_size: 0, //每页显示多少条数据
			clearList: [], //批量删除
		}
	},
	created() {
		this.getData();
	},
	methods: {
		handleSelectionChange(val) {
			if (val.length != 0) {
				for (let index = 0; index < val.length; index++) {
					this.clearList.push(val[index].id)
				}
			} else {
				this.clearList = [];
			};
		},
		getData() {
			//账号列表
			
			this.$HTTP(this.$httpConfig.getRoleList,{page: this.currentPage}).then((res) => {
				this.page_size = res.data.data.page_size;
				this.page = parseInt(res.data.data.count);
				this.accountList = res.data.data.list;
			}).catch((err) => {
				console.log(err);
			})
		},
		// 单个删除
		clear(id) {
			this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				
				this.$HTTP(this.$httpConfig.delRole,{id: id}).then((res) => {
					this.$message({
						duration: 1000,
						type: 'success',
						message: res.data.message
					});
					this.getData();
				}).catch((err) => {
					console.log(err);
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		//批量删除
		deleteAll() {
			if (this.clearList.length === 0) return false;
			this.$confirm('此操作将永久删除选中账号, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$HTTP(this.$httpConfig.delAllAccount,{id: this.clearList}).then((res) => {
					this.$message({
						duration: 1000,
						type: 'success',
						message: res.data.message
					});
					this.getData();
				}).catch((err) => {
					console.log(err);
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		/*页面跳转*/
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage;
			this.getData();
		},
		tolink() {
			this.$router.push({
				name: 'addrole',
				params: {
					id: 'add'
				}
			});
		},
		//编辑
		edit(id) {
			this.$router.push({
				name: 'addrole',
				params: {
					id: id
				}
			})
		},
		//跳转到权限页面
		Jurisdiction() {
			this.$router.push({
				name: 'jurisdiction'
			})
		}
	},
	components: {
		timePlunge
	}

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
    i {
      color: #999;
    }
  }
}
/*表格内容居中*/

.el-table th > .cell,
.el-table .cell {
  text-align: center;
}
</style>
<style lang="less" scoped>
.classify {
  width: 1000px;
  padding-bottom: 80px;
  .g_att {
    .t_add {
      background: url(../../../../assets/plus2.jpg) no-repeat 30px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 46px;
    }
    .page {
      overflow: hidden;
      padding-top: 20px;
    }
  }
}
</style>