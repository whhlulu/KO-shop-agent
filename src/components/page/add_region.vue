<template>
    <div class="mask_img">
        <div class="mask_z"></div>
        <div class="new_Album">
            <div class="title">
                <span class="fl new">添加地区</span>
                <span class="fr close_z" @click="hide">×</span>
            </div>
            <div class="z_content">
                <div class="open">
                    <span class="i_open"><i></i>展开</span>
                </div>
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="region_list">
                    <tr>
                        <td align="center" bgcolor="#f9fafa" class="bold black">
                            <input type="checkbox" class="all" name="all">
                            全选</td>
                        <td bgcolor="#f9fafa" align="center" class="bold black">地区名称</td>
                        <td bgcolor="#f9fafa" class="bold black">操作</td>
                    </tr>
                    <tr v-for="(item,index) in 6" :key="index">
                        <td width="53" class="wz" align="left" bgcolor="#f9fafa"><input type="checkbox" class="all" name="all"></td>
                        <td align="center" bgcolor="#f9fafa" class="bold black">上海</td>
                        <td align="center" bgcolor="#f9fafa" class="bold"><span class="blue">删除</span></td>
                    </tr>
                </table>
                <div class="page">
                    <ul class="clearfix fl">
                        <li class="fl" v-for="(item,index) in 6" :key="index">
                            <span>{{index+1}}</span>
                        </li>
                    </ul>
                    <span class="next_page fl">下一页</span>
                </div>
                <div class="s_btn">
                    <button class="fr">确定</button>
                </div>
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
            this.$store.state.add_region = false;
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
                margin-left:-400px;
                margin-top:-300px; 
                width: 800px;
                height: 550px;
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
                    .z_content {
                        padding: 0 25px;
                        .open {
                            margin: 20px 0;
                            height: 40px;
                            border-radius: 5px;
                            -moz-border-radius: 5px;
                            -webkit-border-radius: 5px;
                            -o-border-radius: 5px;
                            border: 1px solid #e0e0e0;
                            .i_open {
                                line-height: 28px;
                                float: left;
                                border-radius: 4px;
                                -moz-border-radius: 4px;
                                -webkit-border-radius: 4px;
                                -o-border-radius: 4px;
                                text-indent: 2px;
                                color: #fff;
                                background-color:#001f40; 
                                width: 50px;
                                margin:6px 0 6px 50px;
                                height: 28px;
                                cursor: pointer;
                                i{
                                    margin-top: 6px;
                                    margin-left: 4px;
                                    float: left;
                                    width: 13px;
                                    height: 13px;
                                    background: url(../../assets/箭头.png) no-repeat;
                                    background-size:13px 13px; 
                                    transform:rotate(270deg);
                                    -ms-transform:rotate(270deg); 
                                    -moz-transform:rotate(270deg); 	
                                    -webkit-transform:rotate(270deg); 
                                    -o-transform:rotate(270deg); 
                                }
                            }
                        }
                        .region_list {
                                border-left: 1px solid #dddddd;
                                border-right: 1px solid #dddddd;
                                border-top: 1px solid #dddddd;
                                color: #a4a5a7;
                            tr {
                                .wz{
                                    padding-left: 10px;
                                }
                                .blue {
                                    color: #337ab7;
                                    cursor: pointer;
                                }
                                td {
                                    border-bottom: 1px solid #ddd;
                                    padding: 10px 0;
                                    line-height: 24px;
                                    font-size: 12px;
                                    .all {
                                        margin: 0;
                                    }
                                }
                            }
                        }
                        .page {
                            padding: 10px 0;
                            height: 25px;
                            line-height: 25px;
                            ul {
                                li {
                                    width: 25px;
                                    text-align: center;
                                    color: #337ab7;
                                    cursor: pointer;
                                }
                                li.active {
                                    color: #000;
                                }
                                li:first-child {
                                    color: #000;
                                }
                            }
                            .next_page {
                                width: 50px;
                                text-align: center;
                                color: #337ab7;
                                cursor: pointer;
                            }
                        }
                        .s_btn {
                            height: 30px;
                            button {
                                width: 50px;
                                height: 30px;
                                border: none;
                                -moz-border-radius: 5px;
                                -webkit-border-radius: 5px;
                                -o-border-radius: 5px;
                                border-radius: 5px;
                                background-color:#58b4ff; 
                                color: #fff;
                            } 
                        }
                    }
                    
                }
            }
</style>