<template>
	<view class="cart">
		<!-- 购物车为空 S -->
		<view v-if="cartList.length === 0" class="empty">
			<image class="icongouwuche" src="/static/cart_null.png" mode="widthFix"></image>
			<view  class="empty-tips">
				空空如也
			</view>
			
		</view>
		
		<!-- 购物车列表 S -->
		<view class="goods-list" v-else>
			<view class="btn-clear">
				<view class="" >
					共 <text style="color: orangered;font-size: 34upx;font-weight: 600;">{{shopNums}}</text> 件宝贝
				</view>
				<view class="" @click="chooseSwitchover">
					{{adminShow? '完成': '编辑'}}
				</view>
			</view>
			<view class="yh-cart-row">
				<!-- 商品列表 S -->
				<block v-for="(item, index) in cartList" :key="index">
					<view class="carrier">
						<view class="shop">
							<view class="left">
								
								<view v-if="item.store.isShop"  @click="chooseShopSelect(index)" class="selectDefault-y">
									<view v-if="item.store.isShop" class="sicons"></view>
								</view>
								<view v-if="!item.store.isShop"  @click="chooseShopSelect(index)" class="selectPitchOn-s"></view>
								
								<view class="shop-name">
									<view class="name alsjop-name">
										{{item.store.name}}
									</view>
								</view>
							</view>
					
						</view>
						<view class="goods" v-for="(gItem, gIndex) in item.carts" :key="gIndex">
							<view class="left">
								<view  :class="gItem.product['selected']? 'selectDefault-y':'selectPitchOn-s'"   @click="chooseGoodsSelect(index, gIndex)">
									<view v-if="gItem.product['selected']" class="sicons"></view>
								</view> 
							</view>
							<view class="right">
								<image class="goods-image" :src="gItem.product['cover_image_url'] || errirImage"></image>
								<view class="goods-info">
									<view class="goods-name">
										{{gItem.product['name']}}
									</view>
									<view class="specification" @click="specificationSelection(index, gIndex)">
										<view class="specification-name cartBack">
											{{gItem['sku_description']}}
										</view>
										<!-- <view class="specification-name">
											{{gItem.goods_specification != ''? gItem.goods_specification: ''}}
										</view> -->
										<!-- <block v-if="gItem.goods_specification != ''">
											<image class="specification-image" v-if="isSelection" :src="upImage" mode="widthFix"></image>
											<image class="specification-image" v-if="!isSelection" :src="downImage" mode="widthFix"></image>
										</block> -->
									</view>
									<view class="goods-price">
										<view class="price">
											<block v-if="gItem.goods_price != ''">
												<text class="price-symbol">¥</text>
												<text class="price-marked">{{gItem.product['price_in_cents']/100}}</text>
											</block>
										</view>
										<view class="amount">
											<view class="num-minus" @click="chooseMinus(index, gIndex)">
												-
											</view>
											<view class="input-price">
												{{gItem.count}}
											</view>
											<view class="num-add" @click="chooseAddNum(index, gIndex)">
												+
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
				<!-- 商品列表 E -->
			</view>
			
		
		</view>
		<!-- 购物车列表 E -->
		<!-- 购物车结算 S -->
		<view class="goods-settle-accounts" v-if="cartList.length >0">
			<view class="left">
				<view v-if="isCheckAll" class="selectDefault-y"   @click="chooseCheckAll">
					<view v-if="isCheckAll"></view>
				</view>
				<view v-if="!isCheckAll" class="selectPitchOn-s"  @click="chooseCheckAll"></view>
				<text class="pal">全选</text>
			</view>
			<view class="right">
				<block v-if="!adminShow">
					<view class="goods-price-total">
						<text>合计: </text>
						<text>¥ {{total}}</text>
					</view>
					<view class="goods-count-btn" @click="shmmentOrder">
						去结算
					</view>
				</block>
				<block v-if="adminShow">
					<!-- <view class="goods-enshrine" @click="chooseGoodsEnshrine">
						移至收藏夹
					</view> -->
					<view class="goods-delete" @click="chooseGoodsDelete">
						删除
					</view>
				</block>
			</view>
		</view>
		<!-- 购物车结算 E -->
	</view>
</template>
 
<script>
	
	export default {
	
		data() {
			return {
				shopNums:0,
				errirImage: '',
				rightImage: '', // 右箭头图标
				shopImage: '', // 店铺图标
				selectDefault: '', // 默认图标 
				selectPitchOn: '', // 选中图标
				upImage: '', // 上
				downImage: '', // 下
				loseEfficacyImage: '', // 失效
				
				cartList: [],
				
				// cartList: [
				// 	{
				// 		shop_name: "王者系统1",
				// 		isShop: false,
				// 		goods:
				// 		 [ // 购物车数据列表
				// 			{
				// 				goods_name: "小乳酸菌牛奶酸奶饮料整箱饮品早餐酸乳益生菌",
				// 				goods_cover: "/static/img/b3.jpg",
				// 				goods_price: "520.00",
				// 				goods_num: 1,
				// 				goods_specification: "大小;尺寸",
				// 				goods_sold_out: 1,
				// 				cause: "库存不足",
				// 				selected: false,
				// 			},
				// 			{
				// 				goods_name: "小乳酸菌牛奶酸奶饮料整箱饮品早餐酸乳益生菌",
				// 				goods_cover: "/static/img/b3.jpg",
				// 				goods_price: "520.00",
				// 				goods_num: 1,
				// 				goods_specification: "大小;尺寸",
				// 				goods_sold_out: 1,
				// 				cause: "库存不足",
				// 				selected: false,
				// 				specification: []
				// 			}
				// 		]
				// 	},
				// 	{
				// 		shop_name: "王者系统2",
				// 		isShop: false,
				// 		goods: [ // 购物车数据列表
				// 			{
				// 				goods_name: "小乳酸菌牛奶酸奶饮料整箱饮品早餐酸乳益生菌",
				// 				goods_cover: "/static/img/b3.jpg",
				// 				goods_price: "520.00",
				// 				goods_num: 1,
				// 				goods_specification: "大小;尺寸",
				// 				goods_sold_out: 1,
				// 				cause: "库存不足",
				// 				selected: false,
				// 			},
				// 			{
				// 				goods_name: "小乳酸菌牛奶酸奶饮料整箱饮品早餐酸乳益生菌",
				// 				goods_cover: "/static/img/b3.jpg",
				// 				goods_price: "520.00",
				// 				goods_num: 1,
				// 				goods_specification: "大小;尺寸",
				// 				goods_sold_out: 1,
				// 				cause: "库存不足",
				// 				selected: false,
				// 				specification: []
				// 			}
				// 		]
				// 	},
				// ],
				
				goodsLoseEfficacy: [],
				total: 0, // 选中商品总价
				hasLogin: null,
				set_sku_code:[],
				// 控制滑动效果
				adminShow: false, // 编辑选择默认false
				isStop: false, // 店铺下所有商品全选/取消全选默认false
				isSelection: false, // 规格选择默认false
				isCheckAll: false, // 购物车全选/反选默认false
				ischecked:0,
				initsku_code:[]
			}
		},
		created() {
			this.getCartLsit()
		},
		methods: {
			getCartLsit()
			{
				this.api.interactive.UsercartList().then(res=>{
					uni.showLoading({
						title:'加载中...',
						mask:true
					})
					if(res.code==200)
					{
						uni.hideLoading()
						res.data.map((item,index)=>{
							item.store.isShop=false;
							this.shopNums=item.carts.length
							let tpm=0;
							this.initsku_code=[];
							 item.carts.map((sitem,sindex)=>{
								 if(sitem.is_checked==1)
								 {
									 sitem.product['selected']=true
									 tpm ++
									 this.ischecked=tpm
								
									 this.initsku_code.push(sitem.sku_code)
								 }else{
									 sitem.product['selected']=false
								 }
								 if(item.carts.length==tpm)
								 {
									item.store.isShop=true;
									this.isCheckAll=true
								 }
							 })
						})
						this.cartList=res.data;
						this.totalPrice()
					}
				}).catch(err=>{
					uni.hideLoading()
					uni.showToast({
						title:'加载失败...',
						icon:'none'
					})
				})
			},
			
			
			// 编辑按钮切换
			chooseSwitchover() {
				this.adminShow = !this.adminShow
			},
			// 选择规格
			specificationSelection(index, gindex) {
				let cartList = this.cartList;
				// console.log(cartList[index].goods[gindex])
				this.isSelection = !this.isSelection
			},
			// 增加数量
			chooseAddNum(index, gindex) {
				let cartList = this.cartList; // 购物车商品列表
				let goods_num = cartList[index].carts[gindex].count; // 获取当前数量
				
				goods_num = goods_num + 1; // 每点击一次加1
				let sku=cartList[index].carts[gindex].sku_code
				
				this.api.interactive.UserchangeNumber({
					sku_code:sku,
					number:goods_num
				}).then(res=>{
					if(res.code==200)
					{
						cartList[index].carts[gindex].count = goods_num; // 数量
						this.totalPrice();
					}
				})
				
			},
			// 减少数量
			chooseMinus(index, gindex) {
				let cartList = this.cartList; // 购物车商品列表
				let goods_num = cartList[index].carts[gindex].count; // 获取当前数量
				
				goods_num = goods_num - 1; // 每点击一次加1
				let sku=cartList[index].carts[gindex].sku_code
				
				if (goods_num <= 0) {
					return
				}
				this.api.interactive.UserchangeNumber({
					sku_code:sku,
					number:goods_num
				}).then(res=>{
					if(res.code==200)
					{
						cartList[index].carts[gindex].count = goods_num;
						this.totalPrice()
					}
				})
				
				
			},
			// 选中商品删除
			chooseGoodsDelete() {
				
				var that=this;
				
				if(that.set_sku_code.length <=0 && this.initsku_code.length <=0)
				{
					uni.showToast({
						title:'选择要删除的商品！',
						icon:'none'
					})
					return
				}
				
				if(that.set_sku_code.length >0)
				{
					
					var strs=that.set_sku_code.length
				}else{
					
					var strs=that.initsku_code.length
				}
				
			
				uni.showModal({
					content: "确认将这" +strs + "个宝贝删除?",
					cancelText: "我再想想",
					cancelColor: "#999999",
					confirmText: "删除",
					confirmColor: "#fa436a",
					success(res) {
						if (res.confirm) {
							
							that.api.interactive.UserbatchDelete({
								sku_codes:that.set_sku_code.length>0?that.set_sku_code:that.initsku_code
							}).then(res=>{
								if(res.code==200)
								{
									uni.showToast({
										title:'删除成功！',
										icon:'none'
									})
									that.getCartLsit();
									that.adminShow=false
								}
							})
							
						} else if (res.cancel) {
							console.log("我再想想")
						}
					},
				})
			},
			// 选中商品移至收藏夹
			chooseGoodsEnshrine() {
				console.log("收藏")
			},
			// 清空失效商品
			chooseLoseEfficacyGoodsEmpty() {
				uni.showModal({
					content: "确认清空失效宝贝吗?",
					cancelText: "我再想想",
					cancelColor: "#999999",
					confirmText: "清空",
					confirmColor: "#fa436a",
					success(res) {
						if (res.confirm) {
							console.log("清空")
						} else if (res.cancel) {
							console.log("我再想想")
						}
					},
				})
			},
			// 计算总价
			totalPrice() {
				let cartList = this.cartList;
				let total = 0;
				let goods_num = 0;
				
				for (let i = 0; i < cartList.length; i++) {
					for (let j = 0; j < cartList[i].carts.length; j++) 
					{
						if (cartList[i].carts[j].product.selected)
						{
							total += (cartList[i].carts[j].product.price_in_cents * cartList[i].carts[j].count);
							
							goods_num += cartList[i].carts[j].count;
						}
					}
				}
				this.total = total/100;
			},
			// 店铺选中反选
			chooseShopSelect(index) {
				let cartList = this.cartList;
				cartList[index].store.isShop = !cartList[index].store.isShop;
				for (let i = 0; i < cartList[index].carts.length; i++) {
					cartList[index].carts[i].product['selected'] = cartList[index].store.isShop
					if(cartList[index].carts[i].product['selected']==true)
					{
						this.set_sku_code.push(cartList[index].carts[i].sku_code)
					}else{
						this.set_sku_code=[]
					}
				}
				
				this.checkAllCondition(index)
				this.totalPrice()
				this.batch_check()
				
			},
			// 商品选中反选
			chooseGoodsSelect(index, gindex) {
				let cartList = this.cartList;
				let count = 0;
				let goodsList = cartList[index].carts; // 当前店铺下商品列表
				let goods = goodsList[gindex]; // 当前商品数组
				if (goods.product.selected) {
					cartList[index].carts[gindex].product.selected = false; // 改变当前商品状态
					cartList[index].store.isShop = false; // 改变店铺状态
	
				} else {
					cartList[index].carts[gindex].product.selected = true;
					// 当店铺选中商品数量与店铺总数相等时, 改变店铺状态
					let shopGoodsNum = cartList[index].carts.length;			// 店铺总个数
					let goodsArray = cartList[index].carts;
					let selectedNum = 0;
					for(var i in goodsArray) {
						if(goodsArray[i].product.selected) {
							selectedNum++
						}
					}
					if(selectedNum == goodsArray.length) {
						cartList[index].store.isShop = true
					} else {
						cartList[index].store.isShop = false
					}
					
				}
				
				cartList[index].carts.map((tim,ims)=>{
					
					if(tim.product.selected==true)
					{ 
						
						if(this.set_sku_code.indexOf(tim.sku_code)==-1)
						{
							this.set_sku_code.push(tim.sku_code)
						}
					}
				})
				
				if(cartList[index].carts[gindex].product.selected==false)
				{
					let deindex=cartList[index].carts[gindex].sku_code
					let rest=this.set_sku_code.indexOf(deindex);
					
					if(rest !=-1)
					{
						this.set_sku_code.splice(rest,1)
					}
				}
				
				
				this.batch_check()
				this.checkAllCondition(index)
				this.totalPrice()
				
			},
			// 全选条件 店铺全选  反之 
			checkAllCondition(index) {
				let isCheckAll = this.isCheckAll;
				let cartList = this.cartList;					// 购物车列表数据
				let isCheckAllNum = 0;
				for (let i = 0; i < cartList[index].carts.length; i++) {
					
					if(cartList[index].carts[i].product.selected == true) 
					{
						isCheckAllNum++
					}
				}
				if(isCheckAllNum == cartList[index].carts.length) {
					this.isCheckAll = true;
				} else {
					this.isCheckAll = false;
				}
				 this.totalPrice()
			},
			// 点击全选
			chooseCheckAll() {
				let cartList = this.cartList;
				let isCheckAll = this.isCheckAll;
				if(isCheckAll)
				{
					this.isCheckAll = false
				} else {
					this.isCheckAll = true
				}
				for(let i=0; i<cartList.length; i++) 
				{
					cartList[i].store.isShop = this.isCheckAll;
					for(let j=0; j<cartList[i].carts.length; j++)
					{
						cartList[i].carts[j].product.selected = this.isCheckAll
						console.log(cartList[i].carts[j].sku_code)
						console.log('this.isCheckAll',this.isCheckAll)
						
						if(this.isCheckAll==true)
						{
							this.set_sku_code.push(cartList[i].carts[j].sku_code)
						}else{
							this.set_sku_code=[]
						}
					}
					
				}
				
				this.totalPrice()
				this.batch_check()
				// this.getCartLsit()
			},
			//结算
			shmmentOrder()
			{
				uni.showLoading({
					title:'',
					mask:true
				})
				this.api.interactive.UserSettlement().then(res=>{
					uni.hideLoading()
					if(res.data.productInfo.length <=0)
					{
						uni.showToast({
							title:'请选择要购买的商品!',
							icon:'none'
						})
						return
					}
					uni.navigateTo({
						url:'/pages/confirmOrder/confirmOrder?cartStatus=1'
					})
					
				}).catch(err=>{
					uni.hideLoading()
					uni.showToast({
						title:'结算失败!',
						icon:'none'
					})
					
				})
				// console.log('’水电费',this.set_sku_code)
			},
			batch_check()
			{
				this.api.interactive.UserbatchCcheck({
					sku_codes:this.set_sku_code?this.set_sku_code:[]
				}).then(res=>{
					if(res.code==200)
					{
						
					}
				})
			}
		}
	}
</script>
 
<style lang="scss">
	.rightText {
		font-size: 28upx;
		padding-top: 3px;
	}
 
	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background-color: #FFFFFFF;
 
		.icongouwuche {
			width: 120upx;
		}
 
		.empty-tips {
			display: flex;
			font-size: 28upx + 2upx;
			color: #ccc;
 
			.navigator {
				margin-left: 16upx;
			}
		}
	}
 
	.goods-list {
		padding-bottom: 60upx;
		.btn-clear {
			display: flex;
			justify-content: space-between;
			margin:30upx 20upx;
		}
 
		.yh-cart-row:last-child {
			margin: 0 30upx 120upx;
		}
 
		.yh-cart-row {
			background-color: #FFFFFF;
			border-radius: 20upx;
			margin: 0 30upx 30upx;
			
			.carrier:last-child {
				border-bottom: none;
			}
 
			.carrier {
				border-bottom: 1upx dashed #EEEEEE;
				margin-bottom: 60upx;
				.shop {
					display: flex;
					align-items: center;
					padding: 30upx 30upx;
 
					.left {
						display: flex;
						align-items: center;
 
						.select {
							width: 40upx;
							margin-right: 20upx;
						}
 
						.shop-name {
							display: flex;
							align-items: center;
 
							.icon-shop {
								width: 42upx;
								margin-right: 20upx;
							}
 
							.name {
								font-size: 24upx;
								font-weight: 600;
							}
							.alsjop-name{
								padding-left: 20upx;
							}
						}
					}
 
					.right {
						width: 30upx;
						margin-left: 20upx;
					}
					.overMon{
						margin-right: 40upx;
					}
				}
 
				.goods {
					display: flex;
					align-items: center;
					padding: 0 30upx 40upx;
					position: relative;
 
					.goods-lose-efficacy-identifying {
						width: 100upx;
						height: 100upx;
						position: absolute;
						z-index: 99;
						right: 0upx;
						margin-top: -75upx;
					}
 
					.left {
						.select {
							width: 40upx;
							margin-right: auto;
						}
					}
 
					.right {
						display: flex;
						z-index: 2;
 
						.goods-image {
							width: 220upx;
							height: 220upx;
							margin-right: 20upx;
							margin-left: 20upx;
							border-radius: 20upx;
						}
 
						.goods-info {
							width: 340upx;
							padding-top: 10upx;
 
							.goods-name {
								font-size: 28upx;
							}
 
							.specification {
								display: flex;
								align-items: center;
								margin-top: 10upx;
 
								.specification-name {
									font-size: 28upx;
									color: #fff;
								}
								.cartBack{
									background: #0C5290;
									font-size: 22upx;
									padding: 5upx 20upx;
									margin: 10upx;
									width: 260upx;
									text-align: center;
								}
								.specification-image {
									width: 25upx;
									margin-left: 28upx;
								}
							}
 
							.goods-price {
								display: flex;
								justify-content: space-between;
								margin-top: 20upx;
 
								.price {
									color: #000;
 
									.price-symbol {
										font-size: 28upx;
									}
 
									.price-marked {
										font-size: 27upx;
									}
								}
 
								.amount {
									display: flex;
									align-items: center;
									height: 40upx;
									border: 1upx solid #fff;
 
									.num-minus,
									.num-add {
										width: 40upx;
										text-align: center;
										background-color: #ccc;
										font-size: 40upx;
										line-height: 40upx;
									}
 
									.num-minus {
										height: 40upx;
										border-right: 1upx solid #fff;
									}
 
									.num-add {
										height: 40upx;
										border-left: 1upx solid #fff;
									}
 
									.input-price {
										width: 60upx;
										text-align: center;
									}
								}
							}
						}
 
						.goods-info-s {
							// 失效商品样式
							width: 400upx;
							padding-top: 10upx;
 
							.goods-names {
								font-size: 28upx;
								color: #fff;
							}
 
							.specification {
								display: flex;
								align-items: center;
								margin-top: 10upx;
 
								.specification-name {
									font-size: 28upx;
									color: #fff;
								}
 
								.specification-image {
									width: 25upx;
									margin-left: 28upx;
								}
							}
 
							.goods-price {
								display: flex;
								justify-content: space-between;
								margin-top: 20upx;
								align-items: center;
 
								.goods-cause {
									// 商品失效原因
									font-size: 28upx;
									margin-top: 45upx;
								}
 
								.goods-similarity {
									font-size: 28upx;
									color: #000;
									padding: 5upx 10upx;
									border: 1upx solid #000;
									margin-top: 45upx;
									border-radius: 20upx;
								}
							}
						}
					}
				}
 
				.carrier-title {
					display: flex;
					justify-content: space-between;
					padding: 20upx 30upx 30upx;
 
					.goods-lose-efficacy-num {
						font-size: 28upx;
						font-weight: 600;
					}
 
					.goods-lose-efficacy-operation {
						font-size: 28upx;
						padding-top: 4upx;
						color: #000;
					}
				}
			}
		}
	}
 
	.goods-settle-accounts {
		height: 112upx;
		position: fixed;
		bottom: 0;
		z-index: 99;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		border-top: 1upx solid #ccc;
 
		.left {
			display: flex;
			align-items: center;
			margin-left: 30upx;
			.select {
				width: 40upx;
				margin-right: 28upx;
			}
		}
 
		.right {
			display: flex;
			align-items: center;
			margin-right: 30upx;
			.goods-price-total {
				font-size: 24upx;
			}
 
			.goods-price-total text:nth-child(2) {
				font-size: 28upx;
				padding-top: 4upx;
				margin-left: 8upx;
				color: #000;
			}
 
			.goods-count-btn {
				font-size: 32upx;
				background-color: #EE4C1C;
				color: #fff;
				border-radius: 60upx;
				text-align: center;
				padding: 16upx 60upx;
				margin-left: 20upx;
			}
 
			.goods-enshrine {
				color: #000;
				padding: 16upx 60upx;
				border: 1upx solid #000;
				border-radius: 30upx;
				margin-right: 30upx;
			}
 
			.goods-delete {
				color: #fff;
				padding: 16upx 60upx;
				border: 1upx solid red;
				border-radius: 40upx;
				background-color: #EE4C1C;
			}
		}
	}
	.selectPitchOn-s{
		width: 34upx;
		height: 34upx;
		border: 1upx solid #999;
		border-radius: 100%;
	}
	.pal{
		margin-left: 20upx;
	}
	.selectDefault-y{
		width: 27upx;
		height: 27upx;
		
		 padding: 6upx;
		 border: 1upx solid #FD8902;
		 background-color: #FD8902;
		 background-clip:content-box;
		 border-radius: 50%;

		  
	}
	
</style>