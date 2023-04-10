<template>
	<view class="serviceMess">
		<block v-if="noshop && !stinof">
			<view style="text-align: center;padding: 80upx;">
				该功能暂未开放，尽情期待！
			</view>
		</block>
		<block v-else>
		<view class="cUYrXu2wXJqzXxez_CeB">
			<view class="y4f03w8dhr39OnYPUnWJ">
				<view class="">
					<image v-if="stinof.logo_file_url" :src=stinof.logo_file_url></image>
					<image v-else src="../../static/img/sm.jpg" mode=""></image>
				</view>
				<view class="storef">
					<view class="C6F7ETYvP5qRJlxTc9z6">
						<view class="TErRofTiHUogH_qhAhiw">{{stinof.name}}</view>
						<view class="wOI5OLOuazcGL2xKawgE">
							<view>店铺余额:￥{{blance}}</view>
						</view>
						
					</view>
					
				</view>
				<view class="sets" @click="storesets">
					<uni-icons type="gear" color="#EF8B00" size="30"></uni-icons>
				</view>
				
			</view>
			
			<view class="tju7_Tr4rFspHimOu3uP">
						
						
					<view class="EZ9lIFrn_A_OZ7k2sdjks">
						<view class="I1CDs879Exbd5C6HwmoR">
							<view>￥{{remaining_point_to_cash_in_cents}}</view>
							<view>待赠送积分</view>
						</view>
						<view class="gEULnuryd7PUHLF5ervV"><view>￥{{activity_product_point}}</view>
							<view>组团活动</view>
						</view>
						<view class="aqXlAyIMWhkzrycJIphe">
							<view>￥{{normal_product_point}}</view>
							<view>平价商城</view>
						</view>
						
					</view>
					<view class="zyzNHvUE1RsT9O56jby8"></view>
					<view class="EZ9lIFrn_A_OZ7k2sdjks">
						<view class="I1CDs879Exbd5C6HwmoR">
							<view>￥{{0}}</view>
							<view>团队预计奖励</view>
						</view>
						
					</view>
					<view class="zyzNHvUE1RsT9O56jby8"></view>
					<view class="EZ9lIFrn_A_OZ7k2sdjks">
						<view class="I1CDs879Exbd5C6HwmoR">
							<view>￥{{today_sales_amount_in_cents}}</view>
							<view>今日销售额</view>
						</view>
						<view class="gEULnuryd7PUHLF5ervV"><view>￥{{yesterday_sales_amount_in_cents}}</view>
							<view>昨日收益额</view>
						</view>
						<view class="aqXlAyIMWhkzrycJIphe">
							<view>￥{{this_month_sales_amount_in_cents}}</view>
							<view>本月销售额</view>
						</view>
						
					</view>
											
			</view>
			
		</view>
		<view class="storeSet">
			<view class="flexs  instore storeWith">
				
			
			<view class="storeMess" @click="goservice">
				<view class="storeImg">
					<image src="/static/img/o3.png"></image>
				</view>
				<view>委托服务</view>
			</view>
			<view class="storeMess" @click="storeMoney">
				<view class="storeImg">
					<image src="/static/img/p1.png"></image>
				</view>
				<view>店铺收支</view>
			</view>
			<view class="storeMess" @click="storeOrder">
				<view class="storeImg">
					<image src="/static/img/p2.png"></image>
				</view>
				<view>订单管理</view>
			</view>
			<view class="storeMess" @click="goMyqrcode">
				<view class="storeImg">
					<image src="/static/img/o5.png"></image>
				</view>
				<view>推广二维码</view>
			</view>
			<view class="storeMess nle" @click="storesets">
				<view class="storeImg">
					<image src="/static/img/p3.png"></image>
				</view>
				<view>店铺设置</view>
			</view>
			<view class="storeMess nle" @click="shopManger">
				<view class="storeImg">
					<image src="/static/img/p4.png"></image>
				</view>
				<view>商品管理</view>
			</view>
			<view class="storeMess nle" @click="comanage">
				<view class="storeImg">
					<image src="/static/img/p5.png"></image>
				</view>
				<view>成员管理</view>
			</view>
			</view>
		</view>			
		</block>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBar:"",
				tabs:1,
				ictic:1,
				blance:0,
				userpoint:0,
				isdata:false,
				userMess:'',
				team_income_in_cents:'',
				personal_order_amount_in_cents:'',
				increased_team_expense_in_cents:'',
				today_increased_team_expense_in_cents:'',
				this_cycle_team_expense_in_cents:'',
				next_star_dispatch_reward_datetime:'',
				userbance:'',
				page:1,
				ispage:true,
				page_size:15,
				actlist:[],
				personalSum:'',
				today_profit_in_cents:'',
				yesterday_profit_in_cents:'',
				this_month_profit_in_cents:'',
				total_profit_in_cents:'',
				
				stinof:'',
				storepoint:'',
				remaining_point_to_cash_in_cents:0,
				activity_product_point:0,
				normal_product_point:0,
				this_month_sales_amount_in_cents:0,
				today_sales_amount_in_cents:0,
				yesterday_sales_amount_in_cents:0,
				noshop:true
				
			}
		},
		onLoad() {
			var that=this;
			uni.getSystemInfo({
				success(e) {
					let statusBar = 0
					let customBar = 0
				  statusBar = e.statusBarHeight
				  customBar = e.statusBarHeight + 45;
				  that.statusBar=e.statusBarHeight+16;
				  
				}
			})
		},
		onShow() {
			this.userBalance();
			//店铺接口
			this.storeApp()
			this.selfApp()
			this.pointApp()
			this.toreApp()
		},
		methods: {
			toreApp()
			{
				this.api.store.toreApp().then(res=>{
					if(res.code==200)
					{
						this.this_month_sales_amount_in_cents=res.data.this_month_sales_amount_in_cents/100
						this.today_sales_amount_in_cents=res.data.today_sales_amount_in_cents/100
						this.yesterday_sales_amount_in_cents=res.data.yesterday_sales_amount_in_cents/100
					}
				})
			},
			storeApp()
			{
				this.api.store.storeApp().then(res=>{
					// console.log('reddish',res)
				})
			},
			pointApp()
			{
				this.api.store.pointApp().then(res=>{
					if(res.code==200)
					{
						this.remaining_point_to_cash_in_cents=res.data.remaining_point_to_cash_in_cents/100
						this.activity_product_point=res.data.activity_product_point
						this.normal_product_point=res.data.normal_product_point
					}
					
				})
			},
			selfApp()
			{
				this.api.interactive.storeSelf().then(res=>{
					
					if(res.code==401)
					{
						this.noshop=true
						return
					}else{
						this.noshop=true
						this.stinof=res.data
					}
				})
				
			},
			
			
			
			userAuthed(){
				this.api.interactive.userAuthed().then(res=>{
					if(res.code===200)
					{
						this.userMess=res.data
						this.team_income_in_cents=res.data.team_income_in_cents/100
						this.personal_order_amount_in_cents=res.data.personal_order_amount_in_cents/100
						
						this.increased_team_expense_in_cents=res.data.increased_team_expense_in_cents/100
						this.today_increased_team_expense_in_cents=res.data.today_increased_team_expense_in_cents/100
						
					
					}
				})	
			},
			
			userBalance()
			{
				this.api.interactive.userBalance().then(res=>{
					if(res.code===200)
					{
						let personalSum=res.data
						let tpm= (personalSum.balance.remaining_balance_in_cents ||0 +personalSum.account_balance.remaining_balance_in_cents ||0) / 100
						this.blance=tpm
					}
				})	
			},
			goBack()
			{
				//uni.navigateBack(1)
				const pages = getCurrentPages()//获取页面栈
				if (pages.length === 1) {//如果只有一个调用原生js
					history.back()
				} else {
					uni.navigateBack({
						delta: 1,
					})
				}
			},
			goservice()
			{
				uni.navigateTo({
					url:'/pages/service/service'
				})
			},
			storeMoney()
			{
				uni.showToast({
					title:'该功能暂未开放，敬请期待！',
					icon:'none'
				})
				return
			},
			storeOrder()
			{
				uni.navigateTo({
					url:'/pages/orderList/manage'
				})
			},
			goMyqrcode()
			{
				uni.navigateTo({
					url:'/pages/Myqrcode/Myqrcode'
				})
			},
			storesets()
			{
				uni.navigateTo({
					url:'/pages/my/set?storeId='+this.stinof.id
				})
			},
			shopManger()
			{
				uni.navigateTo({
					url:'/pages/my/manage?storeId='+this.stinof.id
				})
			},
			comanage()
			{
				uni.navigateTo({
					url:'/pages/service/manage'
				})
			}
		
		
		
		}
	}
</script>

<style>
	
	
	.cUYrXu2wXJqzXxez_CeB{
		background-color: #fff;
		padding: 30upx;
	}
	.y4f03w8dhr39OnYPUnWJ,.wOI5OLOuazcGL2xKawgE {
	    /* padding: 20upx 30upx; */
	    display: flex;
	    justify-content: flex-start;
		align-items: center;
	}
	.y4f03w8dhr39OnYPUnWJ image,.jjkuEnv_FwA8IVx00xD1 image{
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
	}
	.TErRofTiHUogH_qhAhiw {
	    font-size: 1rem;
	    font-weight: bold;
	}
	.wOI5OLOuazcGL2xKawgE{
		font-size: 0.9rem;
		color: gray;
	}
	.C6F7ETYvP5qRJlxTc9z6{
		margin-left: 30upx;
		line-height: 40upx;
	}
	.sets{
		margin-left: auto;
	}
	.Ba8g5C1rjxc9RkK9l6xM{
			margin-left: 80upx;
		    padding:8upx 16upx;
		    margin-bottom: 20upx;
		    color: #fff;
		    align-self: flex-end;
		    border-radius: 8upx;
		    background-color: #ef8200;
			font-size: 24upx;
	}
	
	.tju7_Tr4rFspHimOu3uP {
	    border-radius: 8upx;
	    background-color: #f2f2f2;
	    /* margin: 20upx; */
		margin-top: 40upx;
	}
	.lw4FGjnNSZ3wokVKoXgq
	{
	   
	    display: flex;
	    padding: 10upx;
	    justify-content: space-between;
		font-size: 0.8rem;
		color: gray;
		margin-top: 20upx;
	}
	.EZ9lIFrn_A_OZ7k2sdjks{
		display: flex;
		
		justify-content: space-between;
		font-size: 0.8rem;
		color: gray;
		text-align: center;
	}
	.lw4FGjnNSZ3wokVKoXgq{
		padding: 16upx 30upx;
		
	}
	.EZ9lIFrn_A_OZ7k2sdjks{
		padding: 20upx;
	}
	.newdata{
		margin-top: unset;
	}
	.EZ9lIFrn_A_OZ7k2sdjk{
		text-align: center;
		
	}
	.zyzNHvUE1RsT9O56jby8{
		height: 4upx;
		background-color: #fff;
	}
	.storeSet{
		padding-bottom: 40vh;
		background: #fff;
	}
	.storeWith{
		
		justify-content: flex-start;
		padding: 40upx;
		text-align: center;
		grid-gap: 40upx;
		margin-top: 30upx;
		align-items: center;
		flex-wrap: wrap;
		
		
		
	}
	.storeMess{
		margin-left: 24upx;
		padding-bottom: 10upx;
		font-size: 26upx;
		color: gray;
		
	}
	
	.storeImg image{
		width: 58upx;
		height: 58upx;
	}
	
	
	
	
</style>
