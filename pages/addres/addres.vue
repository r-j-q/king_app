<template>
	<view class="addresList">
		<view class="flexs iotops" :style="[{'paddingTop':statusBar+'px'}]">
			<view @click="goBack"><uni-icons type="left" color="#666" size="27"></uni-icons></view>
			
			<view class="sl" :class="tabs==1?'active':'noict'">收货地址</view>
			<view class="sr" style="font-size: 26upx;" :class="tabs==2?'active':'noict'" @click="addAddres">添加</view>
			
		</view>
		<view class="sNsWLgIORnguBTRlhjmk">
			<view id="scrollItem725"  v-for="(item,index) in addreslist" :key="item.id" class="_b2UFtJJGYLjPLSHM20l">
			
				<view class="Whzj9moa0BoED9Tm9ry1" @click="seleAddres(item)">
					<view class="yVYUmllSqXm_Jm3P6l5H">
						<view class="flexs CcQYnB5QVR4zjlGCJZxY">
							<view class="ismo" v-if="item.is_default==1">默认</view>
							<view class="xxdr2hHwJrIoXvxCLY7j">{{item.contact_name}}</view>
							<view class="lH6N7bK47ze8yqI6WKQG">{{item.contact_phone}}</view>
						</view>
						<view class="x_vVPpdr4azsOvipmLm2">
							<view>
								<uni-icons custom-prefix="iconfont" color="#999" type="icon-dingxiang" size="20"></uni-icons>
							</view>
							<view class="addit">
								<text>{{item.province}}</text>
								<text>{{item.district}}</text>
								<text>{{item.city}}</text>
								<text>{{item.address}}</text>
							</view>
							
						</view>
					</view>
				</view>
				
				<button class="Im4ineNUN25Ubnb5AnBn" @click="addAddres(item)">编辑</button>
				<button class="Im4ineNUN25Ubnb5AnBn" style="padding-left: 40upx;" @click="DeleAddres(item)">删除</button>
			</view>
			<view class="Y09VOLr0iHjLGRFFig8K"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar:'',
				tabs:1,
				addreslist:[],
				type:'',
				shopId:'',
				attstatus:'',
				snums:''
			}
		},
		created() {
		},
		onShow() {
			this.getApiaddres();
		},
		methods: {
			goBack()
			{
				
				uni.navigateBack(1)
				
			},
			seleAddres(pams)
			{
				
				if(this.type==1)
				{
					uni.navigateTo({
						url:'/pages/goodsDeitals/goodsDeitals?shopId='+this.shopId+'&addId='+pams.id
					})
				}else if(this.type==2)
				{
					uni.navigateTo({
						url:'/pages/confirmOrder/confirmOrder?shopId='+this.shopId+'&attstatus='+this.attstatus+'&addId='+pams.id+'&snums='+this.snums
					})
				}else if(this.type==3)
				{
					uni.navigateTo({
						url:'/pages/confirmOrder/confirmOrder?cartStatus=1'+'&addId='+pams.id
					})
				}
				// uni.navigateBack(1)
				
			},
			addAddres(pams)
			{
				
				if(pams.id >0 && pams.id !=undefined)
				{
					var id=pams.id
				}else{
					var id=this.shopId+'&type='+this.type+'&attstatus='+this.attstatus
				}
				uni.navigateTo({
					url:'/pages/addAddres/addAddres?shopId='+id
				})
			},
			
			DeleAddres(item)
			{
				uni.showModal({
					title:'提示',
					content:'确定删除改地址吗?',
					success: (res) => {
						if (res.confirm)
						{
							this.api.interactive.DeleAddres({
								id:item.id
							}).then(res=>{
								if(res.code===200)
								{
									uni.showToast({
										title:'删除成功！',
										icon:'none'
									})
									this.getApiaddres()
								}
							})
										
						}
					}
				})
				
			},
			getApiaddres()
			{
				this.api.interactive.getAddres().then(res=>{
					if(res.code===200 && res.data.length >0)
					{
						this.addreslist=res.data
					}else{
						this.addreslist=[]
					}
				})
			}
		},
		onLoad(options) {
			var that=this;
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
				  statusBar = e.statusBarHeight
				  customBar = e.statusBarHeight + 45;
				  that.statusBar=e.statusBarHeight+16;
				  
				}
			})
			if(options.type)
			{
				that.type=options.type
			}
			if(options.shopId)
			{
				that.shopId=options.shopId
			}
			if(options.attstatus)
			{
				that.attstatus=options.attstatus
			}
			if(options.snums)
			{
				this.snums=options.snums
			}
			// console.log('optiosn',options)
		},
	}
</script>

<style>
	page{
		background-color: #fff;
		
	}
	.iotops{
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 20upx;
		border-bottom: 1upx solid #ccc;
		background-color: #fff;
		align-items: center;
	}
	.sr{
		font-size: 24upx;
	}
	
	
	.sNsWLgIORnguBTRlhjmk ._b2UFtJJGYLjPLSHM20l {
	   
	    display: flex;
	    padding: 40upx 20upx;
	    font-size: 0.8rem;
	    justify-content: space-between;
		align-items: center;
		border-bottom:1px solid #ccc;
		
	}
	.sNsWLgIORnguBTRlhjmk ._b2UFtJJGYLjPLSHM20l .Whzj9moa0BoED9Tm9ry1 {
	   
	   
	    flex: 1;
	}
	.ismo{
		color: #fff;
		    background-color: #ef8200;
		    border-radius: 5px;
		    width: 60upx;
		    text-align: center;
		    
		    justify-content: space-between;
		    padding: 10upx
	}
	.x_vVPpdr4azsOvipmLm2{
		margin-top: 30upx;
		display: flex;
		align-items: center;
	}
	.addit text{
		padding: 0 10upx;
	}
	.CcQYnB5QVR4zjlGCJZxY{
		justify-content: flex-start;
		align-items: center;
		
	}
	.xxdr2hHwJrIoXvxCLY7j{
		margin-left: 20upx;
		margin-right: 20upx;
	}
	.Im4ineNUN25Ubnb5AnBn{
		font-size: 0.8rem;
	}
</style>
