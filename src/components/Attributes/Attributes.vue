<template>
  <div class="Attributes">
    <h1 class="title"><span class="fl">商品属性</span> <span class="add">添加商品属性</span></h1>
    <div class="hunt">
        <span>电视 ：</span>
        <select>
            <option>已回复</option>
            <option>已回复 </option>
            <option>已回复 </option>
        </select>
        <i>搜索</i>
    </div>
    <div class="table">
      <div class="fl"><input type="text"></div>
      <div class="fl">ID</div>
      <div class="fl">ID</div>
      <div class="fl">ID</div>
      <div class="fl">ID</div>
      <div class="fl">ID</div>
      <div class="fl">ID</div>
      <div class="fl">ID</div>
      <div class="fl">ID</div>
    </div>
    <div class="List">
        <span>商品类型名称：</span> <input type="text">
    </div>
    <div class="Agree">
        <span>是否显示：</span> <input type="radio">是 <input type="radio">否
    </div>
    <div class="affirm">确认提交</div>
  </div>
</template>
<script>
export default {
  name:'Attributes'
}
</script>
<style lang="less" scoped>
    .Attributes{
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
        .hunt{
            width: 100%;
            margin-bottom: 20px;
            background-color: #f6f6f6;
            border: 1px solid #dddddd;
            margin-top: 15px;
            height: 50px;
            span{
              display: block;
              float: left;
              line-height: 50px;
              margin-left: 50px;  
            }
            select{
                width: 140px;
                border: 1px solid #ddd;
                line-height: 29px;
                height: 29px;
                color: #999;
                display: block;
                margin-top: 10px;
                float: left;
            }
            i{
                display: block;
                float: left;
                margin-left: 20px;
                width: 58px;
                height: 32px;
                line-height: 32px;
                background-color: #f7bc0a;
                color: #FFF;
                text-align: center;
                display: block;
                border-radius: 6px;
                margin-top: 9px;
                cursor: pointer;
            }
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
            line-height: 45px;
            color: #333;
            text-align: center;
            font-weight: 600;
            font-size: 12px;
          }
        }
        .List{
          border: 1px solid #dddddd;
          border-top: none;
          width: 100%;
          height: 65px; 
          line-height: 65px;
          span{
                margin-left: 45px;
             }
          input{
                width: 288px;
                height: 32px;
                border: 1px solid #cccccc;
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
        .Agree{
            border: 1px solid #dddddd;
            border-top: none;
            width: 100%;
            height: 45px;
            line-height: 45px;
            span{
                margin-left: 45px;
            }
            input{
                margin-left: 10px;
                margin-right: 5px;
            }
        }
    }
</style>
