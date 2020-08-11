<template>
	<view class="content">
		<text class="titleClass">{{title}}</text>
		<image src="../../static/grzx/btnReturn.png" class="returnClass" @click="returnClick"></image>
		<image src="../../static/grzx/nav1.png" class="navClass"></image>
		
		<view class="boxClass">
			<view class="inputItem">
				<image src="../../static/grzx/phone.png" class="iconClass1"></image>
				<input type="number" placeholder="手机号码" maxlength="11" class="inputClass" data-key="phoneNumber" @input="inputChange" @blur="leavePhone"/>
			</view>
			<view class="inputItem">
				<image src="../../static/grzx/password.png" class="iconClass2"></image>
				<input password="true" placeholder="请输入密码(6-20位)" maxlength="20" class="inputClass" data-key="password" @input="inputChange" @blur="leavePwd"/>
			</view>
			<view class="inputItem">
				<image src="../../static/grzx/code.png" class="iconClass3"></image>
				<input type="number" placeholder="验证码" maxlength="4" class="inputClass" data-key="code" @input="inputChange" />
				<view class="codeClass" @click="getCodeClick" id="Code">{{textCode}}</view>
			</view>
			<view @click="nextClick" class="nextClass">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				title:'',
				phoneNumber:'',
				password:'',
				code:'',
				textCode:'获取验证码',
			}
		},
		onLoad(){
			
		},
		methods:{
			//------------只能输入数字-----------
			judgeNum(val){ 
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				    if(regPos.test(val) || regNeg.test(val)) {
				        return true;
				    } else {
				        return false;
				    }
			},
			//------------输入数据变化时执行-----------
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			//------------离开手机号输入框时执行-----------
			leavePhone(){
				if(this.phoneNumber.length==null||this.phoneNumber.length==""){
					uni.showToast({
						title:'请输入手机号码',
						icon:'none',
					})
				}else if(this.phoneNumber.length!=11){
					uni.showToast({
						title:'请输入正确的手机号码',
						icon:'none',
					})
				}
			},
			//------------离开密码输入框时执行-----------
			leavePwd(){
				if(this.password.length<6){
					uni.showToast({
						title:'密码的长度过短，请输入6-20位的密码',
						icon:'none',
					})
				}
			},
			//------------返回上一页-----------
			returnClick(){
				uni.navigateBack();
			},
			//------------获取验证码-----------
			getCodeClick(){
				var that=this;
				const {phoneNumber, captchaCode} = this;		
				if(that.judgeNum(that.phoneNumber)){
					var timer=null,second=59; //倒计时的时间
					if(that.textCode == "获取验证码"){
					  that.textCode = second+"秒后重发";
					  if(that.textCode == "59秒后重发"){
						  timer=setInterval(function(){
						  second--;
						  if(second<=0){	
						  	that.textCode = "获取验证码";
						  	clearInterval(timer);
						  	second=59;	
						  }
						  else{			
						  	that.textCode = second+"秒后重发";
						  }},1000)
						 uni.request({
							url:'http://111.231.109.113:8002/api/person/getLoginCode',
							data:{
								phoneNumber:that.phoneNumber
							},
						    method:"POST",
							success:(res)=>{
						 		console.log(res);
								uni.setStorage({
									key:'captchaCode',
									data:{
										code:res.data.data,
										phone:that.phoneNumber,
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
			//------------下一步-----------
			nextClick(){
				var codeList=uni.getStorageSync('captchaCode');
				var phone=this.phoneNumber;
				var pwd=this.password;
				var num=this.code;
				if(phone==""||phone==null){
					uni.showToast({
						title:'请输入手机号码',
						icon:'none',
					})
				}else if(phone.length!=11){
					uni.showToast({
						title:'请输入正确的手机号码',
						icon:'none',
					})
				}else if(pwd==""||pwd==null){
					uni.showToast({
						title:'请输入密码',
						icon:'none',
					})
				}else if(pwd.length<6){
					uni.showToast({
						title:'密码过短，请输入6-20位的密码',
						icon:'none',
					})
				}else if(num==""||num==null){
					uni.showToast({
						title:'请输入验证码',
						icon:'none',
					})
				}else if(codeList==""){
					uni.showToast({
						title:'验证码已过期，请重新获取',
						icon:'none',
					})
				}else{
					if(phone==codeList.phone&&num==codeList.code){
						uni.request({
							url:'http://111.231.109.113:8002/api/person/LoginByCheckCode_Driver',
							data:{
								phoneNumber:phone,
							},
							method:'POST',
							success(res1) {
								if(res1.data.data==null||res1.data.data==""||res1.data.msg=="未存在该账号或者密码错误"){
									var list={
										phoneNumber:phone,
										password:pwd,
									}
									uni.setStorageSync('registerList1',list)
									uni.removeStorage({
										key:'captchaCode',
									})
									uni.navigateTo({
										url:'/pages/grzx/registerPage2'
									})
								}else{
									uni.showToast({
										title:'该用户已注册',
										icon:'none',
									})
								}
							}
						})
					}else{
						uni.showToast({
							title:'验证码输入错误，请重新输入',
							icon:'none',
						})
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F9FC;
	}
	.content{
		//position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 84upx;
		left: 4.13%;
		position: fixed;
	}
	.titleClass{	//标题
		color: #333333;
		font-size: 40upx;
		width: 100%;
		text-align: center;
		top: 70upx;
		position: fixed;
		font-weight: bold;
	}
	.navClass{	//导航
		width: 90%;
		height: 75upx;
		margin-left: 5%;
		margin-top: 170upx;
		//position: absolute;
	}
	.boxClass{
		display: flex;
		flex-direction:column;
		background-color: #FFFFFF;
		width: 90%;
		height: 600upx;
		margin-left: 5%;
		margin-top: 50upx;
		border-radius: 30upx;
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
	.inputItem{
		width: 90%;
		margin-left: 5%;
		height: 130upx;
		border-bottom: 1upx solid #EAEAEA;
		position: relative;
	}
	.iconClass1{   //手机图标
		width: 26upx;
		height: 36upx;
		top: 57upx;
		left:2%;
		position: absolute;
	}
	.iconClass2{	//密码图标
		width: 31upx;
		height: 38upx;
		top: 54upx;
		left: 2%;
		position: absolute;
	}
	.iconClass3{	//验证码图标
		width: 31upx;
		height: 38upx;
		top: 54upx;
		left: 2%;
		position: absolute;
	}
	.nextClass{		//下一步
		width: 90%;
		height: 90upx;
		line-height: 90upx;
		margin-top: 60upx;
		margin-left: 5%;
		text-align: center;
		color:#FFFFFF;
		border-radius: 8upx;
		background-color: #FC4646;
		font-size: 34upx;
	}
	.codeClass{
		text-align: center;
		width: 30%;
		height: 64upx;
		line-height: 64upx;
		font-size: 28upx;
		border-radius: 10upx;
		border: 1upx solid #ff0000;
		color: #ff0000;
		top: 42upx;
		left: 68%;
		position: absolute;
	}
</style>
