<template>
	<view class="lamMess">
		<view class="flexs laother">
			<view class="la_name">会议名称</view>
			<view class="lainput">
				<input v-model="form.title" placeholder-class= "phsy" type="text" placeholder="输入会议名称" />
			</view>
		</view>
		
		<view class="flexs laother">
			<view class="la_name">会议类型</view>
			<view class="lainput" @click="voiceType">
				<input disabled="true" v-model="form.type" placeholder-class= "phsy" type="text" placeholder="选择会议类型" />
			</view>
		</view>
		<view class="flexs laother">
			<view class="la_name">会议码</view>
			<view class="lainput"> 
				<input v-model="form.code"  placeholder-class= "phsy" type="number" placeholder="输入会议码" />
			</view>
		</view>
		<view class="flexs laother">
			<view class="la_name">您的姓名</view>
			<view class="lainput">
				<input v-model="form.host_name" placeholder-class= "phsy" type="text" placeholder="输入姓名" />
			</view>
		</view>
		<view class="flexs laother">
			<view class="la_name">开始时间</view>
			<view class="lainput">
				<input v-model="form.start_at" @click="openDatetimePicker" placeholder-class= "phsy" type="text" disabled="true" placeholder="选择开始时间" />
			</view>
		</view>
		<view class="flexs laother">
			<view class="la_name">预计时间</view>
			<view class="lainput">
				<input disabled="true" @click="gettimes" v-model="form.length_of_time" placeholder-class= "phsy" type="text"  placeholder="选择预计时长" />
			</view>
		</view>
		<view class="setmdieapm">
			<view class="flexs laother setmeida">
				<view class="">开启麦克风</view>
				<view class="">
					<switch @change="switch1Change"   color="#128DDA" style="transform:scale(0.9,0.9)"/>
				</view>
			</view>
			<view class="flexs laother setmeida">
				<view class="">开启扬声器</view>
				<view class="">
					<switch @change="switch2Change"  color="#128DDA" style="transform:scale(0.9,0.9)"/>
				</view>
			</view>
			
			<view class="flexs laother setmeida">
				<view class="la_video">开启视频</view>
				<view class="">
					<switch  @change="switch3Change" color="#128DDA" style="transform:scale(0.9,0.9)"/>
				</view>
			</view>
		</view>
		<view class="stMeeting">
			<button @click="gomeeting">开始会议</button>
		</view>
		
		<uni-popup ref="popup">
			<view class="popup-content">
				<view class="flexs swline">
					<text class="ovsty">选择时长</text>
					<view class="chatclose" >
						<uni-icons @click="chatclose" type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				
				<view class="settimes">
					<view v-for="(item,index) in times" :key="index" @click="pulltimes(item,index)"
					 class="times" :class="index==stats?'active':''">
						{{item}}
					</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popup1">
			<view class="popup-content">
				<view class="flexs swline">
					<text class="ovsty">选择会议类型</text>
					<view class="chatclose" >
						<uni-icons @click="chatclose" type="closeempty" size="20"></uni-icons>
					</view>
				</view>
				
				<view class="settimes">
					<view v-for="(item,index) in meetType" :key="item.id" @click="pulltype(item,index)"
					 class="times" :class="index==statstype?'active':''">
						{{item.name}}
						<uni-icons style="margin-left: 20upx;" v-if="index==statstype"  color="#128dda" type="checkmarkempty" size="18"></uni-icons>

					</view>
				</view>
			</view>
		</uni-popup>
					
		
		 <SimpleDateTimePicker
		      ref="myPicker"
		      @submit="handleSubmit"
		      :start-year="1990"
		      :end-year="2080"
		    />
		  </view>
	</view>
</template>

<script>
	import SimpleDateTimePicker from "uni_modules/buuug7-simple-datetime-picker/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.vue";

	export default{
		 components: {
		    SimpleDateTimePicker,
		  },
		data()
		{
			return{
				birthday: "",
				mobile:'',
				stats:-1,
				statstype:-1,
				times:[
					'30 分钟','1 小时','2 小时','3 小时','4 小时','5 小时'
				],
				acstrs:'',
				form:{
					code:'',
					title:'',
					host_name:'',
					type:'',
					length_of_time:'',
					start_at:'',
					equipment_power:{
						microphone:false,
						speaker:false,
						camera:false 
					}
				},
				settype:'',
				meetType:[
					{id:1,name:'品牌会议'},
					{id:2,name:'招商会议'},
					{id:3,name:'培训会议'},
					{id:4,name:'专题会议'},
					{id:5,name:'早会分享'},
					{id:6,name:'王者故事汇'},
				]
			}
		},
		created() {
			this.getAuth()
			this.voicemeetingName()
		},
		onShow() {
			this.creaRand()
			this.form.length_of_time='30 分钟'
		},
		
		methods:{
			chatclose()
			{
				this.$refs.popup.close()
				this.$refs.popup1.close()
			},
			gettimes()
			{
				this.$refs.popup.open('bottom')
			},
			//会议类型
			voiceType()
			{
				this.$refs.popup1.open('bottom')
			},
			
			
			
			voicemeetingName()
			{
				this.api.voice.voicemeetingName().then(res=>{
					if(res.code==200)
					{
						if(res.data.name)
						{
							this.form.host_name=res.data.name
							
						}
						
					}
				})
			},
			pulltimes(item,index)
			{
				
				var acstr=item.split(' ')[0]
				
				if(acstr>=1 && acstr !=30)
				{	
					this.acstrs=parseInt(acstr)*60
				}
				this.stats=index
				this.form.length_of_time=item
				setTimeout(()=>{
					this.$refs.popup.close();
					this.stats=-1
				},500)
			},
			pulltype(item,index)
			{
				this.statstype=index
				this.form.type=item.name
				this.settype=item.id
				setTimeout(()=>{
					this.$refs.popup1.close();
					this.statstype=-1
				},500)
			},
			 creaRand()
			{
				let str = Math.random().toString().slice(-8)
				let str2 = Math.ceil(Math.random()*9) 
				if(str2==0)
				{
					   let str2=1
			   }
				this.form.code=str2+str
				
			},
				openDatetimePicker() {
				  this.$refs.myPicker.show();
				},
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
				// 关闭picker
				closeDatetimePicker() {
				  this.$refs.myPicker.hide();
				},
			
				handleSubmit(e) {
				 
				  this.birthday = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
				  this.form.start_at=this.birthday
				
				},
				
				switch1Change (e) {
					this.form.equipment_power.microphone=e.detail.value
				},
				switch2Change (e) {
					this.form.equipment_power.speaker=e.detail.value
				},
				switch3Change (e) {
					this.form.equipment_power.camera=e.detail.value
				},
				gomeeting()
				{
					
					const {form,mobile }=this
					if(!form.title)
					{
						uni.showToast({
							title:'会议名称不能为空！',
							icon:'none'
						})
						return
					}
					if(!form.type)
					{
						uni.showToast({
							title:'请选择会议类型！',
							icon:'none'
						})
						return
					}
					if(!form.code)
					{
						uni.showToast({
							title:'会议码不能为空！',
							icon:'none'
						})
						return
					}
					if(form.code.length <6)
					{
						uni.showToast({
							title:'会议码长度不能小于6位！',
							icon:'none'
						})
						return
					}
					if(!form.host_name)
					{
						uni.showToast({
							title:'请输入姓名！',
							icon:'none'
						})
						return
					}
					if(!form.start_at)
					{
						uni.showToast({
							title:'请选择开始时间！',
							icon:'none'
						})
						return
					}
					uni.showLoading({
						title:'入会中...',
						icon:'none',
						mask:true
					})
					
					let {...forms}=form
					
					if(!this.acstrs)
					{
						forms.length_of_time=30
					}else{
						forms.length_of_time=this.acstrs
					}
					
					forms.type=this.settype
					console.log('dfdfffffff',forms);
					
					this.api.voice.startVoice(forms).then(res=>{
						uni.hideLoading()
						if(res.code==200)
						{
							uni.navigateTo({
								url:'/pages/setVoice/coRoom?roomId='+form.code+'&mobile='+mobile+'&userName='+form.host_name
							})
							this.form=' '
						}
						
					}).catch(err=>{
						uni.showToast({
							title:err.message,
							icon:'none'
						})
					})
					
					
				}
		}
	}
</script>

<style>
	page{
		background: #fff;
	}
	.popup-content{
		padding: 0 30rpx;
	}
	
	.settimes{
		margin-top: 40rpx;
		padding-bottom: 40rpx;
	}
	.times{
		line-height: 80rpx;
		font-size: 28rpx;
		border-bottom: 1rpx solid #F0F0F0;
	}
	.swline{
		padding-top: 20rpx;
	}
	.lamMess{
		padding:32upx;
		font-size: 28upx;
	}
	.lainput{
		padding-left: 24upx;
	}
	
	.la_name{
		 display: inline-block;
		  width: 4em;
		  text-align: justify;
		  text-align-last: justify;
	}
	.laother{
		padding-bottom: 32upx;
		padding-top: 32upx;
		border-bottom: 2upx solid #F0F0F0;
		justify-content: flex-start;
		align-items: center;
	}
	.setmdieapm{
		padding-top: 30upx;
	}
	.setmeida{
		justify-content: space-between;
		align-items: center;
	}
	.stMeeting button{
		margin-top: 220upx;
		background-color: #128DDA;
		padding: 36upx 0;
		font-size: 28upx;
		color: #fff;
	}
	.active{
		color: #128DDA;
		font-size: 32rpx;
	}
	
</style>