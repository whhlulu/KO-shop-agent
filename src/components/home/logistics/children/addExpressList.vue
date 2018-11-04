<template>
	<div class="logistics fl">
		<!-- 添加快递公司 -->
		<div class="t_tab">
			<h1 class="t_title">
            <span class="size16">添加快递公司</span>
            <div @click="to" class="t_m fr">返回快递公司列表</div>
        </h1>
			<el-form class="form" label-width="180px" :model="params">
				<el-form-item label="公司名称">
					<el-input style="width: 600px;" v-model="params.name" clearable></el-input>
				</el-form-item>
				<el-form-item label="编号">
					<el-input style="width: 600px;" v-model="params.code" clearable></el-input>
				</el-form-item>
				<el-form-item label="首字母">
					<el-input style="width: 600px;" v-model="params.letter" clearable></el-input>
				</el-form-item>
				<el-form-item label="公司网址">
					<el-input style="width: 600px;" v-model="params.url" clearable></el-input>
				</el-form-item>
				<el-form-item label="客服电话">
					<el-input style="width: 600px;" v-model="params.tel" clearable></el-input>
				</el-form-item>
				<el-form-item label="折扣">
					<el-input style="width: 600px;" v-model="params.discount" clearable></el-input>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-switch v-model="params.status"></el-switch>
				</el-form-item>
				<el-form-item label="是否常用">
					<el-switch v-model="params.order"></el-switch>
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
		name: 'express',
		data() {
			return {
				params: {
					name: '',
					status: 0,
					code: '',
					url: '',
					order: 0,
					zt_state: 0,
					letter: '',
					tel: '',
					discount: 0.00
				}
			}
		},
		mounted() {
			
		},
		methods: {
			to() {
				this.$router.back();
			},
			submit() {
				var that = this;
				this.params.status = Number(this.params.status);
				this.params.order = Number(this.params.order);
				this.$HTTP(this.$httpConfig.addExpress,this.params).then((res) => {
					this.$message.success(res.data.message + ",即将跳转回列表页面");
					setTimeout(function() {
						that.to();
					}, 1000);
				}).catch((err) => {
					this.$message.error(err);
				})
			}
		}
	}
</script>
<style lang="less">
	.logistics {
		width: 1000px;
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
	}
</style>