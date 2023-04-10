// uni-app请求封装
import $config from '@/common/config'
// import store from '@/store'

export default class Request {
	http = (router, data = {}, method, noAuth) => {
		let header = $config.HEADER
		
		header[$config.TOKENNAME] = 'Bearer '+uni.getStorageSync('token')
		// 返回promise
		return new Promise((resolve, reject) => {
			// 请求
			uni.request({
				url: `${$config.SERVER_PATH}${router}`,
				data: data,
				method: method,
				header: noAuth ? header : '',
				success: (res) => {
					
					
						// var pages = getCurrentPages()
						// var currentPage = pages[pages.length - 1].route
						// let routerArr=['pages/my/shop','pages/incomEexpend/incomEexpend'];
					if (res.data.code ===200) {
						// 业务逻辑内代码：将结果抛出
						resolve(res.data)
					} else {
						if (res.data.code == '401') {
								
							resolve(res.data)
						} else if (res.data.code == '900003') {
							// 正常返回，这是因为要告知页面逻辑，当前是9003
							resolve(res.data)
						}else if (res.data.code == '999999') {

							resolve(res.data)
						} else {
							
							reject(res.data)
						}

					}
				},
				fail: reject
			})
		})
	}
}
