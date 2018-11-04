<template>
	<!-- 促销-积分商品列表 -->
	<div class="shopManage fl">
		<h1 class="titles">
			<span class="size16">积分商品列表</span>
			<i>（ 共 {{dataTable.length}} 条记录 ）</i>
			<div class="t_add fr" @click="tolink">添加积分商品</div>
		</h1>
		<div class="notes-box">
			<div class="notes_title">温馨提示</div>
			<div class="notes_content">
				<p>1.点击右上角添加按钮即可添加积分商品</p>
				<p>2.添加之后的商品会直接显示在客户端</p>
			</div>
		</div>
		<div class="order_seek">
			<div class="crux clearfix">
				<div class="seek_l">
					<div>商品 ID ：
						<el-input v-model="goods_id" placeholder="请输入ID" clearable style="width: 250px;height: 40px;">
						</el-input>
					</div>
				</div>
				<div class="btn_z fl">
					<el-button type="success" @click="getData" size="small">搜索</el-button>
				</div>
			</div>
		</div>
		<el-table border :data="dataTable" style="width: 100%" max-width="900">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column width="60" prop="goods_id" label="商品ID">
			</el-table-column>
			<el-table-column show-overflow-tooptip prop="title" label="商品名称">
			</el-table-column>
			<el-table-column width="80" prop="integral" label="需要积分">
			</el-table-column>
			<el-table-column width="80" prop="price_member" label="会员价">
			</el-table-column>
			<el-table-column width="80" prop="stock" label="库存">
			</el-table-column>
			<el-table-column width="80" label="是否显示">
				<template slot-scope="scope">
					<el-switch @click.native="setStatus(scope.row.id,isShow[scope.$index],scope.$index)" v-model="isShow[scope.$index]"></el-switch>
				</template>
			</el-table-column>
			<el-table-column width="150" label="添加时间">
				<template slot-scope="scope">
					<time-Plunge :timePlunge="scope.row.create_time"></time-Plunge>
				</template>
			</el-table-column>
			<el-table-column width="140" label="操作">
				<template slot-scope="scope">
					<el-button @click="edit(scope.row.id)" size="mini" icon="el-icon-edit"></el-button>
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
</template>
<script>
import timePlunge from "../../../page/time";
// import goodslookFrom from '../children/goodslookFrom.vue';
//	import goodsDetail from "./goodsManagerDetail"
export default {
	name: 'manage',
	data() {
		return {
			id: '',
			page_size: 0, //每页显示几个
			page: 0, //总页数
			currentPage: 1, //当前页
			dataTable: [],
			isShow: [],
			goods_id: ''
		};
	},
	components: {
		timePlunge,
	},
	created() {
		
		this.getData();
	},
	methods: {
		setStatus(id, status, index) {
			this.$HTTP(this.$httpConfig.setIntegralShow, {
				id: id,
				isShow: Number(status)
			}, 'post').then((res) => {
				this.isShow[index] = status;
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		tolink() {
			this.$router.push('/addIntegralGooods')
		},
		/*页面跳转*/
		handleCurrentChange: function (currentPage) {
			console.log(currentPage);
			this.currentPage = currentPage;
			this.getData();
		},
		getData() {
			this.$HTTP(this.$httpConfig.getIntegralList, {
				goods_id: this.goods_id,
				page: this.currentPage
			}, 'post').then((res) => {
				this.dataTable = res.data.data.data;
				for (var i in this.dataTable) {
					this.isShow[i] = this.dataTable[i].is_show == '1' ? true : false;
				}
				this.page_size = res.data.data.page_size;
				this.page = Number(res.data.data.page * res.data.data.page_size);
				this.$message.success(res.data.message);
			}).catch((res) => {
				this.$message.error(res.data.message);
			})
		},
		edit: function (value) {
			this.$router.push({
				name: 'addIntegralGooods',
				params: {
					status: 1,
					id: value
				}
			});
		},
		deleteItem(value) {
			this.$confirm('此操作将永久删除此活动，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$HTTP(this.$httpConfig.delIntegral, { id: value }, 'post').then((res) => {
					console.log(res.data);
					this.$message.success(res.data.message);
					this.getData();
				}).catch((err) => {
					this.$message.error(err);
				});
			}).catch(() => {
				this.$message.info('已取消删除');
			});
		}
	},
}
</script>
<style type="text/css">
.el-table .cell {
  text-align: center;
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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

.shopManage {
  width: 1000px;
  .titles {
    color: #333;
    border-bottom: 1px solid #dddddd;
    overflow: hidden;
    margin-bottom: 22px;
    line-height: 50px;
    span {
      float: left;
      color: #333;
    }
    .t_add {
      background: url(../../../../assets/plus2.jpg) no-repeat 20px #ff9f24;
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
    i {
      color: #999;
    }
  }
  .fl {
    float: left;
  }
  .title {
    width: 100%;
    line-height: 50px;
    color: #333;
    font-size: 16px;
    border-bottom: 1px solid #dddddd;
    overflow: hidden;
    margin-bottom: 22px;
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
      div:nth-child(1) {
        margin-left: 7px;
      }
      .btn_z {
        margin: 10px 20px;
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
      width: 25%;
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
      width: 15%;
      float: left;
    }
    .col div:nth-child(9) {
      width: 18%;
      float: left;
    }
    .all {
      outline: 0 none;
      vertical-align: middle;
      text-indent: 5px;
      border: 1px solid blue;
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
        text-align: center;
        width: 25%;
        float: left;
        .name {
          display: block;
          float: left;
          margin-left: 10px;
          margin-top: 15px;
          span {
            display: block;
            width: 200px;
            overflow: hidden;
            height: 25px;
          }
        }
      }
      .ping {
        width: 8%;
        line-height: 88px;
        text-align: center;
      }
      .addTime {
        width: 15%;
      }
      .x_btn {
        width: 18%;
        padding: 0;
      }
      .color {
        color: #259d0e;
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