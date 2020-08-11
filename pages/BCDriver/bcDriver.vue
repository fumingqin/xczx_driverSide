<template>
	<view>
		<view style="display: flex">
			<view>
				<image @click="back" src="../../static/driver/back.png" style="width: 18rpx; height: 34rpx; margin:103rpx 26rpx; color: #2C2D2D;"></image>
			</view>
			<view style="width: 200rpx; height: 36rpx; margin: 92rpx 212rpx;color: #333333; font-size: 38rpx;font-weight:bold;">包车司机</view>
		</view>
		<!-- 本月接单量 -->
		<view style="width: 94%;background-color: #FFFFFF;border-radius:20rpx; margin-top: -64rpx;margin-left: 22rpx;">
			<view style="padding: 30rpx;display: flex;justify-content: space-between;align-items: center;">
				<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:42rpx;">本月接单量</text>
				<view style="display: flex;align-items: center;">
					<view style="margin:0 20rpx;width: 40rpx;height: 40rpx;border-radius: 100px;background: linear-gradient(270deg,rgba(250,116,101,1),rgba(249,92,117,1));font-size: 26rpx;color: #FFF;text-align: center;font-weight: 600;">
						{{classNum}}
					</view>
					<image style="width: 14rpx;height: 26rpx;" src="../../static/driver/right.png"></image>
				</view>
			</view>
		</view>
		
		<!-- 已接单信息 -->
		<view :hidden="orderStatus==1" v-for="(item,index) in receiptInfo" :key="index" style="margin-top: -12rpx;">
			<view v-if="item.Type=='0'">
				<view style="width: 94%;height: 460rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 30rpx;">
					<view style="padding: 40rpx;display: flex;flex-direction: row;">
						<text style="width:160rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx;">包车类型:</text>
						<text style="height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx; margin-left: 10rpx;">专线</text>
					</view>
					<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">客户类型:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{customerTypec(item.UserType)}}</text>
					</view>
					<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">出发时间:</text>
						<text style="width:320rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{departureTime(item.AppointmentTime)}}</text>
					</view>
					<view style="margin: -10rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">上车点:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.StartAddress}}</text>
					</view>
					<view style="margin: 20rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">下车点:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.EndAddress}}</text>
					</view>
					<view style="display: flex; margin-left: 4rpx; margin-top: -10rpx;">
						<button @click="start(item)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #ED766C; border: 1px solid #ED766C; color: #FFFFFF; align-items: center;">接单</button>
						<button @click="call(item.PassengersPhone)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #FFFFFF; border: 1px solid #666666; color: #666666; align-items: center; margin-left: -16rpx;">拒接</button>
					</view>
				</view>
			</view>
			<view v-if="item.Type=='1'">
				<view style="width: 94%;height: 510rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 30rpx;">
					<view style="padding: 40rpx;display: flex;flex-direction: row;">
						<text style="width:160rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx;">包车类型:</text>
						<text style="height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx; margin-left: 10rpx;">定制</text>
					</view>
					<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">客户类型:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{customerTypec(item.UserType)}}</text>
					</view>
					<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">包车天数:</text>
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.Day}}</text>
					</view>
					<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">出发时间:</text>
						<text style="width:320rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{departureTime(item.AppointmentTime)}}</text>
					</view>
					<view style="margin: -10rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">上车点:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.StartAddress}}</text>
					</view>
					<view style="margin: 20rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">下车点:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.EndAddress}}</text>
					</view>
					<view style="display: flex; margin-left: 4rpx; margin-top: 20rpx;">
						<button @click="start(item)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #ED766C; border: 1px solid #ED766C; color: #FFFFFF; align-items: center;">接单</button>
						<button @click="call(item.PassengersPhone)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #FFFFFF; border: 1px solid #666666; color: #666666; align-items: center; margin-left: -16rpx;">拒接</button>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 已接单信息 -->
		<view :hidden="orderStatus == 0" v-for="(item,index) in receiptInfo" :key="index" style="margin-top: -12rpx;">
			<view v-if="item.Type=='0'">
				<view style="width: 94%;height: 460rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 30rpx;">
					<view style="padding: 40rpx;display: flex;flex-direction: row;">
						<text style="width:160rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx;">包车类型:</text>
						<text style="height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx; margin-left: 10rpx;">专线</text>
					</view>
					<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">客户类型:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{customerTypec(item.UserType)}}</text>
					</view>
					<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">出发时间:</text>
						<text style="width:320rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{departureTime(item.AppointmentTime)}}</text>
					</view>
					<view style="margin: -10rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">上车点:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.StartAddress}}</text>
					</view>
					<view style="margin: 20rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">下车点:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.EndAddress}}</text>
					</view>
					<view style="display: flex; margin-left: 4rpx; margin-top: -10rpx;">
						<button @click="start(item)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #ED766C; border: 1px solid #ED766C; color: #FFFFFF; align-items: center;">发车</button>
						<button @click="call(item.PassengersPhone)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #FFFFFF; border: 1px solid #666666; color: #666666; align-items: center; margin-left: -16rpx;">联系客户</button>
					</view>
				</view>
			</view>
			<view v-if="item.Type=='1'">
				<view style="width: 94%;height: 510rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-top: 30rpx;">
					<view style="padding: 40rpx;display: flex;flex-direction: row;">
						<text style="width:160rpx;height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx;">包车类型:</text>
						<text style="height:40rpx;font-size:36rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);line-height:36rpx; margin-left: 10rpx;">定制</text>
					</view>
					<view style="margin: -10rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">客户类型:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{customerTypec(item.UserType)}}</text>
					</view>
					<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">包车天数:</text>
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.Day}}</text>
					</view>
					<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
						<text style="width:140rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">出发时间:</text>
						<text style="width:320rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{departureTime(item.AppointmentTime)}}</text>
					</view>
					<view style="margin: -10rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">上车点:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.StartAddress}}</text>
					</view>
					<view style="margin: 20rpx 40rpx;display: flex;flex-direction: row;">
						<text style="width:110rpx;height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">下车点:</text>
						<text style="height:40rpx;font-size:30rpx;font-family:Source Han Sans SC;color:#666666;line-height:36rpx;">{{item.EndAddress}}</text>
					</view>
					<view style="display: flex; margin-left: 4rpx; margin-top: 20rpx;">
						<button @click="start(item)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #ED766C; border: 1px solid #ED766C; color: #FFFFFF; align-items: center;" >发车</button>
						<button @click="call(item.PassengersPhone)" style="width:278rpx;height:90rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #FFFFFF; border: 1px solid #666666; color: #666666; align-items: center; margin-left: -16rpx;">联系客户</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>	
	export default {
		data() { 
			return {
				orderStatus : 0,//接单状态
				classNum:3,
				userInfo : '',//司机信息
				vehicleInfo : '',//车牌号信息
				receiptInfo: [], //可接单列表
			}
		},
		onLoad:function(){
			//请求订单
			uni.getStorage({
				key : 'vehicleInfo',
				success:(res)=>{
					this.vehicleInfo = res.data;
				},
				fail:function(){
					uni.showToast({
						title:'请绑定车牌号',
						icon:'none'
					})
				}
			}),
			
			uni.getStorage({
				key:'userInfo',
				success:(user)=>{
					this.userInfo = user.data;
					//console.log(user)
					uni.request({
						url:this.$Bcsjd.Interface.bc_GetCanReceiptCharteredOrder_Driver.value,
						method:this.$Bcsjd.Interface.bc_GetCanReceiptCharteredOrder_Driver.method,
						data:{ 
							DriverId : user.data.driverId,
							VehicleNumber : this.vehicleInfo.vehicleNumber
						},
						success:(res)=>{
							//console.log(res)
							this.receiptInfo = res.data.data;
						}
					})
				},
				fail:function(){
					uni.showToast({
						title:'请登录',
						icon:'none'
					})
				}
			})
			
			
		},
		methods: {
			//判断会员类型转换
			customerTypec:function(e){
				if(e == 0){
					return '普通'
				}else{
					return '会员'
				}
			},
			
			departureTime:function(e){
				return e.replace('T',' ')
			},
			
			//拨打电话
			call: function(e) {
				uni.makePhoneCall({
					phoneNumber:e
				});
			},
			
			//返回页面
			back: function() {
				uni.switchTab({
					url: '/pages/index/index',
				})
			},
			
			//接单按钮
			receipt:function(e){
				
			},
			
			
			
			//发车按钮
			start:function(e){
				uni.request({
					url:this.$Bcsjd.Interface.bc_ReceiptCharteredOrder_Driver.value,
					method:this.$Bcsjd.Interface.bc_ReceiptCharteredOrder_Driver.method,
					data:{
						OrderNumber : e.orderNumber,
						DriverId : this.userInfo.driverId,
						DriverPhone : this.userInfo.phoneNumber,
						VehicleNumber : this.vehicleInfo.vehicleNumber,
						DriverName : this.userInfo.DriverName,
					},
					success:function(res){
						//console.log(res)
						if(e.Type=='0'){
							uni.navigateTo({
								url: '/pages/BCDriver/specialLineCar',
							})
						}else if(e.receiptInfo.Type=='1'){
							uni.navigateTo({
								url: '/pages/BCDriver/customizedCar',
							})
						}
					},
					fail:function(){
						uni.showToast({
							title:'网络故障，请检查网络后重试',
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F9FC;
	}
</style>
