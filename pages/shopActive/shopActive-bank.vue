<template>
	<view class="shopActive">
		<view class="search-with" :style="[{'paddingTop':statusBar+'px'}]">
			<view @click="goBack"><uni-icons type="left" color="#666" size="27"></uni-icons></view>
			<view class="search-input">
				<uni-search-bar placeholder="输入搜索内容" bgColor="#fff"  @confirm="search" :focus="false" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
								@cancel="cancel" @clear="clear"></uni-search-bar>
			</view>
					
		</view>
		<view class="shopList">
			<view class="gooditem grid" v-for="(item,index) in actlist" :key="index">
				<view class="acti-iner">
					<view class="normaltype"  @click.stop="goShopdeitals(item)">{{item.category_name}}</view>
					<view class="ac-IMg"  @click.stop="goShopdeitals(item)">
						<image :src=item.cover_image_url></image>
					</view>
					<view class="gooditem__descr name new-set"  @click.stop="goShopdeitals(item)">{{item.name}}</view>
					<view class="gooditem__descr price sele-mb"><text class="sale_price">￥{{item.price_in_cents/100}}</text></view>
					<view class="gooditem__descr sales"><text>0人已买 </text></view>
					<view class="sub" @click.stop="goShopiner(item)">
						<view class="sub_left">
							<image src="https://wangzhe.yugoo.com/storage/product/kGORY01mDNWzWFtuyLSBOhl1k5cNekuRKeJkiW4x.png"></image>
							<view class="shop_name">王者系统</view>
						</view>
						<view class="handle">进店<uni-icons type="right" color="#666" size="14"></uni-icons></view>
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
				tab_name:'活动',
				statusBar:'',
				searchValue:'',
				page:1,
				page_size:20,
				product_name_keyword:'',
				store_name_keyword:'',
				actlist:[],
				active:'',
				rander:'',
				ispage:true,
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
			
			if(options.active && options.active !=undefined)
			{
				this.diffSearch(options.active);
				this.active=options.active
			}
		},
		methods: {
			goBack()
			{
				uni.reLaunch({
					url:'/pages/selectGoods/selectedGoods'
				})
				// uni.navigateBack(1)
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
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			blur(res) {
				// uni.showToast({
				// 	title: 'blur事件，输入值为：' + res.value,
				// 	icon: 'none'
				// })
				this.store_name_keyword=res.value
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
			//商品详情
			goShopdeitals(pams)
			{
				uni.navigateTo({
					url:'/pages/goodsDeitals/goodsDeitals?shopId='+pams.id
				})
			},
			goShopiner(pams)
			{
				uni.navigateTo({
					url:'/pages/hostShops/hostShops?store_id=1'
				})
			},
			// 获取当前的时间
			getNowTime() {
				  
				 
				return  Math.round(Math.random()*100) 
			},
			diffSearch(pams)
			{
				if(!this.ispage)
				{
					return false
				}
				uni.showToast({
					title:'加载中...',
					icon:'none',
					mask:true
				})
				this.api.interactive.diffSearch({
					category_id:pams,
					page:this.page,
					page_size:this.page_size,
					product_name_keyword: this.product_name_keyword,
					store_id: 0,
					store_name_keyword:this.store_name_keyword
				}).then(res=>{
					console.log('类型区',res)
					if(res.code===200 && res.data.data.length>0)
					{
						uni.hideLoading()
						// this.actlist=res.data.data
						if (this.page>1)
						{
							res.data.data=this.actlist.concat(res.data.data)
						}
						
						this.actlist=res.data.data
					}else{
						if (res.data.data.length==0)
						{
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
			}
		},
		onReachBottom() {
			console.log('dfffffkk')
			this.page++
			this.diffSearch(this.active)
			this.rander=Math.round(Math.random()*10000) 
		},
		
	}
</script>

<style>
		.shopList{
			background-color: #fff;
			padding: 40upx 30upx;
			display: flex;
			justify-content: space-between;
			grid-gap: 20upx;
			flex-wrap: wrap;
		}
		gooditem.grid {
			border: 1px solid #ededed;
		}
		.gooditem {
			
			
			
			margin-bottom: 20upx;
			position: relative;
			
			/* padding: 0 30upx; */
		}
		.ac-IMg image{
			width: 336upx;
			height: 286upx;
		}
		.normaltype {
			font-size: .8rem;
			right: 0;
			position: absolute;
			border-radius: 6upx;
			color: #fff;
			padding: 10upx 20upx;
			background-color: #ef8200;
			/* margin-right: 20upx; */
			z-index: 1;
		}
		.sele-mb{
			margin-bottom: 20upx;
			font-size: 0.8rem;
			color: #ef8200;
			padding-left: 16upx;
			}
		.sales{
			font-size: 0.6rem;
			color: #999;
			padding-left: 20upx;
		}
		.sub{
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-pack: justify;
			-ms-flex-pack: justify;
			justify-content: space-between;
			font-size: .8rem;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
			color: #333;
			padding: 2upx 20upx;
		}
		.sub .sub_left {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-ms-flex-align: center;
			align-items: center;
		}
		.sub .sub_left image {
			border-radius: 50%;
			height: 2rem;
			width: 2rem;
		}

		.sub .sub_left .shop_name {
			margin-left: 1rem;
		}
		.sales{
			margin-bottom: 20upx;
		}
		.new-set{
			font-size: 0.8rem;
			height: 98upx;
			padding: 16upx;
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
		
		.acti-iner{
			background-color: #f7f7f7;
			padding-bottom: 30upx;
			width: 336upx;
			
		}
</style>
