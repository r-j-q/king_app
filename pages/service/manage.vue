<template>
	<view class="serviceMess">
		
		
			<view class="start-list">
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
						<view class="teamMess">
						  <view>
							团队人数:{{item.team_user_number}}
						  </view>
						  <view style="display: flex;">
							<view>团队业绩:￥{{item.team_income_in_cents / 100}}</view>
							<view style="padding-left: 40upx;">
							  个人消费:￥{{item.personal_order_amount_in_cents / 100}}
							</view>
						  </view>
						</view>
					</view>
				</view>
				<view class="zyzNHvUE1RsT9O56jby8s"></view>
				
			</view>
						
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
				s:0
				
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
			// this.userBalance();
			// this.userPoint();
			// this.userAuthed();
			// this.userProfit();
			this.teamUser();
		},
		methods: {
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
			 
			teamUser()
			{
				if(!this.ispage)
				{
					return false
				}
				uni.showToast({
					title:'加载中...',
					icon:'none',
					mask:true
				})
				this.api.interactive.teamUser({
					page:this.page,
					page_size:this.page_size
				}).then(res=>{
					console.log('ressss',res)
					if(res.code===200 && res.data.data.length >0)
					{
						// this.actlist=res.data.data
						uni.hideLoading()
						// this.actlist=res.data.data
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
				})
			},
			// userProfit()
			// {
			// 	this.api.interactive.userProfit().then(res=>{
			// 		if(res.code===200)
			// 		{
						
			// 			this.userbance=res.data
						
			// 			this.today_profit_in_cents=res.data.today_profit_in_cents/100
			// 			this.yesterday_profit_in_cents=res.data.yesterday_profit_in_cents/100
			// 			this.this_month_profit_in_cents=res.data.this_month_profit_in_cents/100
			// 			this.total_profit_in_cents=res.data.total_profit_in_cents/100
						
						
			// 			this.this_cycle_team_expense_in_cents=res.data.this_cycle_team_expense_in_cents/100
											
			// 			this.next_star_dispatch_reward_datetime=res.data.next_star_dispatch_reward_datetime
						
			// 			//本月新增
			// 			this.this_month_team_expense_in_cents=res.data.this_month_team_expense_in_cents/100
						
						
						
			// 			this.stertTime()
			// 			this.isdata=true
						
			// 		}
			// 	})	
			// },
			// userAuthed(){
			// 	this.api.interactive.userAuthed().then(res=>{
			// 		if(res.code===200)
			// 		{
			// 			console.log('耳热',res.data)
			// 			this.userMess=res.data
			// 			this.team_income_in_cents=res.data.team_income_in_cents/100
			// 			this.personal_order_amount_in_cents=res.data.personal_order_amount_in_cents/100
						
			// 			this.increased_team_expense_in_cents=res.data.increased_team_expense_in_cents/100
			// 			this.today_increased_team_expense_in_cents=res.data.today_increased_team_expense_in_cents/100
						
					
			// 		}
			// 	})	
			// },
			// userPoint()
			// {
			// 	this.api.interactive.userPoint().then(res=>{
					
			// 		if(res.code===200)
			// 		{
			// 			this.userpoint=res.data
			// 			this.isdata=true
			// 		}
			// 	})	
			// },
			// userBalance()
			// {
			// 	this.api.interactive.userBalance().then(res=>{
			// 		if(res.code===200)
			// 		{
			// 			let personalSum=res.data
			// 			let tpm= (personalSum.balance.remaining_balance_in_cents ||0 +personalSum.account_balance.remaining_balance_in_cents ||0) / 100
			// 			this.blance=tpm
			// 		}
			// 	})	
			// },
			// goBack()
			// {
			// 	//uni.navigateBack(1)
			// 	const pages = getCurrentPages()//获取页面栈
			// 	if (pages.length === 1) {//如果只有一个调用原生js
			// 		history.back()
			// 	} else {
			// 		uni.navigateBack({
			// 			delta: 1,
			// 		})
			// 	}
			// },
			// ioTabs()
			// {
			// 	uni.navigateTo({
			// 		url:'/pages/incomEexpend/incomEexpend'
			// 	})
			// },
			// goPay()
			// {
			// 	uni.navigateTo({
			// 		url:'/pages/withdrawal/withdrawal'
			// 	})
			// },
			// stertTime()
			// {
				// this.setTime =setInterval(() => {
				    
					
			// 			 let item=new Date(this.next_star_dispatch_reward_datetime).getTime()
			// 			 item -= 1
			// 			 this.d -= 1
			// 			 this.h -= 1
			// 			 this.m -= 1
			// 			 this.s -= 1
					
					
			// 			var date = new Date();
			// 			var time = date.getTime();
			// 			var lag =  (item- time);
			// 			var d = Math.floor(lag / (1000 * 60 * 60 * 24));
			// 			var h = Math.floor((lag % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			// 			var m = Math.floor((lag % (1000 * 60 * 60)) / (1000 * 60));
			// 			var s = Math.floor((lag % (1000 * 60)) / 1000);
						
						
			// 			if(item - time > 0)
			// 			 {
			// 					this.d=d
			// 					this.h =h
			// 					this.m = m 
			// 					this.s = s 
							
			// 			 }else{
							 
			// 				  this.d = 0
			// 				  this.h =0
			// 				  this.m = 0 
			// 				  this.s = 0 
			// 				 clearInterval(this.setTime);
			// 			 }
						 
			// 			 // console.log('this.d',this.d)
					
			// 		// this.actlist=res.data.data
			// 	}, 1000)
				
						
			// }
			
		},
		onReachBottom() {
			console.log('dfffffkk')
			this.page++
			this.teamUser()
			 
		},
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.teamMess{
		font-size: 24upx;
		color: gray;
		line-height: 40upx;
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
		margin-top: 20upx;
		font-size: 0.9rem
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
	.SuQpSDNvoJbxare0AW_7{
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
