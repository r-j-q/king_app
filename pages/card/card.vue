<template>
	<view>
		<view class="ZQ6nQOoy9twgzD4li2_H" v-if="cardlist && cardlist.length >0">
			<view class="afXu9l3RPtCfzXBMGYlw">
				<view class="flexs zxep4AZdCSivFvcz0Uwg">
						<view>总抽奖券数：</view>
						<view>{{tatNum}} 张</view>
				</view>
				<view class="RfPOBEVy4j6TXXxh69_z"></view>
					<view class="flexs _p7FFOTLhUQF4xEXpiXw" v-for="(item,index) in cardlist" :key="index">
						<view class="cardImg">
							<uni-icons custom-prefix="iconfont" color="#0C5290" type="icon-tianchongxing-" size="60"></uni-icons>
						</view>
						<view class="dZkPzWxoG0iCz2wjahgQ">
							<view>积分抽奖券</view>
							<view class="BRHcZlAYuOtGHNlqAOSA">发放时间：{{getCurrentTime(item.created_at)}}</view>
						</view>
					</view>
					<view v-if="cardlist && !cardlist.length" style="width: 100%; text-align: center;">
						<button style="padding: 0.5rem 1rem;">暂无数据</button>
					</view>
				<view class="e5jkPNLtM1JAMsWFgfAm"></view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				page_size:10,
				cardlist:[],
				tatNum:0,
				ispage:true
			}
		},
		methods: {
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
			 
			 getCardlist()
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
				 this.api.interactive.userTicket({
				 	is_used:0,
				 	is_enabled:1,
				 	page:this.page,
				 	page_size:this.page_size
				 	
				 }).then(res=>{
					uni.hideLoading()
				 	if(res.code==200 && res.data.data.length>0)
				 	{
						if (this.page>1)
						{
							res.data.data=this.cardlist.concat(res.data.data)
						}
						this.tatNum=res.data.total
						this.cardlist=res.data.data
				 	}else{
						if (res.data.data.length==0)
						{
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
		onLoad() {
			this.getCardlist();
		},
		onReachBottom() {
			this.page++
			this.getCardlist()
		}
	}
</script>

<style>
.ZQ6nQOoy9twgzD4li2_H{
	background-color: #fff;
}
.zxep4AZdCSivFvcz0Uwg,._p7FFOTLhUQF4xEXpiXw{
	padding:10upx 30upx;
	align-items: center;
	border-bottom: 1upx solid #f5f5f5;
}
.dZkPzWxoG0iCz2wjahgQ{
	line-height: 50upx;
}
.BRHcZlAYuOtGHNlqAOSA{
	font-size: 24upx;
	color: gray;
}
</style>
