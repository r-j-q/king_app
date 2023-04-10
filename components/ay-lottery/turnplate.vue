<template>
	<view>
		<view class="box-ly-zp" :style="style_box">
				<view :animation="animationData" class="cs-ct" :style="style_wh">
					<view class="cs-line">
						<view class="cs-litem"  v-for="(item,index) in awardsList" :key="index" :style="[{transform:'rotate('+item.lineTurn+')'},{'background-color':themeColor},{left:(width/2) +'rpx'},{height:(height/2) +'rpx'},{'-webkit-transform-origin': '50% ' +(height/2) +'rpx'},{'transform-origin': '50% ' +(height/2) +'rpx'}]"></view>
					</view>
					<view class="cs-list">
						<view class="cs-item" :style="{color: themeColor }" v-for="(iteml,index2) in awardsList" :key="index2">
							<view class="cs-item-text" :style="[{transform:'rotate('+iteml.turn+')'},{'-webkit-transform-origin': '50% ' +(height/2) +'rpx'},{'transform-origin': '50% ' +(height/2) +'rpx'}]">
								<view class="txt">{{iteml.name}}</view>
								<image lazy-load="true" class="cs-item-text-img" :src="iteml.img" @tap="toDetailPage({index: index2})"></image>
							</view>
						</view>
					</view>
				</view>
				<view @tap="playReward" class="cs-btn" :style="[{left:((width/2)-55) +'rpx'},{top:((height/2)-55) +'rpx'}]" v-bind:class="btnDisabled">
					<view>立即组团</view>
					
					</view>
				<!-- <view class="cs-btn-table" :style="[{left:((width/2)-50) +'rpx'},{top:((height/2)+50) +'rpx'},{color: themeColor }]">剩余{{chance_num}}次</view> -->
			</view>
			
			
			<view class="op-height">
				<uni-popup ref="popup" :mask-click="false">
					<view class="popup-content">
							<view class="closes" @click="contine">
								<uni-icons type="closeempty" color="#000" size="26"></uni-icons>

							</view>
							<view class="titCog">提示</view>
							<view class="contes">
								{{titile}}
							</view>
							<view class="continue">
								<button @click="contine">继续组团</button>
							</view>
						</view>
					
					
				</uni-popup>
			</view>
			
			</view>
			
		
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			ticketnums: {
				type: Number,
				default: 0, //1:翻牌  2:跑马灯 3：转盘 4： 刮一刮（文本） 5： 刮一刮（图片）6： 刮一刮（随便定义）
			},
			point: {
				type: Number,
				default: 0, //1:翻牌  2:跑马灯 3：转盘 4： 刮一刮（文本） 5： 刮一刮（图片）6： 刮一刮（随便定义）
			},
			height: {
				type: Number,
				default: 700
			},
			width: {
				type: Number,
				default: 700
			},
			themeColor: {
				type: String,
				default: '#fdc550',
			},
			chance_num_init :{
				type: Number,
				default: 5
			},
			//停留位置
			stay_index :{
				type: Number,
				default: 1
			},
			addid:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				chance: true,
				titile:'',
				awardsList: {},
				animationData: {},
				btnDisabled: '',
				chance_num: 5,
				setCountModal:false,
				setIsSuccess:false,
				setTimeOut:false,
				setShow:false,
				no_win_lottery_points:0,
				setpost:false,
				setzeroId:0
			};
		},
		watch:{
			list(){
				this.init()
			},
			chance_num_init(e){
				this.chance_num = e ;
			},
		},
		
		created() {
			this.init();
			this.chance_num = this.chance_num_init ;
		
			if(this.addid)
			{
				this.seleResult(this.addid)
			}
		},
		
		computed: {
			
			style_box() {
				let that = this;
				var height = parseInt(that.height);
				var width = parseInt(that.width);
				var style = '';
				if (height > 0) {
					style = `height:${height}rpx;`;
				}
				if (width > 0) {
					style += `width:${width}rpx;`;
				}
				style += `border: 16rpx solid ${that.themeColor};`;
				return style;
			},
			style_wh() {
				let that = this;
				var height = parseInt(that.height);
				var width = parseInt(that.width);
				var style = '';
				if (height > 0) {
					style = `height:${height}rpx;`;
				}
				if (width > 0) {
					style += `width:${width}rpx;`;
				}
				return style;
			},
			
		},
		
		methods: {
				contine()
				{
					
					this.$refs.popup.close();
					this.btnDisabled='';
					
					this.gotseleResult(this.addid)
				},
				seleResult(id)
				{
					// 对比记录
					var  count = uni.getStorageSync('record');
					
					// 获取最近一次记录
					if (id) {
						uni.showLoading({
							title:'加载中...',
							mask:true
						})
						this.api.interactive.personalRaffle(id).then(res=>{
							if(res.code===200)
							{
								uni.hideLoading();
								  this.no_win_lottery_points= res.data[0].no_win_lottery_points

									
								  if (res.data[0].team_records[0].status == 0)
								  {
									  
										this.setCountModal=false
								  } else if (res.data[0].team_records[0].status == 1) {
									  
										res.data[0].detail.map(item => {
										  if (count != res.data[0].team_records[0].id) 
										  {
											this.setCountModal=true
										  }
										  
								      if (item.record_id == res.data[0].team_records[0].id) {
										  
											if (item.status && count !=res.data[0].team_records[0].id) {
												
												  this.setIsSuccess=true
												  this.$refs.popup.open('center')
												  this.titile='组团成功，获得2倍积分';
												  this.btnDisabled = 'disabled';
												  
											} else {
												
												if(count !=res.data[0].team_records[0].id)
												{
													this.setIsSuccess=false										 
													this.$refs.popup.open('center')
													this.titile='再来一次，赠送'+this.no_win_lottery_points+'积分+抽奖券1张奖励'
													// this.titile='组团失败1次，获得85任务积分+15元代金券+1张抽奖券奖励'
												}
											 
											 
										}
										
										
								      }
								    });
								  } else if (res.data[0].team_records[0].status ==2) {
									  uni.hideLoading();
								    //设置超时返回
								    if (count != res.data[0].team_records[0].id) {
								      
										this.setTimeOut=true
										 uni.showToast({
											title:'组团超时退还奖券积分',
											icon:"error"
										 })
									  uni.setStorageSync('record',res.data[0].team_records[0].id)
									  
								    }
							  }
							  
							  
								
							}
						})
					  
					}
				},
				
			gotseleResult(id)
			{
				// 对比记录
				var  count = uni.getStorageSync('record');
				
				// 获取最近一次记录
				if (id) {
					
					this.api.interactive.personalRaffle(id).then(res=>{
						if(res.code===200)
						{
							 
							  if (res.data[0].team_records[0].status == 0)
							  {
								  
									// this.setCountModal=false
							  } else if (res.data[0].team_records[0].status == 1) {
								  
									res.data[0].detail.map(item => {
									  if (item.record_id == res.data[0].team_records[0].id) {
										   //设置记录id
											this.setzeroId=res.data[0].team_records[0].id
											uni.setStorageSync('record',res.data[0].team_records[0].id)
									  }
							    });
							  } else if (res.data[0].team_records[0].status ==2) {
								  
									uni.setStorageSync('record',res.data[0].team_records[0].id)

							    }
						  }
						  
						  
							
						
					})
				  
				}
			},
			
						
			//详情页
			toDetailPage(item) {
				let that = this ;
				let list = that.awardsList ;
				let index = item.index ;
				let data = {
					curIndex: index,
					item : list[index] ,
					list: list
				};
				this.$emit('toDetailPage', data);
			},
			//画抽奖圆盘  
			init: function() {
				var awards = this.list;
				var awardsList = [];
				var turnNum = 1 / awards.length * 360; // 文字旋转 turn 值  

				// 奖项列表  
				for (var i = 0; i < awards.length; i++) {
					awardsList.push({
						turn: i * turnNum + 'deg',
						lineTurn: i * turnNum + turnNum / 2 + 'deg',
						name: awards[i].name,
						img : awards[i].img,
					});
				}

				this.btnDisabled = this.chance ? '' : 'disabled';
				this.awardsList = awardsList;
			},

			//发起抽奖  
			playReward: function() {
				// uni.setStorageSync('record',0)

				if(this.btnDisabled=='disabled')
				{
					this.btnDisabled='btnDisabled'
					return
				}
				let that = this ;
				if (this.ticketnums == 0) {
					uni.showToast({
						title: '抽奖券不足！',
						icon: 'none'
					})
					return
				}
				//中奖index  
				var awardsNum = that.list;
				//var awardIndex = Math.round(Math.random() * (awardsNum.length - 1)); //随机数  
				var awardIndex = that.stay_index ;
				var runNum = 8; //旋转8周  
				var duration = 4000; //时长  

				// 旋转角度  
				this.runDeg = this.runDeg || 0;
				this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - awardIndex * (360 / awardsNum.length))
				//创建动画  
				var animationRun = uni.createAnimation({
					duration: duration,
					timingFunction: 'ease'
				})
				animationRun.rotate(that.runDeg).step();
				that.animationData = animationRun.export();
				that.btnDisabled = 'disabled';

				// 中奖提示  
				var isAward = that.list[awardIndex].isAward || false;
				that.chance_num = that.ticketnums - 1;
				if(this.addid)
				{
					that.api.interactive.raffleActivity(this.addid).then(res=>{


						if (res.data === 'wait') {
						       
								that.titile='等待组团成功!'
							    that.$refs.popup.open('center');
								setTimeout(function() {
									
									let data = {
										curIndex: awardIndex,
										item: that.list[awardIndex],
										list: that.list,
										isAward : isAward ,
										data:res.data
									};
									this.$emit('result', data);
									
								}.bind(that), duration);
						       } else if (res.data === 'win') {
						         //弹窗
						         that.setShow=true
						         that.setIsSuccess=true
								 // uni.setStorageSync('ismode',true)
								setTimeout(function() {
									
									that.titile='组团成功，2倍积分奖励!'
									that.$refs.popup.open('center');
									
									this.btnDisabled='disabled'
								}.bind(that), duration);
									
								 setTimeout(function() {
								 	
								 	let data = {
								 		curIndex: awardIndex,
								 		item: that.list[awardIndex],
								 		list: that.list,
								 		isAward : isAward ,
								 		data:res.data
								 	};
								 	this.$emit('result', data);
								 	
								 }.bind(that), duration);
						       } else if (res.data === 'nowin') {
						     
								 that.setShow=true
								 that.setIsSuccess=false
								 
								 this.$refs.popup.open('center')
								 uni.setStorageSync('record',0)
								 this.titile='组团失败退还奖券！'
						       }
						
						 
						
					}).catch(err=>{
						
						setTimeout(function() {
							
							uni.showModal({
								title: '提示',
								content: err.message,
								showCancel: false
							});
							that.btnDisabled = '';
							// uni.showToast({
													
							// 	title: err.message,
							// 	icon:'error',
							// 	showCancel: false
							// });
						}.bind(that), duration);
					})
				}
				
				
				
				
			}
		}

	}
</script>

<style>
	
	.popup-content{
		padding: 0 60upx;
		position: relative;
		border-radius: 20rpx;
		
	}
	.closes{
		position: absolute;
		right:  0;
	}
	.fiexed{
		
		z-index: 100000;
		    position: fixed;
		    top: 0;
		    height: 100%;
		    width: 100%;
	}
	.contes{
		margin-top: 20upx;
		background: #faecef;
		padding: 5upx 16upx;
		border-radius: 10upx;
		font-size: 22upx;
		color: #7d3829;
		text-align: left;
	}
	.txt{
		padding-top: 10upx;
		padding-bottom: 10upx;
		width: 100upx;
		font-size: 20upx;
	}
	.titCog{
		text-align: center;
		font-size: 28upx;
		font-weight: 600;
		color: crimson;
		padding-top: 30upx;
	}
	.continue{
		margin-top: 40upx;
		padding-bottom: 40upx;
	}
	.continue button{
		background: linear-gradient(-51deg, #F6C961, #FBE9AA);
		font-size: 22upx;
		width: 160upx;
		padding: 10upx 20upx;
		border-radius: 20upx;
		color: #7d3829;
	}
	
	/* 转盘 */
	.box-ly-zp {
		margin: 40upx auto;
		position: relative;
		border-radius: 50%;
		box-shadow: 0 10upx 30upx #333, 0 0 10upx #000;
		
	}

	.cs-ct {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		display: block;
		border-radius: inherit;
		background-clip: padding-box;
	}

	.cs-element {
		position: relative;
		z-index: 1;
		width: inherit;
		height: inherit;
		border-radius: 50%;
	}

	.cs-list {
		position: absolute;
		left: 0;
		top: 0;
		width: inherit;
		height: inherit;
		z-index: 9999;
	}

	.cs-item {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		font-weight: bold;
		text-shadow: 0 1upx 1upx rgba(255, 255, 255, 0.6);
	}

	.cs-item-text {
		position: relative;
		display: block;
		padding-top: 20upx;
		margin: 0 auto;
		text-align: center;
		
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #FFFFFF;
	}

	.cs-item-text text {
		font-size: 28upx;
	}

	.cs-item-text-img {
		width: 70upx;
		height: 70upx;
		
		/* border-radius: 50%; */
	}

	/* 分隔线 */
	.cs-line {
		position: absolute;
		left: 0;
		top: 0;
		width: inherit;
		height: inherit;
		z-index: 99;
	}

	.cs-litem {
		position: absolute;
		
		top: 0;
		width: 3upx;
		
		overflow: hidden;
		
	}

	/**  
* 抽奖按钮  
*/
	.cs-btn {
		position: absolute;
		/* background-color: f78040-fcaa69; */
		background: linear-gradient(to bottom,#f78040,#fcaa69);
		z-index: 400;
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		font-size: 28upx!important;
		line-height: 120upx;
		text-align: center;
		font-size: 22upx;
		text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
		text-decoration: none;
		border: 6upx solid #FBE9AA;
		color: #FFFFFF;
	}

	/* .cs-btn::after {
		position: absolute;
		display: block;
		content: ' ';
		left: 26upx;
		top: -66upx;
		width: 0;
		height: 0;
		overflow: hidden;
		border-width: 36upx;
		border-style: solid;
		border-color: transparent;
		border-bottom-color: red;
	} */

	.cs-btn.disabled {
		pointer-events: none;
		background: #b07a7b;
		color: #ccc;
	}

	.cs-btn.disabled::after {
		border-bottom-color: #b07a7b;
	}

	.cs-btn-table {
		
		width: 120upx;
		text-align: center;
		position: absolute;
		
		font-size: 26upx;
		background-color: #FFFFFF;
		opacity: 0.9;
	}
</style>
