<template>
	<view>
		<view>
			<view class="head">
				<view class="status_bar"></view>
				<view class="headbar">
					<uni-icons @click="goBack" type="arrowleft" size="24" color="#FFF"></uni-icons>
					<view class="title">购票</view>
					<view></view>
				</view>
			</view>
			<view style="padding: 0 30rpx;margin-top: -90rpx;">
				<view class="line">
					<view class="linedetail">
						<view>
							线路：{{ScheduleAndTickets.LineName}}
						</view>
					</view>
					<view class="linedetail">
						<view>
							发车时间：{{formatDate(ScheduleAndTickets.SetoutTime)}}
						</view>
					</view>
					<view class="linedetail">
						<view>
							司机姓名：{{userInfo.userName}}
						</view>
					</view>
					<view class="linedetail">
						<view>
							车牌号：{{ScheduleAndTickets.CoachCardNumber}}
						</view>
					</view>
					
				</view>
				<view class="uberstation" style="margin-top: 20rpx;">
					<view style="display: flex;align-items: center;">
						<view class="bluering"></view>
						<view style="padding-left: 10rpx;">上车点：</view>
						<view>{{startSite}}</view>
					</view>
					<view style="display: flex;align-items: center;">
						<view class="redring"></view>
						<view style="padding-left: 10rpx;">下车点：</view>
						<view>{{endSite}}</view>
					</view>
				</view>
				<view class="ticket">
					<view>数量</view>
					<view style="display: flex;align-items: center;">
						<view style="border:solid 1px #999999;width: 36rpx;height: 36rpx;border-radius: 100px;color: #999999;line-height: 30rpx;text-align: center;"
						 @click="changeNum(false)">
							—
						</view>
						<view>
							<input style="width: 60rpx;text-align: center;" v-model="num" type="number" @change="checknum" />
						</view>
						<view style="border:solid 1px #999999;width: 36rpx;height: 36rpx;border-radius: 100px;color: #999999;line-height: 30rpx;text-align: center;"
						 @click="changeNum(true)">
							+
						</view>
					</view>
				</view>
				<view class="ticket">
					<view>总金额</view>
					<view style="color:#FC4646">￥{{price}}</view>
				</view>
				<view style="margin-top: 122rpx;display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
					<view>
						<button @click="payment" class="cashbtn">
							<image src="../../static/CTKYDriver/cash.png" style="width: 42rpx;height: 42rpx;padding-right: 20rpx;"></image>
							<text style="color: #FFF;font-size: 36rpx;">现金支付</text>
						</button>
					</view>
					<view style="display: flex;margin-top: 42rpx;">
						<view style="margin-right: 32rpx;">
							<button @click="payment" class="weixinpaybtn">
								<image src="../../static/CTKYDriver/weixin.png" style="width: 42rpx;height: 42rpx;padding-right: 20rpx;"></image>
								<text  style="color: #FFF;font-size: 36rpx;">微信支付</text>
							</button>
						</view>
						<view>
							<button @click="payment" class="alipaybtn">
								<image src="../../static/CTKYDriver/alipay.png" style="width: 42rpx;height: 42rpx;padding-right: 20rpx;"></image>
								<text style="color: #FFF;font-size: 36rpx;">支付宝支付</text>
							</button>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {
			uniIcons,
		},
		data() {
			return {
				num: 1,
				
				startSite:'',
				endSite:'',
				price:0,
				
				userInfo:'',
				vehicleInfo:'',
				ScheduleAndTickets:'',
			}
		},
		onLoad(option) {
			let that = this;
			that.startSite = option.startSite;
			that.endSite = option.endSite;
		},
		onShow() {
			let that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			that.vehicleInfo = uni.getStorageSync("vehicleInfo")||'';
			that.ScheduleAndTickets = uni.getStorageSync('scheduleInfo') || '';
			
		},
		methods: {
			goBack: function() { //返回上一页
				uni.navigateBack();
			},
			checknum: function() {
				if (this.num < 1 || this.num == '') {
					uni.showToast({
						title: "票数不能小于1",
						icon: "none"
					})
					this.num = 1;
				}
				if (this.num > 60) {
					uni.showToast({
						title: "票数不能大于60",
						icon: "none"
					})
					this.num = 1;
				}

			},
			changeNum: function(type) {
				var that = this;
				if (type) {
					if (this.num == 60) {
						uni.showToast({
							title: "票数不能大于60",
							icon: "none"
						})
					} else {
						this.num++;
					}
				} else {
					if (this.num == 1) {
						uni.showToast({
							title: "票数不能小于1",
							icon: "none"
						})
					} else {
						this.num--;
					}
				}
			},
			
			payment:function(){
				uni.showToast({
					title:'暂未开通',
					icon:'none'
				});
			},
			
			formatDate:function(time){
				return time.substring(5,10) + ' ' + time.substring(11,16);
			}
		}
	}
</script>

<style>
	page {
		background-color: #F6F8FA;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box;
	}

	.head {
		width: 750rpx;
		height: 257rpx;
		background: linear-gradient(0deg, rgba(254, 68, 109, 1) 0%, rgba(254, 148, 95, 1) 100%);
		/* position: fixed;
		top: 0; */
	}

	.headbar {
		padding: 10rpx 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		font-size: 38rpx;
		font-weight: bold;
		color: #FFF;
	}

	.line {
		background-color: #FFF;
		border-radius: 20rpx;
		padding: 0 38rpx 20rpx 38rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: rgba(51, 51, 51, 1);
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
	}

	.linedetail {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}

	.linedetail view {
		/*width: 345rpx;*/
	}

	.uberstation {
		background-color: #FFF;
		border-radius: 20rpx;
		font-size: 32rpx;
		height: 100rpx;
		color: rgba(51, 51, 51, 1);
		padding: 33rpx 38rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
	}

	.bluering {
		width: 15rpx;
		height: 15rpx;
		border-width: 4rpx;
		border-color: #309FF7;
		border-style: solid;
		background-color: #fff;
		border-radius: 100px;
	}

	.redring {
		width: 15rpx;
		height: 15rpx;
		border-width: 4rpx;
		border-color: #E3424B;
		border-style: solid;
		background-color: #fff;
		border-radius: 100px;
	}

	.ticket {
		background-color: #FFF;
		border-radius: 20rpx;
		font-size: 32rpx;
		height: 106rpx;
		margin-top: 20rpx;
		color: rgba(51, 51, 51, 1);
		padding: 0 38rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
	}

	.cashbtn {
		width: 668rpx;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(249, 92, 117, 1), rgba(250, 116, 101, 1));
		box-shadow: 0px 7px 38px 8px rgba(216, 48, 75, 0.15);
		border-radius: 12rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.alipaybtn {
		width: 318rpx;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(6, 180, 253, 1), rgba(0, 166, 235, 1));
		box-shadow: 0px 7px 38px 8px rgba(78, 179, 57, 0.15);
		border-radius: 12rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.weixinpaybtn {
		width: 318rpx;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(40, 204, 40, 1), rgba(83, 176, 59, 1));
		box-shadow: 0px 7px 38px 8px rgba(78, 179, 57, 0.15);
		border-radius: 12rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
