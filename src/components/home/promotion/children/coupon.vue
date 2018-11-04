<template>
	<!-- 促销-优惠券 -->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">优惠券列表</span>
				<i>（ 共 {{dataTable.length}}条记录 ）</i>
				<div @click="to" class="t_add fr">添加优惠券</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>1.点击右上角添加按钮即可添加优惠券</p>
					<p>2.只有添加优惠券之后点击列表处的发放按钮用户才能收到优惠券</p>
				</div>
			</div>
			<el-table border :data="dataTable" style="width: 100%" max-width="900">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column width="200" prop="name" label="名称" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="money" label="面值">
				</el-table-column>
				<el-table-column width="150" label="有效期">
					<template slot-scope="scope">
						<time-Plunge :timePlunge="scope.row.use_end_time"></time-Plunge>
					</template>
				</el-table-column>
				<el-table-column prop="createnum" label="发放数量">
				</el-table-column>
				<el-table-column prop="send_num" label="已领取">
				</el-table-column>
				<el-table-column prop="use_num" label="已使用">
				</el-table-column>
				<el-table-column width="200" label="操作">
					<template slot-scope="scope">
						<el-button @click="grant(scope.row.id)" size="mini">发放</el-button>
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
	name: 'coupon',
	data() {
		return {
			dataTable: [],
			params: {
				page: 1
			},
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
				name: 'addCoupon',
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
			this.params.page = this.currentPage;
			this.$HTTP(this.$httpConfig.getCouponsList,this.params).then((res) => {
				this.dataTable = res.data.data.data;
				this.page_size = res.data.data.page_size;
				this.page = Number(res.data.data.page * res.data.data.page_size);
				this.$message.success(res.data.message);
			}).catch((res) => {
				this.$message.error(res.data.message);
			})
		},
		grant(value) {
			this.$router.push({
				name: 'couponGrant',
				params: {
					id: value
				}
			})
		},
		edit: function (value) {
			this.$router.push({
				name: 'addCoupon',
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
				this.$HTTP(this.$httpConfig.delCoupons,{id: value}).then((res) => {
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

<style type="text/css">
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