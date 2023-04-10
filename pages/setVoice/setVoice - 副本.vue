<template>
	<view>
		<view class="search-with nfs souiceBack" :style="[{'paddingTop':statusBar+'px'}]">
		<view class="fiesrwo">
			<view class="flexs iotops">
				<view class="plback" @click="goBack">
					<uni-icons type="left" color="#ccc" size="27"></uni-icons>
				</view>
				<view @click="settabs(1)"  :class="status==1?'surcoes':'nosur'">
					语音会议
				</view>
				<view @click="settabs(2)" class="posab" :class="status==2?'surcoes':'nosur'">
					历史会议
				</view>
			</view>
			
			<view class="sourceSet">
				<view class="setbutton" @click="joinMeeting">
					<button>加入会议</button>
				</view>
				<view class="setbutton" @click="lameeting">
					<button>发起会议</button>
				</view>
			</view>
			
			
			
		</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar:0,
				status:1
			}
		},
		onLoad() {
			var that=this
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45;
					that.statusBar=e.statusBarHeight+8; 
				}
			});
		},
		onShow() {
			this.status=1
		},
		methods: {
			goBack()
			{
				const pages = getCurrentPages()//获取页面栈
				if (pages.length === 1) {//如果只有一个调用原生js
					history.back()
				} else {
					uni.navigateBack({
						delta: 1,
					})
				}
			},
			//加入会议
			joinMeeting()
			{
				uni.navigateTo({
					url:'/pages/setVoice/joinMeeting'
				})
			},
			lameeting()
			{
				this.api.voice.checkPower().then(res=>{
					if(res.code==200)
					{
						uni.navigateTo({
							url:'/pages/setVoice/lameeting'
						})
						
					}
				}).catch(err=>{
					console.log('err',err)
					uni.showToast({
						title:err.message,
						icon:'none'
					})
				})
				
			},
			settabs(pams)
			{
				this.status=pams
				if(pams==2)
				{
					uni.navigateTo({
						url:'./historyMeeting'
					})
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.souiceBack{
		background-image: url('@/static/img/u1.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 240upx;
		align-items: unset;
		padding: 0;
		background-color: #fff;
	}
	.iotops{
		background-color: unset;
		border-bottom: unset;
		position: relative;
	}
	.sumap{
		margin-top: 15upx;
		justify-content: flex-start;
		border-bottom: unset!important;
		margin-top: unset;
	}
	.plback{
		
		width: auto;
		margin: 0 4upx;
		word-break: keep-all;
		white-space: pre;
		cursor: pointer;
	}
	.posfied{
		position: relative;	
		margin: auto;
	}
	.posab{
		position: absolute;
		right: 0;
		/* margin-right: 32upx; */
	}
	.fiesrwo{
		width: 100%;
	}
	.surcoes{
		font-size: 30upx;
		font-weight: 600;
		color: #fff;
		position: absolute;
		left: 70px;
		right: 70px;
		min-width: 0;
		text-align: center;	
	}
	.nosur{
		font-size: 28upx;
		color: #fff;
		margin-right: 32upx;
	}
	
	.sourceSet{
		margin-top: 342upx;
	}
	.setbutton button{
		width: 440upx;
		height: 100upx;
		background-color: #128DDA;
		font-size: 36upx;
		line-height: 100upx;
		color: #fff;
	}
	.sourceSet view:nth-child(2)
	{
		margin-top: 60upx;
	}
</style>
