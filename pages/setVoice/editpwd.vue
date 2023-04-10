<template>
	<view class="restPwd">
		<view v-if="!gorttype" class="nowAcc">
			当前账号 {{getacc}}
		</view>
		
	<view class="slefPad">
		<view v-if="!gorttype" class="slefS">自定义密码</view>
		<view v-if="gorttype" class="slefS fcr">请输入需要重设密码的纳零王者账号</view>
		
		<!-- <view v-if="gorttype" class="perint">
			<input type="account"   v-model="form.account_id"  placeholder-style="font-size:28upx;" placeholder="请输入手机号">
		</view> -->
		<view  class="perint">
			<input type="account"   v-model="form.username"   placeholder-style="font-size:28upx;" placeholder="请输入纳零王者账号">
		</view>
		
		<view class="perint">
			<input type="password"   v-model="form.password_old"   placeholder-style="font-size:28upx;" placeholder="请输入初始密码或旧密码">
		</view>
		
		<view class="perint">
			<input type="password"   v-model="form.password"  placeholder-style="font-size:28upx;" placeholder="请输入新密码">
		</view>
		
		<view class="perint">
			<input type="password"   v-model="form.password_confirmation"   placeholder-style="font-size:28upx;" placeholder="请重复输入新密码确认">
		</view>
	</view>
	
	<view class="confbut" @click="confirmpwd">
		<button>确认</button>
	</view>
	
		
	<view class="op-height">
		<uni-popup ref="popup">
			<view class="popup-content">
			</view>
			
		</uni-popup>
	</view>
	</view>
</template>

<script>
	export default{
		data()
		{
			return{
				form:{
					account_id:'',
					username:'',
					password_old:'',
					password:'',
					password_confirmation:''
					
				},
				gorttype:''
			}
		},
		
		onLoad(optons) {
			if(optons.gorttype && optons.gorttype !=undefined)
			{
				this.gorttype=optons.gorttype
				
			}
		},
		computed:{
			getacc()
			{
				this.form.username=this.$store.state.edit_pwd
				return this.$store.state.edit_pwd
				
			}
		},
		methods:{
			confirmpwd()
			{
				if(!this.form.account_id)
				{
					if(!this.form.username)
					{
						uni.showToast({
							title:'请输入用户名！',
							icon:'none'
						})
						return
					}
				}
				
				if(!this.form.password_old)
				{
					uni.showToast({
						title:'请输入旧密码！',
						icon:'none'
					})
					return
				}
				if(!this.form.password)
				{
					uni.showToast({
						title:'请输入新密码！',
						icon:'none'
					})
					return
				}
				if(!this.form.password_confirmation)
				{
					uni.showToast({
						title:'请重复输入新密码确认！',
						icon:'none'
					})
					return
				}
				
				if(this.form.password_confirmation !=this.form.password)
				{
					uni.showToast({
						title:'密码不一致！',
						icon:'none'
					})
					return
				}
				
				this.api.user.forgetPwd(this.form).then(res=>{
					if(res.code==200)
					{
						
						this.form.account_id=''
						this.form.username=''
						this.form.password_old=''
						this.form.password=''
						this.form.password_confirmation=''
							
						
						// this.$store.commit('set_edit_pwd','')
						uni.showToast({
							title:'密码更改成功！',
							icon:'success'
						});
						
					}
				}).catch(err=>{
					uni.showToast({
						title:err.message,
						icon:'none'
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
	.nowAcc{
		margin-top: 80upx;
		text-align: center;
		font-weight: bold;
	}
	.slefPad{
		padding-left: 52upx;
		padding-right: 52upx;
		padding-top: 60upx;
	}
	.slefS{
		color: #2F5597;
		font-size: 28upx;
		font-weight: bold;
	}
	.fcr{
		color: #333;
	}
	.perint{
		margin-top: 66upx;
		padding-bottom: 20upx;
		border-bottom: 3upx solid #F0F0F0;
	}
	
	.confbut button{
		width: 60%;
		height: 80upx;
		line-height: 80upx;
		background-color: #128DDA;
		color: #fff;
		font-size: 28upx;
		margin-top: 240upx;
	}
</style>