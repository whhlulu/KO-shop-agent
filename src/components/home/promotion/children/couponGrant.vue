<template>
	<!-- 优惠券-发放 -->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
          <span class="size16">发放优惠券</span>
          <div @click="to" class="t_m fr">返回优惠券列表</div>
        </h1>
			<div class="nav">
				<span class="title">会员列表</span>
				<i>（ 共  {{dataTable.member.length}} 条记录 ）</i>
				<span class="search">
			<el-input style="width: 200px;" placeholder="手机号码" v-model="params.mobile" clearable></el-input>
			<el-input style="width: 200px;" placeholder="email" v-model="params.email" clearable></el-input>
			<el-input style="width: 200px;" placeholder="关键词" v-model="params.keywords" clearable></el-input>
        	<el-button @click="search" type="success">搜索</el-button>
        	</span>
			</div>
			<el-select @change="getData()" v-model="sel_level_name" placeholder="全部">
				<el-option v-for="item in dataTable.level_name" :key="item.id" :label="item.level_name" :value="item.id">
				</el-option>
			</el-select>
			<el-button @click="submit" type="success">确认发送</el-button>
			<el-table @selection-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable" border :data="dataTable.member" style="width: 100%" max-width="900">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="member_id" label="会员ID">
				</el-table-column>
				<el-table-column prop="level_name" label="会员等级">
				</el-table-column>
				<el-table-column prop="user_name" label="会员昵称">
				</el-table-column>
				<el-table-column prop="mobile" label="手机">
				</el-table-column>
				<el-table-column prop="email" label="邮箱">
				</el-table-column>
				<el-table-column width="100" label="操作">
					<template slot-scope="scope">
						<el-button @click="deleteItem(scope.row.id)" size="mini" icon="el-icon-delete"></el-button>
					</template>
				</el-table-column>
			</el-table>
		<div class="Paging">
			<div class="fl pil">删除</div>
			<div class="Paging_r">
				<el-pagination background layout="prev, pager, next,jumper" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
				</el-pagination>
			</div>
		</div>
		</div>
	</div>
</template>
<script>
	import timePlunge from "../../../page/time";
	export default {
		name: 'coupon',
		data() {
			return {
				dataTable: [],
				multipleSelection: [],
				params: {
					id: 0,
					mobile: '',
					email: '',
					keywords: '',
					level_id:0
				},
				sel_level_name:'',
				page_size: 0, //每页显示几个
				page: 0, //总页数
				currentPage: 1, //当前页
			}
		},
		components: {
			timePlunge,
		},
		created() {
		},
		mounted() {
			
			this.params.id = this.$route.params.id;
			this.getData();
		},
		methods: {
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			to() {
				this.$router.back();
			},
			submit() {
				let groupId = [];
				for(var i in this.multipleSelection) {
					groupId.push(this.multipleSelection[i].member_id);
				}
				if(groupId.length==0){
					this.$message.error('请至少选择一名成员！！');
					return false;
				}
				this.$HTTP(this.$httpConfig.sendCoupons,{
					member_id: groupId,
					c_id: this.params.id
				}).then((res) => {
					this.dataTable = res.data.data;
					this.$message.success(res.data.message);
				}).catch((res) => {
					this.$message.error(res.data.message);
				})
			},
			/*页面跳转*/
			handleCurrentChange: function(currentPage) {
				console.log(currentPage);
				this.currentPage = currentPage;
				 this.getData();
			},
			getData() {
				
				this.$HTTP(this.$httpConfig.getCouponsMemberList,{
					id: this.params.id,
					level_id:this.sel_level_name,
					page:this.currentPage
				}).then((res) => {
					this.dataTable = res.data.data;
					this.page_size = res.data.data.page_size;
					this.page = Number(res.data.data.page * res.data.data.page_size);
					this.$message.success(res.data.message);
				}).catch((res) => {
					this.$message.error(res.data.message);
				})
			},
			search() {
				this.$HTTP(this.$httpConfig.getCouponsMemberListSearch,this.params).then((res) => {
					this.dataTable = res.data.data;
					this.$message.success(res.data.message);
				}).catch((res) => {
					this.$message.error(res.data.message);
				})
			},
			deleteItem(value) {
				this.$confirm('此操作将永久删除此活动，是否继续？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$HTTP(this.$httpConfig.delCoupons,{id: value}).then((res) => {
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

<style type="text/css">
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
	
		.Paging {
			width: 100%;
			height: 50px;
			border-left: 1px solid #ddd;
			border-right: 1px solid #ddd;
			border-bottom: 1px solid #ddd;
			.pil {
				border: 1px solid #e9573e;
				color: #fff;
				text-align: center;
				display: block;
				border-radius: 4px;
				background-color: #e9573e;
				float: left;
				margin: 10px 10px 10px 70px;
				cursor: pointer;
				width: 58px;
				height: 32px;
				line-height: 32px;
			}
			.Paging_r {
				float: right;
				padding: 10px;
			}
		}
</style>
<style lang="less">
	.g_att {
		.nav {
			padding: 10px;
			background-color: #E0E0E0;
			margin: 0 0 20px 0;
			.title {
				font-size: 20px;
				color: #000;
			}
			.search {
				float: right;
			}
		}
		.t_title {
			color: #333;
			border-bottom: 1px solid #dddddd;
			overflow: hidden;
			margin-bottom: 22px;
			line-height: 50px;
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
			span {
				float: left;
				color: #333;
			}
			i {
				color: #999;
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
				color: #FFF;
				line-height: 32px;
				text-indent: 35px;
			}
		}
	}
</style>
<style lang="less" scoped>
	.classify {
		width: 1042px;
		.g_att {
			.list {
				border-left: 1px solid #ddd;
				border-right: 1px solid #ddd;
				border-top: 1px solid #ddd;
				margin-top: 15px;
				tr {
					td {
						padding: 10px 0;
						border-bottom: 1px solid #ddd;
						input,
						select,
						textarea,
						button {
							outline: 0 none;
							vertical-align: middle;
							text-indent: 5px;
						}
						.paging {
							background: #fff;
							line-height: 30px;
							float: right;
							width: 850px;
							input {
								border: 1px solid #dddddd;
								height: 28px;
							}
							.number {
								float: right;
								span {
									width: 30px;
									height: 28px;
									float: left;
									text-align: center;
									line-height: 30px;
									border: 1px solid #dddddd;
								}
								.page {
									width: 30px;
									height: 30px;
									line-height: 30px;
									background-color: #f7bc0a;
									text-align: center;
									color: #FFF;
									border: none;
									border-right: 1px solid #eeb407;
									cursor: pointer;
								}
							}
							.go {
								width: 37px;
								border: 1px solid #dddddd;
								height: 28px;
								border-radius: 6px;
								background-color: #f7f7f7;
								display: block;
								float: right;
								text-align: center;
								margin: 0 15px;
								cursor: pointer;
							}
							span {
								float: right;
							}
						}
						.edit {
							border: 1px solid #dddddd;
							color: #666666;
							width: 40px;
							line-height: 22px;
							text-align: center;
							display: block;
							border-radius: 4px;
							float: left;
							margin-right: 15px;
							cursor: pointer;
						}
					}
				}
				.delete {
					background-color: #e9573e;
					color: #fff;
					width: 56px;
					line-height: 30px;
					text-align: center;
					display: block;
					border-radius: 4px;
					float: left;
					margin-right: 10px;
					cursor: pointer;
				}
			}
		}
	}
</style>