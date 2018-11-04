<template>
  <!-- 商品店铺分类 -->
  <div class="classify">
      <div class="t_tab">
        <h1 class="t_title">
          <span class="size16">店铺商品分类 - 添加</span>
          <div class="t_m fr" @click="to">返回商品分类列表</div>
        </h1>
        <div class="z_info">
            <div class="goods_name">
                <span><b class="red">*</b>  分类名称： </span>
                <input type="text" class="text_name ss" maxlength="60">
                <p class="cue">1 ~ 30个字符，支持中, 英文, 数字及符号</p>
            </div>
            <div class="goods_name">
                <span>&nbsp;&nbsp;上级分类： </span>
                <input type="text" class="text_name ss" maxlength="60">
                <p class="cue">如果不选择上级分类， 则新增的分类为顶级分类</p>
            </div>
            <div class="goods_name">
                <span>&nbsp;&nbsp;是否显示： </span>
                <el-switch
                  v-model="value"
                  active-text="是"
                  @change="changeSwitch1()"
                  active-color="#f7bc0a">
                </el-switch>
                <p class="cue">控制前台店铺首页， 店铺商品分类是否展示</p>
            </div>
            <div class="goods_name">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;排序： </span>
                <input type="text" class="text_name ss" maxlength="60">
                <p class="cue">数字范围为0~255， 数字越小越靠前</p>
            </div>
        </div>
      <div class="button">
          <span>确认提交</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'classify',
    data (){
      return {
        data1:'',
        a:false,
        b:true,
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
          this.$router.back();
      },
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
        console.log(this.$route.params.status)
    }
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
            i {
              color: #999;
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
