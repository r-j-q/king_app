<template>
	<view class="serviceMess">

		<view class="flexs iotops search-with" :style="[{'paddingTop':statusBar+'px'}]">
			<view @click="goBack"><uni-icons type="left" color="#666" size="27"></uni-icons></view>

			<view class="sl" :class="tabs==1?'active':'noict'" @click="ioTabs(1)">我的经营</view>
			<view class="sr" :class="tabs==2?'active':'noict'" @click="ioTabs(2)">收支明细</view>

		</view>
		<view class="cUYrXu2wXJqzXxez_CeB">
			<view class="y4f03w8dhr39OnYPUnWJ">
				<view class="">
					<image v-if="userMess.avatar" :src=userMess.avatar></image>
					<image v-else src="../../static/img/sm.jpg" mode=""></image>
				</view>
				<view class="C6F7ETYvP5qRJlxTc9z6">
					<view class="TErRofTiHUogH_qhAhiw">{{userMess.name}}</view>
					<view class="wOI5OLOuazcGL2xKawgE" @click="goPay">
						<view>余额:￥{{blance}}</view>
						<button class="Ba8g5C1rjxc9RkK9l6xM">提现</button>
					</view>
					<view class="wOI5OLOuazcGL2xKawgE">代金券:{{userpoint.remain_points}}</view>
				</view>
			</view>
			<view class="prall">
				<view class="flexs perDeit">
					<view class="">
						个人消费：￥ {{personal_order_amount_in_cents}}
					</view>
					<view class="">
						市场任务积分：{{team_income_in_cents}}
					</view>
				</view>
				<view class="flexs perDeit">
					<view class="">
						平价商城积分：{{userpoint.normal_product_pool_points}}
					</view>
					<view class="">
						抽奖奖励积分：{{userpoint.activity_product_pool_points}}
					</view>
				</view>
				<view class="flexs perDeit">
					<view class="">
						总积分：{{userpoint.total_pool_points}}
					</view>
					<view class="">
						已赠送积分：{{userpoint.total_delivered_pool_points}}
					</view>
				</view>
				<view class="flexs perDeit">
					<view class="">
						待赠送积分：{{userpoint.total_pool_points-userpoint.total_delivered_pool_points}}
					</view>

				</view>

			</view>
			<view class="tju7_Tr4rFspHimOu3uP">
						<view class="lw4FGjnNSZ3wokVKoXgq">
							<view class="Z6IWiwt5_YDBxn_nb9TC">本月新增市场任务积分：￥{{this_month_team_expense_in_cents}}</view>
							<view class="Z6IWiwt5_YDBxn_nb9TC">今日新增任务积分：￥{{today_increased_team_expense_in_cents}}</view>
						</view>
						<view class="lw4FGjnNSZ3wokVKoXgq newdata">
							<view class="Z6IWiwt5_YDBxn_nb9TC">本周期新增任务积分：￥{{this_cycle_team_expense_in_cents}}</view>
						</view>
						<view v-if="next_star_dispatch_reward_datetime" class="lw4FGjnNSZ3wokVKoXgq newdata">
							<view class="Z6IWiwt5_YDBxn_nb9TC">星级管家发放剩余：
							<text>{{d}}天</text>
							<text>{{h}}小时</text>
							<text>{{m}}分</text>
							<text>{{s}}秒</text>
							</view>
						</view>
						<view class="zyzNHvUE1RsT9O56jby8"></view>
					<view class="EZ9lIFrn_A_OZ7k2sdjks">
						<view class="I1CDs879Exbd5C6HwmoR">
							<view>￥{{today_profit_in_cents}}</view>
							<view>今日收益</view>
						</view>
						<view class="gEULnuryd7PUHLF5ervV"><view>￥{{yesterday_profit_in_cents}}</view>
							<view>昨日收益</view>
						</view>
						<view class="aqXlAyIMWhkzrycJIphe">
							<view>￥{{this_month_profit_in_cents}}</view>
							<view>本月收益</view>
						</view>
						<view class="C4gYq9G6bKNEU6zSK5Ed">
							<view>￥{{total_profit_in_cents}}</view>
							<view>总收益</view>
						</view>
					</view>
			</view>


			<view class="everData">
				<view class="everinner">
					<view class="evName">每日任务已赠送</view>
					<view class="flexs inbm">
						<view>任务佣金</view>
						<view>￥{{oddata.balance}}</view>
					</view>
					<view class="flexs inbm">
						<view>代金券</view>
						<view>{{oddata.redemption_point}}</view>
					</view>
					<view class="flexs inbm">
						<view class="flexs" style="align-items: center;">
							<view>
								绿色积分营销点
							</view>

								<image @click="tappop" style="width: 32upx;height: 32upx;padding-left: 6upx;" src="../../static/img/wh.png"></image>

						</view>
						<view>{{oddata.coefficient}}</view>
					</view>
				</view>
			</view>
			<view class="charts-box">

				<view class="flexs allfeg">
					<view class="flexs scoflex">
						<view class="scoreMess"></view>
						<view class="jif">我的积分变动</view>
					</view>
					<view class="zgdun">
						<text style="font-weight: 600;padding-right: 10upx;">增长率</text>
						<uni-icons v-if="isxsecore >0" color="#FA4F1A" type="arrow-up" size="18"></uni-icons>
						<uni-icons v-else color="#64EF3A" type="arrow-down" size="18"></uni-icons>
						<text v-if="isxsecore >0" style="color: #FA4F1A;">{{nowdata}}</text>
						<text v-else style="color: #64EF3A;">{{nowdata}}</text>

					</view>
				</view>
			    <qiun-data-charts
			      type="line"
			      :opts="opts"
			      :chartData="chartData"
			    />
			  </view>

			  <view class="charts-box">

				<view class="flexs allfeg">
					<view class="flexs scoflex">
						<view class="scoreMess tesc"></view>
						<view class="jif">绿色积分营销点</view>
					</view>
					<view class="zgdun">
						<text style="font-weight: 600;padding-right: 10upx;">增长率</text>
						<uni-icons v-if="isxsecore2 >0" color="#FA4F1A" type="arrow-up" size="18"></uni-icons>
						<uni-icons v-else color="#64EF3A" type="arrow-down" size="18"></uni-icons>
						<text style="color:#FA4F1A ;" v-if="isxsecore2 >0">
						{{nowdata2}}
						</text>
						<text v-else style="color: #64EF3A;">
						{{nowdata2}}
						</text>

					</view>
				</view>

			      <qiun-data-charts
			        type="line"
			        :opts="opts2"
			        :chartData="chartData2"
			      />
			    </view>
			<!-- <view class="start-list">
				<view class="flexs ot-order">
					<view @click="orderTabs(1)" :class="ictic==1?'ictic':''">综合</view>
					<view @click="orderTabs(2)" :class="ictic==2?'ictic':''">管家等级</view>
					<view @click="orderTabs(3)" :class="ictic==3?'ictic':''">消费金额</view>
					<view @click="orderTabs(4)" :class="ictic==4?'ictic':''">时间范围</view>
				</view>

			</view>
			<view class="sHD1tumh7ghJE7dvjUCY" v-for="(item,index) in actlist" :key="item.id">
				<view class="flexs jjkuEnv_FwA8IVx00xD1 ">
					<image v-if="item.avatar" :src=item.avatar mode=""></image>
					<image v-else src="../../static/img/sm.jpg" mode=""></image>
					<view class="LrciZkKFq8DSIQk4ET9a">
						<view class="flexs kFQqJfgwoI8mXhF8Irz0">
							<view>{{item.name}}</view>
							<view>{{item.mobile}}</view>
							<view class="sy-tp">{{item.is_direct_invitation ? '售后' : '营销'}}</view>
						</view>
						<view>
						  <view class="tf">
							<view class="p3" v-if="item.business_level_name">
							  {{item.business_level_name}}
							</view>

							 <view class="p1" v-if="item.is_marketing_center &&!item.is_super_member">
								运营中心
							   </view>

							 <view class="p2" v-if="item.is_super_member">
							   超级管家
							 </view>
						  </view>
						</view>
						<view class="nGyxXOiFheSxeopNIhzh"></view>
						<view class="jPfS2b2T16m7pDke5PAL tgf">
						最后登录时间:  {{getCurrentTime(item.last_signed_in_at)}}
						</view>
						<view class="SuQpSDNvoJbxare0AW_7 tgf">个人消费:￥ {{item.personal_order_amount_in_cents / 100}}</view>
					</view>
				</view>
				<view class="zyzNHvUE1RsT9O56jby8s"></view>

			</view>
			 -->
		</view>
		<view class="op-height">
			<uni-popup ref="popup">
				<view class="popup-content">
					<view class="potb" @click="clpope"><uni-icons type="closeempty" size="26"></uni-icons></view>
					【绿色积分营销点】指的是纳零王者系统联合S平台在营销推广过程当中每一个绿色积分的价值，这是由纳零王者系统结合商业大数据进行智能测算得出来的综合性结果

					【绿色积分营销点】每天都在波动，说明每天的广告/营销价值是在变化的


				</view>

			</uni-popup>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar:"",
				tabs:1,
				ictic:1,
				blance:0,
				userpoint:0,
				isdata:false,
				userMess:'',
				team_income_in_cents:'',
				personal_order_amount_in_cents:'',
				increased_team_expense_in_cents:'',
				today_increased_team_expense_in_cents:'',
				this_cycle_team_expense_in_cents:'',
				next_star_dispatch_reward_datetime:'',
				this_month_team_expense_in_cents:'',
				userbance:'',
				oddata:{},
				page:1,
				ispage:true,
				page_size:15,
				actlist:[],
				personalSum:'',
				today_profit_in_cents:'',
				yesterday_profit_in_cents:'',
				this_month_profit_in_cents:'',
				total_profit_in_cents:'',
				setTime:'',
				d:0,
				h:0,
				m:0,
				s:0,
				nowdata:0,
				nowdata2:0,
				 chartData: {},
				 chartData2: {},
				 isxsecore2:0,
				 isxsecore:0,
				  opts: {
						background:'rgba(1, 128, 128, 0.1)', //rgba设置透明度0.1
				         color: ["#FDA827"],
				         padding: [15,10,6,20],
				         legend:{show:false},
						 dataLabel:false,
				         xAxis: {
				           disableGrid: true
				         },
				         yAxis: {
				           gridType: "dash",
				           dashLength: 2,

						   disabled:true,
						   },

				         extra: {
				           line: {
				             type: "straight",
				             width: 2,
				             activeType: "hollow"
				           }
				         }


			},
			
			
			opts2: {
				         color: ["#6358C5"],
				         padding: [15,18,6,20],
				         legend:{show:false},
						 dataLabel:false,
				         xAxis: {
				           disableGrid: true
				         },
				         yAxis: {
				           gridType: "dash",
				           dashLength: 2,
						   disabled:true,
				         },

				         extra: {
				           line: {
				             type: "straight",
				             width: 2,
				             activeType: "hollow"
				           }
				         }
				       }

			}


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
		created() {
			this.userBalance();
			this.userPoint();
			this.userAuthed();
			this.userProfit();
			// this.teamUser();
			this.getServerData();
			this.getServerData2();

		},
		methods: {
			tappop()
			{
				this.$refs.popup.open('center')
			},
			clpope()
			{
				this.$refs.popup.close()
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

			 getServerData() {
				 var arr=[]
				 var data=[]
				 this.api.user.coefficientline().then(res=>{
					 // arr.push(res.data)
					 if(res.code==200 && res.data.length >0)
					 {
						 res.data.map((item,index)=>{
							 if(index==res.data.length-1)
							 {
								 this.nowdata2=item.coefficient

							 }

							 arr.push(item.date.substr(-2)+'号')
							 data.push(item.point)
						 })
						 this.isxsecore2=this.nowdata2.split('%')[0]

							//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
							let resff = {
						     categories: arr,
						     series: [
						       {
						         name: "绿色积分营销点",
						         data: data
						       }
						     ]
						   };
						   this.chartData2 = JSON.parse(JSON.stringify(resff));

					 }

				 })


			},
			getServerData2() {
			  	 var arr=[]
			  	 var data=[]
			  	 this.api.user.statisticsline().then(res=>{
			  		 // arr.push(res.data)
			  		 if(res.code==200 && res.data.length >0)
			  		 {
			  			 res.data.map((item,index)=>{
							 if(index==res.data.length-1)
							 {
								 this.nowdata=item.coefficient

							 }
			  				 arr.push(item.date.substr(-2)+'号')
			  				 data.push(item.point)
			  			 })
						 
						 console.log('谁说的',this.nowdata2)
						 if(this.nowdata2 !=0)
						 {
							 this.isxsecore=this.nowdata.split('%')[0]
						 }
						 
						 console.log('isxsecore2',this.isxsecore2)
			  			 //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
			  			 let resff = {
			  			     categories: arr,
			  			     series: [
			  			       {
			  			         name: "我的积分变动",
			  			         data: data
			  			       }
			  			     ]
			  			   };
			  			   this.chartData = JSON.parse(JSON.stringify(resff));

			  		 }

			  	 })


			  },


			// teamUser()
			// {
			// 	if(!this.ispage)
			// 	{
			// 		return false
			// 	}
			// 	uni.showToast({
			// 		title:'加载中...',
			// 		icon:'none',
			// 		mask:true
			// 	})
			// 	this.api.interactive.teamUser({
			// 		page:this.page,
			// 		page_size:this.page_size
			// 	}).then(res=>{
			// 		console.log('ressss',res)
			// 		if(res.code===200 && res.data.data.length >0)
			// 		{
			// 			// this.actlist=res.data.data
			// 			uni.hideLoading()
			// 			// this.actlist=res.data.data
			// 			if (this.page>1)
			// 			{
			// 				res.data.data=this.actlist.concat(res.data.data)
			// 			}

			// 			this.actlist=res.data.data
			// 		}else{
			// 			if (res.data.data.length==0)
			// 			{
			// 				this.ispage=false
			// 				uni.showToast({
			// 					title:'没有更多数据!',
			// 					icon:'none',
			// 					duration:3000
			// 				})
			// 				return;
			// 			}
			// 		}
			// 	})
			// },


			userProfit()
			{
				this.api.interactive.userProfit().then(res=>{
					if(res.code===200)
					{

						this.userbance=res.data
						this.oddata=res.data.everyday_point_reward
						this.today_profit_in_cents=res.data.today_profit_in_cents/100
						this.yesterday_profit_in_cents=res.data.yesterday_profit_in_cents/100
						this.this_month_profit_in_cents=res.data.this_month_profit_in_cents/100
						this.total_profit_in_cents=res.data.total_profit_in_cents/100


						this.this_cycle_team_expense_in_cents=res.data.this_cycle_team_expense_in_cents/100

						this.next_star_dispatch_reward_datetime=res.data.next_star_dispatch_reward_datetime

						//本月新增
						this.this_month_team_expense_in_cents=res.data.this_month_team_expense_in_cents/100



						this.stertTime()
						this.isdata=true

					}
				})
			},
			userAuthed(){
				this.api.interactive.userAuthed().then(res=>{
					if(res.code===200)
					{
						this.userMess=res.data
						this.team_income_in_cents=res.data.team_income_in_cents/100
						this.personal_order_amount_in_cents=res.data.personal_order_amount_in_cents/100

						this.increased_team_expense_in_cents=res.data.increased_team_expense_in_cents/100
						this.today_increased_team_expense_in_cents=res.data.today_increased_team_expense_in_cents/100


					}
				})
			},
			userPoint()
			{
				this.api.interactive.userPoint().then(res=>{

					if(res.code===200)
					{
						this.userpoint=res.data
						this.isdata=true
					}
				})
			},
			userBalance()
			{
				this.api.interactive.userBalance().then(res=>{
					if(res.code===200)
					{
						let personalSum=res.data
						let tpm= (personalSum.balance.remaining_balance_in_cents ||0 +personalSum.account_balance.remaining_balance_in_cents ||0) / 100
						this.blance=tpm
					}
				})
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
			ioTabs()
			{
				uni.navigateTo({
					url:'/pages/incomEexpend/incomEexpend'
				})
			},
			goPay()
			{
				uni.navigateTo({
					url:'/pages/withdrawal/navwithd'
				})
			},
			stertTime()
			{
				this.setTime =setInterval(() => {


						 let item=new Date(this.next_star_dispatch_reward_datetime).getTime()
						 item -= 1
						 this.d -= 1
						 this.h -= 1
						 this.m -= 1
						 this.s -= 1


						var date = new Date();
						var time = date.getTime();
						var lag =  (item- time);
						var d = Math.floor(lag / (1000 * 60 * 60 * 24));
						var h = Math.floor((lag % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
						var m = Math.floor((lag % (1000 * 60 * 60)) / (1000 * 60));
						var s = Math.floor((lag % (1000 * 60)) / 1000);


						if(item - time > 0)
						 {
								this.d=d
								this.h =h
								this.m = m
								this.s = s

						 }else{

							  this.d = 0
							  this.h =0
							  this.m = 0
							  this.s = 0
							 clearInterval(this.setTime);
						 }

						 // console.log('this.d',this.d)

					// this.actlist=res.data.data
				}, 1000)


			}


		},
		// onReachBottom() {
		// 	console.log('dfffffkk')
		// 	this.page++
		// 	this.teamUser()

		// },
	}
</script>

<style>
	page{
		background: #FAFAFA;
	}
	.popup-content{
		border-radius: 20upx;
		width: 70%;
		text-align: left;
		margin: auto;
		font-size: 28upx;
		padding:60upx;
		position: relative;
	}
	.potb{
		position: absolute;
		right: 0;
		top: 0;
	}
	.tf{
		display: flex;
		grid-gap: 20upx;
	}
	.p3,.p2,.p1{
		font-size: 20upx;
		background: #ef8200;
		padding: 5upx 10upx;
		color: #fff;
		border-radius: 6upx;
	}
	.p2,.p1{
		background-color: #0cc;
	}
	.iotops{

		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 16upx;
		border-bottom: 1upx solid #ccc;
		background-color: #fff;
		align-items: center;
	}
	.sr{
		font-size: 24upx;
	}
	.cUYrXu2wXJqzXxez_CeB{
		background-color: #fff;
		padding: 30upx;
	}
	.y4f03w8dhr39OnYPUnWJ,.wOI5OLOuazcGL2xKawgE {
	    /* padding: 20upx 30upx; */
	    display: flex;
	    justify-content: flex-start;
		align-items: center;
	}
	.y4f03w8dhr39OnYPUnWJ image,.jjkuEnv_FwA8IVx00xD1 image{
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
	}
	.TErRofTiHUogH_qhAhiw {
	    font-size: 1rem;
	    font-weight: bold;
	}
	.wOI5OLOuazcGL2xKawgE{
		font-size: 0.9rem;
		color: gray;
	}
	.C6F7ETYvP5qRJlxTc9z6{
		margin-left: 30upx;
	}
	.Ba8g5C1rjxc9RkK9l6xM{
			margin-left: 80upx;
		    padding:8upx 16upx;
		    margin-bottom: 20upx;
		    color: #fff;
		    align-self: flex-end;
		    border-radius: 8upx;
		    background-color: #ef8200;
			font-size: 24upx;
	}
	.prall{
		font-size: 0.9rem;
		color: gray;
		padding-top: 30upx;
	}
	.perDeit{
		padding-bottom: 20upx;
	}
	.tju7_Tr4rFspHimOu3uP {
	    border-radius: 8upx;
	    background-color: #f2f2f2;
	    /* margin: 20upx; */
	}
	.lw4FGjnNSZ3wokVKoXgq
	{

	    display: flex;
	    padding: 10upx;
	    justify-content: space-between;
		font-size: 0.8rem;
		color: gray;
		margin-top: 20upx;
	}
	.EZ9lIFrn_A_OZ7k2sdjks{
		display: flex;

		justify-content: space-between;
		font-size: 0.8rem;
		color: gray;
		text-align: center;
	}
	.lw4FGjnNSZ3wokVKoXgq{
		padding: 16upx 30upx;

	}
	.EZ9lIFrn_A_OZ7k2sdjks{
		padding: 20upx;
	}
	.newdata{
		margin-top: unset;
	}
	.EZ9lIFrn_A_OZ7k2sdjk{
		text-align: center;

	}
	.zyzNHvUE1RsT9O56jby8{
		height: 4upx;
		background-color: #fff;
	}
	.start-list{
		border-top: 1px solid #e8e5e5;
		border-bottom: 1px solid #e8e5e5;
		padding: 30upx;
		margin-top: 60upx;
		font-size: 0.9rem
	}
	.everData{
		margin-top: 32upx;
		background-color: #fff;
		box-shadow: 0px 1px 3px rgba(128,128,128,0.2);

		border-radius: 20upx;
	}
	.everinner{
		padding: 34upx;
	}
	.evName{
		font-size: 30upx;
		font-weight: 600;
		margin-bottom: 28upx;
	}
	.inbm{
		padding-bottom: 28upx;
		font-size: 28upx;
	}
	.charts-box{
		background-color: #fff;
		margin: 32upx 0;
		padding-top: 34upx;
		padding-bottom: 64upx;
		box-shadow: 0px 1px 3px rgba(128,128,128,0.2);
		border-radius: 20upx;
		height: 274upx;
	}
	.allfeg{
		justify-content: flex-end;
		padding-bottom: 20upx;
		align-items: baseline;
	}
	.scoflex{
		justify-content: flex-end;
		align-items: center;
		font-size: 26upx;

	}
	.jif{
		padding-left: 8upx;
		margin-right: 32upx;
	}
	.zgdun{
		font-size: 28upx;
		padding-right: 20upx;
	}
	.scoreMess{
		width: 10px;
		height: 10px;
		background: #FFFFFF;
		border: 2px solid #FDA827;
		border-radius: 50%;
		opacity: 1;
	}
	.tesc{

		border: 2px solid #6358C5;
	}
	.jjkuEnv_FwA8IVx00xD1{
		justify-content: flex-start;
		padding: 40upx;
		font-size: 0.9rem;
		align-items: center;

	}
	.LrciZkKFq8DSIQk4ET9a{
		flex: 1 ;
		padding-left: 30upx;
	}

	.tgf{

		color: gray;
	}
	.jPfS2b2T16m7pDke5PAL,.SuQpSDNvoJbxare0AW_7{
		margin-top: 20upx;
	}
	.nGyxXOiFheSxeopNIhzh{
		margin-top: 10upx;
	}
	.sy-tp{
			padding: 6upx 10upx;
		    color: #fff;
		    font-size: .6rem;
		    background-color: #f76252;
		    border-radius: 6upx;
	}
	.zyzNHvUE1RsT9O56jby8s{
		height: 4upx;
		background-color: #f5f5f5;
	}
</style>
