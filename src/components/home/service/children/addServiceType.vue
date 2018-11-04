<template>
	<div class="logistics fl">
		<!-- 客服-添加客服类型 -->
		<div class="t_tab">
			<h1 class="t_title">
            <span v-if="!status" class="size16">客服类型  - 添加</span>
            <span v-else class="size16">客服类型  - 修改</span>
            <div class="t_m fr" @click="to">返回客服类型列表</div>
        </h1>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="logistics_x">
				<tr>
					<td align="right" class="black"><b>*</b>客服类型名称： </td>
					<td>
						<el-input style="width: 600px;" v-model="params.name" clearable></el-input>
						`
						<span class="notes">建议添加 2~4 个字显示效果更佳</span>
					</td>
				</tr>
				<tr>
					<td align="right" class="black"><b>*</b>是否启用：</td>
					<td>
						<el-switch v-model="params.status" inactive-text="否" active-text="是" active-color="#f7bc0a">
						</el-switch>
					</td>
				</tr>
				<tr>
					<td align="right" class="black">排序：</td>
					<td>
						<el-input style="width: 600px;" v-model="params.sort" clearable></el-input>

						<!-- <span class="notes">数字范围 0~9999 ，数字越小越靠前</span> -->
					</td>
				</tr>
				<tr>
					<td align="right">&nbsp;</td>
					<td colspan="2">
						<el-button type="success" @click="submit">确认提交</el-button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'addservicetype',
		data() {
			return {
				status: 0, //0代表是新增，1代表是修改
				params: {
					name: "",
					sort: "",
					status: true
				},
				id: 0
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
			to() {
//				this.$router.push('/servicetype');
					history.go(-1);
			},
			queryData() {
				
				this.$HTTP(this.$httpConfig.getServiceTypeDetail,{type_id:this.id}).then( (res) => {
					this.params = res.data.data;
					this.params.status = this.params.status==1?true:false;
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$error.message(err);
				});
			},
			submit() {
				this.params.status = Number(this.params.status);
				if(this.status) {
					this.params.type_id = this.id;
				} else {
					delete this.params.type_id;
				}
				this.$HTTP(this.$httpConfig.addServiceType,this.params).then((res) => {
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$message.error(err);
				})
			}
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
			.t_m {
				background: url(../../../../assets/return.jpg) no-repeat 7px #ff9f24;
				width: 135px;
				height: 32px;
				border: 1px solid #ff920b;
				border-radius: 4px;
				font-size: 12px;
				font-weight: normal;
				cursor: pointer;
				color: #FFF;
				line-height: 32px;
				text-indent: 28px;
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
		padding-bottom:80px;
		.logistics_x {
			tr {
				td {
					padding: 10px 0;
					.ss {
						margin: 0;
					}
				}
			}
		}
	}
</style>