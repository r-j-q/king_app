<template>
	<view>
		<view class="abimg">
			<image src="../../static/img/about.png"></image>
		</view>
		<view class="abmess">
			<view class="">
				消费联盟  企业联盟
			</view>
			<view class="">
				version<text style="margin-left: 10upx;">{{version}}</text>
			</view>
		</view>
		
		<view class="abmess abmp">
			<view class="">
				四川用尔商务服务有限公司
			</view>
			<view class="ipsc">
				蜀ICP备2022017794号-1
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version:''
			}
		},
		methods: {
			
		},
		onShow() {
			let os = uni.getSystemInfoSync();
			
			this.version=os.appWgtVersion
		}
	}
</script>

<style>
	.abimg{
		text-align: center;
		margin:140upx auto 32upx auto;
	}
	.abimg image
	{
		width: 180upx;
		height: 180upx;
		border: 1upx dashed #ccc;
	}
	.abmess{
		text-align: center;
	}
	.abmess view:nth-child(1)
	{
		font-size: 32upx;
		color: #666;
	}
	.abmess view:nth-child(2)
	{
		margin-top: 40upx;
		font-size: 28upx;
		color: #666;
	}
	.abmp{
		margin-top: 50vh;
		font-size: 28upx;
	}
	.ipsc{
		margin-top: 36upx;
	}
</style>
