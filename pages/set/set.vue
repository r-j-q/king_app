<template>
	<view class="settool">
		<view class="spline">
			<view class="flexs setpl" @click="goinfo">
				<view class="setMess">
					<view class="">
						<uni-icons custom-prefix="iconfont" color="#02A9F1" type="icon-gerenziliao" size="32"></uni-icons> 
					</view>
					<view class="prl">
						个人资料
					</view>
				</view>
				<view class="">
					<uni-icons type="right" color="#666" size="22"></uni-icons> 
					
				</view>
			</view>
			<view class="flexs setpl" @click="editPass">
				<view class="setMess">
					<view class="">
						<uni-icons custom-prefix="iconfont" color="#02A9F1" type="icon-zhanghaoanquan" size="32"></uni-icons> 
					</view>
					<view class="prl">
						账号安全
					</view>
				</view>
				<view class="">
					<uni-icons type="right" color="#666" size="22"></uni-icons> 
					
				</view>
			</view>
			<view class="flexs setpl" @click="titconfirm">
				<view class="setMess">
					<view class="">
						<uni-icons custom-prefix="iconfont" color="#02A9F1" type="icon-jiuyexieyi" size="32"></uni-icons> 
					</view>
					<view class="prl">
						相关协议
					</view>
				</view>
				<view class="">
					<uni-icons type="right" color="#666" size="22"></uni-icons> 
					
				</view>
			</view>
			<view class="flexs setpl" @click="about">
				<view class="setMess">
					<view class="">
						<uni-icons custom-prefix="iconfont" color="#02A9F1" type="icon-guanyuwomen" size="32"></uni-icons> 
					</view>
					<view class="prl">
						关于我们
					</view>
				</view>
				<view class="">
					<uni-icons type="right" color="#666" size="22"></uni-icons> 
					
				</view>
			</view>
			<view class="flexs setpl" @click="goaddres">
				<view class="setMess">
					<view class="">
						<uni-icons custom-prefix="iconfont" color="#02A9F1" type="icon-dizhiguanli" size="32"></uni-icons> 
					</view>
					<view class="prl">
						地址管理
					</view>
				</view>
				<view class="">
					<uni-icons type="right" color="#666" size="22"></uni-icons> 
					
				</view>
			</view>
			<view class="flexs setpl" @click="titconfirm">
				<view class="setMess">
					<view class="">
						<uni-icons custom-prefix="iconfont" color="#02A9F1" type="icon-xiaoxitishi" size="32"></uni-icons> 
					</view>
					<view class="prl">
						信息推送
					</view>
				</view>
				<view class="">
					<uni-icons type="right" color="#666" size="22"></uni-icons> 
					
				</view>
			</view>
			<view class="flexs setpl" @click="titconfirm">
				<view class="setMess">
					<view class="">
						<uni-icons custom-prefix="iconfont" color="#02A9F1" type="icon-yunongtongqingchuhuancun" size="32"></uni-icons> 
					</view>
					<view class="prl">
						清除缓存
					</view>
				</view>
				<view class="">
					<uni-icons type="right" color="#666" size="22"></uni-icons> 
					
				</view>
			</view>
					<view class="logout">
						<button @click="singlout">退出登录</button>
					</view>
					
					
					<view  style="position: fixed;bottom: 0;padding-bottom: 30upx; margin: auto;width: 80%;">
						<view style="text-align: center;font-size: 26upx;left: 0;right: 0;">版本号：{{version}}</view>
					</view>
		</view>
		<view class="op-height">
			<uni-popup ref="popup" background-color="#fff">
				<view class="editpass">修改密码</view>
				<view class="popup-content">
					<view class="flexs password serlr">
						<view class="">手机号</view>
						<view >{{info}}</view>
						<view class="getcode inbod">
							<button @click="getCode">获取验证码</button>
						</view>
					</view>
					<view class="flexs password serlr" v-if="iscode">
						<view class="">验证码</view>
						<view class="inpuss">
							<input type="number" v-model="code">
						</view>
					</view>
					<view class="flexs password serlr">
						<view class="">新密码</view>
						<view class="inpuss">
							<input type="password" v-model="password">
						</view>
					</view>
					<view class="flexs password serlr">
						<view class="inbod">确认密码</view>
						<view class="inpuss">
							<input type="password" v-model="confpassword">
						</view>
					</view>
					<view class="editpassword">
						<button @click="editPassword">修改密码</button>
					</view>
				</view>
				
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				password:'',
				confpassword:'',
				iscode:true,
				code:'',
				info:'',
				version:''
			}
		},
		created() {
			this.userAuthed();
		},
		onShow() {
		  
		  if (!uni.getStorageSync('token')) {
			  uni.reLaunch({
			  	url:'/pages/login/login'
			  })
			  return
		  }
		  let os = uni.getSystemInfoSync();
		  
		  this.version=os.appWgtVersion
		},
		methods: {
			userAuthed()
			{
				this.api.interactive.userAuthed().then(res=>{
					console.log('res',res)
					this.info=res.data.name
				})
			},
			titconfirm()
			{
				uni.showToast({
					title:'暂未开放，敬请期待！',
					icon:'none'
				})
			},
			goinfo()
			{
				uni.navigateTo({
					url:'/pages/pCenter/info'
				})
			},
			goaddres()
			{
				uni.navigateTo({
					url:'/pages/addres/addres'
				})
			},
			about()
			{
				console.log('萨达萨达')
				uni.navigateTo({
					url:'/pages/about/about'
				})
			},
			singlout()
			{
				this.api.interactive.useSignout().then(res=>{
					if(res.code===200)
					{
						uni.showToast({
							title:'退出成功！',
							icon:'none'
						});
						
						uni.removeStorageSync('token');
						uni.clearStorage()
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				})
				
			},
			
			editPass()
			{
				this.$refs.popup.open('bottom')
			},
			editPassword()
			{
				uni.showLoading({
					title:'加载中...',
					icon:'loading'
				})
				if(!this.code)
				{
					uni.showToast({
						title:'请输入验证码！',
						icon:'none'
					})
					return false
				}
				if(!this.password)
				{
					uni.showToast({
						title:'请输入密码！',
						icon:'none'
					})
					return false
				}
				if(this.password.length <6)
				{
					uni.showToast({
						title:'密码长度不足！',
						icon:'none'
					})
					return false
				}
				if(!this.confpassword)
				{
					uni.showToast({
						title:'请确认密码！',
						icon:'none'
					})
					return false
				}
				
				if(this.password != this.confpassword)
				{
					uni.showToast({
						title:'两次输入密码不一致！',
						icon:'none'
					})
					return false
				}
				this.api.interactive.editPassword({
					password:this.password,
					sms_code:this.code
				}).then(res=>{
					uni.hideLoading()
					if(res.code===200)
					{
						uni.showToast({
							title:'密码修改成功！',
							icon:'none'
						})
						this.iscode=false
						this.password=''
						this.confpassword=''
						this.$refs.popup.close()
					}
				}).catch(err=>{
					uni.hideLoading()
					uni.showToast({
						title:err.message,
						icon:'none'
					})
				})
				

			},
			getCode()
			{
				
				this.api.interactive.loginCode().then(res=>{
					if(res.code===200)
					{
						this.iscode=true
						uni.showToast({
							icon:'none',
							title:'验证码发送成功!',
						});
						
					}
				})
				
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.popup-content{
		height: 600upx;
		padding: 20upx 40upx;
	}
	.getcode button,.editpassword button{
		background-color: #2F5597;
		font-size: 26upx;
		padding: 10upx 30upx;
		color: #fff;
	}
	.editpassword button{
		padding: 20upx 50upx;
		width: 60vw;
		margin-top: 80upx;
	}
	.editpass{
		text-align: center;
		padding: 20upx 0;
		font-size: 28upx;
		font-weight: 600;
	}
	.spline{
		border-top: 1upx solid #ccc;
		padding: 40upx 30upx;
		margin-top: 20upx;
	}
	.setMess{
		display: flex;
		align-items: center;
	}
	.setpl{
		
		align-items: center;
		padding-bottom: 30upx;
		border-bottom:1upx solid #ccc ;
		margin-bottom: 40upx;
	}
	.prl{
		padding-left: 20upx;
	}
	.logout button{
		margin-top: 100upx;
		background-color: #2F5597;
		    width: 300upx;
		    
		    font-size: 14px;
		    padding: 8px 5px;
		    color: #fff;
	}
	.password{
		align-items: center;
	}
	.serlr{
		border-bottom: 2upx solid #ccc;
		margin-bottom: 40upx;
		padding-bottom: 20upx;
	}
	.inpuss input{
		width: 60vw;
		border-bottom: 1upx solid #000;
	}
</style>
