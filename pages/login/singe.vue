<template>
	<view class="loginMess">
		<view class="getcode">
			<view class="codeName">
				请输入验证码
			</view>
			<view class="al-succ">
				验证码已发送至 <text></text>
			</view>
			
			<input class="cinput" adjust-position="false" auto-blur="true" @blur="blur" @input="codenum" :focus="focus"
							value="code" v-model="code" type="number" maxlength="6" />
				<view class="code-input">
					<view v-for="(item,index) in 6" :key="index" @click="codefocus(index)"
								:style='(index == code.length? "border: 5rpx solid #1195db;width: 60rpx;height: 60rpx;line-height: 60rpx;":"color: " + codeclolor + ";" +"border: 2rpx solid" + codeclolor)'>
								{{code[index]}}
					</view>
				</view>
		</view>
		<view class="getcode" :class="setCla">
			<button v-if="!isshow">获取验证码({{sec}} s)</button>
			<button v-if="isshow" @click="isVallite">获取验证码</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar:'',
				focus: true,//input焦点，用于键盘隐藏后重新唤起
				// 验证码框颜色
				codeclolor: "#313131",//自定义光标的颜色
				// 验证码获取秒数
				sec: '60',//这是重新获取验证码的倒计时
				code: '',//这是用户输入的验证码
				// 获取验证码
				setCla:'',
				isshow:false,
				mobile:''

			}
		},
		
		methods: {
			// 输入验证码
			codenum: function(event) {
				var that = this
				var code = event.target.value
				that.code = code
				console.log('that.code',that.code)
				if (code.length == 6) {
					if (code) {
						that.api.user.mobLogin(
						{
							country_calling_code:'+86',
							mobile:that.mobile,
							sms_code:that.code
						}).then(res=>{
							
							if(res.code===200)
							{
								uni.setStorageSync('token',res.data.token)
								uni.reLaunch({
									url:'/pages/selectGoods/selectedGoods'
								})
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
		                //输入六位验证码后自动进行验证并执行验证成功的函数
					} else {
						that.codeclolor = "#ff0000"
						setTimeout(function() {
							that.code = ""
							event.target.value = ""
							that.codeclolor = "#313131"
						}, 1500)
					}
				}
			},
			// 键盘隐藏后设置失去焦点
			blur: function() {
				var that = this
				that.focus = false
			},
			// 点击自定义光标显示键盘
			codefocus: function(e) {
				var that = this
				if (e == that.code.length) {
					that.focus = true
				}
			},
			isVallite()
			{
				this.api.user.sendSms({
					country_calling_code:'+86',
					mobile:this.mobile
				}).then(res=>{
					if(res.code===200)
					{
						uni.showToast({
							icon:'none',
							title:'验证码发送成功!',
						});	
						
					}
				})
				
			}
			
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
			});
			var setIn=setInterval(()=>{
				if(this.sec >=1)
				{
					this.sec--;
					this.setCla='setnol'
					this.isshow=false
					
				}else{
					this.setCla='ismo',

					this.isshow=true
					clearInterval(setIn)
				}
			},1000)
			if(options.phone)
			{
				this.mobile=options.phone
			}
			
		},
		
	}
</script>

<style>
	.setnol button{
		background-color: #999;
	}
	.ismo button{
		background: #2F5597;
	}
	.loginMess{
		background-color: #fff;
		height: 100vh;
	}
	    .code {
			margin: auto;
			margin-top: 50rpx;
			width: 650rpx;
			height: auto;
		}
		.getcode{
			padding: 200upx 60upx;
		}
		.codeName{
			font-size: 42upx;
			font-weight: 600;
		}
		.al-succ{
			padding-top: 40upx;
			color: #666;
			font-size: 28upx;
		}
	    .code-tip-one {
			width: 650rpx;
			height: 250rpx;
			line-height: 100rpx;
			font-size: 60rpx;
			font-weight: bold;
			color: #313131;
		}
		 .getcode{
			padding-top: 40upx;
		 }
		 .getcode button{
			width: 629upx;
			height: 83upx;
			
			color: #fff;
			font-size: 28upx;
			line-height: 83upx;
		 }
		.code-tip {
			width: 650rpx;
			height: 100rpx;
			line-height: 50rpx;
			font-size: 30rpx;
			font-weight: normal;
			color: #8a8a8a;
		}
	 
		.code-errow {
			width: 650rpx;
			height: 50rpx;
			line-height: 25rpx;
			font-size: 28rpx;
			font-weight: normal;
			color: #ff0000;
		}
	 
		.code-tip>text {
			padding: 0 20rpx;
			width: 650rpx;
			font-size: 30rpx;
			font-weight: normal;
			color: #ff5500;
		}
	 
	    .code-input {
			
			display: flex;
			justify-content: space-between;
			margin-top: 180upx;
		}
	 
		.code-input>view {
			margin-top: 5rpx;
			margin-left: 15rpx;
			width: 60rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 34rpx;
			font-weight: bold;
			color: #313131;
			text-align: center;
			border-radius: 10rpx;
		}
	 
		.code-input>view:nth-child(1) {
			margin-left: 0rpx;
		}
	 
		.cinput {
			position: fixed;
			left: -100rpx;
			width: 50rpx;
			height: 50rpx;
		}
		
		.recode{
			margin-top: 20rpx;
			width: 200rpx;
			height: 80rpx;
			line-height: 80rpx;
			color: #707070;
			font-size: 28rpx;
		}
</style>
