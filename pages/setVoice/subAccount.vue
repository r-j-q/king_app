<template>
	<view class="accountList">
		<radio-group @change="radioChange">
		<view class="search-with nfs" :style="[{'paddingTop':statusBar+'px'}]">
			<view class="">
				<view class="flexs iotops sumap">
					<view class="plback" @click="goBack">
						<uni-icons type="left" color="#666" size="27"></uni-icons>
					</view>

					<view class="sl" :class="tabs==3?'active':'noict'" @click="ioTabs(3)">切换账号</view>
					<view class="sr" :class="tabs==4?'active':'noict'" @click="ioTabs(4)">申请新账号</view>

				</view>

				<view class="flexs subflex ispad">
					<view class="childacc">
						<image v-if="maininfo.avatar_file_url" :src=maininfo.avatar_file_url></image>
						<image v-else  src="../../static/img/p.png"></image>
					</view>
					<view class="subAccMess">
						<view>{{maininfo.account_id}}</view>
						<view style="color: #000;">纳零王者号: {{maininfo.username}}</view>
						<view class="subData">
							<text>余额: {{total_balance_in_cents}}</text>
							<text>代金券: {{maininfo.remaining_point}}</text>
						</view>
					</view>
					<view class="radioSty">
						<radio value="1" @click="getcuurindex(maininfo)" checked="checked" />
					</view>
				</view>
				<view class="accPasd">
						<view class="flexs ispad defonts">
							<!-- view>默认密码:
							<text>a1c3xd45w6</text>
							</view> -->
						<!-- <view class="flexs cpflex">
							<view>复制密码</view>
							<image src="/static/img/cp.png"></image>
						</view> -->
						<view class="subnums">共{{chilidNums?chilidNums:0}}个账号</view>
					</view>
				</view>
			</view>
		</view>

		<view class="mainAccount">

				<!-- 有副号 -->
				<view class="setpams" v-if="chilidNums && chilidNums >0">

					<view v-for="(item,index) in sublist.other_user" :key="item.id" class="suUnfo">
						<view class="flexs subflex ispad orpad">
							<view class="orderinx">
								{{index+1}}
							</view>
							<view class="childacc">
								<image v-if="item.avatar_file_url" :src=item.avatar_file_url></image>
								<image v-else src="../../static/img/p.png"></image>
							</view>

							<view class="subAccMess">

								<view>纳零王者号: {{item.username}}</view>
								<view>个人业绩: {{item.personal_expense_in_cents/100}}</view>
								<view class="subData">
									<text>余额: {{item.total_balance_in_cents/100}}</text>
									<text>代金券: {{item.remaining_point}}</text>
								</view>
							</view>
							<view class="flexs radioSty chilflex">
								<view class="editpwd" @click="editpaswd(item)">
									<button>修改密码</button>
								</view>
								<view>
									<radio @click="getcuurindex(item)"  :checked="index+1 === current" />
								</view>
							</view>
						</view>
					</view>

				</view>


			<!-- 无账号 -->
			<view class="goslp" v-if="ishowid">
				<button v-if="!chilidNums && chilidNums <=0"  @click="goapply">申请开通新账号</button>
				<button v-else  @click="tablogin">切换登录</button>
			</view>
		</view>
		</radio-group>
	</view>
</template>

<script>
	export default {
		data()
		{
			return{
				userinfo:[],
				tabs:3,
				statusBar:0,
				sublist:[],
				current: 0,
				userId:0,
				maininfo:'',
				chilidNums:0,
				ishowid:'',
				total_balance_in_cents:0,
				personal_expense_in_cents:0
			}
		},
		created() {
		},

		onLoad() {
			var that=this
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45;
					that.statusBar=e.statusBarHeight+8;

				}
			});
		},
		onShow() {
			uni.getStorage({
				key:'userinfo',
				success: (res) => {
					if(res)
					{
						this.userinfo=JSON.parse(res.data)
					}
					// console.log('resss',this.userinfo)
				}
			}),
			this.subUserchild()
			this.tabs=3
		},
		methods:{
			goapply()
			{
				uni.navigateTo({
					url:'/pages/setVoice/applyacc'
				})
			},
			//切换登录
			tablogin()
			{

				this.api.interactive.useSignout().then(res=>{
					if(res.code===200)
					{
						// uni.showToast({
						// 	title:'退出成功！',
						// 	icon:'none'
						// });

						uni.removeStorageSync('token');
						uni.clearStorage()
						if(this.$store.state)
						uni.navigateTo({
							url:'/pages/login/login?status=2'
						})
					}
				})
			},
			editpaswd(item)
			{
				this.$store.commit('set_edit_pwd',item.username)
				uni.navigateTo({
					url:'/pages/setVoice/editpwd'
				})
			},
			goBack()
			{
				const pages = getCurrentPages()//获取页面栈
				if (pages.length === 1) {//如果只有一个调用原生js
					history.back()
				} else {
					uni.navigateBack({
						delta: 1,
					})
				}
			},
			ioTabs(pams)
			{
				this.tabs=pams
				if(pams==4)
				{
					if(this.sublist.submit_state==0 || this.sublist.submit_state==2)
					{
						uni.navigateTo({
							url:'/pages/setVoice/applyResult?status='+this.sublist.submit_state+'&times='+JSON.stringify(this.sublist.last_application)
						})
					}else{
						uni.navigateTo({
							url:'/pages/setVoice/applyacc'
						})
					}

				}
			},
			subUserchild()
			{
				uni.showLoading({
					title:' ',
					icon:'loading'
				})
				this.api.subuser.subUserchild().then(res=>{
					uni.hideLoading()
					if(res.code==200)
					{
						this.sublist=res.data;
						this.userId=res.data.current_user.id
						this.maininfo=res.data.current_user
						this.total_balance_in_cents=(res.data.current_user.total_balance_in_cents)/100
						this.personal_expense_in_cents=res.data.current_user.personal_expense_in_cents/100
						if(res.data.other_user.length >0)
						{
							this.chilidNums=res.data.other_user.length
						}

					}else{
						this.sublist=[],
						uni.showToast({
							title:'暂无数据',
							icon:'none'
						})
					}
				}).catch(err=>{
					uni.hideLoading()
				})
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.sublist.other_user.length; i++) {
					if (this.sublist.other_user.value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			//切换账号
			getcuurindex(item)
			{
				this.ishowid=item.id
				this.$store.commit('set_tab_user',item.username)
			},

		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}

	.childacc image{
		width: 108upx;
		height: 108upx;
		border-radius: 100%;
		border: 2upx solid #128DDA;
	}
	.ispad{
		padding: 20upx 20upx 20upx 30upx;
		background-color: #FBFFFF;
	}
	.orpad{
		padding: 10upx 16upx;
	}
	.setpams{
		padding-bottom: 80upx;
	}
	.orderinx{
		font-size: 36upx;
		font-weight: 500;
		padding-left: 10upx;
		padding-right: 20upx;
	}
	.subflex{
		justify-content: flex-start;
		align-items: center;
		border-bottom: 2upx solid #f5f5f5;
	}
	.radioSty{
		flex: 1;
		text-align: end;
	}

	.subAccMess{
		margin-left: 34upx;
	}
	.subAccMess view:nth-child(1)
	{

		font-size: 24upx;
	}
	.subAccMess view:nth-child(2)
	{

		font-size: 24upx;
		color: #F29423;
	}
	.subData{
		margin-top: 20upx;
		font-size: 22upx;
	}
	.subData text:nth-child(2)
	{
		margin-left: 40upx;
	}
	.cpflex{
		justify-content: flex-start;
		align-items: center;
	}
	.cpflex image{
		width: 28upx;
		height: 28upx;
	}
	.accPasd{
		background-color: #FAFAFA;
		margin-top: 40upx;
	}
	.defonts{
		font-size: 28upx;
		font-weight: 600;
		background-color: #FAFAFA;
	}
	.cpflex{
		font-size: 22upx;
		font-weight: normal;
		color: #3D3D3D;
	}
	.subnums{
		color: #666666;
		font-size: 24upx;
	}
	.editpwd button{
		width: 124upx;
		height: 48upx;
		background-color: #128DDA;
		font-size: 26upx;
		color: #fff;
		line-height: 48upx;
		margin-right: 30upx;
	}
	.chilflex{
		justify-content: flex-end;
	}

	.goslp{
		position: fixed;
		bottom: 68upx;
		left: 0;
		right: 0;
	}

	.goslp button{
		width: 86%;
		background-color: #128DDA;
		height: 80upx;
		font-size: 28upx;
		color: #fff;
		line-height: 80upx;
	}
	.sumap{

		border-bottom: 2upx solid #ccc!important;
		padding-bottom: 30upx!important;
		justify-content: space-between;

	}
	.active{
		font-size: 30upx;
		font-weight: 600;
		margin-left: 27px;
	}
	.noict{
		font-size: 28upx;
		font-weight: 600;
		color: #999;
	}
	.nfs{
		z-index: 99;
		background-color: #fff;
		display: block;
		padding-left: 0;
	}
</style>
