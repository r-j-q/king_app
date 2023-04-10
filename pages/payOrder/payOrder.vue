<template>
	<view class="payOrder">
		<view class="payInner">
			<view class="ypayMess">
				<view class="pa1">
					应付金额
				</view>
				<view class="pa2">
					￥{{amount_in_cents}}
				</view>
				<view class="pa3">
					2小时后未付款，订单将会取消
				</view>
			</view>
			<view class="payMethod">
				<view class="pm1">
					支付方式
				</view>
				<view class="sele-pay" @click="payMeth(1,'balance')">
						<view class="flexs opay">
							<view class="">
								<uni-icons custom-prefix="iconfont" color="#1578FF" type="icon-yue" size="32"></uni-icons>
							</view>
							<view class="ye-mon">
								余额支付(余额：{{sums}})
							</view>
							<view class="radio-content radio-right">
								  <view class="radio" :class="radio1 == 1 ? 'radio-default':''">
										<view :class="radio1 == 1 ? 'radio-active':''"></view>
								  </view>
							</view>
						</view>
					
				</view>
				<view class="sele-pay" @click="payMeth(2,'alipay')">
						<view class="flexs opay">
							<view class="">
								<uni-icons custom-prefix="iconfont" color="#02A9F1" type="icon-zhifubao" size="32"></uni-icons>
							</view>
							<view class="ye-mon">
								支付宝支付
							</view>
							<view class="radio-content radio-right">
								  <view class="radio" :class="radio1 == 2 ? 'radio-default':''">
										<view :class="radio1 == 2 ? 'radio-active':''"></view>
								  </view>
							</view>
						</view>
					
				</view>
				<view class="sele-pay" @click="payMeth(3,'balance_and_alipay')">
						<view class="flexs opay">
							<view class="">
								<uni-icons custom-prefix="iconfont" color="#02A9F1" type="icon-zhifubao" size="32"></uni-icons>
							</view>
							<view class="ye-mon">
								组合付款(支付宝+余额)
							</view>
							<view class="radio-content radio-right">
								  <view class="radio" :class="radio1 == 3 ? 'radio-default':''">
										<view :class="radio1 == 3 ? 'radio-active':''"></view>
								  </view>
							</view>
						</view>
					
				</view>
				<view class="sele-pay" @click="payMeth(4,'wechat')">
						<view class="flexs opay">
							<view class="">
								<uni-icons custom-prefix="iconfont" color="#11D21D" type="icon-weixin" size="32"></uni-icons>
							</view>
							<view class="ye-mon">
								微信支付
							</view>
							<view class="radio-content radio-right">
								  <view class="radio" :class="radio1 == 4 ? 'radio-default':''">
										<view :class="radio1 == 4 ? 'radio-active':''"></view>
								  </view>
							</view>
						</view>
				</view>
				<view class="sele-pay" @click="payMeth(5,'balance_and_wechat')">
						<view class="flexs opay">
							<view class="">
								<uni-icons custom-prefix="iconfont" color="#11D21D" type="icon-weixin" size="32"></uni-icons>
							</view>
							<view class="ye-mon">
								组合付款(余额+微信)
							</view>
							<view class="radio-content radio-right">
								  <view class="radio" :class="radio1 == 5 ? 'radio-default':''">
										<view :class="radio1 == 5 ? 'radio-active':''"></view>
								  </view>
							</view>
						</view>
				</view>
							
			</view>
				
		</view>
		<view :class="isdisabled?'grayrr':'nowPay'">
			<button  :disabled="isdisabled"  @click="payOrder">立即支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pay:{
					ye:1
				},
				radio1:2,
				orderId:'',
				payMess:'',
				amount_in_cents:'',
				isdisabled:false,
				sums:0,
				payMethy:'nopay'
			}
		},
		onLoad(options) {
			console.log('optiins',options)
			if(options.orderId)
			{
				this.orderId=options.orderId
				this.payDeitals(options.orderId);
			}
		},
		created() {
			this.api.interactive.userBalance().then(res=>{
				this.sums=(res.data.balance.remaining_balance_in_cents + res.data.account_balance.remaining_balance_in_cents) / 100
			
			})
		},
		methods: {
			payMeth(pam,type)
			{
				this.radio1=pam
				this.payMethy=type
				this.isdisabled=false
				
			},
			payDeitals(pams)
			{
				this.api.interactive.payDeitals({orderId:pams}).then(res=>{
					this.payMess=res.data;
					this.amount_in_cents=res.data.amount_in_cents/100
				})
			},
			async payOrder()
			{
				
				if(this.payMethy =='nopay')
				{
					this.payMethy='alipay'
				}
				
				await this.api.interactive.paycheck({
					out_trade_no:this.payMess.out_trade_no,
					payment_type:this.payMethy
				}).then(res=>{
					 this.isdisabled=true
					 var that= this
					if(res.code===200)
					{
						
						if(this.payMethy === 'wechat' || this.payMethy === 'balance_and_wechat')
						{
							if(res.code==200 && res.data.error_code==0)
							{
								uni.showToast({
								  title: '支付成功！',
								  icon: 'none'
								});
								setTimeout(()=>{
									uni.navigateTo({
										url:'/pages/overOrder/overOrder?orderId='+this.orderId
									})
								},1000)
								
								return
							}
							let wx={
								appid:res.data.appId,
								noncestr:res.data.nonceStr,
								package:res.data.packageValue,
								partnerid:res.data.partnerId,
								prepayid:res.data.prepayId,
								sign:res.data.sign,
								timestamp:res.data.timeStamp
								
							}
							uni.requestPayment({
							  provider: 'wxpay',
							  orderInfo: wx,
							  success: e => {
							    uni.showToast({
							      title: '支付成功！',
							      icon: 'none'
							    });
								that.isdisabled=false	
							    setTimeout(()=>{
							    	uni.navigateTo({
							    		url:'/pages/overOrder/overOrder?orderId='+this.orderId
							    	})
							    },1000)
							  },
							  fail: e => {
							    uni.showModal({
							      content: '支付失败',
							      showCancel: false,
								  success(res){
								   if(res.confirm)
								   {
									   that.isdisabled=false
								   }
								  }
							    });
							  },
							  
							  complete: () => {
							    // this.providerList[index].loading = false;
							  }
							});
						}else if(this.payMethy === 'alipay' || this.payMethy === 'balance_and_alipay')
						{
							
							if(res.code==200 && res.data.error_code==0)
							{
								uni.showToast({
								  title: '支付成功！',
								  icon: 'none'
								});
								setTimeout(()=>{
									uni.navigateTo({
										url:'/pages/overOrder/overOrder?orderId='+this.orderId
									})
								},1000)
								return
							}
							uni.requestPayment({
							  provider: 'alipay',
							  orderInfo: res.data,
							  success: e => {
							    uni.showToast({
							      title: '支付成功！',
							      icon: 'none'
							    });
								that.isdisabled=false	
							   setTimeout(()=>{
							   	uni.navigateTo({
							   		url:'/pages/overOrder/overOrder?orderId='+this.orderId
							   	})
							   },1000)
							  },
							  fail: e => {
								  console.log('e',e)
								  if(e.errCode==-100 || e.code==-1)
								  {
									  uni.showModal({
									    content: '用户取消支付',
									    showCancel: false,
										success(res){
										 if(res.confirm)
										 {
											that.isdisabled=false
										 }
										}
									  });
								  }else{
									  uni.showModal({
									    content: '支付失败',
									    showCancel: false
									  });
								  }
							    
							  },
							  
							  complete: () => {
							    // this.providerList[index].loading = false;
							  }
							});
							
						}else if (this.payMethy === 'balance') {
							if (res.code === 200) {
							        if (res.data.error_code === 0) {
							         uni.showToast({
							           title: '支付成功！',
							           icon: 'none'
							         });
									 that.isdisabled=false
									 setTimeout(()=>{
									 	uni.navigateTo({
									 		url:'/pages/overOrder/overOrder?orderId='+this.orderId
									 	})
									 },2000)
							        } else {
							         
									  uni.showToast({
									    title: '余额不足!请选择组合付款！',
									    icon: 'none'
									  });
									  
									  return
							        }
							      } else {
							         uni.showToast({
							           title: '获取支付参数失败！',
							           icon: 'none'
							         });
							        return;
							      }
						
							
						
						}
						
						
					}
				}).catch(errs=>{
					uni.showToast({
						title:errs.message,
						icon:"none"
					})
					console.log('errs',errs)
				})
			}
		},
		
		//#ifdef APP-PLUS
		      getProviderList() {
		        let os = uni.getSystemInfoSync();
		        let providerList = [];
		        if (os.platform == 'android') {
		          uni.getProvider({
		            service: "payment",
		            success: (e) => {
		              console.log("payment success:" + JSON.stringify(e));
		              e.provider.map((value) => {
		                switch (value) {
		                  // case 'alipay':
		                  // 	providerList.push({
		                  // 		name: '支付宝',
		                  // 		id: value,
		                  // 		loading: false
		                  // 	});
		                  // 	break;
		                  case 'wxpay':
		                    providerList.push({
		                      name: '微信',
		                      id: value,
		                      loading: false
		                    });
		                    break;
		                  default:
		                    break;
		                }
		              })
		              this.providerList = providerList;
									if (this.providerList.length == 0) {
									  uni.showToast({
									    title: '检测到您未安装微信，购买真题需要使用微信支付喔~',
									    icon: 'none'
									  });
									}
		            },
		            fail: (e) => {
		              console.log("获取支付通道失败：", e);
		            }
		          });
		
		        }
		        //苹果使用内购
		        if (os.platform == 'ios') {
		          this.providerList = [{
		            name: '',
		            id: 'applypay',
		            loading: false
		          }];
		        }
		      },
		      //#endif
		
		async requestPayment(e, index) {
		        let os = uni.getSystemInfoSync();
		        //安卓支付
		        if (os.platform == 'android') {
		          this.providerList[index].loading = true;
		          let orderInfo = await this.getOrderInfo(e.id);
		          console.log('order',orderInfo)
		          uni.requestPayment({
		            provider: e.id,
		            orderInfo: orderInfo.data,
		            success: e => {
		              uni.showToast({
		                title: '！',
		                icon: 'none'
		              });
		
		              uni.redirectTo({
		                url: '/pages/zt_richtext/course_video_list?course_id=' + that.course_id,
		              })
		            },
		            fail: e => {
		              uni.showModal({
		                content: '支付失败',
		                showCancel: false
		              });
		            },
		            complete: () => {
		              this.providerList[index].loading = false;
		            }
		          });
		        }
		
		        //iOS 内购
		        if (os.platform == 'ios') {
		          this.get_channel().then(res => {
		            this.requestOrder().then(res => {
		              this.productId = 'com.alhelp.word.course_video_' + parseInt(this.course_detail.price)
		              this.object_id = this.course_id
		              this.appusername = this.share_member_id || 0
		
		              console.log(this.productId, this.object_id, this.appusername);
		              this.applePay().then(res => {
		                uni.showToast({
		                  title: '恭喜购买成功！可以愉快地学习啦！',
		                  icon: 'none'
		                });
		
		                uni.redirectTo({
		                  url: '/pages/zt_richtext/course_video_list?course_id=' + this.course_id,
		                })
		              }).catch(err => {
		                this.$tip.toast(err);
		              })
		            }).catch(err => {
		              this.$tip.toast(err);
		            })
		          }).catch(err => {
		            this.$tip.toast(err);
		          })
		        }
		      },
		      
	
	}
</script>

<style>
	.payInner{
		background-color: #fff;
		margin: 20upx;
		border-radius: 10upx;
	}
	.ypayMess{
		text-align: center;
	}
	.pa1{
		padding-top: 66upx;
		font-size: 32upx;
	}
	.pa2{
		font-size: 40upx;
		font-family: Microsoft YaHei;
		font-weight: 400;
		color: #D02C14;
		padding: 36upx;
	}
	.pa3{
		font-size: 28upx;
		font-family: Microsoft YaHei;
		font-weight: 300;
		color: #999999;
		padding-bottom: 78upx;
		padding-left: 30upx;
		padding-right: 30upx;
	}
	uni-radio .uni-radio-input {
		border-radius: 22upx!important;
		width: 22upx!important;
		height: 22upx!important;
		
	}
	.opay{
		justify-content: flex-start;
		align-items: center;
		
	}
	.radio-content {
		  height: 40rpx;
		  display: flex;
		  align-items: center;
		}
		.radio {
		  width: 31rpx;
		  height: 31rpx;
		  border-radius: 50%;
		  border: 2rpx solid #2F5597;
		  display: flex;
		  flex-direction: column; 
		  align-items: center;
		  justify-content: center;
		  margin: 0rpx 26rpx 0rpx 15rpx;
		}
		.radio-active{
		  width: 21rpx; 
		  height: 21rpx;
		  border-radius: 50%;
		  background-color: #2F5597;
		}
		.radio-default{
		  border: 2rpx solid ##2F5597;
		}
		.radio-right {
		  margin-left: auto;
		}
		.withMethods{
			margin-top: 20upx;
		}
		.payMethod{
			padding: 20upx;
		}
		.pm1{
			border-top: 1upx solid #ccc;
			padding-top: 17upx;
		}
		.sele-pay{
			padding-top: 47upx;
		}
		.ye-mon{
			padding-left: 24upx;
		}
		.nowPay button{
			width: 710upx;
			height: 96upx;
			background: #2F5597;
			border-radius: 8upx;
			color: #fff;
			font-size: 32upx;
			line-height: 96upx;
			margin-top: 40upx;
		}
		.grayrr button{
			background: gray!important;
			width: 710upx;
			height: 96upx;
			border-radius: 8upx;
			color: #fff;
			font-size: 32upx;
			line-height: 96upx;
			margin-top: 40upx;
		}
</style>
