<template>
	<view class="orderitals">
		<view class="orderstatus">
			<view class="status" v-if="orderStatus==0">待付款</view>
			<view class="status" style="color: #ef8200;" v-if="orderStatus==1">待发货</view>
			<view class="status"  v-if="orderStatus==2">待收货</view>
			<view class="status" style="color: green;" v-if="orderStatus==3">已完成</view>
			<view class="status"  v-if="orderStatus==4">已取消</view>
			<view class="status"  v-if="orderStatus==5">
				{{orderStatus==5?'退款':'未知'}}
			</view>

			<view class="shopNums">
				<view class="">
					共{{decount}}件商品 共计：￥ {{product_price_in_cents}}
					<block v-if=" userpoint>0">
						+{{userpoint}}代金券
					</block>
				</view>
			</view>
		</view>
		
		<block>
			
			
			<view class="newback">
				<view class="Swr8FcdU3ZIrrhasu9RL">
					<image :src=business_license_file_url mode=""></image>
					<view class="shopNems">{{storename}}</view>
				</view>
				<block v-for="(its,ins) in odeitals.order_products" :key="its.id">
					<view class="flexs wldelt" v-if="its.logistic">
						<view class="statSty">
							<text>{{its.logistic.state_name}}</text>
							<text style="padding-left: 40rpx;">{{its.logistic.time}}</text>
						</view>
						<view class="wldeit" @click="lookWl(its)">
							详细信息
							<uni-icons type="forward" color="blue" size="14"></uni-icons>
						</view>
					</view>
					<view class="wldelt" style="text-align: right;" v-else>
							未发货
					</view>
					
					
					<view class="MsJ8yac1ozVBe2aA4kFg">
						
						<view class="IX_X_sPOdG1LzsNK0v5G">
							<img :src=its.product_cover_image_url>
							<view class="etMfJW65qPOCAftqVoS4">
									<view>{{its.product_name}}</view>
									<view>{{its.sku_description}}</view>
									<view class="ismon">
										￥{{its.price_in_cents/100}}
										<text v-if="its.marketing_rule==2">
											+{{its.required_redemption_point}}代金券
										</text>
									</view>
							</view>
						</view>
						<view>X{{its.count}}</view>
					</view>
				</block>
				
			</view>
			
			<view class="shopMess">
				<view class="flexs setpan">
					<view class="">
						商品小计
					</view>
					<view class="">
						￥ {{product_price_in_cents}}
					</view>
				</view>
				<view class="flexs setpan">
					<view class="">
						运费
					</view>
					<view class="">
						￥ 0.00
					</view>
				</view>
				<view class="flexs setpan">
					<view class="">
						会员优惠
					</view>
					<view class="">
						-￥ 0
					</view>
				</view>
				<view class="flexs setpan">
					<view class="">
						实付金额
					</view>
					<view class="" style="color: red;">
						￥ {{product_price_in_cents}}
					</view>
				</view>

			</view>
			<view class="shopMess">
				<view class="flexs setpan">
					<view class="">
						订单号
					</view>
					<view class="">
						{{odeitals.serial_number}}
					</view>
				</view>
				<view class="flexs setpan">
					<view class="">
						下单时间
					</view>
					<view class="">
						{{getCurrentTime(odeitals.created_at)}}
					</view>
				</view>
				<view class="flexs setpan">
					<view class="">
						支付时间
					</view>
					<view class="">
						{{getCurrentTime(odeitals.created_at)}}
					</view>
				</view>
				<view class="flexs setpan">
					<view class="">
						订单备注:
					</view>
					<view class="">
						{{odeitals.order_comment?odeitals.order_comment:'无'}}
					</view>
				</view>


				<view class="gopay" v-if="odeitals.status==0">
					<button @click="subPay(odeitals)">确认付款</button>
				</view>
			</view>

		</block>
		
		
		
		<view class="op-height">
			<uni-popup ref="popup">
				<view class="popup-content">
					<view class="kdmess">快递信息</view>
					<view class="clpos" @click="closePop">
						<uni-icons custom-prefix="custom-icon" type="closeempty" size="22"></uni-icons>
					</view>
					<!-- 3、在template中使用 -->
					<scroll-view style="height: 70vh" class="bg" scroll-y="true" :scroll-top="scrollTop" :scroll-with-animation="true">
					<logistics  :wlInfo="wlInfo"></logistics>
					</scroll-view>
				</view>
				
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	
	import logistics from '@/components/xinyu-logistics/xinyu-logistics.vue'
	
	
	
	
	export default {
		components: { logistics },
		data()
		{
			return{
				odeitals:'',
				money:0,
				wlShow:true,
				scrollTop: 0,
				product_price_in_cents:0,
				orderStatus:0,
				decount:0,
				userpoint:0,
				business_license_file_url:'',
				storename:"",
				wlInfo: {
				    // delivery_status: 1, //快递状态 1已签收 2配送中
				    // post_name: '韵达快递', //快递名称
				    // logo: 'https://cdn.kuaidi100.com/images/all/56/yunda.png', //快递logo
				    // exp_phone: '95546', //快递电话
				    // post_no: '4304678557725', //快递单号
				    addr: '', //收货地址
				    //物流信息
				    // list: [
						// {
				  //           "time": "2020-04-12 13:00:57",
				  //           "timeArr": ['2020-04-12', '13:00:57'],
				  //           "context": "江西南昌青云谱区 快件已被 丰巢智能柜 代签收。",
				  //           "location": ""
				  //       },
				  //       {
				  //           "time": "2020-04-12 12:58:53",
				  //           "timeArr": ['2020-04-12', '12:58:53'],
				  //           "context": "江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888",
				  //           "location": ""
				  //       },
				  //       {
				  //           "time": "2020-04-11 15:45:44",
				  //           "timeArr": ['2020-04-11', '15:45:44'],
				  //           "context": "江西南昌分拨中心 从站点发出，本次转运目的地：江西南昌青云谱区",
				  //           "location": ""
				  //       },
				  //       {
				  //           "time": "2020-04-11 15:08:45",
				  //           "timeArr": ['2020-04-11', '15:08:45'],
				  //           "context": "江西南昌分拨中心 在分拨中心进行卸车扫描",
				  //           "location": ""
				  //       },
				  //       {
				  //           "time": "2020-04-10 17:42:41",
				  //           "timeArr": ['2020-04-10', '17:42:41'],
				  //           "context": "浙江义乌分拨中心 进行装车扫描，发往：江西南昌分拨中心",
				  //           "location": ""
				  //       },
				  //       {
				  //           "time": "2020-04-10 17:39:38",
				  //           "timeArr": ['2020-04-10', '17:39:38'],
				  //           "context": "浙江义乌分拨中心 在分拨中心进行称重扫描",
				  //           "location": ""
				  //       },
				  //       {
				  //           "time": "2020-04-10 16:02:46",
				  //           "timeArr": ['2020-04-10', '16:02:46'],
				  //           "context": "浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包",
				  //           "location": ""
				  //       },
				  //       {
				  //           "time": "2020-04-10 15:48:42",
				  //           "timeArr": ['2020-04-10', '15:48:42'],
				  //           "context": "浙江义乌城西公司城西营销部 进行揽件扫描",
				  //           "location": ""
				  //       }
				    // ]
				}
			}
		},
		
		onLoad(options) {
			if(options.orderId)
			{
				// this.payDeitals(options.orderId)
				
				this.newGetorderdeits(options.orderId)
			}
		},
		methods:{
			wlChange()
			{
				this.wlShow =! this.wlShow
				
				this.$refs.popup.open('bottom')
			},
			closePop()
			{
				this.$refs.popup.close()
			},
			lookWl(item)
			{
				
				if(!item.logistic.code)
				{
					return
				}
				this.api.interactive.newGetlogistic(item.logistic.code).then(res=>{
					this.$refs.popup.open('bottom')
					if(res.code==200)
					{
						
						 let addr=this.odeitals.delivery_province+
						this.odeitals.delivery_city+this.odeitals.delivery_town+this.odeitals.delivery_district+this.odeitals.delivery_address
					
						this.wlInfo=res.data
						
						this.$set(this.wlInfo,"addr",addr)
						
						// {
						//     "time": "2020-04-12 13:00:57",
						//     "timeArr": ['2020-04-12', '13:00:57'],
						//     "context": "江西南昌青云谱区 快件已被 丰巢智能柜 代签收。",
						//     "location": ""
						// },
					}
				})
			},
			newGetorderdeits(pams){
				uni.showLoading({
					title:'加载中...',
					mask:true
				})
				this.api.interactive.newGetorderdeit(pams).then(res=>{
					uni.hideLoading()
					if(res.code===200)
					{
						
						this.odeitals=res.data
						this.money=res.data.amount_in_cents/100
						this.product_price_in_cents=res.data.final_price_in_cents/100
						this.orderStatus=this.odeitals.status
						this.decount=0;
						this.userpoint=this.odeitals.used_redemption_point
						
						this.odeitals.order_products.map((item)=>{
							this.decount +=item.count
						})
						
						this.business_license_file_url=this.odeitals.store.business_license_file_url
						this.storename=this.odeitals.store.name
						
					}
				})
			},
			// payDeitals(pams)
			// {
			// 	this.api.interactive.payDeitals({orderId:'134348430850916352'}).then(res=>{
			// 		if(res.code===200)
			// 		{
			// 			// this.odeitals=res.data
			// 			// this.money=res.data.amount_in_cents/100
			// 			// this.product_price_in_cents=res.data.orders[0].final_price_in_cents/100
			// 			// // this.orderStatus=this.odeitals.orders[0].status
			// 			// this.decount=0;
			// 			// this.userpoint=this.odeitals.orders[0].used_redemption_point

			// 			// this.odeitals.orders[0].order_products.map((item)=>{
			// 			// 	this.decount +=item.count
			// 			// })
			// 		}
			// 	})

			// },
			
			
			subPay(pams)
			{
				console.log('ff ',pams)
				uni.navigateTo({
					url:'/pages/payOrder/payOrder?orderId='+pams.out_trade_no
				})
			},
			getCurrentTime(t) {

				var date = new Date(t);//当前时间


				 var year = date.getFullYear() //年
				 var month = this.repair(date.getMonth() + 1);//月
				 var day = this.repair(date.getDate());//日
				 var hour = this.repair(date.getHours());//时
				 var minute = this.repair(date.getMinutes());//分
				 var second = this.repair(date.getSeconds());//秒

				 //当前时间
				 var curTime = year + "-" + month + "-" + day
						 + " " + hour + ":" + minute + ":" + second;
				 return curTime;
			},
			getCurrentTimes(t) {
				console.log('规格规格个0',t)
				 var date = new Date(t);//当前时间
				 var year = date.getFullYear() //年
				 var month = this.repair(date.getMonth() + 1);//月
				 var day = this.repair(date.getDate());//日
				 var hour = this.repair(date.getHours());//时
				 var minute = this.repair(date.getMinutes());//分
				 var second = this.repair(date.getSeconds());//秒

				 //当前时间
				 var curTime = year + "-" + month + "-" + day
						 + " " + hour + ":" + minute + ":" + second;
				 return curTime;
			},


			 //若是小于10就加个0

			  repair(i){
				 if (i >= 0 && i <= 9) {
					 return "0" + i;
				 } else {
					 return i;
				 }
			 },

		}
	}
</script>

<style>
	
	.orderitals{
		padding: 0 32rpx;
	}
	.wlmess{
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
		
		border: 1px solid #2F5597;
		margin:40rpx 260rpx 0 260rpx;
		font-size: 26rpx;
		border-radius: 40rpx;
		padding: 10rpx;
	}
	.wlmess image{
		width: 30rpx;
		height: 30rpx;
	}
	.orderstatus{
		padding: 30upx;
		text-align: center;
	}
	.shopNums{
		padding-top: 20upx;
	}
	.status{
		font-size: 28upx;
		color: #f76252;
		font-weight: 600;
	}
	.shopNums{
		font-size: 24upx;

	}
	.wldelt{
		padding: 20rpx 0;
		font-size: 26rpx;
	}
	.newback{
		background-color: #fff;
		border-radius: 20rpx;
		padding: 20rpx;
	}
	.wldeit{
		color: blue;
	}
	.Swr8FcdU3ZIrrhasu9RL,.MsJ8yac1ozVBe2aA4kFg{
		display: flex;
		align-items: center;
		font-size: 26upx;
		padding: 30upx  0;
	}
	.MsJ8yac1ozVBe2aA4kFg{
		border-top: 1upx solid #ccc;
		margin-bottom: 20rpx;
		
		
	}
	.Swr8FcdU3ZIrrhasu9RL image{
		width: 90upx;
		height: 90upx;
	}
	.shopNems{
		padding-left: 10upx;
	}
	
	.MsJ8yac1ozVBe2aA4kFg{
		
		align-items: flex-end;
		justify-content: space-between;
	}
	.IX_X_sPOdG1LzsNK0v5G{
		display: flex;
		align-items: center;
	}
	.IX_X_sPOdG1LzsNK0v5G img {
	    height: 120upx;
	    width: 120upx;
	}
	.etMfJW65qPOCAftqVoS4{
		padding-left: 30upx;
		font-size: 22upx;
		color: gray;
		line-height: 40upx;
	}
	.ismon{
		color: #ef8200;
		font-size: 28upx;
		font-weight: 600;
	}
	.setpan{
		padding: 20upx 40upx;
	}
	.shopMess{
		background-color: #fff;
		margin-top: 20upx;
		border-radius: 20rpx;
	}
	.gopay{
		margin: auto;
		padding: 60upx;
	}
	.gopay button{
		background-color: #2F5597;
		    width: 89px;
		    margin-right: inherit;
		    font-size: 14px;
		    padding: 8px 5px;
		    color: #fff;

	}
	
	.popup-content{
		padding: 20rpx 0 40rpx 0;
		border-radius: 20rpx 20rpx 0  0;
		position: relative;
	}
	.clpos{
		position: absolute;
		top: 0;
		right: 0;
		padding: 20rpx 10rpx 20rpx 0;
	}
	.kdmess{
		padding-bottom: 20rpx;
		font-size: 28rpx;
		font-weight: 600;
	}
</style>
