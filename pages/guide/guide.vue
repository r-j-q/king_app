<template>
  <view class="content" :style="{'height':windowHeight}">
	  <image src="https://image.alhelp.net/2021/2/3/ddb42ba538db416cd56994cc4f115d0f.png" mode=""></image>

  </view>
</template>
<script>
  
  export default {
    data() {
      return {
        windowHeight: '603px', //定义手机屏幕高度值变量
        banner: ''
      }
    },
	
    onLoad(e) {
      
      var that = this;
      // that.$access_token.access_token() //
      uni.getSystemInfo({ //获取手机屏幕高度信息
        success: function(res) {
          that.windowHeight = res.windowHeight + 'px';
        }
      });
    },
    onShow(options) {
      var that = this;
      uni.getSystemInfo({ //获取手机屏幕高度信息
        success: function(res) {
          that.windowHeight = res.windowHeight + 'px';
        }
      });
	  
      setTimeout(function() {
			  if(uni.getStorageSync('token'))
			  {
				  uni.switchTab({
					url: '/pages/selectGoods/selectedGoods'
				  });
			  }
       
      }, 1000)
    },
   
  }
</script>
<style lang="scss" scoped>
  .content {
    position: relative;
    width: 100%;
	height: 100%;
	image{
		width: 100%;
		height: 100%;
	}
	// background-image:url(https://image.alhelp.net/2021/2/3/ddb42ba538db416cd56994cc4f115d0f.png);
    // .top_box {
    //   width: 100%;
    //   margin-top: 240upx;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;

    //   image {
    //     width: 160upx;
    //     height: 180upx;
    //     margin-right: 30upx;
    //   }

    //   .title {
    //     font-size: 56upx;
    //     font-weight: 600;
    //     line-height: 100upx;
    //   }

    //   .content {
    //     font-size: 32upx;
    //     color: #999;
    //   }
    // }

    // .bottom_box {
    //   width: 100%;
    //   text-align: center;
    //   font-size: 28upx;
    //   color: #ccc;
    //   margin-top: 550upx;
    // }


  }
</style>
