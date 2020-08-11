<template>
	<view>
		<!-- 顶部背景图片 -->
		<image style="width: 100%; height: 294rpx;" src="../../static/index/bgimage1.png"></image>
		<!-- 中间搜索部分 -->
		<!-- <view style="position: fixed;top: 80rpx;left: 10rpx;right: 0px;align-items: center; display: flex;flex-direction: row;">
			<view>
				<image @click="qrcode" style="width: 47rpx;height: 45rpx; margin-left: 20rpx;" src="../../static/index/QRcode.png"></image>
			</view>
			<view class="SearchBar">
				<view>
					<image style="width: 33rpx;height: 30rpx;" src="../../static/index/search.png"></image>
				</view>
				<text style="width: 500rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300; color:rgba(153,153,153,1); margin-left: 10rpx;">{{Address}}</text>
			</view>
			<view>
				<image style="width: 55rpx;height: 47rpx; margin-left: 20rpx;" src="../../static/index/message.png"></image>
			</view>
		</view> -->
		<!-- 广告 -->
		<image style="width: 94%; height: 340rpx;margin-left: 22rpx; margin-top: -200rpx;" src="../../static/index/advertisement.png"></image>
		<!-- 五个模块 -->
		<view class="bottomContent" style="width: 100%;">
			<view style="display: flex;flex-direction: row;width: 700rpx;text-align: center;margin-top:50rpx;margin-left: 24rpx;">
				<!-- <view class="tabItem" @click="setPlateNumber('../driver/bindCoachCode','客车')">
					<image class="tabItem-image" src="../../static/index/KC.png"></image>
					<text class="tabItem-font">客车</text>
				</view> -->
				<view class="tabItem" @click="setPlateNumber('../driver/bindCoachCode','出租车')">
					<image class="tabItem-image" src="../../static/index/WLYC.png"></image>
					<text class="tabItem-font">出租车</text>
				</view>
				<!-- <view class="tabItem" @click="setPlateNumber('../driver/bindCoachCode','包车')">
					<image class="tabItem-image" src="../../static/index/BCFW.png"></image>
					<text class="tabItem-font">包车</text>
				</view> -->
				<!-- <view class="tabItem" @click="setPlateNumber('','公交车')">
					<image class="tabItem-image" src="../../static/index/GJCX.png"></image>
					<text class="tabItem-font">公交车</text>
				</view>
				<view class="tabItem" @click="setPlateNumber('','旅游')">
					<image class="tabItem-image" src="../../static/index/LVFW.png"></image>
					<text class="tabItem-font">旅游</text>
				</view> -->
			</view>
		</view>
		<!-- 工作提示框 -->
		<view style="width: 94%;height: 335rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 200rpx;">
			<view style="padding: 40rpx;display: flex;flex-direction: row;">
				<view>
					<image style="width: 38rpx;height: 38rpx;" src="../../static/index/workTips.png"></image>
				</view>
				<text style="width:145rpx;height:34rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx; margin-left: 10rpx;">工作提示</text>
			</view>
			<view style="margin: -12rpx 42rpx;display: flex;flex-direction: row;">
				<text style="width:160rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(44,45,45,1);line-height:42rpx;">{{Work}}</text>
				<text style="width:160rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(44,45,45,1);line-height:42rpx;">{{vehicleType}}</text>
			</view>
			<view style="display: flex; margin-left: 4rpx;">
				<button class="upWork" :disabled="IsWork" :class="!IsWork?'BtnStyle':''" @click="changeWorkState(true)">上班</button>
				<button class="downWork" :disabled="!IsWork" :class="IsWork?'BtnStyle':''" @click="changeWorkState(false)">下班</button>
			</view>
		</view>

		<!-- 客车提醒 -->
		<scroll-view :scroll-y="true" style="height: 326rpx; margin-top: 20rpx;" v-if="vehicleType=='客车'">
			<!-- 消息提示 -->
			<view style="width: 94%; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx;">
				<!-- <view style="padding: 40rpx;display: flex;flex-direction: row;">
					<view>
						<image style="width: 38rpx;height: 38rpx;" src="../../static/index/messageTips.png"></image>
					</view>
					<text style="height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx; margin-left: 10rpx;">消息提示</text>
				</view>
				<view style="margin: -12rpx 42rpx;display: flex;flex-direction: row;">
					<text style="height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(44,45,45,1);line-height:42rpx;">{{Message}}</text>
				</view> -->
			</view>
			<!-- 发车提示 -->
			<view style="width: 94%;background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 20rpx; margin-bottom: 20rpx;">
				<!-- <view style="padding: 40rpx;display: flex;flex-direction: row;">
					<view>
						<image style="width: 38rpx;height: 38rpx;" src="../../static/index/messageTips.png"></image>
					</view>
					<text style="height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx; margin-left: 10rpx;">客运-发车提醒</text>
				</view>
				<view style="margin: -12rpx 42rpx;display: flex;flex-direction: row;">
					<text style="height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(44,45,45,1);line-height:42rpx;">{{kyMessage}}</text>
				</view> -->
			</view>
		</scroll-view>
		<!-- 出租车提醒 -->
		<view v-if="vehicleType=='出租车'" style="width: 94%;background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx;margin-top: 20rpx;">
			<!-- <view style="padding: 40rpx;display: flex;flex-direction: row;">
				<view>
					<image style="width: 38rpx;height: 38rpx;" src="../../static/index/messageTips.png"></image>
				</view>
				<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx; margin-left: 10rpx;">出租车-订单提醒</text>
			</view>
			<view style="margin: -12rpx 42rpx;display: flex;flex-direction: row;padding-bottom: 40rpx;">
				<text style="font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(44,45,45,1);line-height:42rpx;">{{czcMessage}}</text>
			</view> -->
		</view>
		<!-- 包车提醒 -->
		<view v-if="vehicleType=='包车'" style="width: 94%;background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx;margin-top: 20rpx;">
			<!-- <view style="padding: 40rpx;display: flex;flex-direction: row;">
				<view>
					<image style="width: 38rpx;height: 38rpx;" src="../../static/index/messageTips.png"></image>
				</view>
				<text style="height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx; margin-left: 10rpx;">包车-发车提醒</text>
			</view>
			<view style="margin: -12rpx 42rpx;display: flex;flex-direction: row;">
				<text style="height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:300;color:rgba(44,45,45,1);line-height:42rpx;">{{bcMessage}}</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Address: '搜索您要去的地方',
				Work: '所属工作:',
				vehicleType: '',
				Message: '丰泽区云鹿路口有一名乘客等待上车...',
				kyMessage: '您有一个班次，即将发车，请做好发车准备',
				czcMessage: '您有一个订单，即将到达预订时间，请及时到达出发地',
				bcMessage: '您有一个包车行程，即将到达预订时间...',
				IsWork: false,
				userInfo: ''
			}
		},
		onLoad() {
			let that = this;
			//添加司机缓存,可删
			/* uni.setStorageSync('userInfo',{
				driverId:2000003,
				userName:'测试用户',
				phoneNumber:'15297556076'
			}); */
		},
		onShow() {
			var that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			uni.getStorage({
				key: 'vehicleInfo',
				success:function(res) {
					that.vehicleType = res.data.vehicleType;
					if (res.data != '') {
						getApp().globalData.vehicleNumber = res.data.vehicleNumber;
						getApp().globalData.constantly();
						that.IsWork = true;
					}else{
						that.IsWork = false;
					}
				},
				fail:function(res){
					that.IsWork = false;
					that.vehicleType = '';
					getApp().globalData.vehicleNumber = '';
					getApp().globalData.closeUpload();
				}
			});
		},
		methods: {
			qrcode() {
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						uni.showToast({
							title:'无法识别',
							icon:'none'
						});
					}
				})
			},

			changeWorkState: function(iswork) {
				var that = this;
				if (!iswork) {
					//下班才变色
					uni.showModal({
						content: '您是否确认下班',
						success: function(res) {
							if (res.confirm) {
								uni.showLoading({
									mask: true
								});
								uni.request({
									url: that.$home.Interface.GooffWork_Driver.value,
									method: that.$home.Interface.GooffWork_Driver.method,
									data: {
										driverId: that.userInfo.driverId
									},
									success: function(res) {
										uni.hideLoading();
										if (res.data.status) {
											that.IsWork = iswork;
											//点击下班变色移除缓存
											uni.removeStorage({
												key: 'vehicleInfo',
												success: function(res) {
													that.vehicleType = '';
													getApp().globalData.vehicleNumber = '';
													getApp().globalData.closeUpload();
												}
											});
										} else {
											uni.showToast({
												title: res.data.msg,
												icon: 'none'
											})
										}
									},
									fail: function(res) {
										//console.log(res);
										uni.hideLoading();
										uni.showToast({
											title: '网络连接失败',
											icon: 'none'
										})
									}
								})


							} else if (res.cancel) {

							}
						}
					});
				}
				if (iswork) {
					if(that.userInfo == ''){
						uni.showToast({
							title:'请先登录',
							icon:'none'
						});
						return;
					}
					uni.navigateTo({
						url: '/pages/driver/bindCoachCode1',
					});
				}
			},

			setPlateNumber: function(url, vehicleType) {
				var that = this;
				if (url == '') {
					uni.showToast({
						title: '暂未开放',
						icon: "none"
					});
					return;
				}
				if(that.userInfo == ''){
					uni.showToast({
						title:'请先登录',
						icon:'none'
					});
					return;
				}
				if (that.vehicleType == '') {
					uni.navigateTo({
						url: url + '?vehicleType=' + vehicleType,
					});
				} else if (that.vehicleType == vehicleType) {
					if (that.vehicleType == "出租车") {
						uni.navigateTo({
							url: '/pages/driver/taxiDriver',
						})
					}
					if (that.vehicleType == "包车") {
						uni.navigateTo({
							url: '/pages/BCDriver/bcDriver',
						})
					}
					if (that.vehicleType == "客车") {
						uni.navigateTo({
							url: '/pages/CTKYDriver/selectOrder',
						})
					}
				} else {
					uni.showToast({
						title: '您已在' + that.vehicleType + '绑定车牌',
						icon: "none"
					})

				}
			},

		}

	}
</script>

<style>
	page {
		background-color: #F5F9FC;
	}

	.BtnStyle {
		border: 0;
		background-image: linear-gradient(270deg, rgba(250, 116, 101, 1), rgba(249, 92, 117, 1));
		box-shadow: 0px 7px 38px 8px rgba(216, 48, 75, 0.15);
	}

	.SearchBar {
		background-color: #FFFFFF;
		width: 510rpx;
		height: 36rpx;
		display: flex;
		flex-direction: row;
		border-radius: 35rpx;
		padding: 20rpx;
		margin-left: 20rpx;
		align-items: center;
		justify-content: space-between;
	}

	.downWork {
		width: 308rpx;
		height: 100rpx;
		border-radius: 11rpx;
		margin-top: 50rpx;
		font-size: 38rpx;
		text-align: center;
		background-color: #CBCBCB;
		color: #FFFFFF;
		align-items: center;
		margin-left: -16rpx;
	}

	.upWork {
		width: 308rpx;
		height: 100rpx;
		order-radius: 11rpx;
		margin-top: 50rpx;
		font-size: 38rpx;
		text-align: center;
		background-color: #CBCBCB;
		color: #FFFFFF;
		align-items: center;
	}

	.bottomContent {
		position: fixed;
		left: 0;
		right: 0;
		top: 450rpx;
		align-items: center;
	}

	.tabItem {
		width: 150rpx;
		text-align: center;
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	.tabItem-image {
		width: 60rpx;
		height: 60rpx;
	}

	.tabItem-font {
		margin-top: 10rpx;
		font-size: 24rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #333333;
	}
</style>
