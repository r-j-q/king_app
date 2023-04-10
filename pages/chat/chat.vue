<template>
	<view>
		
				<web-view :webview-styles="webviewStyles" src="https://www.echatsoft.com/visitor/mobile/chat.html?companyId=532108&echatTag=goodsDeitals"></web-view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
									progress: {
										color: '#FF3333',
										height:'100vh'
									}
								}
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
