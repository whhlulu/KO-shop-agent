<template>
	<!-- 运费模板列表 -->
	<div class="logistics fl">
		<div class="t_tab">
			<h1 class="t_title">
				<span class="size16">运费模板列表</span>
				<div @click="to" class="t_add fr">添加运费模板</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>1.运费模板：是为一批商品设置同一个运费，当需要修改运费时，这些关联的商品的运费将一起被修改</p>
					<p>2.点击包邮设置时选择的地区会自动匹配用户收货地址</p>
					<p>2.卖家包邮时邮费为0元</p>
					<p>3.勾选了“指定条件包邮”后按包邮条件计算运费</p>
				</div>
			</div>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Commodity-management line-height5" style="margin-bottom:20px;">
				<tr>
					<td width="10%" align="right">关键字 ：</td>
					<td width="30%">
						<el-input v-model="search_name" placeholder="请输入内容" clearable style="width: 250px;height: 40px;">
						</el-input>
					</td>
					<td width="60%">
						<el-button type="success" @click="search">搜索</el-button>
					</td>
				</tr>
			</table>
			<el-table border :data="tabldData" style="width: 100%" max-width="900">
				<el-table-column fixed prop="id" width="50" label="ID">
				</el-table-column>
				<el-table-column show-overflow-tooltip prop="express_title" width="200" label="模板名称">
				</el-table-column>
				<el-table-column prop="stock_name" label="仓库" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="send_time" label="几个小时内发货">
				</el-table-column>
				<el-table-column label="是否包邮">
					<template slot-scope="scope">
						{{isType[scope.$index]}}
					</template>
				</el-table-column>
				<el-table-column label="计价方式">
					<template slot-scope="scope">
						{{isMethod[scope.$index]}}
					</template>
				</el-table-column>
				<el-table-column label="指定条件包邮">
					<template slot-scope="scope">
						<el-switch disabled v-model="isFree_shipping[scope.$index]" active-color="#13ce66" inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column fixed="right" width="250" label="操作">
					<template slot-scope="scope">
						<el-button @click="editItem(scope.row.id)" size="mini" type="success" icon="el-icon-edit"></el-button>
						<el-button @click="deleteItem(scope.row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
						<el-button v-show="scope.row.is_free_shipping == '1'" @click="setItem(scope.row.id)" size="mini" type="warning">包邮设置</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
export default {
	name: 'freightTemplet',
	data() {
		return {
			value: false,
			tabldData: [],
			search_name: '',
			isFree_shipping: [],
			isType: [],
			isMethod: [],
		}
	},
	mounted() {
		
		this.getData();
	},
	methods: {
		to() {
			this.$router.push({
				name: 'addFreightTemplet',
				params: {
					status: 0
				}
			});
		},
		editItem(value) {
			this.$router.push({
				name: 'addFreightTemplet',
				params: {
					status: 1,
					id: value
				}
			});
		},
		setItem(value) {
			this.$router.push({
				name: 'addFreightTempletPostage',
				params: {
					status: 1,
					id: value
				}
			})
		},
		deleteItem(value) {
			this.$confirm('此操作将永久删除此店铺导航，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$HTTP(this.$httpConfig.delFreight,{id: value}).then((res) => {
					this.$message.success(res.data.message);
					this.getData();
				}).catch((err) => {
					this.$message.error(err);
				});
			}).catch(() => {
				this.$message.info('已取消删除');
			});
		},
		search() {
			this.$HTTP(this.$httpConfig.getFreightSearch,{express_title: this.search_name}).then((res) => {
				let list = res.data.data;
				this.tabldData = list;
				for (let i = 0; i < list.length; i++) {
					this.isFree_shipping[i] = Number(list[i].is_free_shipping) == 1 ? true : false;
					this.isType[i] = Number(list[i].is_select_condition) == 1 ? '卖家包邮' : '自定义运费';
					switch (Number(list[i].valuation_method)) {
						case 0:
							this.isMethod[i] = '按件';
							break;
						case 1:
							this.isMethod[i] = '按重量 ';
							break;
						case 2:
							this.isMethod[i] = '按体积';
							break;
						default:
					}
				}
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		getData() {
			this.$HTTP(this.$httpConfig.getFreightList,{}).then((res) => {
				let list = res.data.data;
				this.tabldData = list;
				for (let i = 0; i < list.length; i++) {
					this.isFree_shipping[i] = Number(list[i].is_free_shipping) == 1 ? true : false;
					this.isType[i] = Number(list[i].is_select_condition) == 1 ? '卖家包邮' : '自定义运费';
					switch (Number(list[i].valuation_method)) {
						case 0:
							this.isMethod[i] = '按件';
							break;
						case 1:
							this.isMethod[i] = '按重量 ';
							break;
						case 2:
							this.isMethod[i] = '按体积';
							break;
						default:
					}
				}
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
	}
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