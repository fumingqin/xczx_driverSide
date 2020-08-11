<template>
	<view class="content">
		<image style="width: 100%; height: 294rpx;" src="../../static/index/bgimage1.png"></image>
		<view class="titleClass">提交成功</view>
		<image src="../../static/grzx/back.png" class="returnClass" @click="returnClick"></image>
		<view class="boxClass">
			<image src="../../static/grzx/success.png" class="imgClass"></image>
			<text class="textClass">恭喜您，提交成功！</text>
			<view class="btnClass" @click="returnhomeClicK">返回首页</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad(){
			
		},
		methods:{
			//--------返回个人中心---------
			returnClick(){	
				console.log(111)
				uni.switchTab({
					url:'/pages/grzx/user'
				});
			},
			returnhomeClicK(){
				uni.switchTab({
					url:'/pages/index/index'
				});
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F4F8FB;
	}
	.content{
		background-color: #F4F8FB;
		width: 100%;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 110upx;
		left: 4.13%;
		position: absolute;
	}
	/*#ifdef MP-WEIXIN*/
	.titleClass{
		text-align: center;
		width: 100%;
		color: #ffffff;
		font-weight: bold;
		font-size: 38upx;
		position: absolute;
		top:100upx;
	}
	/*#endif*/
	/*#ifdef APP-PLUS*/
	.titleClass{
		text-align: center;
		width: 100%;
		color: #ffffff;
		font-weight: bold;
		font-size: 38upx;
		position: absolute;
		top:94upx;
	}
	/*#endif*/
	.boxClass{
		border-radius:20upx;
		background-color: #FFFFFF;
		position: absolute;
		top: 210upx;
		left: 3%;
		width: 94%;
		height: 1086upx;
	}
	.imgClass{
		width: 37%; 
		height: 146rpx;
		position: absolute;
		top: 100upx;
		left: 30%;
	}
	.textClass{
		width: 100%;
		text-align: center;
		position: absolute;
		font-size: 36upx;
		color: #333333;
		top: 340upx;
	}
	.btnClass{
		text-align: center;
		width: 80%;
		height: 100upx;
		line-height: 100upx;
		position: absolute;
		top: 520upx;
		left: 10%;
		border: 1upx solid #666666;
		border-radius: 12upx;
		font-size: 32upx;
	}
</style>
