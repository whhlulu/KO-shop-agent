<template>
	<!-- 运费设置列表 -->
	<div class="logistics fl">
		<div class="t_tab">
			<h1 class="t_title">
				<span class="size16">运费设置列表</span>
				<div @click="to" class="t_add fr">添加运费设置</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>1.运费模板设置，是为第三方快递、自行配送等配送方式共用的运费模板</p>
					<p>2.选择模板之后地区要和运费模板中的地区一样</p>
					<p>3.发布商品时，需关联运费模板；会员购买商品，会根据当前商品的运费模板售卖区域进行确定有货无货</p>
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
				<el-table-column prop="freight_name" width="200" label="运费模板">
				</el-table-column>
				<el-table-column prop="first_thing" label="首件">
				</el-table-column>
				<el-table-column prop="first_weight" label="首重">
				</el-table-column>
				<el-table-column prop="frist_volum" label="首体积">
				</el-table-column>
				<el-table-column prop="frist_money" label="首运费">
				</el-table-column>
				<el-table-column prop="continued_heavy" label="续重">
				</el-table-column>
				<el-table-column prop="continued_volum" label="续体积">
				</el-table-column>
				<el-table-column prop="continued_money" label="续费">
				</el-table-column>
				<el-table-column fixed="right" width="150" label="操作">
					<template slot-scope="scope">
						<el-button @click="editItem(scope.row.id)" size="mini" type="success" icon="el-icon-edit"></el-button>
						<el-button @click="deleteItem(scope.row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
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
	name: 'freightTemplet',
	data() {
		return {
			value: false,
			tabldData: [],
			search_name: '',
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
		/*翻面跳转*/
		handleCurrentChange: function (currentPage) {
			this.currentPage = currentPage;
			this.getData();
		},
		show() {
			this.$store.state.add_region = true;
		},
		to() {
			this.$router.push({
				name: 'addFreight',
				params: {
					status: 0
				}
			});
		},
		getData() {
			this.$HTTP(this.$httpConfig.getFreightModelList,{}).then((res) => {
				let list = res.data.data.data;
				this.tabldData = list;
				this.page_size = list.length;
				this.page = Number(res.data.data.page * list.length);
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		search() {
		this.$HTTP(this.$httpConfig.getFreightModelSearch,{title: this.search_name}).then((res) => {
				let list = res.data.data.data;
				this.tabldData = list;
				this.page_size = list.length;
				this.page = Number(res.data.data.page * list.length);
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		editItem(value) {
			this.$router.push({
				name: 'addFreight',
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
				this.$HTTP(this.$httpConfig.delFreightModel,{id: value}).then((res) => {
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