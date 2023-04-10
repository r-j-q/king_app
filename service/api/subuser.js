import Request from '../request.js'
const request = new Request().http



const subAapplication= data => {
	return request('sub_user/application', data, 'POST', true)
}

const subUserchild= data => {
	return request('user/sub_user', data, 'GET', true)
}



export default {
	subAapplication,
	subUserchild
	
}
