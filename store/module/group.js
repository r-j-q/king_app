const state = {
	group_info: {}, //群详情
	my_info:{},//我的信息
}

const mutations = {
	set_group_info(state, data) {
		state.group_info = data
	},
	set_my_info(state, data){
		state.my_info = data
	}
}

const actions = {
	//
}
export default {
	state,
	mutations,
	actions
}
