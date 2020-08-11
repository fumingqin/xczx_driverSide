<template>
	<view>
		<!-- 顶部滑动 -->
		<view class="screen">
			<view class="screenView">
				<view class="screenText" :class="{current:type===0}" @click="tabClick(0)">
					未申诉
				</view>
				<view class="screenText" :class="{current:type===1}" @click="tabClick(1)">
					申述中
				</view>
				<view class="screenText" :class="{current:type===2}" @click="tabClick(2)">
					申诉成功
				</view>
				<view class="screenText" :class="{current:type===3}" @click="tabClick(3)">
					申诉失败
				</view>
			</view>
		</view>

		<!-- 未申诉 -->
		<view v-if="type==0">
			<view class="pd_image" v-if="complaintListIndex1==0">
				<view>
					<image class="im_image" src="../../static/grzx/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view v-for="(item,index) in complaintList" :key="index" :hidden="item.or_DriverState=='申诉成功' || item.or_DriverState=='申诉失败' || item.or_DriverState=='申述中'">
				<view class="pd_view">{{item.or_date}}</view>
				<view class="cm_view">
					<view class="cm_titleView" v-if="item.or_class!==''">
						<image v-if="item.or_class=='包车'" class="cm_icon" src="../../static/grzx/baoche.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='旅游'" class="cm_icon" src="../../static/grzx/lvyou.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='客车'" class="cm_icon" src="../../static/grzx/keche.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='出驻车'" class="cm_icon" src="../../static/grzx/Car1.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='公交'" class="cm_icon" src="../../static/grzx/gongjiao.png" mode="aspectFill"></image>
						<text class="cm_title">{{item.or_class}}</text>
						<text class="cm_status">{{item.or_DriverState}}</text>
					</view>
					<view class="cm_titleView" v-if="item.or_complaintObject!==''">
						<image v-if="item.or_complaintObject=='包车'" class="cm_icon" src="../../static/grzx/baoche.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='旅游'" class="cm_icon" src="../../static/grzx/lvyou.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='客车'" class="cm_icon" src="../../static/grzx/keche.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='出驻车'" class="cm_icon" src="../../static/grzx/Car1.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='公交'" class="cm_icon" src="../../static/grzx/gongjiao.png" mode="aspectFill"></image>
						<text class="cm_title">{{item.or_complaintObject}}</text>
						<text class="cm_status">{{item.or_DriverState}}</text>
					</view>
					<view class="cm_contentView">
						<text class="cm_contentText">投诉时间：&nbsp;{{item.or_dateString}}</text>
						<text class="cm_contentText">投诉内容：&nbsp;{{item.or_content}}</text>
					</view>
					<view class="cm_buttonView">
						<view class="cm_button cm_btDetails" @click="jump(index)">详情</view>
					</view>
					<view class="cm_buttonView">
						<view class="cm_button cm_contact" @click="jump2(index)">申诉</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 审核中 -->
		<view v-if="type==1">
			<view class="pd_image" v-if="complaintListIndex2==0">
				<view>
					<image class="im_image" src="../../static/grzx/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view v-for="(item,index) in complaintList" :key="index" :hidden="item.or_DriverState=='申诉成功' || item.or_DriverState=='申诉失败' || item.or_DriverState=='未申诉'">
				<view class="pd_view">{{item.or_date}}</view>
				<view class="cm_view">
					<view class="cm_titleView" v-if="item.or_class!==''">
						<image v-if="item.or_class=='包车'" class="cm_icon" src="../../static/grzx/baoche.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='旅游'" class="cm_icon" src="../../static/grzx/lvyou.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='客车'" class="cm_icon" src="../../static/grzx/keche.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='出驻车'" class="cm_icon" src="../../static/grzx/Car1.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='公交'" class="cm_icon" src="../../static/grzx/gongjiao.png" mode="aspectFill"></image>
						<text class="cm_title">{{item.or_class}}</text>
						<text class="cm_status">{{item.or_DriverState}}</text>
					</view>
					<view class="cm_titleView" v-if="item.or_complaintObject!==''">
						<image v-if="item.or_complaintObject=='包车'" class="cm_icon" src="../../static/grzx/baoche.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='旅游'" class="cm_icon" src="../../static/grzx/lvyou.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='客车'" class="cm_icon" src="../../static/grzx/keche.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='出驻车'" class="cm_icon" src="../../static/grzx/Car1.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='公交'" class="cm_icon" src="../../static/grzx/gongjiao.png" mode="aspectFill"></image>
						<text class="cm_title">{{item.or_complaintObject}}</text>
						<text class="cm_status">{{item.or_DriverState}}</text>
					</view>
					<view class="cm_contentView">
						<text class="cm_contentText">投诉时间：&nbsp;{{item.or_dateString}}</text>
						<text class="cm_contentText">投诉内容：&nbsp;{{item.or_content}}</text>
						<text class="cm_contentText">申诉内容：&nbsp;{{item.or_DriverContent}}</text>
					</view>
					<view class="cm_buttonView">
						<view class="cm_button cm_btDetails" @click="jump(index)">详情</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 已通过 -->
		<view v-if="type==2">
			<view class="pd_image" v-if="complaintListIndex3==0">
				<view>
					<image class="im_image" src="../../static/grzx/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view v-for="(item,index) in complaintList" :key="index" :hidden="item.or_DriverState=='申述中' || item.or_DriverState=='申诉失败' || item.or_DriverState=='未申诉'">
				<view class="pd_view">{{item.or_date}}</view>
				<view class="cm_view">
					<view class="cm_titleView" v-if="item.or_class!==''">
						<image v-if="item.or_class=='包车'" class="cm_icon" src="../../static/grzx/baoche.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='旅游'" class="cm_icon" src="../../static/grzx/lvyou.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='客车'" class="cm_icon" src="../../static/grzx/keche.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='出驻车'" class="cm_icon" src="../../static/grzx/Car1.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='公交'" class="cm_icon" src="../../static/grzx/gongjiao.png" mode="aspectFill"></image>
						<text class="cm_title">{{item.or_class}}</text>
						<text class="cm_status">{{item.or_DriverState}}</text>
					</view>
					<view class="cm_titleView" v-if="item.or_complaintObject!==''">
						<image v-if="item.or_complaintObject=='包车'" class="cm_icon" src="../../static/grzx/baoche.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='旅游'" class="cm_icon" src="../../static/grzx/lvyou.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='客车'" class="cm_icon" src="../../static/grzx/keche.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='出驻车'" class="cm_icon" src="../../static/grzx/Car1.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='公交'" class="cm_icon" src="../../static/grzx/gongjiao.png" mode="aspectFill"></image>
						<text class="cm_title">{{item.or_complaintObject}}</text>
						<text class="cm_status">{{item.or_DriverState}}</text>
					</view>
					<view class="cm_contentView">
						<text class="cm_contentText">投诉时间：&nbsp;{{item.or_dateString}}</text>
						<text class="cm_contentText">投诉内容：&nbsp;{{item.or_content}}</text>
						<text class="cm_contentText">申诉内容：&nbsp;{{item.or_DriverContent}}</text>
					</view>
					<view class="cm_buttonView">
						<view class="cm_button cm_btDetails" @click="jump(index)">详情</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 未通过 -->
		<view v-if="type==3">
			<view class="pd_image" v-if="complaintListIndex4==0">
				<view>
					<image class="im_image" src="../../static/grzx/tslb.gif"></image>
				</view>
				<view>
					<text class="im_text">暂无数据</text>
				</view>
			</view>
			<view v-for="(item,index) in complaintList" :key="index" :hidden="item.or_DriverState=='申诉成功' || item.or_DriverState=='申述中' || item.or_DriverState=='未申诉'">
				<view class="pd_view">{{item.or_date}}</view>
				<view class="cm_view">
					<view class="cm_titleView" v-if="item.or_class!==''">
						<image v-if="item.or_class=='包车'" class="cm_icon" src="../../static/grzx/baoche.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='旅游'" class="cm_icon" src="../../static/grzx/lvyou.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='客车'" class="cm_icon" src="../../static/grzx/keche.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='出驻车'" class="cm_icon" src="../../static/grzx/Car1.png" mode="aspectFill"></image>
						<image v-if="item.or_class=='公交'" class="cm_icon" src="../../static/grzx/gongjiao.png" mode="aspectFill"></image>
						<text class="cm_title">{{item.or_class}}</text>
						<text class="cm_status">{{item.or_DriverState}}</text>
					</view>
					<view class="cm_titleView" v-if="item.or_complaintObject!==''">
						<image v-if="item.or_complaintObject=='包车'" class="cm_icon" src="../../static/grzx/baoche.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='旅游'" class="cm_icon" src="../../static/grzx/lvyou.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='客车'" class="cm_icon" src="../../static/grzx/keche.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='出驻车'" class="cm_icon" src="../../static/grzx/Car1.png" mode="aspectFill"></image>
						<image v-if="item.or_complaintObject=='公交'" class="cm_icon" src="../../static/grzx/gongjiao.png" mode="aspectFill"></image>
						<text class="cm_title">{{item.or_complaintObject}}</text>
						<text class="cm_status">{{item.or_DriverState}}</text>
					</view>
					<view class="cm_contentView">
						<text class="cm_contentText">投诉时间：&nbsp;{{item.or_dateString}}</text>
						<text class="cm_contentText">投诉内容：&nbsp;{{item.or_content}}</text>
						<text class="cm_contentText">申诉内容：&nbsp;{{item.or_DriverContent}}</text>
					</view>
					<view class="cm_buttonView">
						<view class="cm_button cm_btDetails" @click="jump(index)">详情</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 		<view class="cl_bottom"></view>
		<view class="tjButton" @click="jump">前往投诉</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				// or_entrance: 0,
				// complaintList:'',
				complaintList1: '', //审核中数组
				complaintList2: '', //已通过数组
				complaintList3: '', //已通过数组
				complaintList4: '', //已通过数组
				complaintListIndex1: '',
				complaintListIndex2: '',
				complaintListIndex3: '',
				complaintListIndex4: '',
				userInfo: [],
				userId: '', //投诉人id
				or_complainant: '', //投诉人
				or_telephone: '', //投诉人电话
				or_complaintObject: '',
				driverId: '',
				or_DriverState: '',
				complaintList: [],
			}
		},

		onShow: function() {
			var userInfo = uni.getStorageSync('userInfo') || '';
			this.grzxData(userInfo.phoneNumber);
			// console.log(userInfo.driverId)
		},

		methods: {
			//-----------------读取静态数据json.js-------------------------------
			grzxData: function(e) {
				uni.request({
					url: this.$GrzxInter.Interface.complaintText.value,
					method: this.$GrzxInter.Interface.complaintText.method,
					header: {
						'content-type': 'application/json'
					},
					data: {
						or_phoneNumber: e,
					},
					success: (res) => {
						this.complaintList = res.data.data;
						console.log(this.complaintList)
						this.screenUser();
					}
				})
			},
			//------------------------数组提取----------------------------------
			screenUser: function() {
				let complaintList1 = this.complaintList.filter(item => {
					return item.or_DriverState == '未申诉';
				})
				let complaintList2 = this.complaintList.filter(item => {
					return item.or_DriverState == '申述中';
				})
				let complaintList3 = this.complaintList.filter(item => {
					return item.or_DriverState == '申诉成功';
				})
				let complaintList4 = this.complaintList.filter(item => {
					return item.or_DriverState == '申诉失败';
				})
				this.complaintListIndex1 = complaintList1.length;
				this.complaintListIndex2 = complaintList2.length;
				this.complaintListIndex3 = complaintList3.length;
				this.complaintListIndex4 = complaintList4.length;
				// console.log(this.complaintListIndex1)
			},

			//-----------------tab事件---------------------------------------
			tabClick(e) {
				if (e == 0) {
					this.type = 0;
				} else if (e == 1) {
					this.type = 1;
				} else if (e == 2) {
					this.type = 2;
				} else if (e == 3) {
					this.type = 3;
				}

			},

			//--------------------跳转页面-------------------------------------------
			jump(e) {
				uni.navigateTo({
					url: './gz_complaintText?or_number=' +JSON.stringify(this.complaintList[e].or_number)
				})
			},

			jump2: function(e) {
				uni.navigateTo({
					url: './gz_complaintContent?or_number=' +JSON.stringify(this.complaintList[e].or_number) + '&or_content=' +
						this.complaintList[e].or_content + '&or_dateString=' + this.complaintList[e].or_dateString
				})
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #f6f6f6;
	}

	//筛选样式
	.screen {

		.screenView {
			left: 0;
			display: flex;
			width: 87%;
			height: 87upx;
			z-index: 10;
			position: sticky;
			top: 0;
			// background-color: #F5F5F5;
			margin-top: 20upx;

			.screenText {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				font-size: 30upx;
				color: #888;
				position: relative;



				&.current {
					color: #06b4fd;
					// background-color: #FFFFFF;

					&:after {
						content: '';
						position: absolute;
						left: 50%;
						bottom: 0;
						transform: translateX(-50%);
						width: 77upx;
						height: 0;
						border-bottom: 4upx solid #06b4fd;
					}
				}
			}
		}
	}

	.cl_outermostLayer {
		margin: 32upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		padding-bottom: 108upx;

		.ol_text {
			display: flex;
			padding-top: 20upx;
			padding-left: 30upx;

			.te_text1 {
				font-size: 32upx;
				font-weight: bold;
				text-align: left;
			}

			.te_text2 {
				font-size: 32upx;
				text-align: left;
			}
		}

		.ol_title {
			display: flex;
			padding-top: 20upx;
			padding-left: 30upx;
			font-size: 30upx;
			text-align: left;
		}

		.ol_content {
			display: flex;
			padding-top: 20upx;
			padding-left: 30upx;
			font-size: 30upx;
			text-align: left;
		}

		.ol_button {
			float: right;
			padding: 20upx 30upx;

			.bt_text {
				padding: 10upx 20upx;
				color: #ff0000;
				font-size: 20upx;
				border-radius: 30upx;
				border: 1px solid #ff0000;
			}
		}

		.ol_button2 {
			float: right;
			padding: 20upx 30upx;

			.bt_text2 {
				padding: 10upx 20upx;
				color: #aaa;
				font-size: 20upx;
				border-radius: 30upx;
				border: 1px solid #aaa;
			}
		}
	}

	// 暂无数据
	.pd_image {
		text-align: center;
		line-height: 50%;
		padding-top: 250upx;

		.im_image {
			width: 273upx;
			height: 296upx;
		}

		.im_text {
			font-size: 30upx;
			color: #999999;
			line-height: 106upx;
		}
	}

	// 购买时间
	.pd_view {
		width: 400upx;
		margin: 40rpx 28rpx;
		margin-bottom: 0upx;
		border-radius: 32rpx;
		background: #06B4FD;
		text-align: center;
		padding: 16upx 0;
		font-size: 25upx;
		color: #FFFFFF;
	}

	//包车定制内容
	.cm_view {
		margin: 0rpx 28rpx;
		margin: 24upx;
		background: #FFFFFF;
		border-radius: 12rpx;
		padding: 40rpx 32upx;
		padding-bottom: 132upx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);

		.cm_titleView {
			position: relative;

			.cm_icon {
				position: relative;
				top: 4upx;
				width: 34upx;
				height: 38upx;
			}

			.cm_title {
				margin-left: 24upx;
			}

			.cm_status {
				position: absolute;
				right: 0;
				font-size: 30upx;
				top: 6upx;
			}
		}

		//内容区
		.cm_contentView {
			position: relative;
			margin: 24upx 0;
			margin-left: 60upx;

			.cm_contentFrame {
				padding: 8upx 20upx;
				margin-right: 16upx;
				text-align: center;
				font-size: 20upx;
				color: #3AC596;
				border-radius: 8upx;
				border: 1upx solid #3AC596;
			}

			.cm_contentPrice {
				position: absolute;
				right: 0;
				font-size: 30upx;
				color: #f85e52;
				position: absolute;
				top: 25upx;
			}

			.cm_contentText {
				display: block;
				margin-top: 24upx;
				font-size: 28upx;
				color: #888;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}

		//按钮区
		.cm_buttonView {
			margin-top: 16upx;
			display: flex;
			float: right;

			.cm_omit {
				display: flex;
				position: relative;
				top: 10upx;
				width: 50upx;
				height: 50upx;
				margin-right: 16upx;
			}

			// 按钮
			.cm_button {
				padding: 18upx 48upx;
				padding-top: 22upx;
				font-size: 22upx;
				border-radius: 80upx;
			}

			// 详情 - 空心灰
			.cm_btDetails {
				border: 1upx solid #888;
				color: #888;
				margin-right: 16upx;
			}

			// 联系司机 - 实心橙
			.cm_contact {
				background: #FF6600;
				border: 1upx solid #FF6600;
				color: #FFFFFF;
				margin-right: 16upx;
			}


			//取消- 空心灰
			.cm_btDelete {
				border: 1upx solid #888;
				color: #888;
				margin-right: 16upx;
			}

			//去支付 - 实心橙
			.cm_btToPay {
				background: #FF6600;
				border: 1upx solid #FF6600;
				color: #FFFFFF;
				margin-right: 16upx;
			}
		}
	}

	//底部多余
	.cl_bottom {
		width: 100%;
		height: 150upx;
	}

	//底部按钮
	.tjButton {
		position: fixed;
		bottom: 32upx;
		left: 0;
		right: 0;
		padding: 24upx 0;
		border-radius: 64upx;
		margin: 0 40upx;
		background: #1EA2FF;
		text-align: center;
		color: #FFFFFF;
		font-size: 38upx;
		font-weight: 400;
		box-shadow: 0px 0.2px 0px #aaa;
	}
</style>
