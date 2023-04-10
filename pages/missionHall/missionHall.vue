<template>
	
	<view class="top-tab">
		<view class="taskbgimg">
			<view class="search-with set-tab" :class="isTop==1?'iscalss':''"
				  :style="{'paddingTop':statusBar+'px'}">
				<view @click="setTab(1)" class="f-status" :class="tabs==1?'active':'mo-co'">任务大厅</view>
				<view @click="setTab(2)" :class="tabs==2?'active':'mo-co'">我的任务</view>
				<view @click="setTab(3)" :class="tabs==3?'active':'mo-co'">任务中心</view>
			</view>
		</view>
	
		<view class="miss-list" v-if="tabs==1">
			<view @click="ishowtr(index)" v-for="(itemt,index) in listnoe" :key="itemt.fee">
				<view class="LRe6q1byyLMCIjNolZtB">
					<view class="CIm1AbWzTGkyTkfMoAel">
						<image src="../../static/img/b5.png"></image>
						<view class="l5wxIRSdseexeOd0vP0J">
							<view class="sHGaJwyVgZzHMrAyG6DT">{{itemt.name}}X{{itemt.task_number}}</view>
							<view class="DAmYuolYAIWHvtV5pKYg">任务佣金：￥ {{itemt.fee/100}}</view>
							<view class="DAmYuolYAIWHvtV5pKYg">代金券: {{itemt.point}}</view>
							<view class="qAXNcQjcuk0mhgpaBjT1">{{getCurrentTime(itemt.tasks[0].created_at)}}</view>
						</view>
					</view>
					<view class="golin">
						<button class="EDn9l8nab7B1KbBpSbZH" @click.stop="getmask(itemt,index,'total')" data-selection-type="total" data-id="0">领取</button>
					</view>
				</view>
	
				<view v-if="itemt.task_number >1 && ishow && getindex==index">
					<view class="LRe6q1byyLMCIjNolZtB" v-for="(items,indexs) in itemt.tasks" :key="items.id">
						<view class="CIm1AbWzTGkyTkfMoAel">
							<view class="l5wxIRSdseexeOd0vP0J">
	
								<view class="DAmYuolYAIWHvtV5pKYg">
									任务： {{items.task_action?items.task_action.action_type_name:'无相关类型'}}
								</view>
								<view class="DAmYuolYAIWHvtV5pKYg">任务佣金：￥ {{items.task_fee/100}}</view>
								<view class="DAmYuolYAIWHvtV5pKYg">代金券: {{items.task_points}}</view>
								<view class="qAXNcQjcuk0mhgpaBjT1">{{getCurrentTime(itemt.tasks[0].created_at)}}</view>
							</view>
						</view>
						<view class="golin">
							<button class="EDn9l8nab7B1KbBpSbZH" @click.stop="getmask(items,indexs,'each')" data-selection-type="total" data-id="0">领取</button>
						</view>
					</view>
	
				</view>
	
	
	
			</view>
			<view v-if="listnoe.length==0 && tabs==1" style="text-align: center;">暂无任务</view>
		</view>
	
	
		<view class="miss-list"  v-if="tabs==2">
			<view @click="mytask(index)"  v-for="(item,index) in listtow" :key="item.id">
	
			
				<view class="LRe6q1byyLMCIjNolZtB">
	
					<view class="CIm1AbWzTGkyTkfMoAel">
						<image src="../../static/img/b5.png"></image>
						<view class="l5wxIRSdseexeOd0vP0J">
							<!-- <view class="sHGaJwyVgZzHMrAyG6DT">{{item.task_name}}X{{item.task_number}}</view> -->
							<view class="sHGaJwyVgZzHMrAyG6DT">{{item.task_action?item.task_action.action_type_name:''}}({{item.task_name}})</view>
							<view class="DAmYuolYAIWHvtV5pKYg">任务佣金：￥ {{item.task_fee/100}}</view>
							<view class="DAmYuolYAIWHvtV5pKYg">代金券: {{item.task_points}}</view>
							<view class="qAXNcQjcuk0mhgpaBjT1">
								{{getCurrentTime(item.created_at)}}</view>
						</view>
					</view>
					<view class="golin">
						<button class="EDn9l8nab7B1KbBpSbZH" @click.stop="overtask(item,index,'total')"
								data-selection-type="total">
							完成
						</button>
					</view>
				</view>
			
				<!-- <view v-if="item.task_number >1 && item.show">
					<view class="LRe6q1byyLMCIjNolZtB" v-for="(items,indexs) in item.tasks" :key="items.id">
						<view class="CIm1AbWzTGkyTkfMoAel">
							<view class="l5wxIRSdseexeOd0vP0J">
	
								<view class="DAmYuolYAIWHvtV5pKYg">
									任务佣金: ￥ {{items.task_fee/100}}</view>
								<view class="DAmYuolYAIWHvtV5pKYg">
									代金券: {{items.task_points}}</view>
								<view class="qAXNcQjcuk0mhgpaBjT1">
									{{getCurrentTime(items.created_at)}}
								</view>
							</view>
						</view>
						<view class="golin">
							<button v-if="items.status !=2" class="EDn9l8nab7B1KbBpSbZH" @click.stop="overtask(items,indexs,'each')" data-selection-type="total" data-id="0">完成</button>
							<button v-else>完成</button>
						</view>
					</view>
	
				</view>
			 -->
			
			</view>	
			<view v-if="listtow.length==0 && tabs==2" style="text-align: center;">任务已全部完成</view>
		</view>
	
	
		<view class="hallWith" v-if="tabs==3">
	
			<view class="userMess">
				<view class="userImg">
					<image style="border: unset;" v-if="userMess.avatar" :src=userMess.avatar></image>
					<image v-else src="../../static/img/p.png"></image>
				</view>
				<view class="userIntr">
					<view class="ufs">用户 {{perData.name}}</view>
					<view class="flexs newhouse">
						<view class="newce" v-if="userMess.business_level_name">
						  {{userMess.business_level_name}}
						</view>
						<view class="newce"  v-if="userMess.is_marketing_center && !userMess.is_super_member">
							运营中心
						</view>
						<view class="newce" v-if="userMess.is_super_member">超级管家</view>
					</view>
					<view class="taskso">任务信用分 {{perData.credit_point}}</view>
					<view class="flexs taskso">
						<view>余额： {{blance}}</view>
						<view style="margin-left: 12rpx;">现金代金券： {{userpoint.remain_points}}</view>
					</view>
				</view>
			</view>
	
			<view class="taskreWard">
				<view class="pemsg">
					<view class="newmo">￥ {{today_profit_in_cents}}</view>
					<view class="newne">今日收益</view>
				</view>
				<view class="perline"></view>
				<view class="pemsg">
					<view class="newmo">￥ {{yesterday_profit_in_cents}}</view>
					<view class="newne">昨日收益</view>
				</view>
				<view class="perline"></view>
				<view class="pemsg">
					<view class="newmo">￥ {{this_month_profit_in_cents}}</view>
					<view class="newne">本月收益</view>
				</view>
	
			</view>
			<view class="finaceUrl" @click="goFinance">
				<view class="flexs">
					<view class="finame">
						财务总览
					</view>
					<view class="flexs lookde">
						<view style="font-size: 26rpx;">
							查看详情
						</view>
						<view class="rj-img">
							<uni-icons custom-prefix="iconfont" color="#000" type="icon-youce" size="18"></uni-icons>
						</view>
					</view>
				</view>
				
				<view class="actimg">
					<image src="../../static/img/act.png"></image>
				</view>
				
			</view>
			<!-- <view class="taskline"></view> -->
			<view class="taskSelfWith">
				<view class="taskAnalysis">
					<view class="taskan">任务分解析</view>
					<view class="charts-box">
					
						<qiun-data-charts
						  type="radar"
						  :opts="opts"
						  :chartData="chartData" />
						 
					</view>
				</view>
	
				<view class="stepMp">
					<uni-steps @stepChange="parentTest" :options="list1" active-icon="checkbox" :active="active" />
				</view>
				<view class="slefIntr">
					<view class="self-with">
						<view>
							该功能即将上线,敬请期待!
						</view>
					</view>
				</view>
			</view>
	
	
		</view>
	
	
		<view class="op-height">
			<uni-popup ref="popup2" border-radius="30px">
				<view class="taskTips">
					<view class="confirmTask">任务大厅协议说明</view>
					<view class="taskTios tmsd">
						<view class="lablod">
							<text class="agrehold">进入任务大厅</text>
							<text class="agrehold">“领任务 赚佣金”</text>
						</view>
						<text>默认同意</text>
						<text class="agrees" @click="taskService">《任务大厅协议》</text>
						<text>
							点击同意进入服务大厅，如未同意将无法使用任务大厅各项功能与服务
						</text>
					</view>
					<view class="flexs notSty">
						<view>
							<button class="iscans" @click="iscans">取消</button>
						</view>
						<view>
							<button class="nkows" @click="woKnow">我知道了</button>
						</view>
					</view>
				</view>
	
			</uni-popup>
		</view>
		<view class="op-height">
			<uni-popup ref="popup" border-radius="30px">
				<view class="taskTips">
					<view class="confirmTask">任务说明</view>
					<view class="taskTios">
						{{taskmess}}
					</view>
					<view class="flexs notSty">
						<view>
							<button class="iscan" @click="iscan">取消</button>
						</view>
						<view>
							<button class="gettols" @click="getTaskpl">去完成</button>
						</view>
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
				tabs:1,
				active: 0,
				statusBar:'',
				listnoe:[],
				listtow:[],
				ishow:false,
				getindex:'-1',
				isloading:true,
				buttonindex:-1,
				sethide:true,
				newtaskTabs:[
					{id:1,name:'任务大厅'},
					{id:2,name:'我的任务',icons:'<uni-icons type="bottom" color="#666" size="27"></uni-icons>'},
					{id:3,name:'任务大厅'}
				],
				taskmess:'',
				taskLists:'',
				perData:'',
				chartData:{},
				list1: [
					{
						title: '身份特质',
						id:1
					}, 
					{
						title: '行为偏好',
						id:2
					}, 
					{
						title: '人际关系',
						id:3
					}, 
					{
						title: '任务信用',
						id:4
					},
					{
						title: '任务能力',
						id:5
					},
					
				],
				myScroll:'',
				flag:'',
				isTop:0,
				isdata:false,
				today_profit_in_cents:'',
				yesterday_profit_in_cents:'',
				this_month_profit_in_cents:'',
				userMess:'',
				blance:'',
				userpoint:'',
				isdata:"",
				customBar:0,
				source_id:0,
				voice_code:'',
				action_type:'',
				opts: {
					background:'rgba(1, 128, 128, 0.1)', //rgba设置透明度0.1
					 color: ["#FDA827"],
					 padding: [15,10,6,20],
					 legend:{show:false},
					 dataLabel:false,
					 xAxis: {
					   disableGrid: true
					 },
					 yAxis: {
					   gridType: "dash",
					   dashLength: 2,
					   disabled:true,
					   },
		
					 extra: {
					   line: {
						 type: "straight",
						 width: 2,
						 activeType: "hollow"
					   }
					 }
				
				
				},
				
				
				
			}
			
		},
		onLoad() {
			var that=this;
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					customBar = e.statusBarHeight;
					that.statusBar=e.statusBarHeight+20; 
					that.customBar=customBar
					console.log('ddd',customBar)
				}
			})
			// if(!uni.getStorageSync('token'))
			// {
			// 	uni.navigateTo({
			// 		url:'/pages/login/login'
			// 	})
			// 	return
			// }
			
		},
		onShow() {
			setTimeout(()=>{
				this.centerData()
			},3000)
			this.userTask(0);
			this.userTasktwo();
			this.taskSer();
			
			this.userProfit();
			this.userPoint();
			this.userBalance();
			this.userAuthed();
		},
		mounted() {
			
		},
		methods:{
			userBalance()
			{
				this.api.interactive.userBalance().then(res=>{
					if(res.code===200)
					{
						this.blance=res.data.balance.remaining_balance_in_cents/100
					}
				})
			},
			userPoint()
			{
				this.api.interactive.userPoint().then(res=>{
					// console.log('代金券',res)
					if(res.code===200)
					{
						this.userpoint=res.data
						this.isdata=true
					}
				})
			},
			taskSer()
			{
				const isAgree=uni.getStorageSync('serStat')
				
				if(!isAgree)
				{
					this.$nextTick(()=>{
						this.$refs.popup2.open('center');
						uni.setStorageSync('serStat',false)
					})
				}
				
			},
			goFinance()
			{
				uni.navigateTo({
					url:'/pages/totalFinance/totalFinance'
				})
			},
			userAuthed(){
				this.api.interactive.userAuthed().then(res=>{
					if(res.code===200)
					{
						this.userMess=res.data
						uni.setStorageSync('taskavat',this.userMess.avatar)
					}
				})
			},
			onPageScroll(e) 
			{ //根据距离顶部距离是否显示回到顶部按钮
				// 固定社区置顶栏
				
				if (e.scrollTop > this.customBar) {
					this.isTop = 1
				} else {
					this.isTop = 0
				}

				// if (e.scrollTop > 600) { //当距离大于600时显示回到顶部按钮
				// 	this.flag = true
				// } else { //当距离小于600时隐藏回到顶部按钮
				// 	this.flag = false
				// }
			},
			centerData()
			{
				var categories=[]
				var data=[]
				this.api.user.taskCenter().then(res=>{
					// console.log('认识',res.data.credit_attribute)
					if(res.code==200 && res.data.credit_attribute.length >0)
					{
						this.perData=res.data;
						let otdata=res.data.credit_attribute
						otdata.map((item,index)=>{
							categories.push(item.name)
							data.push(item.point)
						})
						var rest = {
						  categories,
						  series: [
							{
							  name: "",
							  data
							}
						  ]
						};
					}
					this.chartData = JSON.parse(JSON.stringify(rest));	
				})
			},
			iscan()
			{
				this.$refs.popup.close()
			},
			setTab(pam)
			{
				this.tabs=pam
				if(!uni.getStorageSync('serStat'))
				{
					this.$refs.popup2.open('center')
					return
				}
				if(pam==3)
				{
					this.userPoint();
					this.userBalance();
					this.userAuthed()
				}
			},
			userTask(pams)
			{
				let st={'status[]': [0] }
				this.api.interactive.userTask(st).then(res=>{
					
					if(res.code===200 && res.data.length >0)
					{
						this.listnoe=res.data,
						this.listnoe.map((item,index)=>{
							item.shows=false
						})
					}else{
						this.listnoe=[]
					}
				})
			},
			
			userProfit()
			{
				this.api.interactive.userProfit().then(res=>{
					
					if(res.code===200)
					{
						this.userbance=res.data
						this.isdata=true
						this.today_profit_in_cents=res.data.today_profit_in_cents/100
						this.yesterday_profit_in_cents=res.data.yesterday_profit_in_cents/100
						this.this_month_profit_in_cents=res.data.this_month_profit_in_cents/100
					}
				})	
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
				
				this.api.interactive.userTask(
				{
					'status[0]': [1],
					'status[1]': [2]
				}
				).then(res=>{
					// console.log('resssss',res.data)
					let maskarr=[]
					
					if(res.code===200 && res.data.length >0)
					{
						// let setlist={};
						// let arrtask=[];
						//  res.data.map((item,index)=>{
						// 	item.show=false
						//  })
						// res.data.map((item,indexs)=>{
						// 	if(res.data[indexs].task_number >0)
						// 	{
						// 		arrtask.push(item)
						// 	}
						// })
						this.listtow=res.data
						
					}else{
						this.listtow=[]
					}
				})
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
				if(!uni.getStorageSync('serStat'))
				{
					this.$refs.popup2.open('center')
					return
				}
				
				 let taskList= []
					if (type === 'total')
					{				   
					   item.tasks.map(sit=>{
						   if(sit.status==0)
						   {
							   taskList.push({ id: sit.id, status: 1 })
						   }
					   })				   
					}else if (type === 'each') {
					taskList.push({ id:item.id, status: 1 });
				  } else {
					return;
				  }
				  
				 
				this.api.interactive.getUsertask({
					 task_list:taskList
				}).then(res=>{
					 if(res.code===200)
					 {
						 uni.showToast({
						 	title:'任务领取成功!',
							icon:'none'
						 })
						 this.getindex=-1
						 this.ishow=false
						 this.userTask();
						 this.userTasktwo();
					 }
				})
			 },
			 iscans()
			 {
				 this.$refs.popup2.close()
			 },
			 taskService()
			 {
				 uni.navigateTo({
				 	url:'/pages/seragreee/seragreee'
				 })
			 },
			 woKnow()
			 {
				 uni.setStorageSync('serStat',true),
				 this.$refs.popup2.close()
			 },
			 parentTest(spams)
			 {
			 	this.active=spams
			 },
			 //任务类型跳转
			 getTaskpl()
			 {
				 if(this.action_type==1 || this.action_type==2)
				 {
					 if(this.source_id)
					 {
						 if(this.action_type==1)
						 {
							uni.navigateTo({
								url:'/pages/lesson/videoDeitals?type='+this.action_type+'&task_id=1'+'&id='+this.source_id+'&tasktype='+this.action_type
							}) 
						 }else{
							uni.navigateTo({
								url:'/pages/lesson/mp3Deitals?type='+this.action_type+'&task_id=1'+'&id='+this.source_id+'&tasktype='+this.action_type
							})  
						 }
						 
					 }else{
						 uni.navigateTo({
							url:'/pages/lesson/videoLess?type='+this.action_type+'&task_id=1'+'&tasktype='+this.action_type
						 })
					 }
				 	 
					 
				 }
				 
				 if(this.action_type==3 || this.action_type==4)
				 {
					 if(this.source_id)
					 {
						 if(this.action_type==3)
						 {
							uni.navigateTo({
								url:'/pages/sourceCenter/imgdeitals?type='+this.action_type+'&task_id=1'+'&id='+this.source_id+'&tasktype='+this.action_type
							}); 
							 
						 }else{
							 
							 uni.navigateTo({
							 	url:'/pages/sourceCenter/attrDeitals?type='+this.action_type+'&task_id=1'+'&id='+this.source_id+'&tasktype='+this.action_type
							 }); 
							  
						 }
						 
						 
					 }else{
						 uni.navigateTo({
						 	url:'/pages/sourceCenter/sourceCenter?type='+this.action_type+'&task_id=1'+'&tasktype='+this.action_type
						 });
					 }
					
				 }
				 
				 
				 if(this.action_type==5)
				 {
					 if(this.voice_code)
					 {
						 uni.navigateTo({
						 	url:'/pages/setVoice/joinMeeting?setRoomid='+this.voice_code
						 })
					 }else{
						 uni.navigateTo({
							url:'/pages/setVoice/setVoice'
						 });
					 }
					 
				 }
				 this.$refs.popup.close()
			 },
			 overtask(item,index,type)
			 {
				 if(!uni.getStorageSync('serStat'))
				 {
				 	this.$refs.popup2.open('center')
				 	return
				 }
				 this.action_type=''
				this.isloading=true
				this.buttonindex=index
				let taskList= []
				
			  //  if (type === 'total') {
			   
				 //   item.tasks.map(sit=>{
					//    if(sit.status==1)
					//    {
					// 	   taskList.push({ id: sit.id, status: 2 })
						   
					//    }
				 //   })
				 //   this.taskLists=taskList
				 //  }else if (type === 'each') {
					// 	taskList.push({ id:item.id, status: 2 });
					// 	this.taskLists=taskList
					//   } else {
					// 	return;
				 // }
				 this.taskLists=[{id:item.id, status: 2}]
				 this.api.interactive.getUsertask({
					 task_list:[{ id: item.id, status: 2 }]
				 }).then(res=>{
					 console.log('itemmm',res)
					 this.isloading=true
					 if(res.code===200)
					 {
						 if(res.data==true)
						 {
							 this.isloading=true
							 uni.showToast({
								title:'任务完成!',
								icon:'none'
							 })
							
							 this.buttonindex=-1
							 						
							 this.userTask();
							 this.userTasktwo();
						 }else{
							 this.$refs.popup.open('center');
							 this.taskmess=res.data.message,
							 this.action_type=res.data.source_type
							 this.source_id=res.data.source_id
							 this.voice_code=res.data.voice_code
							 this.$store.commit('set_video_times',res.data.need_time)
							 this.$store.commit('set_task_ids',this.taskLists)
							 this.$store.commit('set_watch_type',res.data.source_type)
							 
							console.log('dsfdsfddddd',this.taskLists)
						 }
						 
					 }else{
					 }
				 })
			 
			 }
					
		}
	}
</script>

<style>
	.miss-list{
		padding: 30upx;
		background-color: #fff;
		
	}
	.LRe6q1byyLMCIjNolZtB{
		justify-content: space-between;
		padding-bottom: 30upx;
		border-bottom: 1upx solid #ccc;
		margin-bottom: 20upx;
	}
	.CIm1AbWzTGkyTkfMoAel,.LRe6q1byyLMCIjNolZtB{
		display: flex;
		align-items: center;
		
		
	}
	.taskTips{
		width: 640upx;
		padding: 30upx 0;
		border-radius: 32upx;
		background-color: #fff;
	}
	.iscans,.nkows{
		margin-top: 10upx;
		border-radius: 10upx;
		font-size: 22upx;
	}
	.iscans{
		border: 1px solid #707070;
		padding: 10upx 40upx;
		color: #128DDA;
	}
	.nkows{
		padding: 10upx 28upx;
		text-align: center;
		background: #128DDA;
		color: #fff;
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
	.taskTios{
		font-size: 32upx;
		padding: 40upx 108upx;
		text-align: center;
		line-height: 40upx;
		color: #333;
		font-weight: 600;
	}
	.agrees{
		color: #128DDA;
	}
	.lablod{
		text-align: center;
		padding-bottom: 10upx;
	}
	.tmsd{
		padding: 40upx 28upx;
		text-align: left;
		font-size: 28rpx;
	}
	.agrehold{
		font-size: 30upx;
		font-weight: 600;
		
	}
	.confirmTask{
		font-size: 36upx;
		text-align: center;
		font-weight: 600;
	}
	.notSty{
		padding: 0 100upx;
	}
	.l5wxIRSdseexeOd0vP0J{
		padding-left: 20upx;
		line-height: 44upx;
	}
	.CIm1AbWzTGkyTkfMoAel image{
		width: 160upx;
		height: 160upx;
	}
	
	.set-tab{
		padding: 30upx 52upx;
		justify-content: space-between;
		background-color: unset;
		
	}
	.iscalss{
		
		position: fixed;
		background: #fff;
		z-index:9999;
		padding: 30upx 52upx;
		border-bottom: 1px solid #ccc;
		top:0;
		left: 0;
		right: 0;
	}
	.iscalss view{
		color: #000!important;
	}
	
	.taskbgimg{
		background-image: url('https://wangzhexitong.oss-cn-chengdu.aliyuncs.com/product/task.jpg');
		background-size: 100% 100%;
		height: 462rpx;	
		/* position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99999; */
	}
	
	.active{
		font-size: 38upx;
		color: #fff;
		font-weight: 600;
		position: relative;
	}
	.active::after{
		position: absolute;
		display: block;
		content: '';
		left: 0;
		right: 0;
		top: 60upx;
		width: 80upx;
		margin: auto;
		border-bottom: 8upx solid #128DDA;
		border-radius: 20upx;
	}
	.mo-co{
		color: #fff;
		font-size: 34upx;
	}
	.EDn9l8nab7B1KbBpSbZH{
		background-color: #0C5290;
		padding: 10upx 30upx;
		color: #fff;
		font-size: 24upx;
	}
	.sHGaJwyVgZzHMrAyG6DT{
		font-size: 24upx;
	}
	.DAmYuolYAIWHvtV5pKYg,.qAXNcQjcuk0mhgpaBjT1{
		font-size: 22upx;
		color: gray;
	}
	.userImg image{
		width: 120upx;
		height: 120upx;
		border-radius: 100%;
		border: 1px solid #0C5290;
	}
	
	.userMess{
		display: flex;
		background-color: #fff;
		/* align-items: center; */
		padding: 20upx 30upx;
	}
	.userIntr{
		padding-left: 30upx;
	}
	.taskline{
		height: 20upx;
		background-color: #f5f5f5;
	}
	.ufs
	{
		font-size: 30upx;
		font-weight: 600;
	}
	/* .userIntr view:nth-child(2),.userIntr view:nth-child(3),.userIntr view:nth-child(4)
	{
		font-size: 24upx;
		color: #999;
		padding-top: 12upx;
	} */
	.finaceUrl{
		padding: 24upx 32upx;
		background-color: #fff;
		margin-top: 40rpx;
		border-radius: 20rpx;
	}
	.finame{
		font-size: 28rpx;
		font-weight: 600;
	}
	.lookde{
		font-size: 24rpx;
		color: #B3B3B3;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.actimg{
		padding: 12rpx 14rpx 0 12rpx;
		text-align: center;
	}
	.actimg image{
		width: 100%;
		
		height: 124rpx;
		/* margin: 14rpx 52rpx; */
		
	}
	.fiacct{
		font-size: 20rpx;
		
		margin-top: 32upx;
		
	}
	.inacct{
		width: 20%;
		text-align: center;
	}
	.accmon{
		padding-top: 8rpx;
		font-size: 28rpx;
	}
	
	.fiacct image{
		width: 44rpx;
		height: 44rpx;
		
	}
	.taskSelfWith{
		padding: 20upx 30upx 80upx 30upx;
		background-color: #fff;
		margin-top: 20upx;
		border-radius: 30upx;
		
	}
	.taskAnalysis{
		padding-top: 40upx;
	}
	.charts-box{
		width: 100%;
		height: 480rpx;
	}
	.taskan{
		font-size: 28upx;
		font-weight: bold;
	}
	
	.taskreWard{
		font-size: 24upx;
		color: #333;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-align: center;
		padding: 20upx 118upx;
	}
	.mosty,.scsty,.nusty{
		font-size: 24upx;
	}
	.mosty{
		color: #FFBF4A;
	}
	.scsty{
		color: #128DDA;
	}
	.nusty{
		color: #75BE46;
	}
	.perline{
		border-right: 1px solid #E6E6E6;
		height: 50upx;
	}
	
	.pemsg view:nth-child(1)
	{
		font-size: 28upx;
		
		font-weight: bold;
		padding-bottom: 6upx;
	}
	.newmo{
		font-size: 28rpx;
		font-weight: bold;
		color: #000;
	}
	.newne{
		font-size: 18rpx;
		color: #666666;
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
	
	.stepMp{
		padding: 40upx 0;
	}
	
	.newhouse{
		color: #128DDA;
		margin: 12rpx 0;
		justify-content: flex-start;
	}
	.newce{
		background-color: #CCE1FD;
		margin-right: 20rpx;
		border-radius: 30rpx;
		padding: 6rpx 16rpx;
		font-size: 18rpx;
	}
	.taskso{
		font-size: 28rpx;
		color: #666666;
		justify-content: flex-start;
		margin-bottom: 12rpx;
	}
	
	
</style>