import Vue from 'vue'
import App from '@/App'
import Router from 'vue-router'
const subject = r => require(['@/components/subject'], r); //入口
const login = r => require(['@/components/logoIn/logoIn'], r); //登录
const home = r => require(['@/components/home/home'], r); //商户中心入口
const index = r => require(['@/components/home/index/index'], r); //商户中心
const goods = r => require(['@/components/home/goods/goods'], r); //商户中心-商品
const goodsManage = r => require(['@/components/home/goods/children/goodsManage'], r); //商户中心-商品管理
const goodsRelease = r => require(['@/components/home/goods/children/goodsRelease/goodsRelease'], r); //商户中心-发布商品
const goodsEdit = r => require(['@/components/home/goods/children/goodsEdit/goodsEdit'], r); //商户中心-编辑商品
const classification = r => require(['@/components/home/goods/children/classification'], r); //商户中心-店铺商品分类
const addgoods = r => require(['@/components/home/goods/children/addGoodsClassify'], r); //商户中心-店铺商品分类-添加
const imgageSpace = r => require(['@/components/home/goods/children/imgageSpace'], r); //商户中心-图片空间-相册列表
const Picturelist = r => require(['@/components/home/goods/children/Picturelist'], r); //商户中心-图片空间-查看广告图
const goodsType = r => require(['@/components/home/goods/children/goodsType'], r); //商户中心-商品类型
const addGoodsType = r => require(['@/components/home/goods/children/addGoodsType'], r); //商户中心-添加商品类型
const goodsSpec = r => require(['@/components/home/goods/children/goodsSpec'], r); //商户中心-商品规格
const addGoodsSpec = r => require(['@/components/home/goods/children/addGoodsSpec'], r); //商户中心-添加商品规格
const updateGoodsSpec = r => require(['@/components/home/goods/children/updateGoodsSpec'], r); //商户中心-添加商品规格
const goodsAttribute = r => require(['@/components/home/goods/children/goodsAttribute'], r); //商户中心-商品属性
const addGoodsAttribute = r => require(['@/components/home/goods/children/addGoodsAttribute'], r); //商户中心-商品属性
const logistics = r => require(['@/components/home/logistics/logistics'], r); //商户中心-物流
const shipAddress = r => require(['@/components/home/logistics/children/shipAddress'], r); //商户中心-物流-发货地址
const addAddress = r => require(['@/components/home/logistics/children/addAddress'], r); //商户中心-物流-添加发货地址
const freightFit = r => require(['@/components/home/logistics/children/freightFit'], r); //商户中心-物流-运费设置列表
const addFreight = r => require(['@/components/home/logistics/children/addFreightFit'], r); //商户中心-物流-添加运费设置
const expressList = r => require(['@/components/home/logistics/children/expressList'], r); //商户中心-物流-快递公司列表
const addExpress = r => require(['@/components/home/logistics/children/addExpressList'], r); //商户中心-物流-添加快递公司
const freightTemplet = r => require(['@/components/home/logistics/children/freightTemplet'], r); //商户中心-物流-运费模板列表
const addFreightTemplet = r => require(['@/components/home/logistics/children/addFreightTemplet'], r); //商户中心-物流-添加运费模板
const addFreightTempletPostage = r => require(['@/components/home/logistics/children/addFreightTempletPostage'], r); //商户中心-物流-包邮设置
const trade = r => require(['@/components/home/trade/trade'], r); //商户中心-交易
const tradeManage = r => require(['@/components/home/trade/children/tradeManage'], r); //商户中心-交易-订单管理
const combinationOrder = r => require(['@/components/home/trade/children/combinationOrder'], r); //商户中心-交易-套餐订单
const integralList = r => require(['@/components/home/trade/children/integralList'], r);
const invoice = r => require(['@/components/home/trade/children/invoice'], r); //商户中心-交易-发货单管理
const orderDelivery = r => require(['@/components/home/trade/children/orderDelivery'], r); //商户中心-交易-立即发货
const orderDetail = r => require(['@/components/home/trade/children/detail'], r); //商户中心-交易-订单详情
const print = r => require(['@/components/home/trade/children/print'], r); //商户中心-交易-打印发货单
const refund = r => require(['@/components/home/trade/children/refund'], r); //商户中心-交易-退款/退货管理
const returnDetails = r => require(['@/components/home/trade/children/returnDetails'], r); //商户中心-交易-退款/退货管理详情
const evaluate = r => require(['@/components/home/trade/children/evaluate'], r); //商户中心-交易-评价管理
const promotion = r => require(['@/components/home/promotion/promotion'], r); //商户中心-促销
const groupBuy = r => require(['@/components/home/promotion/children/groupBuy'], r); //商户中心-促销-团购
const fullGifts = r => require(['@/components/home/promotion/children/fullGifts'], r); //商户中心-促销-满赠
const addSales = r => require(['@/components/home/promotion/children/addSalesPromotion'], r); //商户中心-促销-添加商品促销活动
const fullCut = r => require(['@/components/home/promotion/children/fullCut'], r); //商户中心-促销-满减
const addFullCut = r => require(['@/components/home/promotion/children/addFullCut'], r); //商户中心-促销-添加满减活动
const coupon = r => require(['@/components/home/promotion/children/coupon'], r); //商户中心-促销-优惠券
const addCoupon = r => require(['@/components/home/promotion/children/addCoupon'], r); //商户中心-促销-添加优惠券
const couponGrant = r => require(['@/components/home/promotion/children/couponGrant'], r); //商户中心-促销-发放优惠券
const distribution = r => require(['@/components/home/promotion/children/distribution/distribution'], r); //商户中心-促销-分销商品列表
const distributorList = r => require(['@/components/home/promotion/children/distribution/children/distributorList'], r); //商户中心-促销-分销商列表
const distributorInfo = r => require(['@/components/home/promotion/children/distribution/children/distributorInfo'], r); //商户中心-促销-分销商信息
const distributionNexus = r => require(['@/components/home/promotion/children/distribution/children/distributionNexus'], r); //商户中心-促销-分销关系
const distributionFit = r => require(['@/components/home/promotion/children/distribution/children/distributionFit'], r); //商户中心-促销-分销设置
const dividedInto = r => require(['@/components/home/promotion/children/distribution/children/dividedInto'], r); //商户中心-促销-分成日志
const integralMall = r => require(['@/components/home/promotion/children/integralMall'], r); //商户中心-促销-积分商城 - 商品列表
const addIntegralGooods = r => require(['@/components/home/promotion/children/addIntegralGooods'], r); //商户中心-促销-积分商城 - 添加积分商品
const discountPackage = r => require(['@/components/home/promotion/children/discountPackage'], r); //商户中心-促销-优惠套餐
const addPackage = r => require(['@/components/home/promotion/children/addPackage'], r); //商户中心-促销-添加优惠套餐
const combination = r => require(['@/components/home/promotion/children/combination'], r); //商户中心-促销-最佳组合
const addCombination = r => require(['@/components/home/promotion/children/addCombination'], r); //商户中心-促销-添加最佳组合
const parts = r => require(['@/components/home/promotion/children/parts'], r); //商户中心-促销-推荐配件
const addparts = r => require(['@/components/home/promotion/children/addParts'], r); //商户中心-促销-添加推荐配件
const panicBuying = r => require(['@/components/home/promotion/children/panicBuying'], r); //商户中心-促销-抢购
const addPanicBuying = r => require(['@/components/home/promotion/children/addPanicBuying'], r); //商户中心-促销-添加抢购
const member = r => require(['@/components/home/member/member'], r); //商户中心-会员
const memberGrade = r => require(['@/components/home/member/children/memberGrade'], r); //商户中心-会员 -会员等级
const addGrade = r => require(['@/components/home/member/children/addGrade'], r); //商户中心-会员 -添加会员等级
const memberList = r => require(['@/components/home/member/children/memberList'], r); //商户中心-会员 -会员列表
const addMember = r => require(['@/components/home/member/children/addMember'], r); //商户中心-会员 -添加会员
const shop = r => require(['@/components/home/shop/shop'], r); //商户中心-店铺
const shopfit = r => require(['@/components/home/shop/children/shopFit'], r); //商户中心-店铺设置
const shopinfo = r => require(['@/components/home/shop/children/shopInfo'], r); //商户中心-店铺信息
const delivery = r => require(['@/components/home/shop/children/delivery'], r); //商户中心-店铺-配送方式
const shopset = r => require(['@/components/home/shop/children/shopSet'], r); //商户中心-店铺-装修店铺
const operateCategory = r => require(['@/components/home/shop/children/operateCategory'], r); //商户中心-店铺-经营类目
const addCategory = r => require(['@/components/home/shop/children/addCategory'], r); //商户中心-店铺-添加经营类目
const editCategory = r => require(['@/components/home/shop/children/editCategory'], r); //商户中心-店铺-编辑经营类目
const returnaddress = r => require(['@/components/home/shop/children/returnAddress'], r); //商户中心-店铺-发退货地址库
const addreturnaddress = r => require(['@/components/home/shop/children/addReturnAddress'], r); //商户中心-店铺-添加发退货地址库
const articlelist = r => require(['@/components/home/shop/children/articleList'], r); //商户中心-店铺-文章列表
const addarticle = r => require(['@/components/home/shop/children/addArticle'], r); //商户中心-店铺-添加文章列表
const shopnav = r => require(['@/components/home/shop/children/shopNav'], r); //商户中心-店铺-店铺导航
const addshopnav = r => require(['@/components/home/shop/children/addShopNav'], r); //商户中心-店铺-添加店铺导航
const navset = r => require(['@/components/home/shop/children/navSet'], r); //商户中心-店铺-导航设置
const service = r => require(['@/components/home/service/service'], r); //商户中心-客服
const servicetype = r => require(['@/components/home/service/children/serviceType'], r); //商户中心-客服类型
const addservicetype = r => require(['@/components/home/service/children/addServiceType'], r); //商户中心-添加客服类型
const servicemanage = r => require(['@/components/home/service/children/serviceManage'], r); //商户中心-客服管理
const addservicemanage = r => require(['@/components/home/service/children/addServiceManage'], r); //商户中心-添加客服管理
const systemInfo = r => require(['@/components/home/service/children/systemInfo'], r); //商户中心-客服-系统信息
const account = r => require(['@/components/home/accountNum/accountNum'], r); //商户中心-账号
const adminlist = r => require(['@/components/home/accountNum/children/adminList'], r); //商户中心-账号管理
const addadmin = r => require(['@/components/home/accountNum/children/addAdmin'], r); //商户中心-添加管理员
const rolelist = r => require(['@/components/home/accountNum/children/roleList'], r); //商户中心-用户组管理
const addrole = r => require(['@/components/home/accountNum/children/addRole'], r); //商户中心-添加用户组
const jurisdiction = r => require(['@/components/home/accountNum/children/jurisdiction'], r); //商户中心-权限管理
const finance = r => require(['@/components/home/finance/finance'], r); //商户中心-财务
const settlement = r => require(['@/components/home/finance/children/settlementList'], r); //商户中心-财务-结算管理列表
const ads = r => require(['@/components/home/advertisement/advertisement'], r); //商户中心-广告
const adslist = r => require(['@/components/home/advertisement/children/advertisingList'], r); //商户中心-广告列表
const addads = r => require(['@/components/home/advertisement/children/addingAds'], r); //商户中心-添加广告
const reviseads = r => require(['@/components/home/advertisement/children/reviseAds'], r); //商户中心-编辑广告
const adsposition = r => require(['@/components/home/advertisement/children/advertisingPosition'], r); //商户中心-广告位置
const info = r => require(['@/components/order/info'], r);
const orderIntegral = r => require(['@/components/home/trade/children/orderIntegralDetail'], r);
const combinationOrderDetail = r => require(['@/components/home/trade/children/combinationOrderDetail'], r);
// 引入公共组件
import cityThree from '../common/cityThree.vue'; //省市区三级联查
Vue.component('city-three', cityThree);

Vue.use(Router);

const router = new Router({
    // mode:'history',
    routes: [{
        path: '/',
        component: App, //顶层路由，对应index.html
        children: [ //二级路由。
            //地址为空时跳转subject页面
            {
                path: '',
                redirect: '/login'
            },
            // { //首页
            //     path: '/home',
            //     name: 'home',
            //     component: home
            // },

            { //登录
                path: '/login',
                name: 'login',
                component: login
            },
            {
                path: '/info',
                name: 'info',
                component: info
            },
            // { //商户中心
            //     path: '/index',
            //     name: 'index',
            //     component: index
            // },
            // { //商户中心-商品
            //     path: '/goods',
            //     name: 'goods',
            //     component: goods
            // },
            // { //商户中心-商品管理
            //     path: '/goodsManage',
            //     name: 'goodsManage',
            //     component: goodsManage
            // },
            { //商户中心-发布商品
                path: '/goodsRelease',
                name: 'goodsRelease',
                component: goodsRelease
            },
            { //商户中心-编辑商品
                path: '/goodsEdit/:id',
                name: 'goodsEdit',
                component: goodsEdit
            },
            // { //商户中心-店铺商品分类
            //     path: '/classification',
            //     name: 'classification',
            //     component: classification
            // },
            // { //商户中心-店铺商品分类-添加
            //     path: '/addgoods/:status',
            //     name: 'addgoods',
            //     component: addgoods
            // },
            // { //商户中心-图片空间-相册列表
            //     path: '/imgageSpace',
            //     name: 'imgageSpace',
            //     component: imgageSpace
            // },
            // { //商户中心-图片空间-查看广告图
            //     path: '/Picturelist',
            //     name: 'Picturelist',
            //     component: Picturelist
            // },
            // { //商户中心-商品类型
            //     path: '/goodsType',
            //     name: 'goodsType',
            //     component: goodsType
            // },
            // { //商户中心-添加商品类型
            //     path: '/addGoodsType',
            //     name: 'addGoodsType',
            //     component: addGoodsType
            // },
            // { //商户中心-商品规格
            //     path: '/goodsSpec',
            //     name: 'goodsSpec',
            //     component: goodsSpec
            // }, 
            { //商户中心-添加商品规格
                path: '/addGoodsSpec',
                name: 'addGoodsSpec',
                component: addGoodsSpec
            },
            { //商户中心-修改商品规格
                path: '/updateGoodsSpec',
                name: 'updateGoodsSpec',
                component: updateGoodsSpec
            },
            // { //商户中心-商品属性
            //     path: '/goodsAttribute',
            //     name: 'goodsAttribute',
            //     component: goodsAttribute
            // },
            // { //商户中心-添加商品属性
            //     path: '/addGoodsAttribute',
            //     name: 'addGoodsAttribute',
            //     component: addGoodsAttribute
            // },
            // { //商户中心-物流
            //     path: '/logistics',
            //     name: 'logistics',
            //     component: logistics
            // },
            // { //商户中心-发货地址
            //     path: '/shipAddress',
            //     name: 'shipAddress',
            //     component: shipAddress
            // },
            { //商户中心-添加发货地址
                path: '/addAddress',
                name: 'addAddress',
                component: addAddress
            },
            // { //商户中心-运费设置列表
            //     path: '/freightFit',
            //     name: 'freightFit',
            //     component: freightFit
            // },
            { //商户中心-添加运费设置
                path: '/addFreight',
                name: 'addFreight',
                component: addFreight
            },
            // { //商户中心-快递公司列表
            //     path: '/expressList',
            //     name: 'expressList',
            //     component: expressList
            // },
            { //商户中心-添加快递公司
                path: '/addExpress',
                name: 'addExpress',
                component: addExpress
            },
            // { //商户中心-运费模板列表
            //     path: '/freightTemplet',
            //     name: 'freightTemplet',
            //     component: freightTemplet
            // },
            { //商户中心-添加运费模板
                path: '/addFreightTemplet',
                name: 'addFreightTemplet',
                component: addFreightTemplet
            },
            { //商户中心-添加邮费设置
                path: '/addFreightTempletPostage',
                name: 'addFreightTempletPostage',
                component: addFreightTempletPostage
            },
            // { //商户中心-交易
            //     path: '/trade',
            //     name: 'trade',
            //     component: trade
            // },
            // { //商户中心-交易-订单管理 - 订单列表
            //     path: '/tradeManage',
            //     name: 'tradeManage',
            //     component: tradeManage
            // },
            // { //商户中心-交易-订单管理 - 套餐订单列表
            //     path: '/combinationOrder',
            //     name: 'combinationOrder',
            //     component: combinationOrder
            // },
            // { //商户中心-交易-发货单管理列表
            //     path: '/invoice',
            //     name: 'invoice',
            //     component: invoice
            // },
            { //商户中心-交易-立即发货
                path: '/orderDelivery/:order_id',
                name: 'orderDelivery',
                component: orderDelivery
            },
            { //商户中心-交易-订单详情
                path: '/orderDetail/:order_id',
                name: 'orderDetail',
                component: orderDetail
            },
            { //商户中心-交易-打印发货单
                path: '/print/:order_id',
                name: 'print',
                component: print
            },
            {
                path: '/oderIntegral/:id',
                name: 'orderIntegral',
                component: orderIntegral
            },

            {
                path: '/combinationOrderDetail/:id',
                name: 'combinationOrderDetail',
                component: combinationOrderDetail
            },
            // { //商户中心-交易-退款/退货
            //     path: '/refund',
            //     name: 'refund',
            //     component: refund
            // },
            { //商户中心-交易-退款/退货详情
                path: '/returnDetails/:id',
                name: 'returnDetails',
                component: returnDetails
            },
            // { //商户中心-交易-评价
            //     path: '/evaluate',
            //     name: 'evaluate',
            //     component: evaluate
            // },
            // { //商户中心-促销
            //     path: '/promotion',
            //     name: 'promotion',
            //     component: promotion
            // },
            // { //商户中心-促销-团购
            //     path: '/groupBuy',
            //     name: 'groupBuy',
            //     component: groupBuy
            // },
            // { //商户中心-促销-满赠
            //     path: '/fullGifts',
            //     name: 'fullGifts',
            //     component: fullGifts
            // },
            { //商户中心-促销-添加商品促销活动
                path: '/addSales',
                name: 'addSales',
                component: addSales
            },
            // { //商户中心-促销-满减
            //     path: '/fullCut',
            //     name: 'fullCut',
            //     component: fullCut
            // },
            { //商户中心-促销-添加满减活动
                path: '/addFullCut',
                name: 'addFullCut',
                component: addFullCut
            },
            // { //商户中心-促销-优惠券
            //     path: '/coupon',
            //     name: 'coupon',
            //     component: coupon
            // },
            { //商户中心-促销-添加优惠券
                path: '/addCoupon',
                name: 'addCoupon',
                component: addCoupon
            },
            { //商户中心-促销-发放优惠券
                path: '/couponGrant',
                name: 'couponGrant',
                component: couponGrant
            },
            // { //商户中心-促销-分销商品列表
            //     path: '/distribution',
            //     name: 'distribution',
            //     component: distribution
            // },
            // { //商户中心-促销-分销商列表
            //     path: '/distributorList',
            //     name: 'distributorList',
            //     component: distributorList
            // },
            // { //商户中心-促销-分销商信息
            //     path: '/distributorInfo',
            //     name: 'distributorInfo',
            //     component: distributorInfo
            // },
            // { //商户中心-促销-分销关系
            //     path: '/distributionNexus',
            //     name: 'distributionNexus',
            //     component: distributionNexus
            // },
            // { //商户中心-促销-分销设置
            //     path: '/distributionFit',
            //     name: 'distributionFit',
            //     component: distributionFit
            // },
            // { //商户中心-促销-分销设置
            //     path: '/dividedInto',
            //     name: 'dividedInto',
            //     component: dividedInto
            // },
            // { //商户中心-促销-积分商城 -积分列表
            //     path: '/integralMall',
            //     name: 'integralMall',
            //     component: integralMall
            // },
            { //商户中心-促销-积分商城 -添加积分商品
                path: '/addIntegralGooods',
                name: 'addIntegralGooods',
                component: addIntegralGooods
            },
            // { //商户中心-促销-优惠套餐
            //     path: '/discountPackage',
            //     name: 'packadiscountPackagege',
            //     component: discountPackage
            // },
            { //商户中心-促销-添加优惠套餐
                path: '/addPackage',
                name: 'addPackage',
                component: addPackage
            },
            // { //商户中心-促销-最佳组合
            //     path: '/combination',
            //     name: 'combination',
            //     component: combination
            // },
            { //商户中心-促销-添加最佳组合
                path: '/addCombination',
                name: 'addCombination',
                component: addCombination
            },
            // { //商户中心-促销-推荐配件
            //     path: '/parts',
            //     name: 'parts',
            //     component: parts
            // },
            { //商户中心-促销-添加推荐配件
                path: '/addparts',
                name: 'addparts',
                component: addparts
            },
            // { //商户中心-促销-抢购
            //     path: '/panicBuying',
            //     name: 'panicBuying',
            //     component: panicBuying
            // },
            { //商户中心-促销-添加抢购
                path: '/addPanicBuying',
                name: 'addPanicBuying',
                component: addPanicBuying
            },
            // { //商户中心-会员
            //     path: '/member',
            //     name: 'member',
            //     component: member
            // },
            // { //商户中心-会员-会员等级
            //     path: '/memberGrade',
            //     name: 'memberGrade',
            //     component: memberGrade
            // },
            { //商户中心-会员-添加会员等级
                path: '/addGrade',
                name: 'addGrade',
                component: addGrade
            },
            // { //商户中心-会员-会员列表
            //     path: '/memberList',
            //     name: 'memberList',
            //     component: memberList
            // },
            { //商户中心-会员-添加会员
                path: '/addMember',
                name: 'addMember',
                component: addMember
            },
            // { //商户中心-店铺
            //     path: '/shop',
            //     name: 'shop',
            //     component: shop
            // },
            // { //商户中心-店铺-店铺设置
            //     path: '/shopfit',
            //     name: 'shopfit',
            //     component: shopfit
            // },
            // { //商户中心-店铺-店铺信息
            //     path: '/shopinfo',
            //     name: 'shopinfo',
            //     component: shopinfo
            // },
            // { //商户中心-店铺-配送方式
            //     path: '/delivery',
            //     name: 'delivery',
            //     component: delivery
            // },
            // { //商户中心-店铺-发退货地址库
            //     path: '/returnaddress',
            //     name: 'returnaddress',
            //     component: returnaddress
            // },
            // { //商户中心-店铺-添加发退货地址库
            //     path: '/addreturnaddress',
            //     name: 'addreturnaddress',
            //     component: addreturnaddress
            // },
            // { //商户中心-店铺-文章列表
            //     path: '/articleList',
            //     name: 'articlelist',
            //     component: articlelist
            // },
            // { //商户中心-店铺-添加文章
            //     path: '/addarticle',
            //     name: 'addarticle',
            //     component: addarticle
            // },
            // { //商户中心-店铺-店铺导航
            //     path: '/shopnav',
            //     name: 'shopnav',
            //     component: shopnav
            // },
            { //商户中心-店铺-添加店铺导航
                path: '/addshopnav',
                name: 'addshopnav',
                component: addshopnav
            },
            // { //商户中心-店铺-导航设置
            //     path: '/navset',
            //     name: 'navset',
            //     component: navset
            // },
            // { //商户中心-客服
            //     path: '/service',
            //     name: 'service',
            //     component: service
            // },
            // { //商户中心-客服类型
            //     path: '/servicetype',
            //     name: 'servicetype',
            //     component: servicetype
            // },
            { //商户中心-客服类型
                path: '/addservicetype',
                name: 'addservicetype',
                component: addservicetype
            },
            // { //商户中心-客服管理
            //     path: '/servicemanage',
            //     name: 'servicemanage',
            //     component: servicemanage
            // },
            { //商户中心-添加客服管理
                path: '/addservicemanage',
                name: 'addservicemanage',
                component: addservicemanage
            },
            // { //商户中心-客服-系统消息
            //     path: '/systemInfo',
            //     name: 'systemInfo',
            //     component: systemInfo
            // },
            // { //商户中心-账号
            //     path: '/account',
            //     name: 'account',
            //     component: account
            // },
            // { //商户中心-账号管理
            //     path: '/adminlist',
            //     name: 'adminlist',
            //     component: adminlist
            // },
            { //商户中心-添加管理员
                path: '/addadmin',
                name: 'addadmin',
                component: addadmin
            },
            // { //商户中心-用户组管理
            //     path: '/rolelist',
            //     name: 'rolelist',
            //     component: rolelist
            // },
            { //商户中心-添加用户组
                path: '/addrole',
                name: 'addrole',
                component: addrole
            },
            { //商户中心-添加管理员
                path: '/jurisdiction',
                name: 'jurisdiction',
                component: jurisdiction
            },
            // { //商户中心-财务
            //     path: '/finance',
            //     name: 'finance',
            //     component: finance
            // },
            // { //商户中心-财务-结算管理
            //     path: '/settlement',
            //     name: 'settlement',
            //     component: settlement
            // },
            // { //商户中心-广告
            //     path: '/ads',
            //     name: 'ads',
            //     component: ads
            // },
            // { //商户中心-广告列表
            //     path: '/adslist',
            //     name: 'adslist',
            //     component: adslist
            // },
            { //商户中心-添加广告
                path: '/addads',
                name: 'addads',
                component: addads
            },
            { //商户中心-编辑广告
                path: '/reviseads',
                name: 'reviseads',
                component: reviseads
            },
            // { //商户中心-广告位置
            //     path: '/adsposition',
            //     name: 'adsposition',
            //     component: adsposition
            // },
            // { //店铺-店铺装修
            //     path: '/shopset',
            //     name: 'shopset',
            //     component: shopset
            // },
            // { //店铺-经营类目
            //     path: '/operateCategory',
            //     name: 'operateCategory',
            //     component: operateCategory
            // },
            { //店铺-添加经营类目
                path: '/addCategory',
                name: 'addCategory',
                component: addCategory
            },
            { //店铺-编辑经营类目
                path: '/editCategory',
                name: 'editCategory',
                component: editCategory
            },
        ]
    }],

});

Router.prototype.initLocalRouters = function() {
        let allPrivilege = sessionStorage.getItem('allPrivilege');
        if (allPrivilege) {
            allPrivilege = JSON.parse(allPrivilege);
            let topMenu = [];
            let json = {};
            let index = 0;
            for (var i in allPrivilege) {
                json = {
                    name: allPrivilege[i].name,
                    path: allPrivilege[i].path,
                    component: eval(allPrivilege[i].name)
                }

                topMenu[index] = json;

                index++;
            }
            // console.log(allPrivilege)
            // console.log(topMenu)
            router.addRoutes(topMenu);
        }

    }
    //router.beforeEach((to,from,next)=>{
    //	console.log(arguments)
    //	next();
    //}) 
router.initLocalRouters();
export default router