<template>
    <div>
        <el-select v-model="params.prov" @change="selectChild" filterable placeholder="请选择">
            <el-option v-for="item in classData" :key="item.value" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
        <el-select v-model="params.city" @change="selectChildByTwo" filterable placeholder="请选择">
            <el-option v-for="(items,indexs) in classByTwo" :key="indexs" :label="items.name" :value="items.id">
            </el-option>
        </el-select>
        <el-select v-model="params.dist" @change="sendData" filterable placeholder="请选择">
            <el-option v-for="(items,indexs) in classByThree" :key="indexs" :label="items.name" :value="items.id">
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            classData: {}, // 一级分类
            classByTwo: [], // 二级分类数据
            classByThree: [], // 三级分类数据
            params: {
                prov: '请选择',
                city: '请选择',
                dist: '请选择'
            },
        }
    },
    props: {
        sendType: '',
        sendParams: ''
    },
    watch: {
        sendParams() {
            this.params = this.sendParams;
            this.selectChild2();
            this.selectChildByTwo2();
        }
    },
    mounted() {
        this.getClass();
    },
    methods: {
        // 获取省
        getClass() {
            this.$HTTP(this.$httpConfig.getProv,{}).then((res) => {
                if (!res.data.data) {
                    this.$layer.msg('暂无数据:(');
                    return;
                }
                this.classData = res.data.data;
            }).catch((err) => {
                console.log(err)
            });
        },
        // 获取市
        selectChild() {
            this.params.city = null
            this.classByTwo = [];
            this.classByThree = [];
            this.params.dist = null;
            
            this.$HTTP(this.$httpConfig.getRegionArea,{id: parseInt(this.params.prov)}).then((res) => {
                if (!res.data.data) {
                    this.$layer.msg(res.data.message);
                    return;
                }
                this.classByTwo = res.data.data;
                console.log(res.data.data)
            }).catch((err) => {
                console.log(err)
            });
        },
        // 获取区
        selectChildByTwo() {
            this.classByThree = [];
            this.params.dist = null;
            
            this.$HTTP(this.$httpConfig.getRegionArea,{id: parseInt(this.params.city)}).then((res) => {
                if (!res.data.data) {
                    this.$layer.msg('暂无数据:(');
                    return;
                }
                this.classByThree = res.data.data;
            }).catch((err) => {
                console.log(err)
            });
        },
        // 修改状态下获取市
        selectChild2() {
            this.$HTTP(this.$httpConfig.getRegionArea,{id: parseInt(this.params.prov)}).then((res) => {
                if (!res.data.data) {
                    this.$layer.msg(res.data.message);
                    return;
                }
                this.classByTwo = res.data.data;
                console.log(this.classByTwo)
            }).catch((err) => {
                console.log(err)
            });
        },
        // 修改状态下获取区
        selectChildByTwo2() {
            this.$HTTP(this.$httpConfig.getRegionArea,{id: parseInt(this.params.city)}).then((res) => {
                if (!res.data.data) {
                    this.$layer.msg(res.data.message);
                    return;
                }
                this.classByThree = res.data.data;
            }).catch((err) => {
                console.log(err)
            });
        },
        // 发送数据给父组件
        sendData() {
            this.$emit('sendcityData', this.params);
        }
    },
}
</script>