<template>
  <!-- 促销-团购 -->
  <div class="classify">
     <div class="g_att">
        <h1 class="t_title">
          <span class="size16">团购列表</span>
          <div class="t_add fr" @click="tolink">添加客服</div>
          <i>（ 共 3 条记录 ）</i>
        </h1>
        <table width="100%" border="0" cellspacing="0" cellpadding="0"   class="Commodity-management">
            <tr>
                <td width="7%" align="right">活动名称：</td>
                <td width="22%"><input name="textfield" type="text" style="width:200px"></td>
                <td width="10%" align="right"> 审核状态： </td>
                <td width="23%">
                    <select name="select1" >
                        <option>审核中</option>
                    </select>
                </td>
                <td width="6%" align="right"> 活动状态： </td>
                <td width="20%">
                     <select name="select2" >
                        <option>未开始</option>
                    </select>
                </td>
                <td width="12%" align="left"><span class="search">搜索</span></td>
            </tr>
      </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list">
            <tr>
                <td align="center" bgcolor="#f9fafa"><input type="checkbox" name="checkbox"></td>
                <td bgcolor="#f9fafa" class="black bold">活动名称 </td>
                <td bgcolor="#f9fafa" class="black bold">活动图片</td>
                <td bgcolor="#f9fafa" class="black bold">活动有效期</td>
                <td bgcolor="#f9fafa" align="center" class="black bold">商品个数</td>
                <td bgcolor="#f9fafa" align="center" class="black bold">活动状态</td>
                <td bgcolor="#f9fafa" align="center" class="black bold">审核状态</td>
                <td bgcolor="#f9fafa" class="black bold">操作</td>
            </tr>
            <tr>
                <td bgcolor="#f9fafa" width="5%" align="center"><input type="checkbox" name="checkbox1"></td>
                <td bgcolor="#f9fafa" width="18%">礼遇端午，一见 "粽" 情</td>
                <td bgcolor="#f9fafa" width="16%"><img class="fl" src="../../../../assets/1.jpg" alt=""><span class="replace fl">更换</span></td>
                <td bgcolor="#f9fafa" width="14%"><p>2018-01-01 10:10:10</p>-<p>2018-01-01 10:10:11</p></td>
                <td bgcolor="#f9fafa" width="10%" align="center">1</td>
                <td bgcolor="#f9fafa" width="10%" align="center"><span class="activity_state">进行中</span></td>
                <td bgcolor="#f9fafa" width="12%" align="center"><span class="auditing_state">已审核</span></td>
                <td bgcolor="#f9fafa" width="20%" align="center"><span class="edit">删除</span><span class="edit">回复</span></td>
            </tr>
            <tr>
                <td align="center" bgcolor="#f9fafa"><input type="checkbox" name="checkbox2" id="checkbox2"></td>
                <td colspan="7" bgcolor="#f9fafa"><span class="delete">删除</span>
                <div class="paging">
                    <span class="go">GO</span>
                    <span style="margin-left:15px;"><input name="textfield" type="text" id="textfield" style="width:30px;"></span>
                    <div class="number">
                    <span></span>
                    <span class="page">1</span>
                    <span>></span>
                    </div>
                    <span style="margin:0 10px;">条</span>
                    <span><input name="textfield" type="text" id="textfield" size="10"></span>
                    <span>共1条记录，每页显示： </span>
                </div>    </td>
            </tr>
        </table>
      </div>
  </div>
</template>
<script>
export default {
    name:'groupbuy',
    data (){
      return {
      	params:{}
      }
    },
    created(){
    	
    },
    mounted(){
    	
    	this.getData();
    },
    methods:{
        tolink(){
            /*this.$router.push({
                name: 'addservicemanage',
                   params: {
                       status: 0
                   }
            }); */
        },
    	getData(){
	        // this.axios.post(API_URL+'/Group/groupList',qs.stringify({
	        // 	title:"",
	        // 	auditing_status:'',
	        // 	active_status:'' 
	        // })).then((res) => {
	        // 	console.log(res.data.data);
	        // 	this.$message.success(res.data.message);
	        // }).catch((err) => {
	        // 	this.$message.error(res.data.message);
	        // })
    	}
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
            .t_add {
                background: url(../../../../assets/plus2.jpg) no-repeat 35px #ff9f24;
                width: 135px;
                height: 32px;
                border: 1px solid #ff920b;
                border-radius: 4px;
                font-size: 12px;
                font-weight: normal;
                cursor: pointer;
                color: #FFF;
                line-height: 32px;
                text-indent: 50px;
            }
          span {
              float: left;
              color: #333;
            }
            i {
              color: #999;
            }
        }
    }
</style>
<style lang="less" scoped>
    .classify {
        width: 1042px;
        .g_att{
            .Commodity-management {
                background-color: #f6f6f6;
                border: 1px solid #dddddd;
                margin-top: 15px;
                line-height: 50px;
                tr {
                     td {
                         input {
                            border: 1px solid #ddd;
                            line-height: 29px;
                            height: 29px;
                            color: #999;
                            text-indent: 5px;
                        }
                        select {
                            width: 170px;
                            border: 1px solid #ddd;
                            line-height: 29px;
                            height: 29px;
                            color: #999;
                        }
                        .search {
                            width: 58px;
                            height: 32px;
                            line-height: 32px;
                            background-color: #f7bc0a;
                            color: #FFF;
                            text-align: center;
                            display: block;
                            border-radius: 6px;
                            cursor: pointer;
                        }
                     }
                }
            }
            .list {
                border-left: 1px solid #ddd;
                border-right: 1px solid #ddd;
                border-top: 1px solid #ddd;
                margin-top: 15px;
                tr {
                    td {
                        padding: 10px 0;
                        border-bottom: 1px solid #ddd;
                        .activity_state {
                            color:#f4bc0d;  
                        }
                        .auditing_state {
                            color:#5ab85a;
                        }
                        input, select, textarea, button {
                            outline: 0 none;
                            vertical-align: middle;
                            text-indent: 5px;
                        }
                        img {
                            width: 35px;
                            height: 35px;
                            border: 1px solid #ddd;
                        }
                        .replace {
                            text-align:center;
                            width:40px;
                            height:20px;
                            line-height:20px;
                            border-radius:4px;
                            margin:6px 0 0 10px;
                            background:#5bba5e;
                            color:#fff;
                            cursor: pointer;
                        }
                        .Basket {
                            color: #26a2f1;
                        }
                        .paging {
                            background:#fff;
                            line-height: 30px;
                            float: right;
                            width: 850px;
                            input {
                                border: 1px solid #dddddd;
                                height: 28px;
                            }
                            .number {
                                float: right;
                                
                                span {
                                    width: 30px;
                                    height: 28px;
                                    float: left;
                                    text-align: center;
                                    line-height: 30px;
                                    border: 1px solid #dddddd;
                                }
                                .page {
                                    width: 30px;
                                    height: 30px;
                                    line-height: 30px;
                                    background-color: #f7bc0a;
                                    text-align: center;
                                    color: #FFF;
                                    border:none;
                                    border-right: 1px solid #eeb407;
                                    cursor: pointer;
                                }
                            }
                            .go {
                                width: 37px;
                                border: 1px solid #dddddd;
                                height: 28px;
                                border-radius: 6px;
                                background-color: #f7f7f7;
                                display: block;
                                float: right;
                                text-align: center;
                                margin: 0 15px;
                                cursor: pointer;
                            }
                            span {
                                float: right;
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
                            margin-right: 15px;
                            cursor: pointer;
                        }

                    }
                }
                .delete {
                    background-color: #e9573e;
                    color: #fff;
                    width: 56px;
                    line-height: 30px;
                    text-align: center;
                    display: block;
                    border-radius: 4px;
                    float: left;
                    margin-right: 10px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
