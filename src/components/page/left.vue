<template>
    <div class="left">
        <ul class="nav">
            <li v-for="(item,index) in list" :key="item.id">
                <a target="iframe" name="iframe" class="chart" :class="{hover:status[index]}" 
                 :href="'#/'+item.url+'/a/'+ (new Date()).getTime()"
                @click="tab(item.url+'?a='+ (new Date()).getTime(),index, this)">{{item.title}}</a>
                <!-- <ul class="children" :class="{show:status[index]}">
                    <li v-for="(data,i) in item.children" :key = i>
                        <a name="iframe" target="iframe" :class="{color:state[i]}" @click="to(data.src,i)">{{data.list_name}}</a>
                    </li>
                </ul> -->
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'left',
    data (){
      return {
          loading:true,
          status :[true],
          state:[true],
      }
    },
    methods:{
        tab(link,index, obj){
            for(var i = 0; i < this.status.length; i++){
                this.$set(this.status,i,false);
            }
            this.$set(this.status,index,true);
            this.$store.state.link = link;
        },
        to(link,index){
            for(var i = 0; i < this.state.length; i++){
                this.$set(this.state,i,false);
            }
            console.log(this.$store.state.link);
            this.$set(this.state,index,true);
            this.$store.state.link = link+'/a/'+ (new Date()).getTime();
        }
    },
    props: {
        list:''
    }
    
            
}
</script>
<style lang="less" scoped>
          .left{
            width: 190px;
            line-height: 34px;
            margin-top: 26px;
            float: left;
            .nav {
                border: none;
                li {
                    margin: 0;
                    float: none;
                    .chart {
                        cursor: pointer;
                        text-indent: 40px;
                        font-size: 13px;
                        height: 34px;
                        margin: 0;
                        line-height: inherit;
                        border: none;
                        border-radius:0;
                        padding: 0;
                        display: block;
                        color: #666666;
                        background: url(../../assets/lm-bj1.png);
                        transition: color .0s ease;
                    }
                    
                    .chart.hover{
                        background: url(../../assets/lm-bj2.png) no-repeat;
                        text-indent: 40px;
                        height: 34px;
                        display: block;
                        color: #FFF;
                    }
                    .chart:hover {
                        background: url(../../assets/lm-bj2.png) no-repeat;
                        text-indent: 40px;
                        height: 34px;
                        display: block;
                        color: #FFF;
                        transition: color 0s ease;
                    }
                    .children {
                        transition: all 2s ease;
                        display: none;
                        li {
                            span {
                                display: block;
                                text-align: left;
                                font-size: 13px;
                                color: #a4a4a4;
                                padding-left:40px;
                                line-height: 35px;
                                height: 35px;
                                cursor: pointer;
                            }
                            span:hover {
                                color: #f7bc0a;
                                transition: color 0s ease;
                            }
                            span.color{
                                color: #f7bc0a;
                            }
                        }
                    }
                    .children.show {
                        display: block;
                        transition: all 2s ease;
                    }
                }
            }
        }
</style>