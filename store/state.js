const state = {
  access_token: '',//access_token
  forcedLogin:true,//是否需要强制登录
  default_avatar:"https://image.alhelp.net/1553090948000default_avatar.png",//默认头像
  platform:'mp',
  drivers:{},//设备信息
  refresh_group:false,//重新获取小组列表
  refresh_dynamic:false,//刷新动态列表
  group_id:0,
  audio_play_status:false,//音频播放状态
}
export default state
