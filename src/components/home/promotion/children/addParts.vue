<template>
	<div class="logistics fl">
		<!-- 促销-添加推荐配件 -->
		<div class="t_tab">
			<h1 class="t_title">
				<span v-if="!status" class="size16">添加推荐配件</span>
				<span v-else class="size16">修改推荐配件</span>
				<div class="t_m fr" @click="to">返回推荐配件</div>
			</h1>
			<el-form class="form" label-width="180px">
				<select-one-goods v-on:sendGoodsData="getGoodsData" :sendUpdateData="updateGoods" :sendStatus="status"></select-one-goods>
				<select-some-goods v-on:sendSomeGoodsData="getSomeGoodsData" :sendUpdateData="updateSub" :sendStatus="status"></select-some-goods>
				<el-form-item label="显示状态">
					<el-switch v-model="params.status" active-color="#13ce66" inactive-color="#ff4949">
					</el-switch>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="submit">确认提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import selectOneGoods from '../../../../common/selectOneGoods.vue';
import selectSomeGoods from '../../../../common/selectSomeGoods.vue';
export default {
	name: 'addparts',
	data() {
		return {
			radio: '1',
			girdData: [],
			hasCityData: [], //已经存在于服务器的地区数据
			multipleSelection: [],
			girdData2: [],
			hasCityData2: [], //已经存在于服务器的地区数据
			multipleSelection2: [],
			hasCityId: null, //已存在/选中的数据，只有ID
			hasCityId2: [], //已存在/选中的数据，只有ID
			status: 0, //0代表是新增，1代表是修改
			id: 0,
			dialogTableVisible: false,
			dialogTableVisible2: false,
			params: {
				goods_id: 0,
				sub_ids: 0,
				status: 0
			},
			updateGoods: [],
			updateSub: [],
			page_size: 0, //每页显示几个
			page: 0, //总页数
			currentPage: 1, //当前页,
			page_size2: 0, //每页显示几个
			page2: 0, //总页数
			currentPage2: 1, //当前页
		}
	},
	components: {
		selectOneGoods,
		selectSomeGoods
	},
	created() { },
	mounted() {
		
		this.status = this.$route.params.status;
		if (this.status) {
			/*修改*/
			this.id = this.$route.params.id;
			this.queryData();
		}
	},
	methods: {
		getGoodsData(data) {
			this.hasCityId = data;
		},
		getSomeGoodsData(data) {
			console.log(data)
			this.hasCityId2 = data;
		},
		queryData() {
			this.$HTTP(this.$httpConfig.getPartsDetail,{id: this.id}).then((res) => {
				this.params.status = res.data.data.status == '1' ? true : false;
				if (res.data.data.goods != null) {
					this.updateGoods.push(res.data.data.goods);
					this.hasCityId = res.data.data.goods.id;
				}
				if (res.data.data.sub_data[0] != null) {
					this.updateSub = res.data.data.sub_data;
					for (var i in this.updateSub) {
						this.hasCityId2.push(this.updateSub[i].id)
					}
					console.log(this.hasCityId2)
				}
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
			console.log(this.hasCityId, this.hasCityId2);
			if (this.hasCityId == null || this.hasCityId2.length < 1) {
				this.$message.error('请至少选择一个商品！！');
				return false;
			}
			if (this.status) {
				this.$HTTP(this.$httpConfig.saveParts,{
					goods_id: this.hasCityId,
					sub_ids: this.hasCityId2,
					status: Number(this.params.status),
					id: this.id
				}).then((res) => {
					this.$message.success(res.data.message + ",即将跳转回列表页面");
					setTimeout(function () {
						that.to();
					}, 1000);
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$message.error(err);
				})
			} else {
				delete this.params.id;
				this.$HTTP(this.$httpConfig.addParts,{
					goods_id: this.hasCityId,
					sub_ids: this.hasCityId2,
					status: Number(this.params.status)
				}).then((res) => {
					this.$message.success(res.data.message + ",即将跳转回列表页面");
					setTimeout(function () {
						that.to();
					}, 1000);
					console.log(res.data.data);
					this.$message.success(res.data.message);
				}).catch((err) => {
					this.$message.error(err);
				})
			}
		},
	}
}
</script>
<style type="text/css">
.el-table__empty-block {
  height: 0;
}
/*分页*/
.page_size {
  text-align: center;
  padding: 20px;
  width: 95%;
}
/*分页中的确认按钮*/
.select-submit-btn {
  margin-top: 20px;
}
/*名称项超出隐藏*/

#name-single {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
/*表格内容居中*/

.el-table th > .cell,
.el-table .cell {
  text-align: center;
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
  .t_m {
    background: url(../../../../assets/return.jpg) no-repeat 15px #ff9f24;
    width: 135px;
    height: 32px;
    border: 1px solid #ff920b;
    border-radius: 4px;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
    color: #fff;
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
    padding-left: 10px;
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
          color: #fff;
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