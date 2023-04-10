<template>
	<view>
			
			<view class="userCont">
				<view class="inboxsd">
					<view class="userMess">
						<view class="userImg">
							<image style="border: unset;" v-if="taskavat" :src=taskavat></image>
							<image v-else src="../../static/img/p.png"></image>
						</view>
						<view class="userIntr">
							<view>用户 {{perData.name}}</view>

							<view>余额：￥{{blance}} </view>
							<view>代金券 ：{{userPoints.remain_points}}</view>
						</view>
					</view>
					<view class="taskreWard">
						<view class="pemsg">
							<view>
							{{!isNaN(perData.balance_amount_in_cents/100)?perData.balance_amount_in_cents/100:''}}</view>
							<view class="mosty">现金奖励</view>
						</view>
						<view class="perline"></view>
						<view class="pemsg">
							<view>{{perData.redemption_point}}</view>
							<view class="scsty">任务代金券</view>
						</view>
						<view class="perline"></view>
						<view class="pemsg">
							<view>{{perData.task_complete_count}}</view>
							<view class="nusty">完成次数</view>
						</view>
					
					</view>
					
				</view>
				
				
				
			</view>
			<view class="userCont">
				
				<view class="flexs inboxsd nnflex ">
					<view class="nnimg" @click="accwithd">
						<image  src="/static/img/nn1.png" alt=""></image>
						<view class="">提现管理</view>
					</view>
					<view class="nnimg" @click="goservice">
						<image  src="/static/img/nn2.png" alt=""></image>
						<view class="">我的经营</view>
					</view>
					<view class="nnimg" @click="goincomEexpend">
						<image  src="/static/img/nn3.png" alt=""></image>
						<view class="">收支明细</view>
					</view>
					<view class="nnimg" @click="goTax">
						<image  src="/static/img/nn4.png" alt=""></image>
						<view class="">税务凭证</view>
					</view>
				</view>
				
			</view>
			
			<view class="userCont">
				
				<view class="flexs inboxsd nnflex twoflex">
					<view class="nnimg mags" @click="collaborators">
						<image  src="/static/img/nn5.png" alt=""></image>
						<view class="">我的合作者</view>
					</view>
					<view class="nnimg mags bid" @click="yscenter">
						<image  src="/static/img/nn6.png" alt=""></image>
						<view class="">运营中心</view>
					</view>
					
				</view>
				
			</view>
			
			
			
		
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				perData:'',
				userPoints:"",
				blance:0,
				userMess:'',
				taskavat:uni.getStorageSync('taskavat')?uni.getStorageSync('taskavat'):""
			}
		},
		created() {
			this.centerData()
			
			
		},
		onShow() {
			this.userPoint();
			this.userBalance()
			// uni.setStorageSync('taskavat',this.userMess.avatar)
			// console.log(uni.getStorageSync('taskavat'))
			// this.userAuthed()
		},
		methods: {
			centerData()
			{
				let categories=[]
				let data=[]
				this.api.user.taskCenter().then(res=>{
					
					if(res.code==200 && res.data.credit_attribute.length >0)
					{
						this.perData=res.data;
						let otdata=res.data.credit_attribute
						
						otdata.map((item,index)=>{
							categories.push(item.name)
							data.push(item.point)
						})
						
					}
					
				})
			
			},
			
			userBalance()
			{
				this.api.interactive.userBalance().then(res=>{
					// console.log('userBalance',res)
					if(res.code===200)
					{
						this.blance=res.data.balance.remaining_balance_in_cents/100
					}
				})
			},
			userPoint()
			{
				this.api.interactive.userPoint().then(res=>{
					// console.log('代金券',res)
					if(res.code===200)
					{
						this.userPoints=res.data
						this.isdata=true
					}
				})
			},
			accwithd()
			{
				uni.navigateTo({
					url:'/pages/withdrawal/navwithd'
				})
			},
			goservice()
			{
				uni.navigateTo({
					url:'/pages/service/service'
				})
			},
			yscenter()
			{
				uni.navigateTo({
					url:'/pages/yscenter/yscenter'
				})
			},
			collaborators()
			{
				uni.navigateTo({
					url:'/pages/collaborators/collaborators'
				})
			},
			//收支明细
			goincomEexpend()
			{
				uni.navigateTo({
					url:'/pages/incomEexpend/incomEexpend'
				})
			},
			goTax()
			{
				uni.navigateTo({
					url:'/pages/tax/tax'
				})
			},
			
			
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.sline{
		margin: 20rpx 0;
	}
	.userCont{
		padding: 20rpx 32upx;
		
	}
	.inboxsd{
		border-radius: 16rpx;
		box-shadow: 0px 1px 3px 1px rgba(126,126,126,0.16);
		background-color: #fff;
		padding: 24rpx 20rpx 30rpx 20rpx;
	}
	.sline{
		height: 1px;
		background-color: #ccc;
	}
	.userMess{
		display: flex;
	}
	.userImg image{
		width: 120upx;
		height: 120upx;
		border-radius: 100%;
		border: 1px solid #0C5290;
	}
	.userIntr{
		padding-left: 30upx;
	}
	.taskline{
		height: 20upx;
		background-color: #f5f5f5;
	}
	.userIntr view:nth-child(1)
	{
		font-size: 32upx;
		font-weight: 600;
		padding-bottom: 32upx;
	}
	.userIntr view:nth-child(2),.userIntr view:nth-child(3)
	{
		padding-bottom: 6rpx;
		font-size: 24upx;
		color: #999;
		
	}
	.taskSelfWith{
		padding: 20upx 30upx 80upx 30upx;
		background-color: #fff;
		margin-top: 20upx;
		border-radius: 30upx;
		
	}
	.taskAnalysis{
		padding-top: 40upx;
	}
	.taskan{
		font-size: 28upx;
		font-weight: bold;
	}
	.taskreWard{
		font-size: 24upx;
		color: #333;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		padding: 24upx 66upx 0px 66rpx;
	}
	
	.mosty,.scsty,.nusty{
		font-size: 24upx;
	}
	.mosty{
		color: #FFBF4A;
	}
	.scsty{
		color: #128DDA;
	}
	.nusty{
		color: #75BE46;
	}
	.perline{
		border-right: 1px solid #E6E6E6;
		height: 50upx;
	}
	
	.pemsg view:nth-child(1)
	{
		font-size: 28upx;
		color: #666666;
		font-weight: bold;
		padding-bottom: 6upx;
	}
	.nnimg image{
		width: 48rpx;
		height: 48rpx;
	}
	.nnflex{
		text-align: center;
		font-size: 24rpx;
		padding: 52rpx 20rpx;
		
		
	}
	.nnimg view{
		padding-top: 6rpx;
	}
	.twoflex{
		padding: 34rpx 102rpx;
	}
	.mags{
		width: 150rpx;
		padding: 31rpx 0;
		box-shadow: 0px 1px 3px 1px rgba(126,126,126,0.16);
		
	}
	.bid{
		
	}
</style>
