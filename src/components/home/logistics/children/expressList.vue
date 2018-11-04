<template>
	<!-- 快递公司列表 -->
	<div class="logistics fl">
		<div class="t_tab">
			<h1 class="t_title">
				<span class="size16">快递公司列表</span>
				<div @click="to" class="t_add fr">添加快递公司</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>1.点击右上角添加按钮即可添加快递公司</p>
				</div>
			</div>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Commodity-management line-height5" style="margin-bottom:20px;">
				<tr>
					<td width="10%" align="right">关键字 ：</td>
					<td width="40%">
						<el-input v-model="searchName" placeholder="请输入内容" clearable style="width: 350px;height: 40px;">
						</el-input>
					</td>
					<td width="50%">
						<el-button type="success" @click="search">搜索</el-button>
					</td>
				</tr>
			</table>
			<el-table border :data="dataTable" style="width: 100%" max-width="900">
				<el-table-column fixed prop="id" width="50" label="ID">
				</el-table-column>
				<el-table-column width="200" prop="name" label="快递公司名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="code" label="快递公司编码" show-overflow-tooltip>
				</el-table-column>
				<el-table-column width="300" prop="url" label="快递公司url" show-overflow-tooltip>
				</el-table-column>
				<el-table-column width="70" label="是否启用">
					<template slot-scope="scope">
						<el-switch v-model="isStatus[scope.$index]" active-color="#13ce66" @click.native="funStatus(scope.row.id,isStatus[scope.$index],scope.$index)" inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column width="70" label="是否常用">
					<template slot-scope="scope">
						<el-switch v-model="isOrder[scope.$index]" active-color="#13ce66" @click.native="funOrder(scope.row.id,isOrder[scope.$index],scope.$index)" inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="是否支持服务站配送">
					<template slot-scope="scope">
						<el-switch v-model="isZt_state[scope.$index]" active-color="#13ce66" @click.native="funZsStatus(scope.row.id,isZt_state[scope.$index],scope.$index)" inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
			</el-table>
			<div class="page_size">
				<el-pagination background layout="total,prev, pager, next,jumper" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'express',
	data() {
		return {
			searchName: '',
			dataTable: [],
			page_size: 0, //每页显示几个
			page: 0, //总页数
			currentPage: 1, //当前页
			isStatus: [],
			isOrder: [],
			isZt_state: []
		}
	},
	created() {
		this.getData();
		
	},
	methods: {
		/*翻面跳转*/
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage;
			this.getData();
		},
		// 是否启用
		funStatus(id, status, index) {
			this.$HTTP(this.$httpConfig.setExpressStatus,{
				id: id,
				status: Number(status)
			}).then((res) => {
				this.isStatus[index] = status;
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		// 是否常用
		funOrder(id, status, index) {
			this.$HTTP(this.$httpConfig.setExpressOrder,{
				id: id,
				order: Number(status)
			}).then((res) => {
				this.isOrder[index] = status;
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		// 是否支持服务站配送
		funZsStatus(id, status, index) {
			this.$HTTP(this.$httpConfig.setExpressZtState,{
				id: id,
				zt_state: Number(status)
			}).then((res) => {
				this.isZt_state[index] = status;
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		to() {
			this.$router.push({
				name: 'addExpress',
				// params: {
				//     status: 0
				// }
			});
		},
		getData() {
			this.$HTTP(this.$httpConfig.getExpressList+ '/page/' + this.currentPage,{}).then((res) => {
					let list = res.data.data.data;
					this.getStatus(list);
					this.page_size = list.length;
					this.page = Number(res.data.data.page * list.length);
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$message.error(err);
				});
		},
		search() {
			this.$HTTP(this.$httpConfig.getExpressListSearch,{
				page: this.page,
				name: this.searchName
			}).then((res) => {
				let list = res.data.data.data;
				this.getStatus(list);
				this.page_size = list.length;
				this.page = Number(res.data.data.page * list.length);
				console.log(this.dataTable);
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		getStatus(list) {
			for (let i = 0; i < list.length; i++) {
				this.isStatus[i] = Number(list[i].status) == 1 ? true : false;
				this.isOrder[i] = Number(list[i].order) == 1 ? true : false;
				this.isZt_state[i] = Number(list[i].zt_state) == 1 ? true : false;
			}
			this.dataTable = list;
		}
	}
}
</script>
<style>
.page_size {
  text-align: center;
  padding: 20px;
  width: 95%;
}
</style>
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
      text-indent: 30px;
    }
  }
}
</style>

<style lang="less" scoped>
.logistics {
  width: 1000px;
  .Commodity-management {
    background-color: #f6f6f6;
    border: 1px solid #dddddd;
    margin-top: 15px;
    line-height: 50px;
    margin-bottom: 20px;
  }
}
</style>