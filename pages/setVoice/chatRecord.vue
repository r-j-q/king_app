<template>
	<view>
		<view class="search-with nfs souiceBack" :style="[{'paddingTop':statusBar+'px'}]">
		<view class="fiesrwo">
			<view class="flexs iotops">
				<view class="plback" @click="goBack">
					<uni-icons type="left" color="#000" size="27"></uni-icons>
				</view>
				<view @click="settabs(1)"  :class="status==1?'surcoes':'nosur'">
					聊天记录
				</view>
				<view @click="settabs(2)" class="posab" :class="status==2?'surcoes':'nosur'">清空记录</view>
			</view>
		</view>
		
		</view>
		
		<view class="popup-content">
			
			<view class="tiems">11:23</view>
			<!------------------------对方消息-------------------- -->
			<view class="left_box">
				<view>
					<image src="../../static/img/s1.png"></image>
				</view>
				<view class="chat_item">
					33333
				</view>
			</view>
			<!-- ----------------------自己消息-------------------- -->
			<view class="right_box">
				<view class="chat_item">二二二</view>
				<view>
					<image src="../../static/img/sm.jpg"></image>
				</view>
			</view>
			
			
		</view>
		
		
	</view>
</template>

<script>
	export default
	{
		data()
		{
			return{
				status:1,
				statusBar:0
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
		methods:{
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
			settabs(pams)
			{
				this.status=pams
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	page{
		background-color: #fff;
	}
	.souiceBack{
		background-color: #fff;
		padding-bottom: 24upx;
		padding-left: 0;
		border-bottom: 2upx solid #ccc;
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
		margin-right: 32upx;
	}
	.fiesrwo{
		width: 100%;
	}
	.surcoes{
		font-size: 30upx;
		font-weight: 600;
		color: #000;
		position: absolute;
		left: 70px;
		right: 70px;
		min-width: 0;
		text-align: center;	
	}
	.nosur{
		font-size: 28upx;
		color: #000;
	}
	
	
	.left_box {
				
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		// flex-direction: column;
		padding: 10upx 32upx;
		margin-bottom: 20rpx;
		text-align: left;
		image {
			width: 92upx;
			height: 92upx;
			border-radius: 50%;
			background: #128DDA;
			
		}
		.chat_item {
			// width: 72%;
			margin-left: 22upx;
			margin-top: 12upx;
			height: auto;
			border-radius: 10upx;
			box-sizing: border-box;
			padding: 20upx 40upx;
			background: #E4F5FF;
			color: #000;
			
			font-size: 30upx;
			position: relative;
			
		
			.msg_icon {
				width: 40upx;
				height: 40upx;
				display: inline-block;
				vertical-align: middle;
				margin-left: 10upx;
				margin-right: 0;
			}
		}
	
		.chat_item:after,
		.chat_item:before {
			border: solid transparent;
			content: ' ';
			height: 0;
			left: -18upx;
			position: absolute;
			width: 0;
		}
	
		.chat_item:after {
			border-width: 10upx;
			border-right-color: #E4F5FF;
			top: 45%;
		}
	
		.chat_item:before {
			border-width: 10upx;
			border-right-color: #E4F5FF;
			top: 44%;
		}
	}
	
	.right_box {
				
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		// flex-direction: column;
		padding: 10upx 0;
		padding-right: 32upx;
		margin-bottom: 20rpx;
		text-align: left;
		font-size: 28upx;
		image {
			width: 92upx;
			height: 92upx;
			border-radius: 50%;
			
		}
	
		.chat_item {
			// width: 72%;
			height: auto;
			border-radius: 10upx;
			box-sizing: border-box;
			padding: 20upx 42upx;
			margin-right: 22upx;
			margin-top: 12upx;
			background: #128DDA;
			border: 1upx solid #128DDA;
			color: #666;
			font-size: 30upx;
			position: relative;
			color: #fff;
			.msg_icon {
				width: 40upx;
				height: 40upx;
				display: inline-block;
				vertical-align: middle;
				margin-left: 10upx;
				margin-right: 0;
			}
		}
	
		.chat_item:after,
		.chat_item:before {
			border: solid transparent;
			content: ' ';
			height: 0;
			left: 100%;
			position: absolute;
			width: 0;
		}
	
		.chat_item:after {
			border-width: 10upx;
			border-left-color: #128DDA;
			top: 42%;
		}
	
		.chat_item:before {
			border-width: 12upx;
			border-left-color: #128DDA;
			top: 40.8%;
		}
	}
	.popup-content{
		padding: 0;
		
	}
	.tiems{
		padding-top: 32upx;
		padding-bottom: 52upx;
		text-align: center;
		font-size: 28upx;
		color: #B3B3B3;
	}
</style>