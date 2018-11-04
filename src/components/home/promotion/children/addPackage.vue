<template>
	<div class="logistics fl">
		<!-- 添加优惠套餐 -->
		<div class="t_tab">
			<h1 class="t_title">
                <span v-if="!status" class="size16">添加优惠套餐</span>
                <span v-else class="size16">修改优惠套餐</span>
                <div class="t_m fr" @click="to">返回优惠套餐</div>
           </h1>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="logistics_x">
				<tr>
					<td align="right" class="black"><b>*</b>套餐名称：</td>
					<td>
						<el-input style="width: 600px;" clearable v-model="params.title"></el-input>
					</td>
				</tr>
				<tr>
					<td align="right" class="black"><b>*</b>商品列表：</td>
					<td>
						<el-button type="success" @click.native="select">选择商品</el-button>
						<el-dialog title="商品列表(最多选择5个)" :visible.sync="dialogTableVisible">
							<el-table @selection-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable" :data="girdData" width="700" height="300">
								<el-table-column type="selection" width="55"></el-table-column>
								<el-table-column show-overflow-tooltip prop="title" label="商品名称"></el-table-column>
								<el-table-column prop="price_market" label="普通价"></el-table-column>
								<el-table-column prop="price_member" label="会员价"></el-table-column>
								<el-table-column prop="stock" label="库存"></el-table-column>
							</el-table>
							<div class="page_size">
								<el-pagination background layout="total,prev, pager, next,jumper" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
								</el-pagination>
								<el-button class="select-submit-btn" @click="submitSelect" type="success">确认</el-button>
							</div>
						</el-dialog>
					</td>
				</tr>
				<tr>
					<td align="right" class="black">已选择的商品： </td>
					<td>
						<el-table v-if="!status" :data="hasCityData" border style="width: 99%;">
							<el-table-column show-overflow-tooltip prop="title" label="商品名称" width="200">
							</el-table-column>
							<el-table-column label="优惠后普通价" width="150">
								<template slot-scope="scope">
									<el-input @change="getPrice(scope.$index,scope.row.discount,scope.row.id)" v-model.number="scope.row.discount" clearable>
									</el-input>
								</template>
							</el-table-column>
							<el-table-column prop="price_market" label="普通价"></el-table-column>
							<!-- <el-table-column label="优惠后会员价" width="150">
								<template slot-scope="scope">
									<el-input @change="getPrice(scope.$index,scope.row.discount1)" v-model.number="scope.row.discount1" clearable>
									</el-input>
								</template>
							</el-table-column> -->
							<el-table-column prop="price_member" label="会员价"></el-table-column>
							<el-table-column prop="stock" label="库存" width="100">
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button @click="deleteItem(scope.row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-table v-else :data="updateGoods" border style="width: 97%">
							<el-table-column show-overflow-tooltip prop="title" label="商品名称" width="400">
							</el-table-column>
							<el-table-column label="优惠后价格" width="150">
								<template slot-scope="scope">
									<el-input @change="getPrice(scope.$index,scope.row.discount,scope.row.id)" v-model.number="scope.row.discount" clearable>
									</el-input>
								</template>
							</el-table-column>
							<el-table-column prop="price_market" label="价格"></el-table-column>
							<el-table-column prop="stock" label="库存" width="150">
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button @click="deleteItem2(scope.row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
								</template>
							</el-table-column>
						</el-table>
					</td>
				</tr>
				<tr>
					<td align="right" class="black">价格：</td>
					<td>
						<span class="notes">优惠后普通价 ：￥ <span style="color: red;">{{(params.discount).toFixed(2)}}</span> 元</span>
						<span class="notes">普通价总价 ：￥ <span style="color: red;">{{(params.total).toFixed(2)}}</span> 元</span>
						<!-- <span class="notes">优惠后会员价 ：￥ <span style="color: red;">{{(discount1).toFixed(2)}}</span> 元</span> -->
						<span v-if="!status" class="notes">会员价总价 ：￥ <span style="color: red;">{{(total1).toFixed(2)}}</span> 元</span>
					</td>
				</tr>
				<tr>
					<td align="right">&nbsp;</td>
					<td colspan="2">
						<el-button type="success" @click="submit" size="small">确认提交</el-button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'addservicemanage',
		data() {
			return {
				radio: '1',
				girdData: [],
				hasCityData: [], //已经存在于服务器的地区数据
				multipleSelection: [],
				hasCityId: [], //已存在/选中的数据，只有ID
				status: 0, //0代表是新增，1代表是修改
				id: 0,
				params: {
					title: '',
					total: 0,
					discount: 0,
					goods: []
				},
				goods_info:{},
				discount1:0,
				total1:0,
				dialogTableVisible: false,
				updateGoods: [],
				page_size: 0, //每页显示几个
				page: 0, //总页数
				currentPage: 1, //当前页
				mark:false
			}
		},
		created() {},
		mounted() {
			
			this.status = this.$route.params.status;
			if(this.status) {
				/*修改*/
				this.id = this.$route.params.id;
				this.queryData();
			}
		},
		methods: {
			getPrice(index, value,id) {
				if(this.mark){
					this.params.goods.push({goods_id:id,package_price:value})
				}else{
					this.goods_info[id].package_price = value;
					let listKey = Object.keys(this.goods_info);
					for (const i in listKey) {
						if (this.goods_info[listKey[i]]) {
							if(this.mark){
								this.params.goods.push(this.goods_info[listKey[i]])
							}else{
								this.params.goods[i]= this.goods_info[listKey[i]];
							}
						}	
					}
				}
				this.params.discount = 0;
				this.params.total = 0;
				this.discount1 = 0;
				this.total1 = 0;
				// this.params.goods[index].package_price = value;
				this.getNewPrice();
			},
			getNewPrice(){
				if(!this.status) {
					for(var i in this.hasCityData) {
						this.params.discount += Number(this.hasCityData[i].discount);
						this.params.total += Number(this.hasCityData[i].price_market);
						this.discount1 += Number(this.hasCityData[i].discount1);
						this.total1 += Number(this.hasCityData[i].price_member);
					}
				} else {
					for(var i in this.updateGoods) {
						this.params.discount += Number(this.updateGoods[i].discount);
						this.params.total += Number(this.updateGoods[i].price_market);
					}
				}
			},
			queryData() {
				this.$HTTP(this.$httpConfig.getPackageDetail,{id: this.id}).then((res) => {
					var list = res.data.data.goods_info;
					this.mark = true;
					for(var i in list) {
						list[i].id = list[i].goods_id
						this.updateGoods.push(list[i]);
						this.params.goods.push({
							goods_id: list[i].goods_id,
							package_price:list[i].discount
						});
						this.goods_info[list[i].goods_id] = {goods_id: list[i].goods_id,package_price:''};
						this.hasCityId.push(list[i].goods_id);
					}
					this.params.total = res.data.data.total_price;
					this.params.discount = res.data.data.total_discount;
					this.params.title = res.data.data.package_name;
					this.$message.success(res.data.message);
				})
				.catch((err) => {
					this.$message.error(err);
				});
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			submitSelect() {
				let groupId = [];
				for(var i in this.multipleSelection) {
					groupId.push(this.multipleSelection[i].id);
					this.multipleSelection[i].discount = '0.00';
					this.multipleSelection[i].discount1 = '0.00';
					this.multipleSelection[i].goods_id = this.multipleSelection[i].id;
					this.params.total += Number(this.multipleSelection[i].discount);
					if(this.mark){
						for (var n in this.params.goods) {
							if(this.multipleSelection[i].id == this.params.goods[n].goods_id){
								this.$message({
									message: '请勿添加已添加过的商品',
									type: 'warning'
								});
								return;
							}
						}
					}
					if(this.goods_info[this.multipleSelection[i].id]){
						this.$message({
								message: '请勿添加已添加过的商品',
								type: 'warning'
							});
							return;
					}else{
						this.goods_info[this.multipleSelection[i].id] = {goods_id: this.multipleSelection[i].id,package_price:''};
					}
				}
				if(this.status) {
					for(var i in this.multipleSelection){
						this.updateGoods.push(this.multipleSelection[i]);
					}
				} else {
					for(var i in this.multipleSelection){
						this.params.goods.push({goods_id:this.multipleSelection[i].id,package_price:''})
						this.hasCityData.push(this.multipleSelection[i]);
					}
				}
				this.hasCityId = groupId;
				this.dialogTableVisible = false;
			},
			to() {
				this.$router.back();
			},
			deleteItem(id) {
				delete this.goods_info[id];
				for(var i in this.params.goods){
					if(this.params.goods[i].goods_id == id){
						this.params.goods.splice(i,1);
					}
				}
				for(var i in this.hasCityData) {
					if(this.hasCityData[i].id == id) {
						this.hasCityData.splice(i, 1);
						this.hasCityId.splice(i, 1);
					}
				}
				this.getNewPrice();
			},
			deleteItem2(id) {
				delete this.goods_info[id];
				for(var i in this.params.goods){
					if(this.params.goods[i].goods_id == id){
						this.params.goods.splice(i,1);
					}
				}
				/*编辑时的删除*/
				for(var i in this.updateGoods) {
					if(this.updateGoods[i].goods_id == id) {
						this.updateGoods.splice(i, 1);
						this.hasCityId.splice(i, 1);
					}
				}
				this.getNewPrice();
			},
			/*页面跳转*/
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.select();
			},
			submit() {
				var that = this;
				if(this.params.title == ''){
					this.$message.error('请输入标题!');
					return ;
				}else if(this.params.goods.length == 0){
					this.$message.error('至少选择1个商品!');
					return ;
				}else{
					if(this.status) {
						this.params.goods = [];
						for (const key in this.updateGoods) {
							this.params.goods.push({
								goods_id: this.updateGoods[key].goods_id,
								package_price:this.updateGoods[key].discount
							})
						}
						this.params.id = this.id;
						this.$HTTP(this.$httpConfig.savePackage,this.params).then((res) => {
							this.$message.success(res.data.message + ",即将跳转回列表页面");
							setTimeout(function() {
								// that.to();
							}, 1000);
						}).catch((err) => {
							this.$message.error(err);
						})
					} else {
						this.$HTTP(this.$httpConfig.addPackage,this.params).then((res) => {
							this.$message.success(res.data.message + ",即将跳转回列表页面");
							setTimeout(function() {
								that.to();
							}, 1000);
						}).catch((err) => {
							this.$message.error(err);
						})
					}
				}
			},
			select() {
				this.$HTTP(this.$httpConfig.getPromotionGoods,{page:this.currentPage}).then((res) => {
					let list = res.data.data.goods;
					this.hasCityId = [];
					this.girdData = [];
					for(var i in list) {
						this.girdData.push(list[i]);
					}
					this.page_size = res.data.data.page_size;
					this.page = Number(res.data.data.count);
					this.$message.success(res.data.message);
					this.dialogTableVisible = true;
				}).catch((err) => {
					this.$message.error(err);
				})
			}
		}
	}
</script>
<style type="text/css">
	.el-table__empty-block{
		height: 0;
	}
	/*分页*/
	.page_size {
		text-align: center;
		padding: 20px;
		width: 95%;
	}
	/*分页中的确认按钮*/
	.select-submit-btn {
		margin-top: 20px;
	}
	/*名称项超出隐藏*/
	
	#name-single {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	/*表格内容居中*/
	
	.el-table th>.cell,
	.el-table .cell {
		text-align: center;
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
		}
	}
	
	.el-switch {
		.el-switch__core {
			width: 35px!important;
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
	.logistics {
		width: 1000px;
		.t_m {
			background: url(../../../../assets/return.jpg) no-repeat 15px #ff9f24;
			width: 135px;
			height: 32px;
			border: 1px solid #ff920b;
			border-radius: 4px;
			font-size: 12px;
			font-weight: normal;
			cursor: pointer;
			color: #FFF;
			line-height: 32px;
			text-indent: 40px;
		}
		.Commodity-management {
			background-color: #f6f6f6;
			border: 1px solid #dddddd;
			margin-top: 15px;
			line-height: 50px;
			margin-bottom: 20px;
			input {
				width: 140px;
				border: 1px solid #ddd;
				line-height: 29px;
				height: 29px;
				color: #999;
				text-indent: 5px;
			}
		}
		.bold {
			font-weight: bold;
		}
		.black {
			color: #333;
		}
		.logistics_x {
			margin-left: 10px;
			tr {
				td {
					padding: 10px 0;
					.ss {
						margin: 0;
					}
					b {
						color: #ff0000;
					}
					.notes {
						padding-left: 15px;
						i {
							cursor: pointer;
							color: #87e1ff;
						}
					}
					input,
					select {
						text-indent: 5px;
						width: 288px;
						height: 32px;
						border: 1px solid #cccccc;
					}
					textarea {
						padding-left: 5px;
						padding-top: 5px;
						min-height: 50px;
						border: 1px solid #cccccc;
					}
					.abstract {
						min-height: 70px;
					}
					.Settled {
						height: 32px;
						line-height: 32px;
						color: #FFF;
						text-align: center;
						display: block;
						border-radius: 6px;
						margin-top: 30px;
						float: left;
						margin-right: 20px;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>