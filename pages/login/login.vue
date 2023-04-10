<template>
	<view class="loginMess">
		<view class="flexs iotops" :style="[{'paddingTop':statusBar+'px'}]">
			<view><!-- <uni-icons type="left" color="#666" size="27"></uni-icons> --></view>
		
			<view class="sr"  @click="setlogin">{{loginMe}}</view>
			
		</view>
		<view class="wel-sys">
			<view class="wlName">
				欢迎来到纳零王者系统
			</view>
			<view class="iphone">
				您身边的智能系统
			</view>
			<view class="flexs login-type">
				<view @click="logintyps(1)" :class="status==1 || status==3?'active':'noticive'">手机号登录</view>
				<view @click="logintyps(2)" :class="status==2?'active':'noticive'">账号密码登录</view>
			</view>
			<view v-if="status==1" class="">
				<view class="flexs enterPhone">
					<view>+86</view>
					<view class="entrP">
						<input type="number" v-model="phone" name=""  placeholder="11位手机号码">
					</view>
				</view>
				
				<view class="enterPhone passm" v-if="islogin">
					<input type="password" v-model="password" name=""  placeholder="输入密码">
				</view>
			</view>
			<view v-if="status==2" class="">
				<view class="flexs enterPhone">
					<view class="entrPs">
						<input type="safe-password" v-model="username"  id="" placeholder="请输入纳零王者账号">
					</view>
				</view>
				
				<view class="enterPhone passm">
					<input type="password" v-model="password"  id="" placeholder="输入密码">
				</view>
			</view>
			<view v-if="status==3" class="">
				<view class="flexs enterPhone">
					<view>+86</view>
					<view class="entrP">
						<input type="number" v-model="phone" name="" id="" placeholder="11位手机号码">
					</view>
				</view>
				<view v-if="islogin" class="enterPhone passm">
					<input type="password" v-model="password"  id="" placeholder="输入密码">
				</view>
			</view>
			<view v-if="status==2" class="fortpwd"  @click="fortpwd">
				忘记密码
			</view>
			<view class="getcode" v-if="!islogin">
				<button @click="getCode">获取验证码</button>
			</view>
			<view class="getcode" v-if="islogin">
				<button @click="passLogin">密码登录</button>
			</view>
			
			<view class="agree">
				<radio-group @change="checkboxChange">
					<view>
						<radio :value="ischeck"   :checked="checked" />
					</view>
				</radio-group>
				<view class="tgag" @click="userAgree(1)">
					阅读并同意<text class="userAgree" >《用户协议》</text>和<text class="userAgree">《隐私政策》</text>
				</view>
			</view>
				
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar:'',
				loginMe:'验证码登录',
				checked:false,
				ischeck:'1',
				getcheckvalue:'',
				islogin:true,
				phone:'',
				username:'',
				password:'',
				status:1
			}
		},
		
		
		methods: {
			userAgree (pams)
			{
				uni.navigateTo({
					url:'/pages/userAgree/userAgree'
				})
			},
			checkboxChange(e)
			{
				this.getcheckvalue=e.detail.value
			},
			logintyps(pams)
			{
				this.status=pams
				this.islogin=true
			},
			fortpwd()
			{
				uni.navigateTo({
					url:'/pages/setVoice/editpwd?gorttype=1'
				})
			},
			getCode()
			{
				if(this.getcheckvalue !=1)
				{
					uni.showToast({
						icon:"none",
						title:'请勾选同意用户协议!'
					})
					return
				}
				if(this.phone.length <11)
				{
					uni.showToast({
						icon:"none",
						title:'请输入正确的手机号码!'
					})
					return
				}
				this.api.user.sendSms({
					country_calling_code:'+86',
					mobile:this.phone
				}).then(res=>{
					if(res.code===200)
					{
						
						uni.showToast({
							icon:'none',
							title:'验证码发送成功!',
						});
						setTimeout(()=>{
							uni.navigateTo({
								url:'/pages/login/singe?phone='+this.phone
							})
						},1000)
						
					}
				})
				
			},
			
			//密码登录
			passLogin()
			{
				if(this.status==1)
				{
					if(this.phone.length <11)
					{
						uni.showToast({
							icon:"none",
							title:'请输入正确的手机号码!'
						})
						return
					}
				}
				
				if(this.password.length <6)
				{
					uni.showToast({
						icon:"none",
						title:'密码长度不足!'
					})
					return
				}
				if(this.getcheckvalue !=1)
				{
					uni.showToast({
						icon:"none",
						title:'请勾选同意用户协议!'
					})
					return
				}
			
				if(this.phone && this.status==1 || this.status==3)
				{
					var passlogin={
						account_id:this.phone,
						password:this.password
					}
				}else{
					var passlogin={
						username:this.username,
						password:this.password
					}
				}
				
				this.api.interactive.passLogin(passlogin).then(res=>{
					console.log('res',res)
					if(res.code===200)
					{
						uni.setStorageSync('token',res.data.token)
						uni.showToast({
							title:'登录成功！',
							icon:'none'
						})
						
						this.$store.commit('set_tab_user','')
						setTimeout(()=>{
							uni.reLaunch({
								url:'/pages/selectGoods/selectedGoods'
							})
						},2000)
						
					}
				}).catch(err=>{
					if(err.code==400)
					{
						uni.showToast({
							title:err.message,
							icon:'none'
						})
					}
				})
			},
			//获取验证码
			setlogin()
			{
				this.islogin= ! this.islogin;
				this.status=3
				if(!this.islogin)
				{
					this.loginMe='密码登录'
				}else{
					this.loginMe='验证码登录'
				}
				
			},
			updateApp()
			{
			
				plus.runtime.getProperty(plus.runtime.appid, (inf) => {
				    this.wgtVer = inf.version;
					this.api.interactive.getAppver().then(r=>{
						if (r.code==200) {
						
						    if (inf.version < r.data.version_number) 
							{
								    uni.showLoading({
								        title: '更新中……',
										mask:true
								    })
								    uni.downloadFile({ //执行下载
								        url: r.data.download_url, 
								        success: downloadResult => {
								            uni.hideLoading();
								            if (downloadResult.statusCode ===200) 
											{
														
											   plus.runtime.install(downloadResult.tempFilePath, {  	
													force: false  
												}, function() {
													uni.showToast({
														title:'更新成功',
														icon:'none'
													})
												   
													plus.runtime.restart();  
												}, function(e) {  
													uni.showToast({
														title:'更新失败',
														icon:'none'
													})
													
												});  
								        }  
											    
													
													
								            
								        }
								    })
										 
								
								
						    }
						}
												       				  
													
					}).catch(err=>{
						console.log('errrr',err)
					})
					
					
				});
						
			},
			
			
		
		},
		onLoad(options) {
			var that=this;
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
				  statusBar = e.statusBarHeight
				  customBar = e.statusBarHeight + 45;
				  that.statusBar=e.statusBarHeight+16;
				  
				}
			})
			if(options.status && options.status !=undefined)
			{
				that.status=options.status
			}
		
		},
		onShow() {
			// #ifdef APP-PLUS
			//APP版本检测
			let os = uni.getSystemInfoSync();
			if (os.platform == 'android') {
				this.updateApp();
			}
			// #endif
			
			this.username=this.$store.state.tab_user
		}
		
	}
</script>

<style>
	
	.iotops{
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 20upx;
		border-bottom: 1upx solid #ccc;
		background-color: #fff;
		align-items: center;
	}
	.sr{
		color: #999;
	}
	.loginMess{
		background-color: #fff;
	}
	.wel-sys{
		padding: 100upx 60upx;
	}
	.wlName{
		font-size: 40upx;
		font-weight: 600;
		color: #333;
	}
	.iphone{
		color: #666666;
		font-size: 26upx;
		padding-top: 32upx;
	}
	.enterPhone{
		justify-content: flex-start;
		padding-top: 80upx;
		border-bottom: 1upx solid #000;
		padding-bottom: 20upx;
	}
	.login-type{
		justify-content: center;
		padding-top: 110upx;
		/* grid-gap: 80upx; */
		font-size: 28upx;
		font-weight: 600;
	}
	.login-type view{
		margin-left: 40upx;
		margin-right: 40upx;
	}
	.entrP{
		padding-left: 30upx;
	}
	.getcode{
		padding-top: 40upx;
	}
	.fortpwd{
		padding-top: 86upx;
		text-align: right;
		font-size: 24upx;
		color: #BFBFBF;
	}
	.getcode button{
		width: 629upx;
		height: 83upx;
		background: #2F5597;
		color: #fff;
		font-size: 28upx;
		line-height: 83upx;
	}
	.agree{
		display: flex;
		padding-top: 62upx;
		align-items: center;
		justify-content: center;
	}
	.tgag{
		color: #999;
		font-size: 26upx;
		padding-left: 10upx;
	}
	.userAgree{
		color: #00c;
	}
	.passm{
		padding-top: 40upx;
	}
	
	
	/deep/.uni-radio-input-checked{
			font-size: 32upx!important;
			}
	
	/deep/.uni-radio-input{
		width: 28upx!important;
		height: 28upx!important;
		border-radius: 1upx!important;
	}
	.noticive{
		
		color: #666;
	}
	.active{
		
		color: #2F5597;
		position: relative;
	}
	.active::after
	{ 
		content:"";
		width: 80upx;
		display: block;
		margin: 0 auto;
		border-bottom: 8upx solid #2F5597;
		padding-bottom: 12upx;
		border-radius: 6upx;
		
	}
</style>
