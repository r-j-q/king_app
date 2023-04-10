<template>
	<view class="hideit">
		<view class="whoMeeting">
			<text>{{creaDe.name}}发起的会议</text>
			<text>已结束</text>
		</view>
		
		<view class="flexs dataht">
			<view class="">
				{{getCurrentTime(meettime.start_at).substring(11,16)}}
			</view>
			<view class="">
				{{(meettime.length_of_time/3600).toFixed(2)}} 小时
			</view>
			<view class="">
				{{getCurrentTime(meettime.end_at).substring(11,16)}}
			</view>
		</view>
		<view class="flexs hdyear">
			<view class="">
				{{getCurrentTime(meettime.start_at).substring(0,11)}}
			</view>
			<view class="">
				会议号 {{meettime.code}}
			</view>
			<view class="">
				{{getCurrentTime(meettime.end_at).substring(0,11)}}
			</view>
		</view>
		<view class="flexs creameet">
			<view>创建者</view>
			<image v-if="creaDe.avatar_file_url" :src=creaDe.avatar_file_url mode=""></image>
			<image v-else src="../../static/img/logo.png" mode=""></image>
			<view class="creaname">{{
				creaDe.name
			}}</view>
		</view>
		<view class="flexs creameet">
			<view>参会人</view>
			<view class="flexs meetimg">
				
					<view v-for="(item,index) in hilist.slice(0,6)" :key="item.id">
						<image v-if="item.avatar_file_url" style="{'z-index':item}" class="im1" :src=item.avatar_file_url mode=""></image>
						<image v-else class="im1" style="{'z-index':item}" src="../../static/img/logo.png" mode=""></image>
					</view>
				
				
				
					
			</view>
			<view class="creaname">{{hilist.length}}人参加</view>
		</view>
		
		<view class="creameetTime">
			<view class="flexs histImg hmg">
				<image src="../../static/img/nz.png"></image>
				<image src="../../static/img/ls.png"></image>
			</view>
			<view class="flexs histImg  histtimes">
				<view class="">
					{{getCurrentTime(meettime.start_at).substring(5,16)}}
				</view>
				<view class="">
					{{getCurrentTime(meettime.end_at).substring(5,16)}}
				</view>
			</view>
			<view class="flexs histImg histdeit">
				<view class="">
					最近参会
				</view>
				<view class="">
					参会时间
				</view>
			</view>
		</view>
		<view class="chamess-wu" @click="tellMess">
			<view class="flexs chatdeit chline">
				<view class="chatmess">
					聊天记录
				</view>
				<view class="flexs chatflex" @click="chatDeit">
					<view class="">
						聊天详情
					</view>
					<view class="rticon">
						<uni-icons type="forward" color="#666" size="22"></uni-icons>
					</view>
				</view>
			</view>
			<view class="flexs chatdeit chline" @click="singdeit">
				<view class="chatmess">
					签到
				</view>
				<view class="flexs chatflex">
					<view class="">
						签到详情
					</view>
					<view class="rticon">
						<uni-icons type="forward" color="#666" size="22"></uni-icons>
					</view>
				</view>
			</view>
			<view class="flexs chatdeit chline">
				<view class="chatmess">
					会议录制
				</view>
				<view class="flexs chatflex">
					<view class="">
						录制详情
					</view>
					<view class="rticon">
						<uni-icons type="forward" color="#666" size="22"></uni-icons>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="meettimg">
			<image   src="/static/img/hi.png" mode=""></image>
			<view class="dapos">{{getCurrentTime(meettime.start_at).substring(0,11)}}</view>
		</view>
	</view>
</template>

<script>
	export default
	{
		data()
		{
			return {
				hilist:[],
				creaDe:'',
				meettime:''
			}
		},
		onLoad(options)
		{
			if(options.code && options.code !=undefined)
			{
				this.getdelit(options.code)
			}
		},
		methods:{
			chatDeit()
			{
				uni.navigateTo({
					url:'./chatRecord'
				})
			},
			singdeit()
			{
				// uni.navigateTo({
				// 	url:'./signDeitals'
				// })
				
			},
			getdelit(pams)
			{
				this.api.voice.gethideit(pams).then(res=>{
					console.log('resss',res.data)
					if(res.code==200 && res.data.host_user)
					{
						this.hilist=res.data.join_user
						this.creaDe=res.data.host_user
						this.meettime=res.data.meeting_info
					}
				})
			},
			tellMess()
			{
				uni.showToast({
					title:'正在开发中，敬请期待！',
					icon:'none'
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
	page{
		background: #fff;
	}
	.hideit{
		padding: 32upx;
	}
	.hideit text:nth-child(1)
	{
		font-size: 28upx;
		font-weight: 600;
	}
	.hideit text:nth-child(2)
	{
		background-color: ;
		font-size: 22upx;
		color: #808080;
		background-color: #E4E4E4;
		padding: 6upx 20upx;
		border-radius: 6upx;
		margin-left: 16upx;
	}
	.dataht{
		padding-top: 40upx;
		font-weight: 600;
	}
	.dataht view:nth-child(1),.dataht view:nth-child(3)
	{
		font-size: 36upx;
	}
	.dataht view:nth-child(2){
		font-size: 26upx;
		
	}
	.hdyear{
		font-size: 26upx;
		color: #666;
		padding-top: 8upx;
	}
	.creameet{
		justify-content: flex-start;
		padding-top: 28upx;
		font-size: 26upx;
		align-items: center;
		color: #666;
	}
	.creameet image
	{
		width: 56upx;
		height: 56upx;
		margin-left: 28upx;
		border-radius: 100%;
	}
	.creaname{
		padding-left: 16upx;
	}
	.meetimg{
		justify-content: flex-start;
		margin-left: 40upx;
	}
	.meetimg image
	{
		margin-left: -14upx;
		border: 4upx solid #fff;
	}
	.im1
	{
		position: relative;
		border-radius: 100%;
		
	}
	.im2
	{
		position: relative;
		
	}
	
	.creameetTime{
		margin-top: 26upx;
		padding: 30upx 0;
	}
	.chatdeit{
		font-size: 28upx;
		color: #333;
	}
	.chatmess{
		padding: 26upx;
	}
	.chline{
		border-bottom: 4upx solid #F0F0F0;
		
	}
	.histImg{
		justify-content: space-around;
		font-size: 28upx;
	}
	.histImg image{
		width: 48upx;
		height: 48upx;
	}
	.hImg{
		padding-bottom: 16upx;
	}
	.hmg image:nth-child(1){
		padding-bottom: 16upx;
	}
	
	.histtimes{
		color: #333;
		font-weight: 600;
	}
	.histdeit{
		padding-top: 6upx;
		color: #666;
	}
	.chatflex{
		align-items: center;
	}
	.rticon{
		padding-left: 20upx;
	}
	.meettimg{
		margin:52upx 18upx;
		position: relative;
	}
	.dapos{
		position: absolute;
		
		right: 0;
		bottom: 0;
		color: #fff;
		margin-bottom: 20upx;
		margin-right: 20upx;
		font-size: 24upx;
		font-weight: 600;
	}
	.meettimg image
	{
		width: 100%;
		border-radius: 10upx;
		height: 284upx;
	}
</style>