<template>
	<view>
		<view class="search-with nfs" :style="[{'paddingTop':statusBar+'px'}]">
			<view class="">
				<view class="flexs iotops sumap">
					<view class="plback" @click="goBack">
						<uni-icons type="left" color="#666" size="27"></uni-icons>
					</view>
					
					<view class="sl" :class="tabs==3?'active':'noict'" @click="ioTabs(3)">会议室</view>
					<view class="sr" :class="tabs==4?'active':'noict'" @click="ioTabs(4)">结束</view>
				
				</view>
				
			</view>
			
		</view>
		
		<view class="hostRoom">
			<view class="hostmain">
				<image src="../../static/img/sm.jpg" mode=""></image>
				<view class="hostmp">
					<view>主持人</view>
				</view>
			</view>
			
			<view class="otherImg">
				<view class="hostmain otimg">
					<image src="../../static/img/sm.jpg" mode=""></image>
					<view class="hostmp">
						<view>姓名</view>
					</view>
				</view>
				<view class="hostmain otimg">
					<image src="../../static/img/sm.jpg" mode=""></image>
					<view class="hostmp">
						<view>姓名</view>
					</view>
				</view>
				<view class="hostmain otimg">
					<image src="../../static/img/sm.jpg" mode=""></image>
					<view class="hostmp">
						<view>姓名</view>
					</view>
				</view>
				<view class="hostmain otimg">
					<image src="../../static/img/sm.jpg" mode=""></image>
					<view class="hostmp">
						<view>姓名</view>
					</view>
				</view>
				<view class="hostmain otimg">
					<image src="../../static/img/sm.jpg" mode=""></image>
					<view class="hostmp">
						<view>姓名</view>
					</view>
				</view>
				<view class="hostmain otimg">
					<image src="../../static/img/sm.jpg" mode=""></image>
					<view class="hostmp">
						<view>姓名</view>
					</view>
				</view>
				<view class="hostmain otimg">
					<image src="../../static/img/sm.jpg" mode=""></image>
					<view class="hostmp">
						<view>姓名</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bomtabr">
			
			<view class="enterBox">
				<view class="flexs setinput">
					<view class="m1">
						<image src="/static/img/m1.png"></image>
					</view>
					<view class="eninput" @click="chatpoup">
						<input placeholder-class= "phsy" placeholder="请输入聊天内容...." type="text" />
					</view>
				</view>
			</view>
			
			<view class="flexs bodHeight">
				<view>
					<view class="y1" @click="ioTabs(10)">
						<image src="/static/img/y1.png"></image>
					</view>
					<view>邀请</view>
				</view>
				
				<view>
					<view class="y1">
						<image src="/static/img/k1.png"></image>
					</view>
					<view>开启视频</view>
				</view>
				
				<view>
					<view class="s1">
						<image src="/static/img/j1.png"></image>
					</view>
					<view>静音</view>
				</view>
				<view>
					<view class="y1">
						<image src="/static/img/g1.png"></image>
					</view>
					<view>共享屏幕</view>
				</view>
				<view @click="ioTabs(5)">
					<view class="s1">
						<image src="/static/img/sz.png"></image>
					</view>
					<view class="">设置</view>
				</view>
			</view>
			
		</view>
		
		<view class="op-height">
			<uni-popup ref="popup">
				<view class="popup-content">
					<view class="chetFlex">
						<view>聊天</view>
						<view class="chatclose" @click="chatclose">
							<uni-icons type="closeempty" size="18"></uni-icons>
						</view>
					</view>
					
					<!------------------------对方消息-------------------- -->
					<view class="left_box">
						<view>奇尔韦尔</view>
						<view class="chat_item">
							33333
						</view>
					</view>
					<!-- ----------------------自己消息-------------------- -->
					<view class="right_box">
						<view>宿建德江</view>
						<view class="chat_item">二二二</view>
					</view>
					
					<view class="chatbottom">
						<view class="flexs">
							<view class="chatcont">
								<input cursor-spacing='30' placeholder-class= "phsy" placeholder="请输入聊天内容" />
							</view>
							<view class="flexs insend">
								<view class="sendbut">
									<button>发送</button>
								</view>
								<view class="adImg" @click="showAction">
									<image src="/static/img/ad1.png"></image>
								</view>
							</view>
						</view>
						<view v-if="actshow" class="sele-action">
							<view class="">
								1222
							</view>
						</view>
					</view>
				</view>
				
			</uni-popup>
		</view>
		<view class="op-height">
			<uni-popup ref="popupover">
				
				<view class="popup-content" v-if="tabs==4">
					<view class="chatclose" @click="chatclose">
						<uni-icons type="closeempty" size="18"></uni-icons>
					</view>
					<view class="crtitle">
						你确定结束会议吗？
					</view>
					<view class="overbutton">
						<button>结束会议</button>
					</view>
					<view class="canbutton">
						<button>取消</button>
					</view>
				</view>
				<view class="popup-content" v-if="tabs==5">
					<view class="flexs">
						<view class="setName">设置</view>
						<view class="chatclose" @click="chatclose">
							<uni-icons type="closeempty" size="18"></uni-icons>
						</view>
					</view>
					
					<view class="flexs inflex">
						<view class="ingard" @click="ioTabs(6)">
							<view class="qdimg">
								<image src="../../static/img/qd.png"></image>
							</view>
							<view class="aNames">签到</view>
						</view>
						<view class="ingard" @click="ioTabs(7)">
							<view class="qdimg">
								<image src="../../static/img/gg.png"></image>
							</view>
							<view class="aNames">公告</view>
						</view>
						<view class="ingard" @click="ioTabs(8)">
							<view class="qdimg">
								<image src="../../static/img/lt.png"></image>
							</view>
							<view class="aNames">聊天设置</view>
						</view>
						<view class="ingard" @click="ioTabs(9)">
							<view class="qdimg">
								<image src="../../static/img/mem.png"></image>
							</view>
							<view class="aNames">成员管理</view>
						</view>
					</view>
					
					
				</view>
				<view class="popup-content" style="height: 1200upx" v-if="tabs==6">
					<view class="flexs">
						<view class="setName als-bom" style="margin: auto;">签到</view>
						<view class="chatclose" @click="chatclose">
							<uni-icons type="closeempty" size="18"></uni-icons>
						</view>
					</view>
					<view class="flexs Qdmess">
						<view @click="qdChange(1)" :class="qstatus==1?'qsactive':'qsmotice'">发起签到</view>
						<view @click="qdChange(2)" :class="qstatus==2?'qsactive':'qsmotice'">签到记录</view>
					</view>
					
					<block v-if="qstatus==1">
						<view  class="adcontent">
							<textarea placeholder-class= "phsy" placeholder="请输入签到说明"></textarea>
						</view>
						
						<view  class="qsMes">
							发起签到后，其他参与成员将收到签到应用通知，成员签到后可以在记录中查看
						</view>
						
						<view  class="qsub">
							<button>立即发起</button>
						</view>
					</block>
					<block v-if="qstatus==2">
						<view class="flexs qddeit">
							<view class="qdImg-q">
								<image src="../../static/img/sm.jpg"></image>
							</view>
							<view class="qdName">
								<view>张三</view>
								<view>
									<text>签到时间</text>
									<text>2022-10-23 23:30:21</text>
								</view>
							</view>
							<view class="qdButton">
								<button>已签到</button>
							</view>
						</view>
					</block>
					
				</view>
				<view class="popup-content" style="height: 800upx" v-if="tabs==7">
					<view class="flexs">
						<view class="setName als-bom" style="margin: auto;">公告</view>
						<view class="chatclose" @click="chatclose">
							<uni-icons type="closeempty" size="18"></uni-icons>
						</view>
					</view>
					
					<view class="noticeCont">
						<textarea placeholder-class= "phsy" placeholder="请输入公告内容"></textarea>
						<view class="busend">
							<button>发送</button>
						</view>
					</view>
					
					
					
				</view>
				<view class="popup-content" style="height: 800upx" v-if="tabs==8">
					<view class="flexs">
						<view class="setName als-bom" style="margin: auto;">聊天设置</view>
						<view class="chatclose" @click="chatclose">
							<uni-icons type="closeempty" size="18"></uni-icons>
						</view>
					</view>
					
					<view class="chat-set">
						<view class="chatPas">会议中聊天权限</view>
						<view class="flexs swline">
							<view>
								允许聊天
							</view>
							<view class="">
								<switch  color="#128DDA" style="transform:scale(0.9,0.9)"/>
							</view>
							
						</view>
						<view class="flexs swline">
							<view>
								允许私聊主持人
							</view>
							<view class="">
								<switch  color="#128DDA" style="transform:scale(0.9,0.9)"/>
							</view>
							
						</view>
						<view class="flexs swline">
							<view>
								全体成员禁言
							</view>
							<view class="">
								<switch  color="#128DDA" style="transform:scale(0.9,0.9)"/>
							</view>
							
						</view>
					</view>
					
					
					
				</view>
				<view class="popup-content" style="height: 1200upx" v-if="tabs==9">
					<view class="flexs">
						<view class="setName als-bom" style="margin: auto;">成员管理</view>
						<view class="chatclose" @click="chatclose">
							<uni-icons type="closeempty" size="18"></uni-icons>
						</view>
					</view>
					
					<view class="memList">
						<view class="search-input">
							<uni-search-bar placeholder="输入搜索内容" bgColor="#F4F7FD"   :focus="false" v-model="searchValue" cancelButton="none" radius="100" height="40"></uni-search-bar>
						</view>
						<view class="mem-with swline">
							<view class="flexs allfx ">
								<view class="memImg">
									<image src="../../static/img/sm.jpg"></image>
								</view>
								<view class="memName">
									<view>王五</view>
									<view>（主持人我）</view>
								</view>
								<view class="flexs memflex">
									<image src="/static/img/l1.png"></image>
									<image src="/static/img/k1.png"></image>
									<image src="/static/img/j1.png"></image>
								</view>
							</view>
						</view>
						<view class="mem-with swline">
							<view class="flexs allfx ">
								<view class="memImg">
									<image src="../../static/img/sm.jpg"></image>
								</view>
								<view class="memName">
									<view>王五</view>
									
								</view>
								<view class="flexs memflex">
									<!-- <image src="/static/img/l1.png"></image> -->
									<image src="/static/img/k1.png"></image>
									<image src="/static/img/j1.png"></image>
								</view>
							</view>
						</view>
											
					</view>
					
					
					<view class="flexs membutton">
						<button>全体静音</button>
						<button>解除全体静音</button>
					</view>
					
				</view>
				<view class="popup-content" style="height: 600upx" v-if="tabs==10">
					<view class="flexs">
						<view class="setName als-bom" style="text-align: left;">选择邀请方式</view>
						<view class="chatclose" @click="chatclose">
							<uni-icons type="closeempty" size="18"></uni-icons>
						</view>
					</view>
					
					<view class="flexs ysflex">
						<view class="yimg">
							<image src="../../static/img/wxf.png"></image>
							<view>微信好友</view>
						</view>
						<view class="yimg">
							<image src="../../static/img/wxp.png"></image>
							<view>朋友圈</view>
						</view>
						<view class="yimg">
							<image src="../../static/img/wxf.png"></image>
							<view>QQ好友</view>
						</view>
						<view class="yimg">
							<image src="../../static/img/wxp.png"></image>
							<view>复制链接</view>
						</view>
					</view>
					
					<view class="iscan" @click="iscanpop">
						<button>取消</button>
					</view>
					
				</view>
				
			</uni-popup>
		</view>
		
			
			
			<button class="trtc-btn-mid" type="primary" size="mini" @click="enterRoom">Enter Room</button>

	</view>
	
</template>

<script>
		import permision from "@/TrtcCloud/permission.js";
		import TrtcCloud from '@/TrtcCloud/lib/index';
		import { TRTCAppScene, TRTCVideoStreamType, TRTCAudioRoute, TRTCAudioQuality } from '@/TrtcCloud/lib/TrtcDefines';
		import { genTestUserSig } from '@/debug/GenerateTestUserSig';
		import TrtcLocalView from '@/TrtcCloud/view/TrtcLocalView';
		import TrtcRemoteView from '@/TrtcCloud/view/TrtcRemoteView';
		const roomId = Math.floor(Math.random() * 100000).toString();
		const userId = 'user_' + Math.floor(Math.random() * 100000).toString();

	export default {
		components: {
			TrtcLocalView: TrtcLocalView,
			TrtcRemoteView: TrtcRemoteView,
		},
		data()
		{
			
			return{
				statusBar:0,
				tabs:3,
				actshow:false,
				qstatus:1,
				trtcCloud:'',
				
				
				trtcCloud: null,
				sdkAppId: 0,
				userSig: '',
				roomId: Math.floor(Math.random() * 100000),
				userId: 'user_' + Math.floor(Math.random() * 100000).toString(),
				appScene: TRTCAppScene.TRTCAppSceneVideoCall, // TRTCAppSceneVideoCall
				isFrontCamera: true,
				streamType: TRTCVideoStreamType.TRTCVideoStreamTypeBig,
				remoteUserId: '',
				audioRoute: TRTCAudioRoute.TRTCAudioRouteSpeaker,
				remoteAudioMuteState: false,
				localAudioMuteState: false,
				localVideoMuteState: false,
			}
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
			this.createTrtcCloud()
			this.trtcCloud.on('onWarning', (res) => {
			    console.log('- onWarning: ', JSON.stringify(res));
			});
			this.trtcCloud.on('onError', (res) => {
			    console.log('- onError: ', JSON.stringify(res));
			});
				
			
		},
		
		
		mounted()
		{
			if (uni.getSystemInfoSync().platform === 'android') {
				permision.requestAndroidPermission('android.permission.RECORD_AUDIO');
				permision.requestAndroidPermission('android.permission.CAMERA');
			}

			// 生成 userSig
			const { sdkAppId, userSig } = genTestUserSig(this.userId);
			this.sdkAppId = sdkAppId;
			this.userSig = userSig;
			if (!sdkAppId || !userSig) {
				uni.showToast({
					title: '请填写 sdkAppId、userSig',
					icon: 'none'
				});
			}
		},
		onUnload() {
			this.destroyInstance();
			console.log('- onUnload');
		},
		unmounted() {
			this.handleUninstallEvents();
		},
		onBackPress() {
			this.destroyInstance();
		},
		
		methods:{
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
			showAction()
			{
				this.actshow = !this.actshow
			},
			chatpoup()
			{
				uni.hideKeyboard()
				this.$refs.popup.open('bottom');
			},
			chatclose()
			{
				this.$refs.popup.close()
				if(this.tabs==4 || this.tabs==5 ||this.tabs==6 || this.tabs==7 || this.tabs==8 || this.tabs==9 || this.tabs==10)
				{
					this.$refs.popupover.close()
				}
			},
			ioTabs(pams)
			{
				this.tabs=pams
				if(pams==4 || pams==5 || pams==6 || pams==7 || pams==8 || pams==9 ||pams==10)
				{
					this.$refs.popupover.open('bottom')
				}
			},
			qdChange(pams)
			{
				this.qstatus=pams
			},
			iscanpop()
			{
				this.$refs.popupover.close()
			},
			
			
			
			bindInputChange(event, type) {
				const value = event.detail.value;
				switch (type) {
					case 'roomId': {
						this.roomId = value;
						break;
					}
					case 'userId': {
						this.userId = value;
						break;
					}
				}
			},
			destroyInstance() {
				if (this.trtcCloud) {
					TrtcCloud.destroyInstance();
					this.trtcCloud = null;
					uni.showToast({
						title: '销毁实例',
						icon: 'none'
					});
				}
			},
			createTrtcCloud() {
				uni.showToast({
					title: '创建实例 ',
					icon: 'none',
				});
				this.trtcCloud = TrtcCloud.createInstance();
				this.handleEvents();
			},
			enterRoom() {
				try {
					const { roomId, userId, sdkAppId, appScene, userSig } = this;
					let param = { roomId: +roomId, userId, sdkAppId, userSig };
					
					console.log('ddparamparam',param)
					this.trtcCloud.enterRoom(param, appScene);
					uni.showToast({
						title: 'enterRoom ',
						icon: 'none',
					});
				} catch (error) {
					console.log(`enterRoom error = ${JSON.stringify(error)}`);
				}
				
				uni.navigateTo({
					url:'/pages/newRoom/newRoom'
				})
			},
			exitRoom() {
				try {
					this.stopLocalPreview();
					this.stopRemoteView();
					this.stopLocalAudio();
					this.trtcCloud.exitRoom();
					this.remoteUserId = '';
					this.handleUninstallEvents();
				} catch (e) {
					// TODO handle the exception
				}
			},
						// 本地预览
						startLocalPreview() {
							this.trtcCloud.startLocalPreview(this.isFrontCamera, this.userId);
							uni.showToast({
								title: 'localPreview',
								icon: 'none',
							});
						},
						stopLocalPreview() {
							this.trtcCloud.stopLocalPreview();
						},
						// 切前置、后置
						switchCamera() {
							this.isFrontCamera = !this.isFrontCamera;
							this.trtcCloud.switchCamera(this.isFrontCamera);
						},
			      muteLocalVideo() {
							this.localVideoMuteState = !this.localVideoMuteState;
							this.trtcCloud.muteLocalVideo(TRTCVideoStreamType.TRTCVideoStreamTypeBig, this.localVideoMuteState);
						},
						startLocalAudio() {
			        try {
			          this.trtcCloud.startLocalAudio();
			          uni.showToast({ title: 'start local audio', icon: 'none' })
			        } catch (e) {
			
			        }
			      },
			      stopLocalAudio() {
			        this.trtcCloud.stopLocalAudio();
			      },
						muteLocalAudio() {
							this.localAudioMuteState = !this.localAudioMuteState;
							this.trtcCloud.muteLocalAudio(this.localAudioMuteState);
						},
						startRemoteView() {
							if (this.remoteUserId) {
								this.trtcCloud.startRemoteView(this.remoteUserId, this.streamType, this.remoteUserId);
								uni.showToast({
									title: `the remoteUserId: ${this.remoteUserId}`,
									icon: 'none',
								});
							} else {
								uni.showToast({
									title: '无远端用户',
									icon: 'none',
								});
							}
						},
						stopRemoteView() {
							if (this.remoteUserId) {
								this.trtcCloud.stopRemoteView(this.remoteUserId, this.streamType);
							}
						},
						muteRemoteAudio() {
							this.remoteAudioMuteState = !this.remoteAudioMuteState;
							console.log('远端用户 id = ', this.remoteUserId, '状态 = ', this.remoteAudioMuteState);
							this.remoteUserId && this.trtcCloud.muteRemoteAudio(this.remoteUserId, this.remoteAudioMuteState);
						},
						// 听筒、免提 切换
						switchAudioRoute() {
							this.audioRoute = this.audioRoute === TRTCAudioRoute.TRTCAudioRouteSpeaker ? TRTCAudioRoute.TRTCAudioRouteEarpiece : TRTCAudioRoute.TRTCAudioRouteSpeaker;
							this.trtcCloud.setAudioRoute(this.audioRoute);
						},
						handleEvents() {
							this.trtcCloud.on('onWarning', (res) => {
								uni.showToast({
									title: `onWarning: ${JSON.stringify(res)}`,
									icon: 'none',
								});
							});
							this.trtcCloud.on('onError', (res) => {
								console.log('- onError: ', JSON.stringify(res));
								uni.showToast({
									title: `error: ${JSON.stringify(res)}`,
									icon: 'none',
								});
							});
							this.trtcCloud.on('onEnterRoom', (result) => {
								console.log(`- onEnterRoom = ${result}`);
								if (result > 0) {
									uni.showToast({
										title: `进房成功，耗时: ${result}ms`,
										icon: 'none',
									});
								} else {
									console.log(`enter room failed，error code = ${result}`);
								}
							});
							this.trtcCloud.on('onExitRoom', (reason) => {
								const reasonList = ['主动调用 exitRoom 退房', '被服务器踢出当前房间', '当前房间整个被解散'];
								uni.showToast({
									title: `退房 ${reasonList[reason]}`,
									icon: 'none',
									duration: 1000
								});
							});
							this.trtcCloud.on('onFirstVideoFrame', (res) => {
								console.log(`渲染的首帧画面响应 = ${JSON.stringify(res)}`);
							});
							this.trtcCloud.on('onRemoteUserEnterRoom', (userId) => {
								this.remoteUserId = userId;
								uni.showToast({
									title: `远端进房: userId = ${userId}`,
									icon: 'none',
								});
							});
							this.trtcCloud.on('onUserVideoAvailable', (res) => {
								const {
									userId,
									available
								} = res;
								console.log('onUserVideoAvailable = ', res);
								if (userId && available) {
									this.remoteUserId = userId;
								}
							});
						},
						handleUninstallEvents() {
							this.trtcCloud.off('*');
						}
					
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.nfs{
		z-index: 99;
		background-color: #fff;
		display: block;
		padding-left: 0;
	}
	.sumap{
		
		border-bottom: 2upx solid #ccc!important;
		padding-bottom: 30upx!important;
		justify-content: space-between;
		
	}
	.active{
		font-size: 34upx;
		font-weight: 600;
		color: #333;
	}
	.noact{
		color: #666;
		font-size: 28upx;
	}
	.hostmain{
		text-align: center;
		padding-top: 32upx;
		font-size: 28upx;
	}
	.hostmain image{
		width: 116upx;
		height: 116upx;
		border-radius: 100%;
		
	}
	.hostmp{
		padding-top: 14upx;
	}
	.otherImg{
		display: flex;
		/* padding: 12upx 52upx; */
		align-items: center;
		flex-wrap: wrap;
		width: 100%;
		padding-top: 12upx;
	}
	.otimg{
		width: 30%;
		margin-left: 2.5%;
		padding-bottom: 6upx;
	}
	
	.bomtabr{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.bodHeight,.enterBox{
		padding: 20upx 52upx;
		text-align: center;
	}
	.bodHeight{
		font-size: 24upx;
		color: #333;
	}
	
	.enterBox{
		background-color: #F5F5F5;
	}
	.setinput{
		justify-content: flex-start;
		align-items: center;
	}
	.eninput{
		margin-left: 20upx;
	}
	.eninput input{
		background: #fff;
		height: 52upx;
		line-height: 52upx;
		width: 420upx;
		border-radius: 12upx;
		text-align: left;
		padding-left: 40upx;
	}
	.m1 image,.s1 image{
		width:44upx;
		height: 44upx;
	}
	.y1 image{
		width:48upx;
		height: 48upx;
	}
	.popup-content{
		height: 600upx;
		padding: 0;
	}
	.chetFlex{
		text-align: center;
		position: relative;
		padding-top: 28upx;
		padding-left: 32upx;
	}
	.othchat{
		text-align: left;
		padding: 32upx;
	}
		
	.setName{
		padding: 32upx;
		font-weight: 600;
		font-size: 28upx;
	}
	.als-bom{
		border-bottom: 2upx solid #F0F0F0;
		width: 100%;
	}
	.Qdmess{
		margin-top: 40upx;
		padding: 0 146upx;
	}
	.adcontent{
		margin: 40upx 52upx;
		background-color: #F4F7FD;
		border-radius: 10upx;
	}
	.adcontent textarea{
		text-align: left;
		padding: 20upx;
	}
	.chatclose{
		position: absolute;
		right: 0;
		top: 0;
		padding-top: 28upx;
		padding-right: 32upx;
	}
	.chatbottom{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 60upx 0;
	}
	.chatcont{
		padding-left: 32upx;
	}
	.chatcont input{
		text-align: left;
		padding-left: 18upx;
		background-color: #F5F9F9;
		width: 428upx;
		height: 56upx;
		border-radius: 12upx;
	}
	.insend{
		padding-right: 28upx;
		align-items: center;
		
	}
	.sendbut button{
		background-color:#128DDA ;
		font-size: 24upx;
		padding: 14upx 34upx;
		color: #fff;
	}
	.adImg image{
		width: 48upx;
		height: 48upx;
		padding-left: 20upx;
	}
	
	.left_box {
				
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		padding: 10upx 32upx;
		margin-bottom: 20rpx;
		text-align: left;
		.chat_item {
			// width: 72%;
			margin-left: 52upx;
			margin-top: 12upx;
			height: auto;
			border-radius: 10upx;
			box-sizing: border-box;
			padding: 20upx 40upx;
			background: #E4F5FF;
			color: #000;
			font-size: 28upx;
			font-size: 30upx;
			position: relative;

			.msg_icon {
				width: 40upx;
				height: 40upx;
				display: inline-block;
				vertical-align: middle;
				margin-left: 10upx;
				margin-right: 0;
			}
		}

		// .chat_item:after,
		.chat_item:before {
			border: solid transparent;
			content: ' ';
			height: 0;
			left: -18upx;
			position: absolute;
			width: 0;
		}

	// 	.chat_item:after {
	// 		border-width: 10upx;
	// 		border-right-color: #E4F5FF;
	// 		top: 45%;
	// 	}
	
		.chat_item:before {
			border-width: 10upx;
			border-right-color: #E4F5FF;
			top: 44%;
		}
	}
	
	.right_box {
				
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		flex-direction: column;
		padding: 10upx 0;
		padding-right: 32upx;
		margin-bottom: 20rpx;
		text-align: left;
		font-size: 28upx;
		image {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			background: #128DDA;
			margin-left: 20upx;
		}
	
		.chat_item {
			// width: 72%;
			height: auto;
			border-radius: 10upx;
			box-sizing: border-box;
			padding: 20upx 40upx;
			margin-right: 52upx;
			margin-top: 12upx;
			background: #128DDA;
			border: 1upx solid #128DDA;
			color: #666;
			font-size: 30upx;
			position: relative;
			color: #fff;
			.msg_icon {
				width: 40upx;
				height: 40upx;
				display: inline-block;
				vertical-align: middle;
				margin-left: 10upx;
				margin-right: 0;
			}
		}

		// .chat_item:after,
		.chat_item:before {
			border: solid transparent;
			content: ' ';
			height: 0;
			left: 100%;
			position: absolute;
			width: 0;
		}

		// .chat_item:after {
		// 	border-width: 10upx;
		// 	border-left-color: #128DDA;
		// 	top: 42%;
		// }

		.chat_item:before {
			border-width: 12upx;
			border-left-color: #128DDA;
			top: 40.8%;
		}
	}
	
	.sele-action{
		text-align: left;
		padding: 40upx 32upx;
	}
	.crtitle{
		font-size: 20upx;
		color: #666;
		padding-top: 82upx;
		padding-bottom: 32upx;
	}
	.overbutton,.canbutton{
		padding: 32upx 132upx;
		font-size: 28upx;
	}
	.overbutton button
	{
		background: #F4F7FD;
		padding: 20upx 0;
		color: #FA4F1A;
	}
	.canbutton button{
		background-color: #128DDA;
		padding: 20upx 0;
		color: #fff;
	}
	.inflex{
		flex-wrap: wrap;
		justify-content: space-between;
		padding:0 52upx;
		
	}
	.ingard{
		margin-bottom: 52upx;
		margin-top: 33upx;
		width: 26%;
		font-size: 24upx;
		color: #666;
	}
	
	.aNames{
		padding-top: 12upx;
	}
	.qdimg image{
		width: 56upx;
		height: 56upx;
		background: #F7F7F7;
		padding: 28upx 26upx;
		border-radius: 8upx;
	}
	.sername{
		font-size: 28upx;
		font-weight: 600;
	}
	.qsactive::after{
		content: '';
		display: block;
		border-bottom: 4upx solid #128DDA;
		padding-bottom: 4upx;
		width: 80upx;
		
		margin: auto;
	}
	.qsMes{
		font-size: 28upx;
		padding-top: 32upx;
		color: #666;
		padding-left: 52upx;
		padding-right: 52upx;
		text-align: left;
	}
	.qsub button{
		margin: 323upx 56upx 123upx 56upx;
		background-color: #128DDA;
		padding: 26upx 0;
		color: #fff;
	}
	.qdImg-q image
	{
		width: 80upx;
		height: 80upx;
		border-radius: 100%;
	}
	.qddeit{
		padding: 20upx 52upx;
		align-items: center;
		justify-content: flex-start;
		text-align: left;
		padding-bottom: 26upx;
		border-bottom: 4upx solid #F5F5F5;
	}
	.qdName{
		flex: 1;
		padding-left: 34upx;
	}
	.qdName view:nth-child(1)
	{
		font-size: 28upx;
		font-weight: 600;
		padding-bottom: 16upx;
	}
	.qdName view:nth-child(2)
	{
		font-size: 22upx;
		color: #666;
	}
	.qdButton button{
		padding: 8upx 24upx;
		font-size: 26upx;
		background-color: #BAE3FC;
		color: #fff;
		border-radius: 30upx;
	}

	.noticeCont{
		margin: 40upx 52upx;
		height: 440upx;
		background: #F4F7FD;
		border-radius: 10upx;
		position: relative;
	}
	.noticeCont textarea{
		width: 100%;
		height: 100%;
		text-align: left;
		padding: 20upx;
	}
	.busend{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 40upx;
	}
	.busend button{
		background-color: #128DDA;
		width: 26%;
		padding: 14upx 0;
		font-size: 28upx;
		color: #fff;
	}
	.chatPas{
		margin-bottom: 28upx;
		text-align: left;
		font-size: 28upx;
		font-weight: 600;
	}
	.chat-set{
		padding: 50upx 32upx;
	}
	.swline
	{
		padding-top: 28upx;
		border-bottom: 4upx solid #F0F0F0;
		padding-bottom: 26upx;
	}
	.search-input{
		padding: 32upx;
	}
	.memImg image{
		width: 80upx;
		height: 80upx;
		border-radius: 100%;
	}
	.memflex image
	{
		width: 48upx;
		height: 48upx;
	}
	.mem-with{
		padding: 26upx 52upx;
	}
	.allfx{
		justify-content: flex-start;
		align-items: center;
	}
	.memName view:nth-child(1)
	{
		font-size: 28upx;
		font-weight: 600;
	}
	.memflex image:nth-child(2)
	{
		padding-left: 32upx;
		// padding-right: 32upx;
	}
	.memflex image:nth-child(3)
	{
		padding-left: 32upx;
		// padding-right: 32upx;
	}
	
	.memName view:nth-child(2)
	{
		font-size: 22upx;
		color: #666666;
		padding-top: 16upx;
	}
	.memName{
		padding-left: 34upx;
		flex: 1;
		text-align: left;
	}
	
	
	.membutton{
		padding-top: 194upx;
		padding-left: 32upx;
		padding-right: 32upx;
	}
	.membutton button{
		background-color: #128DDA;
		padding: 20upx 43upx;
		width: 320upx;
		color: #fff;
		font-size: 28upx;
	}
	
	.ysflex{
		
		padding:46upx  54upx 46upx 54upx;
	}
	.yimg image{
		width: 92upx;
		height: 92upx;
	}
	.yimg view{
		padding-top: 8upx;
		font-size: 26upx;
		color: #666;
	}
	.iscan button
	{
		padding: 26upx 0;
		background: #128DDA;
		margin: 40upx 132upx;
		color: #fff;
	}
</style>