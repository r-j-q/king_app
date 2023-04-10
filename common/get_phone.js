/**
 * @description 微信小程序的获取手机号码
 */
export function onGetPhoneNumberWX(e, that, path) {
	path = path || ''
	if (e.detail.errMsg == "getPhoneNumber:fail user deny" || e.detail.errMsg == "getPhoneNumber:user deny" || e.detail
		.errMsg == "getPhoneNumber:fail:user deny") {
				//用户决绝授权——跳转到【手输号码】页
				uni.navigateTo({
					url: '/pages/user/login/index'
				})
	} else {
				//允许授权
				//console.log(e.detail)
				//第二次请求
				let extraData = {
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
				}
				//看是否有分享数据
				if (uni.getStorageInfoSync().keys.indexOf('share_data') > -1) {
					//extraData['sharedUserId'] = uni.getStorageSync('share_id')
					//extraData['shareBusiType'] = uni.getStorageSync('shareBusiType')
					extraData['shareType'] = 1 //微信小卡片
					//把share_data全部丢给extraData
					Object.assign(extraData, uni.getStorageSync('share_data'))
				}
				// #ifdef  MP-WEIXIN

				let  tk=uni.getStorageSync('token')
				let uu=uni.getStorageSync('uuid')
				if (tk && uu)
				{
					that.api.user.login({
						loginType: 'BIND_PHONE',
						uuid: uni.getStorageSync('uuid'),
						extraData: extraData,
						appType: uni.getStorageSync('appType'),
						'u':uni.getStorageSync('obj_pc'),
						't':2

					}).then(
						res => {
							console.log('个人中心传参传参是是是11',uni.getStorageSync('obj_pc'))

							uni.setStorageSync('token', res.data.access_token)
							uni.setStorageSync('uuid', res.data.uuid)
							//uni.setStorageSync('tel', res.tel)
							//移除 - 推荐
							uni.removeStorageSync('share_id')
							uni.removeStorageSync('shareBusiType')
							uni.setStorageSync('ntoken', 1)
							uni.removeStorageSync('obj_pc')

							setTimeout(function() {
								that.utils.utils.get_sys_userinfo(that, path)
							}, 100)

							if (path == 'home') {
								that.is_9003 = false
							}
						},
						err => {
							console.log('失败：', err)
							if (path == 'home') {
								that.is_9003 = true
							}
						}
					)
				}else {
					wx.login({
						success: (res) => {
							if (res.code) {
								let wxCode = res.code;
								that.api.user.login(
									{
										'loginType': 'WECHAT_APPLET',
										'appType': uni.getStorageSync('appType'),
										'authCode': wxCode,
										'u':uni.getStorageSync('obj_pc'),
										't':2
									}
								).then(res => {
									console.log('个人中心传参传参是是是22',uni.getStorageSync('obj_pc'))
									if (res.code === 100000) {
										uni.setStorageSync('token', res.data.access_token)
										uni.setStorageSync('uuid', res.data.uuid)
										//移除 - 推荐
										uni.removeStorageSync('share_id')
										uni.removeStorageSync('shareBusiType')
										setTimeout(function() {
											that.utils.utils.get_sys_userinfo(that, path)
										}, 100)

										if (path == 'home') {
											that.is_9003 = false
										}
										that.api.user.login({
											loginType: 'BIND_PHONE',
											uuid: uni.getStorageSync('uuid'),
											extraData: extraData,
											appType: uni.getStorageSync('appType'),
											'u':that.obj_pc??uni.getStorageSync('obj_pc'),
											't':2
										}).then(
											res => {
												uni.setStorageSync('token', res.data.access_token)
												uni.setStorageSync('uuid', res.data.uuid)
												uni.setStorageSync('ntoken', 1)
												uni.removeStorageSync('obj_pc')

												setTimeout(function() {
													that.utils.utils.get_sys_userinfo(that, path)
												}, 100)
												if (path == 'home') {
													that.is_9003 = false
												}
											},
											err => {
												console.log('失败：', err)
												if (path == 'home') {
													that.is_9003 = true
												}
											}
										)

										// 把个人信息存到全局备用
										that.api.user.getLoginSysUserInfo().then(res => {
											console.log('getLoginSysUserInfo的返回iiii：', res)
											//请求成功，不显示登录按钮，而是用户信息
											if (res.code === 100000) {
												let sys_user = res.data.sysUser
												getApp().globalData.avatar = sys_user.avatar
												getApp().globalData.nickName = sys_user.nickName
												getApp().globalData.user_id = sys_user.userId
												// 带星号的手机号码 phoneNumber
												getApp().globalData.tel = sys_user.phoneNumber
											}

										})
									} else {
										uni.removeStorageSync('token')
										uni.removeStorageSync('uuid')
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
									}
								})

							}
						}
					})
				}

				// #endif





	}
}


export function new_onGetPhoneNumberWX(e, that, path) {
	return new Promise((resolve, reject) => {
		//getPhoneNumber:fail user deny
		path = path || ''
		if (e.detail.errMsg == "getPhoneNumber:fail user deny" || e.detail.errMsg == "getPhoneNumber:user deny" || e.detail
			.errMsg == "getPhoneNumber:fail:user deny") {
			//用户决绝授权——跳转到【手输号码】页
			uni.navigateTo({
				url: '/pages/user/login/index'
			})
		} else {
			//允许授权
			//console.log(e.detail)
			//第二次请求
			let extraData = {
				encryptedData: e.detail.encryptedData,
				iv: e.detail.iv,
			}
			//看是否有分享数据
			if (uni.getStorageInfoSync().keys.indexOf('share_data') > -1) {
				extraData['shareType'] = 1 //微信小卡片
				Object.assign(extraData, uni.getStorageSync('share_data'))
			}
			// #ifdef  MP-WEIXIN
			let  tk=uni.getStorageSync('token')
			let uu=uni.getStorageSync('uuid')
			if (tk && uu)
			{
				console.log('step11',extraData)
				that.api.user.login({
					loginType: 'BIND_PHONE',
					uuid: uni.getStorageSync('uuid'),
					extraData: extraData,
					appType: uni.getStorageSync('appType'),
					'u':that.obj_pc??uni.getStorageSync('obj_pc'),
					't':2
				}).then(
					res => {
						uni.setStorageSync('ntoken', 1)
						uni.removeStorageSync('obj_pc')

						resolve(res.data)
					},
					err => {
						reject(res.code)
					},

				)
			}else {
				wx.login({
					success: (res) => {
						if (res.code) {
							let wxCode = res.code;
							that.api.user.login({
								'loginType': 'WECHAT_APPLET',
								'appType': uni.getStorageSync('appType'),
								'authCode': wxCode,
								'u':uni.getStorageSync('obj_pc'),
								't':2
							}).then(res => {

								if (res.code === 100000) {
									uni.setStorageSync('token', res.data.access_token)
									uni.setStorageSync('uuid', res.data.uuid)
									//移除 - 推荐
									uni.removeStorageSync('share_id')
									uni.removeStorageSync('shareBusiType')
									setTimeout(function () {
										that.utils.utils.get_sys_userinfo(that, path)
									}, 100)

									if (path == 'home') {
										that.is_9003 = false
									}
									that.api.user.login({
										loginType: 'BIND_PHONE',
										uuid: uni.getStorageSync('uuid'),
										extraData: extraData,
										appType: uni.getStorageSync('appType'),
										'u':uni.getStorageSync('obj_pc'),
										't':2
									}).then(
										res => {
											uni.setStorageSync('ntoken', 1)
											uni.removeStorageSync('obj_pc')

											resolve(res.data)
										},
										err => {
											if (path == 'home') {
												that.is_9003 = true
											}
											reject(res.code)
										}
									)

									// 把个人信息存到全局备用
									that.api.user.getLoginSysUserInfo().then(res => {
										//请求成功，不显示登录按钮，而是用户信息
										if (res.code === 100000) {
											let sys_user = res.data.sysUser
											getApp().globalData.avatar = sys_user.avatar
											getApp().globalData.nickName = sys_user.nickName
											getApp().globalData.user_id = sys_user.userId
											// 带星号的手机号码 phoneNumber
											getApp().globalData.tel = sys_user.phoneNumber

											uni.setStorage({
												key: 'userinfo',
												data: sys_user,
											})
										}

									})
								} else {
									uni.removeStorageSync('token')
									uni.removeStorageSync('uuid')
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}
							})

						} else {

						}
					}
				})
			}

			// #endif


		}

	})
}

/**
 * @description 【APP-uniapp】手机号码的预登录
 */
export function preGetPhoneByUni(that) {
	uni.preLogin({
		provider: 'univerify',
		success() { //预登录成功
			that.canGetPhone = true
		},
		fail(res) { // 预登录失败
			// 不显示一键登录选项（或置灰）
			// 根据错误信息判断失败原因，如有需要可将错误提交给统计服务器
			console.log(res.errCode)
			console.log(res.errMsg)
			that.canGetPhone = false
		}
	})
}


/**
 * @description 【APP-uniapp】获取手机号码
 */
export function getPhoneNumberByUni(that) {
	let util_this = this
	//如果预登录已经判定不可用，就不再往下走了
	if (!that.canGetPhone) {
		getTelFail('预登录错误')
		return
	}
	uni.login({
		provider: 'univerify',
		univerifyStyle: { // 自定义登录框样式
			"icon": {
				"path": ""
			},
			"privacyTerms": {
				"defaultCheckBoxState": "false",
			},
			//fullScreen: true,//控制全屏
			"authButton": {
				"normalColor": "#0CCDA3",
			},

		},
		success(res) { // 登录成功
			console.log(res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
			uniCloud.callFunction({
				name: 'get_phone', // 你的云函数名称
				data: {
					'access_token': res.authResult.access_token, // 客户端一键登录接口返回的access_token
					'openid': res.authResult.openid // 客户端一键登录接口返回的openid
				}
			}).then(res => {
				if (res.result.success) {
					let tel = res.result.tel;
					//uni.setStorageSync('tel', tel);
					console.log('云函数返回结果：', tel);
					uni.hideLoading();
					uni.closeAuthView()

					//绑定手机
					that.api.user.login({
						loginType: 'PHONE_AUTH',
						//uuid: uni.getStorageSync('uuid'),
						phoneNumber: tel,
						appType: uni.getStorageSync('appType')
					}).then(
						res => {
							console.log('绑定手机号码：', res)
							if (res.code == 100000) {
								console.log('绑定成功')
								uni.setStorageSync('token', res.data.access_token)
								uni.setStorageSync('uuid', res.data.uuid)

								that.utils.utils.get_sys_userinfo(that)


							}
						},
						err => {
							console.log('失败：', err)
						}
					)
				} else {
					getTelFail('云函数获取号码错误')
				}
			}).catch(err => {
				// 处理错误
				getTelFail('调用云函数错误');
				console.log(err)
			})
		},
		fail(res) { // 登录失败
			console.log(res.errCode)
			console.log(res.errMsg)
			getTelFail('前端登录api错误');
		}
	})
}

function getTelFail(err) {
	console.log('获取手机号码错误：', err)
	uni.hideLoading();
	uni.closeAuthView();
	uni.navigateTo({
		url: '/pages/user/login/index'
	})
}
export default {
	onGetPhoneNumberWX,
	getPhoneNumberByUni,
	preGetPhoneByUni,
	new_onGetPhoneNumberWX

}
