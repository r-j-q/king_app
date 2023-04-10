<template>
	<view class="heal-with">
		<view class="top-box">
			<view class="search-with" :style="[{'paddingTop':statusBar+'px'}]">
				<view>成都<uni-icons type="bottom" color="#666" size="14"></uni-icons></view>
				<view class="search-input">
					<uni-search-bar placeholder="输入搜索内容" bgColor="#fff"   :focus="false" v-model="searchValue" cancelButton="none" radius="100" height="40"></uni-search-bar>
				</view>
						
			</view>
		</view>
		<view class="heal-alls">
			<view class="uni-margin-wrap">
						<swiper class="swiper" :indicator-dots="indicatorDots"  :autoplay="false"
							:duration="duration">
							<swiper-item v-for="(item,index) in imgList" :key="index">
								<view class="swiper-item uni-bg-red">
									<image :src=item.url></image>
								</view>
							</swiper-item>
							
						</swiper>
			</view>
			<view @click="healTIt" class="heal-mess">
				<view class="flexs heal-level">
					<view class="hImg">
						<image src="/static/img/sf.png"></image>
						<view class="he-gp">北京服务站</view>
					</view>
					<view class="hImg">
						<image src="/static/img/sf.png"></image>
						<view class="he-gp">上海服务站</view>
					</view>
					<view class="hImg">
						<image src="/static/img/sf.png"></image>
						<view class="he-gp">浙江服务站</view>
					</view>
					<view class="hImg">
						<image src="/static/img/sf.png"></image>
						<view class="he-gp">深圳服务站</view>
					</view>
				</view>
				<view class="heal-logo">
					<view class="hlogo-size">
						<image src="https://wangzhe-web.nlwzxt333.com/storage/product/lS6DmAAC9hex0ZK9eT3EXi83t5BRYvS0QxCujGQu.jpg"></image>
					</view>
				</view>
				<view class="flexs heal-deat">
					<view class="hlogo">
						<image src="/static/img/logo.png"></image>
					</view>
					<view class="heal-names">
						<view class="hl-shop">店铺名称西西福利龙泉驿健康服务站</view>
						<view class="hl-intr">健康服务站简介</view>
					</view>
				</view>
				<view class="flexs heal-gooods">
					<view class="heal-list">
						<view class="healImg">
							<image src="https://wangzhe-web.nlwzxt333.com/storage/product/wR1jS980PhfdDTEwEJgseo4SYd6qq1dGItlEdoSC.jpg"></image>
						</view>
						<view class="serline">
							<view class="hgoods-name">顺炁人参不定</view>
							<view class="heal-money">
								
							</view>
						</view>
					</view>
					<view class="heal-list">
						<view class="healImg">
							<image src="https://wangzhe-web.nlwzxt333.com/storage/product/wR1jS980PhfdDTEwEJgseo4SYd6qq1dGItlEdoSC.jpg"></image>
						</view>
						<view class="serline">
							<view class="hgoods-name">顺炁人参不定</view>
							<view class="heal-money">
								
							</view>
						</view>
					</view>
					<view class="heal-list">
						<view class="healImg">
							<image src="https://wangzhe-web.nlwzxt333.com/storage/product/wR1jS980PhfdDTEwEJgseo4SYd6qq1dGItlEdoSC.jpg"></image>
						</view>
						<view class="serline">
							<view class="hgoods-name">顺炁人参不定</view>
							<view class="heal-money">
								
							</view>
						</view>
					</view>
					<view class="heal-list">
						<view class="healImg">
							<image src="https://wangzhe-web.nlwzxt333.com/storage/product/wR1jS980PhfdDTEwEJgseo4SYd6qq1dGItlEdoSC.jpg"></image>
						</view>
						<view class="serline">
							<view class="hgoods-name">顺炁人参不定</view>
							<view class="heal-money">
								
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
				indicatorDots: true,
				searchValue:'',
				duration: 500,
				statusBar:'',
				imgList:[]
			}
		},
		created() {
			this.healImg()
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
			if(!uni.getStorageSync('token'))
			{
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return
			}
		},
		methods: {
			healImg()
			{
				this.api.interactive.healImg().then(res=>{
					console.log('ere',res)
					if(res.code==200)
					{
						this.imgList=res.data.healthImg

					}
				})
			},
			healTIt()
			{
				uni.showToast({
					title:'该功能暂未暂未开发，敬请期待！',
					icon:'none'
				})
			},
			
			
			
			
		}
	}
</script>

<style>
	
	.top-box{
		position: -webkit-sticky;
			position: sticky;
			top: var(--window-top);
			// top: 0; // 这个试了也可以达到吸顶效果
			z-index: 111;
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
		
		
	.uni-margin-wrap {
		width: 100%;
	}
	.swiper {
		height: 346rpx;
	}
	.swiper-item {
		display: block;
		height: 760rpx;
		z-index: 0;
		text-align: center;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}
	.info {
		position: absolute;
		right: 20rpx;
	}
	.uni-padding-wrap {
		//width: 550rpx;
		padding: 0 100rpx;
	}
	.uni-bg-red image{
		width: 100%;
		height: 346rpx;
	}
	
	.heal-mess{
		background: #fff;
	}
	.hImg{
		font-size: 28upx;
	}
	.hImg image{
		width: 48upx;
		height: 48upx;
		border-radius: 100%;
	}
	
	.heal-level{
		padding:30upx;
		text-align: center;
		font-style: 28upx;
	}
	.he-gp{
		padding-top: 6upx;
	}
	.heal-logo{
		/* margin-top: 20upx; */
		
	}
	.hlogo-size image{
		width: 100%;
		height: 256upx;
	}
	.heal-deat{
		justify-content: flex-start;
		padding: 20upx 30upx;
		align-items: center;
	}
	.hlogo image{
		width: 101upx;
		height: 101upx;
	}
	.heal-alls{
		z-index: 100;
		position: relative;
	}
	.heal-names{
		line-height: 50upx;
		padding-left: 20upx;
	}
	.hl-shop{
		font-size: 28upx;
	}
	.hl-intr{
		font-size: 26upx;
		color: #666666;
	}
	.heal-list{
		font-size: 28upx;
		margin-bottom: 40upx;
		background-color: #f7f7f7;
		padding-bottom: 20upx;
	}
	.healImg image{
		width: 323upx;
		height: 275upx;
	}
	.heal-money{
		color: #D02C14;
	}
	.hgoods-name,.heal-money{
		padding: 10upx 26upx;
	}
	.heal-gooods{
		flex-wrap: wrap;
		padding: 20upx 30upx;
	}
</style>