<template>
	<view class="content" v-bind:style="{height:imgHeight+'px'}">
		<!-- 背景图 -->
		<image src="../../static/grzx/backgroudimg.png" style="width: 100%; position: absolute; bottom: 0; height: 100%;"></image>
		<image src="../../static/grzx/back.png" class="returnClass" @click="returnClick"></image>
		
		<!-- 手机号+密码登录 -->
		<view class="inputContent" v-if="type==1">
			<view class="inputItem phoneNum">
				<image src="../../static/grzx/phone.png" class="iconClass1"></image>
				<input type="number" placeholder="手机号码" maxlength="11" class="inputClass" name="phoneNumber" data-key="phoneNumber" @input="inputChange1" :value="phoneNumber"/>
			</view>
			<view class="inputItem Captcha">
				<image src="../../static/grzx/password.png" class="iconClass2"></image>
				<input type="password" placeholder="请输入密码" class="inputClass" name="password" data-key="password" :value="password" @input="inputChange3" />
			</view>
			<text class="switchClass" @click="switchClick">切换登录方式</text>
			<image src="../../static/grzx/btnLogin.png" class="btnLogin" ></image>
			<text class="fontStyle" @click="pwdClick">登录</text>
		</view>
		
		<!-- 手机号+验证码登录 -->
		<view class="inputContent" v-if="type==2">
			<view class="inputItem phoneNum">
				<image src="../../static/grzx/phone.png" class="iconClass1"></image>
				<input type="number" placeholder="手机号码" maxlength="11" class="inputClass" name="phoneNumber" data-key="phoneNumber" @input="inputChange1" :value="phoneNumber"/>
			</view>
			<view class="inputItem Captcha">
				<image src="../../static/grzx/code.png" class="iconClass2"></image>
				<input type="number" placeholder="输入验证码" maxlength="4" class="inputClass" name="captchaCode" data-key="captchaCode" @input="inputChange2" :value="captchaCode"/>
			</view>
			<!-- 发送验证码 -->
			<view class="getCode style1" @click="getCodeClick" id="Code">{{textCode}}</view>
			<image src="../../static/grzx/btnLogin.png" class="btnLogin" ></image>
			<text class="switchClass" @click="switchClick">切换登录方式</text>
			<text class="fontStyle" @click="codeClick">确定</text>
		</view>
		
		<!-- logo -->
		<image src="../../static/grzx/logo.png" class="logoClass"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:1,  //1为密码登录，2为验证码登录
				textCode:"获取验证码",
				phoneNumber:'',
				password:'',
				captchaCode:'',
				imgHeight:'',
			}
		},
		onLoad() {
			this.load();
		},
		methods: {
			//--------------加载数据-------------
			async load(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight;
				       }
				});
			},
			//--------------只能输入数字-------------
			judgeNum(val){  
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				    if(regPos.test(val) || regNeg.test(val)) {
				        return true;
				    } else {
				        return false;
				    }
			},
			inputChange1(e){
				var num=e.detail.value;
				if(this.judgeNum(num)){
					
				}else{
					uni.showToast({
						title : '请输入正确的手机号码',
						icon : 'none',
					})
				}
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			inputChange2(e){
				var num=e.detail.value;
				if(this.judgeNum(num)){
					
				}else{
					uni.showToast({
						title : '请输入正确的验证码',
						icon : 'none',
					})
				}
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			inputChange3(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			//--------------密码登录-------------
			pwdClick(){
				uni.showLoading({
					title:'登录中...'
				})
				var that=this;
				console.log(that.phoneNumber)
				console.log(that.password)
				uni.request({
					//url:'http://111.231.109.113:8002/api/person/LoginByPassWord_Driver',
					url:that.$GrzxInter.Interface.LoginByPassWord_Driver.value,
					data:{
						phoneNumber:that.phoneNumber,
						password:that.password,
					},
					method:that.$GrzxInter.Interface.LoginByPassWord_Driver.method,
					success(res) {
						console.log(res)
						if(res.data.msg=='登入成功'){
							that.getuserInfo(that.phoneNumber);
						}else{
							uni.showToast({
								title:'手机号未注册或密码错误',
								icon:'none',
							})
						}
					}
				})
			},
			//--------------验证码登录-------------
			codeClick(){
				uni.showLoading({
					title:'登录中...'
				})
				var that=this;
				const {phoneNumber, captchaCode} = this;		
				var phone=this.phoneNumber;
				var captcha=this.captchaCode;
				if(phone==null||phone==""){
					uni.showToast({
						title:"请输入手机号码",
						icon:"none"
					})
				}else{
					if(captcha==null||captcha==""){
						uni.showToast({
							title:"请输入验证码",
							icon:"none"
						})
					}else{
						uni.getStorage({
							key:'captchaCode',
							success(res) {
								if(captcha==res.data.code&&phone==res.data.phone){
									that.getuserInfo(phone);
								}else{
									uni.showToast({
										title:"验证码错误",
										icon:"none"
									})
								}
							},
							fail(){
								uni.showToast({
									title:"验证码已过期，请重新获取",
									icon:"none"
								})	
							}
						})
					
					}
				}
			},
			//--------------获取用户信息-------------
			getuserInfo(e){
				var that=this;
				uni.request({
					//url:'http://111.231.109.113:8002/api/person/GetDetailInfo_Driver',
					url:that.$GrzxInter.Interface.GetDetailInfo_Driver.value,
					data:{
						phoneNumber:e
					},
					method:that.$GrzxInter.Interface.GetDetailInfo_Driver.method,
					success(res) {
						uni.hideLoading();
						if(res.data.data.userauditState=='1'||res.data.data.userauditState==1){
							uni.setStorageSync('userInfo',res.data.data)
							uni.showToast({
								title:"登录成功",
								icon:"success"
							})
							uni.removeStorageSync('captchaCode'); //清除验证码的缓存
							setTimeout(function(){
								uni.switchTab({  //返回首页
									url:'/pages/index/index',
								}) 
							},500);
						}else if(res.data.data.userauditState=='0'||res.data.data.userauditState==0){
							uni.showToast({
								title:'您的信息正在审核中',
								icon:'none'
							})
						}else if(res.data.data.userauditState=='2'||res.data.data.userauditState==2){
							uni.showToast({
								title:'您的信息审核不通过，请重新注册',
								icon:'none'
							})
						}
					}
				})
			},
			//--------------获取车辆信息-------------
			getvehicleInfo(id){
				uni.request({
					url:'',
					data:{
						driverId:id,
					},
					method:'POST',
					success(res) {
						console.log(res,'vehicleInfo')
						uni.setStorageSync('vehicleInfo',{
							vehicleType: '',
							vehicleNumber: '',
						})
					}
				})
			},
			//--------------获取验证码-------------
			getCodeClick(e){
				var self=this;
				const {phoneNumber, captchaCode} = this;		
				if(self.judgeNum(self.phoneNumber)){
					var timer=null,second=59; //倒计时的时间
					if(self.textCode == "获取验证码"){
					  self.textCode = second+"秒后重发";
					  if(self.textCode == "59秒后重发"){
						  timer=setInterval(function(){
						  second--;
						  if(second<=0){	
						  	self.textCode = "获取验证码";
						  	clearInterval(timer);
						  	second=59;	
						  }
						  else{			
						  	self.textCode = second+"秒后重发";
						  }},1000)
						 uni.request({
							//url:'http://111.231.109.113:8002/api/person/getLoginCode',
							url:self.$GrzxInter.Interface.getLoginCode.value,
						    data:{
								phoneNumber:self.phoneNumber,
							},
							method:self.$GrzxInter.Interface.getLoginCode.method,
							success:(res)=>{
						 		console.log(res.data.data);
								uni.setStorage({
									key:'captchaCode',
									data:{
										code:res.data.data,
										phone:self.phoneNumber,
									}
								})
								setTimeout(function(){
									uni.removeStorage({
										key:'captchaCode',
									})
								},300000);
						    }
						 }) 
					  }
					}
				}else{
					uni.showToast({
						title : '请输入正确的手机号码',
						icon : 'none',
					})
				}
			},
			//--------------返回上一页-------------
			returnClick(){		
				uni.navigateBack();
			},
			//--------------切换登录方式-------------
			switchClick(){
				this.password="";
				this.captchaCode="";
				console.log(this.password,"this.password")
				console.log(this.captchaCode,"this.captchaCode")
				if(this.type==1){
					this.type=2;
				}else{
					this.type=1;
				}
			},
		}
	}
</script>

<style lang="scss">
	//该界面的全局样式
	.content {
		width: 100%;
		height: 1000upx;
		position: relative;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 110upx;
		left: 4.13%;
		position: absolute;
	}
	.logoClass{		//logo的样式
		width: 34.4%;
		height: 250upx;
		top: 200upx;
		left: 33.87%;
		position: absolute;
	}
	.iconClass1{   //手机图标
		width: 26upx;
		height: 36upx;
		top: 57upx;
		left:2%;
		position: absolute;
	}
	.iconClass2{	//验证码图标
		width: 31upx;
		height: 38upx;
		top: 54upx;
		left: 2%;
		position: absolute;
	}
	.inputContent{  //登录区域的样式
		width: 90.4%;
		height: 720upx;
		position: absolute;
		top:324upx;
		left: 4.8%;
		background-color: white;
		border-radius: 50upx;
	}
	.inputItem{		//输入区域的样式
		width: 87.6%;
		height: 140upx;
		border-bottom: 1upx solid #EAEAEA;
	}
	.phoneNum{
		position: absolute;
		top:130upx;
		left: 6.19%;
	}
	.Captcha{
		position: absolute;
		top:272upx;
		left: 6.19%;
	}
	.inputClass{	//输入框的位置
		position: absolute;
		left: 12%;
		top:51upx;
		font-size: 32upx;
		height: 30upx;
		line-height: 30upx;
		color: #999999;
	}
	.btnLogin{ //按钮
		position: absolute;
		top:500upx;
		width: 100%;
		height: 180upx;
	}
	.leftLine{
		border: 1upx solid #EAEAEA;
		height: 1upx;
		width: 22.48%;
		position: absolute;
		top:920upx;
		left: 11.73%;
	}
	.rightLine{
		border: 1upx solid #EAEAEA;
		height: 1upx;
		width: 22.48%;
		position: absolute;
		top: 920upx;
		left: 64.78%;
	}
	.getCode{  //获取验证码
		position: absolute;
		top:308upx;
		left: 64%;
		width:30%;
		font-size: 28upx;
		border-radius: 12upx;
		text-align: center;
		line-height: 64upx;
		height: 64upx;
	}
	.style1{	
		border:1px solid #ED1C24;
		color: #ED1C24;
	}	
	.fontStyle{		//确定字体样式
		position: absolute;
		top: 530upx;
		left: 5%;
		text-align: center;
		font-size: 36upx;
		color: #FFFFFF;
		width: 90%;
		height: 100upx;
		line-height: 100upx;
	}
	.switchClass{ //切换登录方式
		position: absolute;
		top:440upx;
		left: 65%; //8%;
		font-size: 30upx;
		color: #333333;
	}
</style>
