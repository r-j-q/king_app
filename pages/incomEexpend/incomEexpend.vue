<template>
	<view class="incomMess">
		<view class="iotops search-with" :style="[{'paddingTop':statusBar+'px'}]">
			<view @click="goBack"><uni-icons type="left" color="#666" size="27"></uni-icons></view>
			<view class="sy-follow">
				<text class="sl" :class="tabs==1?'active':'noict'" @click="ioTabs(1)">收入</text>
				<text class="sr" :class="tabs==2?'active':'noict'" @click="ioTabs(2)">支出</text>
			</view>

		</view>

		<!-- 收入 -->
		<view v-show="tabs==1">
			<view class="nextTabs">
				<view :class="sytl==1?'satc':''" @click="syneTabs(1)">全部</view>
				<view :class="sytl==3?'satc':''" @click="syneTabs(3)">任务奖励</view>
			</view>
			<view class="ze-Orlist" v-show="sytl==1">
				<view class="allList" v-for="(ito,index) in actlist" :key="ito.id">
					<view class="pckJsaR3Yo3XKwkcQ8rr">
						<view class="qOFuWhp0k3ZZGOZ4Ewy_">
							<view class="d9I6A43SJWBMXPlVD_eV">
								{{ito.action_type === 0
								? '提现'
								: ito.action_type === 1
								? ito.additional_info.task_name +
								  'X' +
								  ito.additional_info.task_number
								: ito.action_type === 2
								? ito.additional_info.product_name
								: ito.action_type === 3
								? ito.additional_info.manipulation_name ||
								  ito.additional_info.description
								: '充值'}}
							</view>
							<view class="">
								<view v-if="ito.additional_info && ito.additional_info.order_serial_number">
									  订单号：{{ito.additional_info.order_serial_number}}
								</view>

								<view v-if="ito.additional_info.comment">
									备注:{{ito.additional_info.comment}}
								</view>
							</view>


						</view>
						<view class="oCODSvelDra9LgwvnKJE">
							<view class="Q2wShjoVTTPRSyis0e9D">

									<view :class="ito.type == 1 ? 'styles-ye' : 'styles-no'">

										<view class="m1" v-if="ito.action_type === 1">
											<view v-if="ito.additional_info.task_number">
												+￥{{ito.amount_in_cents / 100}}
											</view>

											<view v-if="ito.additional_info.task_number">
											  +{{ito.redemption_point}}
											</view>
										</view>

									<view class="m2" v-else>
										{{ito.type === 1?'- ￥' + Math.abs(ito.amount_in_cents / 100):'+ ￥' + ito.amount_in_cents / 100}}
									</view>



									</view>

							</view>
						</view>
					</view>
					<view class="dFPyEKo4mwooOzy87WQ6">
						<view class="_eBehdRbMUR9Sx7njmwv">{{getCurrentTime(ito.action_taken_at)}}</view>
						<view class="b311ajZWswk0YCY9F6tN">账户余额:￥{{ito.user_balance_in_cents / 100}}</view>
						<view class="b311ajZWswk0YCY9F6tN">代金券:{{ito.user_redemption_point}}</view>
					</view>

				</view>

			</view>
			<view class="ze-Orlist" v-show="sytl==3">

				 <view class="allList" v-for="(ito,index) in actlist" :key="ito.id">
				 	<view class="pckJsaR3Yo3XKwkcQ8rr">
				 		<view class="qOFuWhp0k3ZZGOZ4Ewy_">
				 			<view class="d9I6A43SJWBMXPlVD_eV">
				 				{{ito.action_type === 0
				 				? '提现'
				 				: ito.action_type === 1
				 				? ito.additional_info.task_name +
				 				  'X' +
				 				  ito.additional_info.task_number
				 				: ito.action_type === 2
				 				? ito.additional_info.product_name
				 				: ito.action_type === 3
				 				? ito.additional_info.manipulation_name ||
				 				  ito.additional_info.description
				 				: '充值'}}
				 			</view>
				 			<view class="">
				 				<view v-if="ito.additional_info && ito.additional_info.order_serial_number">
				 					  订单号：{{ito.additional_info.order_serial_number}}
				 				</view>

				 				<view v-if="ito.additional_info.comment">
				 					备注:{{ito.additional_info.comment}}
				 				</view>
				 			</view>


				 		</view>
				 		<view class="oCODSvelDra9LgwvnKJE">
				 			<view class="Q2wShjoVTTPRSyis0e9D">
				 					<view :class="ito.type == 1 ? 'styles-ye' : 'styles-no'">

				 						<view class="m1" v-if="ito.action_type === 1">
				 							<view v-if="ito.additional_info.task_number">
				 								+￥{{ito.amount_in_cents / 100}}
				 							</view>

				 							<view v-if="ito.additional_info.task_number">
				 							  +{{ito.redemption_point}}
				 							</view>
				 						</view>

										<view class="m2" v-else>
											{{ito.type === 1?'- ￥' + Math.abs(ito.amount_in_cents / 100):'+ ￥' + ito.amount_in_cents / 100}}
										</view>

				 					</view>

				 			</view>
				 		</view>
				 	</view>
				 	<view class="dFPyEKo4mwooOzy87WQ6">
				 		<view class="_eBehdRbMUR9Sx7njmwv">{{getCurrentTime(ito.action_taken_at)}}</view>
				 		<view class="b311ajZWswk0YCY9F6tN">账户余额:￥{{ito.user_balance_in_cents / 100}}</view>
				 		<view class="b311ajZWswk0YCY9F6tN">代金券:{{ito.user_redemption_point}}</view>
				 	</view>

				 </view>

			</view>

		</view>

		<!-- 支出 -->
		<view v-show="tabs==2">
			<view class="nextTabs">
				<view :class="ntl==4?'satc':''" @click="neTabs(4)">全部</view>
				<view :class="ntl==5?'satc':''" @click="neTabs(5)">提现</view>
				<view :class="ntl==6?'satc':''" @click="neTabs(6)">购买商品</view>
				<view :class="ntl==7?'satc':''" @click="neTabs(7)">系统操作</view>
			</view>
			<view class="all-show" v-show="ntl==4">
				<view class="sy-list" v-for="(item,index) in actlist" :key="item.id">
					<view class="orderMss">
						订单号:{{item.additional_info.order_serial_number}}
					</view>
					<view class="flexs orNameMess">
						<view class="OrNme">
							<view class="d9I6A43SJWBMXPlVD_eV">
								{{item.action_type === 0
								? '提现'
								: item.action_type === 1
								? item.additional_info.task_name +
								  'X' +
								  item.additional_info.task_number
								: item.action_type === 2
								? item.additional_info.product_name
								: item.action_type === 3
								? item.additional_info.manipulation_name ||
								  item.additional_info.description
								: '充值'}}
							</view>
						</view>
						<view class="orMoney">


							<view class="m1" v-if="item.action_type === 1">
								<view v-if="item.additional_info.task_number">
									+￥{{item.amount_in_cents / 100}}
								</view>

								<view v-if="item.additional_info.task_number">
								  +{{item.redemption_point}}
								</view>
							</view>

							<view class="m2" :class="ntl==4?'z5':''" v-else>
								{{item.type === 1?'- ￥' + Math.abs(item.amount_in_cents / 100):'+ ￥' + item.amount_in_cents / 100}}
							</view>


						</view>
					</view>
					<view class="flexs fletimeScore">
						<view class="tdate">
							{{getCurrentTime(item.action_taken_at)}}
						</view>
						<view class="accMoney">
							账户余额:￥{{item.user_balance_in_cents / 100}}
						</view>
						<view class="fScoore">
							代金券:{{item.user_redemption_point}}
						</view>
					</view>

				</view>

			</view>
			<view class="tx-show" v-show="ntl==5">
				<view class="allList" v-for="(ito,index) in actlist" :key="ito.id">
					<view class="pckJsaR3Yo3XKwkcQ8rr">
						<view class="qOFuWhp0k3ZZGOZ4Ewy_">
							<view class="d9I6A43SJWBMXPlVD_eV">
								{{ito.action_type === 0
								? '提现'
								: ito.action_type === 1
								? ito.additional_info.task_name +
								  'X' +
								  ito.additional_info.task_number
								: ito.action_type === 2
								? ito.additional_info.product_name
								: ito.action_type === 3
								? ito.additional_info.manipulation_name ||
								  ito.additional_info.description
								: '充值'}}
							</view>
							<view class="">
								<view v-if="ito.additional_info && ito.additional_info.order_serial_number">
									  订单号：{{ito.additional_info.order_serial_number}}
								</view>

								<view class="withMon" v-if="ito.additional_info.comment">
									备注:{{ito.additional_info.comment}}
								</view>
							</view>


						</view>
						<view class="oCODSvelDra9LgwvnKJE">
							<view class="Q2wShjoVTTPRSyis0e9D">

									<view :class="ito.type == 1 ? 'styles-ye' : 'styles-no'">

										<view class="m1" v-if="ito.action_type === 1">
											<view v-if="ito.additional_info.task_number">
												+￥{{ito.amount_in_cents / 100}}
											</view>

											<view v-if="ito.additional_info.task_number">
											  +{{ito.redemption_point}}
											</view>
										</view>

									<view class="m2" :class="ntl==5?'z5':''" v-else>
										{{ito.type === 1?'- ￥' + Math.abs(ito.amount_in_cents / 100):'+ ￥' + ito.amount_in_cents / 100}}
									</view>

									</view>

							</view>
						</view>
					</view>
					<view class="dFPyEKo4mwooOzy87WQ6">
						<view class="_eBehdRbMUR9Sx7njmwv">{{getCurrentTime(ito.action_taken_at)}}</view>
						<view class="b311ajZWswk0YCY9F6tN">账户余额:￥{{ito.user_balance_in_cents / 100}}</view>
						<view class="b311ajZWswk0YCY9F6tN">代金券:{{ito.user_redemption_point}}</view>
					</view>

				</view>

			</view>
			<view class="gm-show" v-show="ntl==6">
				<view class="sy-list" v-for="(item,index) in actlist" :key="item.id">
					<view class="orderMss">
						订单号:{{item.additional_info.order_serial_number}}
					</view>
					<view class="flexs orNameMess">
						<view class="OrNme">
							<view class="d9I6A43SJWBMXPlVD_eV">
								{{item.action_type === 0
								? '提现'
								: item.action_type === 1
								? item.additional_info.task_name +
								  'X' +
								  item.additional_info.task_number
								: item.action_type === 2
								? item.additional_info.product_name
								: item.action_type === 3
								? item.additional_info.manipulation_name ||
								  item.additional_info.description
								: '充值'}}
							</view>
						</view>
						<view class="orMoney">

							<view class="m1" v-if="item.action_type === 1">
								<view v-if="item.additional_info.task_number">
									+￥{{item.amount_in_cents / 100}}
								</view>

								<view v-if="item.additional_info.task_number">
								  +{{item.redemption_point}}
								</view>
							</view>

							<view class="m2" :class="ntl==6?'z5':''" v-else>
								{{item.type === 1?'- ￥' + Math.abs(item.amount_in_cents / 100):'+ ￥' + item.amount_in_cents / 100}}
							</view>

						</view>
					</view>
					<view class="flexs fletimeScore">
						<view class="tdate">
							{{getCurrentTime(item.action_taken_at)}}
						</view>
						<view class="accMoney">
							账户余额:￥{{item.user_balance_in_cents / 100}}
						</view>
						<view class="fScoore">
							代金券:{{item.user_redemption_point}}
						</view>
					</view>

				</view>

			</view>
			<view class="xt-show" v-show="ntl==7">

				<view style="padding: 30upx;text-align: center;" v-if="actlist==[]">暂无数据</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar:'',
				tabs:1,
				ntl:4,
				sytl:1,
				page:1,
				page_size:10,
				actlist:[],
				ispage:true,
				isdff:999,
				pnum:0
			}
		},
		created() {

			this.userIncome_and_expenditure(1)
			this.storeSelf()
		},
		onLoad() {
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
		},
		onReachBottom() {
			this.page++
			if(this.pnum==0)
			{
				this.pnum=1
			}

			this.userIncome_and_expenditure(this.pnum)
		},
		methods: {
			//收入支出
			ioTabs(pamas)
			{
				this.page=1
				this.tabs=pamas;
				this.pnum=pamas
				this.ispage=true
				this.actlist=[]
				this.userIncome_and_expenditure(pamas)
			},
			neTabs(pams)
			{
				this.ispage=true
				this.page=1
				this.ntl=pams
				this.pnum=pams
				this.actlist=[]
				this.userIncome_and_expenditure(pams)
			},
			syneTabs(pams)
			{
				this.ispage=true
				console.log('pamsss',pams)
				this.page=1

				this.sytl=pams
				this.pnum=pams
				this.actlist=[]
				this.userIncome_and_expenditure(pams)
			},
			goBack()
			{
				//uni.navigateBack(1)
				const pages = getCurrentPages()//获取页面栈
				if (pages.length === 1) {//如果只有一个调用原生js
					history.back()
				} else {
					uni.navigateBack({
						delta: 1,
					})
				}
			},
			userIncome_and_expenditure(pams)
			{
				console.log('加载数据',pams)
				if(!this.ispage)
				{
					return false
				}
				uni.showToast({
					title:'加载中...',
					icon:'none'
				})

				if(pams==1)
				{
					var tob1={
						page:this.page,
						page_size:this.page_size,
						type:0
					}
				}
				if(pams==2)
				{
					var tob1={
						page:this.page,
						page_size:this.page_size,
						type:1
					}
				}
				if(pams==3)
				{
					var  tob1={
						page:this.page,
						page_size:this.page_size,
						type:0,
						action_type:1
					}
				}
				if(pams==4)
				{
					var  tob1={
						page:this.page,
						page_size:this.page_size,
						type:1,

					}
				}
				if(pams==5)
				{
					var  tob1={
						page:this.page,
						page_size:this.page_size,
						type:1,
						action_type:0
					}
				}
				if(pams==6)
				{
					var  tob1={
						page:this.page,
						page_size:this.page_size,
						type:1,
						action_type:2
					}
				}
				if(pams==7)
				{
					var  tob1={
						page:this.page,
						page_size:this.page_size,
						type:1,
						action_type:3
					}
				}

				this.api.interactive.userIncome_and_expenditure(tob1)
				.then(res=>{
					uni.hideLoading()
					if(res.code===200 && res.data.data.length >0)
					{

						uni.hideLoading()

						if (this.page>1)
						{
							res.data.data=this.actlist.concat(res.data.data)
						}

						this.actlist=res.data.data
					}else{

						if (res.data.data.length==0)
						{
							this.ispage=false
							uni.showToast({
								title:'没有更多数据!',
								icon:'none',
								duration:3000
							})
							return;
						}
					}
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			storeSelf()
			{
				this.api.interactive.storeSelf({}).then(res=>{
					console.log('erssss',res)
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
	.incomMess{
		background: #fff;
	}
	.m1,.m2{
		display: flex;
		color: #d02b14;
		font-size: 28upx;
		font-weight: 600;
	}
	.m1{
		grid-gap: 30upx;
	}
	.iotops{
		display: flex;
		align-items: center;
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 16upx;
		border-bottom: 1upx solid #ccc;
	}
	.sy-list{
		padding-bottom: 20upx;
	}
	.sy-follow{
		margin: auto;
	}
	.sl{
		padding-right: 30upx;
	}
	.sr{
		padding-left: 30rpx;
	}
	.active{
		color: #333;
	}
	.noict{
		color: gray;
	}
	.nextTabs{
		display: flex;
		padding:30upx 30upx 15upx 30upx;
		/* grid-gap: 50upx; */
		font-size: 28upx;
		font-weight: 600;
		border-bottom: 1upx solid #ccc;
	}
	.nextTabs view{
		margin-right: 80rpx;

	}
	.satc{
		color: #ef8200;
		padding-bottom: 15upx;
		border-bottom: 1upx solid #ef8200;
	}
	.OrNme{
		width: 70%;
	}
	.orderMss{
		padding: 0 30upx;
		margin-top: 30upx;
		font-size: 0.5rem;
		color: gray;
	}
	.orNameMess{
		padding: 30upx;
	}
	.orMoney{
		color: #14d014;
		font-weight: 600;
	}
	.fletimeScore{
		font-size: 0.8rem;
		color: gray;
		padding: 0 30upx;
	}
	.pckJsaR3Yo3XKwkcQ8rr{
			padding: 1rem 1rem 0rem 1rem;
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
	}
	.withMon{
		padding-top: 10upx;
	}
	.QNNBWokEiyoRM9KDjBje {
	    color: #d02b14;
		font-weight: 600;
	}
	.dFPyEKo4mwooOzy87WQ6{
		display: flex;
		justify-content: space-between;
		padding: 30upx;
		font-size: 0.8rem;
		color: gray;

	}
	.allList{
		border-bottom: 1upx solid #efefef;
	}
	.z5{
		color: #14d014;
	}
</style>
