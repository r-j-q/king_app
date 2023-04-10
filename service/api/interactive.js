import Request from '../request.js'
const request = new Request().http

// 首页轮播图
const IndexBanner = data => {
	return request('configuration/public/publicSlideshowAndAdvertisingImg', data, 'GET', true)
}

//商品详情
const shopDeitals=data=>{
	return request('product/item/'+data.id, '', 'GET', true)
}

//地址查询所有
const getAddres=data=>{
	return request('delivery/address',data,'GET',true)
}
//删除地址
const DeleAddres=data=>{
	return request('delivery/address/'+data.id,'','DELETE',true)
}

//地址查询area/
const getAddresInfo=data=>{
	return request('delivery/address/'+data.aId,'','GET',true)
}
//地址查询
const superiorArea=data=>{
	return request('area/superior/'+data.aId,'','GET',true)
}

//修改地址
const editaddress=data=>{
	return request('delivery/address/'+data.aId,data.addresform,'PUT',true)
}

//修改地址
const addApiaddress=data=>{
	return request('delivery/address',data.addresform,'post',true)
}

//默认查询地址delivery/default_address
const defaultAddres=data=>{
	return request('delivery/default_address',data,'GET',true)
}

//生成订单
const genOrder=data=>{
	return request('order',data,'POST',true)
}

//付款详情
const payDeitals=data=>{
	return request('payment/detail/'+data.orderId,'',"GET",true)
}
//付款详情
const paycheck=data=>{
	return request('payment/checkout',data,"POST",true)
}

//商品区域product/search
const diffSearch=data=>{
	return request('product/search',data,"GET",true)
}

//店铺详情
const seleStore=data=>{
	return request('store/'+data.id,'',"GET",true)
}

//订单详情
const Seleorder=data=>{
	return request('order',data,"get",true)
}
//代付款查询const payment/unfinished
const payuUnfinished=data=>{
	return request('payment/unfinished',data,"get",true)
}

//个人中心数据查询 user/profit
const userProfit=data=>{
	return request('user/profit',data,"get",true)
}
// 个人中心复购积分数据等user/redemption/point
const userPoint=data=>{
	return request('user/redemption/point',data,"GET",true)
}

// 余额查询user/balance
const userBalance=data=>{
	return request('user/balance',data,"GET",true)
}

// 个人信息查询user/authed
const userAuthed=data=>{
	return request('user/authed',data,"GET",true)
}

// configuration/withdraw
const userWithdraw=data=>{
	return request('configuration/withdraw',data,"GET",true)
}
// 提现withdraw/application
const userApplication=data=>{
	return request('withdraw/application',data,'POST',true)
}

// 提现withdraw/application
const getApplication=data=>{
	return request('withdraw/application',data,'GET',true)
}
// 物流信息
const userdeliverypackage=data=>{
	
	return request('delivery_package/'+data,'',"GET",true)
}

//确认收货
const userReceipt=data=>{
	return request('order/'+data.id+'/'+data.type,'',"GET",true)
}
//设置性别
const userInfo=data=>{
	return request('user/info',data,"PUT",true)
}

//退出signout
const useSignout=data=>{
	return request('signout',data,"get",true)
}

//登录signin/account
const passLogin=data=>{
	return request('signin/account',data,"POST",true)
}

// user/sms_code修改密码获取验证码
const loginCode=data=>{
	return request('user/sms_code',data,"POST",true)
}

// user/password修改密码获取验证码
const editPassword=data=>{
	return request('user/password',data,"PUT",true)
}
// user/raffle/search/activity
const userActivity=data=>{
	return request('user/raffle/search/activity',data,"GET",true)
}
// user/raffle/detail
const raffLeDeital=data=>{
	return request('user/raffle/detail/'+data,'',"GET",true)
}
// raffle/ticket 抽奖券
const userTicket=data=>{
	return request('raffle/ticket',data,"GET",true)
}
// raffle/activity
const raffleActivity=data=>{
	return request('user/raffle/activity/'+data,'',"GET",true)
}

//组团明细 user/raffle/activity/record/detail
const userRaffledetail=data=>{
	return request('user/raffle/activity/record/detail',data,"GET",true)
}

// 任务大厅user/task
const userTask=data=>{
	
	return request('user/task',data,"GET",true)
}
// 任务大厅user/task
const userTasktwo=data=>{
	
	return request('user/task',data,"GET",true)
}

// user/personal/raffle/${id}
const personalRaffle=data=>{
	
	return request('user/personal/raffle/'+data,'',"GET",true)
}


// user/personal/raffle/${id}
const getUsertask=data=>{
	return request('user/task',data,"PUT",true)
}

//code查询invitation/code
const getuserCode=data=>{
	return request('invitation/code',data,"GET",true)
}
//team/user
const teamUser=data=>{
	return request('user/team/user',data,"GET",true)
}

//user/income_and_expenditure
const userIncome_and_expenditure=data=>{
	return request('user/income_and_expenditure',data,"GET",true)
}
// store/self
const storeSelf=data=>{
	return request('store/self',data,"GET",true)
}


// tax/time
const taxTime=data=>{
	return request('tax/time',data,"GET",true)
}

// tax/certificate
const userCertificate=data=>{
	return request('tax/certificate',data,"GET",true)
}
// app/latest/android
const getAppver=data=>{
	return request('app/latest/android','',"GET",true)
}

// /user/info
const Userinfo=data=>{
	return request('user/info',data,"put",true)
}

// user/bank
const UserBank=data=>{
	return request('user/bank',data,"GET",true)
}

// user/bank
const UserAddBank=data=>{
	return request('user/bank',data,"POST",true)
}
// /user/bank
const UserDeleBank=data=>{
	return request('user/bank/'+data,'',"DELETE",true)
}

// shopping/cart
const UserAddcart=data=>{
	return request('shopping/cart',data,"POST",true)
}
// shopping/cart
const UsercartList=data=>{
	return request('shopping/cart',data,"GET",true)
}

// shopping/cart/change_number
const UserchangeNumber=data=>{
	return request('shopping/cart/change_number',data,"PUT",true)
}

// shopping/cart/batch_delete
const UserbatchDelete=data=>{
	return request('shopping/cart/batch_delete',data,"DELETE",true)
}
// api/shopping/settlement
const UserSettlement=data=>{
	return request('shopping/settlement',data,"GET",true)
}

// shopping/cart/batch_check
const UserbatchCcheck=data=>{
	return request('shopping/cart/batch_check',data,"PUT",true)
}
// product/attribute/category
const shopCategory=data=>{
	return request('product/attribute/category/'+data.id,'',"GET",true)
}


// product/attribute/category
const healImg=data=>{
	return request('configuration/public/healthPublicImg',data,"GET",true)
}

// product/attribute/category
const configurationMess=data=>{
	return request('configuration/public/rafflePublicImg',data,"GET",true)
}


// payment/status

const paymentStat=data=>{
	return request('payment/status/'+data,'',"GET",true)
}

//新的物流接口
const newGetorderdeit=data=>{
	return request('order/'+data,'',"GET",true)
}
const newGetlogistic=data=>{
	return request('logistic/traces/'+data,'',"GET",true)
}

const getMessages=data=>{
	return request('messages','',"GET",true)
}

export default {
	IndexBanner,
	shopDeitals,
	getAddres,
	superiorArea,
	editaddress,
	getAddresInfo,
	addApiaddress,
	defaultAddres,
	genOrder,
	payDeitals,
	paycheck,
	diffSearch,
	seleStore,
	Seleorder,
	payuUnfinished,
	userProfit,
	userPoint,
	userBalance,
	userAuthed,
	userWithdraw,
	userApplication,
	userdeliverypackage,
	userReceipt,
	userInfo,
	useSignout,
	passLogin,
	loginCode,
	editPassword,
	userActivity,
	raffLeDeital,
	userTicket,
	raffleActivity,
	userRaffledetail,
	userTask,
	userTasktwo,
	personalRaffle,
	getUsertask,
	getuserCode,
	teamUser,
	userIncome_and_expenditure,
	storeSelf,
	taxTime,
	userCertificate,
	getAppver,
	getApplication,
	DeleAddres,
	Userinfo,
	UserBank,
	UserAddBank,
	UserDeleBank,
	UserAddcart,
	UsercartList,
	UserchangeNumber,
	UserbatchDelete,
	UserSettlement,
	UserbatchCcheck,
	shopCategory,
	healImg,
	configurationMess,
	paymentStat,
	newGetorderdeit,
	newGetlogistic,
	getMessages

}
