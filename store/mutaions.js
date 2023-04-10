const mutations = {
  set_access_token (state, data) {
    state.access_token = data
  },
  //退出登录
  log_out(state, data){
    // #ifndef APP-PLUS
    uni.clearStorage()
    // #endif 
    console.log(state,'state');
	  state.user.userinfo = {}
	  state.user_token = ""
	  state.user.hasLogin = false
  },
  set_platform(state,data){
  	state.platform = data;
  },
  set_drivers(state,data){
	  state.drivers = data;
  },
  set_refresh_group(state,data){
	  state.refresh_group = data;
  },
  set_refresh_dynamic(state,data){
	  state.refresh_dynamic = data;
  },
  set_group_id(state,data){
	  state.group_id = data;
  },
  set_audio_play_status(state,data){
    state.audio_play_status = data;
  },
  set_video_times(state,data){
	  state.video_times=data
  },
  set_task_ids(state,data){
  	  state.ste_task_ids=data
  },
  set_watch_type(state,data){
  	  state.watch_type=data
  },
  set_edit_pwd(state,data){
  	  state.edit_pwd=data
  },
  set_tab_user(state,data){
  	  state.tab_user=data
  },
  set_user_avater(state,data){
  	  state.user_avater=data
  }
  
}
export default mutations
