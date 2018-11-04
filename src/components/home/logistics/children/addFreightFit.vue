<template>
	<div class="logistics fl">
		<!-- 添加运费 -->
		<div class="t_tab">
			<h1 class="t_title">
            <span v-if="!status" class="size16">添加运费设置</span>
            <span v-else class="size16">修改运费设置</span>
            <div @click="to" class="t_m fr">返回运费设置列表</div>
        </h1>
			<el-form class="form" label-width="180px" :model="params">
				<el-form-item label="首件">
					<el-input style="width: 600px;" v-model="params.first_thing" clearable></el-input> 件
				</el-form-item>
				<el-form-item label="首重">
					<el-input style="width: 600px;" v-model="params.first_weight" clearable></el-input> g
				</el-form-item>
				<el-form-item label="首体积">
					<el-input style="width: 600px;" v-model="params.frist_volum" clearable></el-input> m³
				</el-form-item>
				<el-form-item label="首费">
					<el-input style="width: 600px;" v-model="params.frist_money" clearable></el-input> 元
				</el-form-item>
				<el-form-item label="续重">
					<el-input style="width: 600px;" v-model="params.continued_heavy" clearable></el-input> g
				</el-form-item>
				<el-form-item label="续体积">
					<el-input style="width: 600px;" v-model="params.continued_volum" clearable></el-input> m³
				</el-form-item>
				<el-form-item label="续费">
					<el-input style="width: 600px;" v-model="params.continued_money" clearable></el-input> 元
				</el-form-item>
				<el-form-item label="续件">
					<el-input style="width: 600px;" v-model="params.continued_thing" clearable></el-input> 件
				</el-form-item>
				<el-form-item label="选择模板">
					<el-select v-model="params.freight_id" filterable placeholder="请选择">
						<el-option v-for="item in methodList" :key="item.express_title" :label="item.express_title" :value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择地区">
					<el-popover v-model="popover" ref="popover4" placement="right" width="400" trigger="click">
						<el-tree class="tree" :data="cityData" show-checkbox node-key="id" highlight-current ref="tree" :default-checked-keys="hasCityId" :props="defaultProps">
						</el-tree>
						<div class="bottom">
							<el-tag class="tag" type="danger">如果本页有选择内容，先点击确认再翻页哦~</el-tag>
							<div class="page_size">
								<el-pagination background layout="prev, pager, next" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
								</el-pagination>
								<el-button type="success" class="add" @click="getCheckedKeys">确认</el-button>
							</div>
						</div>
					</el-popover>
					<el-button type="success" v-popover:popover4 @click="getCity">添加地区</el-button>
					<el-table :data="hasCityData" border  class="address-table">
						<el-table-column prop="id" label="ID" width="180">
						</el-table-column>
						<el-table-column prop="name" label="地址名称" width="180">
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button @click="deleteItem(scope.row)" size="mini" type="danger" icon="el-icon-delete"></el-button>
							</template>
						</el-table-column>
					</el-table>
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
					freight_id: 0,
					first_thing: 0,
					first_weight: 0.00,
					frist_volum: 0.00,
					frist_money: 0.00,
					continued_heavy: 0.00,
					continued_volum: 0.00,
					continued_money: 0.00,
					carry_way: 0,
					continued_thing: 0,
					area:[]
				},
				methodList: {},
				cityData: [], //所有的地址数据 
				hasCityData: [], //已经存在于服务器的地区数据
				defaultProps: {
					children: 'city',
					label: 'name'
				},
				hasCityId: [],//已存在/选中的数据，只有ID
				popover:false, //popover是否可见
				page_size: 0, //每页显示几个
				page: 0, //总页数
				currentPage: 1, //当前页
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
			
			this.getMethod();
		},
		methods: {
			/*翻面跳转*/
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.getCity();
			},
			getCheckedKeys() {
				var IDs = this.$refs.tree.getCheckedKeys();
				var datas = this.$refs.tree.getCheckedNodes();
				for (var i in IDs){
					for(var j in this.hasCityId){
						if (IDs[i] == this.hasCityId[j]){
							IDs.splice(i,1); 
							datas.splice(i,1); 
						}
					}
				}
				for(var i in IDs){
					this.hasCityId.push(IDs[i]);
					this.hasCityData.push(datas[i]);
				}
				this.popover = false;
			},
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
			getMethod() {
				/*获取运费模板列表*/
				this.$HTTP(this.$httpConfig.getFreightList,{}).then((res) => {
					this.methodList = res.data.data;
					console.log(2, this.methodList);
					this.$message.success(res.data.message);
				}).catch((res) => {
					this.$message.error(res.data.message);
				});
			},
			queryData() {
				this.$HTTP(this.$httpConfig.getFreightModelDetail,{id: this.id}).then((res) => {
					if(res.data.status == 1 && res.data.data.length!=0){
						this.params = res.data.data;	
						this.hasCityData = res.data.data.area;
						for(var i in this.hasCityData){
							this.hasCityId[i] = this.hasCityData[i].id;
						}
					}
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$message.error(err);
				})
			},
			show() {
				this.$store.state.add_region = true;
			},
			to() {
				this.$router.back();
			},
			submit() {
				var that = this;
				this.params.area = this.hasCityId;
				console.log(this.params)
				if(this.status) {
					this.$HTTP(this.$httpConfig.saveFreightModel,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 2000);
					}).catch((err) => {
						this.$message.error(err);
					})
				} else {
					this.$HTTP(this.$httpConfig.addFreightModel,this.params).then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function() {
							that.to();
						}, 2000);
					}).catch((err) => {
						this.$message.error(err);
					})
				}
			},
			getCity() {
				//获取地址
				this.$HTTP(this.$httpConfig.getArea,{page: this.currentPage}).then(res => {
					this.cityData = [];
					if(!res.data.data) {
						this.$layer.msg('暂无数据:(');
						return;
					}
					var list = res.data.data.prov;
					this.cityData = list;
					this.page_size = list.length;
					this.page = Number(res.data.data.page * list.length);
				}).catch((err) => {
					console.log(err)
				});
			},
		}
	}
</script>
<style scoped>
/** 
* 弹出框 的样式 
*/
.tree {
  height: 350px;
  padding: 10px 0;
  overflow: scroll;
}
.bottom{
	text-align: center;
	height: 120px;
	padding: 10px;
}
.page_size {
  text-align: center;
  padding: 10px;
  width: 95%;
  margin: 0 auto;
}
.address-table {
  width: 70%;
  height: 500px;
  overflow: scroll;
	margin: 10px 0 0 0;
}
.add{
  margin-top: 10px;
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