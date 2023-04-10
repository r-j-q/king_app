<template>
	
	<view class="videoDe">
		<view class="flexs iotops sumap" :style="[{'paddingTop':statusBar+'px'}]">
			<view class="plback" @click="goBack">
				<uni-icons type="left" color="#666" size="27"></uni-icons>
			</view>
			
				<view class="videoName">音频播放</view>
				<view @click="govideoShare">
					<uni-icons custom-prefix="iconfont" color="#000" type="icon-fenxiang" size="20"></uni-icons>
				</view>
		</view>
		<view style="text-align: center;padding: 20upx;background-color: chocolate;color: #fff;" v-if="$store.state.video_times >0 && type==2 && $store.state.watch_type==2 && tasktype">
			<text>收听音频{{second}}秒之后完成任务</text>
		</view>
		<view class="videoShow">
				<cxAdudioPlay v-if="list.length >0" :list="list" :BsNav="BsNav"></cxAdudioPlay>
		</view>
		
		<view class="videoComment">
			<view class="commentFlex">
				<view class="videoMess">
					<view>{{sou.description}}</view>
				</view>
				
			</view>
			
			<view class="flexs setmpg">
				<view>
					<text>
						<uni-icons custom-prefix="iconfont" color="#000" type="icon-bianzu15" size="14"></uni-icons>
					</text>
					<text>{{stname}}</text>
				</view>
				<view>
					<text>
						<uni-icons custom-prefix="iconfont" color="#000" type="icon-24gf-playCircle" size="14"></uni-icons>
					</text>
					<text>{{sou.watch_count}}</text>
				</view>
				<view @click="sourcePrise(sou)">
					<text>
						<uni-icons custom-prefix="iconfont" color="#000" type="icon-31dianzan" size="14"></uni-icons>
					</text>
					<text>{{sou.praise_count}}</text>
				</view>
				
				<view style="margin-left: auto;padding-right: 30upx;">
					<text>{{!isNaN(getCurrentTime(sou.created_at))?getCurrentTime(sou.created_at):''}}</text>
				</view>
			
			</view>
			
			<view v-if="imgs" class="mp3Imgs">
				<image :src=imgs></image>
			</view>
			<view class="mp3Mess" style="line-height: 50upx;text-indent: 56rpx;padding-bottom: 60upx;">
				{{content}}
			</view>
		</view>
		
		<view class="op-height">
			<uni-popup ref="popup">
				<view class="closespop" @click="closepop">
					<uni-icons type="closeempty" size="18"></uni-icons>
				</view>
				<view class="flexs popup-content">
					
					<view class="wxFrined" @click="wxshareF(1)">
						<view class="wxfBack">
							<image src="../../static/img/wxf.png"></image>
						</view>
						<view>微信好友</view>
					</view>
					
					<view class="wxFrined" @click="wxshareF(2)">
						<view class="wxfBack">
							<image src="../../static/img/wxp.png"></image>
						</view>
						<view>朋友圈</view>
					</view>
				</view>
				
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import cxAdudioPlay from '@/uni_modules/cx-audio-play/components/cx-audio-play/cx-audio-play.vue'
	let enterTime = '';
	let outTime = '';
	let stayTime = '';
		export default{
			components: {
				cxAdudioPlay
			},
			data()
			{
				return{
					searchValue:'',
					statusBar:'',
					list: [],
					id:'',
					BsNav:[ //倍数-自定义
						{id:1.0,bs:'1.0'},{id:1.5,bs:'1.5'},{id:2.0,bs:'2.0'}
					],
					audioAction: {
						method: 'pause'
					},
					sou:'',
					logo:'',
					stname:'',
					imgs:'',
					task_id:'',
					second: 0,
					send: true,
					interval:'',
					content:'',
					type:'',
					tasktype:''
				}
			},
			onLoad(options) {
				var that=this
				uni.getSystemInfo({
					success(e) {
						let statusBar = 0
						let customBar = 0
						statusBar = e.statusBarHeight
						customBar = e.statusBarHeight + 60;
						that.statusBar=e.statusBarHeight+12; 
					}
				});
				if(options.id && options.id !=undefined)
				{
					that.id=options.id
					
				}
				if(options.type && options.type !=undefined)
				{
					that.type=options.type
					
				}
				if(options.tasktype && options.tasktype !=undefined)
				{
					this.tasktype=options.tasktype
				}
				
			},
			onShow() {
				this.getSode(this.id)
				
				enterTime = new Date();
				
				// console.log('set_watch_typemp3',this.$store.state.watch_type)
				if(this.$store.state.video_times >0 && this.$store.state.watch_type==2 && this.tasktype)	
				{
					this.stertTime()
				}
				
			},
			mounted(){
				this.ismp3()
			},
			onHide(){
				// 用户退出时间
				outTime = new Date();
				//停留时间(毫秒)
				stayTime = (outTime.getTime() - enterTime.getTime())/1000;
				clearInterval(this.interval)
			},
			
			onUnload() {
				// 用户退出时间
				outTime = new Date();
				//停留时间(毫秒)
				stayTime = (outTime.getTime() - enterTime.getTime())/1000;
				clearInterval(this.interval)
			},
			methods:{
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
				
				ismp3()
				{
					setTimeout(()=>{
						this.api.source.sourceWatch({
							id:this.id,
							content:this.sou.content[0].file_url,
							duration:'1'
						}).then(res=>{
							if(res.code==200)
							{
								this.getSode(this.id)
							}
						})
					},2000)
					
				},
				sourcePrise(item)
				{
					
					this.api.source.sourcePrise({
						id:item.id,
						content:item.content[0].file_url
					}).then(res=>{
						if(res.code==200)
						{
							uni.showToast({
								title:'点赞成功!',
								icon:'none'
							})
							this.getSode(this.id)
							this.self_get()
							return
						}
					})
				},
				//分享
				govideoShare()
				{
					this.$refs.popup.open('bottom')
					
				},
				closepop()
				{
					this.$refs.popup.close()
				},
				self_get()
				{
					this.api.interactive.getUsertask({
						 task_list:this.$store.state.ste_task_ids
					 }).then(res=>{
						 if(res.code==200)
						 {
		
							 this.$store.commit('set_task_ids',0)
						 }
						 
					 }).catch(e=>{
						 console.log('shiabba',e)
					 })
				},
				wxshareF(pams)
				{
					//朋友微信好友 pams==1 好友 pams==2 朋友圈 WXSceneTimeline
					if(pams==1)
					{
						var sharepams='WXSceneSession'
					}else{
						var sharepams='WXSceneTimeline'
					}
					uni.share({
						title:this.sou.title,
						provider: "weixin",
						scene: sharepams,
						imageUrl:this.sou.cover.file_url,
						summary:this.sou.description,
						type: 4,
						mediaUrl: this.sou.content[0].file_url,
						success:  (res)=>{
							
						},
						fail: function (err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
					this.$refs.popup.close()
					this.api.source.sourceShare({
						id:this.id,
						content:this.sou.content[0].file_url,
						share_link:this.sou.cover.file_url
					}).then(res=>{
						if(res.code==200)
						{
							console.log('ddssd')
							this.self_get();
						}
						
					}).catch(err=>{
						console.log('二人若',err)
					})
				},
				
				stertTime()
				{
					let that = this;
					
					
					
					that.second = that.$store.state.video_times*60;
					//that.second = 10;
					this.interval = setInterval(function(){
						if(that.second == 1){
							that.send = true;
							that.second = 0;
							clearInterval(that.interval);
							// 用户退出时间
							outTime = new Date();
							//停留时间(毫秒)
							stayTime = (outTime.getTime() - enterTime.getTime())/1000;
							
							that.api.source.sourceWatch({
								id:that.id,
								content:that.sou.content[0].file_url,
								duration:Math.floor(stayTime)
							}).then(res=>{
								if(res.code==200)
								{
									uni.showToast({
										title:'任务完成',
										icon:'none'
									})
									that.self_get()
									that.$store.commit('set_video_times',0)
									that.type=''
								}
							})
						}else {
							that.second--;
						}
					},1000)	
				},
				
				self_get()
				{
					if(this.$store.state.ste_task_ids==undefined)
					{
						return
					}
					this.api.interactive.getUsertask({
						 task_list:this.$store.state.ste_task_ids

					 }).then(res=>{
						 if(res.code==200)
						 {
							 this.$store.commit('set_task_ids',0)
						 }
						 
					 })
				},
				
				
				
				getSode(id)
				{
					this.api.source.sourcede(id).then(res=>{
				
						if(res.code==200)
						{
							this.sou=res.data
							this.logo=res.data.store.logo_file_url
							this.stname=res.data.store.name
							this.list=res.data.content
							this.imgs=res.data.cover.file_url
							this.content=res.data.content[0].text
							
						}
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
	.sumap{
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 111;
		background-color: #fff;
		padding: 20upx;
	}
	.videoShow{
		width: 100%;
		
		background-color: #808080;
	}
	.comImg image{
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
	}
	.commentFlex{
		justify-content: flex-start;
		align-items: center;
		margin: 30upx;
	}
	
	.commMess{
		font-size: 24upx;
		color: #666;
		line-height: 34upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		margin: 30upx;
		position: relative;
		width: 90%;
		line-height: 40upx;
	}
	.isopen{
		position: absolute;
		right: 0;
		
		bottom: 0;
		color: #61BB2B;
		font-weight: 500;
		font-size: 28upx;
		border-bottom: 1upx solid #61BB2B;
	}
	.setmpg{
		justify-content: flex-start;
		grid-gap: 40upx;
		font-size: 24upx;
		padding-left: 30upx;
		color: #999;
	}
	.setmpg text:nth-of-type(2){
		padding-left: 10upx;
	}
	.videoMess view:nth-of-type(1)
	{
		font-size: 26upx;
		font-weight: 600;
	}
	.videoMess view:nth-of-type(2)
	{
		font-size: 24upx;
		color: #999;
		padding-top: 6upx;
	}
	
	.videoShow{
		width: 100%;
	}
	.mp3Imgs image{
		padding-top: 20upx;
		width: 100%;
		height: 300upx;
	}
	.mp3Mess{
		width: 90%;
		margin: 20upx auto;
		font-size: 26upx;
		color: #666;
	}
</style>