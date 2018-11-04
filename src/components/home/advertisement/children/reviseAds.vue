<template>
  <div class="logistics fl">
    <!-- 账号 - 编辑广告-->
    <div class="t_tab">
        <h1 class="t_title">
            <span class="size16">广告 - 编辑广告</span>
            <div class="t_m fr" @click="to">返回广告列表</div>
        </h1>
		<div class="notes-box">
			<div class="notes_title">温馨提示</div>
			<div class="notes_content">
				<p>请在2分钟内添加图片，否则保存后点击“确认提交”按钮重新进入此页面修改。</p>
				<p>上传图片的宽高请在指定范围内，超过或过低将不能上传成功</p>
			</div>
		</div>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="logistics_x" >
            <tr>
                <td align="right" class="black"> 广告名称： </td>
                <td width="85%">
                    <el-input 
                        placeholder="自定义广告名称"
                        v-model="advertisingList.adv_title" 
                        clearable 
                        style="width: 600px;" 
                        >
                    </el-input>
                </td>
            </tr>
             <tr>
                <td align="right" class="black"> 广告位置： </td>
                <td>
                    <el-select v-model="advertisingList.ap_id" placeholder="请选择" style="width:300;" @change="getSize">
                        <el-option
                        v-for="item in positionList"
                        :key="item.id"
                        :label="item.ap_name"
                        :value="item.id"
                        disabled>
                        </el-option>
                    </el-select>
                </td>
            </tr>
            <tr>
                <td align="right" class="black"> 开始时间： </td>
                <td>
                    <el-date-picker
                    style="width:300px;"
                    v-model="advertisingList.adv_start_date"
                    value-format="yyyy-MM-dd"
                    align="right"
                    :editable=false
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </td>
            </tr>
            <tr>
                <td align="right" class="black"> 结束时间： </td>
                <td>
                    <el-date-picker
                    style="width:300px;"
                    v-model="advertisingList.adv_end_date"
                    value-format="yyyy-MM-dd"
                    align="right"
                    :editable=false
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions2">
                    </el-date-picker>
                </td>
            </tr>
            <tr>
                <td align="right" class="black"> 广告链接： </td>
                <td>
                    <el-input 
                        v-model="advertisingList.ad_url" 
                        clearable 
                        style="width: 600px;" 
                        >
                    </el-input>
                </td>
            </tr>
            <tr>
                <td align="right" class="black"> 广告图片： </td>
                <td>
                    <img class="ads_image" :src="URL + advertisingList.adv_content" alt="">
                     <el-upload
                        :action="action"
                        list-type="picture-card"
                        accept=".jpg,.png,.jpeg"
                        name="adv_content"
                        :limit=1
                        :data="uploadData"
                        :before-upload="beforeUploade"
                        :file-list="fileList"
                        :on-success="success"
                        :on-exceed="exceeding"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过1M，最大上传个数1
                        <!-- 图片宽度介于0~{{adsWidth}},高度介于0~{{adsHeight}} -->
                        
                    </div>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </td>
            </tr>
             <tr>
                <td align="right" class="black"> 广告大小： </td>
                <td>
                    宽：{{adsWidth}} px ~ {{maxWidth}} px ;  高 {{adsHeight}} px ~ {{maxHeight}} px
                </td>
            </tr>
            <tr>
                <td align="right" class="black">排序：</td>
                <td>
                    <el-input 
                        v-model="advertisingList.slide_sort" 
                        clearable 
                        style="width: 200px;" 
                        >
                    </el-input>                
                </td>               
            </tr>
            <tr>
                <td align="right">&nbsp;</td>
                <td colspan="2">
                    <el-button  @click="submit" type="success">确认提交</el-button>
                    </td>
            </tr>
        </table>
    </div>
  </div>
</template>
<script>
export default {
  name:'addingAds',
  data () {
    return {
        action:this.$httpConfig.getAdvPictureURL,
        dialogImageUrl: "",
        dialogVisible: false,
        uploadData: {
            id: "",
            token:sessionStorage.getItem("data_token")
        }, 
        uploadFile:[],
        fileList:[],
        positionList:[],
        adsWidth:0,
        adsHeight:0,
        maxHeight:0,
        maxWidth:0,
        advertisingList:{
            adv_start_date:'',
            adv_end_date:'',
            ad_url:'',
            adv_content:'',
            adv_title:'',
            ap_id:'',
            slide_sort:'',
            status:'',
            id:''
        },  
        pickerOptions1: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            shortcuts: [{
                text: '今天',
                onClick(picker) {
                picker.$emit('pick', new Date());
                }
            }],
        },
        pickerOptions2: {
            disabledDate(time) {
                return time.getTime() < Date.now();
            }
        }
    }
  },
  created(){
      this.adsPosition();
      this.getData();
  },
    methods:{
        //获取单条数据
        getData(){
            this.$HTTP(this.$httpConfig.getAdvDetail,{id: this.$route.params.id}).then(res =>{
                this.advertisingList = res.data.data;
                this.uploadData.id = parseInt(this.advertisingList.ap_id);
                this.advertisingList.adv_end_date = new Date(res.data.data.adv_end_date * 1000).getFullYear()+'-'+(new Date(res.data.data.adv_end_date * 1000).getMonth()+1)+'-'+new Date(res.data.data.adv_end_date * 1000).getDate();
                this.advertisingList.adv_start_date = new Date(res.data.data.adv_start_date * 1000).getFullYear()+'-'+(new Date(res.data.data.adv_start_date * 1000).getMonth()+1)+'-'+new Date(res.data.data.adv_start_date * 1000).getDate();
                if(this.advertisingList.id != '')this.getSize();
            }).catch(error =>{
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
            }else{
                this.uploadFile.push(response.data);
            }
        },
        // 上传之前
        beforeUploade(file) {
            const isLt1M = file.size / 1024 / 1024 < 1;
            if(!isLt1M){
                this.$message({
                    duration:1000,
                    type:'error',
                    message: '上传图片不能大于1M!'
                });
                return isLt1M;
            }
        // this.uploadData.id = this.advertisingList.ap_id;
        },
        // 删除回调
        handleRemove(file, fileList,index) {
             if (this.position_id == '') {
                return false;
            }
            let newUrl = file.url.substring(23);
            this.$HTTP(this.$httpConfig.delAdvPic,{fileName: file.response.data}).then(res =>{
                //找到删除的图片并在数据里删除
                let index = this.uploadFile.indexOf(newUrl);
                this.uploadFile.splice(index,1);
                this.$message.success(res.data.message);
            }).catch(function(error){
                console.log(error);
            });
        },
        //广告位置
        adsPosition(){
            this.$HTTP(this.$httpConfig.getAdvPostion,{}).then(res => {
                this.positionList = res.data.data;
            }).catch(err =>{
                console.log(err);
            })
        },
        //广告位置尺寸
        getSize(){
            for (let key in this.positionList) {
                if (this.positionList[key].id == this.advertisingList.ap_id) {
                    this.adsWidth = this.positionList[key].ap_width;
                    this.adsHeight = this.positionList[key].ap_height;
                    this.maxWidth = this.positionList[key].max_width;
                    this.maxHeight = this.positionList[key].max_height;
                    return false;
                }
            }
        },
        //编辑
        editor(){
            let upLoadFile = '';
            if(this.uploadFile.length === 1){
                upLoadFile = this.uploadFile[0];
            }
            this.$HTTP(this.$httpConfig.saveStoreAdv,{
                id:this.advertisingList.id,
                adv_title:this.advertisingList.adv_title,
                ap_id:this.advertisingList.ap_id,
                adv_start_date:this.advertisingList.adv_start_date,
                adv_end_date:this.advertisingList.adv_end_date,
                ad_url:this.advertisingList.ad_url,
                adv_content:this.advertisingList.adv_content,
                slide_sort:this.advertisingList.slide_sort,
                img_new:upLoadFile
            }).then(res =>{
                this.$message({
                    duration:1000,
                    type:'success',
                    message: res.data.message
                });
                this.to();
            }).catch(err =>{
                console.log(err);
            })
        },
        //超出文件个数
        exceeding(files, fileList){
            if(fileList.length >= 1){
                this.$message({
                    duration:1000,
                    type:'error',
                    message: '超出最大文件个数!'
                });
            }
            
        },
        //提交
        submit(){
            if(this.advertisingList.adv_title == '') {
                    this.$message({
                        duration:1000,
                        type:'error',
                        message: '请输入广告名称'
                    });
                    return false;
                }
                if (this.advertisingList.ap_id == '') {
                    this.$message({
                        duration:1000,
                        type:'error',
                        message: '请选择广告位置'
                    });
                    return false;
                }
                if (this.advertisingList.adv_start_date == null || this.advertisingList.adv_start_date == '') {
                    this.$message({
                        duration:1000,
                        type:'error',
                        message: '请选择开始时间'
                    });
                    return false;
                }
                if (this.advertisingList.adv_end_date == null || this.advertisingList.adv_end_date == '') {
                    this.$message({
                        duration:1000,
                        type:'error',
                        message: '请选择结束时间'
                    });
                    return false;
                }
                if (this.advertisingList.ad_url == '') {
                    this.$message({
                        duration:1000,
                        type:'error',
                        message: '请输入广告链接'
                    });
                    return false;
                }
                if (!/^[1-9]\d*$/.test(this.advertisingList.slide_sort)) {
                    this.$message({
                        duration:1000,
                        type:'error',
                        message: '排序错误'
                    });
                    return false;
                }
                this.editor();
        },
       to(){
            this.$router.back(); 
        },
    }
}
</script>
<style lang="less">
.el-upload__input {
  display: none !important;
}
.el-upload--picture-card i {
  line-height: inherit;
}
    .t_tab {
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
              .t_m {
                    background: url(../../../../assets/return.jpg) no-repeat 10px #ff9f24;
                    width: 135px;
                    height: 32px;
                    border: 1px solid #ff920b;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: normal;
                    cursor: pointer;
                    color: #FFF;
                    line-height: 32px;
                    text-indent: 32px;
                }
          }
    }
    /* 颜色选择器宽度 */
    .el-color-picker__trigger {
        width: 200px;
    }
    .el-picker-panel__icon-btn{
        padding: 1px 7px 2px;
    }
    .el-picker-panel__shortcut {
        width: 80%;
        padding: 1px 7px 2px 12px;
    }
    .el-switch {
      .el-switch__core {
        width: 35px!important;
        height:16px;
        .el-switch__button {
          width: 11px;
          height: 11px;
        }
      }
        .el-switch__label{
          color:#a4a5a7;
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

<style lang="less" scoped>
    .logistics {
        width: 1042px;
        .Commodity-management {
                background-color: #f6f6f6;
                border: 1px solid #dddddd;
                margin-top: 15px;
                line-height: 50px;
                margin-bottom: 20px;
                input {
                    width: 140px;
                    border: 1px solid #ddd;
                    line-height: 29px;
                    height: 29px;
                    color: #999;
                    text-indent: 5px;
                }
            }
        .bold {
            font-weight: bold;
        }
        .black {
            color: #333;
        }
          .logistics_x {
              tr {
                  td {
                    padding: 10px 0;
                    .ads_image{
                        background-color: #fbfdff;
                        border: 1px dashed #c0ccda;
                        border-radius: 6px;
                        box-sizing: border-box;
                        width: 148px;
                        height: 148px;
                        line-height: 146px;
                        vertical-align: top;
                        float: left;
                        margin-right:10px;
                    }
                    .ss {
                        margin:0;
                    }
                    b{
                        color: #ff0000;
                    }
                    .notes {
                        padding-left:15px;
                    }
                    textarea {
                        padding-left: 5px;
                        padding-top: 5px;
                        min-height: 50px;
                        border: 1px solid #cccccc;
                    }
                    .abstract {
                        min-height: 70px;
                    }
                    .Settled {
                        height: 32px;
                        line-height: 32px;
                        color: #FFF;
                        text-align: center;
                        display: block;
                        border-radius: 6px;
                        margin-top: 30px;
                        float: left;
                        margin-right: 20px;
                        cursor: pointer;
                    }
                  }
              }
          }
        }
</style>