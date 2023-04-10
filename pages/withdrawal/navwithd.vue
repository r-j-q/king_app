<template>
	<view class="widcont">
		<view class="widImg">
			<image src="/static/img/wids.png" mode=""></image>
		</view>
		<view class="diffwid map" @click="tipsConfirm">
			个人账号提现
		</view>
		<view class="diffwid" @click="enterprise">
			企业账号提现<text class="slefs">（含个体工商户）</text>
		</view>
		
		<!-- <uni-popup ref="popup">
			<view class="taskTips">
				<view class="tipcont">
					<text>本月提现金额已超10w，请认证企业账号后</text>
					<text>再提现！是否立即前往认证企业账号？</text>
				</view>
				<view class="line"></view>
				<view class="flexs resTi">
					<view @click="laschange(1)">
						是
					</view>
					<view  class="pln"></view>
					<view @click="laschange(2)">
						否
					</view>
				</view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	export default
	{
		data() {
			return {
				perData:'',
				type:'',
				state:'',
				txstat:''
			}
		},
		
		onShow()
		{
			// this.getuse()
		},
		
		methods:
		{
			getuse()
			{
				uni.showLoading({
					title:'加载中..'
				})
				this.api.interactive.userAuthed().then(res=>{
					console.log('res',res)
					if(res.code==200)
					{
						uni.hideLoading()
						this.txstat=res.data.can_withdraw
					}
					
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			
			tipsConfirm()
			{
				
				//提现超过10万提示
				// this.$refs.popup.open('center')
				
				this.api.user.Getauthentication({
					type:1
				}).then(res=>{
					
					if(res.code==200)
					{
						// if(this.txstat==0)
						// {
						// 	uni.showToast({
						// 		title:'提现日期未开放，请在开放日提现！',
						// 		icon:'none',
						// 		duration:2000
						// 	})
						// 	return
						// }
						uni.navigateTo({
							url:'/pages/withdrawal/withdrawal'
						})
					}
					
				}).catch(err=>{
					uni.navigateTo({
						url:'/pages/identity/identity'
					})
				})
			},
			// laschange(pams)
			// {
			// 	// if(pams==2)
			// 	// {
			// 	// 	this.$refs.popup.close()
			// 	// }else{
			// 	// 	uni.navigateTo({
			// 	// 		url:'/pages/identity/identity'
			// 	// 	})
			// 	// }
			// },
			enterprise()
			{
				this.api.user.Getauthentication({
					type:2
				}).then(res=>{
					
					if(res.data.state==0)
					{
						uni.showToast({
							title:'管理人员审核中！',
							icon:'none'
						})
						return
					}
					if(res.data.state==3)
					{
						uni.showToast({
							title:'审核被驳回！',
							icon:'none',
							duration:3000
						})
					}
					
					// if(this.txstat==0)
					// {
					// 	uni.showToast({
					// 		title:'提现日期未开放，请在开放日提现！',
					// 		icon:'none',
					// 		duration:2000
					// 	})
					// 	return
					// }
					uni.navigateTo({
						url:'/pages/withdrawal/enterwithdrawal'
					})
					
				}).catch(err=>{
					uni.navigateTo({
						url:'/pages/enterprise/enterprise'
					})
				})
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.widcont{
		padding: 32rpx;
	}
	.widImg image{
		width: 100%;
		height: 216rpx;
	}
	.map{
		margin-top: 60rpx;
		margin-bottom: 40rpx;
	}
	.diffwid{
		box-shadow: 0px 1px 3px rgba(126,126,126,0.16);
		padding: 60rpx 20rpx;
		font-size: 32rpx;
		font-weight: 600;
		border-radius: 16rpx;
	}
	.slefs{
		font-size:26rpx;
		color: #666;
	}
	
	.taskTips{
		background-color: #fff;
		margin:0 52rpx;
		border-radius: 20rpx;
	}
	.tipcont{
		padding: 40rpx 36rpx;
		font-size: 28rpx;
		font-weight: 600;
		color: #666;
		line-height: 50rpx;
	}
	.resTi{
		justify-content: space-evenly;
	}
	.line{
		height: 1px;
		background-color: #F0F0F0;
		margin-top: 108rpx;
	}
	.pln{
		height: 40rpx;
		width: 1px;
		background-color: #F0F0F0;
		
	}
	.resTi view{
		padding-top: 34rpx;
		padding-bottom: 34rpx;
	}
</style>