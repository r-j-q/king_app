<template>
	<view class="settool">
		<view class="spline">
			<view class="flexs setpl">
				<view class="setMess">
					
					<view class="prl" @click="sheAvater">
						<image v-if="userinfo.avatar" :src=userinfo.avatar></image>
						<image v-else src="../../static/img/p.png"></image>
					</view>
				</view>
				<view class="">
					<uni-icons type="right" color="#666" size="16"></uni-icons> 
					
				</view>
			</view>
			<view class="flexs setpl">
				<view class="setMess">
					
					<view class="prl">
						名称
					</view>
				</view>
				<view class="">
					{{userinfo.name}}
					<uni-icons type="right" color="#666" size="16"></uni-icons> 
					
				</view>
			</view>
			<view class="flexs setpl" @click="setsex()">
				<view class="setMess">
					
					<view class="prl">
						性别
					</view>
				</view>
				<view class="">
					{{userinfo.sex}}
					<uni-icons type="right" color="#666" size="16"></uni-icons> 
					
				</view>
			</view>
			<view class="flexs setpl setdate">
				<view class="setMess">
					
					<view class="prl" @change="bindDateChange">
						<!-- 出生日期 -->
						<view class="uni-list-cell">
										<view class="uni-list-cell-left">
											生日
										</view>
										
									</view>
					</view>
				</view>
				<view class="">
					
									
					<uni-icons type="right" color="#666" size="16"></uni-icons> 
					
				</view>
				<view class="uni-list-cell-db podate">
					<picker v-if="brith" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{brith}}</view>
					</picker>
					<picker v-else mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input" style="height: 40upx;"></view>
					</picker>
					
				</view>
				
			</view>
			<view class="flexs setpl">
				<view class="setMess">
					
					<view class="prl">
						职业
					</view>
				</view>
				<view class="">
					<uni-icons type="right" color="#666" size="16"></uni-icons> 
					
				</view>
			</view>
			
					
		</view>
		<view class="logout">
			<button @click="singlout">退出登录</button>
		</view>
		<view class="op-height">
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="flexs setxs">
						<view class="" @click="iscel">取消</view>
						<view @click="confirms">确认</view>
					</view>
					<view :class="index==1?'active':''" @click="setBase(1)">男</view>
					<view :class="index==2?'active':''" @click="setBase(2)">女</view>
				</view>
				
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	import $config from '@/common/config'
	//出生日期
		function getDate(type) {
			const date = new Date();
		 
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
		 
			if (type === 'start') {
				year = year - 10;
			} else if (type === 'end') {
				year = year + 10;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
		 
			return `${year}-${month}-${day}`;
		}
	
	export default {
		data() {
			return {
				single:'',
				userinfo:'',
				date: getDate({
					format: true
				}),
				startDate: getDate('start'),
				endDate: getDate('end'),
				index:1,
				brith:''
			}
		},
		created() {
			this.userAuthed();
		},
		methods: {
			//设置头像
			sheAvater()
			{
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: $config.SERVER_PATH+'file',
							filePath: tempFilePaths[0],
							header:{
							　'Authorization': 'Bearer '+uni.getStorageSync('token')
							},
							name: 'file',
							formData: {
								usage: 'avatar'
							},
							success: (uploadFileRes) => {
								let gres=JSON.parse(uploadFileRes.data)
								if(gres.code==200)
								{
									this.api.interactive.Userinfo({avatar_file_id:gres.data.id}).then(res=>{
										if(res.code===200)
										{
											uni.showToast({
												title:'上传成功！',
												icon:'none'
											})
											this.userAuthed()
										}
									})
								}
								
							},
							fail: () => {
								uni.showToast({
									title:'上传失败，重新上传',
									icon:'none'
								})
							}
						});
					}
				});

			
			},
			
			//出生日期
			bindDateChange: function(e) {
				this.date = e.detail.value;
				let birthday=e.detail.value
				this.api.interactive.userInfo({birthday}).then(res=>{
					if(res.code===200)
					{
						uni.showToast({
							title:'修改成功!',
							icon:'none'
						})
						
						this.userAuthed()
					}
				})
			},
			setsex()
			{
				this.$refs.popup.open('bottom')
			},
			userAuthed()
			{
				this.api.interactive.userAuthed().then(res=>{
					console.log('用户信息',res)
					if(res.code===200)
					{
						this.userinfo=res.data;
						console.log('this.userinfo',this.userinfo.birthday)
						if(this.userinfo.birthday !=null)
						{
							this.brith=this.userinfo.birthday.substr(0,11)
						}
					}
				})
			},
			setBase(item)
			{
				this.index=item
			},
			iscel()
			{
				this.$refs.popup.close()
			},
			singlout()
			{
				this.api.interactive.useSignout().then(res=>{
					if(res.code===200)
					{
						uni.showToast({
							title:'退出成功！',
							icon:'none'
						});
						
						uni.removeStorageSync('token');
						uni.navigateTo({
							url:'/pages/login/login'
						})
					}
				})
				
			},
			confirms()
			{
				if(this.index==1)
				{
					
						var sex='男'
					
				}else{
					
						var sex='女'
					
				}
				this.api.interactive.userInfo({sex}).then(res=>{
					if(res.code===200)
					{
						uni.showToast({
							title:'修改成功!',
							icon:'none'
						})
						this.$refs.popup.close()
						this.userAuthed()
					}
				})
			}
			
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.popup-content{
		height: 200upx;
		line-height: 60upx;
		text-align: center;
	}
	.active{
		color: rebeccapurple;
	}
	.setdate{
		position: relative;
	}
	.podate{
		position: absolute;
		right: 0;
		
		padding-right: 32upx;
		text-align: right;
	}
	.prl image{
		width: 120upx;
		height: 120upx;
		border-radius: 100%;
	}
	.spline{
		border-top: 1upx solid #ccc;
		padding: 40upx 30upx;
		margin-top: 20upx;
		font-size: 26upx;
	}
	.setMess{
		display: flex;
		align-items: center;
	}
	.uni-input{
		width: 80vw;
		
	}
	.setpl{
		
		align-items: center;
		padding-bottom: 30upx;
		border-bottom:1upx solid #ccc ;
		margin-bottom: 40upx;
	}
	.prl{
		padding-left: 20upx;
	}
	.logout button{
		margin-top: 100upx;
		background-color: #2F5597;
		    width: 300upx;
		    
		    font-size: 14px;
		    padding: 8px 5px;
		    color: #fff;
	}
	.setxs{
		padding-bottom: 30upx;
	}
</style>
