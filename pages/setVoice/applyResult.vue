<template>
	<view class="appResu">
		<view class="subres">
			您的开通新账号申请已经提交，请耐心等待工作人员审核
		</view>
		<view class="stepSf">
			<uni-steps :options="list2" :settype=1 active-color="#007AFF" :active="active" direction="column" />
		</view>
		<block v-if="status==2">
			<view class="knows">
				<button @click="goapply">重新申请</button>
			</view>
		</block>
		<block v-else>
			<view class="knows">
				<button @click="navStep">我知道了</button>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default
	{
		data()
		{
			return{
				active: 0,
				times:'',
				status:'',
				list2: [
					{
					title: '提交成功，待审核',
					desc: '2018-11-11'
					},
					{
					title: '审核完成',
					desc: ''
					},
				]
			}
		},
		onLoad(options) {
			
			if(options.times && options.times !=undefined)
			{
				this.times=JSON.parse(options.times)
				this.list2[0].desc=this.getCurrentTime(this.times.created_at)
				this.status=options.status
				if(this.times.audit_at)
				{
					this.active=1
					this.list2[1].desc=this.getCurrentTime(this.times.audit_at)
					this.list2[1].title='平台拒绝申请'
				}
				
			}
		},
		methods:{
			navStep()
			{
				uni.navigateTo({
					url:'/pages/setVoice/subAccount'
				})
			},
			goapply()
			{
				uni.navigateTo({
					url:'/pages/setVoice/applyacc'
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
	page{
		background-color: #fff;
	}
	.subres{
		background-color: #CCE1FD;
		margin-top: 40upx;
		font-size: 24upx;
		color: #333333;
		height: 84upx;
		text-align: center;
		line-height: 84upx;
	}
	.uni-steps__column{
		flex-direction: column!important;
	}
	
	.stepSf{
		padding: 84upx 52upx;
	}
	.knows{
		margin-top: 80upx;
	}
	.knows button{
		background-color: #128DDA;
		height: 80upx;
		line-height: 80upx;
		width: 80%;
		font-size: 28upx;
		color: #fff;
	}
</style>