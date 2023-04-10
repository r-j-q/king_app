<template>
	<view class="add-content">

		<aylottery :addid="raid" :ticketnums="ticketnums" :point="point" :type="3" :list="list_r" :height="600" :width="600" :chance_num_init="chance_num_init" @result="resultFun_chance"
		 @toDetailPage="toDetailPage" :stay_index="stay_index_r"></aylottery>
		<!-- <view class="grNums">
			 <view class="zf-hg">
			 	自动抽奖
			 </view>
			 <view class="syfd">
				 <text class="">剩余抽奖券:{{ticketnums}}/张</text>
				 <text style="padding-left: 20upx" class="">剩余积分:{{point}}</text>  
			 </view>
		 </view> -->
		 <view class="exct">
			 <view class="potick">
			 	<view>
			 					 剩余抽奖券: {{ticketnums}}/张
			 	</view>
			 	<view>
			 					 剩余代金券: {{point}}
			 	</view>
			 </view>
			 
			 <view>1，一次报名组团消耗抽奖券1张，5元代金券1张 </view>
			 <view>2，组团成功获得，2倍积分奖励 </view>
			 <view>3，组团失败获得，100积分+1张抽奖券奖励 </view>
			 <view class="">
			 	4，本组团活动由纳零王者系统平台联合各商家定期举行组团开展广告营销推广等服务，最终解释权归纳零王者系统所有
			 </view>
			 
		 </view>
	</view>
</template>

<script>
	import aylottery from '@/components/ay-lottery/ay-lottery.vue';
	export default {
		components: {
			aylottery,
		},

		data() {
			return {
				init_show_blow:false ,//刮一刮重置
				result_img_blow: 'https://cdn.pixabay.com/photo/2021/01/04/07/38/lily-5886728__340.jpg',
				is_show_blow: false, //防止画布画好前闪烁
				themeColor: '#33CCCC',
				txtFontSize_blow: 50,
				txtColor_blow: '#FFFFFF',

				stay_index_m : 1 ,//跑马灯
				stay_index_r_init: 4,
				stay_index_r: 1,
				stay_index_m_init : 4,
				tips_init_turn: '点击',
				no_z_init_turn: '点击',
				result_turn: '',
				result_blow: '谢谢参与',
				chance_num_init: 6,
				raid:'',
				is_enabled:1,
				is_used:0,
				page:1,
				page_size:1000,
				ticketnums:0,
				point:0,
				list: [{
					img: "https://cdn.pixabay.com/photo/2017/01/21/13/55/nature-1997282__340.jpg",
					name: "不要指望他",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2021/01/11/21/39/temple-5909803__340.jpg",
					name: "你在开玩笑么？",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2020/01/13/23/15/snowboarding-4763731__340.jpg",
					name: "可怕",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/17/12/04/winter-6024017__340.jpg",
				}, {

					img: "https://cdn.pixabay.com/photo/2019/11/30/21/37/stars-4664313__340.jpg",
					name: "可能",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/13/10/26/snow-6011069__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_640.jpg",
					name: "不用担心",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/13/01/29/woman-6010056__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2021/01/24/21/52/grand-canyon-5946657__340.jpg",
					name: "答案就在你身边",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/13/01/29/woman-6010056__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2021/01/14/20/32/fish-5917864__340.jpg",
					name: "大胆一点",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/13/01/29/woman-6010056__340.jpg",
				}, {
					img: "https://cdn.pixabay.com/photo/2020/01/03/21/32/field-4739176__340.jpg",
					name: "好运将会降临",
					img_bg: "https://cdn.pixabay.com/photo/2021/02/13/10/26/snow-6011069__340.jpg",
				}],
				list_r: [{
						index: 0,
						name: '奖励100积分+1抽奖券',
						isAward: true,
						val: 1,
						type: 1,
						img: '/static/z1.png',
					},
					{
						index: 1,
						name: '奖励2倍积分',
						isAward: false,
						type: 0,
						img: '/static/z2.png',
					},
					{

						index: 2,
						name: '奖励100积分+1抽奖券',
						val: 2,
						isAward: true,
						type: 2,
						img: '/static/z1.png',
					},
					{

						index: 3,
						name: '奖励2倍积分',
						isAward: false,
						type: 0,
						img: '/static/z2.png',
					},
					{
						index: 4,
						name: '奖励100积分+1抽奖券',
						val: 2,
						isAward: true,
						type: 1,

						img: '/static/z1.png',
					},
					{
						index: 5,
						name: '奖励2倍积分',
						isAward: false,
						type: 0,
						img: '/static/z2.png',
					},
					{

						index: 6,
						name: '奖励100积分+1抽奖券',
						val: 4,
						isAward: true,
						type: 1,

						img: '/static/z1.png',
					},
					{
						index: 7,
						name: '奖励2倍积分',
						isAward: false,
						type: 0,
						img: '/static/z2.png',
					},
					{
						index: 8,
						name: '奖励100积分+1抽奖券',
						val: 5,
						isAward: true,
						type: 2,
						img: '/static/z1.png',
					},
					{
						index: 9,
						name: '奖励2倍积分',
						isAward: false,
						type: 0,
						img: '/static/z2.png',
					},
				],
			}
		},
		onLoad(options) {
			let that = this;
			if(options.id !=undefined)
			{
				this.raid=options.id
			}

		},
		created() {
			this.loadData();
			this.raffLeDeital();
			
			
			this.userTicket();
			this.userPoint();
			
		},
		onShow() {

		},
		onReady: function() {
			let that = this;

			//#ifndef MP-WEIXIN
			setTimeout(function() {
				//that.$refs.blowRef.initBlow()
			}, 50)
			// #endif

		},
		methods: {
			
			userPoint()
			{
				this.api.interactive.userPoint().then(res=>{
					
					if(res.code===200)
					{
						
						this.point=res.data.remain_points
						
					}
				})
			},
			userTicket()
			{
				this.api.interactive.userTicket({
					is_enabled:this.is_enabled,
					is_used:this.is_used,
					page:this.page,
					page_size:this.page_size
				}).then(res=>{
					
					if(res.code===200)
					{
						this.ticketnums=res.data.total
					}
				})
			},
			
			
			raffLeDeital()
			{
				return
				if(this.raid !=undefined)
				{
					this.api.interactive.raffLeDeital(this.raid).then(res=>{
						console.log('抽奖数据是',res)
					})
				}
			},
			reset: function() {
				this.$refs.card.init();
			},

			seatShow: function() {

			},
			toDetailPage(e) {
				let list = e.list;
				let idx = e.curIndex;
				let list_img = [];
				let item = e.item;

				list.forEach(item => {
					list_img.push(item.img)
				})
				if (list_img && list_img.length > 0) {
					uni.previewImage({
						current: list_img[idx], //  传 Number H5端出现不兼容
						urls: list_img,
						indicator: "number",
						loop: true,
					});
				}
			},

			again_turn(e) {
				let that = this;
				that.result_turn = '';
				that.no_z_init_turn = that.tips_init_turn;
			},
			show_turn(e) {
				let that = this;
				if (e.result == 1) {

					that.result_turn = that.getShowTxt();
				} else {
					that.no_z_init_turn = '谢谢参与';
				}

			},
			getShowTxt() {
				let that = this;
				//随机获取list的值
				let num = Math.floor(Math.random() * 10); //可均衡获取0到9的随机整数
				let legth = that.list.length || 0;
				let index = num < legth ? num : (legth - 1);
				return that.list[index].name || '哈哈'
			},
			resultFun(e) {
				let that = this;
				let item = e.item;
				let list = e.list;
				
				this.msg_modal("抽中了" + item.name, '恭喜您')
				//定义下一次转的位置
				that.stay_index_m = Math.round(Math.random() * (list.length - 1)); //随机数
				
			},
			resultFun_chance(e) {
				let that = this;
				let item = e.item;
				let index = e.curIndex;
				let list = e.list;

				//定义下一次转的位置
				that.stay_index_r = Math.round(Math.random() * (list.length - 1)); //随机数
				
				if (e.data=="win" || e.data=='wait') {
					
					that.userTicket();
					that.userPoint();
				}
			},
			async loadData() {
				let that = this;

				uni.showLoading({
					title: '加载中',
					mask: true,
				})

				that.result_blow = that.getShowTxt();
				that.result_blow = that.getShowTxt();

				uni.hideLoading();

				//第一次转盘停的位置
				that.stay_index_r = that.stay_index_r_init;
				that.stay_index_m = that.stay_index_m_init;
				
				that.isLoaded = true;

			},
			msg_modal(content, title = '温馨提示') {
				//统一提示方便全局修改
				if (Boolean(content) === false) {
					return;
				}
				uni.showModal({
					title: title,
					content: content,
					confirmText: '确定',
					showCancel: false,
					confirmColor: '#33CCCC',
					success(res) {
						if (res.confirm) {

						}
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	// 刮自定义
		
	.add-content{
		
		background: linear-gradient(to bottom,#e6443f,#ee8144,#ee8144);
		padding: 40upx;
		height: 100vh;
	}
	.grNums{
		// padding-top: 40upx;
		// padding-bottom: 40upx;
		background: #2F5597;
		border: 12upx solid #f5f5f5;
		border-radius: 20upx;
		width: 500upx;
		height: 120upx;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 40upx auto;
		color: #FFFFFF;
		
	}
	.exct{
		padding-top: 40upx;
		padding-bottom: 40upx;
		line-height: 60upx;
		color: #FFFFFF;
	}
	.potick{
		margin: 50upx 0;
		font-size: 36upx;
		font-weight: bold;
	}
	.blow {

		background-size: contain;
		margin: 0rpx auto;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;

		.box {
			width: 100%;
			height: 100%;
			// background: #aaaa7f;
			border-radius: 10rpx;
			position: relative;
			overflow: hidden;

			.result {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				// font-size: 50rpx;
				// color: #FFFFFF;
			}


		}


	}

	.box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.cf-bgcolorTheme {
		background-color: #33CCCC;
		color: #FFFFFF;
	}
	.reset-blow-box{
		width: 100%;
		text-align: center;
		margin: 50upx auto;
	}
	.zf-hg{
		font-size: 32upx;
	}
	.syfd{
		font-size: 26upx;
		color: #921F00;
		padding-top: 10upx;
	}
</style>
