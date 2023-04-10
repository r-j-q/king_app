// 开发环境为true 生产环境为false
const DEBUG = true
// 请求接口地址
const SERVER_PATH = DEBUG ? 'https://' : 'https://'
const os = uni.getSystemInfoSync()
		console.log('ossssssss',os)
export default {
	/**
	 * @description 开发环境为true 生产环境为false
	 */
	DEBUG,
	/**
	 * @description app名称
	 */
	APPNAME: '',
	/**
	 * @description app描述
	 */
	APPDESC: '',
	/**
	 * @description app图标
	 */
	APPICON: SERVER_PATH + '/wechat/img/app-icon.png',
	/**
	 * @description 图片路径
	 */
	IMG_PATH: SERVER_PATH + '/upload/',
	/**
	 * @description 加载失败默认图片
	 */
	IMG_ERROR: '/images/error/error',
	/**
	 * @description 请求接口地址
	 * 阿里云正式服务api ：https://www.alhelp.net/bkzs/api/
	 * 本地：http://192.168.87.100:80/prod-api/
	 */
	
	// 以下配置在不做二开的前提下,不需要做任何的修改
	
	//#ifdef H5
		 SERVER_PATH: '/api/',
	//#endif
	// ISPATH:'https://test-wangzhe-web.nlwzxt333.com',
	ISPATH:'https://wangzhe-web.nlwzxt333.com',
	//#ifdef APP-PLUS
	
		 // SERVER_PATH: 'https://wangzhe-web.nlwzxt333.com/api/',
		 SERVER_PATH: 'https://test-wangzhe-web.nlwzxt333.com/api/',
	//#endif
	HEADER: {
		"content-type": "application/json",
		//#ifdef H5
		"Form-type": navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1 ?
			"wechat" : "h5"
		//#endif
		//#ifdef MP
		"Form-type": "routine",
		//#endif
		//#ifdef APP-VUE
		"Form-type": "app",
		//#endif
		//#ifdef APP-PLUS
		 "x-app-version": os.appWgtVersion,	 
		//#endif
		
	},
	// 回话密钥名称 请勿修改此配置
	TOKENNAME: "Authorization",
	/**
	 * @description 分页 每次加载的数据量
	 */
	PAGESIZE: 10,
	/**
	 * @description 接口超时时间 毫秒
	 */
	TIMEOUT: 120000, // 接口超时时间 毫秒
	/**
	 * @description 微信开发者Id
	 */
	WCHAT_ID: DEBUG ? '' : '', // 微信开发者Id
	/**
	 * @description 微信小程序Id
	 */
	MINI_APPID: DEBUG ? '' : '', // 微信小程序Id
	/**
	 * @description 微信小程序原始id
	 */
	MINI_ORIGIN_ID: 'gh_08193d13f466', // 微信小程序Id


}
