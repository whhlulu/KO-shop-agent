<template>
	<!-- 发货地址 -->
	<div class="logistics fl">
		<div class="t_tab">
			<h1 class="t_title">
				<span class="size16">仓库列表</span>
				<div @click="to" class="t_add fr">添加发货地址</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>1.点击右上角添加按钮即可添加发货地址</p>
				</div>
			</div>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Commodity-management" style="margin-bottom:20px;">
				<tr>
					<td width="10%" align="right">关键字 ：</td>
					<td width="40%">
						<el-input v-model="search_name" placeholder="请输入内容" clearable style="width: 350px;height: 40px;">
						</el-input>
					</td>
					<td width="50%">
						<el-button type="success" @click="search">搜索</el-button>
					</td>
				</tr>
			</table>
			<el-table border :data="addressListData" style="width: 100%" max-width="900">
				<el-table-column fixed prop="id" width="50" label="ID">
				</el-table-column>
				<el-table-column show-overflow-tooltip prop="stock_name" width="150" label="仓库名称">
				</el-table-column>
				<el-table-column prop="cityName" width="80" label="发货地址" show-overflow-tooltip>
				</el-table-column>
				<el-table-column show-overflow-tooltip prop="address_detail" label="详细地址">
				</el-table-column>
				<el-table-column width="70" label="是否启用">
					<template slot-scope="scope">
						<el-switch disabled v-model="isStatus[scope.$index]" active-color="#13ce66" inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column width="70" label="是否默认">
					<template slot-scope="scope">
						<el-switch v-model="isDef[scope.$index]" active-color="#13ce66" inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column width="150" label="添加时间">
					<template slot-scope="scope">
						<time-Plunge :timePlunge="scope.row.create_time"></time-Plunge>
					</template>
				</el-table-column>
				<el-table-column width="150" label="更新时间">
					<template slot-scope="scope">
						<time-Plunge :timePlunge="scope.row.update_time"></time-Plunge>
					</template>
				</el-table-column>
				<el-table-column width="140" label="操作">
					<template slot-scope="scope">
						<el-button @click="edit(scope.row.id)" size="mini" type="success" icon="el-icon-edit"></el-button>
						<el-button @click="deleteItem(scope.row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
import timePlunge from "../../../page/time";
export default {
	name: 'ship',
	data() {
		return {
			v: true,
			value1: false,
			search_name: '',
			addressListData: [],
			isStatus: [],
			isDef: []
		}
	},
	components: {
		timePlunge,
	},
	created() {
		this.getAddressListData();
	},
	mounted() {
		
	},
	methods: {
		to() {
			this.$router.push({
				name: 'addAddress',
				params: {
					status: 0
				}
			});
		},
		search() {
			this.$HTTP(this.$httpConfig.getAddressListSearch,{
				stock_name: this.search_name
			}).then((res)=>{
				let list = res.data.data;
				this.addressListData = list;
				for (let i = 0; i < list.length; i++) {
					this.isStatus[i] = Number(list[i].status) == 1 ? true : false;
					this.isDef[i] = Number(list[i].def) == 1 ? true : false;
				}
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		//进入页面获取所有的数据
		getAddressListData() {
			this.$HTTP(this.$httpConfig.getAddressList,{}).then((res) => {
				let list = res.data.data;
				this.addressListData = list;
				for (let i = 0; i < list.length; i++) {
					this.isStatus[i] = Number(list[i].status) == 1 ? true : false;
					this.isDef[i] = Number(list[i].def) == 1 ? true : false;
				}
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		edit: function (value) {
			this.$router.push({
				name: 'addAddress',
				params: {
					status: 1,
					id: value
				}
			});
		},
		deleteItem(value) {
			this.$confirm('此操作将永久删除此店铺导航，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$HTTP(this.$httpConfig.setAddressDel,{id:value}).then((res) => {
					this.$message.success(res.data.message);
					this.search();
				}).catch((err) => {
					this.$message.error(err);
				});
			}).catch(() => {
				this.$message.info('已取消删除');
			});
		}
	},
}
</script>
<style lang="less">
.logistics {
  padding-bottom: 80px;
}
body {
  overflow: inherit;
}
/*表格内容居中*/
.el-table th > .cell,
.el-table .cell {
  text-align: center;
}
.el-switch {
  padding: 0;
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
  }
}
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
