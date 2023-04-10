<template>
	<view calss="all-box">
			<view class="search-with" :style="[{'paddingTop':statusBar+'px'}]">
				<view @click="goBack"><uni-icons type="left" color="#666" size="27"></uni-icons></view>
				<view class="search-input">
					<uni-search-bar placeholder="输入搜索内容" bgColor="#fff"  @confirm="search" :focus="false" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
									@cancel="cancel" @clear="clear"></uni-search-bar>
				</view>
						
			</view>
			
			
			<view class="less-log">
				<image src="/static/img/ll.jpg"></image>
			</view>
			<view class="less-lust">
				<view class="flexs less-more">
					<view class="">
						课程
					</view>
					<view class="">
						更多
					</view>
				</view>
				<view class="le-Tuy">
					<view class="flexs set-inner">
						<view class="leImg">
							<image src="../../static/img/b5.png"></image>
						</view>
						<view class="less-tit">
							<view>课程名称呼吸系统健康刻不容缓</view>
							<view class="ne-tp">呼吸是人之根本</view>
							<view class="flexs sele-less">
								<view>
									<text>588人查看</text>
									<text>888人收藏</text>
								</view>
								<view class="less-type">
									免费
								</view>
							</view>
						</view>
					</view>
					
				</view>
				<view class="le-Tuy">
					<view class="flexs set-inner">
						<view class="leImg">
							<image src="../../static/img/b5.png"></image>
						</view>
						<view class="less-tit">
							<view>课程名称呼吸系统健康刻不容缓</view>
							<view class="ne-tp">呼吸是人之根本</view>
							<view class="flexs sele-less">
								<view>
									<text>588人查看</text>
									<text>888人收藏</text>
								</view>
								<view class="less-type">
									免费
								</view>
							</view>
						</view>
					</view>
					
				</view>
				
			</view>
			<view class="less-lust zypt">
				<view class="flexs less-more">
					<view class="">
						直播课程
					</view>
					<view class="">
						更多
					</view>
				</view>
				<view class="le-Tuy">
					<view class="flexs set-inner">
						<view class="leImg">
							<image src="../../static/img/b5.png"></image>
						</view>
						<view class="less-tit">
							<view>课程名称呼吸系统健康刻不容缓</view>
							<view class="ne-tp">呼吸是人之根本</view>
							<view class="flexs sele-less">
								<view>
									<text>588人查看</text>
									<text>888人收藏</text>
								</view>
								<view class="less-type">
									免费
								</view>
							</view>
						</view>
					</view>
					
				</view>
				<view class="le-Tuy">
					<view class="flexs set-inner">
						<view class="leImg">
							<image src="../../static/img/b5.png"></image>
						</view>
						<view class="less-tit">
							<view>课程名称呼吸系统健康刻不容缓</view>
							<view class="ne-tp">呼吸是人之根本</view>
							<view class="flexs sele-less">
								<view>
									<text>588人查看</text>
									<text>888人收藏</text>
								</view>
								<view class="less-type">
									免费
								</view>
							</view>
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
				searchValue:'',
			}
		},
		onLoad() {
			var that=this;
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
				  statusBar = e.statusBarHeight
				  customBar = e.statusBarHeight + 45;
				  that.statusBar=e.statusBarHeight;
				  
				}
			})
		},
		methods: {
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			input(res) {
				console.log('----input:', res)
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				uni.showToast({
					title: 'blur事件，输入值为：' + res.value,
					icon: 'none'
				})
			},
			focus(e) {
				uni.showToast({
					title: 'focus事件，输出值为：' + e.value,
					icon: 'none'
				})
			},
			cancel(res) {
				uni.showToast({
					title: '点击取消，输入值为：' + res.value,
					icon: 'none'
				})
			},
			// goBack()
			// {
			// 	uni.reLaunch({
			// 		url:'/pages/selectGoods/selectedGoods'
			// 	})
			// }
			goBack()
			{
				//uni.navigateBack(1)
				const pages = getCurrentPages()//获取页面栈
				if (pages.length === 1) {//如果只有一个调用原生js
					history.back()
				} else {
					uni.navigateBack({
						delta: 1,
					})
				}
			},
		}
	}
</script>

<style>
	.search-with{
		display: flex;
		align-items: center;
		/* padding: 40upx; */
		color: #666;
		font-size: 28upx;
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 111;
		background-color: #efefef;
		/* padding-left: 30upx; */
		padding-bottom: 20upx;
		justify-content: space-around;
		
		
	}
	.search-result {
			padding-top: 10px;
			padding-bottom: 20px;
			text-align: center;
		}
	
		.search-result-text {
			text-align: left;
			font-size: 14px;
			color:#666;
		}
	
		.example-body {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
			padding: 0px;
		}
		.uni-mt-10 {
			margin-top: 10px;
		}
		.search-input{
			width: 80%;
			
		}
		.less-log image{
			width: 100%;
			height: 300upx;
		}
		.less-more{
			font-size: 28upx;
			padding: 20upx 30upx;
		}
		.leImg image{
			width: 140upx;
			height: 140upx;
		}
		.le-Tuy{
			justify-content: flex-start;
			font-size: 0.9rem;
			padding: 20upx 30upx;
			
		}
		.less-tit{
			flex: 1;
			padding-left: 40upx;
		}
		.ne-tp{
			padding-top: 10upx;
			color: gray;
		}
		.sele-less{
			padding-top: 36upx;
			color: gray;
		}
		.less-type{
			padding: 0.2rem 1rem;
			color: #fff;
			background-color: #ef8200;
			border-radius: 5px;
			font-size: 0.8rem;
		}
		.less-lust{
			background: #fff;
		}
		.set-inner{
			padding-bottom: 20upx;
			border-bottom: 1px solid #ccc;
		}
		.zypt{
			margin-top: 20upx;
		}
</style>
