<template>
	<view class="attrDeitals">
		<view style="text-align: center;padding: 20upx;background-color: chocolate;color: #fff;" v-if="$store.state.video_times >0 && type==4 && $store.state.watch_type==4 && tasktype">
			<text>查看文章{{second}}秒之后完成任务</text>
		</view>
		<view class="attrname">
			{{stnum.title}}
		</view>
		<view class="attrContent">
			<rich-text class="setimg" v-html="cont">
				
			</rich-text>
		</view>
		<view class="fiex">
			<view class="flexs comBox">
				<view style="display: flex;align-items: center;">
					<view>
						<textarea v-model="comment" class="tewid" placeholder="输入评论内容..."></textarea>
					</view>
					<view class="sucom" @click="subcomment">发布</view>
				</view>
				<view class="flexs ImgNums">
					<view @click="sourcePrise">
						<text>
							<uni-icons custom-prefix="iconfont" color="#000" type="icon-31dianzan" size="20"></uni-icons>
						</text>
						
					</view>
					<view @click="ishowcomment">
						<text>
							<uni-icons type="chat" size="20"></uni-icons>
						</text>	
					</view>
					<view @click="govideoShare">
						<text>
							<uni-icons custom-prefix="iconfont" color="#000" type="icon-fenxiang" size="20"></uni-icons>
						</text>
						
					</view>
							
					
				</view>
								
			</view>
		</view>
		<view class="op-height">
			<uni-popup ref="popup">
				<view class="popup-content">
					
					<view class="flexs">
						<view>
							<text>评论</text>
							<text style="font-weight: 600;padding-left: 10upx;">{{comnums}}</text>
						</view>
						<view @click="closecom">
							<uni-icons type="closeempty" size="26"></uni-icons>
						</view>
					</view>
					
					<scroll-view class="setghg" style="height: 60vh" scroll-y="true" @scrolltolower="touchbomm"  :scroll-with-animation="true">
						<view class="flexs userName" v-for="(item,index) in comlist" :key="item.id">
							<view class="userImfs">
								<image v-if="item.user.avatar_file_url" :src=item.user.avatar_file_url></image>
								<image v-else src='../../static/img/p.png'></image>
							</view>
							<view class="comere">
								<view class="ufow">{{item.user.name}}</view>
								<view class="coms">
									{{item.content.comment}}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="fiex">
					<view class="flexs comBox">
						<view style="display: flex;align-items: center;">
							<view>
								<textarea v-model="comment" class="tewid" placeholder="输入评论内容..."></textarea>
							</view>
							<view class="sucom" @click="subcomment">发布</view>
						</view>
						<view class="flexs ImgNums">
							<view @click="sourcePrise">
								<text>
									<uni-icons custom-prefix="iconfont" color="#000" type="icon-31dianzan" size="20"></uni-icons>
								</text>
								
							</view>
							<view @click="ishowcomment">
								<text>
									<uni-icons type="chat" size="20"></uni-icons>
								</text>	
							</view>
							<view>
								<text>
									<uni-icons custom-prefix="iconfont" color="#000" type="icon-fenxiang" size="20"></uni-icons>
								</text>
								
							</view>
									
							
						</view>
										
					</view>
				</view>
				
			</uni-popup>
		</view>
		<view class="op-height">
			<uni-popup ref="popup1">
				<view class="closespop" @click="closepop">
					<uni-icons type="closeempty" size="18"></uni-icons>
				</view>
				<view class="flexs popup-content" style="padding: 60upx;">
					
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
				stnum:[],
				cont:'',
				comment:'',
				id:0,
				comlist:[],
				comnums:'',
				type:'',
				tasktype:'',
				second:0,
				page:1,
				ispage:true
				
				
			}
		},
		onLoad(options) {
			if(options.id)
			{
				this.getdeitals(options.id)
				this.id=options.id
			}
			if(options.type && options.type !=undefined)
			{
				this.type=options.type
				
			}
			if(options.tasktype && options.tasktype !=undefined)
			{
				this.tasktype=options.tasktype
			}
			this.getComment(this.id)
		},
		onShow() {
			
			enterTime = new Date();
			if(this.$store.state.video_times >0 && this.$store.state.watch_type==4 && this.tasktype)	
			{
				this.stertTime()
			}
			
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
			getdeitals(pam)
			{
				this.api.source.sourcede(pam).then(res=>{
					
					if(res.code==200)
					{
						// this.deit=res.data;
						// this.deitimg=res.data.content[0].file_url
						 this.stnum=res.data;
						 // this.cont=res.data.content.text
						this.cont = this.formatRichText(res.data.content.text)
					}
				})
			},
			
			closecom()
			{
				this.$refs.popup.close()
			},
			//分享
			govideoShare()
			{
				this.$refs.popup1.open('bottom')
			},
			closepop()
			{
				this.$refs.popup1.close()
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
					title:this.stnum.title,
					provider: "weixin",
					scene: sharepams,
					summary:this.stnum.description,
					type: 0,
					href:'/pages/sourceCenter/attrDeitals?id='+this.id,
					imageUrl:this.stnum.cover.file_url,
					success:  (res)=> {
						
					},
					fail: function (err) {
						console.log('还好','222')
						console.log("fail:" + JSON.stringify(err));
					}
				});
				this.$refs.popup1.close()
				this.api.source.sourceShare({
					id:this.id,
					content:'',
					share_link:'/pages/sourceCenter/attrDeitals?id='+this.id
				}).then(res=>{
					if(res.code==200)
					{
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
							content:'文章',
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
						 uni.showToast({
						 	title:'任务完成',
						 	icon:'none'
						 })
						 this.$store.commit('set_task_ids',0)
					 }
					 
				 }).catch(e=>{
					 console.log('shiabba',e)
				 })
			},
			sourcePrise()
			{
				this.api.source.sourcePrise({
					id:this.id,
					content:''
				}).then(res=>{
					if(res.code==200)
					{
						uni.showToast({
							title:'点赞成功!',
							icon:'none'
						})
						this.self_get()
						this.getdeitals(this.id)
						return
					}
					
				})
			},
			touchbomm()
			{
				
				this.page++
				this.getComment(this.id)
			},
			getComment(id)
			{
				if(!this.ispage)
				{
					return false
				}
				this.api.source.getComment({
					id:id,
					page:this.page,
					page_size:20
				}).then(res=>{
					if(res.code==200 &&  res.data.data.length>0)
					{
						this.comnums=res.data.total
						if (this.page>1)
						{
							res.data.data=this.comlist.concat(res.data.data)
						}
						
						this.comlist=res.data.data
					}else{
						if (res.data.data.length==0)
						{
							uni.hideLoading()
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
			
			subcomment()
			{
				if(!this.comment)
				{
					uni.showToast({
						title:'输入评论内容!'
					})
				}
				this.api.source.sourceComment({
					id:this.id,
					comment:this.comment,
					content:''
				}).then(res=>{
					if(res.code==200)
					{
						uni.showToast({
							title:'评论成功',
							icon:'none'
						})
						
						this.comment=''
						this.getComment(this.id)
						this.$refs.popup.open('bottom')
						this.self_get()
					}
				})
			},
			ishowcomment()
			{
				if(this.comlist.length >0)
				{
					this.$refs.popup.open('bottom')
				}
			},
			formatRichText(html) {
					 let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
						 match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
						 match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
						 match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
						 return match;
					 });
					 newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
						 match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
						 return match;
					 });
					 newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					 newContent = newContent.replace(/\<img/gi,
						 '<image style="max-width:100%;height:auto;padding-top:20px"');
						 newContent = newContent.replace(/\<p/gi,
						 '<view style="max-width:100%;margin:10rpx auto!important"');
					 return newContent;
			 }
		}
	}
</script>

<style>
	.attrname{
		text-align: center;
		padding: 30upx;
		font-size: 30upx;
		font-weight: 600;
		
	}
	.userImfs image{
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
	}
	.userName{
		justify-content: flex-start;
		margin-top: 60upx;
	}
	.ufow{
		font-size: 28upx;
		font-weight: 600;
		text-align: left;
	}
	.comere{
		padding-left: 30upx;
		font-size: 26upx;
	}
	.coms{
		margin-top: 20upx;
		background-color:#F4F7FD ;
		padding:10upx 30upx;
		text-align: left;
	}
	.popup-content{
		border-radius: 20upx 20upx 0  0;
		
		padding-bottom: 160upx;
		padding: 20upx 30upx;
		
	}
	.fiex{
		position: fixed;
		bottom: 0;
		background-color: #fff;
		width: 100%;
	}
	.tewid{
		width: 280upx;
		height: 60upx;
		background-color: #efefef;
		border-radius: 40upx;
		padding-left: 20upx;
		padding-top: 20upx;
	}
	.comBox{
		justify-content: space-between;
		align-items: baseline;
		padding: 30upx;
	}
	.sucom{
		padding-left: 30upx;
		font-size: 28upx;
		color: #128DDA;
	}
	.attrContent{
		font-size: 28upx;
		padding: 0 30upx;
		display: block;
		text-indent: 56rpx;
		padding-bottom: 200upx;
	}
	.setimg >img{
		width: 96%!important;
		height: 700upx;
	}
	.ImgNums{
		justify-content: flex-start;
		margin-top: 20upx;
		/* grid-gap: 50upx; */
		font-size: 24upx;
	}
	.ImgNums text:nth-of-type(2){
		padding-left: 10upx;
		color: #999;
	}
	.ImgNums view:nth-of-type(2){
		margin-left: 50upx;
		margin-right: 50upx;
	}
</style>