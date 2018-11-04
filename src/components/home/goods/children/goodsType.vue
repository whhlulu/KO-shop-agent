<template>
<!-- 商品类型 -->
  <div class="type fl">
    <div class="t_tab">
      <h1 class="t_title">
        <span class="size16">商品类型列表</span>
        <div @click="to" class="t_add fr">添加商品规格</div>
      </h1>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" class="specification" >
          <tr>
            <td align="center" bgcolor="#f9fafa" class="bold black">ID </td>
            <td bgcolor="#f9fafa" class="bold black">商品类型 </td>
            <td bgcolor="#f9fafa" class="bold black">创建时间</td>
            <td bgcolor="#f9fafa" class="bold black">操作</td>
            <td bgcolor="#f9fafa" class="bold black">&nbsp;</td>
          </tr>
          <tr v-for="(item,index) in data" :key="index">
            <td width="139" align="center">20</td>
            <td>{{item.title}}</td>
            <td width="263"> 2017-11-27</td>
            <td width="53"><span class="edit" @click="to">编辑</span></td>
            <td width="71"><span href="#" class="edit">删除</span></td>
          </tr>
      </table>
      <div class="button">
          <span>确认提交</span>
      </div>
    </div>
  </div>
  
</template>
<script>
export default {
  name:'type',
  data () {
    return {
        data:[{id:205,title:'飞机'},
        {id:205,title:'大炮'},
        {id:205,title:'坦克'},
        {id:205,title:'飞毛腿导弹'},
        {id:205,title:'原子弹'}],
    }
  },
    methods:{
        to(){
           this.$router.push({
                name: 'addGoodsType',
                // params: {
                //     status: 0
                // }
            });  
        },
    },
}
</script>
<style lang="less">
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
                  text-indent: 30px;
              }
          }
    }
</style>

<style lang="less" scoped>
    .type {
        width: 1042px;
        .bold {
            font-weight: bold;
        }
        .black {
            color: #333;
        }
        .t_tab {
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
                .edit {
                    border: 1px solid #dddddd;
                    color: #666666;
                    width: 40px;
                    line-height: 22px;
                    text-align: center;
                    display: block;
                    border-radius: 4px;
                    float: left;
                    margin-right: 15px;
                    cursor: pointer;
                }
              }
            }
            .button {
                height: 32px;
                margin: 20px 0;
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
        }
</style>
