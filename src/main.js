// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import 'babel-polyfill';
import 'es6-promise/auto'
import $ from 'jquery'
/*import './style/jquery-ui.min.css'
import '../js/jquery-ui.min.js'*/
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../config/globle.js' //常量
//富文本编辑器文件引入
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//弹框
import layer from 'vue-layer';
import './style/base.css'
import store from './control/index'
import httpConfig from './httpConfig';
import HTTP from './config/HTTP';
Vue.prototype.$httpConfig = httpConfig;
Vue.prototype.$HTTP = HTTP;
//温馨提示处的样式
import './style/notes.css'

//全局方法
import isLogin from '../js/base';
window.UEDITOR_CONFIG.serverUrl = 'http://center.youyoulegou.cn/php/controller.php'; //ueditor 上传图片URL
const user_id = sessionStorage.getItem('user_ID') || '',
    URL = 'http://center.youyoulegou.cn';
//     load_wrap = true;
Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.URL = URL;
Vue.prototype.$layer = layer(Vue);
// Vue.prototype.load_wrap = load_wrap;
// Vue.prototype.user_id = user_id;
Vue.use(router);
Vue.use(ElementUI)
Vue.use(isLogin);
Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.innerText;
        el.parentNode.removeChild(el)
    }
});
Vue.filter('keepTwoNum', function(value) {
    value = Number(value);
    var b = value.toFixed(3);
    return b.substring(0, b.toString().length - 1)
});
Vue.filter('formatDate', function(value) { //时间戳转换

    if (!value) {
        return "";
    }

    var time = new Date(Number(value) * 1000);
    var Y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var H = time.getHours();
    var mi = time.getMinutes();
    var s = time.getSeconds();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    if (H < 10) {
        H = "0" + H;
    }
    if (mi < 10) {
        mi = '0' + mi;
    }
    if (s < 10) {
        s = "0" + s;
    }
    return (Y + "-" + m + "-" + d + " " + H + ":" + mi + ":" + s);
});
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    },
    render: h => h(App)
})