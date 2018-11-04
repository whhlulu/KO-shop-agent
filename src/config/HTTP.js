import qs from 'qs';
import axios from 'axios';
import {
    Message
} from 'element-ui';
var HTTP = function(API_URL,params){
    params.token = sessionStorage.getItem("data_token");
    return new Promise((resolve,reject)=>{
        axios.post(API_URL, qs.stringify(params)).then((res) => {
            if (res.data.status == 10001) {
                location.hash = '#/login';
            }else if (res.data.status == 1) {
                console.log(res.data.data);
                resolve(res);
            } else {
                Message.error(res.data.message);
                reject(res);
            }
        })
    })
}
module.exports = HTTP;