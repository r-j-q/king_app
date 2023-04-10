import { data } from 'browserslist';
import Request from '../request.js'
const request = new Request().http



/**
 * @param {String} _id 用户id
 * @description 支付
 */
export function pay(data) {
	return request('pay/wx/xcx', data, 'POST', true);
}
export function newpay(data) {
	return request('pay', data, 'POST', true);
}



/*
 * 记录一条分享
 */
export function share_log(data) {
	return request('usercenter/share/log', data, 'POST', true);
}

/**
 * 获取token
 */
export function login(data) {
	return request('auth/login', data, 'POST', true);
}
/**
 * 登录
 */
const logout = data => {
	return request('auth/logout', data, 'DELETE', true)
}

/*
 * getLoginSysUserInfo
 * 
 */
const getShoplist = data => {
	
	return request('store/hot_sale?page='+data.page.size+'&page_size='+data.page_size, data, 'get', true)
}

/*
 * 
 * 获取手机短信验证码
 */
const sendSms = data => {
	return request('sms_code', data, 'POST', true)
}
/*
 * 
 * 获取手机短信验证码登录
 */
const mobLogin = data => {
	return request('signin/mobile', data, 'POST', true)
}




/**
 * @param {String} _id 用户id
 * @param {String} oldPwd 旧密码
 * @param {String} newPwd 新密码
 * @description 修改密码
 */
const upsertPwd = data => {
	return request('login', data, 'POST')
}

/**
 * @param {String} phone 用户手机号
 * @param {String} code 验证码
 * @param {String} password 新密码
 * @description 忘记密码
 */
const forgetPwd = data => {
	return request('user/password/modify', data, 'PUT',true)
}

/**
 * @param {String} _id 用户id
 * @description 用户详情
 */
const userDetail = data => {
	return request('user/detail', data, 'POST')
}


/**
 * ai推荐记录
 */
const recommendedRecords = data => {
	return request('bkzs/t-sign-ai-record/query.rm', data, 'POST', true)
}
/**
 * 获取报告
 */
const receiveReport = data => {
	return request('bkzs/t-sign-in-advance-record/querySignSchoolList', data, 'POST', true)
}


/*
修改昵称
 */

const updateName=data=>{
	return request('usercenter/user/modify/nike/'+data.nike,'','GET',true)
}
/*
用户收藏院校
 */





const getProvinceAndCity=data=>{
	return request('base/t-com-gov-info/getProvinceAndCity',data,'GET',true)
}
//获取账户余额
const personBalance=data=>{
	return request('pay/wallet/balance',data,'post',true)
}
//申请提现
const sqApply=data=>{
	return request('pay/withdraw/deposit/apply',data,'post',true)
}
//关于我们
const minUs=data=>{
	return request('pay/flow/master/about/us',data,'get',true)
}
//获取分润总金额
const totAmount=data=>{
	return request('pay/share/benefit/sum/amount',data,'get',true)
}
//获取提现总金额
const totSum=data=>{
	return request('pay/withdraw/deposit/sum',data,'get',true)
}

const personList=data=>{
	return request('pay/withdraw/deposit/user/list',data,'post',true)
}
//
const pnameList=data=>{
	return request('pay/extension/user/list',data,'post',true)
}
//
const personLog=data=>{
	return request('pay/wallet/user/log',data,'post',true)
}
const coefficientline=data=>{
	return request('user/point/coefficient/line',data,'GET',true)
}
const statisticsline=data=>{
	return request('user/point/statistics/line',data,'GET',true)
}
const taskCenter=data=>{
	return request('user/task/center',data,'GET',true)
}

// user/authentication
const authentication=data=>{
	return request('user/authentication',data,'POST',true)
}

const Getauthentication=data=>{
	return request('user/authentication',data,'GET',true)
}




export default {
	login,
	logout,
	upsertPwd,
	forgetPwd,
	userDetail,
	getShoplist,
	sendSms,
	pay,
	
	recommendedRecords,
	receiveReport,
	
	share_log,
	updateName,
	
	
	
	newpay,
	getProvinceAndCity,
	personBalance,
	sqApply,
	minUs,
	totAmount,
	totSum,

	personList,
	pnameList,
	personLog,
	mobLogin,
	coefficientline,
	statisticsline,
	taskCenter,
	authentication,
	Getauthentication
	
}
