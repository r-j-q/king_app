<template>
	<view class="widcont">
		<view class="widImg">
			<image src="/static/img/wide.png" mode=""></image>
		</view>
		<view class="diffwid map" @click="tipsConfirm">
			个人账号
		</view>
		<view class="diffwid" @click="enterprise">
			企业账号<text class="slefs">（含个体工商户）</text>
		</view>
		
		
	</view>
</template>

<script>
	export default
	{
		data() {
			return {
				perData:'',
				type:'',
				state:''
			}
		},
		created()
		{
			this.getuse()
		},
		methods:
		{
			getuse()
			{
				
				this.api.interactive.userAuthed().then(res=>{
					console.log('res',res)
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
						uni.navigateTo({
							url:'/pages/identity/authenSucc?useinfo='+JSON.stringify(res.data.base_info)
						})
					}
					
					
				}).catch(err=>{
					uni.navigateTo({
						url:'/pages/identity/identity'
					})
				})
			},
			
			enterprise()
			{
				this.api.user.Getauthentication({
					type:2
				}).then(res=>{
					console.log('认识',res)
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
					
					uni.navigateTo({
						url:'/pages/identity/enterauthenSucc?useinfo='+JSON.stringify(res.data)
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
	
	
	
	
	
</style>