<template>
	<div class="parameter">
		<div v-if="$store.state.relInfo_tow != ''">
			<p>商品属性</p>
			<form class="edit">
				<table id="p_data" class="table" v-html="$store.state.relInfo_tow">
					<!-- {{$store.state.relInfo_tow}} -->
				</table>
				<el-button type="success" @click="submit">提交</el-button>
			</form>
		</div>
		<div v-else class="center_else">
			请先完成商品信息
		</div>
	</div>
</template>
<script>
	import '../../../../../../../js/jquery.form.min';
	export default {
		data() {
			return {}
		},
		props: {
			relInfo: ''
		},
		mounted() {},
		methods: {
			submit() {
				let data = $("form").formSerialize();
				data += '&token='+ sessionStorage.getItem('data_token');
				console.log(data)   
				let newData = {};  
				// this.$HTTP(this.$httpConfig.editGoodsAttr,data).then((res) => {
				this.axios.post(this.$httpConfig.editGoodsAttr, data).then((res) => {
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$message.error(err);
				});
			}
		}
	}
</script>

<style>
	.center_else {
		text-align: center;
		font-size: 17px;
		font-weight: 700;
		line-height: 70px;
		color: red;
	}
	
	.edit .table {
		border-left: 1px solid #ddd;
		border-right: 1px solid #ddd;
		border-top: 1px solid #ddd;
		margin-top: 15px;
	}
	
	.edit .table tr td {
		padding: 10px 0;
		border-bottom: 1px solid #ddd;
		text-align: center;
		vertical-align: inherit;
	}
	
	.edit .table tr td b {
		font-weight: bold;
		color: #333;
	}
	
	.edit .table tr td select {
		width: 200px;
		height: 40px;
		border: 1px solid;
		border-color: #ff920b;
		cursor: pointer;
		border-radius: 4px;
		box-sizing: border-box;
		padding: 0 15px;
	}
	
	.edit .table tr td select option {
		color: #ff920b;
		border: 1px solid #eee;
		height: 40px;
		line-height: 40px;
		box-sizing: border-box;
		font-size: 14px;
		padding: 10px 20px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 34px;
		line-height: 34px;
		cursor: pointer;
	}
	
	.edit .table tr td input {
		padding-left: 5px;
		height: 32px;
		border: 1px solid #cccccc;
	}
</style>
<style lang="less" scoped>
	.parameter {
		height: auto;
		min-height: 100px;
		line-height: 20px;
		padding: 10px;
		border-top: 0;
		color: #333;
	}
</style>