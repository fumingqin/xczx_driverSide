<script>
	import homeJS from 'common/Home.js';
	import utils from '@/components/shoyu-date/utils.filter.js';
	
	export default {
		data: {},
		globalData: {
			globalInterval: 0,
			orderNumber:'0',
			vehicleNumber:'',
			driverID:0,
			uploadMyLocation: function() {
				let that = this;
				uni.getLocation({
					type: 'gcj02 ',
					success: function(res) {
					
						uni.request({
							url: homeJS.Interface.addVehiclePosition.value, 
							method:homeJS.Interface.addVehiclePosition.method,
							data: {
								orderNumber:that.orderNumber,
								driverID:that.driverID,
								vehicleNumber:that.vehicleNumber,//车牌号
								lon: res.longitude,
								lat: res.latitude,
								speed:res.speed,
								reportTime: utils.timeTodate(homeJS.dateFormat.dateformat, new Date().getTime())
							},
							success:function(res){
								//console.log(res);
							},
							fail:function(res){
								// console.log(res);
							}
						});
					}
				});
			},
			constantly: function() {
				let that = this;
				if (that.globalInterval == 0) {
					that.globalInterval = setInterval(function() {
					    that.uploadMyLocation();
					}, 10000);
				}
			},
			closeUpload:function(){
				let that = this;
				clearInterval(that.globalInterval);
				that.globalInterval = 0; 
			}

		},

		methods: {
			
		},
		onLaunch: function() {
			let that = this;
			console.log('onLaunch');
			//客运/CTKYDriver/index
			uni.removeStorageSync('lastIndex');
			uni.getStorage({
				key:'userInfo',
				fail(){
					uni.showToast({
						title : '您暂未登录，请先登录',
						icon : 'none',
					})
					setTimeout(function(){
						uni.navigateTo({	
							url  : '/pages/grzx/selectOperation?address=1'
						}) 
					},1000);
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
