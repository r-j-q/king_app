<template>
	<view class="idecont">
		<view class="ideMs">
			个人认证
		</view>
		<view class="idedeit">
			请填写真实信息，通过后将无法修改哦
		</view>
		
		<view class="idcadIpt">
			<view class="incard">
				<view class="cardmess">
					身份证信息
				</view>
				<view class="flexs enname-card">
					<view class="">
						姓名
					</view>
					<input maxlength="5" v-model="form.base_info.full_name" placeholder-style="font-size:28rpx" placeholder="请输写真实姓名" />
				</view>
				<view class="flexs enname-card">
					<view class="">
						证件号
					</view>
					<input type="idcard" maxlength="18" v-model="form.base_info.id_card" placeholder-style="font-size:28rpx" placeholder="请输写并确认证件号" />
				</view>
			</view>
		</view>
		
		
		<view class="idcadIpt">
			<view class="incard">
				<view class="cardmess">
					证件图片
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
		<view class="subs-but">
			<button  @click="congirmSub">确认</button>
		</view>
	
	
	</view>

</template>

<script>
	import $config from '@/common/config'
	export default {
		data() {
			return {
				idcardImg:'',
				idcardImg2:'',
				form:{
					type:1,
					base_info:{
						id_card:'',
						full_name:''
					},
					file_info:{
						id_card_positive:{
							
						},
						id_card_negative:{
							
						}
						
					}
					
				}
			}
		},
		methods: {
			congirmSub()
			{
				if(!this.form.base_info.full_name)
				{
					uni.showToast({
						title:'请输入姓名！',
						icon:'none'
					})
					return
				}
				if(!this.form.base_info.id_card)
				{
					uni.showToast({
						title:'请输入身份证号码！',
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
				this.api.user.authentication(this.form).then(res=>{
					console.log('res',res)
					if(res.code==200)
					{
						let name=this.form.base_info.full_name
						let idcard=this.form.base_info.id_card
						uni.navigateTo({
							url:'/pages/identity/authenSucc?username='+name+'&idcard='+idcard
						})
					}
				}).catch(err=>{
					uni.showToast({
						title:err.message,
						icon:'none'
					})
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
								usage: 'product'
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
									
								}
								
							},
							fail: (err) => {
								console.log('errrr',err)
								uni.showToast({
									title:'上传失败，重新上传',
									icon:'none'
								})
							}
						});
					}
				});
			
			
			},
			
		
		
		}
	}
</script>

<style>
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
		top: 90rpx;
		
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
</style>
