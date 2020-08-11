<template>
	<view>
		<view>
			<view class="head">
				<view class="status_bar"></view>
				<view class="headbar">
					<uni-icons type="scan" size="24" color="#FFF" @click="qrcode"></uni-icons>
					<view class="title">检票</view>
					<view></view>
				</view>
			</view>
			<view style="padding: 0 30rpx;margin-top: -60rpx;">
				<view class="btnarea">
					<view style="width: 349rpx;"><button :class="IsCheck?'':'btnclick'" @click="change(false)">未检票数</button></view>
					<view style="width: 349rpx;"><button :class="!IsCheck?'':'btnclick'" @click="change(true)">已检票数</button></view>
				</view>
				<!--未检-->
				<scroll-view :style="{height:scrollheight}" :scroll-y="true" style="border-radius:20rpx ;" v-if="!IsCheck">
					<view v-for="(item,index) in ScheduleAndTickets.Tickets" :key="index" v-show="!item.Checked"  style="background-color: #FFFFFF;border-radius: 20rpx;margin-top: 20rpx;" >
						<view style="padding: 35rpx 35rpx 0 35rpx;">
							<view style="display: flex;justify-content: space-between;font-size: 32rpx;padding-bottom: 30rpx;border-bottom: solid 1px #EAEAEA;">
								<view>
									上车点：{{item.StartSiteName}}
								</view>
								<view>
									下车点：{{item.EndSiteName}}
								</view>
							</view>
							<view style="padding: 20rpx 0;font-size: 32rpx;font-weight: 200;display: flex;flex-direction: column;justify-content: space-between;height: 290rpx;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;flex-direction: column;justify-content: space-between;height: 110rpx;">
										<view>
											车次信息：{{ScheduleAndTickets.LineName}}
										</view>
										<view>
											车票号：{{formatTicketId(item.TicketID)}}
										</view>
									</view>
									<view>
										<image src="../../static/CTKYDriver/Nocheck.png" style="width: 104rpx;height: 104rpx;"></image>
									</view>
								</view>
								<view>
									旅客姓名：{{item.PassengerName}}
								</view>
								<view>
									旅客身份证：{{formatIDCard(item.PassengerID)}}
								</view>
								<view>
									座位号：{{item.SeatNumber}}
								</view>
							</view>
						</view>
					   <!--<view style="display: flex;color: #666666;justify-content:flex-end;padding: 10rpx 35rpx 35rpx 0;">
							<view style="padding-right: 30rpx;"><button style="width: 200rpx;background-color: #FFF;font-size: 30rpx;" >过站未检</button></view>
							<view><button @click="callPassenger(item)" style="width: 200rpx;background-color: #FFF;font-size: 30rpx;">联系电话</button></view>
						</view> -->
					</view>
				</scroll-view>
				<!--已检-->
				<scroll-view :style="{height:scrollheight}" :scroll-y="true" style="border-radius:20rpx ;" v-if="IsCheck">
					<view  v-for="(item,index) in ScheduleAndTickets.Tickets" :key="index" v-show="item.Checked"  style="background-color: #FFFFFF;margin-top: 20rpx;border-radius: 20rpx;">
						<view style="padding: 35rpx 35rpx 0 35rpx;">
							<view style="display: flex;justify-content: space-between;font-size: 32rpx;padding-bottom: 30rpx;border-bottom: solid 1px #EAEAEA;">
								<view>
									上车点：{{item.StartSiteName}}
								</view>
								<view>
									下车点：{{item.EndSiteName}}
								</view>
							</view>
							<view style="padding: 20rpx 0;font-size: 32rpx;font-weight: 200;display: flex;flex-direction: column;justify-content: space-between;height: 290rpx;">
								<view style="display: flex;justify-content: space-between;">
									<view style="display: flex;flex-direction: column;justify-content: space-between;height: 110rpx;">
										<view>
											车次信息：{{ScheduleAndTickets.LineName}}
										</view>
										<view>
											车票号：{{formatTicketId(item.TicketID)}}
										</view>
									</view>
									<view>
										<image src="../../static/CTKYDriver/Checked.png" style="width: 104rpx;height: 104rpx;"></image>
									</view>
								</view>
								<view>
									旅客姓名：{{item.PassengerName}}
								</view>
								<view>
									旅客身份证：{{formatIDCard(item.PassengerID)}}
								</view>
								<view>
									座位号：{{item.SeatNumber}}
								</view>
							</view>
						</view>
						<!-- <view style="display: flex;font-size: 30rpx;color: #666666;justify-content:flex-end;padding: 10rpx 35rpx 35rpx 0;">
							<view style="padding-right: 30rpx;"><button style="width: 200rpx;background-color: #FFF;font-size: 30rpx;" >过站未检</button></view>
							<view><button style="width: 200rpx;background-color: #FFF;font-size: 30rpx;">联系电话</button></view>
						</view> -->
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="tabbarBlock">
			<view style="display: flex;flex-direction: row;">
				<view class="tabbarItem" v-for="(item,index) in tabbarArr" :key='index' @click="tabbarClick(item)">
					<view style="display: flex;flex-direction: column;align-items: center;justify-content: center;">
						<image :src="item.imageSrc" :style="item.imageStyle"></image>
					</view>
					<text :style="item.color" style="font-size: 25rpx;">{{item.title}}</text>
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
				tabbarArr: [{
						title: '首页',
						color: 'color: #2C2D2D',
						imageSrc: '../../static/tabbar/index-black.png',
						imageStyle: 'width: 51rpx;height: 45rpx;',
						canClick: true,
						url:'./index'
					},
					/* {
						title: '购票',
						color: 'color: #2C2D2D',
						imageSrc: '../../static/tabbar/buy-black.png',
						imageStyle: 'width: 49rpx;height: 36rpx;',
						canClick: true
					}, */
					{
						title: '检票',
						color: 'color: #FC4646',
						imageSrc: '../../static/tabbar/check-red.png',
						imageStyle: 'width: 47rpx;height: 38rpx;',
						canClick: false,
						url:'./checkTicket'
					}
				],
				IsCheck: false,
				
				scrollheight:'',
				
				vehicleInfo:'',
				userInfo:'',
				coachid:'',
				ScheduleAndTickets:''
			}
		},
		onLoad() {
			let that = this;
		},
		onUnload(){
			let that = this;
		},
		onShow() {
			let that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			that.vehicleInfo = uni.getStorageSync("vehicleInfo")||'';
			let scheduleInfo = uni.getStorageSync('scheduleInfo') || '';
			that.ScheduleAndTickets = scheduleInfo;
			if(that.userInfo == ''){
				that.showToast('未取得用户信息');
			}else if(that.vehicleInfo == ''){
				that.showToast('未取得车辆信息');
			}
		},
		onPullDownRefresh() {
			let that = this;
			that.getRunScheduleInfo();
		},
		mounted() {
			var that=this;
			setTimeout(function(){//设置scollerview的高度
				uni.getSystemInfo({
					success(res) {
						that.scrollheight=res.windowHeight-40-195+'px'
					}
				})
			},50)
		},
		methods: {
			showToast:function(title,icon='none'){
				uni.showToast({
					title:title,
					icon:icon
				});
			},
			qrcode:function() {
				let that = this;
				//扫描二维码
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log(res);
						that.checkTicket(res.result);
					},
					fail:function(){
						
					}
				});
			},
			change: function(type) {
				this.IsCheck = type;
			},
			tabbarClick: function(el) {
				let url = '';
				if (el.canClick) {
					uni.redirectTo({
						url:el.url
					})
				}
			},
			
			checkTicket:function(GetTicketCode){
				//泉运检票接口
				let that = this;
				let scheduleID = that.ScheduleAndTickets.ExecuteScheduleID;
				console.log(scheduleID);
				console.log(GetTicketCode);
				uni.showLoading({
					mask:true
				});
				uni.request({
					url : that.$CustomizedBus.Interface.CheckTicket_Driver.value,
					method:that.$CustomizedBus.Interface.CheckTicket_Driver.method,
					data:{
						scheduleID:scheduleID,
						GetTicketCode:GetTicketCode,
					},
					success:function(res){
						uni.hideLoading();
						console.log(res);
						if(res.data.status){
							that.showToast('检票成功');
							that.getRunScheduleInfo();
						}else{
							that.showToast('检票失败');
						}
					},
					fail:function(res){
						uni.hideLoading();
						//console.log(res);
						that.showToast('网络连接失败');
					}
				});
			},
			
			getRunScheduleInfo:function(){
				let that = this;
				uni.stopPullDownRefresh();
				uni.request({
					url:that.$CustomizedBus.Interface.GetSchedule_Driver.value,
					method:that.$CustomizedBus.Interface.GetSchedule_Driver.method,
					data:{
						DriverID: that.userInfo.driverId,
						FactPlateNumber: that.vehicleInfo.vehicleNumber
					},
					success:function(res){
						if(res.data.status){
							that.orderInfo = [];
							let data = res.data.data;
							//data.SiteTicketList = that.arrayDistinct(data.SiteTicketList);
							//data.SiteTicketList = that.arrayBDToGcj02(data.SiteTicketList);
							that.ScheduleAndTickets = data;
							uni.setStorageSync('scheduleInfo',that.ScheduleAndTickets);
						}
					},
					fail:function(res){
						//console.log(res);
						that.showToast('网络连接失败');
					}
				});
			},
			arrayDistinct:function(array){ 
				let siteNameArr = [];
				for(let item of array){
					siteNameArr.push(item.SiteName);
				}
				let distinctArr = array.filter((x,index) => {
					return siteNameArr.indexOf(x.SiteName) == index
				});
				return distinctArr
			},
			arrayBDToGcj02:function(array){
				for (let item of array) {
					var arr = tc.bd09togcj02(parseFloat(item.Longitude),parseFloat(item.Latitude));
					item.Longitude = arr[0];
					item.Latitude = arr[1];
				}
				return array;
			},
			formatIDCard:function(idCard){
				return idCard.substring(0,6) + '****' + idCard.substring(14,18);
			},
			formatTicketId:function(id){
				return id.substring(0,id.indexOf('|'));
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

	.btnarea {
		display: flex;
		height: 118rpx;
		background: #FFF;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 20rpx;
		margin-bottom: 10rpx;
	}

	.btnarea button {
		margin-top: 10rpx;
		background-color: #FFF;
		border-radius: 0px;
		font-size: 34rpx;
		width: 200rpx;
	}

	.btnarea button:after {
		border: none;

	}
	.btnarea uni-button:after {
		border: none;

	}

	.btnclick {
		color: #FC4646;
		border-bottom: solid 1px #FC4646;
	}
	.tabbarBlock {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx 0;
		background-color: #FFF;
		box-shadow: 0px 8px 20px 0px rgba(172, 172, 172, 0.55);
		z-index: 99999;
		height: 40px;
	}
	
	.tabbarItem {
		width: 375rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.tabbarItem view {
		height: 50rpx;
		text-align: center;
	}
	
	 .tabbarItem text {
		font-size: 25rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
	}
</style>
