<template>
	<div class="logistics fl">
		<!-- 添加收货地址 -->
		<div class="t_tab">
			<h1 class="t_title">
				<span v-if="!status" class="size16">添加发货地址</span>
				<span v-else class="size16">修改发货地址</span>
				<div @click="to" class="t_m fr">返回发货地址列表</div>
			</h1>
			<el-form class="form" label-width="180px" :model="params">
				<el-form-item label="仓库名称">
					<el-input style="width: 600px;" v-model="params.stock_name" clearable></el-input>
				</el-form-item>
				<el-form-item label="发货仓所在地区">
					<city-three v-on:sendcityData="getCityData" :sendType="status" :sendParams="params"></city-three>
				</el-form-item>
				<el-form-item label="详细地址">
					<el-input style="width: 600px;" v-model="params.address_detail" clearable></el-input>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-switch v-model="params_status"></el-switch>
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
		name: 'ship',
		data() {
			return {
				v: true,
				value1: false,
				input10: '',
				classData: {}, // 一级分类
				classByTwo: [], // 二级分类数据
				classByThree: [], // 三级分类数据
				params: {
					stock_name: '',
					prov: '请选择',
					city: '请选择',
					dist: '请选择',
					address_detail: '',
					status: true,
					id: 0
				},
				params_status: false,
				status: 0, //0代表是新增，1代表是修改
				id: 0
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
		methods: {
			getCityData(data){
				this.params.prov = data.prov;
				this.params.city = data.city;
				this.params.dist = data.dist;
			},
			to() {
				this.$router.back();
			},
			queryData() {
				this.$HTTP(this.$httpConfig.getAddressDetail,{id:this.id}).then((res) => {
					this.$forceUpdate(); 
					this.params = res.data.data;
					this.params_status = !Number(!Number(this.params.status));
					this.$message.success(res.data.message);
				})
			},
			submit() {
				var that = this;
				this.params.status = this.params_status;
				if(this.status) {
					let status = Number(this.params.status);
					this.params.status = status;
					this.$HTTP(this.$httpConfig.saveAddress,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 2000);
					})
					.catch((err) => {
						this.$message.error(err);
					});
				} else {
					let status = Number(this.params.status);
					this.params.status = status;
					this.$HTTP(this.$httpConfig.addAddress,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 2000);
					})
					.catch((err) => {
						this.$message.error(err);
					});
				}
			},
		},
	}
</script>
<style type="text/css" scoped="scoped">

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
	.city{
		width:100px;
		height: 20px;
	}
</style>