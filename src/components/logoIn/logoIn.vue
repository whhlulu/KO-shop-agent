<template>
	<div class="z_logoin">
		<div v-title data-title="登录">登录</div>
		<!-- 登录 -->
		<div class="login size14">
			<img :src="logo">
			<ul class="fl">
				<li>
					<span class="fl">账号</span>
					<input type="text" v-model="user_name" placeholder="请输入关键字">
				</li>
				<li>
					<span class="fl">密码</span>
					<input type="password" v-model="pass_word" placeholder="请输入密码">
				</li>
				<div class="forget-pw"><span class="btn-pw fr" @click="cipherLayer">忘记密码?</span></div>
				<div class="Login-button hand" @click="login">立即登录</div>
			</ul>
		</div>
		<!-- 修改密码弹出层 -->
		<el-dialog
			:close-on-click-modal="false"
			title="找回密码"
			:visible.sync="dialogVisible"
			:before-close="close"	
			width="400px"
			top="15%">
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<div class="pw-content">
					<el-form-item label="账号" prop="account_num">
						<el-input style="width:220px;" v-model="ruleForm2.account_num"></el-input>
					</el-form-item>
					<el-form-item label="手机号码" prop="phone_num">
						<el-input style="width:220px;" v-model.number="ruleForm2.phone_num"></el-input>
					</el-form-item>
					<el-form-item label="验证码" prop="check_code" 
					:rules="[
						{ required: true, message: '验证码不能为空'},
						{ type: 'number', message: '验证码必须为数字值'}
						]">
						<el-input style="width:105px;" v-model.number="ruleForm2.check_code"></el-input>
						<el-button type="info" :disabled="isActive" @click="submitForm1('ruleForm2')">{{btn_text}}</el-button>
					</el-form-item>
					<el-form-item label="新密码" prop="pass">
						<el-input type="password" style="width:220px;" v-model="ruleForm2.pass"></el-input>
					</el-form-item>
					<el-form-item label="再次输入" prop="checkPass">
						<el-input type="password" style="width:220px;" v-model="ruleForm2.checkPass"></el-input>
					</el-form-item>
				</div>
				<div style="padding-left:150px;">
					<el-button @click="close">取 消</el-button>
					<el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
				</div>
				</el-form>	
		</el-dialog>
		<!-- 底部 -->
		<div class="bottom2 text-center">Copyright 2003-2015Yisu.cn.ALL Rights Reserved.上海亿速网络科技有限公司 版权所有 沪ICP备14011490号-3</div>
	</div>
</template>
<script>
import tradeManageVue from '../home/trade/children/tradeManage.vue';
	export default {
		name: 'logoIn',
		data() {
			var validateAccountNum = (rule, value, callback) => {
					if (value === '') {
						callback(new Error('请输入账号'));
					} else {
						//验证账号是否存在
						this.$HTTP(this.$httpConfig.checUser,{seller_name: this.ruleForm2.account_num}).then((res) => {
							callback();
							this.isUser = true;
							this.token = res.data.data;
							this.isPassAccount = true;
						}).catch((err) => {
							callback(new Error('该用户不存在'));
							this.isUser = false;
							this.token = '';
							this.isPassAccount = false;
						});
					}
			};
			var checkPhone = (rule, value, callback) => {
				if (!value) {
					callback(new Error('手机号不能为空'));
				} else {
					const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
					if (reg.test(value)) {
						callback();
					} else {
						callback(new Error('请输入正确的手机号'));
					}
				}
			};
			var validatePass = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请输入密码'));
				} else if(value.length<6) {
					callback(new Error('新密码必须大于6位'));
				} else {
					callback();
				}
			};
			 var validatePass2 = (rule, value, callback) => {
				if (!value) {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				}else if(value.length<6) {
					callback(new Error('新密码必须大于6位'));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					account_num:'',
					phone_num:'',
					check_code:'',
					pass: '',
					checkPass: '',
					isPassAccount : false,
				},
				rules2: {
					account_num: [
						{ required: true, validator: validateAccountNum,  trigger: 'blur' },
					],
					phone_num: [
						{ required: true, validator: checkPhone,  trigger: 'blur' },
					],
					pass: [
						{ required: true, validator: validatePass, trigger: 'blur' },
					],
					checkPass: [
						{ required: true, validator: validatePass2, trigger: 'blur' }
					]
				},
				logo: require('@/assets/logo2.png'),
				user_name: '',
				pass_word: '',
				dialogVisible:false,
				input1:'',
				input2:'',
				input3:'',
				input4:'',
				input5:'',
				btn_text:'获取验证码',
				isActive:false,
				isUser:'',
				token:''
			}
		},
		created(){
			var that = this;
			document.onkeydown = function(e) {
				var keyNum = window.event ? e.keyCode : e.which;
				if(keyNum == 13) {
					that.login();
				}
			};
		},
		mounted() {
			this.setHeight();
		},
		methods: {
			//获取验证码时的验证
			submitForm1() {
				
				if (!this.isPassAccount) {
					
					this.$message({
							message: '账号不存在',
							type: 'error'
						});
					return;
				}
				//验证用户是否存在
				this.$refs.ruleForm2.validateField('phone_num',(validMessage)=>{
					//再验证手机号码
					if(validMessage == ''){
						this.obtain();
					}else{
						return false;
					}
				});
			},
			//获取验证码
			obtain(){
				let N = 60;
				let clear = null;
				if(this.isActive == true){return false;}
				this.isActive = true;
				this.$HTTP(this.$httpConfig.SendMsg,{mobile:this.ruleForm2.phone_num}).then((res) => {
					clear = setInterval(()=>{
						this.btn_text = '请'+ N-- +'秒后重试';
						if(N < 0){
							clearInterval(clear);
							this.btn_text = '获取验证码';
							this.isActive = false;
						}
					},1000);
					this.$message({
						message: res.data.message,
						type: 'success'
					});
				}).catch((res)=>{
					this.$message({
						message: res.data.message,
						type: 'error'
					});
				})
				
			},
			//检查用户名是否存在
			cipherLayer(){
				this.dialogVisible = true;
			},
			close(){
				this.$refs.ruleForm2.resetFields(); //关闭时重置表单数据和验证 
				this.dialogVisible = false;
			},
			//提交
			submitForm(formName) {
				// this.$refs[formName].validate((valid) => {
				// if (valid) {
					
					this.$HTTP(this.$httpConfig.parseReqByPassword,{
						password: this.ruleForm2.pass,
						password_again:this.ruleForm2.checkPass,
						code:this.ruleForm2.check_code,
					}).then((res) => {
						this.$message({
							message: res.data.message,
							type: 'success'
						});
						this.close();
					}).catch((res) => {
						this.$message({
							message: res.data.message,
							type: 'error'
						});
					});
				// } else {
				// 	return false;
				// }
				// });
			},
			// 设置高铺满全屏
			setHeight(){
				document.querySelector('.z_logoin').style.height = window.outerHeight+'px';
			},
			// 登录
			login() {
				if(!/^[\u4e00-\u9fa5\s_a-zA-Z0-9]+$/.test(this.user_name)) {
					this.$layer.msg('用户名称异常');
					return false;
				}
				if(!this.pass_word || this.pass_word.length < 6) {
					this.$layer.msg('密码必须大于6位');
					return false;
				}
				
				this.$HTTP(this.$httpConfig.login,{
					seller_name: this.user_name,
					password: this.pass_word
				}).then((res) => {
					this.$layer.msg(res.data.message);
					sessionStorage.setItem('data_token', res.data.data.token);
					this.getApproval();
				}).catch((err) => {
				});
			},
			// 获取权限
			 getApproval() {
				let obj = this;
				this.$HTTP(this.$httpConfig.getApproval,{}).then(res => {
                    let menuMaster = res.data.data;
					let nav = [];
                    for( var i in menuMaster) {
                        if(typeof menuMaster[i].fid !== 'undefined' &&  menuMaster[i].fid == 0) {
                            nav.push({
                                'id': menuMaster[i].id,
                                'remark': menuMaster[i].remark,
								'path':  menuMaster[i].path,
                            });
                        }
					}
					//全部权限
					sessionStorage.setItem('allPrivilege', JSON.stringify(res.data.data));
					sessionStorage.setItem('topPrivilege', JSON.stringify(nav));
				   	obj.$router.initLocalRouters();
					obj.$router.push('home');
                }).catch(err =>{
					this.$message.error('没有权限，请联系管理员！');
                })
            }
		},
	}
</script>
<style>

</style>

<style lang="less" scoped>
	.z_logoin {
		// width: 100%;
		// height: 100%;
		background: url(../../assets/d-bj.jpg) no-repeat;
		background-attachment:fixed;
		filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../../assets/d-bj.jpg', sizingMethod='scale');
		-ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../../assets/d-bj.jpg', sizingMethod='scale');
		background-size: cover;
		-moz-background-size: cover;
		-webkit-background-size: cover;
		color: #a4a5a7;
		// background-size: 100% 100%;
		.login {
			width: 750px;
			padding-top: 320px;
			margin: 0 auto 320px auto;
			overflow: hidden;
			img {
				width: 235px;
				height: 99px;
				background: url(../../assets/s.png) no-repeat right;
				padding-right: 30px;
				margin-right: 30px;
				float: left;
			}
			ul {
				width: 407px;
				li {
					width: 280px;
					padding: 0 10px;
					height: 38px;
					line-height: 38px;
					display: block;
					background-color: rgba(0, 0, 0, 0.2);
					/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
					border-radius: 6px;
					color: #FFF;
					margin-bottom: 10px;
					span {
						background: url(../../assets/ss.jpg) no-repeat right;
						padding-right: 15px;
						margin: 0 15px;
					}
					input {
						background: none;
						border: none;
						color: #FFF;
						height: 38px;
						line-height: 38px;
						float: left;
					}
					input::-webkit-input-placeholder,
					textarea::-webkit-input-placeholder {
						color: #fff;
					}
					input:-moz-placeholder,
					textarea:-moz-placeholder {
						color: #fff;
					}
					input::-moz-placeholder,
					textarea::-moz-placeholder {
						color: #fff;
					}
					input:-ms-input-placeholder,
					textarea:-ms-input-placeholder {
						color: #fff;
					}
				}
				.forget-pw{
					width: 280px;
					padding: 0 10px;
					text-align: right;
					color: #fff;
					overflow: hidden;
					.btn-pw{
						cursor: pointer;
					}
				}
				.Login-button {
					width: 300px;
					height: 38px;
					line-height: 38px;
					background-color: #e97c05;
					color: #FFF;
					text-align: center;
					border-radius: 6px;
					margin-top: 10px;
				}
			}
		}
		.bottom2 {
			color: #FFF;
			padding-top: 2.5px;
		}
		.pw-content{
			padding: 0 15px;
			.item-input-wrap{
				margin-bottom: 15px;
				.item-input-tit{
					display: inline-block;
					width: 70px;
				}
			}
			.el-button{
				font-size: 12px;
			}
			.el-button--info:hover {
				background: #a6a9ad!important;
				border-color: #a6a9ad!important;
				color: #fff!important;
			}
			.el-button--info.is-disabled:hover{
				background-color: #c8c9cc!important;
    			border-color: #c8c9cc!important;
			}
		}
	}
</style>
<style>
	.el-form-item__label{
		width: 80px!important;
	}
	.el-form-item__content{
		margin-left:80px!important;
	}
</style>
