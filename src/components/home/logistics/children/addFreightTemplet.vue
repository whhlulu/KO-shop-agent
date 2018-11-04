<template>
	<div class="logistics fl">
		<!-- 添加运费模板 -->
		<div class="t_tab">
			<h1 class="t_title">
            <span v-if="!status" class="size16">添加运费模板</span>
            <span v-else class="size16">修改运费模板</span>
            <div @click="to" class="t_m fr">返回运费模板列表</div>
        </h1>
			<el-form class="form" label-width="180px" :model="params">
				<el-form-item label="模板名称">
					<el-input style="width: 600px;" v-model="params.express_title" clearable></el-input>
				</el-form-item>
				<el-form-item label="仓库">
					<el-select v-model="params.stock_id" filterable placeholder="请选择">
						<el-option v-for="item in classData" :key="item.id" :label="item.stock_name" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="发货时间">
					<el-input style="width: 600px;" v-model="params.send_time" clearable></el-input>
					<span>几小时内发货</span>
				</el-form-item>
				<el-form-item label="是否包邮">
					<el-radio border v-model="params.is_select_condition" label="0">自定义运费</el-radio>
					<el-radio border v-model="params.is_select_condition" label="1">卖家包邮</el-radio>
				</el-form-item>
				<el-form-item label="计价方式">
					<el-radio border v-model="params.valuation_method" label="0">按件数</el-radio>
					<el-radio border v-model="params.valuation_method" label="1">按重量</el-radio>
					<el-radio border v-model="params.valuation_method" label="2">按体积</el-radio>
				</el-form-item>
				<el-form-item label="是否指定条件包邮">
					<el-switch v-model="isFree"></el-switch>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="submit">确认提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'freightTemplet',
		data() {
			return {
				status: 0, //0代表是新增，1代表是修改
				params: {
					express_title: '',
					stock_id: 0,
					send_time: 1,
					is_free_shipping: '0',
					valuation_method: '0',
					is_select_condition: '1'
				},
				isFree: false,
				classData: [], //仓库数据
			}
		},
		mounted() {
			this.status = this.$route.params.status;
			if(this.status) {
				/*修改*/
				this.id = this.$route.params.id;
				this.queryData();
			}
		},
		created() {
			
			this.getClass();
		},
		methods: {
			deleteItem(rows) {
				console.log(rows)
				this.$confirm('此操作将删除' + rows.name + '这一项, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					for(var i in this.hasCityData) {
						console.log(this.hasCityData)
						if(this.hasCityData[i].id == rows.id) {
							this.hasCityData.splice(i, 1);
						}
						if(this.hasCityId[i] == rows.id) {
							this.hasCityId.splice(i, 1);
						}
					}
					this.$message.success("删除成功");
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			setFree() {
				//是否指定条件包邮
				if(this.isFree) {
					console.log('添加');
					this.getCity();
				}
			},
			to() {
				this.$router.back();
			},
			submit() {
				var that = this;
				this.params.is_free_shipping = Number(this.isFree);
				if(this.status) {
					this.$HTTP(this.$httpConfig.saveFreights,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 2000);
					}).catch((err) => {
						this.$message.error(err);
					})
				} else {
					this.$HTTP(this.$httpConfig.addFreights,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 2000);
					}).catch((err) => {
						this.$message.error(err);
					})
				}
			},
			queryData() {
				this.$HTTP(this.$httpConfig.getFreightsDetail,{id: this.id}).then((res) => {
					this.params = res.data.data;
					this.isFree = this.params.is_free_shipping == 1 ? true : false;
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$message.error(err);
				})
			},
			getClass() {
				//获取仓库
				this.$HTTP(this.$httpConfig.getAddressList,{}).then((res) => {
					if(!res.data.data) {
						this.$layer.msg('暂无数据:(');
						return;
					}
					this.classData = res.data.data;
				}).catch((err) => {
					console.log(err)
				});
			}
		}
	}
</script>
<style>
	.el-table-column--selection .cell {
		text-align: center;
	}
	
	.mainTable {
		width: 80%;
		width: 400px!important;
		height: 460px!important;
		overflow: scroll;
	}
	
	
	.add-box {
		width: 400px;
		height: 40px;
		position: absolute;
	}
	
	.el-popper[x-placement^=right] {
		width: 400px!important;
		height: 500px;
		position: relative;
		text-align: center;
	}
	
	.el-table__expanded-cell[class*=cell] {
		padding: 0!important;
	}
	
	.demo-table-expand {
		font-size: 0;
	}
	
	.demo-table-expand label {
		width: 500px;
		color: #99a9bf;
	}
	
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
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
			.t_m {
				background: url(../../../../assets/return.jpg) no-repeat 10px #ff9f24;
				width: 135px;
				height: 32px;
				border: 1px solid #ff920b;
				border-radius: 4px;
				font-size: 12px;
				font-weight: normal;
				cursor: pointer;
				color: #FFF;
				line-height: 32px;
				text-indent: 30px;
			}
		}
	}
</style>

<style lang="less" scoped>
	.logistics {
		width: 1000px;
	}
</style>