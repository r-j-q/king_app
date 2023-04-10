<template>
	<view class="teamdeitals">
		<view class="active-times" v-for="(item,index) in actlist" :key="item.id">
			 <view class="istimes" v-if="item.d>0">
				 距离活动结束：
				 <text class="t1">{{item.d}}</text><text class="t2">天</text>
				 <text class="t1">{{item.h}}</text><text class="t2">小时</text>
				 <text class="t1">{{item.m}}</text><text class="t2">分</text>
				 <text class="t1">{{item.s}}</text><text class="t2">秒</text>
			 </view>
			 <view class="istimes" v-else>
			 				 活动已结束
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
			 			 
			 		 </view>
			 		 
			 </view>
			 <view class="groupdeitals" v-if="item.detail.length >0">
				 <view class="S1Ie6YJhr2RGF0Ma8mh4" v-for="(sitem,sindex) in item.detail" :key="sindex.id">
					 <view class="tzCLme1Wpz3K5QtgsJAj">
						 <view class="gradtime">组团时间:</view>
						 <view class="pls" style="padding-left: 6upx;">{{getCurrentTime(sitem.updated_at)}}</view>
						 
						 <view class="pls"> 
						 {{sitem.status ? '奖励一次两倍积分' :
						                                     isres(
						                                         item.team_records,
						                                         sitem.record_id) === 1
						                                     ? `${item.no_win_lottery_points}积分+1张抽奖券 `
						                                     : isres(
						                                         item.team_records,
						                                         sitem.record_id
						                                       ) === 2
						                                     ? '组团人数不足'
						                                     : '等待开奖结果'}}
						 </view>
					 </view>
					 <view class="gonone" v-if="item.status==1" @click="congroup(item)">
						 <button  :class="sitem.status?'succ': isres(
                                        item.team_records,
                                        sitem.record_id
                                      )? 'fail': 'wait'">
								{{sitem.status ? '成功' : isres(
					 	                                      item.team_records,
					 	                                      sitem.record_id
					 	                                    ) === 1
					 	                                  ? '再来一次'
					 	                                  : isres(
					 	                                      item.team_records,
					 	                                      sitem.record_id
					 	                                    ) === 2
					 	                                  ? '组团超时'
					 	                                  : '等待'}}</button>
														
					 </view>
					 
				 </view>
			 </view>
		</view>
		
	</view>
 
</template>
<script>
export default {
    data() {
        return {
            count: '', //倒计时
			d:'',
			h:'',
			m:'',
			s:'',
			setTime:'',
			actlist:[],
            seconds: new Date('2022-09-14').getTime()
        }
    },
    mounted() {
        // this.Time() //调用定时器
		
    },
	created() {
		this.userRaffledetail();
	},
    methods: {
		congroup(item)
		{
			console.log('item',item)
			uni.navigateTo({
				url:'/pages/Addgroup/Addgroup?id='+item.id
			})
		},
		isres(teamRecords,id)
		{
			
			let result = 0;
			teamRecords.map(item => {
			  if (item.id == id) {
				result = item.status;
			  }
			});
			return result;
			  
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
		userRaffledetail()
		{
			uni.showLoading({
				title:'加载中...',
				icon:'loading',
				mask:true
			})
			this.api.interactive.userRaffledetail().then(res=>
			{
				console.log('抽奖记录',res)
				
				if(res.code===200 && res.data.data.length>0)
				{
					uni.hideLoading()
					
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
								   // console.log('倒计时结束！')
								  res.data.data[i].d = 0
								  res.data.data[i].h =0
								  res.data.data[i].m = 0 
								  res.data.data[i].s = 0 
								 // clearInterval(this.setTime);
							 }
						}
						this.actlist=res.data.data
						
						// console.log('this.actlist',this.actlist)
					}, 1000)
					
				}else{
					if (res.data.data.length==0)
					{
						
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
		
        // 天 时 分 秒 格式化函数
        countDown() {
			
			var date = new Date();
			var time = date.getTime();//当前时间
			var lag =  (this.seconds- time);
			var d = Math.floor(lag / (1000 * 60 * 60 * 24));
			var h = Math.floor((lag % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var m = Math.floor((lag % (1000 * 60 * 60)) / (1000 * 60));
			var s = Math.floor((lag % (1000 * 60)) / 1000);
			
			
		   if(this.seconds - time > 0)
			 {
				 this.d = d
				 this.h =h
				 this.m = m 
				 this.s = s 
			 }else{
				  console.log('倒计时结束！')
				  this.d = 0
				  this.h =0
				  this.m = 0 
				  this.s = 0 
				 clearInterval(this.setTime);
			 }
        },
        //定时器没过1秒参数减1
        Time() {
             this.setTime =setInterval(() => {
                this.seconds -= 1
                this.d -= 1
                this.h -= 1
                this.m -= 1
                this.s -= 1
                this.countDown()
            }, 1000)
        },
    }
}
</script>
<style>
	.pls{
		padding-right: 6upx;
	}
	.tzCLme1Wpz3K5QtgsJAj,.tzCLme1Wpz3K5QtgsJAj{
		display: flex;
		align-items: center;
		font-size: 20upx;
		color: gray;
	}
	.gradtime{
		color: #000;
		
	}
	
	.groupdeitals{
		padding: 10upx 30upx;
	}
	.S1Ie6YJhr2RGF0Ma8mh4{
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1upx solid #ccc;
		padding: 20upx 0;
	}
	.gonone button{
		font-size: 20upx;
		background-color: gray;
		padding: 5upx 10upx;
		color: #fff;
	}
	.active-times{
		background: #fff;
		margin-top: 20upx;
		padding-bottom: 30upx;
	}
	.istimes{
		padding: 20upx 30upx;
		border-top: 1upx solid #ccc;
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
		font-size: 24upx;
		text-align: center;
		line-height: 48upx;
		border-radius: 4upx;
	}
	.succ{
		background-color: #ef8200!important;
	}
	.wait{
		background-color:#b0e0e6!important ;
	}
</style>
