<template>
	
	<view>
		<view class="flexs qddeit">
			<view class="qdImg-q">
				<image src="../../static/img/sm.jpg"></image>
			</view>
			<view class="qdName">
				<view>张三</view>
				<view>
					<text>签到时间</text>
					<text>2022-10-23 23:30:21</text>
				</view>
			</view>
			<view class="qdButton">
				<button>已签到</button>
			</view>
		</view>
		
		<view class="flexs qddeit">
			<view class="qdImg-q">
				<image src="../../static/img/sm.jpg"></image>
			</view>
			<view class="qdName">
				<view>说的</view>
				<view>
					<text>签到时间</text>
					<text>2022-10-23 23:30:21</text>
				</view>
			</view>
			<view class="qdButton">
				<button>已签到</button>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	page{
		background-color: #fff;
	}
	.qdName{
		flex: 1;
		padding-left: 34upx;
	}
	.qdName view:nth-child(1)
	{
		font-size: 28upx;
		font-weight: 600;
		padding-bottom: 16upx;
	}
	.qdName view:nth-child(2)
	{
		font-size: 22upx;
		color: #666;
	}
	
	.qdImg-q image
	{
		width: 80upx;
		height: 80upx;
		border-radius: 100%;
	}
	.qddeit{
		margin-top: 40upx;
		padding: 26upx 52upx;
		align-items: center;
		justify-content: flex-start;
		text-align: left;
		border-bottom: 4upx solid #F5F5F5;
	}
	.qdName{
		flex: 1;
		padding-left: 34upx;
	}
	.qdName view:nth-child(1)
	{
		font-size: 28upx;
		font-weight: 600;
		padding-bottom: 16upx;
	}
	.qdName view:nth-child(2)
	{
		font-size: 22upx;
		color: #666;
	}
	
	.qdButton button{
		padding: 8upx 24upx;
		font-size: 26upx;
		background-color: #BAE3FC;
		color: #fff;
		border-radius: 30upx;
	}
</style>