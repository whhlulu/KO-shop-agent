<template>
	<div>
		<div class="notes-box">
			<div class="notes_title">温馨提示</div>
			<div class="notes_content">
				<p>请在2分钟内添加图片，否则保存后点击“确认提交”按钮重新进入此页面修改。</p>
				<p>上传图片的宽高请在指定范围内，超过或过低将不能上传成功</p>
			</div>
		</div>
		<div>
			<el-upload :action="action" list-type="picture-card" accept=".jpg,.png,.jpeg" multiple name="fileData" :data="uploadData" :before-upload="beforeUploade" :file-list="fileList" :on-success="success" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
				<i class="el-icon-plus"></i>
			</el-upload>
			<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,图片宽度介于{{imageConf.min_width}}~{{imageConf.max_width}},高度介于{{imageConf.min_height}}~{{imageConf.max_height}}</div>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
			<div class="button">
				<span @click="addPicture">确认提交</span>
			</div>
		</div>
	</div>
</template>
<script>
import { Upload } from "element-ui";
import returnsVue from "../../../../../returns/returns.vue";
export default {
	data() {
		return {
			action:
				this.$store.state.image_api_url + "FileUpload/uploadImageToLocal/",
			dialogImageUrl: "",
			dialogVisible: false,
			uploadData: {
				sessionToken: "",
				imageToken: ""
			},
			fileList: [],
			imageConf: {},
			imageToken: "",
			sToken: "", // session token
			uploadFile: []
		};
	},
	mounted() {
	},
	methods: {
		imageConfigure() {
			this.$HTTP(this.$httpConfig.getGoodsImgCofig,{}).then(res => {
				let data = res.data.data;
				this.imageConf = data.config;
				this.imageToken = data.token;
				this.sToken = data.s_token;
			});
		},
		// 删除回调
		handleRemove(file, fileList, index) {
			console.log('del', this.uploadFile)
			let newUrl = file.response.data;
			this.$HTTP(this.$httpConfig.delGoodsImgCofig,{
				fileName: newUrl,
				sessionToken: this.sToken,
				imageToken: this.imageToken
			}).then(res => {
				//找到删除的图片并在数据里删除
				let index = this.uploadFile.indexOf(newUrl);
				this.uploadFile.splice(index, 1);
				console.log('del2', this.uploadFile)
				this.$message.success(res.data.message);
			}).catch(function (error) {
				console.log(error);
			});
		},
		//显示
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		// 上传成功
		success(response, file, fileList) {
			this.$layer.msg(response.message);
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
		// 上传之前
		beforeUploade(file) {
			this.uploadData.sessionToken = this.sToken;
			this.uploadData.imageToken = this.imageToken;
			const isLt2M = file.size / 1024 / 1024 < 3;
			if (!isLt2M) {
				this.$layer.msg("上传头像图片大小不能超过 2MB!");
			}
			return isLt2M;
		},
		// 添加图片
		addPicture() {
			this.$HTTP(this.$httpConfig.addGoodsPic, {
				pic_url: this.uploadFile
			}, 'post').then((res) => {
				this.$message.success(res.data.message)
				this.$emit('selectTab');
				this.$store.state.tab_state = 2;
				this.$emit('getSpec');
				if (!this.$store.state.tab_Index[2]) {
					this.$store.state.tab_Index.push(2);
				}
			});
		}
	}
};
</script>
<style>
.el-upload__input {
  display: none !important;
}
.el-upload--picture-card i {
  line-height: inherit;
}
</style>
<style lang="less" scoped>
.button {
  height: 32px;
  margin: 20px 0 20px 135px;
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
</style>
