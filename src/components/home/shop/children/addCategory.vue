<template>
    <!-- 添加经营类目-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">添加经营类目</span>
                <div class="t_add fr" @click="tolink">返回经营类目</div>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>选择三级分类时，必须选择二级和一级分类，否则不会添加</p>
                </div>
            </div>
            <h1 class="t_title">
                <span class="size16">经营类目列表</span>
                <i>（ 共 {{listData.length}} 条记录 ）</i>
            </h1>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="data-list">
                <tr>
                    <td align="center" width="5%">
                        <el-checkbox v-model="checkAll" @change="checkAllChange"></el-checkbox>
                    </td>
                    <td align="center" width="15%" class="black"> id </td>
                    <td align="left" class="black"> 分类名称 </td>
                    <td align="center" class="black"> 分类简介 </td>
                    <td align="center" width="20%" class="black"> 操作 </td>
                </tr>
                <tr v-for="(item,index) in listData" :key="index" v-show="item.show">
                    <td align="center">
                        <el-checkbox @change="checkAlone(index)" v-model="item.check"></el-checkbox>
                    </td>
                    <td align="center"> {{item.id}} </td>
                    <td align="left" :class="{'active':item.level === 0,'active1':item.level === 1,'active2':item.level === 2}">
                        <i @click="childrenShow(item.id,index)" v-if="item.level === 0" :class="{'el-icon-arrow-down':item.ico_class,'el-icon-arrow-up':!item.ico_class}"></i>{{item.class_name}}
                    </td>
                    <td align="center"> {{item.class_name}}</td>
                    <td align="center">
                        <el-button type="danger" size="mini">删除</el-button>
                    </td>
                </tr>
            </table>
            <div class="page">
                <el-button type="success" style="float:left; margin-left:50px;" @click="addData" size="mini">确认</el-button>
                <el-pagination style="float:right;" background layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="page_size" :total="page">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'memberGrade',
    data() {
        return {
            value: true,
            isIndeterminate: true,
            checkAll: false,
            listData: [],
            page: 0, //共多少页
            currentPage: 1, //当前页
            page_size: 10,//每页显示多少条数据
        }
    },
    created() {
        
        this.getData();
    },
    methods: {
        //全选
        checkAllChange() {
            this.checkAll = this.checkAll;
            for (let index = 0; index < this.listData.length; index++) {
                if (this.checkAll) {
                    this.$set(this.listData[index], 'check', true);
                } else {
                    this.$set(this.listData[index], 'check', false);
                }
            }
        },
        //单选
        checkAlone(index) {
            this.$set(this.listData[index], 'check', this.listData[index].check);
            // console.log(this.listData)
            let checkNum = [];
            for (let i = 0; i < this.listData.length; i++) {
                if (this.listData[i].check === true) {
                    checkNum.push(this.listData[i].check);
                }

            }
            console.log(checkNum)
        },
        //下级显示
        childrenShow(id, x) {
            this.$set(this.listData[x], 'ico_class', !this.listData[x].ico_class);
            for (let index = 0; index < this.listData.length; index++) {
                if (this.listData[index].fid === id) {
                    if (!this.listData[index].show) {
                        this.$set(this.listData[index], 'show', true);
                    } else {
                        this.$set(this.listData[index], 'show', false);
                    }
                    for (let i = 0; i < this.listData.length; i++) {
                        if (this.listData[i].fid === this.listData[index].id) {
                            if (!this.listData[i].show) {
                                this.$set(this.listData[i], 'show', true);
                            } else {
                                this.$set(this.listData[i], 'show', false);
                            }
                        }
                    }
                }
            }
        },
        //获取数据
        getData() {

            this.$HTTP(this.$httpConfig.getGoodsClassSelect + '/p/' + this.currentPage, {}, 'post').then((res) => {
                this.listData = res.data.data.data;
                for (let index = 0; index < this.listData.length; index++) {
                    this.$set(this.listData[index], 'check', false);
                    if (this.listData[index].level === 1 || this.listData[index].level === 2) {
                        this.$set(this.listData[index], 'show', false);
                    } else {
                        this.$set(this.listData[index], 'show', true);
                        this.$set(this.listData[index], 'ico_class', true);
                    }
                }
                console.log(this.listData);
                this.page_size = res.data.data.page_size;
                this.page = Number(res.data.data.page);
                // if (res.data.status == 1) {
                //     let data = res.data.data.data;
                //     for (let key in data) {
                //         this.listData.push(data[key])
                //     }
                //     this.page_size = res.data.data.page_size;
                //     this.page = Number(res.data.data.page);
                // }
            }).catch((err) => {
                console.log(err);
            })
        },
        /*页面跳转*/
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            this.getData();
        },
        //编辑
        edit(id) {
            this.$router.push({
                name: 'addGrade',
                params: {
                    id: id
                }
            })
        },
        //添加
        addData() {
            let classLevelOne = {};
            let classLevelTwo = {};
            let classLevelThree = {};
            let classDataBuild = [];
            for (let index = 0; index < this.listData.length; index++) {
                if (this.listData[index].level === 0) {
                    classLevelOne[this.listData[index].id] = {
                        id: this.listData[index].id,
                        p_id: this.listData[index].fid
                    };
                } else if (this.listData[index].level === 1) {
                    classLevelTwo[this.listData[index].id] = {
                        id: this.listData[index].id,
                        p_id: this.listData[index].fid
                    };
                } else if (this.listData[index].level === 2 && this.listData[index].check === true) {
                    classLevelThree[this.listData[index].id] = {
                        id: this.listData[index].id,
                        p_id: this.listData[index].fid
                    };
                }
            }
            let index = 0;
            for (const key in classLevelThree) {
                console.log(classLevelThree[key])
                if (classLevelTwo.hasOwnProperty(classLevelThree[key].p_id)) {
                    if (classLevelOne.hasOwnProperty(classLevelTwo[classLevelThree[key].p_id].p_id)) {
                        classDataBuild[index] = [];
                        classDataBuild[index] = {
                            class_one: classLevelTwo[classLevelThree[key].p_id].p_id,
                            class_two: classLevelThree[key].p_id,
                            class_three: key
                        };
                        index++;
                    }
                }
            }
            if (classDataBuild.length == 0) {
                this.$message({
                    message: '请选择经营分类',
                    type: 'error',
                    duration: 1500
                });
                return;
            }
            this.$HTTP(this.$httpConfig.addStoreBindClass, { goods_class: classDataBuild }, 'post').then((res) => {
                this.$message({
                    message: res.data.message,
                    type: 'success',
                    duration: 1500
                });
                setTimeout(() => {
                    this.$router.push('operateCategory');
                }, 1500)
            }).catch((err) => {
                console.log(err)
            })
        },
        tolink() {
            this.$router.push('operateCategory');
        },
    }

}
</script>
<style lang="less">
body {
  overflow: inherit;
}
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
    i {
      color: #999;
    }
    .t_add {
      background: url(../../../../assets/plus2.jpg) no-repeat 15px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 35px;
    }
  }
}
</style>
<style lang="less" scoped>
.classify {
  width: 1000px;
  padding-bottom: 80px;
  .g_att {
    .page {
      overflow: hidden;
      padding-top: 20px;
    }
  }
  .data-list {
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-top: 1px solid #ddd;
    margin-top: 15px;
    tr {
      td {
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
        color: #333;
        i {
          margin-right: 10px;
          cursor: pointer;
        }
      }
      td.active {
        padding-left: 0;
      }
      td.active1 {
        padding-left: 50px;
      }
      td.active2 {
        padding-left: 100px;
      }
      td.black {
        color: #909399;
        font-weight: 500;
      }
    }
    tr.active {
      display: none;
    }
  }
}
</style>
