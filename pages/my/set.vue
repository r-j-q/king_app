<template>
	<view class="setStore">
		<view class="storeS">
			<view class="storeNmae">
				店铺名称：{{stinfo.name}}
			</view>	
			
			<view class="flexs storeL">
					<view>公司logo</view>
					<view style="display: flex;">
						<image mode="aspectFit" style="width: 180upx;height: 180upx;" :src=stinfo.logo_file_url ></image>
						<view style="width: 6rem;" @click="delePic('logo')">
							<uni-icons type="trash" size="24"></uni-icons>

						</view>
					</view>
					<view class="sbutton" @click="logoUpload('logo')">
						<button>上传</button>
					</view>
				
				
			</view>
			<view class="flexs storeL">
				<view>店铺门头</view>
					<view style="display: flex;">
						<image style="width: 200upx;height: 74upx;" :src=stinfo.shop_sign_file_url></image>
						<view style="width: 6rem;" @click="delePic('pic')">
							<uni-icons type="trash" size="24"></uni-icons>
						</view>
					</view>
					<view class="sbutton" @click="logoUpload('pic')">
						<button>上传</button>
					</view>
			</view>
			<view class="flexs storeL">
				<view>店铺门头</view>
					
				<view class="sbutton">
					{{stinfo.description
}}
				</view>
			</view>
				<view class="setbutt" @click="saveInfo">
					<button>保存设置</button>
				</view>
		</view>
			
			
				
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return{
				stinfo:'',
				logo_id:'',
				shop_sign_file_id:''
			}
		},
		onLoad(options) {
			var that=this;
			
			if(options.storeId && options.storeId !=undefined)
			{
				that.storeInfo(options.storeId)
			}
		},
		onShow() {
			
		},
		methods:{
			storeInfo(pams)
			{
				this.api.store.storeAet(pams).then(res=>{
					this.stinfo=res.data
				})
			},
			logoUpload(temp)
			{
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: '/api/file',
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
								console.log('ggd',gres)
								if(gres.code==200)
								{
									
									if(temp=='logo')
									{
										this.logo_id=gres.data.id
										this.stinfo.logo_file_url=gres.data.url
										
									}else{
										this.stinfo.shop_sign_file_url=gres.data.url
										this.shop_sign_file_id=gres.data.id
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
			delePic(temp)
			{
				
				if(temp=='logo')
				{
					this.stinfo.logo_file_url=''
					
				}
				if(temp=='pic')
				{
					this.stinfo.shop_sign_file_url=''
				}
			}
			,saveInfo()
			{
				console.log('this.stinfo.logo_file_id',this.stinfo.logo_file_url)
				
				if(!this.stinfo.logo_file_url)
				{
					uni.showToast({
						title:'请上传公司logo！',
						icon:"error"
					})
					return
				}
				if(!this.stinfo.shop_sign_file_url)
				{
					uni.showToast({
						title:'请上传店铺门头！',
						icon:"error"
					})
					return
				}
				this.api.store.infoAet({
					id:this.stinfo.id,
					description:this.stinfo.description,
					logo_file_id:this.logo_id?this.logo_id:this.stinfo.logo_file_id,
					name:this.stinfo.name,
					shop_sign_file_id:this.shop_sign_file_id?this.shop_sign_file_id:this.stinfo.shop_sign_file_id
				}).then(res=>{
					if(res.code==200)
					{
						uni.showToast({
							title:'设置成功',
							icon:'none'
						})
						uni.navigateBack(1)
					}
				})
				
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.storeS{
		padding: 30upx;
	}
	.storeNmae{
		border-bottom: 1upx solid #f5f5f5;
		padding-bottom: 20upx;
	}
	.storeL{
		margin-top: 50upx;
		align-items: center;
		border-bottom: 1upx solid #f5f5f5;
		padding-bottom: 20upx;
	}
	.sbutton button{
		background-color: #ef8200;
		font-size: 26upx;
		padding: 10upx 28upx;
		color: #fff;
		
	}
	.setbutt button{
		margin-top: 60upx;
		color: #fff;
		background-color: #ef8200;
		padding: 20upx 0;
		font-size: 26upx;
	}
</style>