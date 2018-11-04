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
				<el-input v-model="title" :maxlength="60" size="medium" style="width: 250px;" clearable>
				</el-input>
				<p class="cue">请输入商品名,不能超过60个字符</p>
			</div>
			<div class="goods_brief">
				<span class="fl">商品简介：</span>
				<el-input style="width: 288px;" type="textarea" :maxlength="60" :autosize="{ minRows: 2, maxRows: 4}" v-model="description">
				</el-input>
				<p class="cue">请输入商品简介,不能超过60个字符</p>
			</div>
			<div class="goods_classify" style="margin: 10px 0;">
				<span><b class="red">*</b> 商品分类： </span>
				<el-select v-model="class_id" @change="selectChild()" filterable placeholder="请选择">
					<el-option v-for="item in classData" :key="item.id" :label="item.class_name" :value="item.id">
					</el-option>
				</el-select>
				<el-select @change="selectChildByTwo()" v-if="classByTwo.length !== 0" v-model="class_two" filterable placeholder="请选择">
					<el-option v-for="(items,indexs) in classByTwo" :key="indexs" :label="items.class_name" :value="indexs">
					</el-option>
				</el-select>
				<el-select v-if="classByThree.length !== 0" @change="va" v-model="class_three" filterable placeholder="请选择">
					<el-option v-for="(items,indexs) in classByThree" :key="indexs" :label="items.class_name" :value="indexs">
					</el-option>
				</el-select>
			</div>
			<div class="goods_brand public">
				<span>商品品牌： </span>
				<el-select v-model="brand_id" placeholder="请选择" style="margin: 10px 0;">
					<el-option v-for="(item,index) in brandData" :key="index" :label="item" :value="index">
					</el-option>
				</el-select>
			</div>
			<div class="market_price z_price">
				<span><b class="red">*</b> 市场价： </span>
				<el-input v-model="price_market" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
			</div>
			<div class="Member_price z_price">
				<span><b class="red">*</b> 会员价： </span>
				<el-input v-model="price_member" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 元
			</div>
			<div class="depot_num z_num">
				<span><b class="red">*</b> 仓库数量： </span>
				<el-input v-model="stock" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> 个
			</div>
			<div class="depot_num z_num">
				<span><b class="red">*</b> 商品重量：</span>
				<el-input v-model="weight" size="medium" style="width: 250px;margin: 10px 0;" clearable>
				</el-input> g
			</div>
			<div class="goods_classify" style="margin: 10px 0;">
				<span><b class="red">*</b> 运费设置：</span>
				<el-select v-model="freight" placeholder="请选择" style="margin: 10px 0;">
					<el-option v-for="(item,index) in freightData" :key="index" :label="item" :value="index">
					</el-option>
				</el-select>
				<el-button @click.native="tolink" type="success">新建运费模板</el-button>
				<el-button @click.native="getFreight" type="success">重新加载</el-button>
			</div>
			<div class="set">
				<span>设置： </span>
				<input type="checkbox" v-model="shelves">
				上架
				<input type="checkbox" v-model="recommend">
				推荐
			</div>
		</div>
		<div class="presell_days">
			<span><b class="red">*</b> 预售天数(库存为0)：</span>
			<el-input v-model="advance_date" size="medium" style="width: 250px;margin: 10px 0;" clearable>
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
import UE from './UE';
export default {
	name: 'currency',
	data() {
		return {
			defaultMsg: '',
			config: {
				initialFrameWidth: null,
				initialFrameHeight: 350
			},
			title: '',   // 商品名称
			description: '',  // 商品简介
			class_id: 0,    // 第一级分类
			class_two: 0,    // 第二级分类
			class_three: 0,    // 第三级分类编号
			brand_id: 0,    // 品牌编号
			classData: {},   // 一级分类
			price_market: 0.00, // 市场价
			price_member: 0.00,// 会员价
			advance_date: 0,  // 预售期
			shelves: 0,  // 是否上架
			recommend: 0,  // 是否推荐
			stock: 0,  // 库存
			detail: '', //商品详情
			brandData: {}, // 品牌数据
			classByTwo: [], // 二级分类数据
			classByThree: [],  // 三级分类数据
			weight: 0.0, // 重量 以克为计量单位
			freight: '',		//运费模板
			freightData: []
		};
	},
	props: [],
	created() {
		//是否登录
		
		this.getClass();
		this.getBrand();
		this.getFreight();
	},
	methods: {
		tolink() {
			const { href } = this.$router.resolve({
				name: 'logistics'
			})
			window.open(href, '_blank')
		},
		getUEContent() {
			let content = this.$refs.ue.getUEContent();
			console.log(content);
			return content;
		},
		//给全局变量赋值
		va() {
			this.$store.state.three_class_id = this.class_three;
		},
		// 获取 品牌
		getBrand() {
			this.$HTTP(this.$httpConfig.getBrandList, {}, 'post').then((res) => {
				this.brandData = res.data.data;
			})
		},
		//获取运费
		getFreight() {
			this.$HTTP(this.$httpConfig.getGoodsFreightList, {}, 'post').then((res) => {
				this.freightData = res.data.data;
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		//商品分类搜索
		getClass() {
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: parseInt(this.class_id)
			}, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg(res.data.message);
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
			console.log(this.class_id);
			//获取分类
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: parseInt(this.class_id)
			}, 'post').then((res) => {
				if (!res.data.data) {
					this.$layer.msg(res.data.message);
					return;
				}
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
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: parseInt(this.class_two)
			}, 'post').then((res) => {
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
			let dataJson = {
				'id': 0,
				'class_id': this.class_id,
				'class_two': this.class_two,
				'class_three': this.class_three,
				'brand_id': this.brand_id,
				'recommend': Number(this.recommend),
				'shelves': Number(this.shelves),
				'advance_date': this.advance_date,
				'stock': this.stock,
				'price_market': this.price_market,
				'price_member': this.price_member,
				'weight': this.weight,
				'express_id': this.freight
			};
			for (let i in dataJson) {
				console.log(dataJson[i]);
				if (isNaN(dataJson[i])) {
					this.$layer.msg('数据不合法');
					return;
				}
			}
			if (!/^[\u4e00-\u9fa5\s_a-zA-Z0-9]+$/.test(this.title)) {
				this.$layer.msg('商品名称异常');
				return false;
			}
			dataJson['title'] = this.title;
			dataJson['detail'] = this.getUEContent();
			dataJson['description'] = this.description;
			console.log(dataJson);
			// 提交商品基本信息
			this.$HTTP(this.$httpConfig.addGoods, dataJson, 'post').then((res) => {
				this.$message.success(res.data.message);
				if (!this.$store.state.tab_Index[1]) {
					this.$store.state.tab_Index.push(1);
				}
				this.$emit('selectTab');
				this.$store.state.tab_state = 1;
			}).catch((err) => {
				console.log(err)
			});
		}
	},
	components: {
		UE
	},
}
</script>
<style>
body {
  overflow: inherit;
}
</style>
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