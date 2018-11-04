<template>
  <div class="image_space">
      <div class="tab_content">
        <h1 class="t_title">
            <span class="size16">图片空间 - 相册列表</span>
            <div class="found fr"  @click="dialogVisible = true">新建相册</div>
        </h1>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="specification" >
            <tr>
                <td align="center" bgcolor="#f9fafa" class="bold black">编号 </td>
                <td bgcolor="#f9fafa" width="180" class="bold black">相册名称 </td>
                <td bgcolor="#f9fafa" class="bold black">封面照片</td>
                <td  width="100" bgcolor="#f9fafa" class="bold black">图片数量</td>
                <td bgcolor="#f9fafa" class="bold black">操作</td>
                <td bgcolor="#f9fafa" class="bold black">&nbsp;</td>
                <td bgcolor="#f9fafa" class="bold black">&nbsp;</td>
            </tr>
            <tr v-for="(item,index) in data" :key="item.id">
                <td width="100" align="center">{{item.id}}</td>
                <td>{{item.title}}</td>
                <td width="180" class="td"> <img class="default" :src="item.img" alt="" @mouseover="toggleShow(index)" @mouseout="toggleShow">
                <div class="image_s" :class="{active:isShow==index}"><img :src="item.img" alt=""></div></td>
                <td width="53">10</td>
                <td width="33"><span class="edit">编辑</span></td>
                <td width="33"><span class="edit" @click="look">查看</span></td>
                <td width="71"><span class="edit">删除</span></td>
            </tr>
        </table>
        <div class="Paging">
              <div class="Paging_r">
                  <span class="jilu">共1条记录，每页显示： 1条</span>
                  <span class="zuyou"></span>
                  <span class="num">1</span>    
                  <span class="zuyou">></span>
                  <input type="text" class="shuru">
                  <span class="go">GO</span>   
              </div>  
          </div>
    </div>
    <!-- <div v-if="$store.state.mask_show">
        <maskimage></maskimage>
    </div> -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
</el-dialog>
  </div>
</template>
<script>
import maskimage from '../../../page/mask' //新建图片遮罩层
export default {
    name:'image',
    data (){
      return {
          dialogVisible: false,
          isShow: null,
          look_show:false,
          hide:true,
          data:[{id:1,title:'s1',img:require('@/assets/1.jpg')},
          {id:2,title:'s5',img:require('@/assets/1.jpg')},
          {id:3,title:'s3',img:require('@/assets/1.jpg')},
          {id:4,title:'s4',img:require('@/assets/1.jpg')}
          ]
      }
    },
    methods:{
        show(){
            // this.$store.state.mask_show = true;
            console.log(parent.this.$store.state.mask_show) ;
            
        },
        look(){
           this.$router.push({
                name: 'Picturelist',
                // params: {
                //     status: 0
                // }
            }); 
        },
        toggleShow(index){
            this.isShow = index;
        }
    },
    components: {
        maskimage
    }
            
}
</script>
<style lang="less" scoped>
   .image_space {
      width: 1042px;
        .tab_content {
            .t_title {
                color: #333;
                border-bottom: 1px solid #dddddd;
                overflow: hidden;
                margin-bottom: 22px;
                line-height: 50px;
                .found {
                    background: url(../../../../assets/file.png) no-repeat 20px #ff9f24;
                    width: 125px;
                    height: 32px;
                    border: 1px solid #ff920b;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: normal;
                    cursor: pointer;
                    color: #FFF;
                    line-height: 32px;
                    text-indent: 45px;
                    
                }
                .recovery {
                    background: url(../../../../assets/delete_03.png) no-repeat 20px #ff9f24;
                    width: 125px;
                    height: 32px;
                    border: 1px solid #ff920b;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: normal;
                    cursor: pointer;
                    color: #FFF;
                    line-height: 32px;
                    text-indent: 45px;
                    margin-left: 20px;
                }
            }
            .specification {
              border-left: 1px solid #dddddd;
              border-right: 1px solid #dddddd;
              border-top: 1px solid #dddddd;
              color: #a4a5a7;
              input {
                width: 288px;
                height: 32px;
                border: 1px solid #cccccc;
                padding-left:5px;
              }
              input[type=checkbox], input[type=radio] {
                  margin:0;
              }
              tr {
                td {
                    border-bottom: 1px solid #ddd;
                    padding: 10px 0;
                    line-height:24px;
                    font-size:12px; 
                }
                .td{
                    position: relative;
                        .default {
                            width: 20px;
                            height: 20px;
                            cursor: pointer;
                            }
                            .image_s {
                                position: absolute;
                                left: 55px;
                                top: 23px;
                                display: none;
                                border: 1px solid #dddddd;
                                img{
                                    width: 120px;
                                    height: 120px;
                                }
                            }
                            .image_s.active{
                                display: block;
                        }
                    }
                .edit {
                    border: 1px solid #dddddd;
                    color: #666666;
                    width: 40px;
                    line-height: 22px;
                    text-align: center;
                    display: block;
                    border-radius: 4px;
                    float: left;
                    cursor: pointer;
                }
              }
            }
            .Paging{
                height: 50px;
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                border-bottom: 1px solid #ddd;
                .Paging_r{
                    float: right;
                    span{
                        display: block;
                        float: left;
                    }
                    .jilu{
                        height: 50px;
                        line-height: 50px;
                        margin-right: 5px;
                    }
                    .zuyou{
                        width: 30px;
                        height: 28px;
                        float: left;
                        text-align: center;
                        line-height: 28px;
                        border: 1px solid #dddddd;
                        margin-top: 10px;
                        cursor: pointer;
                        font-size: 16px;
                    }
                    .num{
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        background-color: #f7bc0a;
                        text-align: center;
                        color: #FFF;
                        display: block;
                        float: left;
                        margin-top: 10px;
                        cursor: pointer;
                    }
                    .shuru{
                        width: 30px;
                        border: 1px solid #dddddd;
                        height: 28px;
                        float: left;
                        margin-left: 15px;
                        margin-right: 15px;
                        margin-top: 10px;
                        text-align: center;
                    }
                    .go{
                        width: 37px;
                        border: 1px solid #dddddd;
                        height: 28px;
                        border-radius: 6px;
                        background-color: #f7f7f7;
                        display: block;
                        float: right;
                        text-align: center;
                        margin-top: 10px;
                        margin-right: 15px;
                        line-height: 28px;
                        cursor: pointer;
                    }
                }
            }
        }
        // .mask{
        //     width: 100%;
        //     height: 100%;
        //     background-color:#000;
        //     opacity: .5; 
        // }
   }
</style>