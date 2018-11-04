<template>
	<!-- 商品编辑 -->
	<div class="goodsrelease fl">
		<div class=" issue_content clearfix">
			<div class="goods_title">
				<span class="title fl size16">商品详情</span>
				<ul id="myTab" class="nav nav-tabs">
					<li v-for="(item,index) in tab" :key="item.id" @click="parse(item.method, index)">
						<a :href="'#tab'+index" data-toggle="tab" :class="{active:status[index]}">{{item.name}}</a>
					</li>
				</ul>
			</div>
			<div class="tab-content fl">
				<div class="tab-pane fade in active clearfix fl" id="tab0">
					<!-- 通用信息 -->
					<information @getSpec="getSpecData"></information>
				</div>
				<div class="tab-pane fade clearfix" id="tab1">
					<!-- 商品相册 -->
					<Album ref="album"></Album>
				</div>
				<div class="tab-pane fade clearfix" id="tab2">
					<!-- 商品规格 -->
					<standard :specData="specData"></standard>
				</div>
				<div class="tab-pane fade clearfix" id="tab3">
					<!-- 商品参数 -->
					<parameter :relInfo="relInfo" :data="param_data" :spec="param_select"></parameter>
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
				{ name: "商品规格", method: "" },
				{ name: "商品参数", method: 'goodsParameter' }
			],
			state: 0,
			status: [true, false],
			index: 0,
			data: "",
			class_id: 0,
			spec: {},
			three_class_id: 0,
			spec_data: '',
			spec_select: {},
			param_data: '',
			param_select: [],
			relInfo: '',
			specData: [],
			firstRequest: true,//是否第一次请求
		};
	},
	methods: {
		//处理方法
		parse(data, index) {
			// console.log(data,index)
			if (index == 1 && this.firstRequest) {
				this.firstRequest = false;
				this.$refs.album.imageConfigure();
				this.$refs.album.imageList();
			}
			this.index = index;
			this.data = data;
			this.selectTab();
			return eval("this." + data + "()");
		},
		//切换选项卡
		selectTab() {
			for (var i = 0; i < this.status.length; i++) {
				this.$set(this.status, i, false);
			}
			this.$set(this.status, this.index, true);
		},
		//获取规格
		getSpecData() {
			this.$HTTP(this.$httpConfig.getGoodsSpecDetail, {
				class_three: this.$store.state.three_class_id_tow,
				goods_id: this.$route.params.id
			}, 'post').then(res => {
				this.specData = res.data.data;
			}).catch((err) => {
				console.log(err);
			})
		},
		//获取基本信息
		getInformation() { },
		// 商品相册
		getAlbum() {
			// var that = this;
			// 	let threeClassId = parseInt(this.$store.state.album_data);
			// 	console.log(threeClassId);
			// if (threeClassId === 0) {
			//     this.$layer.msg("请先选择商品分类");
			//     return ;
			// }
		},
		getParameter() {
			// let threeClassId = parseInt(this.$store.state.three_class_id_tow);
			// if (threeClassId === 0) {
			//     this.$layer.msg("请先选择商品分类");
			//     return ;
			// }else{
			// console.log('w222w')
			// console.log(this.$store.state.three_class_id_tow);
			// 	this.axios.post(API_URL+"/AjaxGetAttribute/ajaxGetAttributeInput",
			// 	qs.stringify({
			// 		class_three:three_class_id
			// 	})).then((res) => {
			// 		if(res.data.status == 1 && res.data.data != null){
			// 			this.$store.state.relInfo_tow = res.data.data;
			// 		}else{
			// 			this.$store.state.relInfo_tow = '暂无数据';
			// 		}
			// 		this.$message.success(res.data.message);
			// 	}).catch((err) => {
			// 		this.$message.error(err);
			// 	});
			// }
		},
		//规格
		// specList(){
		//     this.axios.post(API_URL+"/GoodsSpec/ajaxGetSpecSelect", qs.stringify({
		//           class_three : this.three_class_id,
		//           goods_id : this.$route.params.id
		//       })).then(res => {
		//           this.spec_data = res.data.data;
		//           console.log(this.spec_data)
		//           let item = res.data.data.item_id;
		//           let children = res.data.data.specList.children;  
		//           let status = true;
		//           for (let i in item) {
		//             for (let index in children) {
		//               if(item[i] == children[index].id){
		//                 let spec_list = children[index].spec_id;
		//                 if(typeof this.spec_select[spec_list] === 'undefined'){
		//                    this.spec_select[spec_list] = [];
		//                 }
		//                   this.spec_select[spec_list].push(item[i])
		//                 }
		//             }
		//           }
		//       }).catch((err) =>{
		//         console.log(err);
		//       })
		// },
		//参数
		goodsParameter() {
			this.$HTTP(this.$httpConfig.getGoodsAttrDetail, { class_three: this.$store.state.three_class_id_tow }, 'post').then((res) => {
				if (res.data.data != null) {
					this.$store.state.relInfo_tow = res.data.data;
				} else {
					this.$store.state.relInfo_tow = '暂无数据';
				}
				// this.$message.success(res.data.message);
			}).catch((err) => {
				this.$message.error(err);
			});
		}
	},
	created() {
		
		//获取通用信息里的三级分类id
	},
	components: {
		information,
		Album,
		standard,
		parameter
	}
};
</script>
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
