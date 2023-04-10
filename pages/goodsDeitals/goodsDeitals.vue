<template>
	<view class="goods-deitals" v-if="loadShow">
		<view class="flexs iotops" :style="[{'paddingTop':statusBar+'px'}]">
			<view @click="goBack"><uni-icons type="left" color="#666" size="27"></uni-icons></view>
			
			<view class="sl">商品详情</view>
			
		</view>
		<view class="uni-margin-wrap">
					<swiper class="swiper" :indicator-dots="indicatorDots"  :autoplay="false" :duration="duration">
						<swiper-item v-for="(item,index) in shopImageMess.images" :key="item.file_url" >
							<view class="swiper-item uni-bg-red">
								<image class="imgWHs"  :src=item.file_url></image>
							</view>
						</swiper-item>
						
					</swiper>
		</view>
		<view class="goods-intr">
			<view class="goodsName">
				<view class="nameWiht"><text class="bOrder">{{shopImageMess.category_name}}</text>
				<text class="gnme-r">{{shopImageMess.name}}</text></view>
			</view>
			<view class="goodsMoneey">
				￥{{shopImageMess.price_in_cents/100}}
			</view>
			<view class="flexs yus-t">
				<view><text>快递</text> <text>包邮</text></view>
				<view v-if="false">{{shopImageMess.sales}}人已购买</view>
			</view>
		</view>
		<view class="goods-attr" @click="toggle('bottom')">
			<view class="flexs">
				<view class="name-attr">选择规格</view>
				<view class="set-attr">
					<text>请选择:</text>
					<text>颜色, </text>
					<text>尺码</text>
				</view>
			</view>
		
			<view class="flexs img-attr">
				<view class="goodsImg">
					<image mode="widthFix" :src=shopImageMess.cover_image_url></image>
				</view>
				<view class="attr-nums">共<text>{{shopImageMess.stock_keeping_units.length}}</text>种规则可选</view>
			</view>
			
		</view>
		<view class=" pe-adders" @click="goaddres(1)">
			<view class="flexs">
				<view>配送地址</view>
				<view class="goaddrs icfex">
					<view>
						<uni-icons custom-prefix="iconfont" color="#999" type="icon-dingxiang" size="20"></uni-icons>
					</view>
					<view class="addres" v-if="addresInfo">
						{{addresInfo.province}}
						{{addresInfo.city}}
						{{addresInfo.district}}
						{{addresInfo.town}}
					</view>
					<view class="addres" v-else>请填写收货地址</view>
					<view>
						<uni-icons custom-prefix="iconfont" color="#999" type="icon-youce" size="22"></uni-icons>
					</view>
				</view>
			</view>
			<view class="ku-po">快递: 免运费</view>
		</view>
		
		<view class="flexs shop-with" @click="gohostStore(shopImageMess)">
			<view class="sp-logo">
				<image :src=shopImageMess.store.logo_file_url></image>
			</view>
			<view class="sp-name">
				<view class="wz-name">{{shopImageMess.store.name}}小店</view>
				<view v-if="false" class="buy-num">{{shopImageMess.sales}}人已购买</view>
			</view>
			<view class="rj-img">
				<uni-icons custom-prefix="iconfont" color="#999" type="icon-youce" size="22"></uni-icons>
			</view>
		</view>
		<view class="goods-intrs">
			<view class="sp-intr">
				商品详情
			</view>
			<view class="sp-Img" v-for="(imgitem,index) in shopImageMess.detail_images" :key="imgitem.file_id">
				<image mode="widthFix" :src=imgitem.file_url></image>
			</view>
		</view>
		<view class="buy-now">
			
			
				<view class="cartWith">
					
					<view class="cartcent" @click="goService()">
						<uni-icons custom-prefix="iconfont" color="#000" type="icon-xiazai46" size="26"></uni-icons>
						<view>
							客服
						</view>
					</view>
					<view class="cartcent">
						<view>
							<uni-icons  class="cartil" type="star" size="26"></uni-icons>
						</view>
						<view>
							收藏
						</view>
					</view>
					<view class="cartcent" @click="goCart">
						<view  class="cartPo">
							<uni-icons  v-if="cartNums >0" color="red" type="cart" size="26"></uni-icons>
							<uni-icons  v-else class="cartil" type="cart" size="26"></uni-icons>
							<view v-if="cartNums >0" class="cartNums">
								<uni-badge class="uni-badge-left-margin" :text=cartNums />
							</view>
						</view>
						<view>
							购物车
						</view>
					</view>
					
					
					
					
					
				</view>
				
				<view class="gobuy">
					<view class="addcart" @click="addCart(shopImageMess)">
						加入购物车
					</view>
					<view class="nowbuy" @click="nowBuy">
						立即购买
					</view>
					
				</view>
			
			
		</view>
		<view class="op-height">
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="aImage-with ">
						<view class="atrimg">
							<image :src=shopImageMess.cover_image_url></image>
						</view>
						<view class="f-right">
							<view class="flexs mon-close">
								<view class="se-mon">¥ {{shopImageMess.price_in_cents/100}}</view>
								<view @click="closePop">
									<uni-icons custom-prefix="custom-icon" type="closeempty" size="16"></uni-icons>
								</view>
							</view>
							<view class="flexs s-attr">
								<view class="attr-intr">
									<text>已选:</text>
									<text>{{alName}}</text>
									
								</view>
								<view class="ku-nums">
									库存{{stock_count}}件
								</view>
							</view>
						</view>
						
					</view>
					<view class="attr-name">
						规格
					</view>
					<view class="self-attr" @click="attrChange">
						<view class="attrWith" v-for="(nitem,nindex) in shopImageMess.specification_properties" :key="nitem.id">
							<view class="attr-cor">{{nitem.name}}:</view>
							<view v-for="(spitem,index) in nitem.specification_values" :key="spitem.id" @click="setAttr(spitem,index)"  class="attr-public" :class="attstatus==index?'attrback':''">{{spitem.value}}</view>
						</view>
						
					</view>
					<view class="flexs attr-name ">
						<view class="">购买数量</view>
						<view class="spNums spmar">
							<view class="pubbac reduce-nums" @click="reduce">-</view>
							<view class="pubbac">
							<input type="number" style="height: 54upx;" v-model="snums" name="" id="">
							</view>
							<view class="pubbac adds" @click="adds">+</view>
						</view>
					</view>
					<view class="is-sub">
						<view class="new-cartfl">
							<view class="my-attr" @click="addCart(shopImageMess)">加入购物车</view>
							<view class="my-attr" @click="confirmOrder">立即购买</view>				
						</view>
					</view>
					
					
				</view>
				
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: '',
				status:0,
				snums:1,
				shopId:'',
				shopImageMess:'',
				statusBar:'',
				addresInfo:'',
				attstatus:0,
				shopAttrNUm:'',
				alName:'',
				stock_count:'',
				loadShow:false,
				addId:0,
				cartNums:0,
				more_skuCode:'',
				
			}
		},
		created() {
			this.getDeitals();
		},
		
		onLoad(options) {
			var that=this;
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45;
					that.statusBar=e.statusBarHeight+8;
				}
			})
			if(options.shopId)
			{
				this.shopId=options.shopId
			}
			if(options.type)
			{
				that.type=options.type
			}
			
			if(options.addId)
			{
				//有选择查询当前
				this.addId=options.addId
			}
			
		},
		onShow() {
			if(this.addId >0)
			{
				this.getAddresinfo(this.addId)
			}else{
				this.defaultAddres()
			}
			this.getCartLsit();
		},
		methods: {
			getCartLsit()
			{
				this.api.interactive.UsercartList().then(res=>{
					if(res.code==200)
					{
						this.cartNums=0;
						//this.cartNums=res.data[0].carts.length
						res.data[0].carts.map((item)=>{
							
							this.cartNums +=item.count
						})
					}
				}).catch(err=>{})
			},
			
			gohostStore(pams)
			{
				uni.navigateTo({
					url:'/pages/hostShops/hostShops?store_id='+pams.store.id
				})
			},
			//商品详情
			getDeitals()
			{
				uni.showLoading({
					title:'加载中...'
				})
				this.api.interactive.shopDeitals({
					id:this.shopId
				}).then(res=>{
					uni.hideLoading()
					if(res.code===200){
						this.shopImageMess=res.data
						this.alName=res.data.stock_keeping_units[this.attstatus].description
						this.stock_count=res.data.stock_keeping_units[this.attstatus].stock_count
						this.loadShow=true
					}
				})
			},
			//选择商品规格
			setAttr(pams,index)
			{
				this.attstatus=index
				
				this.alName=this.shopImageMess.stock_keeping_units[index].description
				this.stock_count=this.shopImageMess.stock_keeping_units[this.attstatus].stock_count
				//有选择规格的时候获取skucode
				this.shopImageMess.stock_keeping_units.map((atitem,atindex)=>{
					if(atitem.id==pams.id)
					{
						this.more_skuCode=atitem.sku_code
					}
				})
			},
			toggle(type) 
			{
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			
			attrChange()
			{
				this.status =1;
			},
			adds()
			{
				this.snums ++
			},
			reduce()
			{
				if(this.snums >1)
				{
					this.snums--
				}
			},
			closePop()
			{
				this.$refs.popup.close()
			},
			goaddres(pams)
			{
				uni.navigateTo({
					url:'/pages/addres/addres?type='+pams+'&shopId='+this.shopId+'&snums='+this.snums
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
			getAddresinfo(pams)
			{
				this.api.interactive.getAddresInfo({
					aId:pams
				}).then(res=>{
					if(res.code===200)
					{
						this.addresInfo=res.data
					}
				})
			},
			
			defaultAddres()
			{
				this.api.interactive.defaultAddres().then(res=>{
					
					if(res.code===200)
					{
						this.addresInfo=res.data
					}
				})
			},
			//立即购买
			nowBuy()
			{
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open('bottom');
			},
			//加入购物车
			addCart(item)
			{
				if(!item.stock_keeping_units[0].sku_code)
				{
					uni.showToast({
						title:'数据错误,请重新提交',
						icon:'none'
					})
					return
				}
				this.api.interactive.UserAddcart({
					sku_code:this.more_skuCode?this.more_skuCode:item.stock_keeping_units[0].sku_code,
					number:this.snums?this.snums:1
				}).then(res=>{
					if(res.code==200)
					{
						this.getCartLsit()
						uni.showToast({
							title:'加入购物车成功',
							icon:'none'
						})
					}
				
				}).catch(err=>{
					uni.showToast({
						title:'添加失败',
						icon:'error'
					})
				})
			},
			goCart()
			{
				uni.navigateTo({
					url:'/pages/goodsDeitals/cart'
				})
			},
			goService()
			{
				uni.navigateTo({
					url:'/pages/chat/chat'
				})
			},
			confirmOrder()
			{
				uni.navigateTo({
					url:'/pages/confirmOrder/confirmOrder?shopId='+this.shopId+'&attstatus='+this.attstatus+'&type=2'+'&snums='+this.snums
				})
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
	
	.iotops{
		
		
		padding-bottom: 20upx;
		border-bottom: 1upx solid #ccc;
		background-color: #fff;
		align-items: center;
		justify-content: flex-start;
		
		
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 111;
		background-color: #efefef;
		
		
	}
	.attr-intr,.ku-nums{
		font-size: 22upx;
	}
	.sl{
		font-size: 32upx;
		margin: auto;
	}
	.attrWith,.spNums{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 30upx 0;
		grid-gap: 20upx;
	}
	.uni-margin-wrap {
		width: 100%;
		padding-bottom: 30upx;
		background-color: #fff;
	}
	.swiper {
		height: 750rpx;
	}
	.imgWH{
		width: 100%;
		height: 460upx!important;
	}
	.swiper-item {
		display: block;
		height: 760rpx;
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
		height: 750rpx!important;
	}
	
	.nameWiht{
		padding: 20upx 30upx;
		font-size: 28upx;
	}
	.bOrder{
		font-size: 22upx;
		background: #FF0E0E;
		display: inline-block;
		width: 86upx;
		text-align: center;
		color: #fff;
		height: 42upx;
		line-height: 42upx;
		border-radius: 6upx;
	}
	.gnme-r
	{
		padding-left: 10upx;
	}
	.goodsMoneey{
		padding: 20upx 30upx;
		font-size: 32upx;
		color: #D02C14;
		font-weight: 600;
	}
	.yus-t{
		padding: 20upx 30upx;
		font-size: 24rpx;
		color: #999999;
	}
	.goods-intr{
		background-color: #fff;
	}
	.sele-attr{
		padding: 20upx 30upx;
	}
	.goods-attr{
		align-items: center;
		padding: 20upx 30upx;
		background-color: #fff;
		margin-top: 20upx;
	}
	.name-attr{
		font-size: 30upx;
	}
	.set-attr{
		font-size: 26upx;
		color: #999999;
	}
	.attr-nums{
		color: #999999;
		font-size: 24upx;
	}
	
	
	.goodsImg image{
		width: 101upx;
		height: 101upx;
	}
	.img-attr{
		align-items: baseline;
		padding-top: 20upx;
	}
	.popup-height{
		height: 300upx;
	}
	.atrimg{
		width: 20%;
	}
	.f-right{
		width: 80%;
	}
	.atrimg image{
		width: 120upx;
		height: 120upx;
	}
	.aImage-with{
		display: flex;
	}
	.s-attr{
		color: #999999;
		font-size: 18upx;
		padding-top: 54upx;
	}
	.attr-name{
		padding: 20upx 0;
		font-size: 28upx;
	}
	.attr-cor{
		font-size: 26upx;
		color: #999999;
	}
	.my-attr{
		background-color:#0C5290;
		color: #fff;
	}
	.attr-public{
		font-size: 18upx;
		width: 114upx;
		font-size: 28upx;
		padding: 14upx;
		text-align: center;
		border-radius: 6upx;
		margin: 10upx 20upx;
		background-color: #ccc;
		
	}
	.no-yue{
		background-color: #e6e6e6;
	}
	.is-sub view{
		width: 460upx;
		height: 80upx;
		font-size: 28upx;
		line-height: 80upx;
		color: #fff;
		margin: 20upx auto;
		text-align: center;
		margin-bottom: 40upx;
	}
	.is-sub view:nth-child(1)
	{
		border-radius: 40upx 0 0 40upx;
		
	}
	
	.new-cartfl view:nth-child(1)
	{
		background: #FEAC21;
	}
	.is-sub view:nth-child(2)
	{
		border-radius: 0 40upx 40upx 0;
	}
	.new-cartfl
	{
		display: flex;
	}
	
	.attr-name{
		margin-top: 20upx;
		align-items: center;
	}
	.pubbac{
		background: #e6e6e6;
		margin: 10upx;
		display: inline-block;
		width: 60upx;
		height: 50upx;
		font-size: 34upx;
		text-align: center;
		line-height: 50upx;
	}
	.pe-adders{
		margin-top: 20upx;
		background-color: #fff;
		padding: 20upx 30upx;
		font-size: 30upx;
	}
	.goaddrs{
		color: #999999;
	}
	.ku-po{
		font-size: 28upx;
		color: #999999;
		margin-top: 30upx;
	}
	.shop-with{
		background-color: #fff;
		padding: 20upx 30upx;
		margin-top: 20upx;
		align-items: center;
		justify-content: flex-start;
	}
	.sp-logo image{
		width: 101upx;
		height: 101upx;
	}
	.rj-img{
		flex: 1;
		text-align: end;
	}
	.rj-img image{
		width: 52upx;
		height: 52upx;
	}
	.sp-name{
		margin-left: 18upx;
		line-height: 48upx;
		font-size: 30upx;
	}
	.wz-name{
		color: #333;
	}
	.buy-num
	{
		color: #666;
		font-size: 28upx;
	}
	.goods-intrs{
		background-color: #fff;
		margin-top: 20upx;
		padding-bottom: 80upx;
	}
	.sp-intr{
		text-align: center;
		padding: 40upx 0;
		width: 100%;
		height: 100%;
	}
	.sp-Img{
		margin-bottom: 40upx;
	}
	.sp-Img image{
		width: 100%;
		
	}
	.buy-now{
		position: fixed;
		bottom: 0;
		background-color: #fff;
		height: 100upx;
		width: 100%;
		right: 0;
		left: 0;
		height: 112upx;
	
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
	}
	
	.cartWith{
		display: flex;
		font-size: 24upx;
		text-align: center;
		grid-gap: 28upx;
		padding-left: 30upx;
	}
	.cartcent{
		text-align: center;
	}
	.kfimg{
		width: 48upx;
		height: 48upx;
	}
	.cartPo{
		position: relative;
	}
	.cartNums{
		position: absolute;
		    left: 0;
		    right: 0;
		    bottom: 25upx;
		    margin-left: 70upx;
		    color: red;
			font-size: 20upx;
			width: 30upx;
			height: 30upx;
			text-align: center;
			
			line-height: 30upx;
	}
	
	
	.gobuy{
		display: flex;
		
		align-items: center;
		justify-content: flex-end;
		padding-right: 20upx;
	}
	.gobuy{
		
		padding: 3upx;
		margin-right: 40upx;
	}
	.gobuy view{
		
		height: 68upx;
		padding: 0 20upx;
		background-color: #0C5290;
		font-size: 29upx;
		color: #fff;
		line-height: 68upx;	
	}
	
	.gobuy view:nth-child(1)
	{
		background-color: #FEAC21;
	}
	.nowbuy{
		border-radius: 0 34upx 34upx 0;
	}
	.addcart{
		border-radius: 34upx 0 0 34upx;
	}
	.icfex{
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		grid-gap: 20upx;
		
	}
	.addres{
		font-size: 26upx;
	}
	.attrback{
		background-color: #0C5290!important;
		color:#fff;
	}
</style>

