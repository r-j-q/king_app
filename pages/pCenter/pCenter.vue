<template>
	<view class="per-center"  v-if="isdata">
		<view class="pBk">
			<view class="setTool" @click="sets"  :style="[{'paddingTop':statusBar+'px'}]">
				<uni-icons type="gear" size="30"></uni-icons>
			</view>
			<view class="per-mess">
				<view class="pImg" >
					<image v-if="userMess.avatar" :src=userMess.avatar></image>
					<image v-else src="/static/img/p.png"></image>
				</view>
				<view class="flexs pDdeit">
					<view class="gomon">
						<view class="flexs pusju">
							<view class="userName">
								<text class="uName">{{userMess.name}}</text>
							</view>
							<view class="flexs pusju q-back" @click="goSubaccount">
								<view>切换账号</view>
								<image src="../../static/img/q.png"></image>
							</view>
						</view>
						<view class="flexs nldata" @click="authe">
							<view>纳零王者号：{{userMess.username}}</view>
							<view class="accRe">账号认证</view>
						</view>
						<!-- <view class="level-er">

							<view class="t1" v-if="userMess.business_level_name">
							  {{userMess.business_level_name}}
							</view>

							<view class="t2" v-if="userMess.is_marketing_center && !userMess.is_super_member">运营中心</view>

							<view class="t3" v-if="userMess.is_super_member">超级管家</view>

						</view> -->

						<!-- <view class="flexs addconut"> -->
							<!-- <view class="">
								<view class="y-mon">
									余额：￥{{blance}}
								</view>
								<view class="f-sco">代金券：{{userpoint.remain_points}}</view>
							</view> -->

							<!-- <view class="gomoney" @click="gowdraw">
								提现
							</view> -->
						<!-- </view> -->

					</view>


				</view>
			</view>
			<!-- <view class="flexs sy-mess">
				<view class="ever-mom">
					<view class="mo1">￥{{today_profit_in_cents}}</view>
					<view class="mo-d">今日收益</view>
				</view>
				<view class="ever-mom">
					<view class="mo1">￥{{yesterday_profit_in_cents}}</view>
					<view class="mo-d">昨日收益</view>
				</view>
				<view class="ever-mom">
					<view class="mo1">￥{{this_month_profit_in_cents}}</view>
					<view class="mo-d">本月收益</view>
				</view>
			</view> -->

		</view>
		<view class="myorder">
			<view class="flexs orderName shou-or">
				<view>我的订单</view>
				<view class="mo-colt"  @click="goOrder(1)">全部订单<uni-icons type="right" color="#666" size="16"></uni-icons></view>
			</view>
			<view class="flexs order-tabs">
				<view class="orderlist orderWith" @click="goOrder(2)">
					<view class="orImg">
						<image src="../../static/img/d1.png"></image>
					</view>
					<view>待付款</view>
				</view>
				<view class="orderlist" @click="goOrder(3)">
					<view class="orImg">
						<image src="../../static/img/d2.png"></image>
					</view>
					<view>待发货</view>
				</view>
				<view class="orderlist" @click="goOrder(4)">
					<view class="orImg">
						<image src="../../static/img/d3.png"></image>
					</view>
					<view>待收货</view>
				</view>
				<!-- <view class="orderlist" @click="goOrder(6)">
					<view class="orImg">
						<image src="../../static/img/d4.png"></image>
					</view>
					<view>退款</view>
				</view> -->
				<view class="orderlist" @click="goOrder(5)">
					<view class="orImg">
						<image src="../../static/img/d5.png"></image>
					</view>
					<view>已完成</view>
				</view>
			</view>

			<view class="ologo">
				<image src="../../static/img/ol.png"></image>
			</view>

			<view class="flexs orderName shou-or">
				<view>我的工具</view>
				<!-- <view class="mo-colt">更多</view> -->
			</view>
			<view class="flexs order-tabs pmargp">
				<view class="orderlist pfex" @click="goMyshop">
					<view class="orImg">
						<image src="../../static/img/o1.png"></image>
					</view>
					<view>我的商城</view>
				</view>
				
				<view class="orderlist pfex" @click="goEquity">
					<view class="orImg">
						<image src="../../static/img/o4.png"></image>
					</view>
					<view>权益中心</view>
				</view>
				<view class="orderlist pfex" @click="goMyqr">
					<view class="orImg">
						<image  src="../../static/img/o5.png"></image>
					</view>
					<view>推广二维码</view>
				</view>
				<view class="orderlist pfex" @click="upgrade">
					<view class="orImg">
						<image  src="../../static/img/orp.png"></image>
					</view>
					<view>账号升级</view>
				</view>
				
				<view class="orderlist pfex" @click="goaddres">
					<view class="orImg">
						<image src="../../static/img/o6.png"></image>
					</view>
					<view>收货地址</view>
				</view>
				<view class="orderlist pfex" @click="goCard">
					<view class="orImg">
						<image src="../../static/img/o8.png"></image>
					</view>
					<view>我的卡券</view>
				</view>
				<view class="orderlist pfex" @click="goFeedback">
					<view class="orImg">
						<image src="../../static/img/o9.png"></image>
					</view>
					<view>意见反馈</view>
				</view>
			</view>
			<view class="flexs order-tabs pmargp two-orm">
				
				
				<!-- <view class="orderlist pfex" @click="goaddres">
					<view class="orImg">
						<image src="../../static/img/o6.png"></image>
					</view>
					<view>收货地址</view>
				</view> -->
				<!-- <view class="orderlist pfex" @click="goYcenter">
					<view class="orImg">
						<image src="../../static/img/o7.png"></image>
					</view>
					<view>运营中心</view>
				</view> -->
				<!-- <view class="orderlist pfex" @click="goCard">
					<view class="orImg">
						<image src="../../static/img/o8.png"></image>
					</view>
					<view>我的卡券</view>
				</view> -->
				<!-- <view class="orderlist pfex" @click="goFeedback">
					<view class="orImg">
						<image src="../../static/img/o9.png"></image>
					</view>
					<view>意见反馈</view>
				</view> -->
				<!-- <view class="orderlist pfex" @click="goTax">
					<view class="orImg">
						<image src="../../static/img/o10.png"></image>
					</view>
					<view>税务凭证</view>
				</view> -->

			</view>
		</view>
		<!-- <view class="orm-fg"></view> -->
	</view>
</template>

<script>
	export default{
		data()
		{
			return {
				statusBar:'',
				userpoint:'',
				userbance:'',
				blance:'',
				userMess:'',
				isdata:true,
				today_profit_in_cents:'',
				yesterday_profit_in_cents:'',
				this_month_profit_in_cents:''

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
					that.statusBar=e.statusBarHeight+6;
					// console.log('fffeee', that.statusBar)

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
		onShow() {
			// this.userProfit();
			// this.userPoint();
			// this.userBalance();
			this.userAuthed();
		},
		methods:{


			authe()
			{
				uni.navigateTo({
					url:'/pages/withdrawal/navwithds'
				})
			},
			// userProfit()
			// {
			// 	this.api.interactive.userProfit().then(res=>{

			// 		if(res.code===200)
			// 		{
			// 			this.userbance=res.data

			// 			this.isdata=true

			// 			this.today_profit_in_cents=res.data.today_profit_in_cents/100
			// 			this.yesterday_profit_in_cents=res.data.yesterday_profit_in_cents/100
			// 			this.this_month_profit_in_cents=res.data.this_month_profit_in_cents/100
			// 		}
			// 	})
			// },
			// userPoint()
			// {
			// 	this.api.interactive.userPoint().then(res=>{
			// 		// console.log('代金券',res)
			// 		if(res.code===200)
			// 		{
			// 			this.userpoint=res.data
			// 			this.isdata=true
			// 		}
			// 	})
			// },
			// userBalance()
			// {
			// 	this.api.interactive.userBalance().then(res=>{
			// 		// console.log('userBalance',res)
			// 		if(res.code===200)
			// 		{
			// 			this.blance=res.data.balance.remaining_balance_in_cents/100
			// 		}
			// 	})
			// },
			userAuthed(){
				this.api.interactive.userAuthed().then(res=>{
					if(res.code===200)
					{
						this.userMess=res.data
					}
				})
			},
			goOrder(pams)
			{
				uni.navigateTo({
					url:'/pages/orderList/orderList?ortype='+pams
				})
			},
			//收支明细
			goincomEexpend()
			{
				uni.navigateTo({
					url:'/pages/incomEexpend/incomEexpend'
				})
			},
			//我的商城
			goMyshop()
			{
				// uni.showToast({
				// 	title:'该功能暂未开发,敬请期待！',
				// 	icon:'none'
				// })
				uni.navigateTo({
					url:'/pages/my/shop'
				})
			},
			//权益中心
			goEquity()
			{
				uni.showToast({
					title:'该功能暂未开发,敬请期待！',
					icon:'none'
				})
			},
			//意见反馈
			goFeedback()
			{
				uni.showToast({
					title:'该功能暂未开发,敬请期待！',
					icon:'none'
				})
			},
			goYcenter()
			{
				// uni.showToast({
				// 	title:'该功能暂未开发,敬请期待！',
				// 	icon:'none'
				// })
				uni.navigateTo({
					url:'/pages/yscenter/yscenter'
				})
			},
			// 市场
			goService()
			{
				uni.navigateTo({
					url:'/pages/service/service'
				})
			},
			goaddres()
			{
				uni.navigateTo({
					url:'/pages/addres/addres'
				})
			},
			goCard()
			{
				uni.navigateTo({
					url:'/pages/card/card'
				})
			},
			//提现
			gowdraw()
			{
				uni.navigateTo({
					url:'/pages/withdrawal/withdrawal'
				})
			},
			goMyqr(){
				uni.navigateTo({
					url:'/pages/Myqrcode/Myqrcode'
				})
			},
			upgrade()
			{
				uni.navigateTo({
					url:'/pages/upgrade/upgrade'
				})
			},
			sets()
			{
				uni.navigateTo({
					url:'/pages/set/set'
				})
			},
			goTax()
			{
				uni.navigateTo({
					url:'/pages/tax/tax'
				})
			},
			goSubaccount()
			{
				uni.navigateTo({
					url:'/pages/setVoice/subAccount'
				})
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.t1,.t3,.t2{
		font-size: 18upx;
		background-color: #ef8200;
		color: #fff;
		padding: 5upx 10upx;
		border-radius: 12upx;
		margin: 16upx 0;
	}
	.t3,.t2{
		background-color: #0cc;
	}
	.level-er{
		display: flex;
		grid-gap: 20upx;
	}
	.pBk{
		background: #e9e9e9;
		width: 100%;
		/* height: 490upx; */
		opacity: 0.9;
		border-radius: 0 0 60upx 60upx;
		padding-bottom: 10upx;
	}
	.setTool{
		/* padding-top: 90upx; */
		margin-right: 30upx;
		text-align: right;

	}
	.lev-sty{
		width: 120upx;
		height: 38upx;
		background: #FF900E;
		border-radius: 6upx;
		display: inline-block;
		font-size: 22upx;
		text-align: center;
		line-height: 38upx;
		color: #fff;
	}
	.pImg image{
		width: 121upx;
		height: 121upx;
		border-radius: 100%;
	}
	.per-mess{
		display: flex;
		padding: 30upx;
		align-items: flex-start;
	}
	.pDdeit{
		flex: 1;
		align-items: center;
	}
	.gomoney{
		width: 89upx;
		height: 44upx;
		border: 1upx solid #999999;
		border-radius: 10upx;
		color: #fff;
		text-align: center;
		line-height: 44upx;
		font-size: 24upx;
		background-color: #ef8200;
		margin-left: 60upx;
	}
	.uName{
		font-size: 30upx;
		color: #16270C;
	}
	.q-back{
		background-color: #fff;
		/* width: 120upx; */
		height: 28upx;
		font-size: 22upx;
		padding: 10upx 16upx;
		border-radius: 30upx;
		margin-left: 60upx;
	}
	.nldata{
		font-size: 24upx;
		color: #3d3d3d;
		padding-top: 34upx;

	}
	
	.accRe{
		background-color: #fff;
		padding: 10rpx 24rpx;
		box-shadow: 0px 1px 2px 1px rgba(179,179,179,0.12);
		border-radius: 8rpx;
	}
	.q-back image{
		width: 28upx;
		height: 28upx;
		padding-left: 6upx;
	}
	.gomon{
		margin-left: 40upx;
		line-height:  40upx;
		flex: 1;
	}
	.pusju{
		justify-content: flex-start;
		align-items: center;

	}
	.y-mon,.f-sco{
		font-size: 24upx;
		color: #16270C;
	}
	.addconut{
		flex: 1;
		align-items: center;
	}
	.lev-sty{
		margin-left: 15upx;
	}

	.orImg image{
		width: 56upx;
		height: 56upx;

	}
	.order-tabs{
		text-align: center;
		padding: 43upx 0;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
	
	.orderlist {
		font-size: 24upx;
		color: #333;
		width: 25%;
	}
	.myorder{
		background-color: #fff;
		padding: 70upx 30upx;
	}
	.orderName{
		font-size: 30upx;
		color: #333;
	}
	.sy-mess{
		padding: 40upx;
	}
	.mo1{
		font-size: 40upx;
		color: #333;
	}
	.mo-d{
		font-size: 24upx;
		color: #999999;
	}
	.sy-mess{
		text-align: center;
	}
	.ologo{
		padding-top: 17upx;
	}
	.ologo image{
		width: 100%;
		height: 180upx;
	}
	.shou-or{
		padding-top: 60upx;
	}
	.mo-colt{
		font-size: 28upx;
		color: #666;
	}
	.two-orm{
		padding-top: unset;

	}
	.orm-fg{
		width: 100%;
		height: 28upx;
		background: #FAFAFA;
	}
	.pfex{
		width: 25%;
		padding-bottom: 60rpx;
	}
	.pmargp{
		padding: 30upx 0;
		justify-content: flex-start;
		
	}
	/* .two-orm >.pfex{
		margin-left: 60rpx;
		margin-bottom: 60rpx;
	} */
</style>
