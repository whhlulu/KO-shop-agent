import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = { //创建数据仓库
    tab_state: 0,
    tab_Index: [0],
    spec_select: [], //选中规格数组
    link: '', //iframe 跳转链接
    orderStatus: '', //订单状态
    upload_show: false, //上传图片 遮罩层状态
    mask_show: false, // 创建相册遮罩层初始状态
    add_region: false, //添加地区开关
    image_api_url: "http://center.youyoulegou.cn/upload.php/",
    lcal_image_path: "http://localhost:8080/",
    header_title: null,
    imgurl: '',
    three_class_id: '', //用于获取规格
    three_class_id_tow: 0, //编辑商品时获取规格
    spec_data: {},
    spec_data_tow: {},
    album_data: 0,
    relInfo: '',
    relInfo_tow: '',
    topPrivilege: [],
    allPrivilege: {},
    leftNav: []
}
const mutations = {
    clearState(state, inf) {
        state.tab_state = inf;
    },
    clearIndex(state, inf) {
        state.tab_Index = inf;
    },
    logis(state, inf) { //变更物流信息
        state.logis_data = inf;
    },
    setvuce(state, inf) { //变更退货数据
        state.setvuce_data = inf;
    },
    my_comment(state, inf) { //我的评论
        state.my_comment = inf;
    },
    chart_review(state, inf) { //有图评论
        state.chart_review = inf;
    },
    value(state, inf) { //默认商品购买数量
        state.commodity_val = 1;
    },
    shops_switch(state, inf) { //商品详情按钮开关
        state.const_join = false;
    },
    distribution(state, inf) { //选择配送方式
        state.distribution_mode = '请选择配送方式';
    },
    invoice(state, inf) { //默认无需发票
        state.invoice_type = '无需发票';
    },
    invoice_switch(state, inf) { //发票按钮开关
        state.invoice = false;
    }
}
const store = new Vuex.Store({
    state,
    mutations
});
export default store;