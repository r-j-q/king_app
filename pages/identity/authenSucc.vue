<template>
	<view class="authMess">
		<view class="authName">
			认证成功
		</view>
		<view class="succMess">
			您的信息已认证成功，我们已对您的信息进行了加密处理
		</view>
		<view class="authName amp">
			身份信息
		</view>
		
		<view class="flexs auuserf">
			<view class="us-me">
				姓名
			</view>
			<view class="mz">
				{{username}}
			</view>
		</view>
		<view class="flexs auuserf">
			<view class="us-me">
				证件号
			</view>
			<view class="ml">
				{{idcard}}
			</view>
		</view>
		
		<uni-popup ref="popup">
			<view class="taskTips">
				<view class="sususs">
					认证成功
				</view>
				<view class="tipcont">
					<text>
						您的个人账号认证信息已认证成功
					</text>
					
				</view>
				
				<view class="resTi" @click="redPath">
					返回
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default
	{
		data()
		{
			return{
				username:'',
				idcard:''
			}
		},
		onLoad(opt)
		{
			
			if(opt.useinfo !=undefined && opt.useinfo)
			{
				let uinfo=JSON.parse(opt.useinfo)
				
				this.username=uinfo.full_name		
				this.idcard=uinfo.id_card
			}
			if(opt.username !=undefined && opt.username)
			{
				
				this.username=opt.username		
				this.idcard=opt.idcard
			}
			this.$nextTick(()=>{
				this.$refs.popup.open('center')
			})
			
			
		},
		methods:{
			redPath()
			{
				uni.redirectTo({
					url:'/pages/withdrawal/navwithds'
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.authMess{
		padding: 64rpx 52rpx;
	}
	.authName{
		font-size: 32rpx;
		font-weight: 600;
	}
	.succMess{
		font-size: 28rpx;
		color: #666;
		margin-top: 20rpx;
	}
	.amp{
		margin-top: 80rpx;
		margin-bottom: 12rpx;
	}
	.us-me{
		padding-top: 32rpx;
		padding-bottom: 24rpx;
		font-size: 28rpx;
		font-weight: 600;
	}
	.auuserf{
		align-items: baseline;
		justify-content: flex-start;
		border-bottom: 1upx solid #f5f5f5;
	}
	.m1,.m1{
		font-size: 28rpx;
		color: #666;
	}
	.mz{
		padding-left: 80rpx;		
	}
	.ml{
		padding-left: 52rpx;
	}
	
	.taskTips{
		background-color: #fff;
		margin:0 52rpx;
		border-radius: 20rpx;
		padding-bottom: 32rpx;
	}
	.tipcont{
		padding: 40rpx 36rpx;
		font-size: 28rpx;
		font-weight: 600;
		color: #666;
		line-height: 50rpx;
	}
	.resTi{
		text-align: center;
		background-color: #128DDA;
		width: 200rpx;
		margin:8rpx auto;
		color: #fff;
		font-size: 28rpx;
		padding: 28rpx 0;
		border-radius: 16rpx;
	}
	.sususs{
		padding-top: 32rpx;
		padding-left: 32rpx;
		font-weight: 600;
		font-size: 32rpx;
	}
</style>