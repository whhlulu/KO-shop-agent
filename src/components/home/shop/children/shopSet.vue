<template>
	<div class="logistics fl">
		<!-- 店铺导航 - 店铺装修 -->
		<div class="t_tab">
			<h1 class="t_title">
                <span  class="size16">店铺导航 - 店铺装修</span>
           </h1>
			<ul class="main" id="sortable">
				<li class="ui-state-default text" @mouseover="textOver(1)" @mouseleave="textLeave(1)">
					<el-button class="updateBtn updateBtn1" @click.native="select(1)">
						<i class="el-icon-edit"></i>
					</el-button>
					<div class="content" v-html="params.ue"></div>
					<el-dialog title="自定义选择器" :visible.sync="dialogTableVisible1">
						<div class="ue fl">
							<UE :defaultMsg="params.ue" :detail="123" :config="config" ref="ue"></UE>
							<el-button type="success" @click.native="submit(1)">确定</el-button>
						</div>
					</el-dialog>
					<div class="option option1">
						<el-button @click="option(1,'.text .content','text')" type="info" icon="el-icon-arrow-up" circle></el-button>
						<el-button @click="option(2,'.text .content','text')" type="info" icon="el-icon-arrow-down" circle></el-button>
						<el-button @click="option(3,'.text .content','text')" type="success" icon="el-icon-view" circle></el-button>
						<el-button @click="option(4,'.text .content','text')" type="danger" icon="el-icon-delete" circle></el-button>
					</div>
				</li>
				<li class="ui-state-default image" @mouseover="textOver(2)" @mouseleave="textLeave(2)">
					<el-button class="updateBtn updateBtn2" @click.native="select(2)">
						<i class="el-icon-edit"></i>
					</el-button>
					<div id="imgbox" class="imgbox">
						<img class="img" v-for="(item,index) in imageTable" :src="item.src" :key="index">
					</div>
					<el-dialog title="图片选择器" :visible.sync="dialogTableVisible2">
						<el-table border :data="imageTable" style="width: 100%">
							<el-table-column label="图片">
								<template slot-scope="scope">
									<img class="tb_img" :src="scope.row.src">
								</template>
							</el-table-column>
							<el-table-column label="图片链接">
							</el-table-column>
							<el-table-column label="排序">
								<template slot-scope="scope">
									<el-input clearable style="width: 150px;height: 40px;">
									</el-input>
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-card>
							<el-upload :action="action" list-type="picture-card" accept=".jpg,.png,.jpeg" name="fileData" :limit=1 :on-exceed="exceeding" :data="uploadData" :before-upload="beforeUploade" :file-list="fileList" :on-success="success" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
								<i class="el-icon-plus"></i>
							</el-upload>
							<p>文件格式 GIF, JPG, JPEG, PNG 文件大小80k 以内，建议尺寸宽度介于{{imageConf.min_width}}~{{imageConf.max_width}},高度介于{{imageConf.min_height}}~{{imageConf.max_height}}</p>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="dialogImageUrl" alt="">
							</el-dialog>
							<div class="submit-box">
								<el-button type="success" @click="submit(2)">提交</el-button>
							</div>
						</el-card>
					</el-dialog>
					<div class="option option2">
						<el-button @click="option(1,'#imgbox','image')" type="info" icon="el-icon-arrow-up" circle></el-button>
						<el-button @click="option(2,'#imgbox','image')" type="info" icon="el-icon-arrow-down" circle></el-button>
						<el-button @click="option(3,'#imgbox','image')" type="success" icon="el-icon-view" circle></el-button>
						<el-button @click="option(4,'#imgbox','image')" type="danger" icon="el-icon-delete" circle></el-button>
					</div>
				</li>
				<li class="ui-state-default list">
					<ul class="goods">
						<li class="goods-item">
							<img src="http://68dsw.oss-cn-beijing.aliyuncs.com/demo/shop/1/gallery/2017/08/25/15036307529844.jpg?x-oss-process=image/resize,m_pad,limit_0,h_320,w_320" alt="" class="item-image" />
							<span class="item-text">陕西白鹿原大樱桃 车厘子大红灯 新鲜水果4斤航空包邮 甜的很</span>
							<span class="item-price">109.00</span>
						</li>
						<li class="goods-item">
							<img src="http://68dsw.oss-cn-beijing.aliyuncs.com/demo/shop/1/gallery/2017/08/25/15036307909621.jpg?x-oss-process=image/resize,m_pad,limit_0,h_320,w_320" alt="" class="item-image" />
							<span class="item-text">越南进口玉芒芒果 大青芒香芒新鲜水果非凯特芒果8斤装包邮代理</span>
							<span class="item-price">109.00</span>
						</li>
						<li class="goods-item">
							<img src="http://68dsw.oss-cn-beijing.aliyuncs.com/demo/shop/1/gallery/2017/08/25/15036308808543.jpg?x-oss-process=image/resize,m_pad,limit_0,h_320,w_320" alt="" class="item-image" />
							<span class="item-text">誉福园新鲜水果橙子秭归脐橙伦晚甜橙包邮</span>
							<span class="item-price">109.00</span>
						</li>
						<li class="goods-item">
							<img src="http://68dsw.oss-cn-beijing.aliyuncs.com/demo/shop/1/gallery/2017/08/25/15036307529844.jpg?x-oss-process=image/resize,m_pad,limit_0,h_320,w_320" alt="" class="item-image" />
							<span class="item-text">陕西白鹿原大樱桃 车厘子大红灯 新鲜水果4斤航空包邮 甜的很</span>
							<span class="item-price">109.00</span>
						</li>
						<li class="goods-item">
							<img src="http://68dsw.oss-cn-beijing.aliyuncs.com/demo/shop/1/gallery/2017/08/25/15036307909621.jpg?x-oss-process=image/resize,m_pad,limit_0,h_320,w_320" alt="" class="item-image" />
							<span class="item-text">越南进口玉芒芒果 大青芒香芒新鲜水果非凯特芒果8斤装包邮代理</span>
							<span class="item-price">109.00</span>
						</li>
						<li class="goods-item">
							<img src="http://68dsw.oss-cn-beijing.aliyuncs.com/demo/shop/1/gallery/2017/08/25/15036308808543.jpg?x-oss-process=image/resize,m_pad,limit_0,h_320,w_320" alt="" class="item-image" />
							<span class="item-text">誉福园新鲜水果橙子秭归脐橙伦晚甜橙包邮</span>
							<span class="item-price">109.00</span>
						</li>
						<li class="goods-item">
							<img src="http://68dsw.oss-cn-beijing.aliyuncs.com/demo/shop/1/gallery/2017/08/25/15036307909621.jpg?x-oss-process=image/resize,m_pad,limit_0,h_320,w_320" alt="" class="item-image" />
							<span class="item-text">越南进口玉芒芒果 大青芒香芒新鲜水果非凯特芒果8斤装包邮代理</span>
							<span class="item-price">109.00</span>
						</li>
						<li class="goods-item">
							<img src="http://68dsw.oss-cn-beijing.aliyuncs.com/demo/shop/1/gallery/2017/08/25/15036308808543.jpg?x-oss-process=image/resize,m_pad,limit_0,h_320,w_320" alt="" class="item-image" />
							<span class="item-text">誉福园新鲜水果橙子秭归脐橙伦晚甜橙包邮</span>
							<span class="item-price">109.00</span>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import jqueryUIJS from '../../../../../js/jquery-ui.min';
	import '../../../../../js/mui.min.js';
	import UE from '../../goods/children/goodsRelease/children/UE';
	import qs from 'qs';
	export default {
		name: 'addservicemanage',
		data() {
			return {
				action: this.$store.state.image_api_url + "FileUpload/uploadImageToLocal/",
				dialogImageUrl: "",
				dialogVisible: false,
				uploadData: {
					sessionToken: "",
					imageToken: ""
				},
				config: {
					initialFrameWidth: null,
					initialFrameHeight: 350
				},
				fileList: [],
				imageConf: {},
				imageToken: "",
				sToken: "", // session token
				uploadFile: [],
				dialogTableVisible1: false,
				dialogTableVisible2: false,
				params: {
					ue: 'wer'
				},
				imageTable: [{
					src: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1525327430&di=18e69d1cad674b4422faf95565ba5d1a&src=http://imgsrc.baidu.com/imgad/pic/item/fc1f4134970a304eb6c58cdfdbc8a786c9175c2b.jpg'
				}, {
					src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525337577595&di=2c2d7e5f35fb029c2fe2caaeac5c67da&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D680e3755a164034f1bc0ca45c7aa1344%2F79f0f736afc3793129a07fa1e1c4b74542a91169.jpg'
				}, {
					src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525338645123&di=05679c207dec12b8d3b1be8d58ba39c8&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4bed2e738bd4b31c3deeef4f8dd6277f9f2ff870.jpg'
				}, {
					src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1525338676207&di=ae579b734bcb126c9059ee555ab2f8f7&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3D333e1444f6039245b5b8e94ceffdceb7%2Fd788d43f8794a4c28dee05a204f41bd5ac6e396e.jpg'
				}]
			}
		},
		created() {
			var index = 0;
			window.setInterval(function() {
				//得到所 有图片长度
				var imgs = document.getElementsByClassName("img").length;
				var next = index + 1;
				if(index == imgs - 2) {
					//imgs-1为长度（从0开始）；imgs-2为index（next+1）
					next = 0;
				}
				//得到所有图片元素
				var img = document.getElementById("imgbox").children;
				img[index].style.opacity = 0;
				img[next].style.opacity = 1;
				index = next;
				//				console.log(index);
			}, 5000);
		},
		mounted() {
			
			this.getImageConfig();
			$(function() {
				$("#sortable").sortable({
					revert: true
				});
				$("ul, li").disableSelection();
			});
		},
		methods: {
			getImageConfig() {
				this.axios.post(
						this.$store.state.image_api_url + "FileUpload/getGoodsImageConfig",
						qs.stringify({})
					)
					.then(res => {
						let data = res.data.data;
						this.imageConf = data.config;
						this.imageToken = data.token;
						this.sToken = data.s_token;
					});
			},
			// 删除回调
			handleRemove(file, fileList, index) {
				this.axios.post(this.$store.state.image_api_url + "DeleteImage/deleteFile", qs.stringify({
					fileName: file.response.data,
					sessionToken: this.uploadData.sessionToken,
					imageToken: this.uploadData.imageToken
				})).then(res => {
					//找到删除的图片并在数据里删除
					let index = this.uploadFile.indexOf(file.response.data);
					this.uploadFile.splice(index, 1);
					this.$message.success(res.data.message);
				}).catch(function(error) {
					console.log(error);
				});

			},
			// 上传之前
			beforeUploade(file) {
				this.uploadData.sessionToken = this.sToken;
				this.uploadData.imageToken = this.imageToken;
				const isLt2M = file.size / 1024 / 1024 < 3;
				if(!isLt2M) {
					this.$message.error("上传头像图片大小不能超过 2MB!");
				}
				return isLt2M;
			},
			//显示
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			// 上传成功
			success(response, file, fileList) {
				console.log(response)
				this.$message.success(response.message);
				if(response.status == 0) {
					let length = fileList.length;
					let i = 0;
					for(i; i < length; i++) {
						if(fileList[i].name === file.name) {
							fileList.splice(i, 1);
						}
					}
				} else {
					this.uploadFile.push(response.data);

				}
			},
			//超出文件个数
			exceeding(files, fileList) {
				if(fileList.length == 1) {
					this.$message({
						duration: 1000,
						type: 'error',
						message: '超出最大文件个数!'
					});
				}
			},
			// 添加图片
			addPicture() {
				var that = this;
				this.axios.post(
						API_URL + "/GoodsImages/pictureAlbum",
						qs.stringify({
							pic_url: this.uploadFile
						})
					)
					.then(function(res) {
						console.log(that)
						res.data.status == 1 ? that.$message.success(res.data.message) : that.$message.error(res.data.message);
						//        console.log(res.data.status);
					});
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			getUEContent() {
				let content = this.$refs.ue.getUEContent();
				// console.log(content);
				return content;
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			select(index) {
				switch(index) {
					case 1:
						{
							this.dialogTableVisible1 = true;
						}
						break;
					case 2:
						{
							this.dialogTableVisible2 = true;
						}
						break;
					case 3:
						{
						}
						break;
					default:
						break;
				}
			},
			submit(index) {
				switch(index) {
					case 1:
						{
							this.dialogTableVisible1 = false;
							this.params.ue = this.$refs.ue.getUEContent();
						}
						break;
					case 2:
						{
							this.dialogTableVisible2 = false;
							this.addPicture();
						}
						break;
					case 3:
						{
						}
						break;
					default:
						break;
				}
			},
			textOver(index) {
				switch(index) {
					case 1:
						{
							$(".updateBtn1").show();
							$(".option1").show();
						}
						break;
					case 2:
						{
							$(".updateBtn2").show();
							$(".option2").show();
						}
						break;
					case 3:
						{
						}
						break;
					default:
						break;
				}
			},
			textLeave(index) {
				switch(index) {
					case 1:
						{
							$(".updateBtn1").hide();
							$(".option1").hide();
						}
						break;
					case 2:
						{
							$(".updateBtn2").hide();
							$(".option2").hide();
						}
						break;
					case 3:
						{
						}
						break;
					default:
						break;
				}
			},
			option(index, text, item) {
				switch(index) {
					case 1:
						{}
						break;
					case 2:
						{}
						break;
					case 3:
						{
							var val = $(text).css('opacity') == 1 ? 0.3 : 1;
							$(text).css('opacity', '' + val);
						}
						break;
					case 4:
						{
							console.log(item, $('.' + item))
							this.$confirm('此操作将永久删除此项，是否继续？', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								$('.' + item).hide();
							}).catch(() => {
								this.$message.info('已取消删除');
							});
						}
						break;
					default:
						break;
				}
			}
		},
		components: {
			UE
		},
	}
</script>
<style type="text/css">
	.logistics{
		padding-bottom: 70px;
	}
	.submit-box {
		text-align: center;
	}
	
	.imgbox {
		width: 100%;
		height: 250px;
		position: relative;
		top: 20px;
		left: 15px;
	}
	
	.img {
		opacity: 0;
		position: absolute;
		height: 200px;
		width: 95%;
	}
	
	.el-table td,
	.el-table th {
		padding: 5px 0;
	}
	
	.el-dialog__body {
		padding: 10px 20px;
	}
	
	.tb_img {
		width: 50px;
		height: 50px;
	}
	
	.main {
		width: 900px;
		margin: 0 auto;
		list-style-type: none;
	}
	
	.text {
		width: 100%;
		min-height: 200px;
		height: auto;
		border: none;
		text-align: center;
	}
	
	.ui-state-default {
		position: relative;
	}
	
	.ui-state-default:hover {
		border: #1296db 1px dotted;
	}
	
	.ue {
		width: 100%;
		height: 300px;
		text-align: center;
	}
	
	.updateBtn {
		position: absolute;
		top: 0;
		left: 0;
		display: none;
		z-index: 999;
	}
	
	.el-dialog {
		width: 70%;
		height: auto;
		min-height: 500px;
	}
	
	.edui-editor-iframeholder {
		height: 200px!important;
	}
	
	.option {
		position: absolute;
		top: 0;
		right: 0;
		display: none;
	}
	
	.el-button {
		padding: 12px 20px;
	}
	
	.option .el-button {
		border-radius: 50%;
		padding: 5px;
	}
	/*商品列表部分*/
	.goods{
		display: flex;
		flex-direction: row; 
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.goods-item{
		width: 200px;
		height: 300px;
		border: 1px solid #ccc;
		margin: 10px 0;
	}
	.item-image{
		width: 200px;
		height: 200px;
	}
	.item-text{
		padding: 10px;
		display: flex;
		justify-content: center;
		color: #000;
		width: 200px;
	    height: 20px;
	    line-height: 20px;
	    font-size: 17px;
	    margin-top: 10px;
	    text-align: left;
	    display: inline-block;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.item-price{
		padding: 0 10px;
		color: #F14E41;
		font-size: 17px;
		font-weight: bold;
	}
	.item-price:before{
		content: "￥";
	}
</style>
<link rel="stylesheet" type="text/css" href="../../../../style/jquery-ui.min.css" />
<link rel="stylesheet" type="text/css" href="../../../../style/mui.min.css" />
<style lang="less">
	.t_tab {
		width: 1000px;
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
</style>