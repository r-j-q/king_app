<template>
	<view class="orderWith">
		<view class="tabpost">
			<view class="flexs orderTabs">
				<view :class="tabs==1?'act':'noact'" @click="orTabs(1)">
					全部
					<view :class="tabs==1?'btco':''"></view>
				</view>
				<view :class="tabs==2?'act':'noact'"  @click="orTabs(2)">
					待付款
					<view :class="tabs==2?'btco':''"></view>
				</view>
				<view :class="tabs==3?'act':'noact'"  @click="orTabs(3)">
					待发货
					<view :class="tabs==3?'btco':''"></view>
				</view>
				<view :class="tabs==4?'act':'noact'"  @click="orTabs(4)">
					待收货
					<view :class="tabs==4?'btco':''"></view>
				</view>
				<!-- <view :class="tabs==6?'act':'noact'"  @click="orTabs(6)">
					退款
					<view :class="tabs==6?'btco':''"></view>
				</view> -->
				<view :class="tabs==5?'act':'noact'"  @click="orTabs(5)">
					已完成
					<view :class="tabs==5?'btco':''"></view>
				</view>
			</view>

		</view>

		<!-- 全部订单 -->
		<view v-if="tabs==1">
			<view class="setbomm" v-if="orderList.length >0">
				<view class="order-status" @click.stop="orderDeitals(item)"  v-for="(item,index) in orderList" :key="item.id">

					<view class="flexs setor">
						<view class="stopWith" >
							<view class="stlogo">
								订单编号:{{item.out_trade_no}}
							</view>
						</view>
						<view class="orderType" v-if="item.status==0">待付款</view>
						<view class="orderType" v-if="item.status==1">待发货</view>
						<view class="orderType" v-if="item.status==2">待收货</view>
						<view class="orderType" v-if="item.status==3">已完成</view>
						<view class="orderType" v-if="item.status==4">已取消</view>
					</view>

					<view class="orMess-img" v-for="(sitem,sindex) in item.order_products" :key="sitem.id">

						<view class="flexs">
							<view class="orImg">
								<image :src=sitem.product_cover_image_url></image>
								<view class="ortype">
									<text class="b-or">{{sitem.product_category_name}}</text>
								</view>
							</view>

							<view class="flexs orgoods-mess">
								<view class="goodDe">
									<view>
										<text class="or-gname">{{sitem.product_name}}</text>
									</view>
									<view class="on-f">规格：{{sitem.sku_description}}</view>
									<view class="on-f">数量：{{sitem.count}}       </view>
								</view>
							</view>
						</view>


						<view class="payorder" v-if="item.status==0">
							<view class="ordate">
								<text>共计{{sitem.count}}件商品</text>,
								<text>单价金额:￥  {{sitem.price_in_cents/100}}</text>
								<text v-if="sitem.marketing_rule==2" style="padding: 10upx;">+{{sitem.required_redemption_point*sitem.count}} 代金券</text>
							</view>
							<view class="ordate setime" >{{getCurrentTime(sitem.created_at)}}</view>

						</view>
						<view class="payorder" v-if="item.status==2">

							<view class="ordate">
								<text>共计{{sitem.count}}件商品</text>,
								<text>单价金额:￥  {{item.final_price_in_cents/100}}</text>
							</view>
							<view class="ordate setime" >{{getCurrentTime(sitem.created_at)}}</view>

						</view>
						<view class="payorder" v-if="item.status==3">

							<view class="ordate">
								<text>共计{{sitem.count}}件商品</text>,
								<text>单价金额:￥  {{sitem.price_in_cents/100}}</text>
							</view>
							<view class="ordate setime" >{{getCurrentTime(sitem.created_at)}}</view>

						</view>

					</view>

					<block v-if="item.status==0">
						<view class="allmp" style="font-size: 28upx;color: #D02C14;font-weight: 600;text-align: end;">
							合计金额: ￥ {{item.product_price_in_cents/100}}
							<block v-if="item.used_redemption_point >0">
								+{{item.used_redemption_point}}代金券
							</block>
						</view>

					</block>
					<block v-if="item.status==2">
						<view class="allmp" style="font-size: 28upx;color: #D02C14;font-weight: 600;text-align: end;">
							合计金额: ￥ {{item.product_price_in_cents/100}}
						</view>


					</block>
					<block v-if="item.status==3">
						<view class="allmp" style="font-size: 28upx;color: #D02C14;font-weight: 600;text-align: end;">
							合计金额: ￥ {{item.final_price_in_cents/100}}
							<text v-if="item.used_redemption_point>0" style="padding: 10upx;">+{{item.used_redemption_point}} 代金券</text>
						</view>
					</block>

					<block v-if="item.status==4">
						<view class="allmp" style="font-size: 28upx;color: #D02C14;font-weight: 600;text-align: end;">
							合计金额: ￥ {{item.product_price_in_cents/100}}

						</view>
					</block>



				</view>
			</view>
			<view class="nodata"  v-else-if="!orderShow && orderList.length==0">
				<view>
					<uni-icons type="info-filled" size="30"></uni-icons>
				</view>
				<view class="">
					暂无数据
				</view>
			</view>

		</view>
		<!-- 代付款-->
		<view v-if="tabs==2">
			<view class="setbomm" v-if="orderList.length >0">
				<view class=" order-status" @click.stop="orderDeitals(item)" v-for="(item,index) in orderList" :key="item.id">
					<view class="flexs setor">
						<view class="stopWith">
							<view class="stlogo">
								订单编号:{{item.out_trade_no}}
							</view>

						</view>
						<view class="orderType" v-if="item.status==0">待付款</view>
						<view class="orderType" v-if="item.status==1">待发货</view>
						<view class="orderType" v-if="item.status==2">待收货</view>
						<view class="orderType" v-if="item.status==3">已完成</view>
						<view class="orderType" v-if="item.status==4">已取消</view>
					</view>
					<view class="flexs">


					</view>
					<view class="orMess-img" v-for="(sitem,sindex) in item.order_products" :key="sitem.id">
						<view class="flexs">
							<view class="orImg">
								<image :src=sitem.product_cover_image_url></image>
								<view class="ortype">
									<text class="b-or">{{sitem.product_category_name}}</text>
								</view>
							</view>

							<view class="flexs orgoods-mess">
								<view class="goodDe">
									<view>
										<text class="or-gname">{{sitem.product_name}}</text>
									</view>
									<view class="on-f">规格：{{sitem.sku_description}}</view>
									<view class="on-f">数量：{{sitem.count}}       </view>

								</view>

							</view>

						</view>
						<view class="payorder" v-if="item.status==0">

							<view class="ordate ">
								<text>共计{{sitem.count}}件商品 </text>,
								<text style="padding-left: 10upx;">
									单价金额:￥{{sitem.price_in_cents/100}}
								</text>
							</view>
							<view class="ordate setime" >{{getCurrentTime(sitem.created_at)}}</view>

						</view>
					</view>
					<block v-if="item.status==0">
						<view class="allmp" style="font-size: 28upx;color: #D02C14;font-weight: 600;text-align: end;">
							合计金额: ￥ {{item.product_price_in_cents/100}}
							<block v-if="item.used_redemption_point >0">
								+{{item.used_redemption_point}}  代金券
							</block>
						</view>

					</block>



				</view>
			</view>
			<view class="nodata"  v-else-if="!orderShow">
				<view>
					<uni-icons type="info-filled" size="30"></uni-icons>
				</view>
				<view class="">
					暂无数据
				</view>
			</view>

		</view>

		<!-- 待发货-->
		<view v-if="tabs==3">
			<view class="setbomm" v-if="orderList.length >0">
				<view class=" order-status"  @click.stop="orderDeitals(item)" v-for="(item,index) in orderList" :key="item.id">

					<view class="flexs setor">
						<view class="stopWith" >

								<view class="stlogo">
									订单编号:{{item.out_trade_no}}
								</view>

						</view>
						<view class="orderType" v-if="item.status==0">待付款</view>
						<view class="orderType" v-if="item.status==1">待发货</view>
						<view class="orderType" v-if="item.status==2">待收货</view>
						<view class="orderType" v-if="item.status==3">已完成</view>
						<view class="orderType" v-if="item.status==4">已取消</view>
					</view>

					<view class="orMess-img" v-for="(sitem,sindex) in item.order_products" :key="sitem.id">

						<view class="flexs">
							<view class="orImg">
								<image :src=sitem.product_cover_image_url></image>
								<view class="ortype">
									<text class="b-or">{{sitem.product_category_name}}</text>
								</view>
							</view>

							<view class="flexs orgoods-mess">
								<view class="goodDe">
									<view>
										<text class="or-gname">{{sitem.product_name}}</text>
									</view>
									<view class="on-f">规格：{{sitem.sku_description}}</view>
									<view class="on-f">数量：{{sitem.count}}       </view>

								</view>

							</view>
						</view>


						<view class="payorder" v-if="item.status==1">

							<view class="ordate">
								<text>共计{{sitem.count}}件商品</text>,
								<text>
									单价金额:￥  {{sitem.price_in_cents/100}}
									<block v-if="sitem.marketing_rule==2">
										+{{sitem.required_redemption_point * sitem.count}} 代金券
									</block>
								</text>

							</view>
							<view class="ordate setime" >{{getCurrentTime(sitem.created_at)}}</view>

						</view>
					</view>
					<block v-if="item.status==1">
						<view class="allmp" style="font-size: 28upx;color: #D02C14;font-weight: 600;text-align: end;">
							合计金额: ￥ {{item.final_price_in_cents/100}}
							<block v-if="item.used_redemption_point >0">
								+{{item.used_redemption_point}}代金券
							</block>
						</view>
					</block>

				</view>
			</view>
			<view class="nodata"  v-else-if="!orderShow">
				<view>
					<uni-icons type="info-filled" size="30"></uni-icons>
				</view>
				<view class="">
					暂无数据
				</view>
			</view>

		</view>

		<!-- 待收货-->
		<view v-if="tabs==4">
			<view class="setbomm" v-if="orderList.length >0">
				<view class=" order-status" @click.stop="orderDeitals(item)"  v-for="(item,index) in orderList" :key="item.id">

					<view class="flexs setor">
						<view class="stopWith" >
							<view class="stlogo">
								订单编号:{{item.out_trade_no}}
							</view>

						</view>
						<view class="orderType" v-if="item.status==0">待付款</view>
						<view class="orderType" v-if="item.status==1">待发货</view>
						<view class="orderType" v-if="item.status==2">待收货</view>
						<view class="orderType" v-if="item.status==3">已完成</view>
						<view class="orderType" v-if="item.status==4">已取消</view>
					</view>

					<view class="orMess-img" v-for="(sitem,sindex) in item.order_products" :key="sitem.id">

						<view class="flexs">
							<view class="orImg">
								<image :src=sitem.product_cover_image_url></image>
								<view class="ortype">
									<text class="b-or">{{sitem.product_category_name}}</text>
								</view>
							</view>

							<view class="flexs orgoods-mess">
								<view class="goodDe">
									<view>
										<text class="or-gname">{{sitem.product_name}}</text>
									</view>
									<view class="on-f">规格：{{sitem.sku_description}}</view>
									<view class="on-f">数量：{{sitem.count}}       </view>

								</view>

							</view>
						</view>


						<view class="payorder" v-if="item.status==2">

							<view class="ordate">
								<text>共计{{sitem.count}}件商品</text>,
								<text>单价金额:￥  {{sitem.price_in_cents/100}}</text>
							</view>
							<view class="ordate setime" >{{getCurrentTime(sitem.created_at)}}</view>

						</view>


					</view>
					<block v-if="item.status==2">
						<view class="allmp" style="font-size: 28upx;color: #D02C14;font-weight: 600;text-align: end;margin-bottom: 30upx;">
							合计金额: ￥ {{item.final_price_in_cents/100}}
							<block v-if="item.used_redemption_point >0">
								+{{item.used_redemption_point}}代金券
							</block>
						</view>

					</block>
				</view>
			</view>
			<view class="nodata"  v-else-if="!orderShow ">
				<view>
					<uni-icons type="info-filled" size="30"></uni-icons>
				</view>
				<view class="">
					暂无数据
				</view>
			</view>

		</view>

		<!-- 已完成-->
		<view v-if="tabs==5 ">
			<view class="setbomm" v-if="orderList.length >0 ">
				<view class=" order-status" @click.stop="orderDeitals(item)" v-for="(item,index) in orderList" :key="item.id">

					<view class="flexs setor">
						<view class="stopWith" >
							<view class="stlogo">
								订单编号:{{item.out_trade_no}}
							</view>


						</view>
						<view class="orderType" v-if="item.status==0">待付款</view>
						<view class="orderType" v-if="item.status==1">待发货</view>
						<view class="orderType" v-if="item.status==2">待收货</view>
						<view class="orderType" v-if="item.status==3">已完成</view>
						<view class="orderType" v-if="item.status==4">已取消</view>
					</view>

					<view class="orMess-img" v-for="(sitem,sindex) in item.order_products" :key="sitem.id">

						<view class="flexs">
							<view class="orImg">
								<image :src=sitem.product_cover_image_url></image>
								<view class="ortype">
									<text class="b-or">{{sitem.product_category_name}}</text>
								</view>
							</view>

							<view class="flexs orgoods-mess">
								<view class="goodDe">
									<view>
										<text class="or-gname">{{sitem.product_name}}</text>
									</view>
									<view class="on-f">规格：{{sitem.sku_description}}</view>
									<view class="on-f">数量：{{sitem.count}}       </view>

								</view>

							</view>
						</view>


						<view class="payorder" v-if="item.status==3">

							<view class="ordate">
								<text>共计{{sitem.count}}件商品</text>,
								<text>单价金额:￥  {{sitem.price_in_cents/100}}</text>
							</view>
							<view class="ordate setime" >{{getCurrentTime(sitem.created_at)}}</view>

						</view>
					</view>
				<block v-if="item.status==3">
					<view class="allmp" style="font-size: 28upx;color: #D02C14;font-weight: 600;text-align: end;">
						合计金额: ￥ {{item.final_price_in_cents/100}}

						<text v-if="item.used_redemption_point>0" style="padding: 10upx;">
							+{{item.used_redemption_point}} 代金券
						</text>
					</view>
				</block>
				</view>
			</view>
			<view class="nodata" v-else-if="!orderShow">
				<view>
					<uni-icons type="info-filled" size="30"></uni-icons>
				</view>
				<view class="">
					暂无数据
				</view>
			</view>

		</view>


		<!-- <view v-show="tabs==6">
			<view class=" order-status">

				<view class="flexs setor">
					<view class="oreder-nums">
						<text>订单号：399777889</text>
						<text class="order-date">2022-6-11 23:20</text>
					</view>
					<view class="orderType">退款</view>
				</view>
				<view class="flexs orMess-img">
					<view class="orImg">
						<image src="../../static/img/b3.jpg"></image>
					</view>
					<view class="flexs orgoods-mess">
						<view class="goodDe">
							<view>
								<text class="b-or">爆单</text>
								<text class="or-gname">顺炁人参不定...</text>
							</view>
							<view class="on-f">规格：盒装</view>
							<view class="on-f">数量：10       </view>
							<view class="on-f">应付金额：<text class="o-money">￥1980.00</text></view>
						</view>
						<view class="ot-mon">￥977.00</view>
					</view>
				</view>

			</view>

		</view>
		 -->
		<view class="op-height">
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content" v-if="wMess">

					<view class="wuliuMess">物流信息</view>
					<view class="flexs otw">
						<view>物流单号:</view>
						<view>{{wMess.shipping_serial_number}}</view>
					</view>
					<view class="flexs otw">
						<view>快递公司:</view>
						<view>{{wMess.shipping_company_name}}</view>
					</view>
					<view class="flexs otw">
						<view>下单时间:</view>
						<view>{{getCurrentTime(ordatime)}}</view>
					</view>
					<view class="flexs otw">
						<view>配送地址:</view>
						<view>
							<view class="">
								<text>{{wMess['order'].delivery_contact_name}} </text>
								<text style="padding-left: 10upx;">{{wMess['order'].delivery_contact_phone}}</text>
							</view>
							<view class="">
								{{wMess['order'].delivery_province}}
								{{wMess['order'].delivery_city}}
								{{wMess['order'].delivery_district}}
								{{wMess['order'].delivery_address}}
							</view>
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
				tabs:1,
				page:1,
				page_size:10,
				orderList:[],
				unlist:[],
				orderShow:false,
				ispage:true,
				wMess:'',
				ordatime:''
			}
		},
		onLoad(options) {

			if(options.ortype)
			{
				this.tabs=options.ortype;

			}
			if(parseInt(this.tabs)===2)
			{
				this.payuUnfinished()
			}
		},
		created() {
			this.Seleorder(this.tabs);
		},
		methods: {
			orTabs(pams)
			{
				this.tabs=pams
				this.ispage=true
				this.page=1
				this.orderList=[];
				if(this.tabs==2)
				{
					// this.payuUnfinished()
					this.Seleorder(pams)
				}else{

					this.Seleorder(pams)
				}

			},
			Seleorder(pams)
			{
				console.log('分页',pams)
				if(!this.ispage)
				{
					return false
				}
				this.orderShow=false;
				uni.showToast({
					title:'加载中...',
					icon:'none',
					mask:true
				})

				if(pams ==1 ||  pams==undefined)
				{

					var ispams={
						page:this.page,
						page_size:this.page_size,
					}
				}else{
					if(pams==2)
					{
						var order_status=0
					}
					if(pams==3)
					{
						var order_status=1
					}
					if(pams==4)
					{
						var order_status=2
					}
					if(pams==5)
					{
						var order_status=3
					}
					var ispams={
						page:this.page,
						page_size:this.page_size,
						order_status
					}
				}
				this.api.store.orderApp(ispams).then(res=>{

					uni.hideLoading()
					if(res.code===200 && res.data.data.length >0)
					{
						this.orderShow=true;
						if (this.page>1)
						{
							res.data.data=this.orderList.concat(res.data.data)
						}
						this.orderList=res.data.data

					}else{
						this.ispage=false;
						uni.showToast({
							title:'没有更多数据!',
							icon:'none',
							duration:3000
						})

						return;
					}
				})
			},

			//代付款
			payuUnfinished()
			{
				if(!this.ispage)
				{
					return false
				}
				this.orderShow=false;
				uni.showToast({
					title:'加载中...',
					icon:'none',
					mask:true
				})
				this.api.interactive.payuUnfinished().then(res=>{
					console.log('代付款',res)
					if(res.code===200 && res.data.data.length >0)
					{
						this.orderShow=true;
						if (this.page>1)
						{
							res.data.data=this.unlist.concat(res.data.data)
						}

						this.unlist=res.data.data

					}else{

						this.ispage=false;
						uni.showToast({
							title:'没有更多数据!',
							icon:'none',
							duration:3000
						})
						return;
					}
				})
			},
			getCurrentTime(t) {

				var date = new Date(t);//当前时间


				 var year = date.getFullYear() //年
				 var month = this.repair(date.getMonth() + 1);//月
				 var day = this.repair(date.getDate());//日
				 var hour = this.repair(date.getHours());//时
				 var minute = this.repair(date.getMinutes());//分
				 var second = this.repair(date.getSeconds());//秒

				 //当前时间
				 var curTime = year + "-" + month + "-" + day
						 + " " + hour + ":" + minute + ":" + second;
				 return curTime;
			},

			 //若是小于10就加个0

			  repair(i){
				 if (i >= 0 && i <= 9) {
					 return "0" + i;
				 } else {
					 return i;
				 }
			 },

			 // 进入店铺
			 goStore(pams)
			 {
				 console.log('店铺',pams)
				 uni.navigateTo({
				 	url:'/pages/hostShops/hostShops?store_id='+pams
				 })
			 },
			 //提交订单
			 subOrder(out_trade_no)
			 {

			 	uni.navigateTo({
			 		url:'/pages/payOrder/payOrder?orderId='+out_trade_no.out_trade_no
			 	})
			 },
			 // 查看物流信息
			 seleWu(item)
			 {
				 console.log('物流信息',item);
				 this.$refs.popup.open('bottom');
				 this.api.interactive.userdeliverypackage(item.delivery_packages[0].id).then(res=>{
					 console.log('物流信息',res);
					 if(res.code===200)
					 {
						 this.wMess=res.data
						 this.ordatime=this.wMess.order_products[0].updated_at

						 console.log('thisis',this.wMess.order)

					 }
				 })
			 },
			 //确认收货
			 subConfirmgoods(item)
			 {
				 // serial_number
				 console.log('确认收货',item)
				 console.log('提示书',this.tabs)
				 this.api.interactive.userReceipt({
					 id:item.serial_number,
					 type:'sign'
				 }).then(res=>{
					 if(res.code===200)
					 {
						 uni.showToast({
						 	title:'收货成功！',
							icon:'success'
						 })
						 setTimeout(()=>{
							 this.Seleorder(parseInt(this.tabs))
						 },1000)
					 }
				 })
			 },
			 orderDeitals(item)
			 {
				uni.navigateTo({
					url:'/pages/orderList/deitals?orderId='+item.out_trade_no
				})
				 console.log('订单详情',item)
			 }


		},

		onReachBottom() {
			this.page++

			this.Seleorder(parseInt(this.tabs));

		},
	}
</script>

<style>
	.wuliuMess{
		text-align: center;
		font-weight: 600;
		font-size: 28upx;
	}
	.wMesssub{
		display: flex;
		justify-content: flex-end;
		grid-gap: 30upx;
	}
	.otw{
		margin-top: 40upx;
		border-bottom: 1upx solid #ccc;
		padding-bottom: 30upx;
		text-align: right;
	}
	.stopWith{
		display: flex;
		align-items: center;
		font-size: 24upx;
	}

	.stlogo image{
		width: 60upx;
		height: 60upx;
	}
	.stName{
		padding-left: 6upx;
	}
	.cartFl{
		display: flex;
		justify-content: center;
		align-items: flex-start;

	}
	.tabpost{
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 111;
		background-color: #f5f5f5;
	}
	.nordata{
		text-align: center;
		background-color: #fff;
		padding: 20upx;
	}
	.nodata{
		text-align: center;
		color: gray;
		margin-top: 40upx;
	}
	.payorder button{
		background-color: #2F5597;
		width: 150upx;
		margin-right: inherit;
		font-size: 24upx;
		padding: 14upx 10upx;
		color: #fff;
	}
	.allmp{
		margin-top: 30upx;
	}
	.orMess-img{
		border-bottom: 1upx solid #EFEFEF;
	}

.orderTabs{
	padding: 32upx 48upx;
	font-size: 28upx;
	text-align: center;
	border: 1upx solid #FAFAFA;

}
.act{
	color: #333333;
	font-size: 30upx;

}

.on-f{
	font-size: 24upx!important;
}
.or-gname{
	font-size: 26upx!important;
}
.orderType{
	font-size: 26upx;
	font-weight: 600;
	color: #D02C14;
}
.btco{
	width: 36upx;
	height: 6upx;
	background: #2F5597;
	border-radius: 3upx;
	margin: 10upx auto;
}
.noact{
	color: #666;
}
.order-status{
	padding: 30upx;
	background-color: #fff;
	margin-bottom: 20upx;
}

.orImg image{
	width: 171upx;
	height: 171upx;
}
.orImg{
	position: relative;
	border: 1upx solid #EFEFEF;
}
.orMess-img{
	justify-content: flex-start;
	padding-top: 20upx;
	align-items: center;
}
.ortype{
	position: absolute;
	    bottom: 0;
	    top: 0;
	    right: 0;
}
.setor{
	border-bottom: 1upx solid #EFEFEF;
	padding-bottom: 20upx;
}
.goodDe{
	font-size: 28upx;
	line-height: 44upx;
}
.order-date{
	padding-left: 17upx;
	font-size: 26upx;
	font-family: Microsoft YaHei;
	font-weight: 300;
	color: #999999;
}
.o-money{
	font-size: 28upx;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #D02C14;
	font-weight: 600;
}
.b-or{

	background: #FF0E0E;
	border-radius: 3upx;
	display: inline-block;
	font-size: 22upx;
	text-align: center;
	color: #fff;
	padding: 4upx 10upx;
}

.orgoods-mess{
	flex: 1;
	padding-left: 30upx;
}
.on-f{
	font-size: 26upx;
	color: #999999;
}
.ot-mon{
	font-size: 28upx;
	color: #999999;
}
.ordate{
	text-align: end;
	padding-top: 30upx;
	font-size: 24upx;
	color: gray;
}
.setime{
	padding: 10upx 0 20upx 0;
}
.iswu button{
	background-color: #b0e0e6;
}
.popup-content{
	padding-bottom: 60upx;
}
.setbomm{
	padding-bottom: 5upx;
}
</style>
