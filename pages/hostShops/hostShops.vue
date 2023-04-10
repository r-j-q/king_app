<template>
	<view class="hostShops">
		<view class="search-with" :style="[{'paddingTop':statusBar+'px'}]">
			<view @click="goBack"><uni-icons type="left" color="#666" size="27"></uni-icons></view>
			<view class="search-input">
				<uni-search-bar placeholder="输入搜索内容" bgColor="#fff"  :focus="false" v-model="search_keyword" radius="100" cancelButton="none" @blur="blur"></uni-search-bar>
			</view>

		</view>
		<view class="ht-banner">
			<image :src=storeDeitals.shop_sign_file_url mode="aspectFill"></image>
		</view>
		<view class="spBG">
			<view class="flexs spMess">
					<view class="spImg">
						<image :src=storeDeitals.logo_file_url></image>
					</view>
					<view class="shop-mess">
						<view class="spNe">{{storeDeitals.name}}</view>
						<view class="xp-ms">{{storeDeitals.description}}</view>
					</view>
			</view>
		</view>
		<view class="spAll">
			<view class="spTabs">
				<view :class="tabs==1?'istive':''" @click="spTabs(1)">


					<view class="ic-fs">
						<uni-icons custom-prefix="iconfont" color="#ef8200" type="icon-remen" size="24"></uni-icons>
					</view>
					<view>
						活动专区
					</view>
				</view>
				<view :class="tabs==2?'istive':''" @click="spTabs(2)">

					<view class="ic-fs">
						<view class="ic-fs">
							<uni-icons custom-prefix="iconfont" color="#ef8200" type="icon-youhui" size="24"></uni-icons>
						</view>
						<view>
							平价商城
						</view>
					</view>
				</view>
				<view :class="tabs==3?'istive':''" @click="spTabs(3)">

					<view class="ic-fs">
						<uni-icons custom-prefix="iconfont" color="#ef8200" type="icon-fugoushuai" size="24"></uni-icons>
					</view>
					<view>
						会员福利区
					</view>
				</view>
			</view>
			<view class="sp-goods ">
				<view class="newCateSty">
					<view class="category">

						<view class="nav">
							<scroll-view style="height: 70vh" class="bg" scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true">
								<block v-for="(item,index) in shoplist" :key="index">
									<view class="nav-item" :class="index==activeColor?'setcolor':''" @click="changeNav(index,item)">
										{{item.name}}
									</view>
								</block>
							</scroll-view>
						</view>

					</view>

					</view>
					<scroll-view style="height: 70vh" @scrolltolower="onReachScollBottom" scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true">
					<view class="rishops">
						<view class="gd-Mess" v-for="(item,index) in actlist" :key="Math.random(item.id)"
						 @click="goShopdeitals(item)">
						 <view class="newflex">

							<view class="sgImg">
								<image :src=item.cover_image_url mode="aspectFill"></image>
							</view>

							<view class="rshopNames">


								<view class="sp-inner">
									<view class="aNames">
										{{item.name}}
									</view>


									<view class="active">
										{{item.category_name}}
									</view>
									<view class="a-mons" v-if="item.marketing_rule === 2">
										￥ {{item.price_in_cents/100}}+{{item.required_redemption_point}}代金券
									</view>
									<view class="a-mons" v-else>
										￥ {{item.price_in_cents/100}}
									</view>
								</view>
							</view>
						</view>

						</view>

					</view>
					</scroll-view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:'评价',
				activeColor:0,
				tabs:1,
				searchValue:'',
				page:1,
				page_size:10,
				product_name_keyword:'',
				store_name_keyword:'',
				store_id:'',
				actlist:[],
				storeDeitals:'',
				ispage:true,
				Tpams:0,
				scrollTop: 0,
				shoplistDe:[],
				shoplist: [],
				attr_category_id:'',
				search_keyword:''
			}
		},
		onLoad(options) {

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

			if(options.store_id && options.store_id !=undefined)
			{
				this.seleStore(options.store_id);
				this.store_id=options.store_id
			}

		},
		created() {

			this.shopCategory()
		},

		methods: {
			changeNav(index,item)
			{
				this.page=1
				this.activeColor=index
				this.activeColor=index
				this.attr_category_id=item.id
				this.actlist=[]
				this.ispage=true
				this.diffSearch(this.tabs)
			},
			shopCategory()
			{
				uni.showLoading({
					title:' ',

				})
				 this.api.interactive.shopCategory({
					 id:this.tabs?this.tabs:1
				 }).then(res=>{

					if(res.code==200)
					{
						this.shoplist=res.data,
						this.attr_category_id=res.data[0].id
					}
					this.diffSearch(this.tabs);
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			spTabs(pams)
			{
				if(this.tabs==pams)
				{
					return false
				}
				this.tabs=pams;
				this.Tpams=pams;
				this.page=1
				this.ispage=true
				this.actlist=[]

				this.shopCategory()
				// this.diffSearch(pams)
			},

			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {

				this.search_keyword=res.value
				this.actlist=[]
				this.ispage=true
				this.diffSearch(this.tabs)
			},


			//商品详情
			goShopdeitals(pams)
			{
				uni.navigateTo({
					url:'/pages/goodsDeitals/goodsDeitals?shopId='+pams.id
				})
			},

			//店铺详情
			seleStore(pams)
			{
				this.api.interactive.seleStore({id:pams}).then(res=>{
					console.log('店铺详情',res)
					if(res.code===200)
					{
						this.storeDeitals=res.data
					}
				})
			},

			diffSearch(pams)
			{

				if(!this.ispage)
				{
					return false
				}
				// uni.showToast({
				// 	title:'加载中...',
				// 	icon:'none',
				// 	mask:true
				// })

				this.api.interactive.diffSearch({
					category_id:pams?pams:1,
					page:this.page,
					page_size:this.page_size,
					product_name_keyword: this.product_name_keyword,
					store_id: this.store_id,
					store_name_keyword:this.store_name_keyword,
					attr_category_id:this.attr_category_id,
					search_keyword:this.search_keyword
				}).then(res=>{

					if(res.code===200 && res.data.data.length>0)
					{
						 uni.hideLoading()
						if (this.page>1)
						{
							res.data.data=this.actlist.concat(res.data.data)
						}

						this.actlist=res.data.data

					}else{
						if (res.data.data.length==0)
						{
							 uni.hideLoading()
							this.ispage=false
							uni.showToast({
								title:'没有更多数据!',
								icon:'none',
								duration:3000
							})
							return;
						}
					}

				})
			},
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
			onReachScollBottom() {
				this.page++
				this.diffSearch(this.Tpams);
				this.rander=this.page*10
			}

		},

	}
</script>

<style>
	.spBG{
		background: #fff;
	}
.ht-banner image{
	width: 100%;
	height: 290upx;
}
.spImg image{
	width: 100upx;
	height: 100upx;
}
.spMess{
	justify-content: flex-start;
	font-size: 0.8rem;
	align-items: center;
	padding: 20upx;

}
.spNe{
	font-weight: 600;
}
.xp-ms{
	color: gray;
}
.shop-mess{
	line-height: 46upx;
	padding-left: 20upx;
}
.spTabs{
	display: flex;
	padding: 20upx;
	font-size: 0.6rem;
	color: gray;
	grid-gap: 30upx;
	border-bottom: 1upx solid #ece6e6;
	justify-content: space-around;
}
.spAll{
	background: #fff;
	margin-top: 20upx;

}

.rishops,.bg{
	padding-top: 30upx;

}

.rishops{

	padding-left: 20upx;

}
.newCateSty{
	flex-wrap: wrap;
}
.gd-Mess{
	position: relative;
	padding-bottom: 20upx;
	margin-bottom: 40upx;
	border-bottom: 6upx solid #EFEFEF;

}
.active{

	color: #999999;
	font-size: 24upx;
	padding-top: 20upx;
}

.sgImg image{
	width: 190upx;
	height: 190upx;
	border: 1upx solid #efefef;
	border-radius: 20upx;
}
.newflex{
	display: flex;
}
.aNames{
	font-size: 24upx;
	font-weight: 600;
	width: 94%;
	overflow: hidden;
	-webkit-line-clamp: 2;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;

}
.a-mons{
	color: #f86253;
	font-size: 26upx;
	font-weight: 600;
	margin-top: 30upx;
}
.sp-inner{
	padding-left: 30upx;
	padding-top: 10upx;
}
.istive{
	color: #ef8200;
	font-size: 0.8rem;

}
.nav-item{
	padding-bottom: 40upx;
	font-size: 26upx;
}
.setcolor{
	color: #FD800A;
	font-size: 30upx;
	font-weight: 600;
}
.search-input
{
			width: 80%;

}
.bg {
	background: #FBFBFB;
	padding: 30upx 0;

	text-align: center;
}
.newCateSty,.bg{
	width: 212upx;
}

	.category {
		display: flex;
		height: calc(100% - var(--status-bar-height));
		width: 100%;


		/* 隐藏滚动条样式 */
		::-webkit-scrollbar {
			width: 0;
			height: 0;
		}

		uni-scroll-view {
			height: 100%;
		}


		.pms{
			border: 2rpx solid #999999;
		}
		.pms text{
			color: #000;
		}

		.nav {
			width: 200rpx;
			background: #F7F8F9;
			height:100vh;

			.nav-item {
				width: 200rpx;
				height: 104rpx;
				line-height: 104rpx;
				background: #F7F8F9;
				font-size: 28rpx;
				color: #505660;
				text-align: center;
				position: relative;
			}




		}


	}
	.sp-goods{
		display: flex;
	}
	.ic-fs{
		text-align: center;
		padding-bottom: 20upx;

	}
</style>
