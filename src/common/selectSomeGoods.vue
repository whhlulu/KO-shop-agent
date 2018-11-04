<template>
    <div>
        <el-form-item label="组合列表">
            <el-button type="success" @click.native="select2">选择组合商品</el-button>
            <el-dialog title="组合列表" :visible.sync="dialogTableVisible2">
                <el-table @selection-change="handleSelectionChange2" tooltip-effect="dark" ref="multipleTable" :data="girdData2" width="700" height="300">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="title" label="商品名称"></el-table-column>
                    <el-table-column prop="price_market" label="价格"></el-table-column>
                    <el-table-column prop="stock" label="库存"></el-table-column>
                </el-table>
                <div class="page_size">
                    <el-pagination background layout="total,prev, pager, next,jumper" :page-size="page_size2" @current-change="handleCurrentChange2" :total="page2">
                    </el-pagination>
                    <el-button class="select-submit-btn" @click="submitSelect2" type="success">确认</el-button>
                </div>
            </el-dialog>
        </el-form-item>
        <el-form-item label="已选择的组合列表">
            <el-table v-if="!status" :data="hasCityData2" border style="width: 97%">
                <el-table-column show-overflow-tooltip prop="title" label="商品名称" width="400">
                </el-table-column>
                <el-table-column prop="price_market" label="价格"></el-table-column>
                <el-table-column prop="stock" label="库存" width="150">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="deleteItem2(scope.row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table v-else :data="updateSub" border style="width: 97%">
                <el-table-column show-overflow-tooltip prop="title" label="商品名称" width="400">
                </el-table-column>
                <el-table-column prop="price_market" label="价格"></el-table-column>
                <el-table-column prop="stock" label="库存" width="150">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="deleteItem2subUp(scope.row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogTableVisible: false,
            girdData: [],
            hasCityData: [], //已经存在于服务器的地区数据
            multipleSelection: [],
            hasCityId: null, //已存在/选中的数据，只有ID
            status: 0, //0代表是新增，1代表是修改
            id: 0,
            updateSub: [],
            page_size: 0, //每页显示几个
            page: 0, //总页数
            currentPage: 1, //当前页
            page_size2: 0, //每页显示几个
            page2: 0, //总页数
            currentPage2: 1, //当前页
            girdData2: [],
            hasCityData2: [], //已经存在于服务器的地区数据
            multipleSelection2: [],
            hasCityId2: [], //组合IDs
            dialogTableVisible2: false,
        }
    },
    props: {
        sendStatus: '',
        sendUpdateData: ''
    },
    watch: {
        sendStatus() {
            this.status = this.sendStatus;
        },
        sendUpdateData() {
            this.updateSub = this.sendUpdateData;
            this.hasCityId2 = [];
             for (var i in this.updateSub) {
                this.hasCityId2.push(this.updateSub[i].id);
            }
        }
    },
    mounted() {
    },
    methods: {
        // 发送数据给父组件
        sendData() {
            console.log(this.hasCityId2);
            this.$emit('sendSomeGoodsData', this.hasCityId2);
        },
        /*页面跳转*/
        handleCurrentChange2: function (currentPage2) {
            console.log(currentPage2);
            this.currentPage2 = currentPage2;
            this.select2();
        },
        handleSelectionChange2(val) {
            this.multipleSelection2 = val;
        },
        submitSelect2() {
            let groupId = [];
            this.hasCityId2 = [];
            for (var i in this.multipleSelection2) {
                groupId.push(this.multipleSelection2[i].id);
            }
            if (this.status) {
                for (var i in this.multipleSelection2) {
                    this.updateSub.push(this.multipleSelection2[i]);
                }
                for (var i in this.updateSub) {
                    this.hasCityId2.push(this.updateSub[i].id);
                }
            } else {
                for (var i in this.multipleSelection2) {
                    this.hasCityData2.push(this.multipleSelection2[i]);
                }
                for (var i in groupId) {
                    this.hasCityId2.push(groupId[i]);
                }
            }
            this.dialogTableVisible2 = false;
            this.sendData();
        },
        deleteItem2up(id) {
            /*编辑时的删除*/
            for (var i in this.updateGoods) {
                if (this.updateGoods[i].id == id) {
                    this.updateGoods.splice(i, 1);
                    delete this.hasCityId;
                }
            }
        },
        deleteItem2(id) {
            for (var i in this.hasCityData2) {
                if (this.hasCityData2[i].id == id) {
                    this.hasCityData2.splice(i, 1);
                    this.hasCityId2.splice(i, 1);
                }
            }
        },
        deleteItem2subUp(id) {
            /*编辑时的删除子列表*/
            for (var i in this.updateSub) {
                if (this.updateSub[i].id == id) {
                    this.updateSub.splice(i, 1);
                    this.hasCityId2.splice(i, 1);
                }
               
            }
            this.sendData();
        },
        select2() {
            this.$HTTP(this.$httpConfig.getPromotionGoods,{page: this.currentPage2}).then((res) => {
                let list = res.data.data.goods;
                this.hasCityId2 = [];
                this.girdData2 = [];
                for (var i in list) {
                    this.girdData2.push(list[i]);
                }
                console.log(this.girdData2);
                this.page_size2 = res.data.data.page_size;
                this.page2 = Number(res.data.data.count);
                this.$message.success(res.data.message);
                this.dialogTableVisible2 = true;
            }).catch((err) => {
                this.$message.error(err);
            })
        }
    },
}
</script>