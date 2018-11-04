<template>
    <!-- 客服-客服类型-->
    <div class="classify">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">客服类型 - 列表</span>
                <div class="t_add fr" @click="tolink">添加客服类型</div>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>是否启用：控制客服类型是否被使用</p>
                    <p>排序的数据越大越靠前</p>
                </div>
            </div>
            <el-table border :data="dataTable" style="width: 100%" max-width="900">
                <el-table-column fixed prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="name" label="客服类型名称">
                </el-table-column>
                <el-table-column label="是否启用">
                    <template slot-scope="scope">
                        <el-switch v-model="isStatus[scope.$index]" @click.native="setStatus(scope.row.id,isStatus[scope.$index])" active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="editItem(scope.row.id)" size="mini" icon="el-icon-edit"></el-button>
                        <el-button @click="deleteItem(scope.row.id)" size="mini" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'servicetype',
    data() {
        return {
            dataTable: [],
            isStatus: []
        }
    },
    mounted() {
        
        this.getData();
    },
    methods: {
        tolink() {
            this.$router.push({
                name: 'addservicetype',
                params: {
                    status: 0
                }
            });
        },
        getData() {
            
            this.$HTTP(this.$httpConfig.getServiceTypeList,{}).then((res) => {
                this.dataTable = [];
                let list = res.data.data;
                for (var i in list) {
                    this.dataTable.push(list[i]);
                    this.isStatus.push(list[i].status == 1 ? true : false);
                }
                this.$message.success.success(res.data.message);
            }).catch((err) => {
                this.$message.error(err);
            });
        },
        setStatus(id, status) {
            this.$HTTP(this.$httpConfig.setServiceTypeUse,{
                id: id,
                isUse: Number(status)
            }).then((res) => {
                this.$message.success(res.data.message);
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        editItem(value) {
            this.$router.push({
                name: 'addservicetype',
                params: {
                    status: 1,
                    id: value
                }
            });
        },
        deleteItem(value) {
            this.$confirm('此操作将永久删除此客服类型，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$HTTP(this.$httpConfig.delServiceType,{type_id: value}).then((res) => {
                    console.log(res.data);
                    this.$message.success(res.data.message);
                    this.getData();
                }).catch((err) => {
                    this.$message.error(err);
                });
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        }
    }
}
</script>
<style type="text/css">
/*表格内容居中*/
.el-table th > .cell,
.el-table .cell {
  text-align: center;
}
</style>
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
  }
}
.el-switch {
  .el-switch__core {
    width: 35px !important;
    height: 16px;
    .el-switch__button {
      width: 11px;
      height: 11px;
    }
  }
  .el-switch__label {
    color: #a4a5a7;
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
.classify {
  width: 1000px;
  padding-bottom: 80px;
  .g_att {
    .t_add {
      background: url(../../../../assets/plus2.jpg) no-repeat 20px #ff9f24;
      width: 135px;
      height: 32px;
      border: 1px solid #ff920b;
      border-radius: 4px;
      font-size: 12px;
      font-weight: normal;
      cursor: pointer;
      color: #fff;
      line-height: 32px;
      text-indent: 38px;
    }
    .list {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-top: 1px solid #ddd;
      margin-top: 15px;
      tr {
        td {
          padding: 15px 0;
          border-bottom: 1px solid #ddd;
          input,
          select,
          textarea,
          button {
            outline: 0 none;
            vertical-align: middle;
            text-indent: 5px;
          }

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
        margin-left: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
