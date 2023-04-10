<template>
	<view class="videoList">
		<view class="flexs iotops sumap" :style="[{'paddingTop':statusBar+'px'}]">
			<view class="plback" @click="goBack">
				<uni-icons type="left" color="#666" size="27"></uni-icons>
			</view>
			<view class="surcoe">
				<view class="videoName">视频课堂</view>
				<view class="search-input surwith">
					<uni-search-bar placeholder="输入关键字" shight="70" bgColor="#EFEFEF" :focus="false" v-model="searchValue" cancelButton="none" radius="100"></uni-search-bar>
				</view>
					
			</view>
			
		</view>
		<view class="videoBanner">
			<image src="../../static/img/b1.jpg"></image>
		</view>
		
		<view class="flexs videoOrder">
			<view>最热</view>
			<view>最新</view>
			<view>付费</view>
		</view>
		
		<view class="attrcile-cloumn">
			
			<view @click="goVideodeitals" class="flexs attrcileImg">
				<view class="attrimg">
					<image src="../../static/img/ap.jpg"></image>
				</view>
				<view class="attrMess">
					<view class="attrdeit">
						城市拓展工作开展及要领规划
					</view>
					<view class="attrIntr">
						这是简单的视频介绍，应该可能大概也许不，这是简单的视频介绍，应该可能大概也许不这是简单的视频介绍，应该可能大概也许不
					</view>
					<view class="authName">
						<text>王者系统</text>
						<text>2022-10-18 20:25:55</text>
					</view>
					<view class="flexs ImgNums setmpg">
						<view>
							<text>
								<uni-icons custom-prefix="iconfont" color="#000" type="icon-bianzu15" size="14"></uni-icons>
							</text>
							<text>6.6万人赞过</text>
						</view>
						<view>
							<text>
								<uni-icons custom-prefix="iconfont" color="#000" type="icon-24gf-playCircle" size="14"></uni-icons>
							</text>
							<text>6.6万人</text>
						</view>
						
					
					</view>
						
				</view>
							
			</view>
			<view @click="goVideodeitals" class="flexs attrcileImg">
				<view class="attrimg">
					<image src="../../static/img/ap.jpg"></image>
				</view>
				<view class="attrMess">
					<view class="attrdeit">
						城市拓展工作开展及要领规划
					</view>
					<view class="attrIntr">
						从前有一天，小黑兔跟他室友小灰兔为了考试,小黑兔跟他室友小灰兔为了考试
					</view>
					<view class="authName">
						<text>王者系统</text>
						<text>2022-10-18 20:25:55</text>
					</view>
					<view class="flexs ImgNums setmpg">
						<view>
							<text>
								<uni-icons custom-prefix="iconfont" color="#000" type="icon-bianzu15" size="14"></uni-icons>
							</text>
							<text>6.6万人赞过</text>
						</view>
						<view>
							<text>
								<uni-icons custom-prefix="iconfont" color="#000" type="icon-24gf-playCircle" size="14"></uni-icons>
							</text>
							<text>6.6万人</text>
						</view>
						
					
					</view>
						
				</view>
							
			</view>
						
		</view>
				
	</view>
</template>

<script>
	export default{
		data()
		{
			return{
				searchValue:'',
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
					that.statusBar=e.statusBarHeight; 
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
			goVideodeitals()
			{
				uni.navigateTo({
					url:'/pages/lesson/mp3Deitals'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.videoName{
		font-size: 28upx;
		font-weight: 600;
	}
	.surcoe{
		display: flex;
		grid-gap: 50upx;
		align-items: center;
		font-size: 26upx;
		color: #333;
		margin-left: auto;
	}
	.surwith{
		width: 300upx;
		height: 100upx;
	}
	  .sumap
	{
		justify-content: flex-start;
		
	}
	.videoBanner image{
		width: 100%;
		height: 300upx;
	}
	
	.videoOrder{
		justify-content: flex-end;
		padding: 20upx 30upx 0 30upx;
		grid-gap: 40upx;
		font-size: 26upx;
	
	}
	
	
	.attrcileImg{
		justify-content: flex-start;
		padding: 30upx;
		border-bottom: 4upx solid #efefef;
	}
	.attrMess{
		padding-left: 20upx;
	}
	.attrdeit{
		font-size: 28upx;
		font-weight: 600;
	}
	.attrIntr{
		font-size: 22upx;
		color: #666;
		line-height: 32upx;
		overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    line-clamp: 2;
		    -webkit-box-orient: vertical;
		
	}
	.authName{
		font-size: 20upx;
		color: #999;
		padding-top: 10upx;
	}
	.setmpg{
		margin-top: 18upx;
		justify-content: flex-start;
		font-size: 22upx;
		grid-gap: 60upx;
	}
	.setmpg text:nth-of-type(2)
	{
		padding-left: 10upx;
	}
	.attrimg image{
		width: 180upx;
		height: 180upx;
		
	}
</style>