<template>
	<view class="top-tab"  >
	
		<!-- 任务大厅新开发 -->
		<view class="newTaskHall"  :style="[{'paddingTop':statusBar+'px'}]">
			<view class="newtask" v-for="(item,index) in newtaskTabs" :key="item.index">
				<button @click="newTabs(index)" v-if="item.icons" :class="index==newstatus?'newactive':'newdefault'">
					{{item.name}}<uni-icons type="bottom" color="index==1?'#fff':'#000'"  size="14"></uni-icons>
				</button>
				<button @click="newTabs(index)" v-else :class="index==newstatus?'newactive':'newdefault'">{{item.name}}</button>
			</view>
		</view>
		<view class="hallWith" v-if="newstatus==0">
			<view class="hallList">
				<view class="flexs newHall-inner">
					<view class="flexs taskName">
						<view>
							<uni-icons custom-prefix="iconfont" color="#51A719" type="icon-yingxiao" size="24"></uni-icons>
						</view>
						<view class="alone-Ne">
							营销任务
						</view>
					</view>
					<view class="mitime">2022.09.29 11:36:52</view>
				</view>
				<view class="taskIntr">
					<view>任务佣金: 100</view>
					<view>任务积分: 100</view>
					<view>任务发布人: 王者系统旗舰店</view>
				</view>
				<view class="taskReceive">
					<button @click="getTask">领取</button>
				</view>
			</view>
			<view class="hallList">
				<view class="flexs newHall-inner">
					<view class="flexs taskName">
						<view class="wxshare">
							<uni-icons custom-prefix="iconfont" color="#fff" type="icon-24px" size="24"></uni-icons>
						</view>
						<view class="alone-Ne">
							转发
						</view>
					</view>
					<view class="mitime">2022.09.29 11:36:52</view>
				</view>
				<view class="taskIntr">
					<view>任务佣金: 100</view>
					<view>任务积分: 100</view>
					<view>任务发布人: 王者系统旗舰店</view>
				</view>
				<view class="taskReceive">
					<button @click="getTask">领取</button>
				</view>
			</view>
			<view class="hallList">
				<view class="flexs newHall-inner">
					<view class="flexs taskName">
						<view>
							<uni-icons custom-prefix="iconfont" color="#E16731" type="icon-shouhou" size="24"></uni-icons>
						</view>
						<view class="alone-Ne">
							营销任务
						</view>
					</view>
					<view class="mitime">2022.09.29 11:36:52</view>
				</view>
				<view class="taskIntr">
					<view>任务佣金: 100</view>
					<view>任务积分: 100</view>
					<view>任务发布人: 王者系统旗舰店</view>
				</view>
				<view class="taskReceive">
					<button @click="getTask">领取</button>
				</view>
			</view>
							
		</view>
		<view class="hallWith" v-if="newstatus==1">
			<view class="hallList">
				<view class="flexs newHall-inner">
					<view class="flexs taskName">
						<view>
							<uni-icons custom-prefix="iconfont" color="#51A719" type="icon-yingxiao" size="24"></uni-icons>
						</view>
						<view class="alone-Ne">
							营销任务
						</view>
					</view>
					<view class="goTaskApi">
						<button class="goTaskApiBUtton">去完成</button>
					</view>
				</view>
				<view class="mystatusTaks">
					<view>
						<uni-icons custom-prefix="iconfont" color="#E16731" type="icon-shijian" size="30"></uni-icons>
					</view>
					<view class="tintr-inn">
						<text class="taskSetname">营销任务</text>
						<text class="overStatud">待完成</text>
					</view>
				</view>
				<view class="taskIntr mytask">
					<view class="inflex">
						<view class="tasName">任务佣金:</view><view>100</view>
					</view>
					<view class="inflex">
						<view class="tasName">任务积分:</view><view>100</view>
					</view>
					<view class="inflex">
						<view class="tasName">任务发布人:</view><view>王者系统旗舰店</view>
					</view>
					<view class="inflex">
						<view class="tasName">发布时间:</view><view>2022-10-25 20:10:55</view>
					</view>
					
				</view>
				
			</view>
			<view class="hallList">
				<view class="flexs newHall-inner">
					<view class="flexs taskName">
						<view class="wxshare">
							<uni-icons custom-prefix="iconfont" color="#fff" type="icon-24px" size="24"></uni-icons>
						</view>
						<view class="alone-Ne">
							营销任务
						</view>
					</view>
					<view class="goTaskApi">
						<button class="alover">已完成</button>
					</view>
				</view>
				<view class="mystatusTaks">
					<view>
						<uni-icons custom-prefix="iconfont" color="#75BE46" type="icon-yiwancheng" size="34"></uni-icons>
					</view>
					<view class="tintr-inn">
						<text class="taskSetname">营销任务</text>
						<text class="overStatud alover">待完成</text>
					</view>
				</view>
				<view class="taskIntr mytask">
					<view class="inflex">
						<view class="tasName">任务佣金:</view><view>100</view>
					</view>
					<view class="inflex">
						<view class="tasName">任务积分:</view><view>100</view>
					</view>
					<view class="inflex">
						<view class="tasName">任务发布人:</view><view>王者系统旗舰店</view>
					</view>
					<view class="inflex">
						<view class="tasName">发布时间:</view><view>2022-10-25 20:10:55</view>
					</view>
					
				</view>
				
			</view>
							
		</view>
		<view class="hallWith" v-if="newstatus==2">
			<view class="userMess">
				<view class="userImg">
					<image src="../../static/img/p.png"></image>
				</view>
				<view class="userIntr">
					<view>用户 15284753324</view>
					<view>任务信用分 550</view>
				</view>
			</view>
			<view class="taskSelfWith">
				<view class="taskreWard">
					<view>
						<text>累计任务现金奖励</text>
						<text>100</text>
					</view>
					<view>
						<text>累计任务绩效奖励</text>
						<text>100</text>
					</view>
					<view>
						<text>累计任务现金奖励</text>
						<text>100</text>
					</view>

				</view>
				<view class="taskAnalysis">
					<view class="taskan">任务解析</view>
					
					 <view class="charts-box">
					     <qiun-data-charts 
					          type="radar"
					          :opts="opts"
					          :chartData="chartData"
					        />
					  </view>
				</view>
				
				<view class="stepMp">
				
						<uni-steps  @stepChange="parentTest" :options="list1" active-icon="checkbox" :active="active" />
					
				</view>
				<view class="slefIntr">
					<view class="self-with">
						<view>身份特征说明身份特征说明身份特征说明身份特征说明身份特征说明身份特征说明身份特征说明</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="op-height">
			<uni-popup ref="popup"  border-radius="30px">
				<view class="taskTips">
					<view class="confirmTask">确认领取</view>
					<view class="taskTios">
						领取当前任务后，请在规定时间内 完成该任，如果领取后未完成将影响任务信用分
					</view>
					<view class="flexs notSty">
						<view><button class="iscan" @click="iscan">取消</button></view>
						<view> <button class="gettols" @click="getTaskpl">领取</button></view>
					</view>
				</view>
				
			</uni-popup>
		</view>
		
	</view>
</template>


<script>
	export default{
		data(){
			return{
				active: 0,
				newstatus:0,
				statusBar:'',
				listnoe:[],
				listtow:[],
				ishow:false,
				getindex:'999999999999999999',
				isloading:true,
				buttonindex:999999999999,
				sethide:false,
				 chartData: {},
				newtaskTabs:[
					{id:1,name:'任务大厅'},
					{id:2,name:'我的任务',icons:'tr2'},
					{id:3,name:'任务中心'}
				],
				list1: [
					{
						title: '身份特质'
					}, 
					{
						title: '行为偏好'
					}, 
					{
					title: '人脉关系'
					}, 
					{
						title: '任务信用'
					},
				],
				
				 opts: {
				        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
				        padding: [5,5,5,5],
				        dataLabel: false,
				        legend: {
				          show: false,
				          position: "right",
				          lineHeight: 25
				        },
				        extra: {
				          radar: {
				            gridType: "circle",
				            gridColor: "#CCCCCC",
				            gridCount: 3,
				            opacity: 0.2,
				            max: 200
				          }
				        }
				      }
			}
			
		},
		created() {
		    this.getServerData();
		  },
		onLoad() {
			var that=this;
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight + 45;
					that.statusBar=e.statusBarHeight+20; 
				}
			})
			if(!uni.getStorageSync('token'))
			{
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return
			}
		},
		onShow() {
			
		},
		methods:{
			iscan()
			{
				
			},
			parentTest(spams)
			{
				this.active=spams
			},
			
			getServerData() {
			      
					  //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					  let res = {
						  categories: ["维度1","维度2","维度3","维度4","维度5","维度6"],
						  series: [
							{
							  name: "成交量1",
							  data: [90,110,165,195,187,172]
							}
						  ]
						};
						
		
					  this.chartData = JSON.parse(JSON.stringify(res));
					
			    },
			  
			getTaskpl()
			
			
			{
				this.$refs.popup.close()
			},
			getTask()
			{
				this.$refs.popup.open('center')
			},
			newTabs(pam)
			{
				this.newstatus=pam
			},
			userTask(pams)
			{
				
			},
			ishowtr(index){
				if(this.listnoe[index].task_number >1)
				{
					if(!this.ishow)
					{
						this.listnoe[index].isstat=true
						this.ishow = true	
					}else{
						this.ishow = false
					}
				}
				this.getindex=index
				
			},
			mytask(index)
			{
				if(this.listtow[index].show)
				{
					this.listtow[index].show=false
				}else{
					this.listtow[index].show=true
				}
			},
			userTasktwo()
			{
				
				
			},
			getCurrentTime(t) {
				
				var date = new Date(t);//当前时间
				 var year = date.getFullYear() //年
				 var month = this.repair(date.getMonth() + 1);//月
				 var day = this.repair(date.getDate());//日
				 var hour = this.repair(date.getHours());//时
				 var minute = this.repair(date.getMinutes());//分
				 var second = this.repair(date.getSeconds());//秒
				 
				 //当前时间 
				 var curTime = year + "-" + month + "-" + day
						 + " " + hour + ":" + minute + ":" + second;
				 return curTime;
			},
					
			 //若是小于10就加个0
			  
			  repair(i){
				 if (i >= 0 && i <= 9) {
					 return "0" + i;
				 } else {
					 return i;
				 }
			 },
			 getmask(item,index,type)
			 {
				
				 
			 },
			 overtask(item,index,type)
			 {
				
				
				
			 }
					
		}
	}
</script>

<style>
	.stepMp{
		padding-top: 40upx;
		padding-bottom: 40upx;
	}
	.status-btn {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			align-items: center;
			justify-content: center;
			height: 92rpx;
			margin: 30rpx;
			background-color: #007AFF;
		}
	
		.example-body {
			/* #ifndef APP-NVUE */
			display: block;
			/* #endif */
			padding: 15px;
			flex-direction: row;
		}
	.taskTios{
		font-size: 26upx;
		padding: 40upx 108upx;
		text-align: center;
		line-height: 40upx;
		color: #333;
	}
	.confirmTask{
		font-size: 36upx;
		text-align: center;
		font-weight: 600;
	}
	.miss-list{
		padding: 30upx;
	}
	
	.newTaskHall{
		background-color: #fff;
		/* //padding-top: 60upx; */
	}
	.set-tab,.newTaskHall{
		display: flex;
		align-items: center;
		padding: 30upx 40upx;
		justify-content: center;
		grid-gap: 60upx;
		/* border-bottom: 1upx solid #ccc; */
		
	}
	.newTaskHall button{
		font-size: 24upx;
	}
	.newactive{
		font-size: 30upx;
		background: linear-gradient(to bottom, #C4E5FF, #3381DF);
		color: #fff;
		padding: 8upx 18upx;
		border-radius: 26upx;
		
	}
	.hallList{
		margin: 20upx auto;
		width: 600upx;
		background-color: #fff;
		border-radius: 32upx;
		padding: 20upx 34upx;
	}
	.mitime{
		font-size: 22upx;
		color: rgba(153, 153, 153, 1);
	}
	.mystatusTaks{
		text-align: center;
		padding: 30upx;
	}
	.newHall-inner{
		padding: 0 10upx;
	}
	.taskName{
		font-size: 28upx;
		align-items: center;
		
	}
	.wxshare{
		width: 60upx;
		height: 60upx;
		line-height: 60upx;
		background-color: #3381DF;
		border-radius: 40upx;
		text-align: center;
	}
	.alone-Ne{
		padding-left: 10upx;
	}
	.taskIntr{
		margin-top: 30upx;
		text-align: center;
		font-size: 24upx;
		line-height: 40upx;
		color: rgba(51, 51, 51, 1);
	}
	.mytask{
		text-align: left;
		margin-top: 0;
	}
	.tasName{
		color: #999;
		width: 200upx;
		
	}
	.inflex{
		display: flex;
	}
	.inflex view:nth-of-type(2)
	{
		text-align: center;
	}
	.tasName text{
		color: #333;
		padding-left:60upx;
	}
	.overStatud{
		color: orangered;
	}
	.alover{
		color: #75BE46;
	}
	.tintr-inn{
		font-size: 28upx;
		padding-top: 20upx;
	}
	.taskSetname{
		font-weight: 600;
	}
	.taskReceive button,.gettols,.iscan,.goTaskApiBUtton{
		margin-top: 46upx;
		background: linear-gradient(to bottom, #FFD681, #FFAC4A);
		padding: 10upx 20upx;
		font-size: 26upx;
		width: 130upx;
		border-radius: 30upx;
		color: #fff;
	}
	.goTaskApiBUtton{
		margin-top: 0;
	}
	.goTaskApiBUtton{
		background: linear-gradient(to bottom, #E16731, red);
	}
	.notSty{
		padding: 0 40upx;
	}
	.iscan{
		background: unset;
		color: gray;
	}
	
	
	.taskTips{
		width: 640upx;
		padding: 30upx 0;
		border-radius: 32upx;
		background-color: #fff;
	}
	.userImg image{
		width: 120upx;
		height: 120upx;
		border-radius: 100%;
	}
	.userMess{
		display: flex;
		background-color: #fff;
		align-items: center;
		padding: 20upx 30upx;
	}
	.userIntr{
		padding-left: 30upx;
	}
	.userIntr view:nth-child(1)
	{
		font-size: 30upx;
		font-weight: 600;
	}
	.userIntr view:nth-child(2)
	{
		font-size: 24upx;
		color: #999;
		padding-top: 18upx;
	}
	.taskSelfWith{
		padding: 20upx 30upx;
		background-color: #fff;
		margin-top: 20upx;
		height: 80vh;
	}
	.taskAnalysis{
		padding-top: 40upx;
	}
	.taskan{
		font-size: 22upx;
		font-weight: bold;
	}
	.taskreWard{
		font-size: 24upx;
		color: #333;
		line-height: 40upx;
	}
	.slefIntr{
		width: 90%;
		margin: 20upx auto;
		border-radius: 30upx;
		border: 3upx solid #ccc;
	}
	.self-with{
		padding: 30upx;
		font-size: 24upx;
		height: 200upx;
	}
</style>