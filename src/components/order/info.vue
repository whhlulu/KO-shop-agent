<template>
  <div class="info">
    <h1 class="title">信息列表</h1>
  </div>
</template>
<script>
export default {
   name : 'info',
}
</script>
<style lang="less" scoped>
    .info{
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
    }
</style>
