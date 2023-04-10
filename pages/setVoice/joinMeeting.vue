<template>
	<view>
		<view class="meetingWith">
				<view class="flexs inline">
					<view class="mname">
						会议号:
					</view>
					<view class="mpl">
						<input type="number" auto-blur=true :value="roomId" placeholder-class= "phsy" placeholder="请输入会议号" @input="bindInputChange($event, 'roomId')" />
					</view>
				</view>
				<view class="flexs inline youname">
					<view class="mname">
						您的姓名:
					</view>
					<view class="mps">
						<input placeholder-class= "phsy" :value="userName" @input="bindInputChange($event, 'userName')" placeholder="请输入您的姓名" />
					</view>
				</view>
				
				<view class="meetingbut">
					<button @click="coRoom">加入会议</button>
				</view>
		</view>
		
		<view class="meetingWith setMess">
			<view class="flexs swline">
				<view>
					开启麦克风
				</view>
				<view class="">
					<switch @change="switch1Change"    color="#128DDA" style="transform:scale(0.9,0.9)"/>
				</view>
				
			</view>
			<view class="flexs swline">
				<view>
					开启扬声器
				</view>
				<view class="">
					<switch  @change="switch2Change"  color="#128DDA" style="transform:scale(0.9,0.9)"/>
				</view>
				
			</view>
			<view class="flexs swline">
				<view>
					开启视频
				</view>
				<view class="">
					<switch @change="switch3Change"   color="#128DDA" style="transform:scale(0.9,0.9)"/>
				</view>
				
			</view>

		</view>
	</view>
	
</template>

<script>
	
	export default
	{
		data() 
		{
			return {
				statusBar:0,
				roomId:'',
				userName:'',
				mobile:'',
				equipment_power:{
					microphone:false,
					speaker:false,
					camera:false  
				}
				
			}
		},
		created() {
			this.getAuth()
			
		},
		
		onLoad(opt)
		{
			console.log('opee',opt)
			if(opt.copydata && opt.copydata !=undefined)
			{
				let split=opt.copydata.split(':').reverse()
				
				this.roomId=split[0]
				uni.setClipboardData({
				data: ' ',
				showToast:false
				
				})
			}
			
			if(opt.setRoomid && opt.setRoomid !=undefined)
			{
				
				this.roomId=opt.setRoomid
				
			}
			this.voicemeetingName()
		},
		
		methods:{
			getAuth()
			{
				this.api.interactive.userAuthed().then(res=>{
					if(res.code==200)
					{
						this.mobile=res.data.username
						uni.setStorageSync('mobile',res.data.username)
						
					}
				})
				
			},
			voicemeetingName()
			{
				this.api.voice.voicemeetingName().then(res=>{
					if(res.code==200)
					{
						if(res.data.name)
						{
							this.userName=res.data.name
							 this.mobile=res.data.name
							this.coRoom()
						}
						
					}
				})
			},
			coRoom()
			{
				
				if(this.mobile)
				{
					if(!this.roomId)
					{
						uni.showToast({
							title:'房间号不能为空！',
							icon:'none'
						})
						return
					}
					if(!this.userName)
					{
						uni.showToast({
							title:'用户姓名不能为空！',
							icon:'none'
						})
						return
					}
					
					this.api.voice.joinVoice({
						name:this.userName,
						code:this.roomId,
						equipment_power:this.equipment_power
					}).then(res=>{
						console.log('认识',res)
						if(res.code==200)
						{
							uni.navigateTo({
								url:'/pages/setVoice/coRoom?roomId='+this.roomId+'&mobile='+this.mobile+'&userName='+this.userName
							})
						}
					}).catch(err=>{
						uni.showToast({
							title:err.message,
							icon:'none'
						})
					})
					
				}
				
				
			},
			switch1Change (e) {
				this.equipment_power.microphone=e.detail.value
			},
			switch2Change (e) {
				this.equipment_power.speaker=e.detail.value
			},
			switch3Change (e) {
				this.equipment_power.camera=e.detail.value
			},
			// 这里是语音会议代码
			bindInputChange(event, type) {
				
				const value = event.detail.value;
				switch (type) {
					case 'roomId': {
						this.roomId = value;
						break;
					}
					case 'userName': {
						this.userName = value;
						break;
					}
				}
			},
		}
	}
</script>

<style>
	
	.meetingWith{
		padding: 32upx;
		background-color: #fff;
	}
	.youname{
		padding-top: 92upx;
	}
	.inline{
		padding-bottom: 20upx;
		border-bottom: 4upx solid #F0F0F0;
		justify-content: flex-start;
	}
	.mpl{
		margin-left: 172upx;
	}
	.mps{
		margin-left: 130upx;
	}
	.phsy{
		color: #BFBFBF;
		font-size: 28upx;
		
	}
	.mname{
		font-size: 28upx;
		color: #333;
	}
	.meetingbut{
		margin-top: 60upx;
		padding-bottom: 6upx;
	}
	.meetingbut button{
		background-color: #128DDA;
		height: 92upx;
		line-height: 92upx;
		font-size:28upx;
		color: #fff;
		font-weight: 400;
		border-radius: 8upx;
		
	}
	.setMess{
		margin-top: 40upx;
	}
	.uni-switch-input{
		margin-right:0!important;
	}
	.swline
	{
		padding-top: 28upx;
		border-bottom: 4upx solid #F0F0F0;
		padding-bottom: 26upx;
	}
</style>