<template>
  <!-- 商品店铺分类 -->
  <div class="classify">
     <div class="g_att">
        <h1 class="t_title">
          <span class="size16">商品分类列表</span>
          <i>（ 共 20 条记录 ）</i>
          <div @click="to" class="t_add fr">添加商品分类</div>
        </h1>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="specification" >
            <tr>
              <th width="100" align="center"  bgcolor="#f9fafa" class="black"><span class="open">全部展开</span> </th>
              <th bgcolor="#f9fafa" class="bold black">分类名称 </th>
              <th bgcolor="#f9fafa" align="center" class="bold black">商品数量</th>
              <th bgcolor="#f9fafa" class="bold black">排序</th>
              <th bgcolor="#f9fafa" class="bold black">是否显示</th>
              <th bgcolor="#f9fafa" class="bold black">操作</th>
              <th bgcolor="#f9fafa" class="bold black">&nbsp;</th>
            </tr>
          </table>
          <table width="100%" border="0" cellspacing="0" cellpadding="0" class="shop">
              <tr v-for="(item,index) in data1" :key="index">
                <td width="269">
                  <div class="name">
                    <i></i>
                    贡茶
                  </div>
                </td>
                <td width="150"><span class="num">0</span></td>
                <td width="121" align="center">1</td>
                <td width="115">
                  <el-switch
                  v-model="item.id"
                  active-text="是"
                  @change="changeSwitch(item.id,index)"
                  active-color="#f7bc0a">
                </el-switch></td>
                <td width="60"><span class="edit write">编辑</span></td>
                <td width="60"><span class="edit new">新增下级分类</span></td>
                <td width="60"><span class="edit d">删除</span></td>
              </tr>  
        </table>
      </div>
  </div>
</template>
<script>
export default {
    name:'classify',
    data (){
      return {
        data1:'',
        value:true
      }
    },
    methods: {
      changeSwitch(val,index){
        if(val == true) {
          this.$message({
              message: '我是开启的',
              type: 'warning'
            });
        }else{
            this.$message({
              message: '我是关闭的',
              type: 'warning'
            });
        }
        console.log(this.data1[index])
      },
      changeSwitch1 (){
        console.log(this.value)
      },
      to(){
          this.$router.push({
                name: 'addgoods',
                params: {
                    status: 0
                }
            });
      },
      t() {
        
      }
    },
    created(){
        let i = [{id:1},{id:0},{id:1},{id:0},{id:1}];
          for (let index = 0; index < i.length; index++) {
            if(i[index].id === 1 ){
                i[index].id = true;
            }else{
                i[index].id = false;
            }
      }
        this.data1 = i;
    },
    mounted(){
    }
}
</script>
<style lang="less">
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
            i {
              color: #999;
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
                color: #FFF;
                line-height: 32px;
                text-indent: 30px;
            }
        }
    }
    .el-switch {
      padding-left: 25px;
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
        }
      }
</style>
<style lang="less" scoped>
    .classify {
        width: 1042px;
        .t_tab {
          .ss{
              padding-left: 5px;
          }
          .z_info {
            padding-left:160px;
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
              .cue {
                    padding: 0 0 10px 75px;
              }
            }
          }
          .button {
              height: 32px;
              margin: 20px 0 20px 235px;
              border-radius: 6px;
              background: #f7bc0a;
              width: 199px;
              span {
                display: block;
                line-height: 32px;
                color: #FFF;
                text-align: center;
                cursor: pointer;
            }
          }
        }
          .specification {
                border-left: 1px solid #dddddd;
                border-right: 1px solid #dddddd;
                border-top: 1px solid #dddddd;
                .black {
                    color: #333;
                  }
                  .bold {
                    font-weight: bold;
                }
                tr {
                  th {
                      border-bottom: 1px solid #ddd;
                      padding: 10px 0;
                      line-height:24px;
                      .open {
                        text-align:center;
                        margin-left:13px;
                        border-radius:3px;
                        color:#fff;
                        display: block;
                        width:50px;
                        cursor: pointer;
                        height:20px;
                        line-height:20px;
                        background:#ff9f24;
                      }
                  }
                }
            }
            .shop {
                border-left: 1px solid #dddddd;
                border-right: 1px solid #dddddd;
                tr {
                  td {
                    border-bottom: 1px solid #ddd;
                    padding: 10px 0;
                    line-height:24px;
                    .name{
                      float: left;
                      cursor: pointer;
                      padding-left:35px;
                      i{
                        float: left;
                        margin:6px;
                        width:11px;
                        height:11px;
                        background: url(../../../../assets/menu_plus.png) no-repeat;
                      }
                    }
                    .num {
                      width:50px;
                      text-align:center;
                      float: left;
                    }
                    .edit {
                        border: 1px solid #dddddd;
                        color: #666666;
                        width: 40px;
                        line-height: 22px;
                        text-align: center;
                        border-radius: 4px;
                        float: left;
                        cursor: pointer;
                      }
                      .new { 
                        width: 80px;
                        margin-right:10px;
                        float: right;
                      }
                      .write {
                        margin-left:20px;
                        float: right;
                      }
                      .d {
                        margin-left:3px;
                      }
                  }
                }
            }
        }
</style>
