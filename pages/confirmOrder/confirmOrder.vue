<template>
	<view class="ocnfirmList">
		<view class="flexs iotops" :style="[{'paddingTop':statusBar+'px'}]">
			<view @click="goBack"><uni-icons type="left" color="#666" size="27"></uni-icons></view>

			<view class="sl">结算</view>

		</view>
		<view v-if="cartStatus==1" class="pe-adders" @click="goaddres(3)">

				<view class="goaddrs icfex">
					<view>
						<uni-icons custom-prefix="iconfont" color="#000" type="icon-dingxiang" size="20"></uni-icons>
					</view>
					<view class="addresWith">
						<view class="uddresName" v-if="addresInfo">
							<text>{{addresInfo.contact_name}}</text>
							<text style="padding-left: 10upx;">{{addresInfo.contact_phone}}</text>
						</view>
						<view class="addres" v-if="addresInfo">
							{{addresInfo.province}}
							{{addresInfo.city}}
							{{addresInfo.district}}
							{{addresInfo.town}}
							{{addresInfo.address}}
						</view>
						<view class="addres" v-else>
							请添加地址
						</view>
					</view>

					<view>
						<uni-icons custom-prefix="iconfont" color="#000" type="icon-youce" size="22"></uni-icons>
					</view>
				</view>

		</view>
		<view v-else class="pe-adders" @click="goaddres(2)">

				<view class="goaddrs icfex">
					<view>
						<uni-icons custom-prefix="iconfont" color="#000" type="icon-dingxiang" size="20"></uni-icons>
					</view>
					<view class="addresWith">
						<view class="uddresName" v-if="addresInfo">
							<text>{{addresInfo.contact_name}}</text>
							<text style="padding-left: 10upx;">{{addresInfo.contact_phone}}</text>
						</view>
						<view class="addres" v-if="addresInfo">
							{{addresInfo.province}}
							{{addresInfo.city}}
							{{addresInfo.district}}
							{{addresInfo.town}}
							{{addresInfo.address}}
						</view>
						<view class="addres" style="text-align: center;"  v-else>
							请添加地址
						</view>
					</view>

					<view>
						<uni-icons custom-prefix="iconfont" color="#000" type="icon-youce" size="22"></uni-icons>
					</view>
				</view>

		</view>

		<block v-if="cartStatus==1">
			<view  class="orderShopde cartbom" v-for="(citm,cindex) in cartlist" :key="cindex">
				<view class="spllowith">
					<view class="OpIg">
						<image :src=citm.store.logo_file_url></image>
					</view>
					<view class="opName">
						{{citm.store.name}}
					</view>
				</view>
				<block v-for="(sitm,sidex) in citm.carts" :key="sitm.id">
					<view class="orShopmess cline">
						<view class="orImg">
							<image :src=sitm.product.cover_image_url mode=""></image>
							<view class="isSport">{{sitm.product.category_name}}</view>
						</view>
						<view class="orspMess">
							<view class="orspName">
								{{sitm.product.name}}
							</view>
							<view class="sp-attr">
								{{sitm.sku_description}}
							</view>
							<view class="spMoney">
								￥ {{sitm.product.price_in_cents/100*sitm.count}}
								<text v-if="sitm.product.marketing_rule==2">
									+ {{sitm.product.required_redemption_point * sitm.count}}代金券
								</text>
							</view>
						</view>

					</view>
					<view class="buyNums clines">
						<view class="flexs attr-name ">
							<view class="">购买数量</view>
							<view class="spNums spmar">
								<view class="pubbac reduce-nums" @click="reduce(sitm)">-</view>
								<view class="pubbac">
								<input type="number" style="height: 54upx;" v-model="sitm.count" name="" id="">
								</view>
								<view class="pubbac adds" @click="adds(sitm)">+</view>
							</view>
						</view>
					</view>


				</block>
				<view class="buyNums">
					<view class="flexs attr-name ">
						<view class="">配送方式</view>

						<view class="yMeth">
							<view>普通快递</view>
							<view class="">
								<uni-icons type="forward" size="22"></uni-icons>
							</view>
						</view>

					</view>
				</view>
				<view class="buyNums">
						<view class="flexs attr-name ">
							<view class="">运费</view>
							<view class="">免费</view>
						</view>

				</view>

				<view class="buyNums">
					<view class="flexs attr-name ">
							<view class="">订单备注</view>
							<view class="">
								<input type="text" v-model="comment" placeholder-style="text-align:right" placeholder="选填,请和商家协和一致" name="" id="">
							</view>
					</view>

				</view>
				<view class="buyNums">
					<view class="spNUmsMon">
						<text>共{{cartcount}}件商品</text>
						<text class="allMon">共计: ￥ {{cartmoney}}</text>
						<text v-if="carmarketing_rule==2">
							+{{cartpoint}}代金券
						</text>
					</view>
				</view>


			</view>

		</block>

		<view v-else class="orderShopde">
			<view class="spllowith">
				<view class="OpIg">
					<image :src=shoplogo></image>
				</view>
				<view class="opName">
					{{shopname}}
				</view>
			</view>
			<view class="orShopmess">
				<view class="orImg">
					<image :src=shopImageMess.cover_image_url mode=""></image>
					<view class="isSport">{{shopImageMess.category_name}}</view>
				</view>
				<view class="orspMess">
					<view class="orspName">
						{{shopImageMess.name}}
					</view>
					<view class="sp-attr">
						{{seleAttrname.description}}
					</view>
					<view class="spMoney">
						￥ {{shopmoney}}
						<text v-if="shopImageMess.marketing_rule==2">
							+ {{shopImageMess.required_redemption_point}}代金券
						</text>
					</view>
				</view>

			</view>
			<view class="buyNums">
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
			</view>

			<view class="buyNums">
				<view class="flexs attr-name ">
					<view class="">配送方式</view>

					<view class="yMeth">
						<view>普通快递</view>
						<view class="">
							<uni-icons type="forward" size="22"></uni-icons>
						</view>
					</view>

				</view>
			</view>
			<view class="buyNums">
					<view class="flexs attr-name ">
						<view class="">运费</view>
						<view class="">免费</view>
					</view>

			</view>

			<view class="buyNums">
				<view class="flexs attr-name ">
						<view class="">订单备注</view>
						<view class="">
							<input type="text" v-model="comment" placeholder-style="text-align:right" placeholder="选填,请和商家协和一致" name="" id="">
						</view>
				</view>

			</view>
			<view class="buyNums">
				<view class="spNUmsMon">
					<text>共{{snums}}件商品</text>
					<text class="allMon">共计: ￥ {{shopmoney*snums}}</text>
					<text v-if="shopImageMess.category_id==3">
						+{{shopImageMess.required_redemption_point * snums}}代金券
					</text>
				</view>
			</view>



		</view>
		<!-- 购物车商品结算 -->
		<view v-if="cartStatus==1" class="goPays">
			<view class="flexs setPay">
				<view class="smont">
					<view class="">
						应付金额:
					</view>
					<view class="yMoney">
						￥ {{cartmoney}}
						<text v-if="carmarketing_rule==2">
						 +{{cartpoint}}代金券
						</text>
					</view>
				</view>
				<view class="paySub">
					<button @click="CartsubOrder">结算</button>
				</view>
			</view>

		</view>

		<!-- 单个商品 结算-->
		<view v-else class="goPays">
			<view class="flexs setPay">
				<view class="smont">
					<view class="">
						应付金额:
					</view>
					<view class="yMoney">
						￥ {{shopmoney*snums}}
						<text v-if="shopImageMess.category_id==3">
						 +{{shopImageMess.required_redemption_point*snums}}代金券
						</text>
					</view>
				</view>
				<view class="paySub">
					<button @click="subOrder">结算</button>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				addresInfo:'',
				snums:1,
				shopId:'',
				attstatus:'',
				seleAttrname:'',
				shopImageMess:'',
				statusBar:'',
				comment:'',
				addId:'',
				shopmoney:'',
				shopname:'',
				shoplogo:'',
				cartStatus:'',
				cartlist:[],
				cartmoney:0,
				cartpoint:0,
				carmarketing_rule:0,
				cartcount:0

			}
		},
		onLoad(options)
		{
			console.log('options',options)
			var that=this;
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
				  statusBar = e.statusBarHeight
				  customBar = e.statusBarHeight + 45;
				  that.statusBar=e.statusBarHeight+16;
				}
			})
			if(options.shopId && options.shopId !=undefined)
			{
				this.shopId=options.shopId
				this.getDeitals()
			}
			if(options.attstatus && options.attstatus !=undefined)
			{
				this.attstatus=options.attstatus
			}

			if(options.snums && options.snums !=undefined)
			{
				this.snums=options.snums
			}
			if(options.addId && options.addId !=undefined)
			{
				//有选择查询当前
				this.getAddresinfo(options.addId)
				this.addId=options.addId

			}else{

				this.defaultAddres()
			}
			if(options.cartStatus !=undefined && options.cartStatus==1)
			{
				that.getcartLsit();
				that.cartStatus=1;
			}
		},
		created() {

		},
		methods: {
			getcartLsit()
			{
				this.api.interactive.UserSettlement().then(res=>{
					uni.hideLoading()
					if(res.code==200)
					{

						this.cartpoint=0
						this.cartcount=0
						this.cartlist=res.data.productInfo;
						this.cartlist.map((items,indexs)=>{
							items.carts.map((sitem,sindex)=>{
								this.cartmoney =res.data.total_price_in_cents/100
								this.cartcount+=sitem.count
								if(sitem.product.marketing_rule==2)
								{
									this.cartpoint +=sitem.product.required_redemption_point*sitem.count
									this.carmarketing_rule=sitem.product.marketing_rule
								}
							})
						})

					}

					console.log('res.data.productInfo',res.data.productInfo)
				}).catch(err=>{
					uni.hideLoading()


				})
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
						this.shopAttrNUm=res.data.specification_properties[0].specification_values.length
						this.seleAttrname=res.data.stock_keeping_units[this.attstatus]
						this.alName=res.data.stock_keeping_units[this.attstatus].description
						this.stock_count=res.data.stock_keeping_units[this.attstatus].stock_count
						this.shopmoney=this.shopImageMess.price_in_cents/100
						this.shopname=	res.data.store.name
						this.shoplogo=	res.data.store.logo_file_url
					}
				})
			},
			defaultAddres()
			{
				this.api.interactive.defaultAddres().then(res=>{
					if(res.code===200)
					{
						this.addresInfo=res.data
						this.addId=res.data.id
					}
				})
			},
			// UserchangeNumber
			adds(type)
			{
				if(type.sku_code)
				{
					this.UserchangeNumber(type,'add')
				}else{
					this.snums ++
				}
			},
			reduce(type)
			{
				if(type.sku_code)
				{
					this.UserchangeNumber(type,'red')
				}else{
					if(this.snums >1)
					{
						this.snums--
					}
				}

			},
			UserchangeNumber(pams,stat)
			{
				var count=0
				if(stat=='add')
				{
					var count=pams.count+1
				}
				if(stat=='red')
				{
					if(pams.count >1)
					{
						var count=pams.count-1
					}
				}
				if(count <=1 && pams.count <=1)
				{
					return
				}


				this.api.interactive.UserchangeNumber({
					sku_code:pams.sku_code,
					number:count
				}).then(res=>{
					if(res.code==200)
					{
						this.getcartLsit()
					}
				})
			},
			goaddres(pams)
			{
				if(pams==2)
				{
					uni.navigateTo({
						url:'/pages/addres/addres?type='+pams+'&shopId='+this.shopId+'&attstatus='+this.attstatus+'&snums='+this.snums
					})
				}
				if(pams==3)
				{
					uni.navigateTo({
						url:'/pages/addres/addres?type=3'
					})
				}

			},

			CartsubOrder()
			{

				if(!this.addId)
				{
					uni.showToast({
						title:'请选择地址',
						icon:'none'
					})
					return
				}
				uni.showLoading({
					title:' ',
					mask:true
				})
				let Cartattr=[];
				this.cartlist.map((item,index)=>{
					item.carts.map((sitm,sindex)=>{
						Cartattr.push({sorted_spec_value_ids:sitm.sorted_spec_value_ids,count:sitm.count})
					})
				})

				this.api.interactive.genOrder({
						products:Cartattr,
						delivery_address_id:this.addId,
						comment:this.comment
				}).then(res=>{

					uni.hideLoading()
					if(res.code===200 && res.data.out_trade_no)
					{
						uni.navigateTo({
							url:'/pages/payOrder/payOrder?orderId='+res.data.out_trade_no
						})
					}
				}).catch(err =>{
					uni.hideLoading()
					if(err.code===422)
					{
						uni.showToast({
							title:err.message,
							icon:'none'
						})
					}
				})
			},
			subOrder()
			{
				if(!this.addId)
				{
					uni.showToast({
						title:'请添加地址！',
						icon:'error'
					})
					return
				}
				uni.showLoading({
					title:'请求中...',
					icon:'none',
					mask:true
				})
				console.log('this.seleAttrname',this.seleAttrname)
				this.api.interactive.genOrder({
					products:[
						{sorted_spec_value_ids:this.seleAttrname.sorted_spec_value_ids,count:this.snums}],
						delivery_address_id:this.addId,
						comment:this.comment
				}).then(res=>{
					console.log('生成订单数据',res)
					uni.hideLoading()
					if(res.code===200 && res.data.out_trade_no)
					{
						uni.navigateTo({
							url:'/pages/payOrder/payOrder?orderId='+res.data.out_trade_no
						})
					}
				}).catch(err =>{
					uni.hideLoading()
					if(err.code===400)
					{
						uni.showToast({
							title:err.message,
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style>

	.iotops{
		padding-left: 20upx;
		padding-right: 20upx;
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
		padding-left: 30upx;
		padding-bottom: 20upx;

	}
	.yMoney{
		font-size: 33upx;
		font-weight: 600;
		color: red;
	}
	.attr-intr,.ku-nums{
		font-size: 22upx;
	}
	.sl{
		font-size: 32upx;
		margin: auto;
	}
	.pe-adders,.orderShopde{
		background-color: #fff;
	}

	.icfex{
		display: flex;
		justify-content: flex-start;
		padding: 30upx;
		align-items: center;
		font-size: 28upx;
	}
	.addresWith{
		flex: 1;
		padding-left: 40upx;
		line-height: 50upx;
	}
	.orderShopde{
		margin-top: 20upx;
		padding: 30upx;
	}
	.spllowith{
		padding-bottom: 20upx;
	}
	.spllowith,.orShopmess{
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.OpIg image{
		height: 96upx;
		width: 96upx;
	}
	.orImg{
		position: relative;
	}
	.orImg image{
		width: 136upx;
		height: 136upx;
	}
	.orspMess{
		padding-left: 30upx;

	}
	/* .orShopmess{
		border-top: 1upx solid #f5f5f5;
		padding-top: 30upx;
	}
	.cline{
		padding-top: 30upx;
		border-bottom: 1upx solid #f5f5f5;
	} */
	.orspName{
		font-size: 23upx;
	}
	.sp-attr{
		background-color: #0C5290;
		font-size: 20upx;
		padding: 6upx 20upx;
		text-align: center;
		color: #fff;
		margin: 16upx 0;
		width: 310upx;
	}
	.spMoney{
		color: #ef8200;
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
	.attrWith,.spNums{
		display: flex;
		align-items: center;
		justify-content: flex-start;

		grid-gap: 20upx;
	}
	.attr-name{
		align-items: center;
	}

	.buyNums{
		padding: 20upx 0;
	}
	.yMeth{
		display: flex;
		align-items: flex-start;
	}
	.spNUmsMon{
		text-align: end;
	}
	.allMon{
		padding-left: 20upx;
	}
	.goPays{

	}
	.setPay{
		align-items: center;
		background-color: #fff;
		position: fixed;

		height: 120upx;
		bottom: 0;

		left: 0;
		right: 0;
	}
	.paySub button{
		background: #0C5290;
		height: 120upx;
		padding: 0 60upx;
		line-height: 120upx;
		border-radius: unset;
		color: #fff;
	}
	.smont{
		padding-left: 30upx;
	}
	.isSport{
		background-color: #ef8200;
		font-size: 22upx;
		position: absolute;
		left: 0;
		top: 0;
		color: #fff;
		padding: 4upx;
	}
	.cline{
		margin-top: 40upx;
	}
	.clines,.spllowith{
		border-bottom: 1upx solid #f5f5f5;

	}
	.cartbom{
		padding-bottom: 160upx;
	}
</style>
