<template>
	
	<view class="memList">
		<view class="flexs searflex">
			<view class="search-input">
				<uni-search-bar placeholder="输入搜索内容" bgColor="#F4F7FD"   :focus="false" v-model="keywords" cancelButton="none" radius="100"  @clear="clear" height="40"></uni-search-bar>
			</view>
			<view class="serchafe" @click="keywordschange">搜索</view>
		</view>
		<!-- <view class="flexs hist-date">
			<view>
				<text>7月12日</text>
				<text style="padding-left:16upx ;">星期一</text>
			</view>
			<view>
				2022年
			</view>
		</view> -->
		<view class="mem-with swline" v-for="(item,index) in hilist" :key="item.id" @click="histDeitals(item)">
			
			<view class="flexs allfx ">
				<view class="memImg">
					<image v-if="item.user.avatar_file_url" :src=item.user.avatar_file_url></image>
					<image v-else src="/static/img/logo.png"></image>
				</view>
				<view class="memName">
					<view>{{item.title}}</view>
					<view class="hitime">
						<text >时间：{{item.length_of_time >0 ?(item.length_of_time/60).toFixed(2):0}}分钟</text>
						<text>发起人：{{item.host_name}}</text>
					</view>
				</view>
				<view class="memflex">
					<uni-icons type="forward" size="24"></uni-icons>
				</view>
			</view>
		</view>
		
		<!-- <view class="flexs hist-date">
			<view>
				<text>7月12日</text>
				<text style="padding-left:16upx ;">星期一</text>
			</view>
			<view>
				2022年
			</view>
		</view> -->
		<!-- <view class="mem-with swline">
			
			<view class="flexs allfx ">
				<view class="memImg">
					<image src="../../static/img/sm.jpg"></image>
				</view>
				<view class="memName">
					<view>王五的会议</view>
					<view class="hitime">
						<text>时间：23:39</text>
						<text>发起人：张三</text>
					</view>
				</view>
				<view class="memflex">
					<uni-icons type="forward" size="24"></uni-icons>
				</view>
			</view>
		</view> -->
		<!-- <view class="mem-with swline">
			
			<view class="flexs allfx ">
				<view class="memImg">
					<image src="../../static/img/sm.jpg"></image>
				</view>
				<view class="memName">
					<view>王五的会议</view>
					<view class="hitime">
						<text>时间：23:39</text>
						<text>发起人：张三</text>
					</view>
				</view>
				<view class="memflex">
					<uni-icons type="forward" size="24"></uni-icons>
				</view>
			</view>
		</view> -->
							
	</view>
	
</template>

<script>
	export default
	{
		data()
		{
			return {
				statusBar:0,
				hilist:[],
				searchValue:'',
				page:1,
				page_size:20,
				ispage:true,
				keywords:''
			}
		},
		created()
		{
			this.getFinish()
		},
		methods:{
			keywordschange()
			{
				if(!this.keywords)
				{
					uni.showToast({
						title:'输入搜索内容！',
						icon:'none'
					})
					return
				}
				this.hilist=[]
				this.ispage=true
				this.page=1
				this.getFinish()
			},
			clear(res) 
			{
				this.page=1
				this.keywords=''
				this.hilist=[]
				this.ispage=true
				this.getFinish()
			},
			getFinish()
			{
				if(!this.ispage)
				{
					return false
				}
				
				uni.showLoading({
					
					title:'加载中...',
					icon:'none',
					mask:true
				})
				this.api.voice.getFinish({
					page:this.page,
					page_size:this.page_size,
					keywords:this.keywords?this.keywords:''
					
				}).then(res=>{
					uni.hideLoading()
					if(res.code==200 && res.data.data.length >0)
					{
						// this.hilist=res.data.data
						
						if (this.page>1)
						{
							res.data.data=this.hilist.concat(res.data.data)
						}
						this.hilist=res.data.data
					}else{
						this.ispage=false;
						
						uni.showToast({
							title:'没有更多数据!',
							icon:'none',
							duration:1000
						})
						
						return;
					}
				})
			},
			histDeitals(item)
			{
				uni.navigateTo({
					url:'./histDeitals?code='+item.code
				})
			}
		},
		onReachBottom() {
			
			this.page++
			
			this.getFinish();
			
		},
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.searflex{
		align-items: center;
	}
	.serchafe{
		margin-right: 32upx;
		font-size: 28upx;
		color: #1488FF;
	}
	.memImg image{
		width: 80upx;
		height: 80upx;
		border-radius: 100%;
	}
	.memflex image
	{
		width: 48upx;
		height: 48upx;
	}
	.memflex{
		margin-right: -20rpx;
	}
	.hist-date{
		padding: 40upx 32upx 32upx 32upx;
		font-size: 28upx;
		color: #666;
	}
	.mem-with{
		padding: 26upx 52upx;
	}
	.allfx{
		justify-content: flex-start;
		align-items: center;
	}
	.memName view:nth-child(1)
	{
		font-size: 28upx;
		font-weight: 600;
	}
	.hitime{
		font-size: 26upx;
		color: #666;
	}
	.hitime text:nth-child(2)
	{
		padding-left: 16upx;
	}
	.memName view:nth-child(2)
	{
		font-size: 22upx;
		color: #666666;
		padding-top: 16upx;
	}
	.memName{
		padding-left: 34upx;
		flex: 1;
		text-align: left;
	}
	.searflex{
		margin-left: 10upx;
	}
	.swline
	{
		padding-top: 28upx;
		border-bottom: 4upx solid #F0F0F0;
		padding-bottom: 26upx;
	}
</style>