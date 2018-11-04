import axios from "axios";
import qs from "qs";

var instanceArray = {};

/**
 * 逻辑处理类
 * @author 王强
 */
class AbstractLogic {

    /**
     * 构造函数 
     * @param {*} data 数据
     */
    constructor(data) {
        this.data = data;
    }

    /**
     * 获取处理数据
     */
    getResult(fun, url) {
        
        let data = this;

        axios.post(url, qs.stringify(data))
            .then(res => fun)
            .catch(e=> {
                console.log(e);
            })
        ;
    }
    
    /**
     * 获取子类实例
     * @param {*} data数据
     * @param {String} className
     */
    static getInstanceByChildren(data, className) {
        
        if (instanceArray && instanceArray.hasOwnProperty(className)) {

            let obj = instanceArray[className];

            obj.set(data);

            return obj;

        } else {
            let logic =  require("./logic/"+ className);
       
            let obj = logic[className];
           
            instanceArray[className] = new obj(data);
            return  instanceArray[className];
        }

    }

    /**
     * 获取类的实例
     * @returns {AbstractLogic}
     */
    static getInstance(data) {
        if (!AbstractLogic.intance) {
            AbstractLogic.intance = new AbstractLogic(data);
        } else {
            AbstractLogic.intance.set(data);
        }

        return AbstractLogic.intance;
    }

    set (data) {
        this.data = data;
    }

    /**
     * 跳转页面
     */
    jump(router, name) {
        router.push({
            name : name,
            params : {
                id : this.data.id
            }   
        });
    }

    /**
     * 数据处理
     */
    parseData(){}

    call(factory, ...args) {
        factory.apply(this, args)
    }
}

export {AbstractLogic}