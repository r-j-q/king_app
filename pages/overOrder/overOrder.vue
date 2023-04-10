<template>
	<view class="overOrder">
		<view class="payut">
			<view class="flexs orBase">
				<view class="irgt">
					<uni-icons  color="#fff" type="checkmarkempty" size="14"></uni-icons>
				</view>

				<view class="or-a">支付成功</view>




			</view>
			<view  v-if="dstat.raffle_tickets > 0" class="paystat">
			  组团抽奖券+ {{dstat.raffle_tickets}}
			</view>
			<view class="rl-btn">

				<button @click="goindex">返回首页</button>
				<button @click="seleorder">查看订单</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dstat:''
			}
		},
		onLoad(options)
		{
			console.log('options',options)
			if(options.orderId)
			{
				this.getpayStatus(options.orderId)
			}
		},
		methods: {
			seleorder()
			{
				uni.navigateTo({
					url:'/pages/orderList/orderList?ortype=1'
				})
			},
			goindex()
			{
				uni.reLaunch({
					url:'/pages/selectGoods/selectedGoods'
				})
			},
			getpayStatus(pams)
			{
				this.api.interactive.paymentStat(pams).then(res=>{

					this.dstat=res.data
					
				})
			}
		}
	}
</script>

<style>
	.paystat{
		text-align: center;
		margin-top: 30upx;
		font-weight: bold;
	}
	.payut{
		background-color: #fff;
		padding: 60upx 30upx;
		margin: 0 30upx;
		border-radius: 40upx;
		margin-top: 100upx;

	}
	.orBase{

		justify-content: center;
		align-items: center;

	}
	.irgt{
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
		background-color: #5EB95E;
		border-radius: 100%;
		text-align: center;
	}
	.or-a{
		padding-left: 20upx;
	}
	.rl-btn{
		display: flex;
		padding: 60upx;
		padding-bottom: 40upx;
	}
	.rl-btn button{
		width: 180upx;
		height: 60upx;
		border: 1upx solid #999999;
		border-radius: 8upx;
		line-height: 60upx;
		color: #999;
		text-align: center;
		font-size: 26upx;
	}
</style>
