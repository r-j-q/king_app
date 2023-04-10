<template>
	<view class="apply-acc" :class="baseStat==1?'pages':'nopaegs'">
		<block v-if="baseStat==1">
		<view class="addmess">
			<view class="entTips">
				企业认证
			</view>
			<view class="realMess">
				请填写真实信息，通过后将无法修改哦
			</view>
			
			<view class="bName">企业名称 <text class="reSty">*</text></view>
			<view class="perint">
				<input type="idcard" v-model="form.base_info.business_name"  maxlength="20"    
				 placeholder-style="color:#666;font-size:28upx;" placeholder="请填写企业名称">
			</view>
			
			<view class="bName">统一社会信用代码 <text class="reSty">*</text></view>
			<view class="perint">
				<input  v-model="form.base_info.business_code"     
				 placeholder-style="color:#666;font-size:28upx;" placeholder="请输入社会信用代码">
			</view>
			
			<view class="bName">公司地址 <text class="reSty">*</text></view>
			<view class="perint">
				<input    v-model="form.base_info.business_address"  
				 placeholder-style="color:#666;font-size:28upx;" placeholder="请输入公司地址">
			</view>
			
			<view class="bName">法定代表人 <text class="reSty">*</text></view>
			<view class="perint">
				<input type="idcard"  maxlength="20"  v-model="form.base_info.legal_person_name" 
				 placeholder-style="color:#666;font-size:28upx;" placeholder="请输入法人名称">
			</view>
			
			
			<view class="bName">输入身份证号 <text class="reSty">*</text></view>
			<view class="perint">
				<input type="idcard"  maxlength="20"  v-model="form.base_info.id_card" @blur="isbankCard"  placeholder-style="color:##666;font-size:28upx;" placeholder="请输入身份证号,尾号X注意大写">
			</view>
			
		</view>
		</block>
		
		<block v-if="baseStat==2">
			<view class="idecont">
				<view class="ideMs">
					企业认证
				</view>
				<view class="idedeit">
					请填写真实信息，通过后将无法修改哦
				</view>
				
				<view class="idcadIpt" @click="idcardchange(3)">
					<view class="incard">
						<view class="cardmess">
							营业执照上传*
						</view>
						<view class="license">
							<image class="upimg" v-if="idcardImg3" :src=idcardImg3></image>
							<image src="../../static/img/ent.png" mode=""></image>
						</view>
					</view>
				</view>
				
				
				<view class="idcadIpt">
					<view class="incard">
						<view class="cardmess">
							法人身份证上传*
						</view>
						<view class="flexs">
							<view class="cardupload" @click="idcardchange(1)">
								<view class="cardz">
									
									<image class="caedimg" v-if="idcardImg" :src=idcardImg></image>
									<image v-else class="caedimg" src="../../static/img/cardf.png" mode=""></image>
									<view class="alp">
										<image src="../../static/img/alp.png" mode=""></image>
									</view>
								</view>
								<view class="szback">
									上传身份证正面
								</view>
							</view>
							
							<view class="cardupload" @click="idcardchange(2)">
								<view class="cardz">
									<image class="caedimg" v-if="idcardImg2" :src=idcardImg2></image>
									<image v-else class="caedimg" src="../../static/img/cardz.png" mode=""></image>
									<view class="alp">
										<image src="../../static/img/alp.png" mode=""></image>
									</view>
								</view>
								<view class="szback">
									上传身份证反面
								</view>
							</view>
						</view>
						
					</view>
				</view>
				
			</view>
			
		</block>
		<view v-if="baseStat==1 || baseStat==2" class="appsub" @click="nextStep(baseStat==2?1:2)">
			<button>{{baseStat==2?'上一步':"下一步"}}</button>
		</view>
		<view class="appsub" v-if="baseStat==2" @click="nextStep(2,'sub')">
			<button>提交</button>
		</view>
		
		
		<uni-popup ref="popup">
			<view class="taskTips">
				<view class="sususs">
					提交成功
				</view>
				<view class="tipcont">
					<text>
						您的企业账号认证信息已提交，请耐心等待后台工作人员审核，我们会尽快处理，感谢您的理解
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
	const utils = require('@/common/passcard.js')
	import $config from '@/common/config'
	export default
	{
		data()
		{
			return{
				iscardpass:false,
				baseStat:1,
				idcardImg:'',
				idcardImg2:'',
				idcardImg3:'',
				form:{
					type:2,
					
					base_info:{
						id_card:'',
						business_name:'',
						business_code:'',
						business_address:'',
						legal_person_name:'',
					},
					file_info:{
						id_card_positive:{
							
						},
						id_card_negative:{
							
						}
						
					},
					business_license:{
						file_name:'',
						file_path:'',
						file_url:''
					}
					
				}
			}
		},
		methods:{
			
			
			//判断身份证合法化
			isbankCard(e)
			{
				
				//身份证验证代码
				var idCardMsg = utils.identityIDCard(e.detail.value);
				
					
					
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
			redPath()
			{
				uni.redirectTo({
					url:'/pages/withdrawal/navwithd'
				})
			},
			
			idcardchange(pams)
			{
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: $config.SERVER_PATH+'file',
							filePath: tempFilePaths[0],
							header:{
							　'Authorization': 'Bearer '+uni.getStorageSync('token')
							},
							name: 'file',
							formData: {
								usage: 'avatar'
							},
							success: (uploadFileRes) => {
								let gres=JSON.parse(uploadFileRes.data)
								console.log('Gerry',gres)
								if(gres.code==200)
								{
									if(pams==1)
									{
										this.idcardImg=gres.data.url
										var id_card_positive=
										{
											file_name: gres.data.file_name,
											file_path: gres.data.path,
											file_url: gres.data.url
										}
										this.form.file_info.id_card_positive=id_card_positive
									}
									if(pams==2)
									{
										this.idcardImg2=gres.data.url
										var id_card_negative=
										{
											file_name: gres.data.file_name,
											file_path: gres.data.path,
											file_url: gres.data.url
										}
										this.form.file_info.id_card_negative=id_card_negative
									}
									
									if(pams==3)
									{
										this.idcardImg3=gres.data.url
										var business_license=
										{
											file_name: gres.data.file_name,
											file_path: gres.data.path,
											file_url: gres.data.url
										}
										this.form.file_info.business_license=business_license	
									}
									
								}
								
							},
							fail: () => {
								uni.showToast({
									title:'上传失败，重新上传',
									icon:'none'
								})
							}
						});
					}
				});
			
			
			},
			
					
			nextStep(pams,sub='')
			{
				this.baseStat=pams
				if(pams==2)
				{
					if (!this.form.base_info.business_name)
					{
						this.baseStat=1;
						this.iscardpass=true
						uni.showToast({
							title:'输入公司名称！',
							icon:'none'
						})
						return false
					}
					
					if (!this.form.base_info.business_code)
					{
						this.baseStat=1;
						this.iscardpass=true
						uni.showToast({
							title:'输入统一社会信用代码！',
							icon:'none'
						})
						return false
					}
					
					if (!this.form.base_info.business_address)
					{
						this.baseStat=1;
						this.iscardpass=true
						uni.showToast({
							title:'输入公司地址！',
							icon:'none'
						})
						return false
					}
					
					if (!this.form.base_info.legal_person_name)
					{
						this.baseStat=1;
						this.iscardpass=true
						uni.showToast({
							title:'输入法人名称！',
							icon:'none'
						})
						return false
					}
						
					
					if (!this.form.base_info.id_card)
					{
						this.baseStat=1;
						this.iscardpass=true
						uni.showToast({
							title:'请输入身份证号码',
							icon:'none'
						})
						return false
					}	
					
					if (this.iscardpass) {
						this.baseStat=1;
						uni.showToast({
							title:'身份证号码有误，请重新输入！',
							icon:'none'
						})
						return false
					}
					
					
					
					if(!this.idcardImg3)
					{
						uni.showToast({
							title:'请上营业执照！',
							icon:'none'
						})
						return
					}
					
					if(!this.idcardImg)
					{
						uni.showToast({
							title:'请上传身份证正面！',
							icon:'none'
						})
						return
					}
					if(!this.idcardImg2)
					{
						uni.showToast({
							title:'请上传身份证反面！',
							icon:'none'
						})
						return
					}
					
					if(sub)
					{
						this.api.user.authentication(this.form).then(res=>{
							console.log('res',res)
							if(res.code==200)
							{
								this.$refs.popup.open('cneter')
								// let name=this.form.base_info.full_name
								// let idcard=this.form.base_info.id_card
								// uni.navigateTo({
								// 	url:'/pages/identity/authenSucc?username='+name+'&idcard='+idcard
								// })
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
		}
	}
</script>

<style>
	.pages{
		background: #fff;
		height: 100vh;
	}
	.entTips{
		font-size:32rpx;
		font-weight: 600;
	}
	.realMess{
		font-size: 28rpx;
		padding-top: 20rpx;
		padding-bottom: 50rpx;
		color: #666;
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
	.reSty{
		color: red;
		padding-left: 6rpx;
	}
	
	
	
	.idecont{
		margin-bottom: 120rpx;
	}
	.ideMs{
		font-size: 32rpx;
		font-weight: 600;
		margin-top: 32rpx;
		margin-left: 52rpx;
	}
	.idedeit{
		margin-left: 52rpx;
		font-size: 28rpx;
		color: #666;
		margin-top: 20rpx;
	}
	.idcadIpt{
		background-color: #fff;
		margin: 32rpx;
		border-radius: 16rpx;
	}
	.incard{
		padding:28rpx 20rpx; 
	}
	.enname-card{
		padding-top: 46rpx;
		padding-bottom: 14rpx;
		border-bottom: 1rpx solid #F0F0F0;
	}
	.enname-card input{
		margin-right: 120rpx;
	}
	.enname-card view{
		font-size: 28rpx;
		font-weight: 600;
	}
	.cardmess{
		font-size: 32rpx;
		font-weight: 600;
	}
	.license{
		background-color: #FAFAFA;
		margin: 20rpx 72rpx;
		text-align: center;
		border-radius: 16rpx;
		
		position: relative;
		
	}
	.upimg{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		padding: 0!important;
		width: 100%!important;
		height: 100%!important;
	}
	.license image
	{
		width: 60rpx;
		height: 60rpx;
		padding: 62rpx 0;
	}
	.cardz{
		position: relative;
		padding: 58rpx 42rpx;
	}
	.caedimg{
		width: 212rpx;
		height: 128rpx;
	}
	.alp{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		top: 106rpx;
		
	}
	.alp image{
		width: 56rpx;
		height: 56rpx;
	}
	.cardupload{
		background-color: #FAFAFA;
		text-align: center;
		margin-top: 48rpx;
		margin-bottom: 14rpx;
		border-radius: 20rpx;
	}
	.szback{
		background-color: #128DDA;
		font-size: 28rpx;
		padding: 20rpx 0;
		color: #fff;
		border-radius: 0 0 16rpx 16rpx;
	}
	.subs-but{
		padding:68rpx 52rpx;
	}
	.subs-but button{
		background-color: #128DDA;
		font-size: 28rpx;
		font-weight: 600;
		padding: 28rpx 0;
		color: #fff;
	}
	.sususs{
		padding-top: 32rpx;
		padding-left: 32rpx;
		font-weight: 600;
		font-size: 32rpx;
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
	
</style>