<template>
	<view>
		<view style="display: flex">
			<!-- <view>
				<image @click="back" src="../../static/driver/back.png" style="width: 18rpx; height: 34rpx; margin:103rpx 26rpx; color: #2C2D2D;"></image>
			</view> -->
			<view style="width: 170rpx; height: 52rpx; margin: 92rpx 298rpx 50rpx 298rpx;color: #333333; font-size: 38rpx;font-weight:bold;">费用</view>
		</view>
		<view style="width: 750rpx;text-align: center;">请输入本次行程的实际费用</view>
		<!-- <view style="width: 94%;height: 105rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 10rpx;">
			<view style="padding: 30rpx;display: flex;flex-direction: row;">
				<text style="width:120rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:400;color:rgba(51,51,51,1);line-height:36rpx;">高速费</text>
				<input type="number" class="inputClass" placeholder="请输入费用" :value="highspeedFee" data-key="highspeedFee" @input="inputChange" />
				<text class="textClass">元</text>
			</view>
		</view> -->
		<!-- 	<view style="width: 94%;height: 105rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 40rpx;">
			<view style="padding: 30rpx;display: flex;flex-direction: row;">
				<text style="width:120rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:400;color:rgba(51,51,51,1);line-height:36rpx;">停车费</text>
				<input type="number" class="inputClass" placeholder="请输入费用" :value="pakingFee" data-key="pakingFee" @input="inputChange" />
				<text class="textClass">元</text>
			</view>
		</view> -->
		<view style="width: 94%; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 40rpx;">
			<view style="padding: 30rpx;display: flex;flex-direction: row;">
				<text style="width:120rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:400;color:rgba(51,51,51,1);line-height:36rpx;">费用</text>
				<input type="number" class="inputClass" placeholder="请输入费用" :value="FactPayPrice" data-key="FactPayPrice" @input="inputChange" />
				<text class="textClass">元</text>
			</view>
		</view>
		<view style="display: flex;justify-content: space-between;padding-top: 40rpx;margin: 0 30rpx;">
			<view @click="InputAmountExpressOrderNeedPay" style="width:300rpx;height: 100rpx;background:linear-gradient(270deg,rgba(250,116,101,1),rgba(249,92,117,1));border-radius: 10rpx;color: #FFF;text-align: center;line-height: 100rpx;">线上支付</view>
			<view @click="finish" style="width:300rpx;height: 100rpx;background:linear-gradient(270deg,rgba(250,116,101,1),rgba(249,92,117,1));border-radius: 10rpx;color: #FFF;text-align: center;line-height: 100rpx;">线下支付</view>
		</view>
		<!-- <image @click="finish" style="width: 750rpx; height: 195rpx; margin-top: 20rpx;" src="../../static/driver/finishButton.png"></image> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				highspeedFee: "0",//高速费
				pakingFee: "0",//停车费
				otherFee: "0",//其他费用
				FactPayPrice: "0",//总金额
				payType:"线下支付",//支付类型
				orderNumber:''
			}
		},
		onLoad(option) {
			let that = this;
			that.orderNumber = option.orderNumber;
		},
		methods: {
			inputChange(e) {
				var num = e.detail.value;
				if (num > 0) {

				} else {
					uni.showToast({
						title: '请输入正确的费用',
						icon: 'none',
					})
				}
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			InputAmountExpressOrderNeedPay:function(){//输入金额线上支付
				var that = this;
				uni.showLoading({
					mask:true
				});
				if (this.FactPayPrice > 0) {
					uni.request({
						url: that.$taxi.Interface.InputAmountExpressOrderNeedPay_Driver.value,
						method: that.$taxi.Interface.InputAmountExpressOrderNeedPay_Driver.method,
						data: {
							orderNumber: that.orderNumber,//订单编号
							FactPayPrice: this.FactPayPrice,
							payType: "线上支付",
						},
						success(res) {
							uni.hideLoading();
							if(res.data.status){
								uni.redirectTo({
									url: '/pages/driver/orderComplete',
								});
							}else{
								//console.log(res);
							}
						},
						fail: function(res) {
							uni.hideLoading();
							that.showToast('网络连接失败');
							//console.log(res);
						}
					});
				
				} else {
					uni.showToast({
						title: '费用不能小于0',
						icon: "none"
					})
				}
				},
			finish() {
				var that = this;
				uni.showLoading({
					mask:true
				});
				if (this.FactPayPrice > 0) {
					uni.request({
						url: that.$taxi.Interface.InputAmountExpressOrder_Driver.value,
						method: that.$taxi.Interface.InputAmountExpressOrder_Driver.method,
						data: {
							orderNumber: that.orderNumber,//订单编号
							FactPayPrice: this.FactPayPrice,
							payType: this.payType,
						},
						success(res) {
							uni.hideLoading();
							if(res.data.status){
								uni.redirectTo({
									url: '/pages/driver/orderComplete',
								});
							}else{
								//console.log(res);
							}
						},
						fail: function(res) {
							uni.hideLoading();
							that.showToast('网络连接失败');
							//console.log(res);
						}
					});

				} else {
					uni.showToast({
						title: '费用不能小于0',
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

	.inputClass {
		width: 170rpx;
		height: 40rpx;
		font-size: 32rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 36rpx;
		position: absolute;
		text-align: right;
		right: 105rpx;
	}

	.textClass {
		width: 30rpx;
		height: 40rpx;
		font-size: 32rpx;
		font-weight: 400;
		color: rgba(233, 85, 78, 1);
		position: absolute;
		right: 65rpx;
	}
</style>
