<template>
	
	<view class="imgs">
		<view class="taximg" v-for="(item,index) in actlist" @click="previewImg(index)" :key="index*10">
			
			<image :src=item.tax_file_url></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				actlist:[],
				page:1,
				page_size:20
			}
		},
		created() {
			
		},
		onLoad(options) {
			if(options.time)
			{
				
				this.api.interactive.userCertificate({
					page:this.page,
					page_size:this.page_size,
					time:options.time
				}).then(res=>{
					console.log('idsjf',res)
					this.actlist=res.data.data
				})
			}
		},
		methods: {
			
			previewImg(index) {
				let _this = this;
				let imgsArray = [];
				for (let i = 0; i < this.actlist.length; i++) 
				{
						imgsArray.push(this.actlist[i].tax_file_url);
				}
				
				uni.previewImage({
				current: index - 1,
				urls: imgsArray,
				indicator: 'number',
				loop: true
				});
			}
			
		}
	}
</script>

<style>
	.taximg image{
		width: 300upx;
		height: 300upx;
	}
	.taximg{
		margin: 30upx;
	}
 
</style>