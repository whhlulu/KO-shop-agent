<template>
	<div class="logistics fl">
		<!-- 账号 - 添加管理员-->
		<div class="t_tab">
			<h1 class="t_title">
            <span class="size16">管理员管理 - 权限查看</span>
            <div class="t_m fr" @click="to">返回管理员列表</div>
       </h1>
			<div class="card-box">
				<el-card class="box-card" v-for="(item,i) in arrIds" :key="item.id">
					<div slot="header" class="clearfix">
						<el-checkbox disabled class="left-checkbox" :indeterminate="isIndeterminate[i]" v-model="checkAll[i]" :key="item.id">{{item.remark}}</el-checkbox>
					</div>
					<div class="text item">
						<el-checkbox-group disabled class="right-checkbox-group" v-model="checkedCities[i]">
							<el-checkbox class="right-checkbox-item" v-for="val in item.son" :label="val" :key="val.id">{{val.remark}}</el-checkbox>
						</el-checkbox-group>
					</div>
				</el-card>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'addadmin',
		data() {
			return {
				checkAll: [], //一级菜单是否选中
				checkedCities: [], //二级菜单内容
				isIndeterminate: [], //二级菜单是否全选
				arrIds: [], //权限列表
				params: [] //选中的ID组
			}
		},
		created() {
			//是编辑的条件下
		},
		mounted() {
			this.getPower();
		},
		methods: {
			getPower() {
				//获取单条数据
				
				this.$HTTP(this.$httpConfig.getRoleDetail,{id: this.$route.params.id}).then((res) => {
					this.params.title = res.data.data.title;
					this.params.explain = res.data.data.explain;
					this.params.roles = res.data.data.role;
					this.arrIds = res.data.data.role;
					for(var i = 0; i < this.arrIds.length; i++) {
						this.isIndeterminate[i] = this.arrIds.choice == 1 ? false : true;
						this.checkAll[i] = this.arrIds.choice == 1 ? false : true;
						this.checkedCities[i] = new Array();
						if(this.arrIds[i].son != undefined) {
							for(var j = 0; j < this.arrIds[i].son.length; j++) {
								this.checkedCities[i][j] = this.arrIds[i].son[j].choice == 1 ? this.arrIds[i].son[j] : [];
							}
						}
					}
				}).catch((err) => {
					console.log(err);
				});
			},
			to() {
				this.$router.back();
			},
		}
	}
</script>
<style>
	.card-box {
		margin-bottom: 70px;
	}
	
	.submit-box {
		width: 1000px;
		height: 50px;
		position: fixed;
		background-color: #fff;
		bottom: 0;
		z-index: 100;
		text-align: center;
		display: flex;
		justify-content: center;
	}
	
	.el-card__header {
		padding: 10px 20px;
		background-color: #eee;
	}
	/*上方的字*/
	
	.option {
		font-size: 17px;
		font-weight: bold;
		color: #000;
	}
	
	.left-checkbox {
		float: left;
		margin-right: 20px;
		padding: 5px 20px;
	}
	
	.right-checkbox-group {
		padding-left: 50px;
		/*border-left: dotted 1px #CCC;*/
		font-size: 11px;
	}
	/*分割线*/
	
	.line {
		width: 100%;
		height: 1px;
		margin: 10px 0;
		border-bottom: 1px dotted #DDD;
		box-sizing: border-box;
	}
	
	.right-checkbox-item {
		width: 25%;
		height: 25px;
		line-height: 25px;
	}
	
	.el-checkbox+.el-checkbox {
		margin-left: 0;
	}
	
	.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
		background-color: #f2f6fc!important;
		border-color: #dcdfe6!important;
	}
	/*卡片布局*/
	
	.text {
		font-size: 14px;
	}
	
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	
	.clearfix:after {
		clear: both
	}
	
	.box-card {
		width: 1000px;
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
				text-indent: 32px;
			}
		}
	}
</style>

<style lang="less" scoped>
	.logistics {
		width: 1000px;
		padding-bottom:80px;
	}
</style>