<template>
  <div class="Evaluate">
    <h1 class="title">评价管理 - 评价列表</h1>
    <div class="order_seek">
        <div  class="seek_l">
            <div>关键字：<input type="text" placeholder="买家账号/买家姓名" class="name"></div>
        </div>
        <div class="seek_l">
            <div>评论内容：<input type="text" placeholder="评论内容："></div>   
        </div>
        <div  class="seek_l">发货单状态：
            <select>
                <option>已回复</option>
                <option>已回复 </option>
                <option>已回复 </option>
            </select>
        </div>
        <span class="search">搜索</span>
    </div>
    <div class="order_minute">
        <div class="col">
            <div class="minute_g"><input type="checkbox" class="all" name="all"></div>
            <div class="black">商品</div>
            <div class="black">评价</div>
            <div class="black">评价人</div>
            <div class="black">交易操作</div>
        </div>  
    </div>
    <div class="order_minute">
        <div class="col">
            <div><input type="checkbox" class="all" name=""></div>  
            <span class="hm">
                <span class="size">订单号: 1426219928216544</span>
                <span class="size">成交时间: 2015-12-10 16:16:54</span>
            </span>
        </div>
        <div class="shop">
            <div class="shop_name">
                <img src="../../assets/1.jpg" alt="" class="shop_img">
                <span class="name">
                    <span>藏式小金刚108佛珠</span>
                    <span>9×7mm</span>
                </span>
            </div>
            <div class="fl num">东西很好，没有瑕疵，下次还会再来。东西很好，没有瑕疵，
                下次还会再来。东西很好，没有瑕疵，下次还会再来。东西很好，没有瑕疵，
                下次还会再来。东西很好，没有瑕疵，下次还会再来。东西很好，没有瑕疵，
                下次还会再来。
            </div>
             <div class="fl ping">评价人</div>
            <div class="fl danj"><span>删除</span> <span>回复</span></div>
        </div>
    </div>
    <div class="Paging">
        <div class="Paging_checkbox"><input type="checkbox" class="" name=""></div>
        <div class="fl pil">删除</div>
        <div class="fl pil">回复</div>
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
</template>
<script>
export default {
  name:'Evaluate'
}
</script>
<style lang="less" scoped>
    .Evaluate{
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
        }       
        .order_seek{
            background-color: #f6f6f6;
            border: 1px solid #dddddd;
            margin-top: 15px;
            height: 50px;
            line-height: 50px;
            .seek_l{
                overflow: hidden;
                float: left;
                margin-left: 20px;
                input{
                    width: 250px;
                    border: 1px solid #ddd;
                    line-height: 30px;
                    height: 30px;
                    color: #999;
                    text-indent: 15px;
                }
                .name{
                    width: 150px;
                }
                select{
                        width: 140px;
                        border: 1px solid #ddd;
                        line-height: 30px;
                        height: 30px;
                        color: #999;
                }
            }
            .search{
                width: 58px;
                height: 32px;
                line-height: 32px;
                background-color: #f7bc0a;
                color: #FFF;
                text-align: center;
                display: block;
                border-radius: 6px;
                cursor: pointer;
                float: left;
                margin-left: 20px;
                margin-top: 10px;
            }
        }
        .order_minute{
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
            border-top: 1px solid #ddd;
            margin-top: 15px;
            width: 100%;
            overflow: hidden;
            .m_t{
                margin-top: 25px;
                width: 100%;
            }
            .col{
                border: none;
                width: 100%;   
                background-color: #f9fafa;
                overflow: hidden;
                border-bottom: 1px solid #ddd;
                .black{
                    color: #333;
                    font-size: 12px;
                    text-align: center;
                    font-weight: 600;
                    float: left;
                }
                .hm{
                    line-height: 40px;
                }   
            }
            .col div{
                height: 40px;
                line-height: 40px;
            }
            .col div:nth-child(1){
                width: 5%;
                float: left;
            }
            .col div:nth-child(2){
                width: 30%;
                float: left;
            }
            .col div:nth-child(3){
                width: 35%;
                float: left;
            }
            .col div:nth-child(4){
                width: 10%;
                float: left;
            }
            .col div:nth-child(5){
                width: 20%;
                float: left;
            }
            .all{
                outline: 0 none;
                // vertical-align: middle;
                text-indent: 5px;
                border: none;
                display: block;
                margin: auto;
                margin-top: 14px;
            }
            .shop{
                width: 100%;
                overflow: hidden;
                background-color: #FFF;
                height: 88px;
                border-bottom: 1px solid #ddd;
                .shop_img{
                    width: 58px;
                    height: 58px;
                    border: 1px solid #ddd;
                    float: left;
                    margin-top: 12px;
                }
                .shop_name{
                    width: 30%;
                    float: left;
                    margin-left: 5%;
                    .name{
                        display: block;
                        float: left;
                        margin-left: 30px;
                        margin-top: 15px;
                        span{
                            display:block;
                            width: 200px;
                            overflow: hidden;
                            height: 25px;
                        }
                    }
                }
                .ping{
                    width: 10%;
                    line-height: 88px;
                    text-align: center;
                }
                .danj{
                    width: 20%;
                    line-height: 88px;
                    text-align: center;
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
                        margin-top: 30px;
                        cursor: pointer;     
                    }
                    span:nth-child(1){
                        margin-left: 60px;
                    }
                }
                .num{
                    width: 35%;
                    text-align: center;
                    line-height: 25px;
                    margin-top: 10px;
                    overflow: hidden;
                    height: 78px;
                }
                .caozu{
                    width: 15%;
                    line-height: 88px;
                    text-align: center;
                }
            }
        }
        .Paging{
            width: 100%;
            height: 50px;
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            .Paging_checkbox{
                width: 5%;
                float: left;
                height: 50px;
                input{
                    display: block;
                    margin: auto;
                    margin-top: 20px;
                }
            }
            .pil{
                border: 1px solid #e9573e;
                color: #fff;
                width: 60px;
                line-height: 22px;
                text-align: center;
                display: block;
                border-radius: 4px;
                background-color: #e9573e;
                float: left;
                margin-top: 13px;
                margin-right: 10px;
                cursor: pointer;
            }
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
</style>
