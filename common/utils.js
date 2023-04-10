import get_phone from './get_phone.js'
import $config from '@/common/config'

const utils = {

	/**
	 * @description 绑定手机号码后，获取用户信息，并与视图绑定
	 */
	get_sys_userinfo(that, path) {
		path = path || ''
		that.api.user.getLoginSysUserInfo().then(res => {
				console.log('getdfdfd的返回：', res)
				//请求成功，不显示登录按钮，而是用户信息
				if (res.code == 100000) {
					uni.setStorage({
						key: 'userinfo',
						data: res.data.sysUser,
					})
					if (path == '' || path == 'my') {
						//不是来自【设置】
						console.log('res.data.sysUser.nickName',res.data.sysUser.nickName)
						that.no_user = false
						that.userInfo.nickName = res.data.sysUser.nickName
						// that.userInfo.nickName = res.data.sysUser.nickName
						that.user_id = res.data.sysUser.userId
						that.user_status = res.data.sysUser.status
						that.phoneNumber= res.data.sysUser.phoneNumber
						getApp().globalData.user_id = that.user_id
						//头像
						that.avatar = res.data.sysUser.avatar
					} else if (path == 'setting') {
						//来自【设置】
						let list = that.list
						for (let i = 0; i < list.length; i++) {
							if (list[i]['name'] == '昵称') {
								list[i]['text'] = res.data.sysUser.nickName
							} else if (list[i]['name'] == '绑定手机') {
								list[i]['text'] = res.data.sysUser.phoneNumber
							}
						}
						that.list = list
						//头像
						that.avatar = res.data.sysUser.avatar
					}else if (path == 'get_my_id'){
						that.user_id = res.data.sysUser.userId
						//头像
						that.avatar = res.data.sysUser.avatar
					}
				} else {
					that.no_user = true
				}
			},
			err => {
				console.log('getLoginSysUserInfo的错误返回：', err)
				that.no_user = true
			})
	},

	/**
	 * @description 设置头像
	 */
	set_avatar(that) {
		//弹起选择图片
		uni.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			success: async (chooseImageRes) => {
				const tempFilePaths = chooseImageRes.tempFilePaths
				console.log(tempFilePaths)
				let header = $config.HEADER
				header[$config.TOKENNAME] = uni.getStorageSync('token')
				//发起上传请求
				uni.uploadFile({
					url: $config.SERVER_PATH + 'usercenter/user/profile/avatar',
					filePath: tempFilePaths[0],
					name: 'avatarfile',
					header: header,
					success: (uploadFileRes) => {
						const res = JSON.parse(uploadFileRes.data)
						console.log(res)
						if (res.code == 100000) {
							that.avatar = res.imgUrl
							uni.showToast({
								title: '设置成功！'
							})
						} else {
							uni.showToast({
								title: '设置失败，请重试'
							})
						}

					}
				});
			}
		})
	}

}


export default {
	utils,
	get_phone

}
