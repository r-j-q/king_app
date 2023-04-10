<template>
	<view class="apply-acc">
		<view class="addmess">
			<view class="bName">*输入身份证号</view>
			<view class="perint">
				<input type="idcard"  maxlength="20"  v-model="form.id_card" @blur="isbankCard"  placeholder-style="color:##666;font-size:28upx;" placeholder="请输入身份证号,尾号X注意大写">
			</view>
			
			<view class="bName">*申请新账号个数</view>
			<view class="perint">
				<input   maxlength="20"  type="number" v-model="form.sub_account_number"   placeholder-style="color:##666;font-size:28upx;" placeholder="请输申请新账号个数(最多申请100个)">
			</view>
			
			<view class="bName">*输入初始密码</view>
			<view class="perint">
				<input type="password"  maxlength="20"  v-model="form.password"  placeholder-style="color:##666;font-size:28upx;" placeholder="请输输入初始密码">
			</view>
			<view class="bName">*确认密码</view>
			<view class="perint">
				<input type="password"  maxlength="20"  v-model="form.password_confirmation" placeholder-style="color:##666;font-size:28upx;" placeholder="请输入确认密码">
			</view>
		</view>
		<view class="appsub" @click="subapply">
			<button>提交申请</button>
		</view>
		<view class="ideas">注意：初始密码生成所有的新账号都是此密码，请妥善保管</view>
		
		
	</view>
</template>

<script>
	const utils = require('@/common/passcard.js')
	export default
	{
		data()
		{
			return{
				iscardpass:false,
				form:{
					idcard:'',
					sub_account_number  :'',
					password:'',
					password_confirmation:''
				}
			}
		},
		methods:{
			//判断身份证合法化
			isbankCard(e)
			{
				//身份证验证代码
				var idCardMsg = utils.identityIDCard(e.detail.value);
				if (!this.form.id_card)
				{
					this.iscardpass=true
					uni.showToast({
						title:'请输入身份证号码！',
						icon:'none'
					})
					return false
				}	
				if (!idCardMsg.isPass) 
				{
					this.iscardpass=true
					uni.showToast({
						title:'身份证号码有误，请重新输入！',
						icon:'none'
					})
					return false
				}
				this.iscardpass=false
			},
			subapply()
			{
				if (!this.form.id_card)
				{
					this.iscardpass=true
					uni.showToast({
						title:'请输入身份证号码！',
						icon:'none'
					})
					return false
				}	
				
				if (this.iscardpass) {
					
					uni.showToast({
						title:'身份证号码有误，请重新输入！',
						icon:'none'
					})
					return false
				}
				if(!this.form.sub_account_number)
				{
					uni.showToast({
						title:'请输入申请数量！',
						icon:'none',
					})
					return
				}
				if(this.form.sub_account_number >100)
				{
					uni.showToast({
						title:'最多申请100个子账号！',
						icon:'none',
					})
					return
				}
				if(!this.form.password)
				{
					uni.showToast({
						title:'请输入密码！',
						icon:'none',
					})
					return
				}
				if(!this.form.password_confirmation)
				{
					uni.showToast({
						title:'请确认密码！',
						icon:'none',
					})
					return
				}
				
				if(this.form.password !=this.form.password_confirmation)
				{
					uni.showToast({
						title:'两次密码输入不一致、重新输入！',
						icon:'none',
					})
					return
				}
				this.api.subuser.subAapplication(this.form).then(res=>{
					if(res.code==200)
					{
						uni.showToast({
							title:'提交成功，等待平台审核',
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/setVoice/subAccount'
							})
						},2000)
						
					}
				}).catch(err=>{
					uni.showToast({
						title:err.message,
						icon:'none',
					})
				})
						
				
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.addmess{
		padding: 40upx 32upx;
	}
	.bName{
		padding-left: 20upx;
		font-size: 28upx;
		font-weight: 600;
	}
	.perint input{
		background: #F5F5F5;
		height: 84upx;
		margin-top: 10upx;
		padding-left: 20upx;
		margin-bottom: 40upx;
	}
	.appsub{
		margin-top: 40upx;
		
	}
	.appsub button{
		background-color: #128DDA;
		height: 80upx;
		line-height: 80upx;
		width: 80%;
		font-size: 28upx;
		color: #fff;
	}
	.ideas{
		text-align: center;
		color: #EF483A;
		font-size: 22upx;
		margin-top: 34upx;
	}
</style>