<template>
    <!-- 广告 - 广告列表-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">广告列表</span>
                <div class="t_add fr" @click="tolink">添加广告</div>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>广告链接选择之后当用户点击图片后会直接跳转</p>
                </div>
            </div>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="list search">
                <tr>
                    <td width="8%" align="right">广告名称：</td>
                    <td bgcolor="#f9fafa" width="20%" class="black bold">
                        <el-input v-model="ads_name" clearable style="width: 180px;height: 40px;">
                        </el-input>
                    </td>
                    <td width="8%" align="right">广告位置：</td>
                    <td width="30%">
                        <el-select v-model="position_id" placeholder="请选择" style="width:280;">
                            <el-option v-for="item in positionList" :key="item.id" :label="item.ap_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </td>
                    <td bgcolor="#f9fafa" class="black bold" align="left">
                        <el-button @click="getAdsList" size="small" type="success">搜索</el-button>
                    </td>
                </tr>
            </table>
            <el-table ref="multipleTable" :data="adsList" tooltip-effect="dark" style="width: 100%">
                <el-table-column label="ID" prop="id">
                </el-table-column>
                <el-table-column prop="ap_name" label="广告位置" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="adv_title" label="广告名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="广告图片" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <img style="width:80px;height:50px;" :src=" URL+ scope.row.adv_content" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="ad_url" label="广告链接" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="是否显示" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.status" @click.native="setStatus(scope.row.status,scope.row.id)" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="slide_sort" label="排序" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button slot="reference" @click="edit(scope.row.id)" size="mini" icon="el-icon-edit"></el-button>
                        <el-button size="mini" icon="el-icon-delete" @click="clear(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <!-- <el-button type="danger" style="float:left; margin-left:50px;" @click="deleteAll" size="mini">删除</el-button> -->
                <el-pagination style="float:right;" background layout="total,prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="page_size" :total="page">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'advertisingList',
    data() {
        return {
            positionList: [],
            adsList: [],
            position_id: '',
            ads_name: '',
            listData: [],
            page: 0, //共多少页
            currentPage: 0, //当前页
            page_size: 0,//每页显示多少条数据
        }
    },
    created() {
        this.adsPosition();
        this.getAdsList();
    },
    methods: {
        //删除
        clear(id) {
            this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$HTTP(this.$httpConfig.delAdv,{id: id}).then((res) => {
                    this.$message({
                        duration: 1000,
                        type: 'success',
                        message: res.data.message
                    });
                    if (res.data.message == '删除成功')
                    for (let key in this.adsList) {
                        if (this.adsList[key].id == id) {
                            this.adsList.splice(key, 1);
                        }
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //编辑
        edit(id) {
            this.$router.push({
                name: 'reviseads',
                params: {
                    id: id
                }
            })
        },
        //广告位置
        adsPosition() {
            this.$HTTP(this.$httpConfig.getAdvPostion,{}).then(res => {
                this.positionList = res.data.data;
            }).catch(err => {
                console.log(err);
            })
        },
        //广告列表
        getAdsList() {
            this.$HTTP(this.$httpConfig.getAdvList,{
                adv_title: this.ads_name,
                ap_id: this.position_id,
                page: this.currentPage,
            }).then(res => {
                if (res.data.data == '') {
                    this.adsList = [];
                    this.page = 0;
                    this.page_size = 0;
                    this.currentPage = 0;
                    return false;
                }
                for (let key in res.data.data.data) {
                    if (res.data.data.data[key].status == 1) {
                        res.data.data.data[key].status = false;
                    } else {
                        res.data.data.data[key].status = true;
                    }
                }
                this.page_size = parseInt(res.data.data.size);
                this.page = Number(res.data.data.count);
                this.adsList = res.data.data.data;
            }).catch(err => {
                console.log(err);
            })
        },
        //是否显示
        setStatus(status, id) {
            let state = status == false ? 1 : 0;
            
            this.$HTTP(this.$httpConfig.setAdvReveal,{
                status: state,
                id: id,
            }).then(res => {
                this.$message({
                    duration: 1000,
                    type: 'success',
                    message: res.data.message
                });
            }).catch(err => {
                console.log(err);
            })
        },
        tolink() {
            this.$router.push({
                name: 'addads',
                // params: {
                //     id: 'add'
                // }
            });
        },
        handleSelectionChange() {
        },
        /*页面跳转*/
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            this.getAdsList();
        },
    }

}
</script>
<style lang="less">
.el-switch {
  .el-switch__core {
    width: 35px !important;
    height: 16px;
    .el-switch__button {
      width: 11px;
      height: 11px;
    }
  }
  .el-switch__label span {
    line-height: 20px;
    font-size: 12px;
  }
}
.el-table {
  padding-top: 10px;
}
/*表格内容居中*/
.el-table th > .cell,
.el-table .cell {
  text-align: center;
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
  }
}
</style>
<style>
body {
  overflow: inherit;
}
.classify {
  width: 1000px !important;
  padding-bottom: 80px;
}
</style>

<style lang="less" scoped>
.classify {
  width: 1042px;
  .g_att {
    .t_add {
      background: url(../../../../assets/plus2.jpg) no-repeat 28px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 48px;
    }
    .page {
      overflow: hidden;
      padding-top: 20px;
    }
    .list {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-top: 15px;
      tr {
        td {
          padding: 12px 0;
          border-bottom: 1px solid #ddd;
          .paging {
            background: #fff;
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
                color: #fff;
                border: none;
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
    .search {
      tr {
        td {
          input,
          select {
            width: 150px;
            border: 1px solid #ddd;
            line-height: 30px;
            height: 30px;
            color: #999;
            text-indent: 6px;
          }
          .search_btn {
            background: #f7bc0a;
          }
        }
      }
    }
  }
}
</style>
