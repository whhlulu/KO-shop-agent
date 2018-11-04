<template>
	<div class="logistics fl">
		<!-- 客服-添加客服管理 -->
		<div class="t_tab">
			<h1 class="t_title">
            <span v-if="!status" class="size16">客服管理 - 添加</span>
            <span v-else class="size16">客服管理 - 修改</span>
            <div class="t_m fr" @click="to">返回客服列表</div>
        </h1>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="logistics_x">
				<tr>
					<td align="right" class="black"><b>*</b>客服类型：</td>
					<td>
						<el-select v-model="params.servicetype_id" filterable placeholder="请选择">
							<el-option v-for="item in classData" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
						<span class="notes">如果没有您需要的客服类型，您可以点此<i @click="toAdd">添加客服类型</i></span>
					</td>
				</tr>
				<tr>
					<td align="right" class="black"><b>*</b>客服名称： </td>
					<td>
						<el-input style="width: 400px;" v-model="params.name" clearable></el-input>
						<span class="notes">客服与用户在线聊天时显示的名称，为保证页面美观度，建议客服名称不要超过4个字</span>
					</td>
				</tr>
				<tr>
					<td align="right" class="black"><b>*</b>客服工具：</td>
					<td>
						<el-select v-model="params.tool" placeholder="请选择">
							<el-option v-for="item in options" :key="item" :label="item" :value="item">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td align="right" class="black"><b>*</b>客服帐号：</td>
					<td>
						<el-input 
							style="width: 400px;" 
							v-model.number="params.account" 
							onkeypress="return event.keyCode>=48&&event.keyCode<=57"
							clearable>
						</el-input>
						<span class="notes">客服工具是 QQ，则客服账号输入QQ号码；客服工具是旺旺，则客服账号输入旺旺号码</span>
					</td>
				</tr>
				<tr>
					<td align="right" class="black">是否启用：</td>
					<td>
						<el-switch v-model="params.status" inactive-text="否" active-text="是" active-color="#f7bc0a">
						</el-switch>
					</td>
				</tr>
				<tr>
					<td align="right" class="black"><b>*</b>排序：</td>
					<td>
						<el-input style="width: 400px;" v-model="params.sort" clearable></el-input>
						<span class="notes">数字范围 0~255 ，数字越小越靠前</span>
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
		name: 'addservicemanage',
		data() {
			return {
				status: 0, //0代表是新增，1代表是修改
				classData: {}, // 一级分类
				params: {
					servicetype_id: '',
					name: '',
					account: '',
					status: 0,
					tool: '',
					sort: 0
				},
				options: ['QQ', '旺旺'],
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
			
			this.getClass();
		},
		methods: {
			setCode(event){
				console.log(event)
				return event.keyCode>=48&&event.keyCode<=57
			},
			to() {
				this.$router.back();
			},
			toAdd(){
				/*跳转到添加客服类型页面*/
				this.$router.push('/addservicetype');
			},
			queryData() {
				
				this.$HTTP(this.$httpConfig.getServiceDetail,{service_id : this.id}).then((res)=>{
					this.params = res.data.data;
					this.params.status = res.data.data.status==1?true:false;
					this.$message.success(res.data.message);
				}).catch((err)=>{
					this.$message.error(err);
				});
			},
			getClass() {
				//获取客服类型
            	this.$HTTP(this.$httpConfig.getServiceTypeList,{}).then((res) => {
					if(!res.data.data) {
						this.$layer.msg('暂无数据:(');
						return;
					}
					this.classData = res.data.data;
				}).catch((err) => {
					console.log(err)
				});
			},
			submit() {
				this.params.status = Number(this.params.status);
				if(this.status) {
					this.params.service_id = this.id;
				} else {
					delete this.params.service_id;
				}
				this.$HTTP(this.$httpConfig.addService,this.params).then((res) => {
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
		.t_m {
			background: url(../../../../assets/return.jpg) no-repeat 20px #ff9f24;
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