<template>
  <!-- 促销 - 分销-分销关系 -->
  <div class="classify fl">
     <div class="g_att">
        <h1 class="t_title">
          <span class="size16">分销关系</span>
        </h1>
        <div class="search clearfix">
            <input type="text" class="fl" placeholder="上级id">
            <span class="fl">搜索</span>
        </div>
        <div class="Relation_diagram">
            <div class="tree">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
    name:'fullCut',
    data (){
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods:{
    handleNodeClick(data) {
        console.log(data);
      }
        // tolink(){
        //     this.$router.push({
        //         name: 'distributorInfo',
        //         // params: {
        //         //     status: 0
        //         // }
        //     }); 
        // },
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
          span {
              float: left;
              color: #333;
            }
        }
    }
</style>
<style lang="less" scoped>
    .classify {
        width: 1000px;
        .g_att{
            .search {
                input {
                    border: 1px solid #ddd;
                    line-height: 27px;
                    height: 27px;
                    color: #999;
                    text-indent: 5px;
                }
                input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
                        color: #999; 
                    } 
                input:-moz-placeholder, textarea:-moz-placeholder { 
                    color: #999; 
                } 
                input::-moz-placeholder, textarea::-moz-placeholder { 
                    color: #999; 
                } 
                input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
                    color: #999; 
                } 
                span {
                    text-align:center;
                    background:#dadcdb;
                    width:40px;
                    line-height:29px;
                    cursor: pointer;
                    margin-left:5px;
                }
            }
            .Relation_diagram {
                border:1px solid #ddd;
                margin-top:25px;
                min-height:500px;
                .tree {
                    padding:10px;
                }
            }
        }
    }
</style>
