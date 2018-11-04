<template>
	<!-- 促销-编辑/添加购物券 -->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
          <span v-if="!status" class="size16">优惠券管理 - 添加优惠券</span>
          <span v-else class="size16">优惠券管理 - 修改优惠券</span>
          <div @click="to" class="t_m fr">返回满赠列表</div>
        </h1>
			<el-form class="form" label-width="180px" :model="params">
				<el-form-item label=" 优惠券名称">
					<el-input style="width: 600px;" v-model="params.name"></el-input>
				</el-form-item>
				<el-form-item label="优惠券面额">
					<el-input style="width: 600px;" v-model="params.money" clearable></el-input> 元
				</el-form-item>
				<el-form-item label="消费金额">
					<el-input style="width: 600px;" v-model="params.condition" clearable></el-input> 元
				</el-form-item>
				<el-form-item label="发放数量">
					<el-input style="width: 600px;" v-model="params.createnum" clearable></el-input> 个
				</el-form-item>
				<el-form-item label="发放类型">
					<el-radio border v-model="params.type" label="0">面额模板</el-radio>
					<el-radio border v-model="params.type" label="1">按用户发放</el-radio>
					<el-radio border v-model="params.type" label="2">注册</el-radio>
					<el-radio border v-model="params.type" label="3">邀请</el-radio>
					<el-radio border v-model="params.type" label="4">线下发放</el-radio>
				</el-form-item>
				<el-form-item label="开始时间">
					<el-date-picker :picker-options="pickerOptions1" v-model="params.use_start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-date-picker :picker-options="pickerOptions2" v-model="params.use_end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
					</el-date-picker>
					<span class="time-error" v-show="params.end_time<params.start_time">请不要让结束时间小于开始时间</span>
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
		name: 'addsales',
		data() {
			return {
				defaultMsg: '',
				config: {
					initialFrameWidth: null,
					initialFrameHeight: 350
				},
				params: {
					name: '',
					money: 0,
					condition: 0,
					type: '0',
					createnum: '',
					use_start_time: '',
					use_end_time: ''
				},
				status: 0, //0代表是新增，1代表是修改
				id: 0,
		        pickerOptions1: {
		            disabledDate(time) {
		                return time.getTime() > Date.now();
		            },
		            shortcuts: [{
		                text: '今天',
		                onClick(picker) {
		                picker.$emit('pick', new Date());
		                }
		            }],
		        },
		        pickerOptions2: {
		            disabledDate(time) {
		                return time.getTime() < Date.now();
		            }
		        }
			}
		},
		created() {
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
			tam2time(value) {
				var time = new Date(Number(value) * 1000);
				var Y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var H = time.getHours();
				var mi = time.getMinutes();
				var s = time.getSeconds();
				if(m < 10) {
				    m = '0' + m;
				}
				if(d < 10) {
				   d = '0' + d;
				}
				 if(H < 10) {
				   H = "0" + H;
				}
				if(mi < 10) {
				   mi = '0' + mi;
				}
				if(s < 10) {
				   s = "0" + s;
				}
				 return (Y + "-" + m + "-" + d + " " + H + ":" + mi + ":" + s);
			},
			queryData() {
				this.$HTTP(this.$httpConfig.getCouponsDetail,{id: this.id}).then((res) => {
						this.params = res.data.data;
						this.params.use_start_time = this.tam2time(this.params.use_start_time);
						this.params.use_end_time = this.tam2time(this.params.use_end_time);
						console.log(this.params);
						this.$message.success(res.data.message);
					})
					.catch((err) => {
						this.$message.error(err);
					});
			},
			to() {
				this.$router.back();
			},
			submit() {
				var that = this;
				this.params.type = Number(this.params.type);
				console.log(this.params)
				if(this.status) {
					this.$HTTP(this.$httpConfig.saveCoupon,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 1000);
						this.$message.success(res.data.message);
					}).catch((err) => {
						this.$message.error(err);
					})
				} else {
					this.$HTTP(this.$httpConfig.addCoupons,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 1000);
						this.$message.success(res.data.message);
					}).catch((err) => {
						this.$message.error(err);
					})
				}
			},
		}
	}
</script>
<style lang="less">
body{
	overflow: inherit;
}
	.el-table__empty-block{
		height: 0;
	}
	.g_att {
		padding-bottom: 300px;
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
				text-indent: 35px;
			}
		}
	}
</style>
<style lang="less" scoped>
	.classify {
		width: 1000px;
		.g_att {
			.currency {
				height: auto;
				min-height: 100px;
				line-height: 20px;
				padding: 10px;
				border-top: 0;
				color: #333;
				.ss {
					padding-left: 5px;
				}
				.z_info {
					padding-left: 65px;
					.z_price {
						padding-left: 33px;
						span {
							padding: 10px 0;
							b {
								color: #ff0000;
							}
						}
						input {
							margin: 10px 0;
							width: 288px;
							height: 32px;
							border: 1px solid #cccccc;
						}
						.it_z {
							margin-left: 25px;
						}
						.price {
							width: 80px;
						}
					}
					.Member_price {
						padding-left: 45px;
					}
					.time {
						padding-left: 20px;
					}
					.set {
						padding-left: 45px;
						b {
							color: #ff0000;
						}
						span {
							padding: 10px 0;
						}
						.opt {
							padding-right: 15px;
							margin: 10px 0;
						}
						input {
							border: 0;
							margin: 0;
							width: 15px;
							height: 15px;
						}
					}
				}
				.button {
					height: 32px;
					margin: 20px 0 20px 175px;
					border-radius: 6px;
					background: #f7bc0a;
					width: 199px;
					span {
						display: block;
						line-height: 32px;
						color: #FFF;
						text-align: center;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>