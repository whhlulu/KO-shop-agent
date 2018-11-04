<template>
    <div class="header">
        <div class="top">
            <div class="logo left"><img src="../../assets/logo.png"></div>
            <div class="navigation fl size14">
                <span v-for="(item,index) in nav" :key="item.id" :class="{active:lcassif.status[index]}" @click="tab(index)">{{item.remark}}</span>
            </div>
            <div class="vice">
                <span @click="storeFun">
                    <P><img src="../../assets//shop.png"></P>
                    <p>店铺</p>
                </span>
                <span @click="messageFun">
                    <P><img src="../../assets//news.png"></P>
                    <p>消息</p>
                </span>
                <span @click="cacheFun">
                    <P><img src="../../assets//Clear.png"></P>
                    <p>清缓存</p>
                </span>
                <span @click="loginFun">
                    <P><img  src="../../assets//Head-portrait.png"></P>
                    <p>切换帐号</p>
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'top',
        data() {
            return {
               nav :[] ,
               lcassif:{
                    status:[false]
                },
            }
        },

        created(){

            let topMenu = sessionStorage.getItem('topPrivilege'); 
            console.log(topMenu)
            if (topMenu == null) {
                return;
            }
            this.nav = JSON.parse(topMenu);
            this.filterRouter();
        },
        methods: {
            storeFun(){
                this.$router.push('/shop');
            },
            messageFun(){
                this.$router.push('/service');
            },
            cacheFun(){
                this.$message.info('请稍等...');
                setTimeout(()=>{
                    location.reload();
                },2000);
            },
            loginFun(){
                this.$HTTP(this.$httpConfig.exitLogon,{}).then((res)=>{
                    sessionStorage.clear();
                    localStorage.clear();
                    this.$store.state.leftNav = [];
                    this.$message.success(res.data.message);
                    this.$router.push('/login');
                }).catch((err)=>{
                    this.$message.error(err);
                })
            },
            filterRouter(index){
                let leftNav = [];
                let filterData = [];
                let routerId = '';
                let allRouter = JSON.parse(sessionStorage.getItem('allPrivilege'));
                if(index){
                    routerId = this.nav[index].id
                }else{
                    for (let j = 0; j < this.nav.length; j++) {
                        if(this.$route.path == this.nav[j].path){
                            routerId = this.nav[j].id;
                            break;
                        }
                        
                    }
                }
                //取出一级导航所对应的左边栏路由
                for (let i in allRouter) {
                    if(routerId == allRouter[i].fid){
                        leftNav.push(allRouter[i]);
                    }
                }
                //重塑路由数据
                for (let index = 0; index < leftNav.length; index++) {
                        filterData.push({
                            'url': leftNav[index].name,
                            'title':leftNav[index].remark
                        })
                    
                }
                this.$store.state.leftNav = filterData;
                console.log(filterData);
            },
            tab(index){
                this.$store.state.leftNav = [];
                this.filterRouter(index);
                this.$router.push(this.nav[index].path);
                
            },
        },
        mounted() {
            for (let i= 0; i < this.nav.length; i ++) {
                if( this.nav[i] !== null &&  this.nav[i].path == this.$route.path) {
                    this.$set(this.lcassif.status,i,true);
                }
            }
        }
  
};
</script>
<style lang="less" scoped>
    .header {
        width: 100%;
        color: #a4a5a7;
        background: url(../../assets/bj.jpg) repeat-x #f6f6f6;
        line-height: 24px;
        .top {
            width:1266px; 
            margin:0 auto; 
            height:62px;
            .logo {
                float: left;
            }
            .navigation {
                span{
                    cursor: pointer;
                    float: left;
                    width: 60px;
                    text-align: center;
                    height: 62px;
                    line-height: 62px;
                    color: #FFF;
                    text-decoration: none;  
                }
                span.active{
                    background: url(../../assets/navigation.png) no-repeat;
                }
            }
            .navigation span:hover {
                background: url(../../assets/navigation.png) no-repeat;
            }
            .vice {
                float: right;
                width: 240px;
                cursor: pointer;
                span{
                    width: 60px;
                    text-align: center;
                    display: block;
                    float: left;
                    color: #FFF;
                    margin-top: 8px;
                    p {
                        img {
                            width: 25px;
                            height: 25px; 
                        }
                    }
                }
    }
  }
}
</style>