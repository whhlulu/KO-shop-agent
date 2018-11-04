<template>
	<!-- 商品规格编辑 -->
	<div class="spec">
		<div class="g_att">
			<h1 class="t_title">
            <span class="size16" >商品规格新增</span>
            <el-button class="back" type="success" @click="back">返回列表</el-button>
          </h1>
			<div class="goods_classify">
				<span><b class="red">*</b>  商品分类： </span>
				<el-select v-model="class_id" @change="selectChild()" filterable placeholder="请选择">
					<el-option v-for="item in classData" :key="item.value" :label="item.class_name" :value="item.id">
					</el-option>
				</el-select>
				<el-select @change="selectChildByTwo()" v-if="classByTwo.length !== 0" v-model="class_two" filterable placeholder="请选择">
					<el-option v-for="(items,indexs) in classByTwo" :key="indexs" :label="items.class_name" :value="indexs">
					</el-option>
				</el-select>
				<el-select v-else>没有数据</el-select>

				<el-select @change="getList()" v-if="classByThree.length !== 0" v-model="class_three" filterable placeholder="请选择">
					<el-option v-for="(items,indexs) in classByThree" :key="indexs" :label="items.class_name" :value="indexs">
					</el-option>
				</el-select>
				<el-button v-show="!isUpdate" @click="add" style="float:right" size="small" type="success">添加商品规格值</el-button>
			</div>
			<div class="center" v-if="names.length != 0">

				<el-tabs v-model="namesIndex" type="border-card" class="goods_spec_list" @tab-click="handleTabEdit">
					<el-tab-pane v-for="(item,key) in names" :key="key" :label="item.name" :name="item.id">
						<el-table :data="item.items" style="width: 100%">
							<el-table-column label="规格名称" width="300">
								<template slot-scope="scope">
									<i class="el-icon-circle-plus"></i>
									<span style="margin-left: 10px">新增</span>
								</template>
							</el-table-column>
							<el-table-column label="规格项" width="400">
								<template slot-scope="scope">
									<el-input placeholder="请输入内容" v-model="scope.row.type" clearable>
									</el-input>
								</template>
							</el-table-column>
							<el-table-column width="200" label="操作">
								<template slot-scope="scope">
									<el-button size="mini" type="danger" @click="handleDelete(key,scope.$index)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
				<div class="button_submit">
					<el-button @click="submit"  type="success">确认提交</el-button>
				</div>
			</div>
			<div v-else class="center_else">
				没有数据	
			</div>
		</div>
	</div>
</template>
<script>
	import Vue from 'vue';
	import Router from 'vue-router';
	export default {
		name: 'spec',
		data() {
			return {
				value: true,
				class_id: 0, // 第一级分类
				class_two: 0, // 第二级分类
				class_three: 0, // 第三级分类编号
				classData: {}, // 一级分类
				classByTwo: [], // 二级分类数据
				classByThree: [], // 三级分类数据
				names: [], //所有的操作项
				operatingData: [{}, {}], //新加的操作数据
				current: null,
				namesIndex: 0,
				receiveData : [],
				isUpdate : 0, //新增还是修改时
				updateData : {},
			}
		},
		created() {
			this.getClass();
			this.receiveData = this.$route.params.info;
			console.log(this.receiveData);
			if(this.receiveData.length!=0){
				this.isUpdate = 1;
				this.getInfo();
			}
//			this.getList();
		},
		methods: {
			back() {
				this.$router.back();
			},
			//商品分类搜索
			getClass() {
				//获取分类
				this.$HTTP(this.$httpConfig.getClassById,{goods_class_id: parseInt(this.class_id)}).then((res) => {
					if(!res.data.data) {
						this.$layer.msg('暂无数据:(');
						return;
					}
					this.classData = res.data.data;
				}).catch((err) => {
					console.log(err)
				});
			},
			/**
			 * 二级分类（change);
			 */
			selectChild() {
				this.class_two = null
				this.classByTwo = [];
				this.classByThree = [];
				this.class_three = null;
				// console.log(this.class_id);
				//获取分类
				this.$HTTP(this.$httpConfig.getClassById,{goods_class_id: parseInt(this.class_id)}).then((res) => {
					this.classByTwo = res.data.data;
					console.log(this.classByThree)
				}).catch((err) => {
					console.log(err)
				});
			},
			/**
			 * 第三级分类
			 */
			selectChildByTwo() {
				this.classByThree = [];
				this.class_three = null;
				//获取分类
				this.$HTTP(this.$httpConfig.getClassById,{goods_class_id: parseInt(this.class_two)}).then((res) => {
					this.classByThree = res.data.data;
					// console.log(this.classByTwo)
				}).catch((err) => {
					console.log(err)
				});
			},
			/*当第三个分类选择完之后 ,立即 获取数据*/
			getList() {
				this.$HTTP(this.$httpConfig.getGoodsSpecGroup,{
					class_one: this.class_id,
					class_two: this.class_two,
					class_three: this.class_three
				}).then((res) => {
					 if(!res.data.data){
						this.names = [];
						this.$message('没有数据 ');
					} else {
						console.log(res.data.data);
						let updateDataNow = res.data.data;
						if(this.isUpdate){
							let keys = Object.keys(updateDataNow);
							for(let i in keys){
								if(this.updateData.spec_id == updateDataNow[keys[i]].id){
									updateDataNow[keys[i]].items=[{type:this.updateData.item,id:this.updateData.id}]
								}
							}
								this.namesIndex = updateDataNow[keys[0]].id;
								this.names = updateDataNow;
						}else{
							var keys = Object.keys(updateDataNow);
							for(let i in keys){
								updateDataNow[keys[i]].items=[{type:''}]
							}
								this.namesIndex = updateDataNow[keys[0]].id;
								this.names = updateDataNow;
						}
					}
				}).catch((err) => {
					console.log(err)
				});
			},
			// 添加商品规格
			add() {
				let keysId = this.namesIndex;
				console.log(this.namesIndex)
				if (keysId == 0) {
					this.$message.error('没有数据，不能添加！！');
				}else if(this.names[keysId].items == undefined){
					this.names[keysId].items=[{type:''}]
					console.log(this.names);
				}else{										
					this.names[keysId].items.push({
						type: ''
					})				
				}
			},
			// 删除当前商品规格
			handleDelete(key, index) {
				var dataa = this.names;
				dataa[key].items.splice(index, 1)
			},
			handleTabEdit(target) {
				this.namesIndex = target.name;
			},
			
			submit(){
				var that = this;
				let itemsArray = [];
				let params = [];
				let index = this.namesIndex;
				let list = this.names[index].items;
				for (let i in list) {
					 itemsArray.push(list[i].type);
				}
				this.$HTTP(this.$httpConfig.addGoodsSpecItem,{
					spec_id : this.names[index].id,
					item : itemsArray,
				}).then((res)=>{
					this.$message.success(''+res.data.message);
					setTimeout(function(){
						that.$router.back(-1);
					})
				}).catch((err) => {
					console.log(err)
				});	
			}
		}
	}
</script>
<style lang="less" scoped>
	.g_att {
		.t_title {
			color: #333;
			border-bottom: 1px solid #dddddd;
			overflow: hidden;
			margin-bottom: 22px;
			line-height: 50px;
			.back{
				float: right;
			}
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
		.goods_classify {
			span {
				padding: 10px 0;
				b {
					color: #ff0000;
				}
			}
			select {
				margin: 10px 0;
				width: 288px;
				height: 32px;
				border: 1px solid #cccccc;
				border-radius: 4px;
			}
		}
		.center {
			margin: 10px;
			.goods_spec_list {
				min-height: 300px;
			}
			.button_submit{
				width: 100%;
				text-align: center;
				padding: 20px;
				box-sizing: border-box;
			}
		}
		.center_else{
			text-align: center;
			font-size: 15px;
			color: #ff920b;
			line-height: 250px;
		}
	}
</style>

<style lang="less" scoped>
	.spec {
		width: 1042px;
		.specification {
			border-left: 1px solid #dddddd;
			border-right: 1px solid #dddddd;
			border-top: 1px solid #dddddd;
			.black {
				color: #333;
			}
			.bold {
				font-weight: bold;
			}
			tr {
				td {
					border-bottom: 1px solid #ddd;
					padding: 10px 0;
					line-height: 24px;
					.el-switch {
						padding-left: 0;
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
		}
		.Shop {
			input {
				padding-left: 5px;
			}
			input,
			select {
				margin: 0;
				width: 288px;
				height: 32px;
				border: 1px solid #cccccc;
			}
		}
	}
</style>