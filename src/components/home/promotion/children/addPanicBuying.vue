<template>
	<!-- 促销-添加抢购 -->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<span v-if="!status" class="size16">添加商品抢购活动</span>
				<span v-else class="size16">修改商品抢购活动</span>
				<div @click="to" class="t_m fr">返回抢购列表</div>
			</h1>
			<el-form class="form" label-width="180px" :model="params">
				<el-form-item label="抢购标题">
					<el-input style="width: 600px;" v-model="params.panic_title"></el-input>
				</el-form-item>
				<el-form-item label="选择品牌">
					<el-select v-model="params.brand_id" placeholder="请选择">
						<el-option v-for="(item,index) in brandData" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
				</el-form-item>
				<select-one-goods v-on:sendGoodsData="getGoodsData" :sendUpdateData="updateGoods" :sendStatus="status"></select-one-goods>
				<el-form-item label="开始时间">
					<el-date-picker :picker-options="pickerOptions1" default-time="10:00:00" v-model="params.start_time" type="datetime" placeholder="选择日期">
					</el-date-picker>
					<span>开始时间只有为10:00、12:00等类似时间段才会在当日的全场秒杀列表中显示</span>
				</el-form-item>
				<el-form-item label="结束时间">
					<el-date-picker :picker-options="pickerOptions2" default-time="12:00:00" v-model="params.end_time" type="datetime" placeholder="选择日期">
					</el-date-picker>
					<span class="time-error" v-show="params.end_time<params.start_time">请不要让结束时间小于开始时间</span>
				</el-form-item>
				<el-form-item label="抢购价格">
					<el-input style="width: 600px;" v-model="params.panic_price" clearable></el-input> 元
				</el-form-item>
				<el-form-item label="参考抢购数量">
					<el-input style="width: 600px;" v-model="params.panic_num" clearable></el-input> 件
				</el-form-item>
				<el-form-item label="限购数量">
					<el-input style="width: 600px;" v-model="params.quantity_limit" clearable></el-input> 件
				</el-form-item>
				<el-form-item label="是否推荐">
					<el-switch v-model="params.is_recommend" active-color="#13ce66" inactive-color="#ff4949">
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
import UE from '../../goods/children/goodsRelease/children/UE';
import selectOneGoods from '../../../../common/selectOneGoods.vue';
export default {
	name: 'addPanicBuying',
	data() {
		return {
			dialogTableVisible: false,
			config: {
				initialFrameWidth: null,
				initialFrameHeight: 350
			},
			params: {
				panic_title: '',
				goods_id: 0,
				panic_price: 0,
				start_time: '',
				end_time: '',
				price_market: 0,
				panic_num: 0,
				quantity_limit: 0,
				recom: false
			},
			brandData: {}, // 品牌数据
			girdData: [],
			hasCityData: [], //已经存在于服务器的地区数据
			multipleSelection: [],
			hasCityId: null, //已存在/选中的数据，只有ID
			status: 0, //0代表是新增，1代表是修改
			id: 0,
			updateGoods: [],
			page_size: 0, //每页显示几个
			page: 0, //总页数
			currentPage: 1, //当前页
			pickerOptions1: {
				shortcuts: [{
					text: '今天',
					onClick(picker) {
						picker.$emit('pick', new Date());
					}
				}],
			},
			pickerOptions2: {
				disabledDate(time) {
					return time.getTime() < Date.now();
				}
			}
		}
	},
	created() {
	},
	mounted() {
		$('body,html').animate({ scrollTop: '0px' }, 300);
		
		console.log(this.$route.params)
		this.status = this.$route.params.status;
		if (this.status) {
			/*修改*/
			this.id = this.$route.params.id;
			this.queryData();
		}
		this.getBrand();
	},
	methods: {
		// 获取子组件传来的图片地址
		getImageData(data) {
			this.params.adv_content = data;
		},
		// 获取 品牌
		getBrand() {
			this.$HTTP(this.$httpConfig.getBrandList, {}, 'post').then((res) => {
				this.brandData = res.data.data;
			})
		},
		getGoodsData(data, hasCityData) {
			this.hasCityId = data;
			if (this.status) {
				this.updateGoods = hasCityData;
			} else {
				this.hasCityData = hasCityData;
			}
			console.log(this.status, hasCityData, this.updateGoods)
		},
		queryData() {
			this.$HTTP(this.$httpConfig.getPanicDetail, { id: this.id }, 'post').then((res) => {
				this.params = res.data.data;
				this.params.is_recommend = this.params.is_recommend == "1" ? true : false;
				this.params.end_time = Number((this.params.end_time) * 1000);
				this.params.start_time = Number((this.params.start_time) * 1000);
				if (this.params.goods_id != 0) {
					this.hasCityId = Number(this.params.goods_id);
					this.updateGoods.push(res.data.data);
				}
				console.log(this.hasCityId);
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
			this.params.end_time = Number((new Date(this.params.end_time)).valueOf() / 1000);
			this.params.start_time = Number((new Date(this.params.start_time)).valueOf() / 1000);
			if (this.hasCityId == null) {
				this.$message.error('请选择一个商品！！');
				return false;
			} else {
				this.params.goods_id = this.hasCityId;
			}
			console.log(Number(this.params.panic_num), this.updateGoods);
			if (this.status) {
				if (Number(this.params.panic_num) > Number(this.updateGoods[0].stock)) {
					this.$message.error('参加抢购数量不得超过商品库存！！');
					return false;
				}
				if (Number(this.params.quantity_limit) > Number(this.params.panic_num)) {
					this.$message.error('限购数量不得走过参加抢购数量！！');
					return false;
				}
				this.params.title = this.params.name;
				this.params.is_recommend = this.params.is_recommend == true ? 1 : 0;
				this.$HTTP(this.$httpConfig.savePanic, this.params, 'post').then((res) => {
					this.$message.success(res.data.message + ",即将跳转回列表页面");
					setTimeout(function () {
						that.to();
					}, 1000);
				}).catch((err) => {
					this.$message.error(err);
				})
			} else {
				console.log(this.hasCityData)
				if (Number(this.params.panic_num) > Number(this.hasCityData[0].stock)) {
					this.$message.error('参加抢购数量不得超过商品库存！！');
					return false;
				}
				if (Number(this.params.quantity_limit) > Number(this.params.panic_num)) {
					this.$message.error('限购数量不得走过参加抢购数量！！');
					return false;
				}
				this.$HTTP(this.$httpConfig.addPanic, this.params, 'post').then((res) => {
					this.$message.success(res.data.message + ",即将跳转回列表页面");
					setTimeout(function () {
						that.to();
					}, 1000);
				}).catch((err) => {
					this.$message.error(err);
				})
			}
		},
	},
	components: {
		UE,
		selectOneGoods
	}

}
</script>
<style type="text/css">
body {
  overflow: inherit;
}
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
.g_att {
  padding-bottom: 200px;
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
    i {
      color: #999;
    }
    .t_m {
      background: url(../../../../assets/return.jpg) no-repeat 15px #088be6;
      width: 135px;
      height: 32px;
      border: 1px solid #088be6;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 35px;
    }
  }
}
</style>
<style lang="less" scoped>
.classify {
  width: 1000px;
  .g_att {
    .currency {
      height: auto;
      min-height: 100px;
      line-height: 20px;
      padding: 10px;
      border-top: 0;
      color: #333;
      .ss {
        padding-left: 5px;
      }
      .z_info {
        padding-left: 65px;
        .goods_name {
          span {
            padding: 10px 0;
            b {
              color: #ff0000;
            }
          }
          select {
            margin: 10px 0;
            width: 150px;
            height: 32px;
            border: 1px solid #cccccc;
          }
        }
        .z_price {
          padding-left: 33px;
          span {
            padding: 10px 0;
            b {
              color: #ff0000;
            }
          }
          input {
            margin: 10px 0;
            width: 288px;
            height: 32px;
            border: 1px solid #cccccc;
          }
          .it_z {
            margin-left: 25px;
          }
          .price {
            width: 80px;
          }
        }
        .set {
          padding-left: 8px;
          span {
            padding: 10px 0;
          }
          .opt {
            padding-right: 140px;
            margin: 10px 0;
          }
          input {
            border: 0;
            margin: 0;
            width: 15px;
            height: 15px;
          }
        }
        .presell_days {
          padding-left: 33px;
          span {
            padding: 17px 0;
            b {
              color: #ff0000;
            }
          }
          .choose {
            padding: 0;
            margin: 17px 0;
            margin-left: 15px;
            border-radius: 3px;
            width: 70px;
            text-align: center;
            line-height: 20px;
            height: 20px;
            background-color: #088be6;
            cursor: pointer;
            color: #fff;
          }
          input {
            margin: 10px 0;
            margin-left: 4px;
            width: 288px;
            height: 32px;
            border: 1px solid #cccccc;
          }
        }
      }
      .discount {
        padding-left: 49px;
        span {
          padding: 10px 0;
        }
        .specification {
          margin-top: 10px;
          margin-left: 5px;
          border: 1px solid #dddddd;
          color: #a4a5a7;
          tr {
            td {
              border-bottom: 1px solid #ddd;
              padding: 10px 0;
              line-height: 24px;
              font-size: 12px;
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
              padding: 0;
            }
          }
        }
      }
      .editor {
        padding: 20px 0 0 97px;
        overflow: hidden;
        span {
          padding: 150px 0;
        }
        .ue {
          width: 800px;
        }
      }
      .button {
        height: 32px;
        margin: 20px 0 20px 157px;
        border-radius: 6px;
        background: #088be6;
        width: 199px;
        span {
          display: block;
          line-height: 32px;
          color: #fff;
          text-align: center;
          cursor: pointer;
        }
      }
    }
  }
}
</style>