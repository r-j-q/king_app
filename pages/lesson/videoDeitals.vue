<template>
	
	<view class="videoDe">
		<view class="flexs iotops sumap" :style="[{'paddingTop':statusBar+'px'}]">
			<view class="plback" @click="goBack">
				<uni-icons type="left" color="#666" size="27"></uni-icons>
			</view>
			<view class="videoName">视频详情</view>
			<view @click.stop="govideoShare">
				<uni-icons custom-prefix="iconfont" color="#000" type="icon-fenxiang" size="20"></uni-icons>
			</view>
		</view>
		<view style="text-align: center;padding: 20upx;background-color: chocolate;color: #fff;" v-if="$store.state.video_times >0 && type==1 && $store.state.watch_type==1 && tasktype">
			<text>观看视频{{second}}秒之后完成任务</text>
		</view>
		<view  class="videoShow">
			<video @play="play"  :src=vm></video>
		</view>
		
		<view class="videoComment">
			<view class="flexs commentFlex">
				<view class="comImg">
					<image :src=logo ></image>
				</view>
				<view class="videoMess" style="padding-left: 20upx;">
					<view>{{stname}}</view>
					
				</view>
			</view>
			<view class="commMessPos">
				<view class="commMess">
					{{sou.description}}
					<view v-if="false" class="isopen" @click="isopen">
						展开
					</view>
				</view>
				
				
			</view>
			<view class="flexs setmpg">
				<view>
					<text>
						<uni-icons custom-prefix="iconfont" color="#000" type="icon-24gf-playCircle" size="20"></uni-icons>
					</text>
					<text>{{sou.watch_count}}</text>
				</view>
				<view @click="sourcePrise(sou)">
					<text>
						<uni-icons custom-prefix="iconfont" color="#000" type="icon-31dianzan" size="20"></uni-icons>
					</text>
					<text>{{sou.praise_count}}</text>
				</view>
			</view>
			<view v-if="imgs" class="mp3Imgs">
				<image :src=imgs mode="aspectFill"></image>
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
		let enterTime = ''; 
		let outTime = '';
		let stayTime = '';
		export default{
			data()
			{
				return{
					searchValue:'',
					statusBar:'',
					sou:'',
					logo:'',
					stname:'',
					type:'',
					vm:'',
					id:'',
					task_id:'',
					second: 0,
					send: true,
					interval:'',
					tasktype:'',
					imgs:'',
					content:''
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
					that.getSode(options.id)
					that.id=options.id
				}
				if(options.type && options.type !=undefined)
				{
					that.type=options.type
				}
				
				if(options.task_id && options.task_id !=undefined)
				{
					that.task_id=options.task_id
				}
				
				if(options.tasktype && options.tasktype !=undefined)
				{
					this.tasktype=options.tasktype
				}
				
			},
			
			
				onShow() {
					
					enterTime = new Date();
					if(this.$store.state.video_times >0 && this.$store.state.watch_type==1 && this.tasktype)
					{
						this.stertTime()
					}
					
				},
				onHide(){
					// 用户退出时间
					outTime = new Date();
					//停留时间(毫秒)
					stayTime = (outTime.getTime() - enterTime.getTime())/1000;
					clearInterval(this.interval);
				},
				
				onUnload() {
					// 用户退出时间
					outTime = new Date();
					//停留时间(毫秒)
					stayTime = (outTime.getTime() - enterTime.getTime())/1000;
					clearInterval(this.interval);
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
					clearInterval(this.interval);
				},
				play()
				{
					this.api.source.sourceWatch({
						id:this.id,
						content:this.vm,
						duration:'1'
					}).then(res=>{
						if(res.code==200)
						{
							this.getSode(this.id)
						}
					})
				},
				
				stertTime()
				{
					let that = this;
					that.second = that.$store.state.video_times*60;
					that.interval = setInterval(function(){
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
								content:that.vm,
								duration:Math.floor(stayTime)
							}).then(res=>{
								if(res.code==200)
								{
									uni.showToast({
										title:'任务完成',
										icon:'none'
									})
									that.$store.commit('set_video_times',0)
									that.self_get()
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
				isopen()
				{
					
				},
				closepop()
				{
					this.$refs.popup.close()
				},
				//分享
				govideoShare()
				{
					this.$refs.popup.open('bottom')
					
				},
				getSode(id)
				{
					this.api.source.sourcede(id).then(res=>{
						
						if(res.code==200)
						{
							this.sou=res.data
							this.logo=res.data.store.logo_file_url
							this.stname=res.data.store.name
							this.vm=res.data.content[0].file_url
							this.imgs=res.data.cover.file_url
							this.content=res.data.content[0].text
						}
					})
				},
				self_get()
				{
					if(this.$store.state.ste_task_ids ==undefined)
					{
						return
					}
					this.api.interactive.getUsertask({
						 task_list:this.$store.state.ste_task_ids
					 }).then(res=>{
						 if(res.code==200)
						 {
							 console.log('cengngn')
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
							this.self_get();
						}
						
					}).catch(err=>{
						console.log('二人若',err)
					})
				}

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
	.videoShow video{
		width: 100%;
		height: 516upx;
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
		justify-content: flex-end;
		grid-gap: 40upx;
		font-size: 24upx;
		padding-right: 30upx;
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