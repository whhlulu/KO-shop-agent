<template>
  <div class="logistics fl">
    <!-- 账号 - 添加管理员-->
    <div class="t_tab">
        <h1 class="t_title">
            <span v-if="$route.params.id === 'add'" class="size16">账号管理 - 添加管理员</span>
            <span v-else class="size16">账号管理 - 编辑管理员</span>
            <div class="t_m fr" @click="to">返回管理员列表</div>
        </h1>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="logistics_x" >
            <tr>
                <td align="right" class="black"><b>*</b>登录名： </td>
                <td>
                    <el-input 
                        v-model="list.seller_name" 
                        clearable 
                        style="width: 250px;height: 40px;" 
                        >
                    </el-input>
                </td>
            </tr>
            <tr>
                <td align="right" class="black"><b>*</b>密码： </td>
                <td>
                    <el-input 
                    type="password"
                        v-model="list.pass_word" 
                        clearable 
                        style="width: 250px;height: 40px;" 
                        >
                    </el-input>
                </td>
            </tr>
            <tr>
                <td align="right" class="black"><b>*</b>手机号码： </td>
                <td>
                    <el-input 
                        v-model="list.mobile" 
                        :maxlength=11
                        clearable 
                        style="width: 250px;height: 40px;" 
                        >
                    </el-input>
                </td>
            </tr>
            <tr>
                <td align="right" class="black"><b>*</b>角色： </td>
                <td>
										<el-select v-model="list.group_id" filterable placeholder="请选择">
											<el-option v-for="item in classData" :key="item.id" :label="item.title" :value="item.id">
											</el-option>
										</el-select>
                </td>
            </tr>
            <tr>
                <td align="right" class="black"><b>*</b>E-mail： </td>
                <td>
                    <el-input 
                        v-model="list.email" 
                        clearable 
                        style="width: 250px;height: 40px;" 
                        >
                    </el-input>
                </td>
            </tr>
            <tr>
                <td align="right" class="black">是否启用：</td>
                <td>
                    <el-switch
                        v-model="list.status"
                        active-color="#f7bc0a">
                    </el-switch>
                    <span class="notes">在禁用状态下，管理员不可登录卖家中心</span>                   
                </td>               
            </tr>
            <tr>
                <td align="right">&nbsp;</td>
                <td colspan="2"><span @click="submit" class="Settled" style="background:#f7bc0a; width:199px;">确认提交</span></td>
            </tr>
        </table>
    </div>
  </div>
</template>
<script>
export default {
  name:'addadmin',
  data () {
    return {
        list:{
            email:'',
            mobile:'',
            seller_name:'',
            status:false,
            group_id:'请选择'
        },
        classData:[]
    }
  },
  created(){
			
			this.getClass();
      //是编辑的条件下
      if(this.$route.params.id != 'add'){
          //获取单条数据
          
          this.$HTTP(this.$httpConfig.getAccountDetail,{id : this.$route.params.id}).then((res) => {
                res.data.data.status = false;
                this.list = res.data.data;
                    this.$message({
                    duration:1000,
                    type:'success',
                    message: res.data.message
                });
            }).catch((res) =>{
                res.data.data.status = true;
                this.$message({
                    duration:1000,
                    type:'error',
                    message: res.data.message
                });
                return false;
            });
      }
     
  },
    methods:{
			getClass() {
                //获取仓库
                this.$HTTP(this.$httpConfig.getRoleList,{}).then((res) => {
					if(!res.data.data) {
						this.$layer.msg('暂无数据:(');
						return;
					}
					this.classData = res.data.data.list;
				}).catch((err) => {
					console.log(err)
				});
			},
        //添加/编辑
        addAccount(status){
            let url = null;
            let data = null;
            if(this.$route.params.id === 'add'){
                url = this.$httpConfig.addAccount;
                data = {
                    seller_name : this.list.seller_name,
                    password : this.list.pass_word,
                    email : this.list.email,
                    mobile : this.list.mobile,
                    status : status,
                    group_id : this.list.group_id,
                }
            }else{
                url = this.$httpConfig.saveAccount;
                data = {
                    id : this.$route.params.id,
                    seller_name : this.list.seller_name,
                    password : this.list.pass_word,
                    email : this.list.email,
                    mobile : this.list.mobile,
                    status : status,
                    group_id : this.list.group_id,
                }
            }
            this.$HTTP(url,data).then((res) => {
                     this.$message({
                        duration:1000,
                        type:'success',
                        message: res.data.message
                    });  
                   this.$router.push('/adminlist')
                }).catch((err) =>{
                });
        },
        //提交
        submit(){
            if(!/^[\u4e00-\u9fa5\s_a-zA-Z0-9]+$/.test(this.list.seller_name)) {
                    this.$message({
                        duration:1000,
                        type:'error',
                        message: '用户名称异常'
                    });
                    return false;
                }
                if (!this.list.pass_word || this.list.pass_word.length < 6) {
                    this.$message({
                        duration:1000,
                        type:'error',
                        message: '密码必须大于6位'
                    });
                    return false;
                }
                if (!(/^1[34578]\d{9}$/.test(this.list.mobile))) {
                    this.$message({
                        duration:1000,
                        type:'error',
                        message: '请输入正确的手机号码'
                    });
                    return false;
                }
                if (!( /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})$/.test(this.list.email))) {
                    this.$message({
                        duration:1000,
                        type:'error',
                        message: '邮箱格式错误'
                    });
                    return false;
                }
                let status = null;
                if(this.list.status === true){
                    status = 0 ; 
                }else{
                     status = 1 ; 
                }
                this.addAccount(status);
        },
       to(){
            this.$router.back(); 
        },
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
                    text-indent: 32px;
                }
          }
    }
    .el-switch {
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
            font-size: 12px;
        }
      }
</style>

<style lang="less" scoped>
    .logistics {
        width: 1000px;
        padding-bottom:80px;
        .Commodity-management {
                background-color: #f6f6f6;
                border: 1px solid #dddddd;
                margin-top: 15px;
                line-height: 50px;
                margin-bottom: 20px;
                input {
                    width: 140px;
                    border: 1px solid #ddd;
                    line-height: 29px;
                    height: 29px;
                    color: #999;
                    text-indent: 5px;
                }
            }
        .bold {
            font-weight: bold;
        }
        .black {
            color: #333;
        }
          .logistics_x {
              tr {
                  td {
                    padding: 10px 0;
                    .ss {
                        margin:0;
                    }
                    b{
                        color: #ff0000;
                    }
                    .notes {
                        padding-left:15px;
                    }
                    input,select {
                        padding-left: 5px;
                        width: 288px;
                        height: 32px;
                        border: 1px solid #cccccc;
                    }
                    textarea {
                        padding-left: 5px;
                        padding-top: 5px;
                        min-height: 50px;
                        border: 1px solid #cccccc;
                    }
                    .abstract {
                        min-height: 70px;
                    }
                    .Settled {
                        height: 32px;
                        line-height: 32px;
                        color: #FFF;
                        text-align: center;
                        display: block;
                        border-radius: 6px;
                        margin-top: 30px;
                        float: left;
                        margin-right: 20px;
                        cursor: pointer;
                    }
                  }
              }
          }
        }
</style>