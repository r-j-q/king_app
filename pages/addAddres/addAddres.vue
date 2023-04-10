<template>
	<view>
		<view class="nnNK1V8SIKdQ4P95ITVw">
				<view class="zSAG6fHnC1htNChuiNCq">
					<view>
						<text style="color: red;">*</text>联系人
					</view>
					<input placeholder="请填写收货人姓名" v-model="addresform.contact_name" placeholder-style="font-size:24upx"  data-type="name" value="">
				</view>
				<view class="Y09VOLr0iHjLGRFFig8K"></view>
				<view class="zSAG6fHnC1htNChuiNCq">
				<view>
					<text style="color: red;">*</text>手机号
				</view>
					<input type="number" maxlength="11" placeholder="请填写收货人手机号" v-model="addresform.contact_phone" placeholder-style="font-size:24upx" data-type="phone" value="">
				</view>
				<view class="Y09VOLr0iHjLGRFFig8K"></view>
				<view class="zSAG6fHnC1htNChuiNCq" @click="getAddresMess(0)">
					<view>所属区域</view>
					
					<view v-if="areaInfoObj.provinceObj.areaName" class="setSele issles">
						<view class="isflex">
							<view class="" :data-typecode="areaInfoObj.provinceObj.area_code"
							 :data-level="areaInfoObj.provinceObj.area_level">
								<text>{{areaInfoObj.provinceObj.areaName}}</text>
								
							</view>
							<view class="" :data-typecode="areaInfoObj.cityObj.area_code" 
							 :data-level="areaInfoObj.cityObj.area_level">
								{{areaInfoObj.cityObj.areaName}}
								
							</view>
							<view class="" :data-typecode="areaInfoObj.areaObj.area_code" 
							 :data-level="areaInfoObj.areaObj.area_level">
								{{areaInfoObj.areaObj.areaName}}
								
							</view>
							<view class="" :data-typecode="areaInfoObj.streetObj.area_code" 
							 :data-level="areaInfoObj.streetObj.area_level">
								{{areaInfoObj.streetObj.areaName}}
							</view>
						</view>
						
					</view>
					<input v-else disabled="true" placeholder="请选择省市县，乡镇等" placeholder-style="font-size:24upx" readonly="" value="">
				</view>
				<view class="Y09VOLr0iHjLGRFFig8K"></view>
				<view class="zSAG6fHnC1htNChuiNCq">
					<view>
						<text style="color: red;">*</text>详细地址
					</view>
					<input placeholder="街道，楼牌号等" v-model="addresform.address" placeholder-style="font-size:24upx" data-type="detail" value="">
				</view>
				<view class="Y09VOLr0iHjLGRFFig8K"></view>
				<view class="SVU9rrS4cmsHnnOOKemZ">
					<view>设为默认地址</view>
					
						<radio-group @change="checkboxChange">
							<view>
								<radio :value="ischeck" @click="radioClick"  :checked="checked" />
							</view>
						</radio-group>
					
				</view>
				<view class="Y09VOLr0iHjLGRFFig8K"></view>
				<button class="s0v4N6f6AKpoKTVzJzJA" @click="subAPiaddres">保存</button>
		</view>
		<view class="op-height">
				<uni-popup ref="popup"  background-color="#fff" @change="change">
					<view @click="closePop" class="clsoepop">
						<uni-icons type="closeempty" size="18"></uni-icons>
					</view>
					<view class="plaseSele">
						请选择所在地区
					</view>
					<view v-if="areaInfoObj.provinceObj.areaName" class="setSele">
						<view class="isflex">
							<view class="" :data-typecode="areaInfoObj.provinceObj.area_code"
							 :data-level="areaInfoObj.provinceObj.area_level"
							 @click="selePr($event,'',0)">
								<text>{{areaInfoObj.provinceObj.areaName}}</text>
								
							</view>
							<view class="" :data-typecode="areaInfoObj.cityObj.area_code" 
							 :data-level="areaInfoObj.cityObj.area_level"
							 @click="selePr($event,'',0)">
								{{areaInfoObj.cityObj.areaName}}
								
							</view>
							<view class="" :data-typecode="areaInfoObj.areaObj.area_code" 
							 :data-level="areaInfoObj.areaObj.area_level"
							 @click="selePr($event,'',0)">
								{{areaInfoObj.areaObj.areaName}}
								
							</view>
							<view class="" :data-typecode="areaInfoObj.streetObj.area_code" 
							 :data-level="areaInfoObj.streetObj.area_level"
							 @click="selePr($event,'',0)">
								{{areaInfoObj.streetObj.areaName}}
							</view>
						</view>
						
					</view>
					<scroll-view class="scroll_box" scroll-y="true">
						<view class="popup-content">
							<view class="prlist" @click="selePr(item,index,1)"  v-for="(item,index) in prList" :key="item.id">
								<view class="" v-if="areaInfoObj.provinceObj.area_code==item.area_code">
									{{item.area_name}} <uni-icons color="#ef8200" type="checkmarkempty" size="16"></uni-icons>

								</view>
								<view class="" v-else-if="areaInfoObj.cityObj.area_code==item.area_code">
									{{item.area_name}} <uni-icons color="#ef8200" type="checkmarkempty" size="16"></uni-icons>

								</view>
								<view class="" v-else-if="areaInfoObj.areaObj.area_code==item.area_code">
									{{item.area_name}} <uni-icons color="#ef8200" type="checkmarkempty" size="16"></uni-icons>

								</view>
								<view class="tt" v-else-if="areaInfoObj.streetObj.area_code==item.area_code">
									{{item.area_name}} <uni-icons color="#ef8200" type="checkmarkempty" size="16"></uni-icons>
								</view>
								<view  v-else >{{item.area_name}}</view>
							</view>
						</view>
					</scroll-view>
				</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ischeck:'1',
				checked:false,
				isval:0,
				addresform:{
					address:'',
					city: "",
					contact_name:"",
					contact_phone: "",
					district: "",
					is_default: 0,
					province: "",
					town: ""
				},
				showUniAddressSelector: false,
				areaInfoObj: {
				    provinceObj: {
				        areaCode: '',
				        areaName: '',
						area_level:''
				    },
				    cityObj: {
				        areaCode: '',
				        areaName: '',
						area_level:''
				    },
				    areaObj: {
				        areaCode: '',
				        areaName: '',
						area_level:''
				    },
				    streetObj: {
				        areaCode: '',
				        areaName: '',
						area_level:''
				    },
				},
				prList:'',
				status:"999999999999",
				aId:'',
				type:'',
				shopId:'',
				attstatus:''
				
			}
		},
		onLoad(options) {
			
			if(options.shopId >0)
			{
				this.aId=options.id?options.id:options.shopId
				
				this.api.interactive.getAddresInfo({
					aId:options.shopId
				}).then(res=>{
					if(res.code===200)
					{
						this.addresform=res.data
						this.areaInfoObj.provinceObj.areaName=res.data.province
						this.areaInfoObj.cityObj.areaName=res.data.city
						this.areaInfoObj.areaObj.areaName=res.data.district
						this.areaInfoObj.streetObj.areaName=res.data.town
						if(res.data.is_default==1)
						{
							this.checked=true
							this.ischeck='1'
						}
						
					}
				})
			}
			if(options.type)
			{
				this.type=options.type
			}
			if(options.shopId)
			{
				this.shopId=options.shopId
			}
			if(options.attstatus)
			{
				this.attstatus=options.attstatus
			}
		},
		methods: {
			checkboxChange(evt) {
				this.isval=evt.detail.value
			},
			radioClick()
			{
				this.checked =! this.checked
			},
			toggle(type)
			{
				// this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			change()
			{
				
			},
			closePop()
			{
				this.$refs.popup.close()
			},
			getAddresMess(pam)
			{
				this.api.interactive.superiorArea({
					aId:pam
				}).then(res=>{
					
					if(res.code===200 && res.data.length >0)
					{
						this.$refs.popup.open('bottom')
						this.prList=res.data;
						
					}
				})
			},
			//保存修改地址
			subAPiaddres()
			{
				this.addresform.province=this.areaInfoObj.provinceObj.areaName
				
				
				if(!this.areaInfoObj.cityObj.area_code && this.areaInfoObj.cityObj.area_code != undefined)
				{
					this.addresform.city=this.areaInfoObj.areaObj.areaName
					if(this.areaInfoObj.streetObj.areaName)
					{
						this.addresform.district=this.areaInfoObj.streetObj.areaName
						this.addresform.town=''
					}
					
				}else{
					
					this.addresform.city=this.areaInfoObj.cityObj.areaName
					this.addresform.district=this.areaInfoObj.areaObj.areaName
					this.addresform.town=this.areaInfoObj.streetObj.areaName;
				}
				
				if (this.checked)
				{
					this.addresform.is_default=1
				}else{
					this.addresform.is_default=0
				}
				
				
				
				if(!this.addresform.contact_name)
				{
					uni.showToast({
						title:'请填写收货人姓名！',
						icon:'none'
					})
					return
				}
				if(!this.addresform.contact_phone)
				{
					uni.showToast({
						title:'请填写收货人电话！',
						icon:'none'
					})
					return
				}
				if(!this.addresform.province)
				{
					uni.showToast({
						title:'请选择省市！',
						icon:'none'
					})
					return
				}
				if(!this.addresform.city)
				{
					uni.showToast({
						title:'请选择地区！',
						icon:'none'
					})
					return
				}
				if(!this.addresform.address)
				{
					uni.showToast({
						title:'请填写详细收货地址！',
						icon:'none'
					})
					return
				}
				
				if(this.addresform.id && this.addresform.id !=undefined)
				{
					this.api.interactive.editaddress({
						addresform:this.addresform,
						aId:this.aId
					}).then(res=>{
						
						if(res.code===200)
						{
							uni.showToast({
								title:'修改成功',
								icon:'none'
							})
							uni.navigateBack(1)
						}
					})
				}else{
					
					
					
					this.api.interactive.addApiaddress({
						addresform:this.addresform,
					}).then(res=>{
						
						if(res.code===200)
						{
							uni.showToast({
								title:'添加成功',
								icon:'none'
							})
						}
						setTimeout(()=> {
							if(this.type==2)
							{
								uni.navigateTo({
									url:'/pages/addres/addres?shopId='+this.shopId+'&type='+this.type+'&attstatus='+this.attstatus
								})
							}else{
								uni.navigateTo({
									url:'/pages/addres/addres'
								})
							}
							
						}, 2000);
						
					})
				}
				
			},
			selePr(pams,index,type)
			{
					this.status='';
					this.status=index;
					
					if(type==1)
					{
						this.getAddresMess(pams.area_code);
						if(pams.area_level==3)
						{	
							
							this.areaInfoObj.streetObj.areaName=''
							this.areaInfoObj.streetObj.area_code=''
							this.areaInfoObj.streetObj.area_level=''
						}else if(pams.area_level==2)
						{
							this.areaInfoObj.cityObj.areaName=''
							this.areaInfoObj.cityObj.area_code=''
							this.areaInfoObj.cityObj.area_level=''
													
							
							this.areaInfoObj.areaObj.areaName=''
							this.areaInfoObj.areaObj.area_code=''
							this.areaInfoObj.areaObj.area_level=''
													
												
							this.areaInfoObj.streetObj.areaName=''
							this.areaInfoObj.streetObj.area_code=''
							this.areaInfoObj.streetObj.area_level=''
						}else if(pams.area_level==1){
							
							this.areaInfoObj.cityObj.areaName=''
							this.areaInfoObj.cityObj.area_code=''
							this.areaInfoObj.cityObj.area_level=''
													
							this.areaInfoObj.areaObj.areaName=''
							this.areaInfoObj.areaObj.area_code=''
							this.areaInfoObj.areaObj.area_level=''
													
												
							this.areaInfoObj.streetObj.areaName=''
							this.areaInfoObj.streetObj.area_code=''
							this.areaInfoObj.streetObj.area_level=''
						}else if(pams.area_level==4)
						{
							
							if(!this.areaInfoObj.cityObj.area_code)
							{
								this.addresform.town=''
							}
							
						}
					}else{
						
						if(pams.currentTarget.dataset.level==1)
						{
							this.getAddresMess(0);
							this.areaInfoObj.cityObj.areaName=''
							this.areaInfoObj.cityObj.area_code=''
							this.areaInfoObj.cityObj.area_level=''
						
							
							this.areaInfoObj.areaObj.areaName=''
							this.areaInfoObj.areaObj.area_code=''
							this.areaInfoObj.areaObj.area_level=''
						
					
							this.areaInfoObj.streetObj.areaName=''
							this.areaInfoObj.streetObj.area_code=''
							this.areaInfoObj.streetObj.area_level=''
							
						}else if(pams.currentTarget.dataset.level==2)
						{
							
							this.getAddresMess(this.areaInfoObj.provinceObj.area_code);
							
														
						}else if (pams.currentTarget.dataset.level==3) {
						
							if(!this.areaInfoObj.cityObj.area_code)
							{
								this.getAddresMess(this.areaInfoObj.provinceObj.area_code);
							}else{
								this.getAddresMess(this.areaInfoObj.cityObj.area_code);
							}
							
							
							
							
						}else if(pams.currentTarget.dataset.level==4)
						{
							this.getAddresMess(this.areaInfoObj.areaObj.area_code);
						}
						else{
							
							this.getAddresMess(pams.currentTarget.dataset.typecode);
						}
					}
					
				
				
				
				
				if(pams.area_level==1)
				{
					this.areaInfoObj.provinceObj.areaName=pams.area_name
					this.areaInfoObj.provinceObj.area_code=pams.area_code
					this.areaInfoObj.provinceObj.area_level=pams.area_level
					
				}
				if(pams.area_level==2)
				{
					
					this.areaInfoObj.cityObj.areaName=pams.area_name
					this.areaInfoObj.cityObj.area_code=pams.area_code
					this.areaInfoObj.cityObj.area_level=pams.area_level
				}
				if(pams.area_level==3)
				{
					
					this.areaInfoObj.areaObj.areaName=pams.area_name
					this.areaInfoObj.areaObj.area_code=pams.area_code
					this.areaInfoObj.areaObj.area_level=pams.area_level
				}
				if(pams.area_level==4)
				{
					this.$refs.popup.close()
					this.areaInfoObj.streetObj.areaName=pams.area_name
					this.areaInfoObj.streetObj.area_code=pams.area_code
					this.areaInfoObj.streetObj.area_level=pams.area_level
					
					
					
					
				}
				
			}
			
		}
	}
</script>

<style>
	.isflex{
		display: flex;
		grid-gap: 20upx;
	}
	.popup-content{
		height: 600upx;
		padding-bottom: 40upx;
		font-size: 26upx;
		padding: 20upx 30upx;
		display: flex;
		flex-direction: column;
	}
	.op-height{
		position: relative;
		
	}
	.clsoepop{
		position: absolute;
		right: 0;
	}
	.prlist view{
		padding: 30upx;
		border-bottom: 1upx solid #ccc;
		
		
	}
	.scroll_box{
		height: 700upx;
		
	}
	.setSele{
		padding:40upx  40upx 20upx 40upx;
		
	}
	.issles{
		padding-left: unset;
	}
	.SVU9rrS4cmsHnnOOKemZ{
		display: flex;
		justify-content: space-between;
	}
	.active{
		color: yellow;
	}
	.nnNK1V8SIKdQ4P95ITVw{
		padding: 30upx;
		font-size: 26upx;
		background: #fff;
	}
	 .Y09VOLr0iHjLGRFFig8K {
	    height: 2upx;
	    background-color: rgba(209,200,200,.2);
	    margin: 30upx 0;
	}
	input{
		border: none;
		margin: 40upx 0;
	}
	
	.nnNK1V8SIKdQ4P95ITVw {
	    padding:30upx;
	    border-top: 2upx solid #e8e5e5;
	}
	
	.s0v4N6f6AKpoKTVzJzJA {
	    border-radius: 6upx;
	    margin: 20upx;
	    color: #fff;
	    background-color: #ef8200;
	    font-size: 28upx;
	    padding: 20upx;
	}
	.plaseSele{
		text-align: center;
		font-size: 26upx;
		padding: 20upx;
	}
</style>
