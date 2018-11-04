<template>
	<!-- 店铺 - 发退货地址库-->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">发 / 退货地址库 - 列表</span>
				<i>（ 共 21 条记录 ）</i>
				<div class="t_add fr" @click="tolink">添加发/退货地址</div>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>发 / 退货地址库,是供卖家发货是选择，标记卖家的发货地址，买家发生退货申请时，卖家给买家发送的寄回地址</p>
					<p>默认地址 : 卖家发货和卖家给买家发送寄回地址是自动调取默认地址</p>
				</div>
			</div>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
				<tr>
					<td align="center" bgcolor="#f9fafa"><input type="checkbox" name="checkbox"></td>
					<td bgcolor="#f9fafa" class="black bold" align="center">联系人</td>
					<td bgcolor="#f9fafa" class="black bold">发/退货详细地址</td>
					<td bgcolor="#f9fafa" class="black bold">手机</td>
					<td bgcolor="#f9fafa" align="center" class="black bold">固定电话</td>
					<td bgcolor="#f9fafa" class="black bold">邮箱</td>
					<td bgcolor="#f9fafa" class="black bold">操作</td>
				</tr>
				<tr>
					<td bgcolor="#f9fafa" width="3%" align="center"><input type="checkbox" name="checkbox1"></td>
					<td bgcolor="#f9fafa" width="6%" align="center">张三</td>
					<td bgcolor="#f9fafa" width="18%">上海市合适的话是和对手和对手都是</td>
					<td bgcolor="#f9fafa" width="6%">1888888888</td>
					<td bgcolor="#f9fafa" width="9%" align="center">545485</td>
					<td bgcolor="#f9fafa" width="9%">1604434511@qq.com</td>
					<td bgcolor="#f9fafa" width="12%">
						<span class="edit">编辑</span>
						<span class="edit">删除</span>
						<span class="edit address">默认地址</span>
					</td>
				</tr>
				<tr>
					<td bgcolor="#f9fafa" align="center"><input type="checkbox" name="checkbox2"></td>
					<td bgcolor="#f9fafa" colspan="6">
						<span class="delete">删除</span>
						<div class="paging">
							<span class="go">GO</span>
							<span style="margin-left:15px;"><input name="textfield" type="text" id="textfield" style="width:30px;"></span>
							<div class="number">
								<span></span>
								<span class="page">1</span>
								<span>></span>
							</div>
							<span style="margin:0 10px;">条</span>
							<span><input name="textfield" type="text" id="textfield" size="10"></span>
							<span>共1条记录，每页显示： </span>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
export default {
	name: 'returnaddress',
	data() {
		return {
			value: true
		}
	},
	mounted() {
		
	},
	methods: {
		tolink() {
			this.$router.push({
				name: 'addreturnaddress',
				// params: {
				//     status: 0
				// }
			});
		},
	}
}
</script>
<style lang="less">
.g_att {
  .t_title {
    color: #333;
    border-bottom: 1px solid #dddddd;
    overflow: hidden;
    margin-bottom: 22px;
    line-height: 50px;
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
      text-indent: 32px;
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
          .address {
            width: 65px;
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
        margin-left: 22px;
        cursor: pointer;
      }
    }
  }
}
</style>
