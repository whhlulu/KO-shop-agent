<template>
	<!-- 店铺 - 店铺导航-->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">店铺导航 - 列表</span>
				<div class="t_add fr" @click="tolink">添加店铺导航</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>清理缓存后您修改的店铺导航信息才会在店铺首页更新</p>
					<p>店铺导航展示在前台店铺首页，添加导航时，可自定义链接，也可以选择商品分类，自动获取商品分类链接</p>
				</div>
			</div>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list search">
				<tr>
					<td align="center">
						<span>搜索名称 ：</span>
					</td>
					<td>
						<el-input placeholder="请输入关键字" v-model="searchName" clearable>
						</el-input>
					</td>
					<td align="center">
						<el-button type="success" size="small" @click="getData">搜索</el-button>
					</td>
				</tr>
			</table>
			<el-table :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column width="55" label="ID" prop="id">
				</el-table-column>
				<el-table-column prop="name" label="导航名称">
				</el-table-column>
				<el-table-column width="250" prop="url" label="链接地址" show-overflow-tooltip>
				</el-table-column>
				<el-table-column label="是否显示">
					<template slot-scope="scope">
						<el-switch disabled v-model="scope.row.is_show" active-color="#13ce66" inactive-color="#ff4949">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="order_by" label="排序">
				</el-table-column>
				<el-table-column label="操作" show-overflow-tooltip>
					<template slot-scope="scope">
						<el-button size="small" @click="edit(scope.row.id)">编辑</el-button>
						<el-button size="small" @click="deleteItem(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page_size">
				<el-pagination background layout="total,prev, pager, next,jumper" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'shopnav',
	data() {
		return {
			searchName: '',
			value: true,
			name: '',
			dataList: [],
			page_size: 10, //每页显示几个
			page: 0, //总页数
			currentPage: 1, //当前页
			multipleSelection: []
		}
	},
	mounted() {
		
		this.getData();
	},
	methods: {
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		tolink() {
			this.$router.push({
				name: 'addshopnav',
				params: {
					status: 0
				}
			});
		},
		getData() {
			this.$HTTP(this.$httpConfig.getStoreNavList + '/p/' + this.currentPage, { name: this.searchName }, 'post').then((res) => {
				let list = res.data.data.data;
				this.dataList = [];
				for (var i in list) {
					this.dataList.push(list[i]);
					list[i].is_show = list[i].is_show == 1 ? true : false;
				}
				this.page_size = res.data.data.page_size;
				this.page = Number(res.data.data.page);
				this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		},
		/*页面跳转*/
		handleCurrentChange: function (currentPage) {
			console.log(currentPage);
			this.currentPage = currentPage;
			this.getData();
		},
		edit: function (value) {
			console.log(value)
			this.$router.push({
				name: 'addshopnav',
				params: {
					status: 1,
					id: value
				}
			});
		},
		deleteItem: function (value) {
			this.$confirm('此操作将永久删除此店铺导航，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$HTTP(this.$httpConfig.delStoreNav, { id: value }, 'post').then((res) => {
					this.$message.success(res.data.message);
					this.getData();
				}).catch((err) => {
					this.$message.error(err);
				});
			}).catch(() => {
				this.$message.info('已取消删除');
			});
		},
	}

}
</script>
<style type="text/css">
.page_size {
  text-align: center;
  padding: 20px;
  width: 95%;
}
</style>
<style lang="less">
.g_att {
  .t_title {
    color: #333;
    border-bottom: 1px solid #dddddd;
    overflow: hidden;
    margin-bottom: 22px;
    line-height: 50px;
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
      text-indent: 38px;
    }
    span {
      float: left;
      color: #333;
    }
    i {
      color: #999;
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
.classify {
  width: 1000px;
  .g_att {
    .list {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-top: 15px;
      tr {
        td {
          padding: 15px 0;
          border-bottom: 1px solid #ddd;
          input,
          select,
          textarea,
          button {
            outline: 0 none;
            vertical-align: middle;
            text-indent: 5px;
          }
          .paging {
            background: #fff;
            line-height: 30px;
            float: right;
            width: 850px;
            input {
              border: 1px solid #dddddd;
              height: 28px;
            }
            .number {
              float: right;
              span {
                width: 30px;
                height: 28px;
                float: left;
                text-align: center;
                line-height: 30px;
                border: 1px solid #dddddd;
              }
              .page {
                width: 30px;
                height: 30px;
                line-height: 30px;
                background-color: #f7bc0a;
                text-align: center;
                color: #fff;
                border: none;
                border-right: 1px solid #eeb407;
                cursor: pointer;
              }
            }
            .go {
              width: 37px;
              border: 1px solid #dddddd;
              height: 28px;
              border-radius: 6px;
              background-color: #f7f7f7;
              display: block;
              float: right;
              text-align: center;
              margin: 0 15px;
              cursor: pointer;
            }
            span {
              float: right;
            }
          }
        }
      }
    }
    .search {
      tr {
        td {
          input,
          select {
            width: 150px;
            border: 1px solid #ddd;
            line-height: 30px;
            height: 30px;
            color: #999;
            text-indent: 6px;
          }
        }
      }
    }
  }
}
</style>