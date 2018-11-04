<template>
	<div class="logistics fl">
		<!-- 账号 - 添加管理员-->
		<div class="t_tab">
			<h1 class="t_title">
				<span v-if="$route.params.id === 'add'" class="size16">用户组管理 - 添加角色</span>
				<span v-else class="size16">用户组管理 - 编辑角色</span>
				<div class="t_m fr" @click="to">返回角色列表</div>
			</h1>
			<el-form ref="params" :model="params" :rules="rules" label-width="200px">
				<el-form-item label="角色名称" prop="title">
					<el-input style="width:50%" v-model="params.title"></el-input>
				</el-form-item>
				<el-form-item label="角色说明" prop="explain">
					<el-input style="width:50%" type="textarea" v-model="params.explain"></el-input>
				</el-form-item>
				<el-form-item label="全选">
					<el-checkbox @click.native="checkedAll()" v-model="checkedAllStatus">全选</el-checkbox>
					<span>勾选“全选”，自动选中全部店铺管理员操作功能，可根据需要从设置详情中进行分组设置</span>
				</el-form-item>
			</el-form>
			<div class="card-box">
				<div v-if="$route.params.id === 'add'">
					<el-card class="box-card" v-for="(item,i) in arrIds" :key="item.id">
						<div slot="header" class="clearfix">
							<el-checkbox class="left-checkbox" :indeterminate="isIndeterminate[i]" v-model="checkAll[i]" @change="handleCheckAllChange(i,checkAll[i])" :key="item.id">{{item.remark}}</el-checkbox>
						</div>
						<div class="text item">
							<el-checkbox-group class="right-checkbox-group" v-model="checkedCities[i]" @change="handleCheckedCitiesChange(i,checkedCities[i])">
								<el-checkbox class="right-checkbox-item" v-for="val in item.son" :label="val" :key="val.id">{{val.remark}}</el-checkbox>
							</el-checkbox-group>
						</div>
					</el-card>
				</div>
				<div v-else>
					<el-card class="box-card" v-for="(item,i) in arrIds" :key="item.id">
						<div slot="header" class="clearfix">
							<el-checkbox class="left-checkbox" :indeterminate="isIndeterminate[i]" v-model="checkAll[i]" @change="handleCheckAllChange(i,checkAll[i])" :key="item.id">{{item.remark}}</el-checkbox>
						</div>
						<div class="text item">
							<el-checkbox-group class="right-checkbox-group" v-model="checkedCities[i]" @change="handleCheckedCitiesChange(i,checkedCities[i])">
								<el-checkbox class="right-checkbox-item" v-for="val in item.son" :label="val" :key="val.id">{{val.remark}}</el-checkbox>
							</el-checkbox-group>
						</div>
					</el-card>
				</div>
			</div>
			<div class="submit-box">
				<el-button class="submit" @click="submit()" type="success">确认提交</el-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'addadmin',
	data() {
		return {
			list: {
				email: '',
				mobile: '',
				seller_name: '',
				status: false,
			},
			params: {
				title: '',
				explain: '',
				roles: []//选中的ID组
			},
			rules: {
				title: [
					{ required: true, message: '请输入角色名称', trigger: 'blur' },
					{ min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
				],
				explain: [
					{ required: true, message: '请输入角色说明', trigger: 'blur' }
				]
			},
			checkAll: [], //一级菜单是否选中
			checkedCities: [], //二级菜单内容
			isIndeterminate: [], //二级菜单是否全选
			checkedAllStatus: false, //最上面的全选
			arrIds: [], //权限列表
		}
	},
	created() {
		//是编辑的条件下
		if (this.$route.params.id != 'add') {
			//获取单条数据
			this.$HTTP(this.$httpConfig.getRoleDetail, { id: this.$route.params.id }, 'post').then((res) => {
				this.params.title = res.data.data.title;
				this.params.explain = res.data.data.explain;
				this.params.roles = res.data.data.role;
				this.arrIds = res.data.data.role;
				for (var i = 0; i < this.arrIds.length; i++) {
					this.isIndeterminate[i] = this.arrIds[i].choice == 1 ? false : true;
					this.checkAll[i] = this.arrIds[i].choice != 1 ? false : true;
					this.checkedCities[i] = new Array();
					if (this.arrIds[i].son != undefined) {
						for (var j = 0; j < this.arrIds[i].son.length; j++) {
							this.checkedCities[i][j] = this.arrIds[i].son[j].choice == 1 ? this.arrIds[i].son[j] : [];
						}
					}
				}
				/*判断是否所有的数据都选中了*/
				this.checkedAllStatus = this.isIndeterminate.indexOf(true) == -1 ? true : false;
			}).catch((err) => {
				console.log(err);
			});
		} else {
			this.getPower();
		}
	},
	mounted() {
	},
	methods: {
		/*最外边的最大的全选*/
		checkedAll() {
			if (this.checkedAllStatus) {
				for (var i in this.arrIds) {
					this.isIndeterminate[i] = true;
					this.checkAll[i] = false;
					this.checkedCities[i] = [];
				}
			} else {
				for (var i in this.arrIds) {
					this.isIndeterminate[i] = false;
					this.checkAll[i] = true;
					this.checkedCities[i] = this.arrIds[i].son;
				}
			}
		},
		getPower() {
			this.$HTTP(this.$httpConfig.getPowerList, {}, 'post').then((res) => {
				this.arrIds = res.data.data
				for (var i in this.arrIds) {
					this.isIndeterminate[i] = false;
					this.checkAll[i] = false;
					this.checkedCities[i] = [];
				}
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		handleCheckAllChange(index, value) {
			console.log(index, value, this.arrIds[index], this.isIndeterminate[index])
			this.checkedCities[index] = value ? this.arrIds[index].son : [];
			this.isIndeterminate[index] = false;
		},
		handleCheckedCitiesChange(index, value) {
			console.log(index, value)
			let checkedCount = value.length;
			this.checkAll[index] = checkedCount === this.arrIds[index].son.length;
			this.isIndeterminate[index] = checkedCount > 0 && checkedCount < this.arrIds[index].son.length;
		},
		//提交
		submit() {
			console.log(this.checkAll, this.checkedCities)
			this.params.roles = [0];
			/*首先把一级菜单的ID加进去*/
			for (var i in this.checkAll) {
				if (this.checkAll[i]) {
					this.params.roles.push(this.arrIds[i].id);
				}
			}
			/*再把二级菜单的ID加进去*/
			for (var i in this.checkedCities) {
				for (var j in this.checkedCities[i]) {
					this.params.roles.push(this.checkedCities[i][j].id);
				}
			}
			console.log(this.params);
			if (this.params.title == '' || this.params.explain == '') {
				this.$message.error('请先完善信息!!');
				return false;
			} else {
				var that = this;
				if (this.$route.params.id != 'add') {
					this.params.id = this.$route.params.id;
					this.$HTTP(this.$httpConfig.saveRole, this.params, 'post').then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function () {
							that.to();
						}, 2000);
					}).catch((res) => {
						this.$message.error(res.data.message);
					})
				} else {
					this.$HTTP(this.$httpConfig.addRole, this.params, 'post').then((res) => {
						this.$message.success(res.data.message + ",即将跳转回列表页面");
						setTimeout(function () {
							that.to();
						}, 2000);
					}).catch((res) => {
						this.$message.error(res.data.message);
					})
				}
			}
		},
		to() {
			this.$router.back();
		},
	}
}
</script>
<style scoped>
.card-box {
  margin-bottom: 70px;
}

.submit-box {
  width: 1000px;
  height: 50px;
  position: fixed;
  background-color: #fff;
  bottom: 42px;
  padding-bottom: 10px;
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
  border-bottom: 1px dotted #ddd;
  box-sizing: border-box;
}

.right-checkbox-item {
  width: 25%;
  height: 25px;
  line-height: 25px;
}

.el-checkbox + .el-checkbox {
  margin-left: 0;
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
  clear: both;
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
      color: #fff;
      line-height: 32px;
      text-indent: 32px;
    }
  }
}
.el-switch {
  .el-switch__core {
    width: 35px !important;
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
  padding-bottom: 80px;
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
}
</style>
