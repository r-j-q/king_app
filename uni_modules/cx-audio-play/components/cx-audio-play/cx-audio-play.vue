<template>
	<!--音频组件-->
	<view>
		<view class="bgfff">
			<view>
				<view class="audo-video">

					

					<view class="mp3Img">
						<image src="../../../../static/mp3.jpg"></image>
					</view>

					<!--音频api处[视频代替音频-实现倍数功能]-->
					<video id="myVideo" ref="myVideo" :src=recorPath class="hidden" @timeupdate="timeupdate"
						:autoplay="autoplays"   @ended="next" controls
						style="width: 10rpx;height:10rpx;">
					</video>
					<!--音频api处[视频代替音频-实现倍数功能]-->



					<view class="audo-a" style="margin:0 auto;">

						<!--进度条-->
						<view class="slider-box">
							<text class="mm">{{timer}}</text>
							<slider style="width:67vw;" @change="sliderChange" @changing="sliderChanging"
								class="audio-slider" block-size="16" :min="0" :max="duration" :value="currentTime"
								activeColor="#FFA929" @touchstart="lock= true" @touchend="lock = false" />
							<text class="ss" v-if="overTimer!='NaN:NaN'">{{overTimer}}</text>
							<text class="ss" v-else>00.00</text>
						</view>
						<!--进度条-->


						<!--倍数-->
						<view v-if="false" class="beishu" style="border:3rpx solid #C8C9CC;" @click="beishu">{{BsNav[bsindex].bs}} X
						</view>
						<view class="absolute" style="right:0;top:80rpx;" v-if="shows">
							<!-- 	<u-transition :show="show" mode="slide-right" duration="300"> -->
							<view class="beishu-a" style="border:2rpx solid #C8C9CC;" v-if="show">
								<view v-for="(item,index) in BsNav" :key="index" @click="setRate(index,item)"
									class="title" :style="{color:bsid==item.id?'#8D48FE':''}">
									{{item.bs}} X
								</view>
							</view>
							<!-- 	</u-transition> -->
						</view>
						<!--倍数-->
						
						
						

					</view>
					<!--音频播放按钮处-->
					<view class="audo-top">
						<!--上一首切换按钮-->
						<image class="syimg" v-if="jian" @click="nosig" src="/static/sys.png" mode="aspectFill"></image>
						<image class="syimg" v-else @click="sig" src="/static/xys.png" style="transform:rotate(180deg)"
							mode="aspectFill"></image>
						<!--上一首切换按钮-->
					
						<!--快退按钮-->
						<image src="/static/kt.png" mode="aspectFill" @click="kt()"></image>
						<!--快退按钮-->
					
						<!--播放按钮-->
						<image class="bzSty" :src="succes?'/static/zt.png':'/static/bofang2.png'" mode="aspectFill"
							style="width:180rpx;height:180rpx;" @click="plays()"></image>
							
							<!-- <image class="bzSty" :src="succes?'/static/bofang2.png':'/static/zt.png'" mode="aspectFill"
								style="width:180rpx;height:180rpx;" @click="plays()"></image> -->
						<!--播放按钮-->
					
						<!--快进按钮-->
						<image src="/static/kj.png" mode="aspectFill" @click="kj()"></image>
						<!--快进按钮-->
					
						<!--下一首切换按钮-->
						<image class="syimg" v-if="jia" @click="noxig" style="transform:rotate(180deg)" src="/static/sys.png"
							mode="aspectFill"> </image>
						<image class="syimg" v-else src="/static/xys.png" @click="xig" mode="aspectFill"></image>
						<!--下一首切换按钮-->
					</view>
					<!--音频播放按钮处-->
				</view>
			</view>
		</view>
		<view class="h-100"></view>
		<!--占位-->
	</view>
	<!--音频组件 Author:chenxin-->
</template>

<script>
	/*
	 list      --   音频文件传入 不传无法播放/数组形式
	 Faskms    --   快进秒数 number 默认15秒
	 Slowms	   --   快退秒数 number 默认15秒
	 autoplays --   是否自动播放 - 默认false
	 slideYes  --   滑动进度条时是否开启播放 - 默认false
	 switAud   --   切换上下音频是否开启播放 - 默认false
	 BsNav     --   倍数数据传入/数组形式
	 
	 按钮图片未自定义，如想改动请在组件内部修改，页面头部已注释 -- 逻辑根据自己需求改
	 目前只测试 微信小程序和H5 -- 其他平台未知
	  Author:chenxin  交流vx:cxalq8-24  
	*/
	export default {
		name: "cx-audio-play",
		props: {
			list: { //音频数据
				Type: Array,
				default: () => []
			},
			Faskms: { //快进秒数
				Type: Number,
				default: 15,
			},
			Slowms: { //快退秒数
				Type: Number,
				default: 15,
			},
			autoplays: { //是否开启自动播放
				Type: Boolean,
				default: true,
			},
			slideYes: { //滑动进度条 - 是否开启播放
				Type: Boolean,
				default: false,
			},
			switAud: {
				Type: Boolean, //切换上下音频 - 是否开启播放
				default: true,
			},
			BsNav: { //倍数-传入
				Type: Array,
				default: () =>
				[{
					id: 1.0,
					bs: '1.0',
				}, {
					id: 1.5,
					bs: '1.5'
				}, {
					id: 2.0,
					bs: '2.0'
				}],
			},
		},
		data() {
			return {
				shows: false, //倍数弹框
				show: true, //倍数弹框动画默认开启
				jian: true, //减-切换图标
				jia: true, //加-切换图标
				succes: true, //播放按钮
				bsid: '', //倍数默认显示第一个
				bsindex: 0, //倍数默认显示第一个
				num: 0,
				current: 0, //当前选中的索引
				recorPath: '', //音频播放地址
				lock: false, // 锁
				currentTime: 0, //当前进度
				duration: 100, // 总进度
				videoContext: null,
				loading:true,//锁 加载
			}
		},
		onReady() {
			this.videoContext = uni.createVideoContext('myVideo', this)
		},
		mounted() {
			//默认播放第一个 -- 按钮展示
			if (this.list.length != 0) {
				this.recorPath = this.list[0].file_url
				if (this.list.length > 1) { //音频文件大于1 -- 下一个切换默认显示
					this.jia = false
					if (this.autoplays) {
						this.succes = true
					}
				}
			}
			//倍数默认处理
			// if (this.BsNav.length != 0) {
			// 	this.bsid = this.BsNav[0].id
			// 	this.$nextTick(() => {
			// 		//#ifdef H5 || APP-PLUS || APP-NVUE
			// 		this.$refs['myVideo'][0].playbackRate(this.bsid)
			// 		//#endif
			// 		//#ifndef H5 || APP-PLUS || APP-NVUE
			// 		this.videoContext.playbackRate(this.bsid)
			// 		//#endif 
			// 	})
			// }
		},
		updated() {

		},
		onLoad() {

		},
		onHide() { //监听页面离开 - 销毁音频 
			//#ifdef H5 || APP-PLUS || APP-NVUE
			this.$refs['myVideo'][0].stop();
			//#endif
			//#ifndef H5 || APP-PLUS || APP-NVUE
			this.videoContext.stop();
			//#endif
		},
		onUnload() { //监听页面卸载 - 销毁音频 
			//#ifdef H5 || APP-PLUS || APP-NVUE
			this.$refs['myVideo'][0].stop();
			//#endif
			//#ifndef H5 || APP-PLUS || APP-NVUE
			this.videoContext.stop();
			//#endif
		},
		destroyed() {
			// this.innerAudioContext.stop();
		},
		computed: {
			timer() {
				return calcTimer(this.currentTime)
			},
			overTimer() {
				console.log('this.duration',this.duration)
				if(this.duration==100)
				{
					return '00:00'
				}else{
					if(this.duration >=0)
					{
						return calcTimer(this.duration)
					}
				}
			}
		},
		watch: {

		},
		methods: {

			plays() { //播放暂停
				if (!this.list || this.list.length == 0) {
					console.log('暂无音频数据~')
					return;
				}
				if(this.loading){ 
					uni.showLoading({
						title: "音频缓存中..."
					})
					this.loading = false
				}
				setTimeout(() => {
					uni.hideLoading()
				},1600)
				this.succes = !this.succes
				
				if (this.succes) {
					console.log('暂停1',this.succes)
					// this.currentTime = 0
					//#ifdef H5 || APP-PLUS || APP-NVUE
					// console.log('sdsdsdsd',this.$refs['myVideo'])
					this.$nextTick(()=>{
						// this.$refs['myVideo'].play()
						this.videoContext = uni.createVideoContext("myVideo", this);
						this.videoContext.play()
					})
					//#endif
				} else {
					uni.hideLoading()
					//#ifdef H5 || APP-PLUS || APP-NVUE
					console.log('暂停2',this.succes)
						this.$nextTick(()=>{
							// this.$refs['myVideo'].play()
							this.videoContext = uni.createVideoContext("myVideo", this);
							this.videoContext.pause()
						})
					//#endif
				}
			},
			beishu() { //倍速弹框
				this.shows = !this.shows
			},
			// 倍速
			// setRate(index, item) {
			// 	this.bsid = item.id
			// 	this.bsindex = index
			// 	this.shows = false
			// 	//#ifdef H5 || APP-PLUS || APP-NVUE
			// 	this.$refs['myVideo'][0].playbackRate(item.id)
			// 	//#endif
			// 	//#ifndef H5 || APP-PLUS || APP-NVUE
			// 	this.videoContext.playbackRate(item.id)
			// 	//#endif
			// },

			// 更新进度条 
			timeupdate(event) {
				if (this.lock) return; // 锁
				
				let durationTime= event;   
					// console.log('视频总时长', durationTime.detail.duration)

				var currentTime, duration;
				if (event.detail.detail) {
					currentTime = event.detail.detail.currentTime
					duration = event.detail.detail.duration
				} else {
					currentTime = event.detail.currentTime
					duration = event.detail.duration
				}
				
				this.currentTime = currentTime
				
				this.duration = duration
			},

			// 拖动进度条
			sliderChange(data) {

				//此处滑动进度条--开始播放
				if (this.slideYes && !this.succes) {
					//#ifdef H5 || APP-PLUS || APP-NVUE
					// console.log('sdsdsdsd',this.$refs['myVideo'])
					this.$nextTick(()=>{
						// this.$refs['myVideo'].play()
						this.videoContext = uni.createVideoContext("myVideo", this);
						this.videoContext.play()
					})
					
					//#endif
					//#ifndef H5 || APP-PLUS || APP-NVUE
					this.videoContext.play()
					//#endif
					this.succes = true
				}
				//#ifdef H5 || APP-PLUS || APP-NVUE
				this.$nextTick(()=>{
					// this.$refs['myVideo'].play()
					this.videoContext = uni.createVideoContext("myVideo", this);
					this.videoContext.seek(data.detail.value)
				})
				
				// this.$refs['myVideo'].seek(data.detail.value) //获取秒数
				//#endif
				//#ifndef H5 || APP-PLUS || APP-NVUE
				this.videoContext.seek(data.detail.value) //获取秒数
				//#endif
			},

			//拖动中
			sliderChanging(data) {
				if (data.detail.value == 0) {
					this.succes = false
					//#ifdef H5 || APP-PLUS || APP-NVUE
					// console.log('sdsdsdsd',this.$refs['myVideo'])
					this.$nextTick(()=>{
						// this.$refs['myVideo'].play()
						this.videoContext = uni.createVideoContext("myVideo", this);
						this.videoContext.play()
					})
					
					//#endif
					//#ifndef H5 || APP-PLUS || APP-NVUE
					this.videoContext.pause()
					//#endif
				}
				this.currentTime = data.detail.value
			},

			// 视频加载完成
			// loadedmetadata(data) {
			// 	console.log('dadadad',data)
				
			// 	this.duration = data.detail.duration
			// },
			sig() { //上一首
				if (!this.list || this.list.length == 0) {
					console.log('暂无音频数据~')
					return;
				}
				if (this.num == 1) {
					this.jia = false
					this.jian = true
					this.loading = true
				}
				if (this.num == 0) {
					return;
				}
				this.num--
				this.recorPath = this.list[this.num].file_url
				if (this.switAud) { //切换时是否默认开启播放
					this.succes = true
					setTimeout(() => {
						this.$nextTick(()=>{
							// this.$refs['myVideo'].play()
							this.videoContext = uni.createVideoContext("myVideo", this);
							this.videoContext.play()
						})
						//#ifndef H5 || APP-PLUS || APP-NVUE
						this.videoContext.play()
						//#endif
					}, 100)
				} else {
					this.succes = false
				}
			},
			xig() { //下一首
				console.log('111',this.num)
				if (!this.list || this.list.length == 0) {
					console.log('暂无音频数据~')
					return;
				}
				if (this.num + 1 < this.list.length) {
					this.jia = true
					this.jian = false
					this.loading = true
				}
				if (this.num + 1 > this.list.length) {
					this.jia = false
					this.jian = true
					return
				}
				this.num++
				this.recorPath = this.list[this.num].file_url
				if (this.switAud) { //切换时是否默认开启播放
					this.succes = true
					setTimeout(() => {
						//#ifdef H5 || APP-PLUS || APP-NVUE
						// console.log('sdsdsdsd',this.$refs['myVideo'])
						this.$nextTick(()=>{
							// this.$refs['myVideo'].play()
							this.videoContext = uni.createVideoContext("myVideo", this);
							this.videoContext.play()
						})
						
						//#endif
						//#ifndef H5 || APP-PLUS || APP-NVUE
						this.videoContext.play()
						console.log('sadsadas',this.videoContext.play())
						//#endif
					}, 100)
				} else {
					this.succes = false
				}
			},
			nosig() {
				uni.showToast({
					title: '到头了~',
					icon: "none"
				})
			},
			noxig() {
				uni.showToast({
					title: '没有更多了~',
					icon: "none"
				})
			},
			kt() { //快退
				if (!this.list || this.list.length == 0) {
					console.log('暂无音频数据~')
					return;
				}
				let a = this.currentTime - Math.floor(15 % 60) //当前时间-15秒
				if (a < 1) {
					this.succes = false
					//#ifdef H5 || APP-PLUS || APP-NVUE
					// console.log('sdsdsdsd',this.$refs['myVideo'])
					this.$nextTick(()=>{
						// this.$refs['myVideo'].play()
						this.videoContext = uni.createVideoContext("myVideo", this);
						this.videoContext.play()
					})
					
					//#endif
					//#ifndef H5 || APP-PLUS || APP-NVUE
					this.videoContext.pause()
					//#endif
				}
				//#ifdef H5 || APP-PLUS || APP-NVUE
				this.$refs['myVideo'][0].seek(a)
				//#endif
				//#ifndef H5 || APP-PLUS || APP-NVUE
				this.videoContext.seek(a)
				//#endif
			},
			kj() { //快进
				if (!this.list || this.list.length == 0) {
					console.log('暂无音频数据~')
					return;
				}
				let a = this.currentTime + Math.floor(15 % 60) //当前时间-15秒
				//#ifdef H5 || APP-PLUS || APP-NVUE
				// console.log('sdsdsdsd',this.$refs['myVideo'])
				this.$nextTick(()=>{
					// this.$refs['myVideo'].play()
					this.videoContext = uni.createVideoContext("myVideo", this);
					this.videoContext.play()
				})
				
				//#endif
				//#ifndef H5 || APP-PLUS || APP-NVUE
				this.videoContext.seek(a)
				//#endif
			},
			next(data) { //监听音频结束
				this.succes = false
			},
		},
		watch: {}
	}
	//时间换算
	function calcTimer(timer) {
		
		if (timer === 0 || typeof timer !== 'number') {
			return '00:00'
		}
		let mm = Math.floor(timer / 60)
		let ss = Math.floor(timer % 60)
		if (mm < 10) {
			mm = '0' + mm
		}
		if (ss < 10) {
			ss = '0' + ss
		}
		
			return mm + ':' + ss
		
	}
		
		
	
</script>
<style lang="scss" scoped>
	page {
		background-color: #F6F6F8;
	}
	.syimg{
		width: 40upx!important;
		height: 48upx!important;
	}
	.bzSty{
		width: 80upx!important;
		height: 80upx!important;
	}
	/* 	#video {
		width: 100%;
	} */
	.audo-video {
		padding-bottom: 20upx;
		color: #999;
	}

	.slider-box {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 27rpx;
		color: #999;
	}

	button {
		display: inline-block;
		width: 100upx;
		background-color: #fff;
		font-size: 24upx;
		color: #000;
		padding: 0;
	}

	.hidden {
		position: fixed;
		top: 0;
		left: -10rpx;
		z-index: -1;
		width: 1upx;
		height: 1upx;
	}

	.audo-top {
		padding: 20rpx 40rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-top: 40upx;
		image {
			width: 45rpx;
			height: 45rpx;
		}
	}

	.audo-a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 700rpx;
		position: relative;
		z-index: 9;
	}

	.beishu {
		position: relative;
		width: 100rpx;
		padding-top: 5rpx;
		padding-bottom: 5rpx;
		text-align: center;
		border-radius: 25rpx;
		font-size: 28rpx;
	}

	.absolute {
		position: absolute;

		.beishu-a {
			width: 200rpx;
			border-radius: 20rpx;
			text-align: center;
			line-height: 90rpx;
			background: #fff;

			.title {
				pdding-left: 30rpx;
			}
		}
	}
	.mp3Img{
		padding-top: 80upx;
		
	}
	.mp3Img image{
		width: 296upx;
		height: 296upx;
		border-radius: 100%;
		
	}
	.audo-video{
		text-align: center;
	}
</style>
