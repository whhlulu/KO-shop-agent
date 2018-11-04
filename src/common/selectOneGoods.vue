<template>
    <div>
        <el-form-item v-if="!status" v-show="hasCityData.length==0">
            <el-button type="success" @click.native="select">选择商品</el-button>
            <el-dialog title="商品列表" :visible.sync="dialogTableVisible">
                <el-table @current-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable" :data="girdData" highlight-current-row width="700" height="300">
                    <el-table-column label="商品名称" width="300px" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-radio v-model="isSelected" :label="scope.$index">{{scope.row.title}}</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price_market" label="价格"></el-table-column>
                    <el-table-column prop="stock" label="库存"></el-table-column>
                </el-table>
                <div class="page_size">
                    <el-pagination background layout="total,prev, pager, next,jumper" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
                    </el-pagination>
                    <el-button class="select-submit-btn" @click="submitSelect" type="success">确认</el-button>
                </div>
            </el-dialog>
        </el-form-item>
        <el-form-item v-else v-show="updateGoods.length == 0">
            <el-button type="success" @click.native="select">选择商品</el-button>
            <el-dialog title="商品列表" :visible.sync="dialogTableVisible">
                <el-table @current-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable" :data="girdData" highlight-current-row width="700" height="300">
                    <el-table-column label="商品名称" width="300px" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-radio v-model="isSelected" :label="scope.$index">{{scope.row.title}}</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price_market" label="价格"></el-table-column>
                    <el-table-column prop="stock" label="库存"></el-table-column>
                </el-table>
                <div class="page_size">
                    <el-pagination background layout="total,prev, pager, next,jumper" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
                    </el-pagination>
                    <el-button class="select-submit-btn" @click="submitSelect" type="success">确认</el-button>
                </div>
            </el-dialog>
        </el-form-item>
        <el-form-item label="已选择的优惠商品">
            <el-table v-if="!status" :data="hasCityData" border style="width: 70%;">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="title" label="商品名称">
                </el-table-column>
                <el-table-column prop="price_market" label="价格">
                </el-table-column>
                <el-table-column prop="stock" label="库存">
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-button @click="deleteItem(scope.row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                        <el-button @click="viewItem(scope.row.id)" size="mini" icon="el-icon-view"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table v-else :data="updateGoods" border style="width: 70%;">
                <el-table-column prop="goods_id" label="ID">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="title" label="商品名称">
                </el-table-column>
                <el-table-column prop="price_market" label="价格">
                </el-table-column>
                <el-table-column prop="stock" label="库存">
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-button @click="deleteItem2(scope.row.goods_id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                        <el-button @click="viewItem(scope.row.id)" size="mini" icon="el-icon-view"></el-button>
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
        radio: '1',
            dialogTableVisible: false,
            girdData: [],
            hasCityData: [], //已经存在于服务器的地区数据
            multipleSelection: [],
            hasCityId: null, //已存在/选中的数据，只有ID
            status: 0, //0代表是新增，1代表是修改
            id: 0,
            updateGoods: [],
            page_size: 0, //每页显示几个
            page: 0, //总页数
            currentPage: 1, //当前页
            isSelected:'',
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
            this.updateGoods = this.sendUpdateData;
        }
    },
    mounted() {
    },
    methods: {
        /*翻页*/
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            this.select();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (val.length > 1) {
                console.log(val)
            }
        },
        // 删除单个商品
        deleteItem(id) {
            for (var i in this.hasCityData) {
                if (this.hasCityData[i].id == id) {
                    this.hasCityData.splice(i, 1);
                    delete this.hasCityId;
                }
            }
        },
        // 查看单个商品
        viewItem(id){
			window.open('http://b2b2c.1221mall.com/#/inroyaldrink/' + id);
        },
        // 修改时的删除
        deleteItem2(id) {
            if (this.updateGoods[0].goods_id == id) {
                this.updateGoods = [];
                delete this.hasCityId;
            }
        },
        // 商品选择框的确认功能
        submitSelect() {
            let groupId = this.multipleSelection.id;
            this.hasCityId = groupId;
            if (this.status) {
                this.updateGoods.push(this.multipleSelection);
                this.sendDataUp();
            } else {
                this.hasCityData.push(this.multipleSelection);
                this.sendData();
            }
            console.log(this.hasCityId)
            this.isSelected = '';
            this.dialogTableVisible = false;
        },
        // 点了“选择商品”按钮之后弹出框
        select() {
            this.$HTTP(this.$httpConfig.getPromotionGoods,{page: this.currentPage}).then((res) => {
                let list = res.data.data.goods;
                this.hasCityId = [];
                this.girdData = [];
                for (var i in list) {
                    this.girdData.push(list[i]);
                }
                this.page_size = res.data.data.page_size;
                this.page = Number(res.data.data.count);
                this.$message.success(res.data.message);
                this.dialogTableVisible = true;
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        // 发送数据给父组件
        sendData() {
            this.$emit('sendGoodsData', this.hasCityId, this.hasCityData);
        },
        // 发送数据给父组件
        sendDataUp() {
            this.$emit('sendGoodsData', this.hasCityId, this.updateGoods);
        }
    },
}
</script>
<style>
.el-table th > .cell, .el-table .cell{
    text-align: left!important;
}
</style>
