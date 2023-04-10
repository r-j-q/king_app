<template>
	
	<view class="imglist">
		
		<view class="tmpX" v-if="$store.state.video_times >0 && $store.state.watch_type==3 && isshows && tasktype">
			<text>观看图文{{second}}秒之后完成任务</text>
		</view>
		<swiper class="swiper" circular :indicator-dots="indicatorDots" @change="getCurrent" :autoplay="autoplay">
			<swiper-item v-for="(item,index) in deit.content" :key="index">
				<view  class="swiper-item">
					<image mode="aspectFit" :src=item.file_url></image>
				</view>
			</swiper-item>
						
		</swiper>
		
		<view class="fiexv">
			<view class="flexs ImgNums setmpg">
				<view @click.stop="sourcePrises">
					<text>
						<uni-icons custom-prefix="iconfont" color="#fff" type="icon-31dianzan" size="20"></uni-icons>
					</text>
					<text style="padding-left: 10upx;">{{deit.praise_count}}人赞过</text>
				</view>
				<view @click="saveImage(deit)">
					<text>
						<uni-icons custom-prefix="iconfont" color="#fff" type="icon-xiazaidaoru" size="20"></uni-icons>
					</text>
					<text style="padding-left: 10upx;">{{deit.download_count}} 人</text>
				</view>
				<view @click="govideoShare">
					<text>
						<uni-icons custom-prefix="iconfont" color="#fff" type="icon-fenxiang" size="20"></uni-icons>
					</text>
					<text style="padding-left: 10upx;">{{deit.share_count}} 人</text>
				</view>
			
			</view>
		</view>
		<!-- <view class="imgsd">
			<view class="innbox">
				共{{imgnums}}张,左右滑动查看
			</view>
		</view> -->
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
	export default {
		data()
		{
			return{
				deit:[],
				startData:{
				clientX:'',
				clientY:'',
				
			   },
			   deitimg:'',
			   isshows:true,
			   stnum:0,
			   td:0,
			   id:0,
			   task_id:'',
			   imgnums:0,
			   currindex:0,
			   second:0,
				tasktype:'',
				autoplay: false,
				indicatorDots: true,
			}
		},
		onLoad(options) {
			if(options.id)
			{
				this.getdeitals(options.id)
				this.id=options.id
			}
			if(options.task_id)
			{
				this.task_id=options.task_id
			}
			
			if(options.tasktype && options.tasktype !=undefined)
			{
				this.tasktype=options.tasktype
			}
		},
		onShow() {
			enterTime = new Date();
			if(this.$store.state.video_times >0 && this.$store.state.watch_type==3 && this.tasktype)
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
			getdeitals(pam)
			{
				this.api.source.sourcede(pam).then(res=>{
					if(res.code==200)
					{
						this.deit=res.data;
						this.deitimg=res.data.content[0].file_url
						this.stnum=this.deit.content.length
						this.imgnums=res.data.content.length
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
							content:that.deit.content[that.currindex].file_url,
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
			
			
			getCurrent(e)
			{
				this.currindex=e.detail.current
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
			wxshareF(pams)
			{
				var that = this;
				//朋友微信好友 pams==1 好友 pams==2 朋友圈 WXSceneTimeline
				if(pams==1)
				{
					var sharepams='WXSceneSession'
				}else{
					var sharepams='WXSceneTimeline'
				}
				uni.share({
					title:this.deit.title,
					provider: "weixin",
					scene: sharepams,
					imageUrl:'https://wangzhexitong.oss-cn-chengdu.aliyuncs.com/product/about.png',
					href:this.deit.content[that.currindex].file_url,
					type: 0,
					success: function (res) {
						
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
				that.$refs.popup.close()
				that.api.source.sourceShare({
					id:that.id,
					content:this.deit.content[that.currindex].file_url,
					share_link:this.deit.content[that.currindex].file_url
				}).then(res=>{
					if(res.code==200)
					{
						that.getdeitals(that.id)
						that.self_get();
					}
					
				}).catch(err=>{
					uni.showToast({
						title:err.message,
						icon:'none'
					})
				})
			},
			
			
			
			saveImage: function(pams) {
				var that = this;
				uni.saveImageToPhotosAlbum({
					filePath : this.deit.content[that.currindex].file_url ,
					success: function (res3) {
						
						uni.showToast({
							title:'下载成功,保存至手机相册',
							icon:'none'
						})
						that.getdeitals(that.id)
						that.api.source.sourceDownload({
							id:that.id,
							content:this.deit.content[that.currindex].file_url
						}).then(res=>{
							if(res.code==200)
							{
								that.getdeitals(that.id)
								that.self_get();
							
							}
							
						})
						
						
					},
				});
									
			},
			self_get()
			{
				console.log('大幅度',this.$store.state)
				if(this.$store.state.ste_task_ids.length ==undefined)
				{
					return
				}
				this.api.interactive.getUsertask({
					 task_list:this.$store.state.ste_task_ids
				 }).then(res=>{
					 if(res.code==200)
					 {
						 this.$store.commit('set_task_ids',0)
						 this.isshows=false
					 }
					 
				 })
			},
			sourcePrises()
			{
				this.api.source.sourcePrise({
					id:this.id,
					content:this.deit.content[this.currindex].file_url
				}).then(res=>{
					if(res.code==200)
					{
						uni.showToast({
							title:'点赞成功!',
							icon:'none'
						})
						this.getdeitals(this.id)
						return
					}
					console.log('item',res)
				})
			},
			
			// previewImg(index) {
			// 	let _this = this;
			// 	let imgsArray = [];
			// 	for (let i = 0; i < this.deit.content.length; i++) 
			// 	{
			// 		imgsArray.push(this.deit.content[i].file_url);
			// 	}
				
			// 	uni.previewImage({
			// 	current: index - 1,
			// 	urls: imgsArray,
			// 	indicator: 'number',
			// 	loop: true
			// 	});
			// },
		// 	start(e){               
		// 	    this.startData.clientX=e.changedTouches[0].clientX;             
		// 	    this.startData.clientY=e.changedTouches[0].clientY;
		// 	},
			
		// 	end(e){
		// 	    // console.log(e)
		// 	    const subX=e.changedTouches[0].clientX-this.startData.clientX;
		// 	    const subY=e.changedTouches[0].clientY - this.startData.clientY;
		// 	    // if(subY>50 || subY<-50){
		// 	    //     console.log('上下滑')
		// 	    // }else{
		// 	        if(subX>50){
			       
		// 				this.stnum--
		// 				if(this.stnum==0)
		// 				{
		// 					this.stnum=this.deit.content.length
		// 					this.deitimg=this.deit.content[0].file_url
		// 				}else{
		// 					this.deitimg=this.deit.content[this.stnum].file_url
		// 				}
		// 				console.log('sss',this.stnum)
						
		// 	        }else if(subX<-50){
						
		// 				this.stnum --
		// 	            console.log('this.stnum ',this.stnum)
		// 				if(this.stnum==0)
		// 				{
		// 					this.stnum=this.deit.content.length
		// 					this.deitimg=this.deit.content[0].file_url
		// 				}else{
		// 					this.deitimg=this.deit.content[this.stnum].file_url
		// 				}
						
		// 	        // }
		// 			// else{
		// 	  //           console.log('无效')
		// 			// 	var that=this;
		// 			// 	return
						
		// 	  //       }
		// 	    }
		// 	}
		
		}
		
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.imgsty{
		width: 96%;
		height: 90vh;
		margin: 0 auto;
		
	}
	.tmpX{
		text-align: center;
		padding: 20upx;
		background-color: chocolate;
		color: #fff;
		position: absolute;
		width: 100%;
		z-index: 99999;
	}
	.imglist{
		position: relative;
	}
	.imgsd{
		position: fixed;
		
		border-radius: 100%;
		bottom: 120upx;
	}
	.innbox{
		
		background-color: #fff;
		margin-left: 25vw;
		padding: 10upx 50upx;
		border-radius: 30upx;
		
		text-align: center;
		
	}
	.imgsty image{
		width: 100%;
		height: 100%;
	}
	.fiexv{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	.setmpg{
		padding: 40upx;
		background: #333333;
		color: #fff;
	}
	.swiper-item image
	{
		width: 100%;
		height: 86vh;
	}
	/* #ifdef H5 */
	.swiper{
		height: 88vh;
	}
	/* #endif */
	/* #ifdef APP-PLUS */
	.swiper{
		height: 92vh;
	}
	/* #endif */
	
	
	
	
</style>