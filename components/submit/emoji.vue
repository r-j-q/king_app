<template>
	<swiper class="emoji-swiper" indicator-dots="true" duration="150">
		<swiper-item v-for="(page,pid) in emoji" :key="pid">
			<view v-for="(em,eid) in page" :key="eid" @tap="selemoji(em)">
				<image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
	import emjor from "@/js_sdk/m-emoji/m-emoji_2.0.0/emoji.js";
	export default {
		props:{
			height:{
				type:Number,
				default:260
			}
		},
		name: "emoji",
		data() {
			return {
				emoji:[]
			};
		},
		
		methods: {
			selemoji(e) {
				console.log('ee',e)
				this.$emit('emotion', e.alt)
			},
			
		},
		mounted() {
			
			this.emoji = emjor.emjor;
			
		},
		
		
		
	}
</script>

<style lang="scss">
	.footer {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 80upx;
		min-height: 80upx;
		border-top: solid 1px #bbb;
		overflow: hidden;
		padding: 5upx;
		background-color: #fafafa;
	}

	.footer-left {

		width: 80upx;
		height: 80upx;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer-right {
		width: 100upx;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #1482D1;
	}

	.footer-emotion {
		width: 60upx;
		height: 80upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: #1482D1;
	}

	.footer-center {
		flex: 1;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer-center .input-text {
		flex: 1;
		background: #fff;
		border: solid 1upx #ddd;
		padding: 10upx !important;
		font-family: verdana !important;
		overflow: hidden;
		border-radius: 15upx;
	}

	@font-face {
		font-family: 'iconfont';
		/* project id 1134039 */
		src: url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.eot');
		src: url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.eot?#iefix') format('embedded-opentype'),
			url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.woff2') format('woff2'),
			url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.woff') format('woff'),
			url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.ttf') format('truetype'),
			url('http://at.alicdn.com/t/font_1134039_uait6xu86bf.svg#iconfont') format('svg');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 18px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-face:before {
		content: "\e71c";
		font-size: 50upx;
	}

	.emoji-swiper {
		height: 65vw;

		swiper-item {
			display: flex;
			align-content: flex-start;
			flex-wrap: wrap;

			view {
				width: 15vw;
				height: 13vw;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 9vw;
					height: 9vw;
				}
			}
		}
	}
</style>
