<template>
    <p class="time">{{time}}</p>
</template>
<script>
export default {
    name:'timeParse',
    data (){
      return {
         time : '',
      }
    },
    mounted(){
       this.time = this.format(this.timePlunge* 1000);
    },

    methods: {
        add0(m){return m<10?'0'+m:m },

        format(shijianchuo)
        {
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
        },
    },
    
    props: {
        timePlunge :''
    }       
}
</script>
<style lang="less" scoped>
    p {
        word-wrap:break-word;
    }
</style>

