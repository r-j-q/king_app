<template>
	<view class="authMess">
		<view class="authName">
			认证成功
		</view>
		<view class="succMess">
			您的公司信息已认证成功
		</view>
		<view class="authName amp">
			企业信息
		</view>
		
		<view class="flexs auuserf">
			<view class="us-me">
				企业名称
			</view>
			<view class="mz">
				{{eninfo.business_name}}
			</view>
		</view>
		<view class="flexs auuserf">
			<view class="us-me">
				统一社会信用代码
			</view>
			<view class="ml">
				{{eninfo.business_code}}
			</view>
		</view>
		
		<view class="flexs auuserf">
			<view class="us-me">
				公司地址
			</view>
			<view class="ml">
				{{eninfo.business_address}}
			</view>
		</view>
		<view class="flexs auuserf">
			<view class="us-me">
				法定代表人
			</view>
			<view class="ml">
				{{eninfo.legal_person_name}}
			</view>
		</view>
		<view class="flexs auuserf">
			<view class="us-me">
				身份证件号
			</view>
			<view class="ml">
				{{eninfo.id_card}}
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
				idcard:'',
				eninfo:''
			}
		},
		onLoad(opt)
		{
			// username='+name+'&idcard='+idcard
			
			
		
			if(opt.useinfo !=undefined && opt.useinfo)
			{
				let pinfo=JSON.parse(opt.useinfo)
				this.eninfo=pinfo.base_info
				
				this.$nextTick(()=>{
					this.$refs.popup.open('center')
				})
				console.log('第三方',this.eninfo)
				
			}
			
				
			
			
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
		/* justify-content: flex-start; */
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