<template>
	<!-- 店铺 -店铺设置 -->
	<div class="classify">
		<div class="g_att">
			<h1 class="t_title">
				<span class="size16">店铺设置</span>
			</h1>
			<div class="notes-box">
				<div class="notes_title">温馨提示</div>
				<div class="notes_content">
					<p>您填写的信息将在店铺前台展示给买家，请认真填写</p>
				<p>请在2分钟内添加图片，否则保存后点击“确认提交”按钮重新进入此页面修改。</p>
				</div>
				<div class="info-s">s-h-o-p-s-n</div>
			</div>
			<h1 class="t_title heading">
				<span class="size14">店铺基本信息</span>
			</h1>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="list info">
				<tr>
					<td align="right" class="black">
						<b>*</b> 店铺名称： </td>
					<td>
						<el-input placeholder="请输入内容" v-model="shop_name" class="el-input" clearable>
						</el-input>
					</td>
				</tr>
				<tr>
					<td width="13%" align="right" class="black">
						<b>*</b> 店铺 LOGO： </td>
					<td width="80%" id="input-box">
						<img v-show="store_logo" :src="URL+store_logo" alt="" class="shop_img">
						<el-upload :action="action" list-type="picture-card" accept=".jpg,.png,.jpeg" name="fileData" :limit=1 :on-exceed="exceeding" :data="uploadData" :before-upload="beforeUploade" :file-list="fileList" :on-success="success" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<p>文件格式 GIF, JPG, JPEG, PNG 文件大小80k 以内，建议尺寸宽度介于{{imageConf.min_width}}~{{imageConf.max_width}},高度介于{{imageConf.min_height}}~{{imageConf.max_height}}</p>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</td>
				</tr>
				<tr>
					<td width="13%" align="right" class="black nothing">
						<b>*</b> 店铺简介：
						<p class="none"></p>
					</td>
					<td width="80%">
						<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" :rows="2" class="el-input" placeholder="请输入内容" v-model="description">
						</el-input>
						<p>店铺简介会加入到 SEO 优化中 ，100字以内</p>
					</td>
				</tr>
			</table>
			<h1 class="t_title heading">
				<span class="size14">店铺经营信息</span>
			</h1>
			<table width="100%" border="0" cellspacing="0" cellpadding="0" class="manage list">
				<tr>
					<td width="13%" align="right" class="black"> 经营时间： </td>
					<td width="90%" style="padding:0">
						<el-table :data="tableData" border style="width: 82%">
							<el-table-column v-for="item in week" width="60" :key="item.id" property="flag" :label="item">
								<template slot-scope="scope">
									<el-switch disabled v-model="flag" active-color="#13ce66" inactive-color="#ff4949">
									</el-switch>
								</template>
							</el-table-column>
							<el-table-column label="开始时间">
								<template slot-scope="scope">
									<span class="up_time">
										<el-time-select placeholder="00:00" v-model="start_time" :picker-options="{
	                            start: '00:00',
	                            step: '00:60',
	                            end: '23:59'
	                            }">
										</el-time-select>
									</span>
								</template>
							</el-table-column>
							<el-table-column label="结束时间">
								<template slot-scope="scope">
									<span class="up_time">
										<el-time-select placeholder="00:00" v-model="end_time" :picker-options="{
	                            start: '00:00',
	                            step: '00:60',
	                            end: '23:59'
	                            }">
										</el-time-select>
									</span>
								</template>
							</el-table-column>
						</el-table>
					</td>
				</tr>
				<tr>
					<td align="right" class="black">
						<b>*</b> 联系地址： </td>
					<td>
						<city-three v-on:sendcityData="getCityData" :sendParams="city_tree"></city-three>
					</td>
				</tr>
				<tr>
					<td width="13%" align="right" class="black nothing">
						<b>*</b> 详细地址：
						<p class="none_z"></p>
					</td>
					<td width="80%" id="address">
						<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" :rows="2" class="el-input" placeholder="请输入内容" v-model="address">
						</el-input>
					</td>
				</tr>
				<tr>
					<td align="right">&nbsp;</td>
					<td class="submit-box">
						<el-button type="success" @click="submit">确认提交</el-button>
					</td>
					<td>&nbsp;</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
export default {
	name: 'shopfit',
	data() {
		return {
			startTime: '',
			endTime: '',
			flag: true,
			value: true,
			week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			tableData: [{ falg: true }],
			textfield1: 'e',
			action: this.$store.state.image_api_url + "FileUpload/uploadImageToLocal/",
			dialogImageUrl: "",
			dialogVisible: false,
			textarea: '22',
			uploadData: {
				sessionToken: "",
				imageToken: ""
			},
			fileList: [],
			imageConf: {},
			imageToken: "",
			sToken: "", // session token
			uploadFile: [],
			classData: {}, // 一级分类
			classByTwo: [], // 二级分类数据
			classByThree: [], // 三级分类数据
			fileList: [],
			shopData: {
				address: {},
				store: {
					shop_name: ''
				}
			},
			city_tree: {},
			shop_name: '',
			description: '',
			start_time: '',
			end_time: '',
			address: '',
			prov_id: 0,
			dist: 0,
			city: 0,
			store_logo: '',
			store_address: 0,
		}
	},
	created() {
	},
	mounted() {
		
		this.$HTTP(this.$httpConfig.getStoreInfo, {}, 'post').then((res) => {
			let store = res.data.data.store;
			let address = res.data.data.address;
			this.shop_name = store.shop_name;
			this.print_desc = store.print_desc;
			this.description = store.description;
			if (store.start_time.length == 1) {
				this.start_time = '0' + store.start_time + ":00";
			} else {
				this.start_time = store.start_time + ":00";
			}
			if (store.start_time.length == 1) {
				this.end_time = '0' + store.end_time + ":00";
			} else {
				this.end_time = store.end_time + ":00";
			}
			this.store_logo = store.store_logo;
			this.store_address = store.store_address;
			this.address = address.address;
			this.city = address.city;
			this.prov_id = address.prov_id;
			this.dist = address.dist;
			this.city_tree = {
				prov: this.prov_id,
				city: this.city,
				dist: this.dist
			};
		}).catch((err) => {
			this.$message.error(err);
		});
		this.$HTTP(this.$httpConfig.getGoodsImgCofig, {}, 'post').then(res => {
			let data = res.data.data;
			this.imageConf = data.config;
			this.imageToken = data.token;
			this.sToken = data.s_token;
		});
	},
	methods: {
		// 获取省市区数据
		getCityData(data) {
			this.prov_id = data.prov;
			this.city = data.city;
			this.dist = data.dist;
		},
		// 删除回调
		handleRemove(file, fileList, index) {
			this.$HTTP(this.$httpConfig.delGoodsImgCofig, {
				fileName: file.response.data,
				sessionToken: this.uploadData.sessionToken,
				imageToken: this.uploadData.imageToken
			}, 'post').then(res => {
				//找到删除的图片并在数据里删除
				let index = this.uploadFile.indexOf(file.response.data);
				this.uploadFile.splice(index, 1);
				this.$message.success(res.data.message);
			}).catch(function (error) {
				console.log(error);
			});
		},
		// 上传之前
		beforeUploade(file) {
			this.uploadData.sessionToken = this.sToken;
			this.uploadData.imageToken = this.imageToken;
			const isLt2M = file.size / 1024 / 1024 < 3;
			if (!isLt2M) {
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
			if (response.status == 0) {
				let length = fileList.length;
				let i = 0;
				for (i; i < length; i++) {
					if (fileList[i].name === file.name) {
						fileList.splice(i, 1);
					}
				}
			} else {
				this.uploadFile.push(response.data);
			}
		},
		//超出文件个数
		exceeding(files, fileList) {
			if (fileList.length == 1) {
				this.$message({
					duration: 1000,
					type: 'error',
					message: '超出最大文件个数!'
				});
			}
		},
		// 添加图片
		addPicture() {
			this.$HTTP(this.$httpConfig.addGoodsPic, { pic_url: this.uploadFile }, 'post').then(function (res) {
				this.$message.success(res.data.message);
			});
		},
		tolink() {
			this.$router.push({
				name: 'addGrade',
				// params: {
				//     status: 0
				// }
			});
		},
		submit() {
			let start_time = '';
			let end_time = '';
			this.store_logo = this.uploadFile[0];
			start_time = this.start_time.substring(0, this.start_time.indexOf(':'));
			if (start_time[0] == 0) {
				start_time = start_time.substring(1);
			}
			end_time = this.end_time.substring(0, this.end_time.indexOf(':'));
			if (end_time[0] == 0) {
				end_time = end_time.substring(1);
			}
			this.$HTTP(this.$httpConfig.saveStoreInfo, {
				shop_name: this.shop_name,
				description: this.description,
				start_time: start_time,
				end_time: end_time,
				address: this.address,
				prov_id: this.prov_id,
				dist: this.dist,
				city: this.city,
				store_logo: this.store_logo,
				store_address: this.store_address,
			}, 'post').then((res) => {
				this.$message({
					duration: 1000,
					type: 'success',
					message: res.data.message
				});
			}).catch((err) => {
				this.$message.error(err);
			});
		},
	},
	filters: {
		glqe: function (value) {
			let arr = ['是', '否'];
			return typeof (value);
		}
	}
}
</script>
<style>
.classify {
  padding-bottom: 50px;
}
.submit-box {
  text-align: center;
}
.updata_image {
  margin-left: 10px;
}
.el-upload--picture-card i {
  line-height: 148px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #ff920b;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-upload__input {
  display: none !important;
}
</style>
<style lang="less">
body {
  overflow: inherit;
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
  .heading {
    border: none;
    line-height: 30px;
    margin: 10px 0 10px 10px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100px;
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
<style type="text/css">
#address .el-input {
  width: 500px;
}

.el-table td,
.el-table th.is-leaf {
  text-align: center;
}
</style>
<style lang="less" scoped>
.classify {
  width: 1000px;
  .g_att {
    .info {
      .el-input {
        width: 500px;
      }
    }
    .list {
      margin-top: 15px;
      tr {
        td {
          padding: 15px 0;
          input,
          select {
            padding-left: 5px;
            width: 288px;
            height: 32px;
            border: 1px solid #cccccc;
          }
          select {
            width: 180px;
          }
          .none {
            padding: 0;
            height: 80px;
          }
          .none_z {
            height: 50px;
            padding: 0;
          }
          .none_x {
            height: 35px;
            padding: 0;
          }
          img {
            background-color: #fbfdff;
            border: 1px dashed #c0ccda;
            border-radius: 6px;
            box-sizing: border-box;
            width: 148px;
            height: 148px;
            line-height: 146px;
            vertical-align: top;
            float: left;
            margin-right: 5px;
          }
          p {
            padding: 10px 0;
          }
          b {
            color: #ff0000;
          }
          textarea {
            padding-left: 5px;
            padding-top: 5px;
            min-height: 80px;
            border: 1px solid #cccccc;
          }
          .Settled {
            height: 32px;
            line-height: 32px;
            color: #fff;
            text-align: center;
            display: block;
            border-radius: 6px;
            margin-top: 20px;
            float: left;
            margin-right: 20px;
            cursor: pointer;
          }
        }
      }
    }
    .manage {
      margin-top: 15px;
      tr {
        td {
          padding: 15px 0;
          .time {
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
            border-top: 1px solid #ddd;
            tr {
              td {
                border-bottom: 1px solid #ddd;
                padding: 10px 0;
                .up_time {
                  padding-left: 10px;
                }
              }
              .right-border {
                border-right: 1px solid #ddd;
              }
            }
          }
        }
      }
    }
  }
  .info-s {
    display: none;
  }
}
</style>
