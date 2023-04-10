import Request from '../request.js'
const request = new Request().http




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

// store/application
const storeApp = data => {
	return request('store/application', data, 'GET', true)
}


const pointApp = data => {
	return request('store/point', data, 'GET', true)
}
// tore/sales_amount
const toreApp = data => {
	return request('store/sales_amount', data, 'GET', true)
}

//店铺订单

const orderApp = data => {
	return request('store/order/', data, 'GET', true)
}

// api/store
const storeAet = data => {
	return request('store/'+data, '', 'GET', true)
}
// store/1/info
const infoAet = data => {
	return request('store/'+data.id+'/info', data, 'put', true)
}
// api/store
const manageApp = data => {
	return request('store/'+data.id+'/product', data, 'GET', true)
}
// store/self/product
const productAPP = data => {
	return request('store/self/product', data, 'PUT', true)
}
export default {
	login,
	logout,
	storeApp,
	pointApp,
	toreApp,
	orderApp,
	storeAet,
	infoAet,
	manageApp,
	productAPP
	
}
