<template>
	<!-- 商品管理 -->
	<div class="shopManage fl">
		<h1 class="titles size16">商品管理 - 列表</h1>
		<div class="notes-box">
			<div class="notes_title">温馨提示</div>
			<div class="notes_content">
				<p>1.该列表只能管理SPU(商品组)</p>
				<p>2.点击查看按钮操作SKU（商品列表），只有商品列表有数据时WAP端和PC端才能看到商品</p>
				<p>3.勾选“是否推荐”才能展示在首页</p>
				<p>4.添加的商品只有后台审核通过才有效</p>
				<p>5.点击操作栏的“出售中/已下架"可以直接切换状态</p>
			</div>
		</div>
		<div class="order_seek">
			<div class="crux clearfix">
				<div class="seek_l">
					<div>商品标题：
						<el-input v-model="title" placeholder="请输入内容" clearable style="width: 150px;height: 40px;">
						</el-input>
					</div>
				</div>
				<div class="seek_l">商品状态 ：
					<el-select v-model="shelves_status" placeholder="请选择">
						<el-option v-for="(item, index) in shelves" :key="index" :label="item" :value="index">
						</el-option>
					</el-select>
				</div>
				<div class="z_s_list">
					<div>审核状态：
						<el-select v-model="approval_status" placeholder="请选择">
							<el-option v-for="(item, index) in approval" :key="index" :label="item" :value="index">
							</el-option>
						</el-select>
					</div>
				</div>
				<el-button @click="search()" type="success">搜索</el-button>
			</div>
		</div>
		<div class="order_minute">
			<div class="col">
				<div class="minute_g">
				</div>
				<div class="black">编号</div>
				<div class="black">商品名称</div>
				<div class="black">本店价（元）</div>
				<div class="black">库存</div>
				<div class="black">状态</div>
				<div class="black">发布时间</div>
				<div class="black">操作</div>
			</div>
		</div>
		<div class="order_minute">
			<div class="shop" v-for="(item,index) in goodsData" :key="index">
				<div class="minute_g"><input type="checkbox" class="all" name="list_select"></div>
				<div class="num">{{item.id}}</div>
				<div class="shop_name">
					<img :src="URL+item.pic_url" alt="" class="shop_img">
					<span class="name">
						<span id="name">{{item.title}}</span>
						<span id="single">{{item.description}}</span>
					</span>
				</div>
				<div class="fl ping">￥{{item.price_member}}</div>
				<div class="fl ping">{{item.stock}}</div>
				<div class="fl ping color">
					<span @click="sale(item, index)" class="cursor">
						{{shelves[item.shelves]}}
					</span>
				</div>
				<div class="fl ping">
					<time-Plunge :timePlunge="item.create_time"></time-Plunge>
				</div>
				<div class="fl danj">
					<el-button @click.native="edit(item)" icon="el-icon-edit"></el-button>
					<!--弹出详情信息-->
					<el-popover placement="top-start" width="100%" trigger="click">
						<el-table :data="gridData" border>
							<el-table-column width="50" property="id" label="ID"></el-table-column>
							<el-table-column show-overflow-tooltip="" width="250" property="title" label="名称"></el-table-column>
							<el-table-column width="100" property="class_name" label="分类"></el-table-column>
							<el-table-column width="100" property="price_market" label="市场价"></el-table-column>
							<el-table-column width="100" property="price_member" label="会员价"></el-table-column>
							<el-table-column width="80" property="stock" label="库存"></el-table-column>
							<el-table-column width="50" label="上架">
								<template slot-scope="scope">
									<el-switch v-model="isMarks[scope.$index]" active-color="#13ce66" inactive-color="#ff4949" @click.native="goodsGoodsSheve(scope.row.id,isMarks[scope.$index],scope.$index)">
									</el-switch>
								</template>
							</el-table-column>
							<el-table-column width="50" property="recommend" label="推荐">
								<template slot-scope="scope">
									<el-switch disabled v-model="recommends[scope.$index]" active-color="#13ce66" inactive-color="#ff4949">
									</el-switch>
								</template>
							</el-table-column>
							<el-table-column width="150" label="操作">
								<template slot-scope="scope">
									<el-button type="success" size="small" @click="toShop(scope.row.id)">预览</el-button>
									<el-button type="danger" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-button @click="goodsDetail(item.id)" slot="reference">查看</el-button>
					</el-popover>
					<el-button size="small" @click="sale(item,index)">{{shelves[item.shelves]}}</el-button>
					<el-button @click="delItem(item.id)" icon="el-icon-delete"></el-button>
				</div>
			</div>
		</div>
		<div class="Paging">
			<div class="Paging_checkbox">
				<input type="checkbox" @click="allCheck()" class="all" name="all">
			</div>
			<div class="fl pil">删除</div>
			<div class="Paging_r">
				<el-pagination background layout="total,prev, pager, next,jumper" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
import timePlunge from "../../../page/time";
import Vue from 'vue'
const $vue = new Vue()
// import goodslookFrom from '../children/goodslookFrom.vue';
//	import goodsDetail from "./goodsManagerDetail"
export default {
	name: 'manage',
	data() {
		return {
			gridData: [],
			goodsData: {},
			shelves: [
				'已下架',
				'出售中'
			],
			approval: [
				'审核中',
				'已审核',
				'拒绝审核'
			],
			recommends: [], //商品详情里面的是否推荐
			isMarks: [], //商品推荐里面的是否上架
			shelves_status: 0, //上架状态
			title: '', //商品标题
			approval_status: 0, //审核状态
			page: 0, //共多少页
			currentPage: 1, //当前页
			page_size: 0 //每页显示多少条数据
		};
	},
	components: {
		timePlunge,
	},
	created() {
		
		this.getGoodsList();
		var that = this;
		document.onkeydown = function (e) {
			var keyNum = window.event ? e.keyCode : e.which;
			if (keyNum == 13) {
				that.search();
			}
		};
	},

	methods: {
		toShop(id) {
			window.open('http://b2b2c.youyoulegou.cn/#/inroyaldrink/' + id);
		},
		delItem(id) {
			this.$confirm('此操作将永久删除此商品，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$HTTP(this.$httpConfig.delGoods, { id: id }, 'post').then((res) => {
					this.$message.success(res.data.message);
					this.getGoodsList();
				}).catch((err) => {
					this.$message.error(err);
				});
			}).catch(() => {
				this.$message.info('已取消删除');
			});
		},
		// 商品编辑
		edit(item) {
			this.$router.push({
				name: 'goodsEdit',
				params: {
					id: item.id
				}
			})
		},
		//全选和取消全选
		allCheck: function () {
			var list_selects = document.getElementsByName("list_select");
			var checkBox = document.getElementsByName("all");
			if (checkBox[0].checked == true) {
				for (var i = 0; i < list_selects.length; i++) {
					list_selects[i].checked = true;
				}
			} else {
				for (var i = 0; i < list_selects.length; i++) {
					list_selects[i].checked = false;
				}
			}
		},
		/*页面跳转*/
		handleCurrentChange: function (currentPage) {
			console.log(currentPage);
			this.currentPage = currentPage;
			this.getGoodsList();
		},
		/*得到默认所有列表数据*/
		getGoodsList: function () {
			this.$HTTP(this.$httpConfig.getGoodsList + '/p/' + this.currentPage, {
				p: this.currentPage
			}, 'post').then((res) => {
				console.log(res)
				this.goodsData = res.data.data.data;
				this.page_size = parseInt(res.data.data.page_size);
				this.page = parseInt(res.data.data.page);
				this.$message.success('数据加载完毕！');
			}).catch((err) => {
				console.log(err)
			});
		},
		log: function (data) {
			console.log(data);
		},
		/*商口列表里商品数组中的商品==是否上架*/
		goodsGoodsSheve: function (goods_id, isMark, index) {
			console.log(goods_id, Number(isMark));
			this.$HTTP(this.$httpConfig.setShelve, {
				id: goods_id,
				shelves: Number(isMark),
			}, 'post').then((res) => {
				this.$layer.msg(res.data.message);
				this.isMarks[index] = isMark;
			}).catch((err) => {
				console.log(err)
			});
		},
		lookInfo(goodsId) {
			/*this.$layer.iframe({
				content: {
					content: goodsDetail, //传递的组件对象
					parent: this, //当前的vue对象
					data: [goodsId] //props
				},	
				area: ['800px', '600px'],
				title: "查看商品信息"
			});*/
		},

		//搜索
		search() {
			let number = [this.approval_status, this.shelves_status];
			let length = number.length;
			let index = 0;
			for (index; index < length; index++) {
				if (!/\d/.test(number[index])) {
					this.$layer.msg('数据异常');
					return false;
				}
			}
			if (this.title != '' && !/^[\u4e00-\u9fa5\s_a-zA-Z0-9]+$/.test(this.title)) {
				this.$layer.msg('商品名称异常');
				return false;
			}
			this.$HTTP(this.$httpConfig.getGoodsList + '/p/' + this.currentPage, {
				title: this.title,
				shelves: this.shelves_status,
				approval_status: this.approval_status
			}, 'post').then((res) => {
				if (res.data.data === null) {
					this.goodsData = {};
				} else {
					this.goodsData = res.data.data.data;
				}
				console.log(res.data.message)
				this.$layer.msg(res.data.message)
				this.page_size = parseInt(res.data.data.page_size);
				this.page = Number(res.data.data.page * this.page_size);
				console.log(typeof (this.page_size))
			}).catch((err) => {
				this.$layer.msg(err)
			});
		},

		/*商品详情*/
		goodsDetail(goods_id) {
			console.log(goods_id);
			
			this.$HTTP(this.$httpConfig.getChildGoodsList, {
				id: goods_id
			}, 'post').then((res) => {
				let list = res.data.data
				this.gridData = list;
				for (let i = 0; i < list.length; i++) {
					this.recommends[i] = Number(list[i].recommend) == 1 ? true : false;
					this.isMarks[i] = Number(list[i].shelves) == 1 ? true : false;
				}
			}).catch((err) => {
				console.log(err)
			});
		},

		//上下架
		sale(item, index) {
			console.log(item.id)
			let shelves = parseInt(item.shelves);
			shelves = shelves === 1 ? 0 : 1;
			this.$HTTP(this.$httpConfig.setShelve, {
				id: item.id,
				shelves: shelves,
			}, 'post').then((res) => {
				this.$layer.msg(res.data.message);
				this.goodsData[index].shelves = shelves;
			}).catch((err) => {
				console.log(err)
			});
		},

		/*删除单独的商品*/
		delSingleGoods(goods) {
			this.$confirm('此操作将永久删除' + goods.title + ', 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$HTTP(this.$httpConfig.delChildGoods, {
					id: goods.id
				}, 'post').then((res) => {
					this.$message.success(res.data.message);
					this.getGoodsList();
				}).catch((err) => {
					this.$message.error(err);
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		}
	},
}
</script>

<style type="text/css">
body {
  overflow: inherit;
}
.shopManage .order_minute .shop .shop_name .name #name {
  white-space: nowrap !important;
  overflow: hidden !important;
  display: -webkit-box !important;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: #333;
  height: 22px !important;
  line-height: 22px !important;
}
#single {
  height: 35px;
  white-space: nowrap !important;
  overflow: hidden !important;
  display: -webkit-box !important;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
<style lang="less" scoped>
.el-input--medium .el-input__inner {
  height: 40px;
}

* {
  box-sizing: border-box;
}

.cursor {
  cursor: pointer;
}

.el-button {
  padding: 5px 12px;
}

.shopManage {
  width: 1000px;
  padding-bottom: 80px;
  .titles {
    color: #333;
    border-bottom: 1px solid #dddddd;
    overflow: hidden;
    margin-bottom: 22px;
    line-height: 50px;
  }
  .fl {
    float: left;
  }
  .order_seek {
    background-color: #f6f6f6;
    border: 1px solid #dddddd;
    margin-top: 15px;
    overflow: hidden;
    line-height: 50px;
    .crux {
      .seek_l {
        overflow: hidden;
        float: left;
        margin-left: 40px;
        .name {
          width: 200px;
        }
      }
      .z_s_list {
        overflow: hidden;
        float: left;
        margin-left: 33px;
      }
      div:nth-child(1) {
        margin-left: 7px;
      }
      button {
        margin: 10px 0 10px 40px;
        width: 70px;
        height: 35px;
      }
    }
  }
  .order_minute {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-top: 1px solid #ddd;
    margin-top: 15px;
    width: 100%;
    overflow: hidden;
    .m_t {
      margin-top: 25px;
      width: 100%;
    }
    .col {
      border: none;
      width: 100%;
      background-color: #f9fafa;
      overflow: hidden;
      border-bottom: 1px solid #ddd;
      .black {
        color: #333;
        font-size: 12px;
        text-align: center;
        font-weight: 600;
        float: left;
      }
      .hm {
        line-height: 40px;
      }
    }
    .col div {
      height: 40px;
      line-height: 40px;
    }
    .col div:nth-child(1) {
      width: 5%;
      float: left;
    }
    .col div:nth-child(2) {
      width: 5%;
      float: left;
    }
    .col div:nth-child(3) {
      width: 30%;
      float: left;
    }
    .col div:nth-child(4) {
      width: 8%;
      float: left;
    }
    .col div:nth-child(5) {
      width: 8%;
      float: left;
    }
    .col div:nth-child(6) {
      width: 8%;
      float: left;
    }
    .col div:nth-child(7) {
      width: 8%;
      float: left;
    }
    .col div:nth-child(8) {
      width: 28%;
      float: left;
    }
    .all {
      outline: 0 none;
      vertical-align: middle;
      text-indent: 5px;
      border: 1px solid #ff920b;
      display: block;
      margin: auto;
      margin-top: 14px;
      width: 20px;
      height: 20px;
    }
    .shop {
      width: 100%;
      overflow: hidden;
      background-color: #fff;
      height: 88px;
      border-bottom: 1px solid #ddd;
      .shop_img {
        width: 58px;
        height: 58px;
        border: 1px solid #ddd;
        float: left;
        margin-top: 12px;
        margin-left: 20px;
      }
      .minute_g {
        width: 5%;
        float: left;
        input {
          height: 65px;
          line-height: 40px;
        }
      }
      .shop_name {
        width: 40%;
        display: flex;
        flex-direction: row;
        padding: none !important;
        padding-left: 0 !important;
        .name {
          display: block;
          float: left;
          span {
            display: block;
            width: 200px;
            overflow: hidden;
            height: 20px;
          }
        }
      }
      .ping {
        width: 9%;
        line-height: 88px;
        text-align: center;
      }
      .ping:nth-child(4) {
        /*line-height: normal;*/
      }
      .color {
        color: #259d0e;
      }
      .danj {
        width: 24%;
        line-height: 88px;
        text-align: center;
        span {
          color: #666666;
          line-height: 22px;
          text-align: center;
          display: block;
          border-radius: 4px;
          float: left;
          margin-right: 15px;
          margin-top: 30px;
          cursor: pointer;
        }
        span:nth-child(1) {
          margin-left: 20px;
        }
      }
      .num {
        width: 5%;
        text-align: center;
        line-height: 88px;
        overflow: hidden;
        height: 88px;
        float: left;
      }
      .caozu {
        width: 15%;
        line-height: 88px;
        text-align: center;
      }
    }
  }
  .Paging {
    width: 100%;
    height: 50px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .Paging_checkbox {
      width: 5%;
      float: left;
      height: 50px;
      input {
        display: block;
        margin: auto;
        margin-top: 20px;
      }
      .all {
        outline: 0 none;
        vertical-align: middle;
        text-indent: 5px;
        border: 1px solid #ff920b;
        display: block;
        margin: auto;
        margin-top: 14px;
        width: 20px;
        height: 20px;
      }
    }
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
}
</style>