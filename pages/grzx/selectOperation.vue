<template>
	<view class="content" v-bind:style="{height:imgHeight+'px'}">
		<!-- 背景图 -->
		<image src="../../static/grzx/backgroudimg.png" style="width: 100%; position: absolute; bottom: 0; height: 100%;"></image>
		<image src="../../static/grzx/back.png" class="returnClass" @click="returnClick"></image>
		<view class="boxClass">
			<image src="../../static/grzx/btnLogin.png" class="loginClass" @click="loginClick"></image>
			<text class="fontClass" @click="loginClick">登录</text>
			
			<!-- <image src="../../static/grzx/btnLogin.png" class="registerClass" ></image> -->
			<text class="registerClass" @click="registerClick">注册</text>
			<text class="textClass">司机需经过注册审核后方可登录</text>
		</view>
		<image src="../../static/grzx/logo.png" class="logoClass"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgHeight:'',
				address:'',
			}
		},
		onLoad(options) {
			this.address=options.address;
			this.load();
		},
		methods: {
			//--------加载数据---------
			async load(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight;
				       }
				});
			},
			//--------返回个人中心---------
			returnClick(){		
				if(this.address==1){
					uni.navigateBack();
				}else{
					uni.switchTab({
						url:'/pages/grzx/user'
					});
				}
			},
			//--------登录---------
			loginClick(){
				uni.navigateTo({
					url:'/pages/grzx/userLogin',
				})
			},
			//--------注册---------
			registerClick(){
				uni.navigateTo({
					url:'/pages/grzx/registerPage1',
				})
			},
		}
	}
</script>

<style lang="scss">
	//该界面的全局样式
	.content {
		width: 100%;
		//height: 1000upx;
		position: relative;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 110upx;
		left: 4.13%;
		position: absolute;
	}
	.loginClass{ //登录
		position: absolute;
		top:200upx;
		left: 0%;
		width: 100%;
		height: 180upx;
	}
	.registerClass{ //注册
		position: absolute;
		top:400upx;
		left: 5%;
		width: 90%;
		height: 100upx;
		line-height: 100upx;
		border-radius: 20upx;
		border: 1upx solid #666666;
		color: #333333;
		font-size: 36upx;
		text-align: center;
	}
	.fontClass{
		color: #FFFFFF;
		font-size: 36upx;
		position: absolute;
		left: 45%;
		top: 257upx;
	}
	.boxClass{
		width: 90.4%;
		height: 720upx;
		position: absolute;
		top:324upx;
		left: 4.8%;
		background-color: white;
		border-radius: 50upx;
	}
	.logoClass{		//logo的样式
		width: 34.4%;
		height: 250upx;
		top: 200upx;
		left: 33.87%;
		position: absolute;
	}
	.textClass{
		font-size: 28upx;
		color: #333333;
		width: 100%;
		text-align: center;
		top: 620upx;
		position: absolute;
	}
</style>
