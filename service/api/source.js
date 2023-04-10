import Request from '../request.js'
const request = new Request().http


/*
 * 获取token
 */
export function login(data) {
	return request('auth/login', data, 'POST', true);
}

// api/store
const sourcede = data => {
	return request('source/'+data, '', 'GET', true)
}

// api/store
const sourceList = data => {
	return request('source', data, 'GET', true)
}
// store/self/product
const productAPP = data => {
	return request('store/self/product', data, 'PUT', true)
}
const sourcePrise = data => {
	return request('source/praise/'+data.id, data, 'POSt', true)
}

const sourceWatch = data => {
	return request('source/watch/'+data.id, data, 'POSt', true)
}
// source/comment

const sourceComment = data => {
	return request('source/comment/'+data.id, data, 'POSt', true)
}

const getComment = data => {
	return request('source/comment/'+data.id,data, 'GET', true)
}
// source/download

const sourceDownload =data=>{
	return request('source/download/'+data.id, data, 'POSt', true)
}
const sourceShare =data=>{
	return request('source/share/'+data.id, data, 'POSt', true)
}

const sourceCategory =data=>{
	return request('admin/source/category', data, 'get', true)
}


const usercancel =data=>{
	return request('withdraw/application/'+data+'/cancel', '', 'PUT', true)
}

export default {
	login,
	sourceList,
	sourcede,
	sourcePrise,
	sourceWatch,
	sourceComment,
	getComment,
	sourceDownload,
	sourceShare,
	sourceCategory,
	usercancel
	
}
