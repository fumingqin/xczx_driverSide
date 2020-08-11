<template>
	<view>
		<!-- <view>
				<image @click="back" src="../../static/driver/back.png" style="width: 18rpx; height: 34rpx; margin:103rpx 26rpx; color: #2C2D2D;"></image>
			</view> -->
		<view style="width: 240rpx; height: 52rpx; margin: 100rpx 260rpx;color: #333333; font-size: 38rpx;font-weight:bold;">包车其他费用</view>

		<view style="width: 94%;height: 105rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 10rpx;">
			<view style="padding: 30rpx;display: flex;flex-direction: row;">
				<text style="width:120rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:400;color:rgba(51,51,51,1);line-height:36rpx;">高速费</text>
				<input type="number" class="inputClass" placeholder="请输入费用" :value="highspeedFee" data-key="highspeedFee" @input="inputChange" />
				<text class="textClass">元</text>
			</view>
		</view>
		<view style="width: 94%;height: 105rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 40rpx;">
			<view style="padding: 30rpx;display: flex;flex-direction: row;">
				<text style="width:120rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:400;color:rgba(51,51,51,1);line-height:36rpx;">停车费</text>
				<input type="number" class="inputClass" placeholder="请输入费用" :value="pakingFee" data-key="pakingFee" @input="inputChange" />
				<text class="textClass">元</text>
			</view>
		</view>
		<view style="width: 94%;height: 105rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 40rpx;">
			<view style="padding: 30rpx;display: flex;flex-direction: row;">
				<text style="width:120rpx;height:40rpx;font-size:32rpx;font-family:Source Han Sans SC;font-weight:400;color:rgba(51,51,51,1);line-height:36rpx;">其他</text>
				<input type="number" class="inputClass" placeholder="请输入费用" :value="otherFee" data-key="otherFee" @input="inputChange" />
				<text class="textClass">元</text>
			</view>
		</view>
		<image @click="finish" style="width: 750rpx; height: 195rpx; margin-top: 20rpx;" src="../../static/driver/finishButton.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				highspeedFee: "0",
				pakingFee: "0",
				otherFee: "0",
			}
		},
		methods: {
			judgeNum(val) { //只能输入数字
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				if (regPos.test(val)) {
					return true;
				} else {
					return false;
				}
			},
			inputChange(e) {
				var num = e.detail.value;
				if (this.judgeNum(num)) {

				} else {
					uni.showToast({
						title: '请输入正确的费用',
						icon: 'none',
					})
				}
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			finish() {
				var that = this;
				const {
					highspeedFee,
					pakingFee,
					otherFee
				} = this;
				var highspeed = this.highspeedFee;
				var paking = this.pakingFee;
				var other = this.otherFee;
				//if ((highspeed == null || highspeed == "") || (paking == null || paking == "") || (other == null || other == "")) {
				if (that.judgeNum(highspeed) && that.judgeNum(paking) && that.judgeNum(other)) {
					uni.redirectTo({
						url: '/pages/BCDriver/orderComplete',
					})
				} else {
					uni.showToast({
						title: '请输入正确的费用',
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
