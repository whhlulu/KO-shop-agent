
import axios from "axios";
import qs from "qs";
/**
 * 订单状态
 */
class OrderStatus 
{
    constructor(store) {
        this.store = store;
    }

    orderState() {
        axios.post(API_URL + '/OrderStatus/getOrderAllStatus', qs.stringify({
            token: sessionStorage.getItem('data_token')
        })).then((res) => {
            console.log(this);
            this.store.state.orderStatus = res.data.data;
        }).catch((err) => {
            console.log(err);
        })
    }
}
export {OrderStatus}

