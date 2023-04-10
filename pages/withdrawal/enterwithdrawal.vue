<template>
	<view class="wdran">
		<view class="flexs iotops" :style="[{'paddingTop':statusBar+'px'}]">
			<view @click.stop="goBack"><uni-icons type="left" color="#666" size="27"></uni-icons></view>
			
			<view class="sl" :class="tabs==1?'active':'noict'">
				企业账号提现
				<text style="font-size: 24rpx;">(含个体工商户)</text>
			</view>
			<view class="sr" :class="tabs==2?'active':'noict'" @click.stop="drawDeitals">提现记录</view>
		</view>
		<view class="withMoney">
			可提现余额(元):￥ <text style="color: #ef8200;">{{blance}}</text>
		</view>
		<view class="isMoney">
			<view class="mName">
				提现金额
			</view>
			<view class="mNums">
				<view class="ifms">￥</view>
				<view class="setinput">
					<input @input="IntInput" @blur="poinblur"  v-model="form.withdraw_in_cents" value="" type="number"/>
				</view>
			</view>
			<view class="canMoney">
				到账金额：{{dc}}
			</view>
			<view class="canMoney sfmg">
				<text>手续费：￥ {{sf}}</text>
				<text class="twoleft">服务费：￥ {{df}}</text>
			</view>
		</view>
		
		<view class="withMethods">
			<view class="menth-m">
				提现方式
			</view>
			<view class="bankNums">
				<view class="bankImg">
					<image src="../../static/img/yh.png"></image>
				</view>
				<view class="gobank">提现银行卡</view>
				<block v-if="userbankList && userbankList.length ==0">
					<view class="radio-content radio-right">
						  <view class="radio" :class="radio1 == 2 ? 'radio-default':''">
							<view :class="radio1 == 2 ? 'radio-active':''"></view>
						  </view>
					</view>
				</block>
				<block v-else>
					<view class="Selesty">
					    <view class="perMssban">
					    	<view class="perFlexs">
					    		<view class="perint" @click.stop="alBank(1)"  style="color:#C0C4CC;font-size:28upx;">
					    			<!-- <view class="">请选择银行</view> -->
					    			<view class="setbakd">
					    				<view>
					    					<input type="text" style="width: 50vw;"  disabled="disabled" v-model="sefform.bank_name"  placeholder-style="color:#C0C4CC;font-size:28upx;" placeholder="请选择银行卡">
					    				</view>
					    				<view>
					    					<uni-icons type="right" color="#666" size="22"></uni-icons>
					    				</view>
					    			</view>
					    		</view>
					    	</view>
					    </view>
					    
					  </view>
				</block>
			</view>
			<view class="seslinr"></view>
			<block v-if="userbankList && userbankList.length ==0 && isaddshow">
			
			<view class="perMssban">
				<view class="perFlex">
					<view class="bName">*公司名称</view>
					<view class="perint">
						<input type="text" @input="onKeyInput"  maxlength="50" v-model="form.user_name"  placeholder-style="color:#C0C4CC;font-size:28upx;" placeholder="请输入公司名称,最多输入50个字符">
					</view>
				</view>
			</view>
			
			<view class="perMssban">
				<view class="perFlex">
					<view class="bName">*纳税人识别号</view>
					<view class="perint">
						<input type="idcard"  maxlength="20"  v-model="form.id_card"   placeholder-style="color:#C0C4CC;font-size:28upx;" placeholder="请输入纳税人识别号">
					</view>
				</view>
			</view>
			<view class="perMssban">
				<view class="perFlex">
					<view class="bName">*公司开户银行</view>
					<view class="perint" @click.stop="plBank"  style="color:#C0C4CC;font-size:28upx;">
						<!-- <view class="">请选择银行</view> -->
						<view class="setbakd">
							<view>
								<input type="text" style="margin-right:-46rpx;"  disabled="disabled" v-model="form.bank_name"  placeholder-style="color:#C0C4CC;font-size:28upx;" placeholder="请选择银行卡">
							</view>
							<view>
								<uni-icons type="right" color="#666" size="22"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</view>
					
			<view class="perMssban">
				<view class="perFlex">
					<view class="bName">*公司银行账号</view>
					<view class="perint">
						<input type="number" maxlength="20" v-model="form.bank_card_id"  placeholder-style="color:#C0C4CC;font-size:28upx;" placeholder="请输入卡号">
					</view>
				</view>
			</view>
			
			<view class="perMssban">
				<view class="perFlex">
					<view class="bName">*联系方式</view>
					<view class="perint">
						<input type="number" maxlength="11" v-model="form.mobile"  placeholder-style="color:#C0C4CC;font-size:28upx;" placeholder="请输入手机号码">
					</view>
				</view>
			</view>
			
			</block>
			<view class="perMssban">
				<view class="perFlex" style="justify-content: flex-start;">
					<view class="bName">*税务票据证明</view>
					<view v-if="idcardImg" @click="idcardchange">
						<image style="width: 300rpx;height: 160rpx;margin-left: 38rpx;" class="idcardImg" v-if="idcardImg" :src=idcardImg></image>
					</view>
					<view v-else class="perupload" @click="idcardchange">
						<image class="tacimg" src="../../static/img/ent.png"></image>
					</view>
					
				</view>
			</view>
			
			
			<view class="tiPay">
				<button @click.stop="goPayaccount">提现</button>
			</view>
			<view class="explain">
				<view class="exFs">
					提现说明:
				</view>
				
				<view class="w1">
					 企业账号提现必须先提交缴税证明
				</view>
				<view class="w1">
					 企业账户：{{sf}}%手续费+{{df}}%服务费
				</view>
				
			</view>		
		</view>
		
		<view class="op-height">
			<uni-popup ref="popup" background-color="#fff">
				<scroll-view class="scroll_box" scroll-y="true">
					<view class="popup-content">
						
						<view class="bnakMess" :class="index==status?'setBank' :''" @click.stop="seleBank(item,index)"  v-for="(item,index) in bankList" :key="item.id">
							
									{{item.name}}
						</view>
					</view>
				</scroll-view>
			</uni-popup>
		</view>
		
		<view class="op-height">
			<uni-popup ref="popupOne" background-color="#fff">
				<template v-if="poptype==1">
					<view class="closesOne" @click.stop="closeOne">
						<uni-icons  color="#979797" type="closeempty" size="26"></uni-icons>
					</view>
					<view class="clear"></view>
					<scroll-view class="scroll_box" scroll-y="true">
						<view class="popup-content">
							<view class="setselBak">选择银行卡</view>
							<radio-group @change="radioChange">
								<view class="bnakMess" :class="index==status?'setBank' :''" 
								  v-for="(item,index) in userbankList" :key="item.id">
											<view class="setRadio">
												<view>
													<radio :value=String(item.id) :checked="index === current"  />
												</view>
												<view>
													{{item.bank_name}}
													{{ item.bank_card_id ? item.bank_card_id.replace(/^(\d{4})\d+(\d{4})$/,"$1**********$2") :""}}
												</view>
												<view class="delBamk">
													<image @click="deleBank(item)" src="/static/icon/de.png"></image>
												</view>
											</view>	
								</view>
							</radio-group>
						</view>
					</scroll-view>
					<view class="addBankS" @click.stop="alBank(2)">
						<button>+添加银行卡</button>
					</view>
				</template>
				<template v-if="poptype==2">
					<view class="closesOne" @click.stop="closeOne">
						<uni-icons  color="#979797" type="closeempty" size="26"></uni-icons>
					</view>
					<view class="clear"></view>
					<view class="newCard">
						添加新卡
					</view>
					<view class="perMssban">
						<view class="perFlex">
							<view class="bName">*公司名称</view>
							<view class="perint">
								<input type="text"   maxlength="50"  v-model="form1.user_name"  placeholder-style="color:#C0C4CC;font-size:28upx;" placeholder="请输入公司名称,最多输入50个字符">
							</view>
						</view>
					</view>
					<view class="perMssban">
						<view class="perFlex seleOpt">
							<view class="bName">*公司开户银行</view>
							<view class="seopsty">
								<uni-data-select
								      v-model="form1.bank_name"
								      :localdata="range"
								      @change="changeBank"
								    >
								</uni-data-select>
							</view>
							
						</view>
					</view>
							
					<view class="perMssban">
						<view class="perFlex">
							<view class="bName">*对公银行卡号</view>
							<view class="perint">
								<input type="number" maxlength="20" v-model="form1.bank_card_id"  placeholder-style="color:#C0C4CC;font-size:28upx;" placeholder="请输入卡号">
							</view>
						</view>
					</view>
					<view class="perMssban">
						<view class="perFlex">
							<view class="bName">*纳税人识别号</view>
							<view class="perint">
								<input type="idcard"  maxlength="20"  v-model="form1.id_card"   placeholder-style="color:#C0C4CC;font-size:28upx;" placeholder="请输入身份证号,尾号X注意大写">
							</view>
						</view>
					</view>
					<view class="perMssban">
						<view class="perFlex">
							<view class="bName">*联系方式</view>
							<view class="perint">
								<input type="number" maxlength="11" v-model="form1.mobile"  placeholder-style="color:#C0C4CC;font-size:28upx;" placeholder="请输入手机号码">
							</view>
						</view>
					</view>
					<view class="confAdd" @click.stop="conuBank">
						<button>确认添加</button>
					</view>
				</template>
				
			</uni-popup>
		</view>
		
	</view>
</template>

<script>
	import {passcard} from '@/common/passcard.js';
	
	const utils = require('@/common/passcard.js')
	import $config from '@/common/config'
	export default {
		data() {
			return {
				bankVal:'',
				statusBar:'',
				active:1,
				radio1:2,
				tabs:1,
				blance:'',
				isaddshow:false,
				range: [],
				tmp:'',
				form:{
					bank_card_id:'',
					bank_name:'',
					id_card:'',
					user_name:'',
					withdraw_in_cents:'',
					withdraw_type:0,
					mobile:'',
					user_bank_id:'',
					request_auth_state:2,
					tax_receipt:{
						
					}
				},
				form1:{
					bank_card_id:'',
					bank_name:'',
					id_card:'',
					user_name:'',
					mobile:'',
				},
				bankName:'',
				status:99999,
				widata:'',
				dc:'0.00',//到账
				sf:'0',//手续费
				df:'0',//代扣
				iscardpass:false,
				poptype:'',
				current:0,
				userbankList:[],
				bank_id:0,
				sefform:{},
				idcardImg:'',
				bankList:[
					{id:1,name:'中国工商银行'},
					{id:2,name:'中国农业银行'},
					{id:3,name:'中国银行'},
					{id:4,name:'中国建设银行'},
					{id:5,name:'交通银行'},
					{id:6,name:'浦发银行'},
					{id:7,name:'招商银行'},
					{id:8,name:'中信银行'},
					{id:9,name:'光大银行'},
					{id:10,name:'华夏银行'},
					{id:11,name:'民生银行'},
					{id:12,name:'兴业银行'},
					{id:13,name:'广发银行'},
					{id:14,name:'平安银行'},
					{id:15,name:'渤海银行'},
					{id:16,name:'恒丰银行'},
					{id:17,name:'浙商银行'},
					{id:18,name:'中国邮政储蓄银行'}
				]
			
			}
			
		},
		created() {
			this.userBalance();
			this.userWithdraw();
			this.getBank();
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
			 this.UserBank();
			if(this.userbankList.length==0)
			{
				this.poptype='2'
			}
			
		},
		
		methods: {
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
			idcardchange()
			{
				this.ischange=true
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
								console.log('Gerry',gres)
								if(gres.code==200)
								{
									
										this.idcardImg=gres.data.url
										
										this.form.withdraw_in_cents=this.tmp
										
										var tax_receipt=
										{
											file_name: gres.data.file_name,
											file_path: gres.data.path,
											file_url: gres.data.url
										}
										this.form.tax_receipt=tax_receipt
										
										
									
									
									
									
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
			
			 onKeyInput: function(event) {
				let inputValue = event.target.value.length
				
			},
			closeOne()
			{
				this.$refs.popupOne.close()
			},
			// 删除银行卡
			deleBank(item)
			{
				
				uni.showModal({
					title:'提示',
					content:'确认删除'+item.bank_name+'卡吗?',
					success: (res) => {
						if(res.confirm)
						{
							this.api.interactive.UserDeleBank(item.id).then(res=>{
								if(res.code==200)
								{
									uni.showToast({
										title:'删除成功!',
										icon:'none'
									})
									this.form.withdraw_in_cents=' '
									this.form.bank_card_id=''
									this.form.bank_name=''
									this.form.id_card=''
									this.form.user_name=''
									
									this.form.withdraw_type=0
									this.form.mobile=''
									this.form.user_bank_id=''
									// this.form1=[]
									// this.sefform=[]
									this.UserBank()
									
								}
							})
										
						}
					}
					
				})
				
			},
			radioChange(evt) {
			
				for (let i = 0; i < this.userbankList.length; i++)
				{
					if (this.userbankList[i].id == evt.detail.value) 
					{
						this.current = i;
						this.bank_id=evt.detail.value;
						if(this.form.withdraw_in_cents >0)
						{
							this.userbankList[i].withdraw_in_cents=this.form.withdraw_in_cents
						}
						this.form=this.userbankList[i]
						
						this.form.withdraw_type=0
						this.form.user_bank_id  =this.userbankList[i].id
						var {... sefform}=this.form
						
						sefform.bank_name=sefform.bank_name+'('+(sefform.bank_card_id.substr(-4))+')'
						this.sefform=sefform
						this.$refs.popupOne.close()
						break;
					}
					
					
				}
			},
			getBank()
			{
				let myrange=[];
				 this.bankList.forEach((val, index) => {
				 	myrange.push({ value: val.name, text: val.name })
				 })
				 this.range=myrange
			},
			changeBank(e) {
			    
			},
			
			//获取用户银行卡信息
			UserBank()
			{
				uni.showLoading({
					title:' ',
					icon:'loading',
					mask:true
				})
				let myrange=[]
				this.api.interactive.UserBank().then(res=>{
					if(res.code==200 && res.data.length >0)
					{
						uni.hideLoading()
						this.userbankList=res.data;
						res.data.map((item,index)=>{
							if(item.is_use==1 || index==0)
							{
								this.form=item;
								this.form.user_bank_id  =item.id
								this.form.withdraw_type=0
								var {... sefform}=item
								
								sefform.bank_name=sefform.bank_name+'('+(sefform.bank_card_id.substr(-4))+')'
								this.sefform=sefform
								
								return
							}
						})
						
						
					}else{
						uni.hideLoading()
						this.isaddshow=true
						// this.sefform=[]
						// this.form.withdraw_in_cents=' '
						// this.form=[],
						// this.form1=[],
						this.userbankList=[]
					}
				}).catch(err=>{
					
					uni.hideLoading()
				})
			},
			drawDeitals()
			{
				uni.navigateTo({
					url:'/pages/record/record'
				})
			},
			userBalance()
			{
				this.api.interactive.userBalance().then(res=>{
					
					if(res.code===200)
					{
						this.blance=res.data.balance.remaining_balance_in_cents/100
					}
				})	
			},
			plBank()
			{
				this.$refs.popup.open('bottom')
			},
			alBank(pam)
			{
				
				this.poptype=pam
				this.$refs.popupOne.open('bottom')
			},
			seleBank(item,index)
			{
				
				this.status=index;
				
				this.form.bank_name=item.name
				this.$refs.popup.close()
			},
			
			userWithdraw()
			{
				this.api.interactive.userWithdraw().then(res=>{
					
					this.widata=res.data
				})
			},
			// 添加新都银行卡
			conuBank()
			{
				
				let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
				if(!this.form1.user_name)
				{
					uni.showToast({
						title:'请输入姓名！',
						icon:'none'
					})
					return false
				}
				if(!this.form1.bank_name)
				{
					uni.showToast({
						title:'请选择银行！',
						icon:'none'
					})
					return false
				}
				if(!this.form1.bank_card_id)
				{
					uni.showToast({
						title:'请输入银行卡号！',
						icon:'none'
					})
					return false
				}
				if(!this.form1.id_card)
				{
					uni.showToast({
						title:'请输入身份证号码！',
						icon:'none'
					})
					return false
				}
				if (this.iscardpass) {
					
					uni.showToast({
						title:'身份证号码有误，请重新输入！',
						icon:'none'
					})
					return false
				}
				if(!this.form1.mobile)
				{
					uni.showToast({
						title:'请输入电话号码！',
						icon:'none'
					})
					return false
				}
				if(!reg.test(this.form1.mobile))
				{
					uni.showToast({
						title:'请输入正确的电话号码！',
						icon:'none'
					})
					return false
				}
				
				this.userbankList.map((item,index)=>{
					if(item.bank_card_id==this.form1.bank_card_id)
					{
						uni.showToast({
							title:'该银行卡已被添加，请勿重复添加！',
							icon:'none'
						})
						return false
					}
				})
				
				this.api.interactive.UserAddBank(this.form1).then(res=>{
					
					if(res.code==200)
					{
						uni.showToast({
							title:'添加成功！',
							icon:'none'
						});
						this.poptype=1
						this.form1={}
						this.form={}
						this.UserBank()
					}
				})
			},
			IntInput(e) {
				
				let val = e.target.value.replace(/(^\s*)|(\s*$)/g, "")
				
				if(parseInt(val) >parseInt(this.blance))
				{
					uni.showToast({
						title:'可用额度不足！',
						icon:'none'
					})
					return
				}
				this.sf=parseFloat(this.widata.withdrawConfigForCom/100*val).toFixed(2)  
				this.df=parseFloat(this.widata.taxConfigForCom/100*val).toFixed(2)
				  if(val >0 && val)
				  {
					 this.dc=parseInt(val)-(parseInt(this.widata.withdrawConfigForCom/100*val)+parseInt(this.widata.taxConfigForCom/100*val)) 
				  }else{
					  this.dc=0
				  }
				
			},
			poinblur(e)
			{
				
				
				let mom=Number(e.detail.value) / 100
				if(!Number.isInteger(mom))
				{
					uni.showToast({
						title:'请输入整百面额！',
						icon:'none'
					})
					this.form.withdraw_in_cents=''
					this.sf='0.00'
					this.df='0.00' 
					this.dc='0.00'
					return
				}
				
				
				if(this.form.withdraw_in_cents >this.blance)
				{
					uni.showToast({
						title:'可用额度不足，重新输入！',
						icon:'none'
					})
					return
				}
				this.tmp=this.form.withdraw_in_cents
			},
			//提现
			goPayaccount()
			{
				let {...form}=this.form;
				uni.showLoading({
					title:'处理中...',
					mask:true
				})
				if(this.form.withdraw_in_cents >this.blance)
				{
					uni.showToast({
						title:'可用额度不足，重新输入！',
						icon:'none'
					})
					
					return
				}
				if(!this.form.withdraw_in_cents || this.form.withdraw_in_cents<=0)
				{
					
					uni.showToast({
						title:'请填写整百提现金额！',
						icon:'none'
					})
					return false
					
				}
					
					
					if(!this.form.user_name)
					{
						uni.showToast({
							title:'请输入公司名称！',
							icon:'none'
						})
						return false
					}
					if(!this.form.id_card)
					{
						uni.showToast({
							title:'请输入纳税人识别号！',
							icon:'none'
						})
						return false
					}
					if(!this.form.bank_name)
					{
						uni.showToast({
							title:'请选择银行！',
							icon:'none'
						})
						return false
					}
					if(!this.form.bank_card_id)
					{
						uni.showToast({
							title:'请输入银行卡号！',
							icon:'none'
						})
						return false
					}
					if(this.userbankList.length >0 &&  !this.form.bank_name)
					{
						
							uni.showToast({
								title:'请选择银行！',
								icon:'none'
							})
							return false
					}
					
					
					if(!this.form.mobile)
					{
						uni.showToast({
							title:'请输入电话号码！',
							icon:'none'
						})
						return false
					}
					let regs = /^[1][3,4,5,7,8,9][0-9]{9}$/
					if(!regs.test(this.form.mobile))
					{
						uni.showToast({
							title:'请输入正确的电话号码！',
							icon:'none'
						})
						return false
					}
					
					if(!this.idcardImg)
					{
						uni.showToast({
							title:'请上传税务票据证明！',
							icon:'none'
						})
						return
					}
					form.withdraw_in_cents=form.withdraw_in_cents*100
					form.request_auth_state  =2;
					
				this.api.interactive.userApplication(form).then(res=>{
					uni.hideLoading()
					if(res.code===200)
					{
						this.form.withdraw_in_cents=''
						this.form.bank_card_id=''
						this.form.bank_name=''
						this.form.id_card=''
						this.form.user_name=''
						this.idcardImg=''
						this.form.withdraw_type=0
						this.form.mobile=''
						this.form.user_bank_id=''
						this.tmp=''
						this.status='999999999999999999'
						this.current = 0;
						uni.showToast({
							title:'提现成功，等待审核！',
							icon:'none',
							duration:2000
						})
						
						this.sf='0.00'
						this.df='0.00' 
						this.dc='0.00'
						setTimeout(()=>{
							this.UserBank();
							this.userBalance()
						},1500)
						
					}
				}).catch(err=>{
					uni.hideLoading()
					uni.showToast({
						title:err.message,
						icon:'none'
					})
				})
			},
			//判断身份证合法化
		// 	isbankCard(e)
		// 	{
		// 		//身份证验证代码
		// 		var idCardMsg = utils.identityIDCard(e.detail.value);
		// 		if (!this.form.id_card)
		// 		{
		// 			this.iscardpass=true
		// 			uni.showToast({
		// 				title:'请输入身份证号码！',
		// 				icon:'none'
		// 			})
		// 			return false
		// 		}	
		// 		if (!idCardMsg.isPass) 
		// 		{
		// 			this.iscardpass=true
		// 			uni.showToast({
		// 				title:'身份证号码有误，请重新输入！',
		// 				icon:'none'
		// 			})
		// 			return false
		// 		}
		// 		this.iscardpass=false
		// 	}
		
		}
	}
</script>

<style>
	.iotops{
		
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 16upx;
		border-bottom: 1upx solid #ccc;
		background-color: #fff;
		align-items: center;
	}
	.popup-content{
		height: 600upx;
	}
	.setselBak{
		text-align: center;
		font-size: 30upx;
		font-weight: 600;
	}
	.sr{
		font-size: 28upx;
	}
	
	.withMoney{
		text-align: center;
		font-size: 36upx;
		color: #666;
		padding: 32upx;
	}
	.isMoney{
		background: #fff;
		padding: 28upx 38upx;
		
	}
	.mName{
		font-size: 30upx;
		color: #333;
	}
	.ifms{
		font-size: 34upx;
		margin: 23upx 0;
		color: red;
	}
	.mNums,.perFlex{
		align-items: baseline;
		display: flex;
		
	}
	.setinput input,.perFlex input{
		width: 460upx;
		height: 80upx;
		margin-left: 6upx;
	}
	.canMoney{
		font-size: 28upx;
		color: #999;
		
	}
	.sfmg{
		padding-top: 28upx;
	}
	.twoleft{
		padding-left:60upx;;
	}
	.scroll_box{
		height: 700upx;
		padding-bottom: 30upx;
	}
	.setBank{
		background: #;
	}
	.confAdd{
		margin-top: 60upx;
	}
	.addBankS button,.confAdd button{
		margin-bottom: 40upx;
		background-color:#0C5290;
		width: 210upx;
		
		padding: 20upx 10upx;
		color: #fff;
		font-size: 28upx;
		border-radius: 40upx;
	}
	
	.Selesty{
		width: 200upx;
		border-radius: 30upx;
		padding-left: 60upx;
	}
	.radio-content {
		  height: 40rpx;
		  display: flex;
		  align-items: center;
		}
		.radio {
		  width: 31rpx;
		  height: 31rpx;
		  border-radius: 50%;
		  border: 2rpx solid #2F5597;
		  display: flex;
		  flex-direction: column; 
		  align-items: center;
		  justify-content: center;
		  margin: 0rpx 26rpx 0rpx 15rpx;
		}
		.radio-active{
		  width: 21rpx; 
		  height: 21rpx;
		  border-radius: 50%;
		  background-color: #2F5597;
		}
		.radio-default{
		  border: 2rpx solid ##2F5597;
		}
		.radio-right {
		  margin-left: 66rpx;
		}
		.withMethods{
			margin-top: 20upx;
		}
		.bankNums{
			display: flex;
			align-items: center;
			justify-content: flex-start;
			padding: 30upx;
		}
		.bankImg image{
			width: 100%;
			height: 100%;
		}
		.bankImg{
			box-sizing: border-box;
			width: 50upx;
			height: 50upx;
		}
		.radio-right{
			margin-left: auto;
		}
		.gobank{
			font-size: 28upx;
			padding-left: 10upx;
			
		}
		.menth-m{
			font-size: 32upx;
			border-bottom: 1upx solid #ededed;
			padding-left: 30upx;
			padding-bottom: 20upx;
		}
		
		.withMethods{
			background-color: #fff;
			padding: 28upx 0;
		}
		.seslinr{
			height:  1upx;
			background-color: #ededed;
			margin: 0 30upx;
		}
		.perMssban{
			padding-left: 38upx;
			padding-right: 38upx;
			
		}
		.perupload{
			text-align: center;
			background-color: #FAFAFA;
			padding: 34rpx 114rpx;
			margin-left: 38rpx;
			border: 1px solid #B3B3B3;
			border-radius: 20rpx;
		}
		.tacimg{
			width: 36rpx;
			height: 36rpx;
		}
		.newCard{
			text-align: center;
			font-size: 28upx;
			font-weight: 600;
			padding: 30upx;
		}
		.perFlex{
			padding: 20upx 0;
			border-bottom: 1rpx solid #ededed;
			justify-content: space-between;
			
		}
		/* .bName{
			padding-left: 50upx;
		} */
		.seopsty{
			width: 460upx;
		}
		.exFs{
			font-size: 30upx;
			margin-bottom: 20upx;
		}
		.explain{
			padding: 30upx;
			margin-top: 80upx;
			padding-bottom: 120upx;
		}
		.w1{
			color: #999;
			font-size: 26upx;
			padding-top: 10upx;
		}
		.bnakMess{
			padding: 16upx 0;
		}
		.setRadio{
			display: flex;
			align-items: center;
		}
		.delBamk{
			flex: 1;
			text-align: right;
		}
		.delBamk image{
			width: 60upx;
			height: 60upx;
		}
		.setBank{
			background: #ADE1F5;
			color: #fff;
			font-size: 26upx;
		}
		.tiPay{
			padding-top: 60upx;
		}
		.tiPay button{
			background-color: #0C5290;
			width: 260upx;
			padding: 20upx 60upx;
			color: #fff;
			font-size: 28upx;
		}
		.setbakd{
			display: flex;
			align-items: center;
		}
		
		/deep/.uni-radio-input-checked{
				font-size: 42upx!important;
				}
		
		/deep/.uni-radio-input{
			width: 40upx!important;
			height: 40upx!important;
			border-radius: 100%!important;
		}
		.closesOne{
			float: right;
			
		}
		.clear{
			clear: both;
			overflow: hidden;
		}
</style>
