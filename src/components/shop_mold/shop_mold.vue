<template>
  <div class="mold">
    <h1 class="title"><span class="fl">商品类型列表</span> <span class="add">添加商品规格</span></h1>
    <div class="table">
      <div class="fl">ID</div>
      <div class="fl">商品类型</div>
      <div class="fl">创建时间</div>
      <div class="fl operation">操作</div>
    </div>
    <div class="List">
      <div class="fl">20</div>
      <div class="fl">电视</div>
      <div class="fl">2017/12/20</div>
      <div class="fl operation">
        <span>编辑</span><span>删除</span>
      </div>
    </div>
    <div class="affirm">确认提交</div>
  </div>
</template>
<script>
export default {
  name:'mold'
}
</script>
<style lang="less" scoped>
    .mold{
        width: 1042px;
        border-left: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
        padding: 16px;
        background-color: #FFF;
        min-height: 500px;
        overflow: hidden;
        .fl{
            float: left;
        }
        .title{
            width: 100%;
            line-height: 50px;
            color: #333;
            font-size: 16px;
            border-bottom: 1px solid #dddddd;
            overflow: hidden;
            margin-bottom: 22px;
            .add{
              background: url(../../assets/plus2.jpg) no-repeat 10px #ff9f24;
              width: 135px;
              height: 32px;
              border: 1px solid #ff920b;
              border-radius: 4px;
              float: right;
              font-size: 12px;
              font-weight: normal;
              color: #FFF;
              line-height: 32px;
              text-indent: 30px;
              cursor: pointer;
            }
        }
        .table{
          border: 1px solid #dddddd;
          background-color: #f9fafa;
          width: 100%;
          height: 45px;
          div{
            width: 25%;
            line-height: 45px;
            color: #333;
            text-align: center;
            font-weight: 600;
            font-size: 16px;
          }
          .operation{
            width: 25%;
          }
        }
        .List{
          border: 1px solid #dddddd;
          border-top: none;
          width: 100%;
          height: 45px;
          div{
            width: 25%;
            line-height: 45px;
            color: rgb(164, 165, 167);
            text-align: center;
            font-size: 12px;
            img{
              margin-top: 16px;
            }
          }
          .operation{
            width: 25%;
            span{
                border: 1px solid #dddddd;
                color: #666666;
                width: 40px;
                line-height: 22px;
                text-align: center;
                display: block;
                border-radius: 4px;
                float: left;
                margin-right: 15px;
                margin-top: 10px;
                cursor: pointer;
            }
            span:nth-child(1){
              margin-left: 85px;
            }
          }  
        }
        .affirm{
            background: #f7bc0a;
            width: 199px;
            height: 32px;
            line-height: 32px;
            color: #FFF;
            text-align: center;
            display: block;
            border-radius: 10px;
            margin-top: 20px;
            float: left;
            margin-right: 20px;
            cursor: pointer;
        }       
    }
</style>
