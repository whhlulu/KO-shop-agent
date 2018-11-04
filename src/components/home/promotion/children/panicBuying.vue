<template>
	<!-- 促销-抢购 -->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">商品抢购列表</span>
				<i>（ 共 {{dataTable.length}} 条记录 ）</i>
				<div @click="to" class="t_add fr">添加抢购商品</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>1.已结束的活动要再次开始时修改时间即可</p>
					<p>2.抢购库存不得高于商品库存</p>
				</div>
			</div>
			<div class="Commodity-management">
				<span>商品名称：</span>
				<el-input style="width: 200px;" v-model="params.keyWords" clearable></el-input>
				<el-button class="search-btn" @click="getData" size="small" type="success">搜索</el-button>
			</div>
			<el-table border :data="dataTable" style="width: 100%" max-width="900">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="id" width="55" label="ID">
				</el-table-column>
				<el-table-column show-overflow-tooltip width="100" prop="panic_title" label="抢购名称">
				</el-table-column>
				<el-table-column show-overflow-tooltip width="150" prop="title" label="商品名称">
				</el-table-column>
				<el-table-column width="70" prop="panic_price" label="价格">
				</el-table-column>
				<el-table-column width="130" label="开始时间" show-overflow-tooltip>
					<template slot-scope="scope">
						<time-Plunge :timePlunge="scope.row.start_time"></time-Plunge>
					</template>
				</el-table-column>
				<el-table-column width="130" label="结束时间" show-overflow-tooltip>
					<template slot-scope="scope">
						<time-Plunge :timePlunge="scope.row.end_time"></time-Plunge>
					</template>
				</el-table-column>
				<el-table-column width="55" prop="panic_num" label="库存">
				</el-table-column>
				<el-table-column width="70" label="审核状态">
					<template slot-scope="scope">
						<span>{{isDef[scope.row.status]}}</span>
					</template>
				</el-table-column>
				<el-table-column width="70" label="状态">
					<template slot-scope="scope">
						<span>{{status[scope.$index]}}</span>
					</template>
				</el-table-column>
				<el-table-column width="130" label="操作">
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
	</div>
</template>
<script>
import timePlunge from "../../../page/time";
export default {
	name: 'panicBuying',
	data() {
		return {
			dataTable: [],
			params: {
				keyWords: '',
				page: 1
			},
			status: [],
			isDef: ['拒绝', '通过', '审核中'],
			page_size: 0, //每页显示几个
			page: 0, //总页数
			currentPage: 1, //当前页
		}
	},
	components: {
		timePlunge,
	},
	created() {
	},
	mounted() {
		
		this.getData();
	},
	methods: {
		to() {
			this.$router.push({
				name: 'addPanicBuying',
				params: {
					status: 0
				}
			});
		},
		/*页面跳转*/
		handleCurrentChange: function (currentPage) {
			console.log(currentPage);
			this.currentPage = currentPage;
			this.getData();
		},
		getData() {
			var now = Math.round(new Date().getTime() / 1000);
			this.params.page = this.currentPage;
			this.$HTTP(this.$httpConfig.getPanicList, this.params, 'post').then((res) => {
				this.dataTable = res.data.data;
				for (var i in this.dataTable) {
					if (this.dataTable[i].start_time > now) {
						this.status[i] = '未开始';
					} else if (this.dataTable[i].start_time < now && this.dataTable[i].end_time > now) {
						this.status[i] = '进行中';
					} else {
						this.status[i] = '已结束';
					}
				}
				this.page_size = 10;
				this.page = Number(res.data.data.count);
				this.$message.success(res.data.message);
			}).catch((res) => {
				this.$message.error(res.data.message);
			})
		},
		edit: function (value) {
			this.$router.push({
				name: 'addPanicBuying',
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
				this.$HTTP(this.$httpConfig.delPanic, { id: value }, 'post').then((res) => {
					this.$message.success(res.data.message);
					this.getData();
				}).catch((err) => {
					this.$message.error(err);
				});
			}).catch(() => {
				this.$message.info('已取消删除');
			});
		}
	}

}
</script>
<style lang="less">
body {
  overflow: inherit;
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
</style>
<style lang="less">
.g_att {
  padding-bottom: 80px;
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
    .t_add {
      background: url(../../../../assets/plus2.jpg) no-repeat 15px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
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
  width: 1042px;
  .g_att {
    .Commodity-management {
      background-color: #f6f6f6;
      border: 1px solid #dddddd;
      margin-top: 15px;
      line-height: 50px;
      padding-left: 30px;
      .search-btn {
        float: right;
        margin: 8px 20px;
      }
    }
    .list {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-top: 15px;
      tr {
        td {
          padding: 10px 0;
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
      .delete {
        background-color: #e9573e;
        color: #fff;
        width: 56px;
        line-height: 30px;
        text-align: center;
        display: block;
        border-radius: 4px;
        float: left;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>