<template>
	<view class="market">
		<view class="top-tabs"   :style="[{'paddingTop':statusBar+'px'}]">
			<view class="ma-scrrs" @click="settabs(1)" :class="mcurr==1?'act':'noact'">
				抽奖区
				<view class="team-deats"  @click="settabs(2)" :class="mcurr==2?'act':'noact'">组团明细</view>
			</view>
		</view>
		<view class="markbanner">
			<image :src=url></image>
		</view>
		<view class="actr-list">
			<view class="flexs goMore">
				<view class="fs1">组团抽奖</view>
				<view class="fs2">更多</view>
			</view>
			<!-- <view class="temp-mg">活动暂未开启，敬请期待</view> -->
		</view>
		<view class="active-times bongd" v-if="actlist.length >0">
			<view class="active-times"  v-for="(item,index) in actlist" :key="item.id">
				 <view class="istimes">
					 距离活动结束：
					 <text class="t1">{{item.d}}</text><text class="t2">天</text>
					 <text class="t1">{{item.h}}</text><text class="t2">小时</text>
					 <text class="t1">{{item.m}}</text><text class="t2">分</text>
					 <text class="t1">{{item.s}}</text><text class="t2">秒</text>
				 </view>
				 <view class="addTeams">
				 		 <view class="tlogo">
				 			 <image mode="aspectFill" :src=item.file_record.file_url></image>
				 		 </view>
				 		 
				 		 <view class="flexs te-deit">
				 			 <view class="team-l">
				 				 <view class="te-names">
				 					 {{item.name}}
				 				 </view>
				 				 <view class="t2">报名消耗抽奖券：{{item.tickets}}/张</view>
				 				 <view class="t2">报名消耗代金券：{{item.cost_integral_points}}元代金券</view>
				 			 </view>
				 			 <view class="te-sub" @click="nowAddgroup(item)">
				 				 立即组团
				 			 </view>
				 		 </view>
				 		 
				 </view>
			</view>
			
		</view>
		<view class="active-times bongd" v-if="actlist.length==0 && issh">
			<view class="temp-mg">
				<uni-icons type="info-filled" size="30"></uni-icons>
					<view>活动暂未开启，敬请期待</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default{
		data()
		{
			return {
				mcurr:1,
				url:'',
				count: '', //倒计时
				d:'',
				h:'',
				m:'',
				s:'',
				setTime:'',
				//seconds: new Date('2022-10-14').getTime(),
				seconds: 0,
				statusBar:'',
				page:1,
				page_size:10,
				actlist:[],
				actlists:[],
				ispage:true,
				issh:true
				
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
					that.statusBar=e.statusBarHeight+20;
					  
				}
			})
			if(!uni.getStorageSync('token'))
			{
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return
			}
			that.configurationMess();
		},
		created() {
			
			this.userTeam()
			
			
		},
		onReachBottom() {
			this.page++
			this.userTeam();
			
		},
		onShow() {
			this.mcurr=1
		},
		
		methods:{
			
			configurationMess()
			{
				
				this.api.interactive.configurationMess().then(res=>{
					console.log('res',res)
					this.url=res.data['raffleImg'][0].url
				})
				
			},
			userTeam()
			{
				if(!this.ispage)
				{
					return false
				}
				uni.showLoading({
					title:'加载中...',
					icon:'loading',
					mask:true
				})
				this.api.interactive.userActivity({
					page:this.page,
					page_size:this.page_size
				}).then(res=>
				{
					if(res.code===200 && res.data.data.length>0)
					{
						uni.hideLoading()
						this.issh=false
						if (this.page>1)
						{
							res.data.data=this.actlist.concat(res.data.data);
						}
						
						this.setTime =setInterval(() => {
						    
							for(let i=0;i<res.data.data.length;i++)
							{
								 let item=new Date(res.data.data[i].activity_end_time).getTime()
								 item -= 1
								 res.data.data[i].d -= 1
								 res.data.data[i].h -= 1
								 res.data.data[i].m -= 1
								 res.data.data[i].s -= 1
							
							
								var date = new Date();
								var time = date.getTime();
								var lag =  (item- time);
								var d = Math.floor(lag / (1000 * 60 * 60 * 24));
								var h = Math.floor((lag % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
								var m = Math.floor((lag % (1000 * 60 * 60)) / (1000 * 60));
								var s = Math.floor((lag % (1000 * 60)) / 1000);
								
								
								if(item - time > 0)
								 {
										res.data.data[i].d=d
										res.data.data[i].h =h
										res.data.data[i].m = m 
										res.data.data[i].s = s 
									
								 }else{
									 
									  res.data.data[i].d = 0
									  res.data.data[i].h =0
									  res.data.data[i].m = 0 
									  res.data.data[i].s = 0 
									 //clearInterval(this.setTime);
								 }
							}
							this.actlist=res.data.data
						}, 1000)
						
					
					}else{
						if (res.data.data.length==0)
						{
							
							console.log('搜索',this.actlist)
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
			
			settabs(pam)
			{
				this.mcurr=pam;
				if(pam==2)
				{
					uni.navigateTo({
						url:'/pages/teamDeitals/teamDeitals'
					})
				}
			},
			
			
			nowAddgroup(item)
			{
				uni.navigateTo({
					url:'/pages/Addgroup/Addgroup?id='+item.id
				})
			}
		}
	}
</script>

<style>
	.bongd{
		padding-bottom: 40upx;
	}
	
	.top-tabs{
		background: #fff;
		padding: 30upx;
		
	}
	.team-deat,.ma-scrr{
		margin-left:auto;
	}
	.ma-scrrs{
		text-align: center;
		position: relative
	}
	.team-deats{
		position: absolute;
		right: 0;
		top: 0;
		padding-top: 10upx;
	}
	.act{
		color: #333;
		font-size: 36upx;
	}
	.noact{
		font-size: 28upx;
		color: #666666;
	}
	.markbanner image{
		height: 320upx;
		width: 100%;
	}
	.actr-list{
		background-color: #fff;
	}
	.goMore{
		padding: 20upx 30upx;
		border-bottom: 1upx solid #F4F4F4;
	}
	.fs1{
		font-size: 30upx
	}
	.fs2{
		
		font-size: 28upx;
		color: #666666;
	}
	.temp-mg{
		padding: 40upx;
		text-align: center;
	}
</style>

<style>
	.active-times{
		background: #fff;
		margin-bottom: 30upx;
	}
	.istimes{
		padding: 20upx 30upx;
		border-bottom: 1upx solid #F4F4F4;
		font-size: 24upx;
	}
	.t1{
		width: 42upx;
		height: 42upx;
		background: #2F5597;
		display: inline-block;
		font-size: 24upx;
		color: #fff;
		margin: 0 20upx;
		text-align: center;
		line-height: 42upx;
		border-radius: 4upx;
	}
	.addTeams{
		display: flex;
		padding:  20upx 30upx;
		align-items: center;
		border-bottom: 1upx solid #ccc;
	}
	.tlogo image{
		width: 172upx;
		height: 172upx;
	}
	.team-l{
		margin-left: 20upx;
		flex: 1;
		line-height: 60upx;
	}
	.te-deit{
		flex: 1;
		align-items: center;
	}
	.te-names{
		font-size: 28upx
	}
	.t2{
		font-size: 26upx;
		color: #999999;
	}
	.te-sub{
		background-color: #2F5597;
		width: 120upx;
		height: 48upx;
		color: #fff;
		font-size: 22upx;
		text-align: center;
		line-height: 48upx;
		border-radius: 4upx;
		border-radius: 10upx;
	}
</style>
