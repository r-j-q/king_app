<template>
	<view>
		<view class="search-with nfs souiceBack" :style="[{'paddingTop':statusBar+'px'}]">
		<view class="fiesrwo">
			<view class="flexs iotops">
				<view class="plback" @click="goBack">
					<uni-icons type="left" color="#000" size="27"></uni-icons>
				</view>
				<view @click="settabs(1)"  :class="status==1?'surcoes':'nosur'">
					语音会议
				</view>
				<view @click="settabs(2)" class="posab" :class="status==2?'surcoes':'nosur'">
					历史会议
				</view>
			</view>
			
			<view class="newflex">
				<view class="flexs newml">
					<view class="voiceImg" @click="joinMeeting">
						<image src="/static/img/ajoin.png" mode=""></image>
						<view class="soname">加入会议</view>
					</view>
					<view class="voiceImg" @click="lameeting">
						<image src="/static/img/astart.png" mode=""></image>
						<view class="soname">发起会议</view>
					</view>
				</view>
			</view>
			
			<view class="flmb"></view>
			
			
			<view class="volist" v-for="(item,index) in  volist" :key="index">
				<view class="vodate">
					<view class="nday">
						{{item.week}}
					</view>
					<view class="date-r">
						{{item.date}}
					</view>
				</view>
				<view v-for="(sitem,sindex) in item.list" :key="item.id" @click="goRoom(sitem)" class="shflex">
					<view class="lpubcss"
					:class="sitem.type_name=='其他会议'? 'left-n' 
					:sitem.type_name=='品牌会议'? 'clo1'
					:sitem.type_name=='招商会议'? 'clo2'
					:sitem.type_name=='培训会议'? 'clo3'
					:sitem.type_name=='早会分享'? 'clo5'
					:sitem.type_name=='王者故事汇'? 'clo6'
					:sitem.type_name=='专题会议'? 'clo4':
					'clo' "
					>
					</view>
					<view class="right-c">
						<view 
						class="flexs pubcss"
						:class="sitem.type_name=='其他会议'? 'datback'
						:sitem.type_name=='品牌会议'? 'cb1'
						:sitem.type_name=='招商会议'? 'cb2'
						:sitem.type_name=='培训会议'? 'cb3'
						:sitem.type_name=='早会分享'? 'cb5'
						:sitem.type_name=='王者故事汇'? 'cb6'
						:sitem.type_name=='专题会议'? 'cb4':
						'cb0' "
						>
							<view class="opubcss"
							 :class="sitem.type_name=='其他会议'? 'voTit'
							 :sitem.type_name=='品牌会议'? 'c1'
							 :sitem.type_name=='招商会议'? 'c2'
							 :sitem.type_name=='培训会议'? 'c3'
							 :sitem.type_name=='早会分享'? 'c5'
							 :sitem.type_name=='王者故事汇'? 'c6'
							 :sitem.type_name=='专题会议'? 'c4':
							 'c0' "
							 >
								{{sitem.type_name}}
							</view>
							<view class="time-d">
								{{sitem.meeting_time}}
							</view>
						</view>
						<view class="flexs tpubcss"
							:class="sitem.type_name=='其他会议'? 'otfls'
							:sitem.type_name=='品牌会议'? 'cd1'
							:sitem.type_name=='招商会议'? 'cd2'
							:sitem.type_name=='培训会议'? 'cd3'
							:sitem.type_name=='早会分享'? 'cd5'
							:sitem.type_name=='王者故事汇'? 'cd6'
							:sitem.type_name=='专题会议'? 'cd4':
							'cd0' "
						>
							<view class="">
								<view class="vo-title">
									主题：{{sitem.title}}
								</view>
								<view class="host-p">
									主持人：{{sitem.host_name}}
								</view>
							</view>
							<view class="oright">
								<view  :class="sitem.state?'condcor':'nostart'">
									{{sitem.state?'进行中':'待开始'}}
								</view>
								<view class="jpl" v-if="sitem.state">
									<uni-icons type="forward" color="#666" size="24"></uni-icons>
								</view>
								<view class="jpl" v-else>
									<uni-icons type="forward" color="#B3B3B3" size="24"></uni-icons>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			
			<!-- <view class="sourceSet">
				<view class="setbutton" @click="joinMeeting">
					<button>加入会议</button>
				</view>
				<view class="setbutton" @click="lameeting">
					<button>发起会议</button>
				</view>
			</view> -->
			
			
			
		</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar:0,
				status:1,
				volist:[]
			}
		},
		created() {
		},
		onLoad() {
			var that=this
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45;
					that.statusBar=e.statusBarHeight+8; 
				}
			});
		},
		onShow() {
			this.status=1;
			this.voiceeFfective()
		},
		methods: {
			goBack()
			{
				const pages = getCurrentPages()//获取页面栈
				if (pages.length === 1) {//如果只有一个调用原生js
					history.back()
				} else {
					uni.navigateBack({
						delta: 1,
					})
				}
			},
			
			voiceeFfective()
			{
				this.api.voice.voiceeFfective().then(res=>{
					// console.log('resswww',res)
					if(res.code==200 && res.data.data.length >0)
					{
						this.volist=res.data.data
					}
				})
			},
			//加入会议
			joinMeeting()
			{
				uni.navigateTo({
					url:'/pages/setVoice/joinMeeting'
				})
			},
			goRoom(item)
			{
				if(!item.state)
				{
					uni.showToast({
						title:'会议未开始！',
						icon:'none'
					})
					return
				}
				uni.navigateTo({
					url:'/pages/setVoice/joinMeeting?setRoomid='+item.code
				})
				
			},
			lameeting()
			{
				this.api.voice.checkPower().then(res=>{
					if(res.code==200)
					{
						uni.navigateTo({
							url:'/pages/setVoice/lameeting'
						})
						
					}
				}).catch(err=>{
					
					uni.showToast({
						title:err.message,
						icon:'none'
					})
				})
				
			},
			settabs(pams)
			{
				this.status=pams
				if(pams==2)
				{
					uni.navigateTo({
						url:'./historyMeeting'
					})
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.souiceBack{
		/* background-image: url('@/static/img/u1.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 240upx; */
		align-items: unset;
		padding: 0;
		background-color: #fff;
	}
	.iotops{
		background-color: unset;
		border-bottom: unset;
		position: relative;
		padding-bottom: 20upx;
		border-bottom: 2upx solid #ccc;
	}
	.sumap{
		margin-top: 15upx;
		justify-content: flex-start;
		border-bottom: unset!important;
		margin-top: unset;
	}
	.plback{
		
		width: auto;
		margin: 0 4upx;
		word-break: keep-all;
		white-space: pre;
		cursor: pointer;
	}
	.posfied{
		position: relative;	
		margin: auto;
	}
	.posab{
		position: absolute;
		right: 0;
		/* margin-right: 32upx; */
	}
	.fiesrwo{
		width: 100%;
	}
	.surcoes{
		font-size: 30upx;
		font-weight: 600;
		color: #000;
		position: absolute;
		left: 70px;
		right: 70px;
		min-width: 0;
		text-align: center;	
	}
	.nosur{
		font-size: 28upx;
		color: #B3B3B3;
		margin-right: 32upx;
	}
	
	.sourceSet{
		margin-top: 342upx;
	}
	.setbutton button{
		width: 440upx;
		height: 100upx;
		background-color: #128DDA;
		font-size: 36upx;
		line-height: 100upx;
		color: #fff;
	}
	.sourceSet view:nth-child(2)
	{
		margin-top: 60upx;
	}
	
	
	.newml{
		margin: 58upx 110upx;
	}
	.voiceImg{
		text-align: center;
		border: 2upx solid #FDFDFF;
		background: #FDFDFF;
		box-shadow: 0px 0px 16upx 1px #F0F0F0;
		border-radius: 8upx;
		padding: 20upx 52upx;
		
	}
	.soname{
		font-weight: 600;
		font-size: 26upx;
	}
	.voiceImg image{
		width: 72upx;
		height: 72upx;
		
	}
	
	.flmb{
		height: 20upx;
		background-color:#F7F8FA ;
	}
	.volist{
		padding: 40upx 32upx 0 32upx;
	}
	.shflex{
		margin-top: 24upx;
		margin-left: 20upx;
		margin-bottom: 40upx;
	}
	.vodate{
		margin-bottom: 24upx;
	}
	.vodate,.shflex,.oright{
		display: flex;
	}
	.date-r{
		margin-left: 20upx;
		font-size: 24upx;
	}
	
	.lpubcss{
		width: 8upx;
		border-radius: 8upx;
		opacity: 1;
	}
	
	.left-n{
		background: #5BEBBF;
	}
	
	.clo6{
		background: #FF5A6E;
	}
	.clo5{
		background: #B5E867;
	}
	.clo4{
		background: #F182F9;
	}
	.clo3{
		background: #FF9C4E;
	}
	.clo2{
		background: #6464FF;
	}
	.clo1{
		background: #5BEBEB;
	}
	
	.otfls,.vodate,.oright{
		align-items: center;
	}
	.right-c{
		flex: 1;
	
	}
	.pubcss{
		padding: 20upx 28upx;
		border-bottom: 2upx solid #F0F0F0;
	}
	.datback{
		background-color:#EBFFFA ;	
	}
	.cb6{
		background: #FFF0F0;
	}
	.cb5{
		background: #F7FFEB;
	}
	.cb4{
		background: #FFEBFE;
	}
	.cb3{
		background: #FFF5EB;
	}
	.cb2{
		background: #EBF1FF;
	}
	.cb1{
		background: #EBFFFF;
	}
	
	
	.nday{
		font-size: 36upx;
		font-weight: 600;
	}
	.tpubcss{
		padding: 20upx 28upx;
	}
	.otfls{
		background-color: #F6FFFD;
	}
	.cd6{
		background: #FFFAFA;
	}
	.cd5{
		background: #FCFFF6;
	}
	.cd4{
		background: #FFFAFF;
	}
	.cd3{
		background: #FFFDFA;
	}
	.cd2{
		background: #F6F8FF;
	}
	.cd1{
		background: #F6FEFF;
	}
	.opubcss{
		font-size: 32upx;
		
		font-weight: 600;
	}
	.voTit{
		
		color:#13B89C ;
	}
	
	.c6{
		color: #B81313;
	}
	.c5{
		color: #77B813;
	}
	.c4{
		color: #8713B8;
	}
	.c3{
		color: #D67717;
	}
	.c2{
		color: #128DDA;
	}
	.c1{
		color: #1370B8;
	}
	
	.time-d{
		font-size: 24upx;
	}
	
	.condcor{
		font-size: 26upx;
		font-weight: bold;
		color: #467CF6;
	}
	.nostart{
		font-size: 26upx;
		font-weight: bold;
		color: #B3B3B3;
	}
	.vo-title{
		font-size: 28upx;
		font-weight: 600;
	}
	.host-p{
		font-size: 24upx;
		margin-top: 16upx;
	}
	.jpl{
		margin-left: 12upx;
	}
</style>
