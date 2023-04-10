<template>
	<view class="mangeList">
		<view class="manMess">
			<view class="flexs mantabs">
				<view :class="stat==0?'active':''" @click="allstatus(0)">全部</view>
				<view :class="stat==1?'active':''" @click="allstatus(1)">活动区</view>
				<view :class="stat==2?'active':''" @click="allstatus(2)">平价区</view>
				<view :class="stat==3?'active':''" @click="allstatus(3)">复购区</view>
			</view>
			<view class="manageWith" v-for="(item,index) in actlist" :key="index">
				<view class="maImg">
					<image :src=item.cover_image_url></image>
				</view>
				<view class="manInre">
					<view class="manageName">
						{{item.name}}
					</view>
					<view class="morecheck" @click="setEcheck(item,index)">
						<image v-if="!item.isshow" src="../../static/img/x.png"></image>
						<image v-else src="../../static/img/y.png"></image>
					</view>
					<view class="manNums">
						<text>￥ {{item.price_in_cents/100}}</text>
						<text>库存：{{item.stock_count}}</text>
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
				ispage:true,
				range: [{"value": '',"text": ""}],
				value:0,
				stat:0
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
			setEcheck(item,index)
			{
				// console.log('this.actlist',this.actlist[index])
				// console.log('item',item,index)
				if(this.actlist[index].isshow==false)
				{
					this.actlist[index].isshow=true
					var id=this.actlist[index].id
				}else{
					this.actlist[index].isshow=false
				}
				
				if (this.lowerarr.includes(id)) {
				  this.lowerarr.splice(this.lowerarr.indexOf(id), 1);
				} else {
				  this.lowerarr.push(id);
				}
				
			},
			allstatus(pams)
			{
				this.stat=pams
				this.actlist=[]
				this.page=1
				this.ispage=true
				this.manageList(this.store_id)
			},
			changesiT(e)
			{
				console.log('e',e)
			},
			manageList(id)
			{
				if(!this.ispage)
				{
					return false
				}
				if(this.stat >0)
				{
					
					var pams={
						id,
						is_for_sale:0,
						page:this.page,
						page_size:this.page_size,
						product_category_id:this.stat
					}
				}else{
					var pams={
						id,
						is_for_sale:0,
						page:this.page,
						page_size:this.page_size
					}
				}
				
				this.api.store.manageApp(pams).then(res=>{
					if(res.code==200 && res.data.data.length >0)
					{
						if (this.page>1)
						{
							res.data.data=this.actlist.concat(res.data.data)
						}
						res.data.data.map((item,index)=>{
							item.isshow=false
						})
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
				if(this.lowerarr <=0)
				{
					return
				}
				this.api.store.productAPP({
					is_for_sale:true,
					ids:this.lowerarr
				}).then(res=>{
					if(res.code==200)
					{
						uni.showToast({
							title:'上架成功!',
							icon:'none'
						})
						this.manageList(this.store_id)
					}
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
		border-bottom: 1upx solid #f5f5f5;
	}
	.maImg image{
		width: 140upx;
		height: 140upx;
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
	.morecheck{
		margin-left: 500upx;
		padding: 8upx 0;
	}
	.morecheck image{
		width: 40upx;
		height: 40upx;
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
	.active{
		padding-bottom: 20upx;
		border-bottom: 2upx solid #ef8200;
	}
	
	
</style>