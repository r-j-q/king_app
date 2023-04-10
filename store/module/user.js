const state = {
	userinfo: {}, //用户信息
	hasLogin: false,
	user_token: '',
	agent_info: {}, //代理信息
	agent_id: 0, //代理id
	oauth_info: {}, //第三方登录信息
	library_list: [], //词库列表
}

const mutations = {
	//登录成功
	login_success(state, data) {
		if (!data) {
			state.userinfo = {}
			state.hasLogin = false
			state.user_token = ''
			uni.removeStorageSync('token')
			uni.removeStorageSync('oauth_info')
			uni.removeStorageSync('userinfo')
			uni.removeStorageSync('token')
			uni.removeStorageSync('nickName')
			uni.removeStorageSync('avatarUrl')
			uni.removeStorageSync('sign')
			uni.removeStorageSync('member_id')
		} else {
			state.userinfo = data
			state.hasLogin = true
			state.user_token = data.token
			uni.setStorageSync('userinfo', data)
			uni.setStorageSync('token', data.token)
			uni.setStorageSync('nickName', data.nickName)
			uni.setStorageSync('avatarUrl', data.avatarUrl)
			uni.setStorageSync('sign', data.sign)
			uni.setStorageSync('member_id', data.member_id)
		}
	},
	//代理信息
	set_agent_info(state, data) {
		state.agent_info = data
	},
	//代理id
	set_agent_id(state, data) {
		state.agent_id = data
	},
	//第三方登录信息
	set_oauth_info(state, data) {

		state.oauth_info = data
	},
	set_library_list(state, data) {
		state.library_list = data
	},
}

const actions = {
	//
}
export default {
	state,
	mutations,
	actions
}
