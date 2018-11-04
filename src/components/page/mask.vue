<template>
    <div class="mask_img">
        <div class="mask_z"></div>
        <div class="new_Album">
            <div class="title">
                <span class="fl new">新建相册</span>
                <span class="fr close_z" @click="hide">×</span>
            </div>
            <div class="z_info">
                <div class="goods_name">
                    <span><b class="red">*</b>  相册名称： </span>
                    <input type="text" class="text_name ss" maxlength="60">
                </div>
                <div class="goods_name">
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;排序： </span>
                    <input type="text" class="text_x ss" maxlength="60">
                    <p class="cue">排序为 0~255 的数字， 默认为 255</p>
                </div>
            </div>
            <div class="s_btn">
                <button class="blue">确定</button>
                <button class="black" @click="hide">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'mask_z',
    data (){
      return {
          
      }
    },
    props:{

    },
    methods:{
        hide(){
            this.$store.state.mask_show = false;
        }
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
                    .z_info {
                        padding-left:60px;
                        padding-top: 20px;
                        padding-bottom: 20px;
                        .ss{
                                padding-left: 5px;
                            }
                        .goods_name {
                        span {
                            padding: 10px 0;
                            color: #333;
                                .red {
                                    color: #ff0000;
                                }
                            }
                            .el-switch {
                                padding-left: 0;
                            }
                            .text_name {
                                margin: 10px 0;
                                width: 288px;
                                height: 32px;
                                border: 1px solid #cccccc;
                            }
                            .text_x {
                                margin: 10px 0;
                                width: 100px;
                                height: 32px;
                                border: 1px solid #cccccc;
                            }
                            .cue {
                                    padding: 0 0 10px 75px;
                            }
                        }
                    }
                    .s_btn {
                        padding-left:130px;
                        button {
                            width: 50px;
                            height: 30px;
                            border: none;
                            -moz-border-radius: 5px;
                            -webkit-border-radius: 5px;
                            -o-border-radius: 5px;
                            border-radius: 5px;
                            
                        } 
                        .blue {
                            background-color:#58b4ff; 
                            color: #fff;
                        }
                        .black {
                            border: 1px #e0e0e0 solid;
                            color: #000;
                            margin-left: 10px;
                        }
                    }
                }
            }
</style>