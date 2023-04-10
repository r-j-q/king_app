<template>
	<view class="videoList">
		<view class="search-with nfs" :style="[{'paddingTop':statusBar+'px'}]">
			<view>
				<view class="flexs iotops sumap">
					<view class="plback" @click="goBack">
						<uni-icons type="left" color="#666" size="27"></uni-icons>
					</view>
					<view class="surcoe">
						<view class="videoName">{{type==1?'视频课堂':'音频课堂'}}</view>		
					</view>
					
				</view>
			</view>
			
			<block v-if="isTop ==1">
				<view class="search-input surwith">
					<uni-search-bar placeholder="输入关键字" @blur="blur" shight="70" bgColor="#F4F7FD"
					 :focus="false" v-model="keywords" cancelButton="none" @clear="clear" radius="100"></uni-search-bar>
				</view>
				
				<view class="flexs cateIcon" v-if="arr && arr.length >0">
					<view v-for="(item,index) in arr" :key="item.id" v-if="arr && arr.length >0" class="setmang" :class="index==state?'setback':''" @click="getcate(item.id,index)">
						<view v-if="item.icon" class="cateImg">
							<image  :src=item.icon.file_url></image>
						</view>
						<view class="cateName">
							{{item.name}}
						</view>	
					</view>
				</view>
			</block>
			
			
			<view class="flexs videoOrder" :class="isTop==0?'marg':''">
				<view @click="sOrder">最热</view>
				<view @click="sOrders">最新</view>
				
			</view>
		</view>
		
		
		<view class="attrcile-cloumn">
			
			<view @click.stop="goVideodeitals(item)" v-for="(item,index) in vlist" :key="index" class="flexs attrcileImg">
				<view class="attrimg">
					<image :src=item.cover.file_url mode="aspectFill"></image>
				</view>
				<view class="attrMess">
					<view class="attrdeit">
						{{item.title}}
					</view>
					<view style="padding-top: 6upx;" class="attrIntr">
						{{item.description}}
					</view>
					<view class="authName">
						<text>{{item.store.name}}</text>
						<text style="padding-left: 10upx;">{{getCurrentTime(item.created_at)}}</text>
					</view>
					<view class="flexs ImgNums setmpg">
						<view>
							<text>
								<uni-icons custom-prefix="iconfont" color="#000" type="icon-31dianzan" size="14"></uni-icons>
							</text>
							<text>{{item.praise_count}}人赞过</text>
						</view>
						<view>
							<text>
								<uni-icons custom-prefix="iconfont" color="#000" type="icon-24gf-playCircle" size="14"></uni-icons>
							</text>
							<text>{{item.watch_count}}人</text>
						</view>
						
					
					</view>
						
				</view>
							
			</view>
						
		</view>
				
	</view>
</template>

<script>
	export default{
		data()
		{
			return{
				searchValue:'',
				statusBar:0,
				page:1,
				page_size:10,
				ispage:true,	
				vlist:[],
				type:'',
				task_id:'',
				keywords:'',
				watch_count:'watch_count',
				sort:'asc',
				sort1:'asc',
				arr:[],
				state:'',
				isTop:1,
				category_id:''
			}
		},
		onLoad(options) {
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
			if(options.type && options.type !=undefined)
			{
				that.type=options.type
			}
			if(options.task_id && options.task_id !=undefined)
			{
				that.task_id=options.task_id
			}
		},
		created() {
			this.sourceCategory()
		},
		onShow()
		{
			this.sourceList()
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
			onPageScroll(e)
			{ 
				if (e.scrollTop >= 400) 
				{
					this.isTop = 0
				}
				if (e.scrollTop <= 100)
				{
					this.isTop = 1
				}
				
			},
			getcate(p,index)
			{
				this.state=index
				this.category_id=p
				this.ispage=true;
				this.page=1
				this.vlist=[]
				this.ispage=true
				this.sourceList()
				
			},
			sourceCategory()
			{
				this.api.source.sourceCategory({
					type:this.type
				}).then(res=>{
					
					 this.arr=[]
					res.data.map((item,index)=>{
						let obj={}
						
							if(item.icon !=null && item.icon.file_url)
							{
								obj.name=item.name.split('|').pop().trim()
								obj.id=item.id
								obj.icon=item.icon
							}
							if(obj.name)
							{
								this.arr.push(obj)
							
							}
						
					})
					
				})
			},
			
			blur(res) {
			
				
				this.keywords=res.value
				
				this.vlist=[]
				this.ispage=true
				this.sourceList()
			},
			clear(res) {
				this.keywords=''
				this.vlist=[]
				this.ispage=true
				this.sourceList()
			},
			sOrder()
			{
				
				
				this.watch_count='watch_count'	
				
				if(this.sort=='asc')
				{
					this.sort='desc'
				}else{
					this.sort='asc'
				}
				this.ispage=true;
				this.page=1;
				this.sourceList();
			},
			sOrders()
			{
				this.watch_count='created_at'
				if(this.sort1=='asc')
				{
					this.sort1='desc'
				}else{
					this.sort1='asc'
				}
				this.ispage=true
				this.page=1;
				this.sourceList();
			},
			sourcePrise(item)
			{
				
				this.api.source.sourcePrise({
					id:item.id
				}).then(res=>{
					console.log('item',res)
				})
			},
			goVideodeitals(item)
			{
				console.log('type',this.type)
				if(this.type==2)
				{
					uni.navigateTo({
						url:'/pages/lesson/mp3Deitals?id='+item.id+'&task_id='+this.task_id+'&type='+this.type
					})
				}else{
					uni.navigateTo({
						url:'/pages/lesson/videoDeitals?id='+item.id+'&task_id='+this.task_id+'&type='+this.type
					})
				}
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
			
			sourceList()
			{
				if(!this.ispage)
				{
					return false
				}
				uni.showToast({
					title:' ',
					icon:'loading',
					mask:true
				})
				this.api.source.sourceList({
					type:this.type,
					page:this.page,
					page_size:this.page_size,
					keywords:this.keywords,
					order_by:this.watch_count,
					category_id:this.category_id,
					sort:this.watch_count=='watch_count'?this.sort:this.sort1
				}).then(res=>{
					if(res.code==200 && res.data.data.length >0)
					{
						uni.hideLoading()
						if (this.page>1)
						{
							res.data.data=this.vlist.concat(res.data.data)
						}
						this.vlist=res.data.data
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
			}
		},
		onReachBottom() {
			this.page++
			this.sourceList();
			
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.videoName{
		font-size: 28upx;
		font-weight: 600;
	}
	.nfs{
		z-index: 99;
		background-color: #fff;
		display: block;
		padding-left: 0;
		
	}
	.surcoe{
		color: #333;
	}
	
	
	  .sumap
	{
		justify-content: flex-start;
		border-bottom: 2upx solid #ccc!important;
		padding-bottom: 30upx!important;
		/* padding: 10upx; */
		
	}
	.videoBanner image{
		width: 100%;
		height: 300upx;
	}
	
	.videoOrder{
		justify-content: flex-end;
		padding-bottom: 20upx;
		padding-right: 30upx;
		grid-gap: 40upx;
		font-size: 26upx;
	
	}
	.marg{
		margin-top: 30rpx;
	}
	
	.attrcileImg{
		justify-content: flex-start;
		padding: 30upx;
		border-bottom: 4upx solid #efefef;
	}
	.attrMess{
		padding-left: 40upx;
	}
	.attrdeit{
		font-size: 28upx;
		font-weight: 600;
		overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 1;
		    line-clamp: 1;
		    -webkit-box-orient: vertical;
	}
	.attrIntr{
		font-size: 22upx;
		color: #666;
		line-height: 32upx;
		overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    line-clamp: 2;
		    -webkit-box-orient: vertical;
		
	}
	.authName{
		font-size: 20upx;
		color: #999;
		padding-top: 10upx;
	}
	.setmpg{
		margin-top: 18upx;
		justify-content: flex-start;
		font-size: 22upx;
		grid-gap: 60upx;
	}
	.setmpg text:nth-of-type(2)
	{
		padding-left: 10upx;
	}
	.attrimg image{
		width: 180upx;
		height: 180upx;
		border-radius: 20upx;
	}
</style>