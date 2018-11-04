<template>
	<div class="currency">
		<div class="notes-box">
			<div class="notes_title">温馨提示</div>
			<div class="notes_content">
				<p>发布商品前必须添加对应分类的商品规格</p>
			</div>
		</div>
		<p class="d_title size14">店铺经营信息</p>
		<div class="z_info">
			<div class="goods_name">
				<span><b class="red">*</b> 商品名称： </span>
				<el-input v-model="goods.title" :maxlength="60" size="medium" style="width: 250px;" clearable>
				</el-input>
				<p class="cue">请输入商品名,不能超过60个字符</p>
			</div>
			<div class="goods_brief">
				<span class="fl">商品简介：</span>
				<el-input style="width: 288px;" type="textarea" :maxlength="60" :autosize="{ minRows: 2, maxRows: 4}" v-model="goods.description">
				</el-input>
				<p class="cue">请输入商品简介,不能超过60个字符</p>
			</div>
			<div class="goods_classify" style="margin: 10px 0;">
				<span><b class="red">*</b> 商品分类： </span>
				<el-select v-model="goods.class_id" @change="selectChild(status)" filterable placeholder="请选择">
					<el-option v-for="item in classData" :key="item.value" :disabled="true" :label="item.class_name" :value="item.id">
					</el-option>
				</el-select>
				<!-- {{classByTwo}} -->
				<el-select @change="selectChildByTwo()" v-if="classByTwo.length !== 0" v-model="goods.class_two" filterable placeholder="请选择">
					<el-option v-for="(items,indexs) in classByTwo" :key="indexs" :disabled="true" :label="items.class_name" :value="indexs">
					</el-option>
				</el-select>
				<el-select v-if="classByThree.length !== 0" @change="va" v-model="goods.class_three" filterable placeholder="请选择">
					<el-option v-for="(items,indexs) in classByThree" :key="indexs" :disabled="true" :label="items.class_name" :value="indexs">
					</el-option>
				</el-select>
			</div>
			<div class="goods_brand public">
				<span>商品品牌： </span>
				<el-select v-model="goods.brand_id" placeholder="请选择" style="margin: 10px 0;">
					<el-option v-for="(item,index) in brandData" :key="index" :label="item" :value="index">
					</el-option>
				</el-select>
			</div>
			<div class="market_price z_price">
				<span><b class="red">*</b> 市场价： </span>
				<el-input v-model="goods.price_market" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
			</div>
			<div class="Member_price z_price">
				<span><b class="red">*</b> 会员价： </span>
				<el-input v-model="goods.price_member" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
			</div>
			<div class="depot_num z_num">
				<span><b class="red">*</b> 仓库数量： </span>
				<el-input v-model="goods.stock" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 个
			</div>
			<div class="depot_num z_num">
				<span><b class="red">*</b> 商品重量：</span>
				<el-input v-model="goods.weight" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> g
			</div>
			<div class="goods_classify" style="margin: 10px 0;">
				<span><b class="red">*</b> 运费设置：</span>
				<el-select v-model="goods.express_id" placeholder="请选择" style="margin: 10px 0;">
					<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
					</el-option>
				</el-select>
				<el-button @click.native="tolink" type="success">新建运费模板</el-button>
				<el-button @click.native="getFreight" type="success">重新加载</el-button>
			</div>
			<div class="set">
				<span>设置： </span>
				<input type="checkbox" v-model="goods.shelves">
				上架
				<input type="checkbox" v-model="goods.recommend">
				推荐
			</div>
		</div>
		<div class="presell_days">
			<span><b class="red">*</b> 预售天数(库存为0)：</span>
			<el-input v-model="goods.advance_date" size="medium" style="width: 250px;margin: 10px 0;" clearable>
			</el-input> 天
		</div>
		<div class="editor">
			<span class="fl">商品详情描述： </span>
			<div class="ue fl">
				<UE :defaultMsg="defaultMsg" :config="config" ref="ue"></UE>
			</div>
		</div>
		<div class="button">
			<span @click="addGoods">确认提交</span>
		</div>
	</div>
</template>
<script>
import UE from '../../goodsRelease/children/UE';
export default {
	name: 'currency',
	data() {
		return {
			defaultMsg: '',
			list: [],
			config: {
				initialFrameWidth: null,
				initialFrameHeight: 350
			},
			status: false, //首次获取分类状态
			goods_detail: '',
			goods: {
				advance_date: '',    // 预售期
				// approval_status :'',
				brand_id: 0,         // 品牌编号
				class_id: 0,         // 第一级分类
				class_two: 0,       // 第二级分类
				class_three: 0,     // 第三级分类编号
				// create_time :'',       
				// id :'',
				price_market: 0.00,  // 市场价
				price_member: 0.00,  //会员价
				shelves: 0,  //是否上架
				stock: 0,            //库存
				// title :'',           //商品名称
				weight: 0.0,        // 重量 以克为计量单位
				express_id: '',		//运费模板
				recommend: '0'
			},
			class_two: 0,    // 第二级分类
			class_three: 0,    // 第三级分类编号
			classData: {},   // 一级分类
			brandData: {}, // 品牌数据
			classByTwo: [], // 二级分类数据
			classByThree: [],  // 三级分类数据
			freightData: [],
			detail: ' '
		};
	},
	props: [],
	created() {
		//是否登录
		
		this.getData();
		this.getClass();
		this.getBrand();
		this.getFreight();
	},
	methods: {
		//参数
		goodsParameter() {
			this.$HTTP(this.$httpConfig.getGoodsAttrDetail, { class_three: this.three_class_id }, 'post').then((res) => {
				if (res.data.data != null) {
					this.$store.state.relInfo_tow = res.data.data;
				} else {
					this.$store.state.relInfo_tow = '暂无数据';
				}
				// this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		tolink() {
			const { href } = this.$router.resolve({
				name: 'logistics'
			})
			window.open(href, '_blank')
		},
		//获取编辑数据
		getData() {
			this.$HTTP(this.$httpConfig.getGoodsDetail,{id: this.$route.params.id}).then((res) => {
				this.goods = res.data.data.goods;
				this.$store.state.three_class_id_tow = this.goods.class_three;
				this.$emit('getSpec');
				this.goods.recommend = this.goods.recommend == '0' ? false : true;
				if (this.goods.class_id) {
					this.status = true;
					this.selectChild(this.status);
				}
				// this.va();
				let obj = this.$refs.ue.editor;
				this.defaultMsg = res.data.data.goods_detail.detail;
				obj.setContent(this.defaultMsg);
			}).catch((err) => {
				console.log(err);
			})
		},
		getUEContent() {
			let content = this.$refs.ue.getUEContent();
			// console.log(content);
			return content;
		},
		//给全局变量赋值
		va() {
			this.$store.state.three_class_id_tow = this.goods.class_three;
			console.log(this.$store.state.three_class_id_tow)
		},
		// 获取 品牌
		getBrand() {
			this.$HTTP(this.$httpConfig.getBrandList,{}).then((res) => {
				this.brandData = res.data.data;
			})
		},
		//获取运费
		getFreight() {
			this.$HTTP(this.$httpConfig.getGoodsFreightList, {}, 'post').then((res) => {
				this.freightData = res.data.data;
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		//商品分类搜索
		getClass() {
			//获取分类
			this.$HTTP(this.$httpConfig.getClassById, { goods_class_id: parseInt(this.goods.class_id) }, 'post').then((res) => {
				if (!res.data.data) {
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
		selectChild(status) {
			if (this.status === false) {
				this.goods.class_two = null;
				this.goods.class_three = null;
				this.classByTwo = [];
				this.classByThree = [];
			} else {
				this.class_two = null
				this.class_three = null;
			}
			// console.log(this.class_id);
			//获取分类
			this.$HTTP(this.$httpConfig.getClassById, { goods_class_id: parseInt(this.goods.class_id) }, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg(res.data.message);
					return;
				}
				this.classByTwo = res.data.data;
				this.status = false;
				if (this.goods.class_two) {
					this.selectChildByTwo();
				}
				// console.log(this.classByThree)
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
			this.$HTTP(this.$httpConfig.getClassById, { goods_class_id: parseInt(this.goods.class_two) }, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg('暂无数据:(');
					return;
				}
				this.classByThree = res.data.data;
			}).catch((err) => {
				console.log(err)
			});
		},
		/**
		 * 添加商品
		 */
		addGoods() {
			if (!/^[\u4e00-\u9fa5\s_a-zA-Z0-9]+$/.test(this.goods.title)) {
				this.$layer.msg('商品名称异常');
				return false;
			}
			this.goods['recommend'] = Number(this.goods.recommend); //是否推荐
			this.goods['title'] = this.goods.title; //商品名称
			this.goods['detail'] = this.getUEContent(); //商品详情
			this.goods['description'] = this.goods.description; //商品简介
			// 提交商品基本信息
			console.log(this.goods);
			this.$HTTP(this.$httpConfig.saveGoods, this.goods, 'post').then((res) => {
				this.$message.success(res.data.message);
			}).catch((err) => {
				console.log(err)
			});
		}
	},
	mounted() {
		document.body.scrollTop = 0;
	},
	components: {
		UE
	},
}
</script>
<style lang="less" scoped>
.currency {
  width: 100%;
  height: auto;
  min-height: 100px;
  line-height: 20px;
  padding: 10px;
  border-top: 0;
  color: #333;
  .d_title {
    padding: 10px 0;
  }
  .ss {
    padding-left: 5px;
  }
  .z_info {
    padding-left: 65px;
    border-radius: 4px;
    .goods_name {
      span {
        padding: 10px 0;
        b {
          color: #ff0000;
        }
      }
      .text_name {
        margin: 10px 0;
        width: 288px;
        height: 32px;
        border: 1px solid #cccccc;
        border-radius: 4px;
      }
      .cue {
        padding: 10px 0 10px 75px;
      }
    }
    .goods_brief {
      padding-left: 12px;
      span {
        padding: 10px 0;
      }
      textarea {
        border: 1px solid #cccccc;
        margin: 10px 0;
      }
      .cue {
        padding: 10px 0 10px 63px;
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
    .public {
      padding-left: 12px;
      span {
        padding: 10px 0;
      }
      select {
        margin: 10px 0;
        width: 288px;
        height: 32px;
        border: 1px solid #cccccc;
        border-radius: 4px;
      }
    }
    .z_price {
      padding-left: 12px;
      border-radius: 4px;
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
        border-radius: 4px;
      }
    }
    .z_num {
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
        border-radius: 4px;
      }
    }
    .set {
      padding-left: 33px;
      span {
        padding: 10px 0;
      }
      input {
        margin: 10px 0;
        border: 0;
        width: 15px;
        height: 15px;
        border-radius: 4px;
      }
    }
  }
  .presell_days {
    padding-left: 12px;
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
      border-radius: 4px;
    }
  }
  .editor {
    padding: 10px 0 0 50px;
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
    margin: 20px 0 20px 135px;
    border-radius: 6px;
    background: #f7bc0a;
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
</style>