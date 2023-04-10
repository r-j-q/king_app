<template>
	<view class="recovedMess">
	
		<view class="reco-content">
			<view v-for="(item,index) in relist" :key="index" class="innerMess">
				<view class="recot idf">
					
						<view class="flexs">
							<view v-if="item.status === 0">审核中:</view>
							<view class="canbut" @click="cansub(item.id)" v-if="item.status === 0">撤销审核</view>
						</view>
						<view v-if="item.status === 1">审核通过:</view>
						<view v-if="item.status === 2">
							已驳回:{{item.rejection_comment}}
						</view>
						<view v-if="item.status === 3">
							状态:{{item.rejection_comment}}
						</view>
					
					<view class="gImg" v-if="item.status==1">
						<image :src=item.withdraw_file_url></image>
					</view>
				</view>
				<view class="rdate">
					时间：{{getCurrentTime(item.created_at)}}
				</view>
				<view class="flexs tng">
					<view class="bdet">
						{{item.withdraw_type === 0 ? '银行卡提现' : '其他方式'}}
					</view>
					<view class="bmon">
						￥{{item.withdraw_in_cents/100}}
					</view>
				</view>
				
				<view class="flexs bmonet ot-mon">
					<view class="twe">
						<view class="">
							手续费:￥{{item.service_charge_in_cents/100}}
						</view>
						
						<view class="">
							代扣税:￥{{item.tax_in_cents/100}}
						</view>
					</view>
					<view class="">
						到账金额:￥{{item.should_pay_in_cents/100}}
					</view>
					
				</view>
			</view>
		
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				relist:[]
			}
		},
		created() {
			this.userApplication()
		},
		
		methods: {
			userApplication()
			{
				this.api.interactive.getApplication().then(res=>{
					
					if(res.code===200 && res.data.length >0)
					{
						this.relist=res.data
					}
				})
			},
			
			cansub(pams)
			{
				uni.showModal({
					title:'提示',
					content:'确认撤销本次提现吗?',
					success: (res) => {
						if(res.confirm)
						{
							
							this.api.source.usercancel(pams).then(res=>{
								
								if(res.code==200)
								{
									this.userApplication()
									uni.showToast({
										title:'撤销成功',
										icon:'none'
									})
								}
							}).catch(err=>{
								
								console.log('ere',err)
								uni.showToast({
									title:err.message,
									icon:'none'
								})
							})
						}
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
	.recovedMess{
		border-top: 1upx solid #ccc;
	}
	.reco-content{
		
		margin-bottom: 20upx;
	}
	.innerMess{
		background-color: #fff;
		padding: 30upx;
		width: 88%;
		margin: 20upx auto;
		border-radius: 20upx;
		
		
	}
	
	.btp{
		padding-top: 30upx;
	}
	.rdate{
		font-size: 26upx;
		color: #999;
		padding-top: 30upx;
	}
	.sh-f{
		font-size: 28upx;
		color: #666666;
		display: flex;
		align-items: center;
		padding: 40upx 0;
	}
	.gImg{
		padding-left: 60upx;
		padding-top: 30upx;
	}
	.canbut{
		background: #128DDA;
		font-size: 26upx;
		padding: 10upx 18upx;
		color: #fff;
		border-radius: 30rpx;
	}
	.gImg image{
		width: 200upx;
		height: 200upx;
		padding-left: 6upx;
	}
	.bdet{
		font-size: 32upx;
		color: #333;
		font-weight: 600;
	}
	.bmon{
		font-size: 30upx;
		color: #D02B14;
		font-weight: bold;
	}
	.bmonet{
		align-items: flex-end;
		padding-top: 20upx;
	}
	.tng{
		padding-top: 30upx;
		align-items: self-end;
	}
	.idf{
		border-bottom: 1upx solid #ccc;
	}
	.ot-mon{
		color: #999;
		font-size: 26upx;
	}
	.twe{
		line-height: 38upx;
	}
	.recot {
		align-items: baseline;
		padding-bottom: 20upx;
	}
</style>
