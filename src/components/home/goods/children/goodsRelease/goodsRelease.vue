<template>
	<div class="goodsrelease fl">
		<div class=" issue_content clearfix">
			<div class="goods_title">
				<span class="title fl size16">商品详情</span>
				<ul id="myTab" class="nav nav-tabs">
					<li v-for="(item,index) in tab" :key="item.id" @click="parse(item.method, index)">
						<a :href="'#tab'+$store.state.tab_Index[index]" data-toggle="tab" :class="{active:status[index]}">{{item.name}}</a>
					</li>
				</ul>
			</div>
			<div class="tab-content fl">
				<div class="tab-pane fade clearfix fl" :class="{active:$store.state.tab_state == 0,in:$store.state.tab_state == 0}" id="tab0">
					<!-- 通用信息 -->
					<information @selectTab="selectTab(1)"></information>
				</div>
				<div class="tab-pane fade clearfix" :class="{active:$store.state.tab_state == 1,in:$store.state.tab_state == 1}" id="tab1">
					<!-- 商品相册 -->
					<Album @getSpec="getSpecData" @selectTab="selectTab(2)" ref="album1"></Album>
				</div>
				<div class="tab-pane fade clearfix" :class="{active:$store.state.tab_state == 2,in:$store.state.tab_state == 2}" id="tab2">
					<!-- 商品规格 -->
					<standard @getParameter="getParameter" @selectTab="selectTab(3)"></standard>
				</div>
				<div class="tab-pane fade clearfix" :class="{active:$store.state.tab_state == 3,in:$store.state.tab_state == 3}" id="tab3">
					<!-- 商品参数 -->
					<parameter></parameter>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import information from "./children/information"; //通用信息
import Album from "./children/Album"; //商品相册
import standard from "./children/standard"; //商品规格
import parameter from "./children/parameter"; //商品参数
export default {
	name: "goodsrelease",
	data() {
		return {
			tab: [
				{ name: "通用信息", method: "getInformation" },
				{ name: "商品相册", method: "getAlbum" },
				{ name: "商品规格", method: "getSpecData" },
				{ name: "商品参数", method: 'getParameter' }
			],
			status: [true, false],
			index1: '',
			data: ""
		};
	},
	methods: {
		//处理方法
		parse(data, index) {
			if (this.$store.state.tab_Index[index] == index) {
				this.index1 = index;
				this.data = data;
				this.selectTab(this.index1);
				return eval("this." + data + "()");
			} else {
				this.$message({
					duration: 1000,
					type: 'error',
					message: '请完成上步内容!'
				});
			}
		},
		//切换选项卡
		selectTab(index) {
			if (index == 1) {
				this.$refs.album1.imageConfigure();
			}
			for (var i = 0; i < this.status.length; i++) {
				this.$set(this.status, i, false);
			}
			this.$set(this.status, index, true);
		},
		//获取规格
		getSpecData() {
			this.$HTTP(this.$httpConfig.getGoodsSpecInfo, { id: this.$store.state.three_class_id }, 'post').then(res => {
				this.$store.state.spec_data = res.data.data;
			});
		},
		//获取基本信息
		getInformation() { },
		// 商品相册
		getAlbum() {
		},
		getParameter() {
			this.$HTTP(this.$httpConfig.getGoodsAttrDetail, { class_three: this.$store.state.three_class_id }, 'post').then((res) => {
				if (res.data.data != null) {
					this.$store.state.relInfo = res.data.data;
				} else {
					this.$store.state.relInfo = '暂无数据';
				}
			}).catch((err) => {
				this.$message.error(err);
			});
		}
	},
	created() {
		
		this.$store.commit('clearIndex', [0]);
		this.$store.commit('clearState', 0);
	},
	components: {
		information,
		Album,
		standard,
		parameter
	}
};
</script>
<style>
body {
  overflow: inherit;
}
</style>

<style lang="less" scoped>
.goodsrelease {
  width: 1000px;
  padding-bottom: 80px;
  .issue_content {
    width: 100%;
    margin: 0 auto;
    .goods_title {
      height: 31px;
      border-right: 0;
      position: relative;
      margin-bottom: 22px;
      .title {
        color: #333;
      }
      .nav {
        padding-left: 180px;
        border: none;
        height: 31px;
        border-bottom: 1px solid #dddddd;
        border-right: 0;
        bottom: -1px;
        li {
          color: #666666;
          float: left;
          font-size: 14px;
          height: 30px;
          width: 96px;
          margin-left: 8px;
          a {
            transition: color 0s ease;
            border: none;
            padding: 0;
            margin: 0;
            text-align: center;
            text-decoration: none;
            line-height: 30px;
            border-left: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
            border-top: 1px solid #dddddd;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            background-color: #ededed;
          }
          a.active {
            background-color: #ffffff;
            border-top: 1px solid #ddd;
            border-bottom: none;
            position: relative;
            top: 1px;
            height: 30px;
            line-height: 30px;
            border-left: 1px solid #ddd;
            color: #f7bc0a;
          }
        }
        li:hover a {
          border-color: none;
          transition: color 0s ease;
        }
      }
    }
    .tab-content {
      width: 100%;
      .tab-pane {
        width: 100%;
      }
    }
  }
}
</style>
