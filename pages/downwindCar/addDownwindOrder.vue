<template>
	<view>
		<view style="position: relative;z-index: -1;">
			<image src="../../static/SFCar/SF-banner.png" style="width: 750rpx;height: 400rpx;"></image>
		</view>
			<view style="margin-top: -80rpx;">
				<view style=" margin: 0 20rpx;padding: 50rpx;background-color: #FFFFFF;border-radius: 20rpx;">
					<scroll-view style="height: 750rpx;" :scroll-y='true'>
						<view>
							<view>
								<text class="titleFont">上车点</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;"> 
								<text @click="chooseStartSite" v-model="startSiteName" class="contentFont">{{startSiteName}}</text>
							</view>
						</view>
						
						<view>
							<view style="padding-top: 20rpx ;">
								<text class="titleFont">下车点</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;"> 
								<text @click="chooseEndSite" v-model="endSiteName" class="contentFont">{{endSiteName}}</text>
							</view>
						</view>
						
						<view>
							<view style="padding-top: 20rpx ;">
								<text class="titleFont">出发时间</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;"> 
								<text style="letter-spacing:1px" @click="onShowDatePicker('datetime')">{{datestring}} {{Week}}</text>
							</view>
							<mx-date-picker :show="showPicker" :showSeconds="false" :type="type" :value="value" :show-tips="true" begin-text="开始"
							 end-text="结束" :show-seconds="true" @confirm="onSelected" @cancel="onCancle" />
						</view>
						
						<!-- <view>
							<view style="padding-top: 20rpx ;">
								<text class="titleFont">预计里程</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;display: flex;flex-direction: row;justify-content: space-between;"> 
								<input class="contentFont" v-model="mileage" type="number"  />
								<text>公里</text>
							</view>
						</view> -->
						
						<view>
							<view style="padding-top: 20rpx ;">
								<text class="titleFont">价格</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;display: flex;flex-direction: row;justify-content: space-between;"> 
								<input adjust-position=true class="contentFont" v-model="price" type="number"  />
								<text>元</text>
							</view>
						</view>
						<view>
							<view style="padding-top: 20rpx ;">
								<text class="titleFont">剩余座位</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;"> 
								<picker :value='index' @change='pickerChange' mode='selector' :range='seatArr'>
									<text style="width: 100%;">{{seat}}个</text>
								</picker>
							</view>
						</view>
					</scroll-view>
					<view style="margin-top: 30rpx;">
						<button @click="submit" style="background-color: #FC4646;border-radius: 12rpx;">
							<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:400;color:#FFFFFF;">发布</text>
						</button>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue'
	export default {
		components: {
			MxDatePicker,
		},
		data() {
			return {
				datestring:'',
				date:'',
				Week:'',
				value:'',
				type:'',
				showPicker:false,
				
				startSiteName:'请选择上车点',
				startLon:'',
				startLat:'',
				
				endSiteName:'请选择下车点',
				endLon:'',
				endLat:'',
				mileage:0,
				price:0,
				userInfo:null,
				vehicleInfo:null,
				seat:1,
				seatArr:[1,2,3,4],
				index:0
			}
		},
		onLoad() {
			let that =this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			that.vehicleInfo = uni.getStorageSync('vehicleInfo') || '';
			
			
			that.getTodayDate();
		},
		methods: {
			showToast:function(title,icon='none'){
				uni.showToast({
					title:title,
					icon:icon
				});
			},
			getTodayDate:function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + minutes;
				this.datestring = timer;
				this.date = year + '/' + month + '/' + day + ' ' + hour + ':' + minutes;
			},
			onSelected:function(e) { //选择
				this.showPicker = false;
				this[this.type] = e.value;
				this.datestring = this[this.type];
				this.queryWeek(e.date.toString().substring(0, 3));
				this.date = e.value;
			},
			onCancle:function(){
				this.showPicker = false;
			},
			queryWeek:function(e) {
				switch (e) {
					case "Mon":
						this.Week = '周一';
						break;
					case "Tue":
						this.Week = "周二";
						break;
					case "Wed":
						this.Week = "周三";
						break;
					case "Thu":
						this.Week = "周四";
						break;
					case "Fri":
						this.Week = "周五";
						break;
					case "Sat":
						this.Week = "周六";
						break;
					case "Sun":
						this.Week = "周日";
						break;
					default:
						break;
				}
			},
			submit:function(){
				let that = this;
				if(! that.isVerify()){
					return;
				}
				uni.request({
					url:that.$downwindCar.Interface.CreateLine_Driver.value,
					method:that.$downwindCar.Interface.CreateLine_Driver.method,
					data:{
						StartLon:that.startLon,
						StartLat:that.startLat,
						EndLon:that.endLon,
						EndLat:that.endLat,
						StartSiteName:that.startSiteName,
						EndSiteName:that.endSiteName,
						Mileage:that.mileage,
						DepartureTime:that.date,
						LineName :that.startSiteName + '-' + that.endSiteName,
						DriverID:that.userInfo.driverId,
						DriverName:that.userInfo.userName,
						Price:that.price,
						Seat:that.seat,
						VehicleNumber:that.vehicleInfo.vehicleNumber
					},
					success:function(res){
						//console.log(res);
						if(res.data.status){
							that.showToast('发布成功');
							setTimeout(function(){
								uni.navigateBack({});
							},1500)
						}else{
							that.showToast('发布失败');
						}
					},
					fail:function(res){
						//console.log(res);
						that.showToast('网络连接失败');
					}
				})
			},
			isVerify:function(){
				let that = this;
				if(that.startSiteName === '请选择上车点'){
					that.showToast('请选择上车点');
					return false
				} else if (that.endSiteName === '请选择下车点'){
					that.showToast('请选择下车点');
					return false;
				} /* else if (that.mileage == 0){
					that.showToast('请输入预计里程');
					return false;
				} */ else if (that.price == 0){
					that.showToast('请输入价格');
					return false;
				} else if (that.price < 0){
					that.showToast('价格输入有误');
					return false;
				} else if (that.seat <= 0){
					that.showToast('剩余座位不能小于1个');
					return false;
				} else if (that.seat > 4){
					that.showToast('剩余座位不能大于4个');
					return false;
				} else if(new Date(that.date).getTime() < new Date().getTime()){
					that.showToast('选择时间不能早于当前时间');
					return false;
				}
				return true;
			},
			onShowDatePicker:function(type){
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			chooseStartSite:function(){
				let that = this;
				uni.chooseLocation({
					success:function(res){
						that.startSiteName = res.name
						that.startLon = res.longitude
						that.startLat = res.latitude
					},
				});
			},
			chooseEndSite:function(){
				let that = this;
				uni.chooseLocation({
					success:function(res){
						that.endSiteName = res.name
						that.endLon = res.longitude
						that.endLat = res.latitude
					},
				});
			},
			pickerChange:function(e){
				let that = this;
				that.index = e.detail.value;
				that.seat = that.seatArr[e.detail.value];
			},
		}
	}
</script>

<style>
	page{
		background-color: #F5F7F9;
	}
	.titleFont{
		font-size:32rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#999999;
	}
	.contentFont{
		font-size:38rpx;
		font-family:Source Han Sans SC;
		font-weight:400;
		color:#2C2D2D;
	}
	
</style>
