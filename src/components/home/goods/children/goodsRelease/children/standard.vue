<template>
	<div class="standard">
		<div class="notes-box">
			<div class="notes_title">温馨提示</div>
			<div class="notes_content">
				<p>必须添加商品规格才能在移动端和PC端显示商品</p>
			</div>
		</div>
		<div class="specification">
			<p class="goods_spec">商品规格： </p>
			<div class="g_size" v-for="(item, index) in $store.state.spec_data.group" :key="index">
				<span class="fl">{{item.name}}：</span>
				<ul class="fl">
					<li v-for="(spec, indexByItem) in $store.state.spec_data.children" v-if="index == spec.spec_id" :key="spec.id" :class="{color:status[indexByItem]}" @click="tab1(indexByItem, spec, index)">{{spec.item}}</li>
				</ul>
			</div>
		</div>
		<div class="g_edit">
		</div>
		<div class="tijiao">
			<span @click="submit">确认提交</span>
		</div>
	</div>
</template>
<script>
// import "../../../../../../../js/jquery.form"
export default {
	name: "standard",
	data() {
		return {
			status: [false],
			specResult: [],
			inputList: {}
		};
	},
	methods: {
		//提交
		submit() {
			// let item = {};
			// $("#myForm input").each(function(index, item){
			//     eval($(item).attr('name')+ ' = '+ $(item).val())
			// }) 
			// let data = $("#myForm").formToArray();
			// console.log(data)
			let that = this;
			let inputList = {};
			let flag = false;
			let tmp = {};
			let key;
			console.log($('#spec_input_tab tr'))
			$('#spec_input_tab tr').each(function (index, ele) {
				//  console.log(ele);
				$(ele).find('input').each(function (index, ele) {
					// console.log(ele)
					key = $(ele).attr("data-key");
					let name = $(ele).attr("name");
					let val = $(ele).val();
					tmp[name] = val;
					inputList[key] = {};
					if (val === '') {
						flag = true;
					}
				});
				if (typeof key !== "undefined") {
					inputList[key] = tmp;
				}
				tmp = {};
			});
			console.log(inputList)
			if (flag === true) {
				this.$message({
					duration: 1000,
					type: 'error',
					message: '规格信息错误'
				});
			} else {
				this.$HTTP(this.$httpConfig.addGoodsSpec, { item: inputList }, 'post').then(res => {
					this.$message({
						duration: 1000,
						message: res.data.message
					});
					this.$emit('selectTab');
					this.$store.state.tab_state = 3;
					this.$emit('getParameter');
					if (!this.$store.state.tab_Index[3]) {
						this.$store.state.tab_Index.push(3);
					}
					console.log(res)
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		//选择规格
		tab1(index, spec, specGroupId) {
			console.log(spec)
			this.specResult[specGroupId] = [];
			if (this.status[index] === true) {
				this.$set(this.status, index, false);
			} else {
				this.$set(this.status, index, true);
			}
			// console.log(this.specResult);
			for (let i = 0; i < this.status.length; i++) {
				if (this.status[i] === true) {
					if (this.$store.state.spec_data.children[i].spec_id == specGroupId) {
						this.specResult[specGroupId].push(this.$store.state.spec_data.children[i].id)
					}
				}
			}
			console.log(this.specResult)
			this.getSpecItem();
		},
		/**
		 * 合并单元格
		 */
		mergeCell(id) {
			var tab = document.getElementById(id); //要合并的tableID
			var maxCol = 2, val, count, start;  //maxCol：合并单元格作用到多少列
			if (tab != null) {
				for (var col = maxCol - 1; col >= 0; col--) {
					count = 1;
					val = "";
					for (var i = 0; i < tab.rows.length; i++) {
						if (val == tab.rows[i].cells[col].innerHTML) {
							count++;
						} else {
							if (count > 1) { //合并
								start = i - count;
								tab.rows[start].cells[col].rowSpan = count;
								for (var j = start + 1; j < i; j++) {
									tab.rows[j].cells[col].style.display = "none";
								}
								count = 1;
							}
							val = tab.rows[i].cells[col].innerHTML;
						}
					}
					if (count > 1) { //合并，最后几行相同的情况下
						start = i - count;
						tab.rows[start].cells[col].rowSpan = count;
						for (var j = start + 1; j < i; j++) {
							tab.rows[j].cells[col].style.display = "none";
						}
					}
				}
			}
		},
		//获取规格项
		getSpecItem() {
			this.$HTTP(this.$httpConfig.getGoodsSpec, { spec: this.specResult }, 'post').then(res => {
				$('.g_edit').html('');
				$('.g_edit').append(res.data.data);
				let id = 'spec_input_tab';
				this.mergeCell(id);
			}).catch((err) => {
				console.log(err);
			});
		}
	}
};
</script>
<style>
.g_edit .table {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
  margin-top: 15px;
}
.g_edit .table tr td {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  text-align: center;
  vertical-align: inherit;
}
.g_edit .table tr td b {
  font-weight: bold;
  color: #333;
}
.g_edit .table tr td input {
  padding-left: 5px;
  height: 32px;
  border: 1px solid #cccccc;
}
</style>

<style lang="less" scoped>
.standard {
  height: auto;
  min-height: 100px;
  line-height: 20px;
  padding: 10px;
  border-top: 0;
  color: #333;
  .specification {
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    border-top: 1px solid #dddddd;
    margin-bottom: 25px;
    .g_type {
      padding-left: 80px;
      border-bottom: 1px solid #ddd;
      span {
        margin: 10px 0;
        display: inline-block;
      }
      select {
        margin: 10px 0;
        width: 288px;
        height: 32px;
        border: 1px solid #cccccc;
      }
    }
    .goods_spec {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
      padding-left: 80px;
      font-weight: bold;
    }
    .g_size {
      padding-left: 100px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      span {
        margin: 18px 0;
      }
      ul {
        margin: 12px 0;
        li {
          padding: 0 5px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          background-color: #ddd;
          color: #333;
          display: block;
          margin-right: 25px;
          float: left;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
        }
        li.color {
          background-color: #f7bc0a;
          color: #fff;
        }
      }
    }
  }
  .g_edit {
    margin-bottom: 25px;
  }
  .tijiao {
    height: 32px;
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