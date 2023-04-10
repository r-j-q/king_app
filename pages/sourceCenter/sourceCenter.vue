<template>
	<view class="sourCrent">
		<view class="search-with nfs" :style="[{'paddingTop':statusBar+'px'}]">
		<view class="">
			<view class="flexs iotops sumap">
				<view class="plback" @click="goBack">
					<uni-icons type="left" color="#666" size="27"></uni-icons>
				</view>
				<view class="surcoe">
					<view class="sl" :class="tabs==3?'active':'noict'" @click="ioTabs(3)">图片素材</view>
					<view class="sr" :class="tabs==4?'active':'noict'" @click="ioTabs(4)">文章素材</view>
				</view>
			</view>
			
			
			<block v-if="isTop ==1">
				<view class="search-input surwith">
					<uni-search-bar placeholder="输入关键字" @blur="blur" shight="70" bgColor="#F4F7FD" :focus="false" v-model="keywords" cancelButton="none" @clear="clear" radius="100"></uni-search-bar>
				</view>
				
				<view class="flexs cateIcon" v-if="arr && arr.length >0">
					<view v-for="(item,index) in arr"  :key="item.id" class="setmang"  :class="index==state?'setback':''" @click="getcate(item.id,index)">
						<view v-if="item.icon" class="cateImg">
							<image  :src=item.icon.file_url></image>
						</view>
						<view class="cateName">
							{{item.name}}
						</view>	
					</view>
				</view>
			</block>
			
			<view class="flexs surOrder">
				
				<view class="hotCate" @click="sOrder">
					热度
					
						<uni-icons v-if="sort=='asc'" custom-prefix="iconfont" color="#000" type="icon-paixu-xia" size="8"></uni-icons>
						<uni-icons v-else custom-prefix="iconfont" color="#000" type="icon-paixu-shang" size="8"></uni-icons>
					
				
				</view>
				<view class="dateCate" @click="sOrders">
					上传日期
					<uni-icons v-if="sort1=='asc'" custom-prefix="iconfont" color="#000" type="icon-paixu-xia" size="8"></uni-icons>
					
						<uni-icons v-else custom-prefix="iconfont" color="#000" type="icon-paixu-shang" size="8"></uni-icons>
						
					
					
				</view>
			</view>
			
		</view>
		
		</view>
		<block v-if="tabs==3">
			
			<view v-for="(item,index) in imglist" :key="item.id" @click.stop="goImgDeitals(item)" class="imgCloun">
				<view class="sourImg">
					<image :src=item.cover.file_url mode="aspectFill"></image>
					<!-- <view class="showmums">1/6</view> -->
				</view>
				<view class="imgmag">
					<view class="imgIntr">
						<view class="imgCate">
							<text>{{item.source_category?item.source_category.name:''}}</text>
							<text>{{item.store.name}} {{getCurrentTime(item.created_at)}}</text>
						</view>
					</view>
					<view class="imgTit">
						{{item.title}}
					</view>
					<view class="flexs ImgNums">
						<view>
							<text>
								<uni-icons custom-prefix="iconfont" color="#000" type="icon-31dianzan" size="20"></uni-icons>
							</text>
							<text>{{item.praise_count}}人赞过</text>
						</view>
						<view>
							<text>
								<uni-icons custom-prefix="iconfont" color="#000" type="icon-xiazaidaoru" size="20"></uni-icons>
							</text>
							<text>{{item.download_count}}人</text>
						</view>
						<view>
							<text>
								<uni-icons custom-prefix="iconfont" color="#000" type="icon-fenxiang" size="20"></uni-icons>
							</text>
							<text>{{item.share_count}}人</text>
						</view>
			
						
					</view>
				
				</view>
			</view>
			
		</block>
		<block v-if="tabs==4">
			<view class="attrcile-cloumn">
				<view @click.stop="goAttrdeitals(item)" v-for="(item,index) in imglist" :key="item.id" class="flexs attrcileImg">
					<view class="attrimg">
						<image :src=item.cover.file_url mode="aspectFit"></image>
					</view>
					<view class="attrMess">
						<view class="attrdeit">
							{{item.title}}
						</view>
						<view class="attrIntr" style="padding-top: 4upx;">
							{{item.description}}
						</view>
						<view class="authName">
							<text>{{item.store.name}}</text>
							<text style="padding-left: 10upx;">&nbsp; {{getCurrentTime(item.created_at)}}</text>
						</view>
						<view class="flexs ImgNums setmpg">
							<view>
								<text>
									<uni-icons custom-prefix="iconfont" color="#000" type="icon-31dianzan" size="20"></uni-icons>
								</text>
								<text>{{item.praise_count}}人赞过</text>
							</view>
							<view>
								<text>
									<uni-icons type="chat" size="20"></uni-icons>
								</text>
								<text>{{item.comment_count}}人</text>
							</view>
							<view>
								<text>
									<uni-icons custom-prefix="iconfont" color="#000" type="icon-fenxiang" size="20"></uni-icons>
								</text>
								<text>{{item.share_count}}人</text>
							</view>
						
						</view>
							
					</view>
								
				</view>
							
			</view>
		
		</block>
	</view>
</template>

<script>
	
	
	export default {
		data() {
			return {
				statusBar:0,
				tabs:3,
				searchValue:'',
				imglist:[],
				ispage:true,
				page:1,
				page_size:10,
				task_id:'',
				watch_count:'praise_count',
				sort:'asc',
				sort1:'asc',
				ortype:'',
				value: 0,
				arr:[],
				category_id:'',
				state:0,
				isTop:1,
				customBar:'',
				keywords:'',
				flag:false,
				  range: [
					{ value: 0, text: "篮球" },
					{ value: 1, text: "足球" },
					{ value: 2, text: "游泳" },
				  ],
				  isshow:true
			}
		},
		created() {
			this.sourceCategory()
		},
		onLoad(options) {
			var that=this
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					this.customBar = e.statusBarHeight;
					that.statusBar=e.statusBarHeight+8; 
				}
			});
			if(options.task_id && options.task_id)
			{
				that.task_id=options.task_id
				this.tabs=options.type
			}
			
		},
		onShow() {
			this.getImgList(this.tabs)
			this.isshow=true
		},
		
		methods: {
			sourceCategory()
			{
				this.api.source.sourceCategory({
					type:this.tabs
				}).then(res=>{
					console.log('red',res)
					 this.arr=[]
					res.data.map((item,index)=>{
						let obj={}
							if(item.icon !=null && item.icon.file_url)
							{
								obj.name=item.name.split('|').pop().trim(),
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
				this.imglist=[];
				this.getImgList(this.tabs);
				
			},
			ishsowCate()
			{
				this.isshow =! this.isshow
				this.state=0
			},
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
			sOrder()
			{
				this.watch_count='praise_count'	
				
				if(this.sort=='asc')
				{
					this.sort='desc'
				}else{
					this.sort='asc'
				}
				this.ispage=true
				this.page=1;
				this.getImgList(this.tabs);
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
				this.getImgList(this.tabs);
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
			blur(res) {
			
				
				this.keywords=res.value
				this.imglist=[]
				this.ispage=true
				this.getImgList(this.tabs)
			},
			clear(res) {
				this.keywords=''
				this.imglist=[]
				this.ispage=true
				this.getImgList(this.tabs)
			},
			ioTabs(pams)
			{
				this.ispage=true;
				this.page=1
				this.tabs=pams;
				this.imglist=[];
				this.arr=[]
				this.category_id='',
				this.isshow=true
				this.getImgList(pams);
				
				this.sourceCategory()
				
			},
			goImgDeitals(iem)
			{
				uni.navigateTo({
					url:'/pages/sourceCenter/imgdeitals?id='+iem.id+'&task_id='+this.task_id
				})
			},
			goAttrdeitals(item)
			{
				uni.navigateTo({
					url:'/pages/sourceCenter/attrDeitals?id='+item.id
				})
			},
			
			getImgList(pams)
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
				this.api.source.sourceList(
				{
					type:pams,
					page:this.page,
					page_size:pams==3?this.page_size:7,
					keywords:this.keywords,
					order_by:this.watch_count,
					category_id:this.category_id,
					sort:this.watch_count=='praise_count'?this.sort:this.sort1
				}).then(res=>{
					
					if(res.code==200 && res.data.data.length >0)
					{
						
						uni.hideLoading()
						if (this.page>1)
						{
							res.data.data=this.imglist.concat(res.data.data)
						}
						
						this.imglist=res.data.data
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
			
			
			
		},
		
		onReachBottom() {
			this.page++
			this.getImgList(this.tabs);
			
		}
		
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.skee{
		line-height: 60upx;
		font-size: 26upx;
	}
	.sumap{
		/* margin-top: 15upx; */
		border-bottom: 2upx solid #ccc!important;
		padding-bottom: 30upx!important;
		justify-content: flex-start;
		
	}
	.nfs{
		z-index: 99;
		background-color: #fff;
		display: block;
		padding-left: 0;
		top: 0;
		width: 100%;
		
	}
	.surcoe{
		display: flex;
		grid-gap: 40upx;
		align-items: center;
		color: #333;
		justify-content: center;
	}
	.plback{
		margin-right: auto;
	}
	.active{
		font-size: 32upx;
		font-weight: bold;
	}
	
	.surOrder{
		justify-content: flex-end;
		grid-gap: 30upx;
		padding: 20upx 30upx;
		font-size: 26upx;
		color: #333;
		position: relative;
		font-size: 26upx;
	}
	.ishowca{
		position: absolute;
		width: 260upx;
		padding: 20upx 40upx;
		background-color: #fefefe;
		z-index: 9;
		margin-top: 10upx;
		border-radius: 20upx;
		 box-shadow: 0 0 20px 5px rgb(0 0 0 / 30%);
		 text-align: center;
	}
	
	
	
	
	.surOrder .uni-icons{
		padding-left: 10upx;
	}
	.imgCloun{
		padding-bottom: 20upx;
	}
	.imgmag{
		padding: 30upx;
	}
	.sourImg image{
		height: 500upx;
		width: 100%;
	}
	.sourImg{
		position: relative;
	}
	.showmums{
		position: absolute;
		right: 0;
		bottom: 0;
		background-color: #999999;
		margin: 30upx 40upx;
		padding: 5upx 30upx;
		font-size: 26upx;
		border-radius: 30upx;
		color: #fff;
		
	}
	.ImgNums{
		justify-content: flex-start;
		margin-top: 20upx;
		grid-gap: 30upx;
		font-size: 24upx;
	}
	.ImgNums text:nth-of-type(2){
		padding-left: 10upx;
		color: #999;
	}
	.imgCate text:nth-of-type(1)
	{
		font-size: 30upx;
		font-weight: 600;
	}
	.imgTit{
		font-size: 24upx;
		padding-top: 10upx;
	}
	.imgCate text:nth-of-type(2)
	{
		font-size: 22upx;
		color: #999;
		margin-left: 20upx;
	}
	
	.attrcile-cloumn{
		border-top: 1upx solid #efefef;
	}
	.attrcileImg{
		justify-content: flex-start;
		padding: 30upx;
		border-bottom: 4upx solid #efefef;
	}
	.attrMess{
		padding-left: 20upx;
	}
	.noict{
		color: #CCCCCC;
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
		margin-top: 10upx;
	}
	.attrimg image{
		width: 180upx;
		height: 180upx;
		
	}
	
	.iscalss{
		
		position: fixed;
		background: #fff;
		z-index:9999;
		padding: 30upx 52upx;
		border-bottom: 1px solid #ccc;
		top:0;
		left: 0;
		right: 0;
	}
	.iscalss view{
		color: #000!important;
	}
	
</style>
