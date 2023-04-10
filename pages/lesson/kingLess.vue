<template>
	<view class="kingWith">
		<view class="kingbanner">
			<image src="../../static/img/b1.png"></image>
		</view>
		<view class="flexs kingF">
			
				<view class="tyboxsize l1" @click="govideoLess(1)">
					<view class="lesstype">
						<image mode="aspectFit" src="../../static/img/z1.png"></image>
					</view>
					<view>视频课堂</view>
				</view>
				<view class="tyboxsize l2" @click="govideoLess(2)">
					<view class="lesstype">
						<image mode="aspectFit" src="../../static/img/z2.png"></image>
					</view>
					<view>音频课堂</view>
				</view>
				<view class="tyboxsize" @click="awit">
					<view class="lesstype">
						<image mode="aspectFit" src="../../static/img/z3.png"></image>
					</view>
					<view>直播课堂</view>
				</view>
				<view class="tyboxsize" @click="goVoice">
					<view class="lesstype">
						<image mode="aspectFit" src="../../static/img/z4.png"></image>
					</view>
					<view>语音会议</view>
				</view>
			
		</view>
	
	 
	</view>
</template>

<script>
	export default{
		data()
		{
			return{
				
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
					that.statusBar=e.statusBarHeight; 
				}
			});
		},
		methods:{
			govideoLess(pams)
			{
				uni.navigateTo({
					url:'/pages/lesson/videoLess?type='+pams
				})
			},
			awit()
			{
				uni.showToast({
					title:'正在开发中，敬请期待！',
					icon:'none'
				})
			},
			//语音会议
			goVoice()
			{
				// uni.showToast({
				// 	title:'正在开发中，敬请期待！',
				// 	icon:'none'
				// })
				// return
				
				uni.navigateTo({
					url:'/pages/setVoice/setVoice'
				})
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	 * {
	      margin: 0;
	      padding: 0;
	    }
	.kingbanner image{
		height: 300upx;
		width: 100%;
	}
	.kingF{
		
		  display: flex;
		  flex-wrap: wrap;
		  margin-top: 60upx;
	}
	
	.tyboxsize{
		 width: calc(100%/2);
		 height: 326upx;
		  border: 1px solid #f5f5f5;
		  box-sizing: border-box;
		
	}
	
	
	.lesstype{
		margin-top:  calc(46%/2);
	}
	.lesstype image{
		width: 96upx;
		height: 80upx;
		vertical-align: middle;
	}
	.tyboxsize{
		
		text-align: center;
	}
	.tyboxsize view:nth-of-type(2)
	{
		padding-top: 30upx;
		font-size: 24upx;
		
	}
	.tymap{
		margin-top: 100upx;
	}
</style>