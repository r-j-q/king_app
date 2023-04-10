<template>
	<view class="mangeList">
		<view class="manMess">
			<view class="flexs mantabs">
				<view>在售商品</view>
				<view class="isput" @click="upshop">+上架商品</view>
			</view>
			<view class="manageWith" v-for="(item,index) in actlist" :key="index">
				<view class="maImg">
					<image :src=item.cover_image_url></image>
					<view class="cateName">{{item.category_name}}</view>
				</view>
				<view class="manInre">
					<view class="manageName">
						{{item.name}}
					</view>
					<view class="manNums">
						<text>￥ {{item.price_in_cents/100}}</text>
						<text>库存：{{item.stock_count}}</text>
					</view>
					<view class="setlower" :class="lowerarr.includes(item.id) ?'disabled':''" @click="setlower(item)">
						下架
					</view>
				</view>
				
			</view>
		</view>
		<view class="save-set">
			<view class="set-but" :class="lowerarr.length >0 ?'isset':''">
				<button :disabled="lowerarr.length <=0?'disabled':false" @click="saveSets">保存设置</button>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				page:1,
				page_size:10,
				actlist:[],
				lowerarr:[],
				ispage:true
			}
		},
		onLoad(opt) {
			if(opt.storeId)
			{
				this.manageList(opt.storeId);
				this.store_id=opt.storeId
			}
		},
		methods:{
			manageList(id)
			{
				if(!this.ispage)
				{
					return false
				}
				
				this.api.store.manageApp({
					id,
					is_for_sale:1,
					page:this.page,
					page_size:this.page_size
				}).then(res=>{
					if(res.code==200 && res.data.data.length >0)
					{
						if (this.page>1)
						{
							
							res.data.data=this.actlist.concat(res.data.data)
						}
						this.actlist=res.data.data
					}else{
						if (res.data.data.length==0)
						{
							this.ispage=false
							uni.showToast({
								title:'没有更多数据!',
								icon:'none',
								duration:1000
							})
							return;
						}
					}
					
				})
			},
			setlower(item)
			{
				
				if (this.lowerarr.includes(item.id)) {
				  this.lowerarr.splice(this.lowerarr.indexOf(item.id), 1);
				} else {
				  this.lowerarr.push(item.id);
				}
				
			},
			saveSets()
			{
				console.log('sssff',this.lowerarr)
				if(this.lowerarr <=0)
				{
					return
				}
				this.api.store.productAPP({
					is_for_sale:false,
					ids:this.lowerarr
				}).then(res=>{
					if(res.code==200)
					{
						uni.showToast({
							title:'下架成功!',
							icon:'none'
						})
						this.manageList(this.store_id)
					}
				})
			},
			upshop()
			{
				uni.navigateTo({
					url:'/pages/my/shelves?storeId='+this.store_id
				})
			}
		}
		,onReachBottom() {
			this.page++
			this.manageList(this.store_id)
			
		}
	}
	
</script>

<style>
	page{
		background-color: #fff;
	}
	.mantabs{
		padding: 30upx;
	}
	.maImg image{
		width: 140upx;
		height: 140upx;
	}
	.maImg{
		position: relative;
	}
	.cateName{
		position: absolute;
		bottom: 0;
		top: 0;
		right: 0;
		font-size: 20upx;
		background-color: #ef8200;
		height: 40upx;
		line-height: 40upx;
		padding: 2upx 10upx;
		color: #fff;
	}
	.manageWith{
		display: flex;
		padding: 30upx;
		border-bottom: 1upx solid #f5f5f5 ;
	}
	.manInre{
		padding-left: 20upx;
		font-size: 26upx;
	}
	.manNums{
		padding: 10upx 0;
	}
	
	.setlower{
		font-size: 24upx;
		background: #f76252;
		width: 120upx;
		padding: 8upx 10upx;
		text-align: center;
		color: #fff;
		border-radius: 40upx;
		margin-top: 6upx;
	}
	.manNums text:nth-child(1)
	{
		font-size: 26upx;
		font-weight: bold;
		color: #ef8200;
	}
	.manNums text:nth-child(2)
	{
		padding-left: 20upx;
		color: gray;
		font-size: 24upx;
	}
	.isput{
		color: #ef8200;
		font-size: 28upx;
	}
	.save-set{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.set-but button{
		
		background: gray;
		height: 80upx;
		width: 80vw;
		line-height: 80upx;
		font-size: 28upx;
		color: #fff;
		border-radius: 40upx;
	}
	.disabled{
		background: gray;
	}
	.isset button{
		background-color: #ef8200;
	}
</style>