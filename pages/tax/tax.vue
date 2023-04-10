<template>
	<view class="tax-list">
		<view class="taxdata" v-for="(item,index) in actlist" :key="item.year">
			<view class="taxFlex gaad-data">
				<view>{{item.year}}</view>
				<view class="taxmonth " @click="goTaximg(sitem)" v-for="(sitem,sindex) in item.total" :key="sitem.time">
					<view class="">
					{{sitem.time}}
					<uni-icons type="right" size="16"></uni-icons>

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
				actlist:[]
			}
		},
		created() {
			this.api.interactive.taxTime().then(res=>{
				console.log('税务',res)
				this.actlist=res.data
			})
		},
		methods: {
			goTaximg(item)
			{
				console.log('itememem',item)
				uni.navigateTo({
					url:'/pages/tax/deitals?time='+item.time
				})
			}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.taxFlex{
		display: flex;
		justify-content: space-between;
		padding: 30upx 40upx;
	}
	.gaad-data{
		border-bottom: 1upx solid #ccc;
	}
	.taxdata{
		padding: 0 30upx;
	}
</style>
