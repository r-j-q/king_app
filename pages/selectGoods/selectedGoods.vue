<template>
	<view calss="all-box">
			<view class="search-with" :style="[{'paddingTop':statusBar+'px'}]">
				<view>成都<uni-icons type="bottom" cancelButton="auto" color="#666" size="14"></uni-icons></view>
				<view class="search-input">
					<uni-search-bar placeholder="输入搜索内容" bgColor="#fff"   :focus="false" v-model="searchValue" cancelButton="none" radius="100" height="40"></uni-search-bar>
				</view>
				<view class="gocart" @click="gocart">
					<uni-icons type="cart" size="28"></uni-icons>
				</view>
			</view>
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots"  :autoplay="true"
					:duration="duration">
					<swiper-item  v-for="(item,index) in slideshow" :key="item.url">
						<view class="swiper-item uni-bg-red">
							<image :src=item.url></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
			<view class="item">
				<uni-section type="line">
					<uni-notice-bar show-icon scrollable 
						 v-if="list3.length >0"	:text="list3[0].content" />
							
				</uni-section>
			</view>
				
					
		<view class="tab-next flexs">
			<view @click="goLess">
				<view class="ic-fs">
					<image src="/static/img/i2.png"></image>
				</view>
				<view>王者课堂</view>
			</view>
			<view @click="shopActive(1)">
				<view class="ic-fs">
					<image src="/static/img/i1.png"></image>
				</view>
				<view>活动专区</view>
			</view>
			<view @click="shopActive(2)">
				<view class="ic-fs">
					<image src="/static/img/i3.png"></image>
				</view>
				<view>平价商城</view>
			</view>
			<view @click="shopActive(3)">
				<view class="ic-fs">
					<image src="/static/img/i4.png"></image>
				</view>
				<view>会员福利区</view>
			</view>
			<view @click="sourceCenter">
				<view class="ic-fs">
					<image src="/static/img/i5.png"></image>
				</view>
				<view>融媒体</view>
			</view>
		</view>
		<view class="gs-area">	
			<view class="te-goods ">
				<view class="flexs pd-mag" @click="goHostsp">
					<view class="hostSp">热销店铺</view>
					<view class="moreList">更多</view>
				</view>
				
				<view class="te-img" @click="goHostsp">
					<image :src=listDeit.shop_sign_file_url></image>
				</view>
				<view class="aLGTsdolh5Lh2CTZVE46">
					<view class="inImg">
						<image :src=listDeit.logo_file_url></image>
					</view>
					<view class="QK1l_FQE337p7WofAPVg">
						<view class="Auy_yvaUJN6TrU_lYUBS">{{listDeit.name}}</view>
						<view class="r4BsRuevYmGTBZ9WXt5z">{{listDeit.description}}</view>
					</view>
				</view>
				<view class="flexs setgap">
					<view class="goods-list" v-for="(item,index) in actlsit" :key="item.id" @click="godeitals(item)">
						<view class="gsImg">
							<image :src=item.cover_image_url></image>
						</view>
						<view class="shopType">
							{{item.category_name}}
						</view>
						<view class="serline">
							<view class="gsName">
								{{item.name}}
							</view>
							<view class="money">
								{{item.price_in_cents/100}}
							</view>
						</view>
					</view>
							
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import biaofunMarquee from '@/components/biaofun-marquee/biaofun-marquee.vue';
	export default{
		data()
		{
			return{
				searchValue:'',
				statusBar:'',
				page:1,
				page_size:10,
				listDeit:'',
				indicatorDots: true,
				searchValue:'',
				duration: 500,
				slideshow:'',
				ispage:true,
				actlsit:[],
				wgtVer:'',
				list3: [
					
				],
			}
		},
		components: {
			biaofunMarquee
		},
		created() {
		},
		onShow() {
			// #ifdef APP-PLUS
			let os = uni.getSystemInfoSync();
			
			if (os.platform == 'android') {
				this.updateApp();
			}
			// #endif
			//首页banner
			this.IndexBanner()
			this.getNotice()
			//获取商品数据
			this.getLibraryList()
			uni.getClipboardData({
				success: function(res) {
					if(res.data && res.data !=null && res.data !=' ')
					{
						if(res.data.length <5 || res.data==null)
						{
							return false
						}
						if(res.data.indexOf('会议号')==-1)
						{
							return false
						}
						uni.navigateTo({
							url:'/pages/setVoice/joinMeeting?copydata='+res.data
						})
							
					}
				}
			})
		
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
			});
			
			
		},
		methods: {
			
					
					gocart()
					{
						uni.navigateTo({
							url:'/pages/goodsDeitals/cart'
						})
					},
					
					updateApp()
					{
						plus.runtime.getProperty(plus.runtime.appid, (inf) => {
							
						    this.wgtVer = inf.version;
							console.log('inf.version',inf.version)
							this.api.interactive.getAppver().then(r=>{
								if (r.code==200) {
								console.log('inf.version哈哈搜索',r.data.version_number)	
								    if (inf.version < r.data.version_number) 
									{
										    uni.showLoading({
										        title: '更新中……',
												mask:true
										    })
										    uni.downloadFile({ //执行下载
										        url: r.data.download_url, 
										        success: downloadResult => {
										            uni.hideLoading();
										            if (downloadResult.statusCode ===200) 
													{
																
													   plus.runtime.install(downloadResult.tempFilePath, {  	
															force: false  
														}, function() {
															uni.showToast({
																title:'更新成功',
																icon:'none'
															})
														   
															plus.runtime.restart();  
														}, function(e) {  
															uni.showToast({
																title:'更新失败',
																icon:'none'
															})
															
														});  
										        }  
													    
															
															
										            
										        }
										    })
												 
										
										
								    }
								}
														       				  
															
							}).catch(err=>{
								console.log('errrr',err)
							})
							
							
						});
								
					},
					
					
					downLoadApp(download_url) {
					  uni.showToast({
					    title: '正在下载安装包，请稍后...',
					    icon: 'none'
					  });
					  var dtask = plus.downloader.createDownload(download_url, {}, function(d, status) {
					    // 下载完成
					    if (status == 200) {
					      plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
					        uni.showToast({
					          title: '安装失败',
					          mask: false,
					          duration: 1500
					        });
					      });
					    } else {
					      uni.showToast({
					        title: '更新失败',
					        mask: false,
					        duration: 1500
					      });
					    }
					  });
					  dtask.start();
					},
					
					onMarquee3Completed() {
						
						this.$refs.biaofunMarquee3.start();
					},
					getNotice()
					{
						this.api.interactive.getMessages().then(res=>{
							
							if(res.code==200 && res.data.length >0)
							{
								this.list3=res.data
							}
						})
					},
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
						
					},
					blur(res) {
						uni.showToast({
							title: 'blur事件，输入值为：' + res.value,
							icon: 'none'
						})
					},
					focus(e) {
						
					},
					cancel(res) {
						uni.showToast({
							title: '点击取消，输入值为：' + res.value,
							icon: 'none'
						})
					},
					onBackPress() {
						// #ifdef APP-PLUS
						plus.key.hideSoftKeybord();
						// #endif
					},
					godeitals(pams)
					{
						uni.navigateTo({
							url:'/pages/goodsDeitals/goodsDeitals?shopId='+pams.id
						})
					},
				
					//商品列表
					getLibraryList() {
						if(!this.ispage)
						{
							return false
						}
						
						// 把个人信息存到全局备用
						this.api.user.getShoplist({
							page:this.page,
							page_size:this.page_size
						}).then(res => {
							if (res.code === 200 && res.data.data.length >0) 
							{
								//this.actlsit=res.data.data[0].hot_sale_products;
								this.listDeit=res.data.data[0]
								if (this.page>1)
								{
									res.data.data[0].hot_sale_products=this.actlsit.concat(res.data.data[0].hot_sale_products)
								}
								
								this.actlsit=res.data.data[0].hot_sale_products
							}else{
								if (res.data.data.length==0)
								{
									this.ispage=false
									uni.showToast({
										title:'没有更多数据!',
										icon:'none',
										duration:1000
									})
									return;
								}
					}
						
						}).catch(err=>{
							
						})
								
					},
					IndexBanner()
					{
						
						this.api.interactive.IndexBanner().then(res=>{
							
							if(res.code===200)
							{
								this.slideshow=res.data.slideshow
							}
						})
					},
					//课堂相关
					goLess()
					{
						//uni.navigateTo({
							//url:'/pages/lesson/lesson'
						//})
						uni.navigateTo({
							url:'/pages/lesson/kingLess'
						})
					},
					shopActive(pams)
					{
						uni.navigateTo({
							url:'/pages/shopActive/shopActive?active='+pams
						})
					},
					goHostsp()
					{
						uni.navigateTo({
							url:'/pages/hostShops/hostShops?store_id=1'
						})
					},
					sourceCenter()
					{
						uni.navigateTo({
							url:'/pages/sourceCenter/sourceCenter'
						})
					}
			
				},
				onReachBottom() {
					this.page++
					this.getLibraryList()
					
				},
				
			}
		
</script>

<style>
	.uni-margin-wrap {
		width: 100%;
	}
	
	.swiper-item {
		display: block;
		height: 760rpx;
		z-index: 0;
		text-align: center;
	}
	.swiper {
		height: 346rpx;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-bg-red image{
		width: 100%;
		height: 346rpx;
	}
	.top-box{
		background-image: url('/static/img/b1.jpg');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 400upx;
		
	}
	.ic-fs{
		padding: 20upx 0;
	}
	.ic-fs image{
		width: 80upx;
		height: 80upx;
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
		
		
		
		.tab-next{
				
			padding:40upx 30upx;
			background-color: #fff;
			font-size: 28rpx;
			text-align: center;
			align-items: center;
			
			border-radius: 20upx;
			
			margin: 30upx 24rpx;
			
		}
		.ic-fs image{
			width: 80upx;
			height: 80upx;
			
		}
		.te-goods{
			background-color: #fff;
			margin-top: 20upx;
		}
		.pd-mag{
			padding: 20upx 34upx;
			align-items: baseline;
		}
		.te-img image{
			width: 100%;
			height: 272rpx;
		}	
		.goods-list{
			margin-top: 20upx;
			margin-bottom: 10upx;
			background: #f7f7f7
;			position: relative;
		}
		.shopType{
			position: absolute;
			top: 0;
			right: 0;
			color: #fff;
			padding: 6upx 16upx;
			background-color: #ef8200;
			font-size: 22upx;
		}
		.gsImg image{
			width: 340rpx;
			height: 326rpx;
		}
		.setgap{
			flex-wrap: wrap;
			padding: 0 24upx;
			font-size: 26rpx;
			padding-bottom: 20upx;
		}
		.gsName{
			width: 320rpx;
			word-wrap:break-word;
			padding: 0 10upx;
		}
		.money{
			font-size: 30rpx;
			color: red;
			padding: 20upx 10upx;
		}
		.moreList,.hostSp{
			font-size: 0.8rem;
			color: gray;
			font-weight: 800;
		}
		.hostSp{
			color: #333;
		}
		.inImg image{
			width: 80upx;
			height: 80upx;
			margin-right: 30upx;
		}
		
		.aLGTsdolh5Lh2CTZVE46 {
		    padding: 30upx;
		    display: flex;
		    justify-content: flex-start;
		}
		.Auy_yvaUJN6TrU_lYUBS{
			font-size: 26upx;
			font-weight: bold;
		}
		.aLGTsdolh5Lh2CTZVE46 .QK1l_FQE337p7WofAPVg .r4BsRuevYmGTBZ9WXt5z {
		    margin-top: 20upx;
		    font-size: 22upx;
		    color: gray;
			font-weight: bold;
		}
		.gocart{
			background-color: #fff;
			width: 73upx;
			height: 73upx;
			border-radius: 100%;
			line-height: 74upx;
			text-align: center;
			margin-left: 10upx;
		}
		
		.item{
			margin: 32upx 24upx 0 24upx;
			border-radius: 8upx;
		}
</style>