<template>
	<!-- 商品属性 -->
	<div class="attribute fl">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">添加商品属性</span>
				<div @click="to" class="t_m fr">返回商品属性列表</div>
			</h1>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="Shop specification">
				<tr>
					<td align="center" bgcolor="#f9fafa" class="bold black">商品属性</td>
					<td colspan="3" align="center" bgcolor="#f9fafa" class="bold black">&nbsp;</td>
				</tr>
				<tr>
					<td width="141" align="right">
						商品属性名称：</td>
					<td colspan="3" align="left"><input type="text" name="textfield"></td>
				</tr>
				<tr>
					<td align="right">所属商品类型： </td>
					<td colspan="3" align="left">
						<select name="select" class="black">
							<option>电视</option>
						</select>
					</td>
				</tr>
				<tr>
					<td align="right">能否进行检索： </td>
					<td width="106" align="left"><input type="radio" name="radio" id="radio" value="radio" style="width:15px; height:15px; border:none;">
						不需要检索 </td>
					<td colspan="2" align="left"><input type="radio" name="radio" id="radio2" value="radio" style="width:15px; height:15px; border:none;">
						关键字检索 </td>
				</tr>
				<tr>
					<td align="right">该属性值的录入方式：</td>
					<td align="left"><input type="radio" name="radio" id="radio3" value="radio" style="width:15px; height:15px; border:none;">
						手工录入 </td>
					<td width="287" align="left">
						<input type="radio" name="radio" id="radio4" value="radio" style="width:15px; height:15px; border:none;">
						从下面的列表中选择（一行代表一个可选值）
					</td>
					<td width="540" align="left">
						<input type="radio" name="radio" id="radio5" value="radio" style="width:15px; height:15px; border:none;">
						多行文本框
					</td>
				</tr>
				<tr>
					<td align="right">可选值列表：</td>
					<td colspan="3" align="left"><textarea name="textarea" id="textarea" cols="45" rows="5"></textarea></td>
				</tr>
			</table>
			<div class="button">
				<span>确认提交</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'attribute',
	data() {
		return {
			value: true
		}
	},
	methods: {
		to() {
			this.$router.back();
		},
	},
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
    span {
      float: left;
      color: #333;
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
      text-indent: 30px;
    }
    .t_m {
      background: url(../../../../assets/return.jpg) no-repeat 10px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 30px;
    }
  }

  .button {
    height: 32px;
    margin: 20px 0;
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

<style lang="less" scoped>
.attribute {
  width: 1042px;
  .Commodity-management {
    background-color: #f6f6f6;
    border: 1px solid #dddddd;
    margin-top: 15px;
    tr {
      td {
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
        line-height: 24px;
        font-size: 12px;
      }
    }
    select {
      width: 140px;
      border: 1px solid #ddd;
      line-height: 29px;
      height: 29px;
      color: #999;
      font: 400 11px system-ui;
    }
    .search {
      width: 58px;
      height: 32px;
      line-height: 32px;
      background-color: #f7bc0a;
      color: #fff;
      text-align: center;
      display: block;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
    }
  }
  .specification {
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    border-top: 1px solid #dddddd;
    .black {
      color: #333;
    }
    .bold {
      font-weight: bold;
    }
    tr {
      td {
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
        line-height: 24px;
        .el-switch {
          padding-left: 0;
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
        }
      }
    }
  }
  .Shop {
    input {
      padding-left: 5px;
    }
    input,
    select {
      margin: 0;
      width: 288px;
      height: 32px;
      border: 1px solid #cccccc;
    }
  }
}
</style>