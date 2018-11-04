<template>
    <div class="mask_img" v-show="$store.state.upload_show">
        <div class="mask_z"></div>
        <div class="new_Album">
            <div class="title">
                <span class="fl new">上传图片</span>
                <span class="fr close_z" @click="hide">×</span>
            </div>
            <div class="size" v-show="clear">
                <span>共 {{images.length}} 张 ({{(size/1024).toFixed(2)+'k'}}) , 已上传 {{images.length}} 张</span>
            </div>
            <ul class="image_list clearfix" v-show="clear">
                <li class="fl" v-for="(item,index) in images" :key="item.id">
                    <p class="delete_i"><img @click="recovery(index)" src="../../assets/delete-b.png" alt=""></p>
                    <img class="in" :src="item" alt="图片">
                </li>
            </ul>
            <div class="modify" v-show="clear">
                <button class="blue" @click="addPic">继续添加</button>
                <button class="black" @click="hide">确定使用</button>
            </div>
            <!-- 点击上传 -->
            <div class="z_info" v-if="!size">
                <img src="../../assets/2-上传图片_03.jpg" alt="">
            </div>
            <div class="s_btn" v-show="!size">
                <span class="click_btn" @click="addPic">点击选择图片</span>
                <input type="file" id="up" @change="onFileChange" multiple v-show="false">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'uploadImage',
    data (){
      return {
          clear:false,
          images:[],
          size:null
      }
    },
    watch:{
        images(){
            if(this.images.length === 0) {
                this.clear = false;
                this.size = null;
            }
        }
    },
    methods:{
        //删除
        recovery(index){
            this.images.splice(index,1);
        },
        hide(){
            console.log(this.images.length)
            this.$store.state.upload_show = false;
        },
        //上传图片
         addPic(){
             if(this.images.length >= 6){
                 this.$message({
                        message: '超出可上传数量!',
                        type: 'warning',
                        center: true
                    });
                 return false;
             }
              $('#up').trigger('click');
              return false;
          },
          onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)return; 
                this.createImage(files);
            },
            createImage(file) {
                if(typeof FileReader === 'undefined'){
                    this.$message({
                        message: '您的浏览器不支持图片上传，请升级您的浏览器',
                        type: 'warning'
                        });
                        return false;
                }
                let that = this;
                if(file.length+that.images.length > 6){
                    this.$message({
                            message: '最多上传6张',
                            type: 'warning',
                            center: true
                        });
                        return false;
                        }
                for(let i=0;i<file.length;i++){
                    that.size+=file[i].size;
                    console.log(file[i].size)
                }
                let leng = file.length;
                for(let i=0;i<leng;i++){
                    let reader = new FileReader();
                    reader.readAsDataURL(file[i]); 
                    reader.onload =function(e){
                    that.images.push(e.target.result);                                  
                    };  
                }
                that.clear = true;
        },
    },
            
}
</script>
<style lang="less" scoped>
        .mask_img{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            .mask_z{
                width: 100%;
                height: 100%;
                background-color:#000;
                opacity: .5; 
            }
            .new_Album {
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left:-300px;
                margin-top:-300px; 
                width: 600px;
                height: 300px;
                background-color:#fff;
                -moz-border-radius: 5px;
                -webkit-border-radius: 5px;
                -o-border-radius: 5px;
                border-radius: 5px;
                z-index: 10;
                    .title {
                        border-radius: 5px 5px 0 0;
                        -moz-border-radius: 5px 5px 0 0;
                        -webkit-border-radius: 5px 5px 0 0;
                        -o-border-radius: 5px 5px 0 0;
                        color: #2d2d2d;
                        font-weight:600;
                        font-size: 14px; 
                        height: 45px;
                        border: 1px #e0e0e0 solid;
                        .new {
                            height: 100%;
                            line-height: 45px;
                            padding-left: 25px;
                        }
                        .close_z {
                            cursor: pointer;
                            font-size: 24px;
                            font-weight:200;
                            margin-right: 15px;
                            margin-top: 2px;
                        }
                    }
                    .size {
                        padding:10px 0 0 28px;
                        span {
                            color: #555;
                        }
                    }
                    .image_list {
                        padding: 40px 28px;
                        li {
                            position: relative;
                            margin-left: 10px;
                            z-index: 1;
                            .delete_i {
                                position: absolute;
                                display: none;
                                opacity: .5;
                                width: 80px;
                                height: 25px;
                                background: #000;
                                top: 0;
                                left: 0;
                                z-index: 2;
                                text-align: right;
                                img{
                                    width: 19px;
                                    height: 20px;
                                    cursor: pointer;
                                    margin-top: 2px;
                                    margin-right:2px; 
                                }
                            }
                            img {
                                width: 80px;
                                height: 80px;
                                cursor: pointer;
                            }
                            
                        }
                        li:first-child{
                            margin-left: 0;
                        }
                        li:hover .delete_i{
                                display: block;
                            }
                        
                    }
                    .modify {
                        padding-left:28px;
                        button {
                            width: 90px;
                            height: 35px;
                            border: none;
                            -moz-border-radius: 5px;
                            -webkit-border-radius: 5px;
                            -o-border-radius: 5px;
                            border-radius: 5px;
                            
                        } 
                        .blue {
                            border: 1px #e0e0e0 solid;
                            color: #555;
                            
                        }
                        .black {
                            background-color:#ff9f24; 
                            color: #fff;
                            margin-left: 10px;
                        }
                    }
                    .z_info {
                        padding: 70px 0 40px 0;
                        text-align:center;
                        
                    }
                    .s_btn {
                        text-align: center;
                        .click_btn {
                            width: 100px;
                            margin: 0 auto;
                            background: #ff9f24;
                            line-height: 35px;
                            color: #fff;
                            height: 35px;
                            border: none;
                            display: block;
                            -moz-border-radius: 5px;
                            -webkit-border-radius: 5px;
                            -o-border-radius: 5px;
                            border-radius: 5px;
                            cursor: pointer;
                            
                        } 
                    }
                }
            }
</style>