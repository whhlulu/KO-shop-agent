<template>
	<!-- 商品规格编辑 -->
	<div class="spec">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">商品规格列表</span>
				<div @click="add" class="t_add fr">添加商品规格</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>1.只有入驻时绑定的经营分类（商品分类）才有规格</p>
					<p>2.规格项须先在总后台管理中心添加</p>
				</div>
			</div>
			<div class="center" v-if="1">
				<div class="search">
					<span>规格组：</span>
					<el-input style="width: 250px;" placeholder="请输入内容" v-model="spec_id" clearable>
					</el-input>
					<span>规格项：</span>
					<el-input style="width: 250px;" placeholder="请输入内容" v-model="item" clearable>
					</el-input>
					<el-button @click="getList" style="float: right;" type="success" size="small" icon="el-icon-search">搜索</el-button>
				</div>
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="id" label="ID">
					</el-table-column>
					<el-table-column prop="name" label="规格组">
					</el-table-column>
					<el-table-column prop="item" label="规格项">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="success" @click="edit(scope.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="page_size">
					<el-pagination background layout="total,prev, pager, next,jumper" :page-size="page_size" @current-change="handleCurrentChange" :total="Number(page)">
					</el-pagination>
				</div>
			</div>
			<div v-else class="center_else">
				没有数据
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'spec',
	data() {
		return {
			value: true,
			tableData: [],
			page_size: 0, //每页显示几个
			page: 0, //总页数
			currentPage: 0, //当前页
			spec_id: '', // 规格组
			item: '' //规格项
		}
	},
	created() {
		this.getList();
	},
	methods: {
		/*得到默认所有列表*/
		getList() {
			this.$HTTP(this.$httpConfig.getGoodsSpecList + '/p/' + this.currentPage, {
				spec_id: this.spec_id,
				item: this.item
			}, 'post').then((res) => {
				this.tableData = [];
				let list = res.data.data.data;
				for (var i in list) {
					this.tableData.push(list[i]);
				}
				this.page_size = res.data.data.page_size;
				this.page = res.data.data.page;
			}).catch(
				(err) => {
					this.$message.error('' + err);
				}
			);
		},
		/*编辑跳转*/
		edit(item) {
			this.$router.push({
				name: 'updateGoodsSpec',
				params: {
					info: item
				}
			})
		},
		add(item) {
			this.$router.push({
				name: 'addGoodsSpec',
				params: {
					info: []
				}
			})
		},
		/*页面跳转*/
		handleCurrentChange: function (currentPage) {
			console.log(currentPage);
			this.currentPage = currentPage;
			this.getList();
		},
	}
}
</script>

<style lang="less" scoped>
.spec {
  width: 1000px;
  padding-bottom: 80px;
  .t_add {
    background: url(../../../../assets/plus2.jpg) no-repeat 35px #ff9f24;
    width: 135px;
    height: 32px;
    border: 1px solid #ff920b;
    border-radius: 4px;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
    color: #fff;
    line-height: 32px;
    text-indent: 50px;
  }
  .g_att {
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
  .center {
    .page_size {
      text-align: center;
      padding: 20px;
      width: 95%;
    }
    .search {
      padding: 10px;
      margin-bottom: 10px;
      span {
        margin-left: 10px;
      }
    }
  }
  .center_else {
    text-align: center;
    font-size: 15px;
    color: #ff920b;
    line-height: 250px;
  }
}
</style>