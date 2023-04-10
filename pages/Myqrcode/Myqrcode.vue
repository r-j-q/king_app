<template>
		<view class="qrMess">
			<view class="zQxJ27RLYq3zCAVY5wO0" id="content">
					<view class="tsVi4oXSzjOX0U2u1HlF">王者系统</view>
					<view class="xyg1Hd9pNC6sHOVbiSA8">立足科技服务于社会</view>
					<view class="xyg1Hd9pNC6sHOVbiSA8">聚焦研究成果产业化</view>
					<view class="VOGjWZ1S48R46F1NQrVj">
						<image class="m1" src="/static/img/sm.jpg" v-if="uinfo.avatar"></image>
						<image class="m1" src="/static/img/sm.jpg" v-else></image>
						<view style="display: flex; flex-direction: column; align-items: center;">
							<view class="H0Q8wYCASjYGtR5wK0co">{{uinfo.name}}</view>
						</view>
						<view class="qrcodesty" style="margin: 40upx;">
							<ayQrcode  ref="qrcode3" qrcode_id="qrcode3"  :modal="modal_qr" :url="url" @hideQrcode="hideQrcode" :height="200" :width="200"
							 themeColor="#000" 
							 :is_themeImg="true"
							  themeImg="https://wangzhe.yugoo.com/images/1d3dc2620c958c80647ec9061a057aa7.png"
							  :h_w_img="50" 
							  />
						</view>
		
						<view class="wwNtFh1uefgh2v6O8YlD">扫一扫, 注册登录王者系统</view>
						<view class="saveqr" style="display: flex; justify-content: center; align-items: center;">
							<a id="down_link" style="text-decoration: none; display: flex; align-items: center;">
								<button class="rllEJ1PJYOupDpCAVjbS" @click="saveImage">下载二维码保存至本地</button>
							</a>
						</view>
					</view>
					<view style="height: 2rem;"></view>
			</view>
			
		</view>
		
</template>

<script>
	// https://test-wangzhe-web.nlwzxt333.com/login/ir4YAsX3rifoLsGz
	import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue"
	import $config from '@/common/config'
	export default {
		components: {
					ayQrcode,
		
				},
		data() {
			return {
				modal_qr: false,
				url: '', // 要生成的二维码值
				uinfo:''
				
			}
		},
		
		methods: {
			
			// 展示二维码
			showQrcode() {
				let _this = this;
				
			},

			//传入组件的方法
			hideQrcode() {
				this.modal_qr = false;
			},
			
			saveImage: function() {
				var that = this;
				uni.canvasToTempFilePath({
					canvasId: 'qrcode3',
					success: function(res) {
						var tempFilePath = res.tempFilePath;
						console.log(tempFilePath);
						that.imagePath = tempFilePath;
						uni.saveImageToPhotosAlbum({
							filePath : tempFilePath ,
							success: function (res3) {
								uni.showModal({
									title: '提示',
									content: '保存成功',
									confirmText: '确定',
									showCancel: false,
									confirmColor: '#33CCCC',
									success(res4) {
										
									}
								}) 
							},
						});
					},
					fail: function(res) {
						console.log(res);
					}
				}, that);
			},
			
			userinfo()
			{
				
				this.api.interactive.userAuthed().then(res=>{
					
					this.uinfo=res.data
				})
			}
			
		},
		onLoad() {
			let that = this;
			this.userinfo();
		},
		created() {
			var _this=this
			this.api.interactive.getuserCode().then(res=>{
				
				if(res.code==200)
				{
					this.url=$config.ISPATH+'/login/'+res.data
					this.modal_qr = true;
					setTimeout(function() {
						_this.$refs.qrcode3.crtQrCode()
					}, 500)
				}
			})
		}
	}
</script>

<style>
	
	
	  
	  .qrcode {
	    padding: 16px;
	    background-color: #ffffff;
	    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
	    border-radius: 2px;
	    overflow: hidden;
	  }
	
	
	
	.qrMess{
		margin-top: 30upx;
	}
	.canvas-qrcode{
		text-align: center;
		float: none!important;
	}
.tsVi4oXSzjOX0U2u1HlF {
    padding: 20upx 0 10upx 0;
        text-align: center;
        font-size: 56upx;
        font-weight: 400;
        font-family: STLiti;
}
.xyg1Hd9pNC6sHOVbiSA8 {
    font-family: Microsoft YaHei;
    font-weight: 400;
    text-align: center;
    font-size: 1rem;
}
.VOGjWZ1S48R46F1NQrVj{
		margin: 30upx;
	    padding: 40upx 0;
	    background-color: #fff;
}
.VOGjWZ1S48R46F1NQrVj{
	text-align: center;
}
.m1{
	margin-top: 20upx;
    border-radius: 50%;
    width: 121upx;
    height: 121upx;
    margin-bottom: 40upx;
}
.m2{
	width: 353upx;
	height: 353upx;
}
.wwNtFh1uefgh2v6O8YlD {
    margin-top: 1rem;
    color: #999;
    font-weight: 300;
    text-align: center;
}
.rllEJ1PJYOupDpCAVjbS {
    margin-top: 20upx;
    color: #fff;
    border-radius: 6upx;
    font-size: 30upx;
    background-color: #2f5597;
    padding: 30upx 60upx;
	border-radius: 20upx;
}
.H0Q8wYCASjYGtR5wK0co{
	margin-bottom: 20upx;
}
.saveqr{
	padding-top: 20upx;
}
</style>
