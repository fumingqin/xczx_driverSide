<template>
	<view>
		<view class="example-body" v-if="complaintList2.or_DriverState=='申诉成功' || complaintList2.or_DriverState=='申述中'">
			<uni-steps :options="list" active-color="#007AFF" :active="type" />
		</view>
		<view class="example-body" v-if="complaintList2.or_DriverState=='申诉失败'">
			<uni-steps :options="list2" active-color="#007AFF" :active="type2" />
		</view>
		
		<view class="cc_content">
			<text class="ct_text1">投诉时间</text>
			<text class="ct_text2">{{complaintList2.or_dateString}}</text>
			<text class="ct_text1">投诉内容</text>
			<text class="ct_text2">{{complaintList2.or_content}}</text>
			<view v-if="complaintList2.or_DriverState=='申诉成功' || complaintList2.or_DriverState=='申述中' || complaintList2.or_DriverState=='申诉失败'">
				<text class="ct_text1">申诉内容</text>
				<text class="ct_text2">{{complaintList2.or_DriverContent}}</text>
			</view>
		</view>
		
		<view class="cc_content" v-if="complaintList2.or_DriverState=='申诉成功' || complaintList2.or_DriverState=='申诉失败'">
			<text class="ct_text1">审核人</text>
			<text class="ct_text2">{{complaintList2.or_reviewedBy}}</text>
			<text class="ct_text1">审核内容</text>
			<text class="ct_text2">{{complaintList2.or_examineContent}}</text>
		</view>
		
<!-- 		<view v-if="complaintList2.or_DriverState=='申诉失败'">
			<view class="cl_bottom"></view>
			<view class="tjButton">修改申诉</view>
		</view> -->
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
		components: {
			uniSteps,
		},
		data() {
			return {
				complaintList2:'',
				or_number:'',
				type: 0,
				type2: 0,
				list: [{
					title: '已申诉'
				},{
					title: '申述中'
				},{
					title: '申诉成功'
				}],
				
				list2: [{
					title: '已申诉'
				},{
					title: '申述中'
				},{
					title: '申诉失败'
				}],
			}
		},
		onLoad(options) {
			this.or_number = JSON.parse(options.or_number);
			this.grzxData();
		},
		methods: {
			//-----------------读取静态数据json.js-------------------------------
			grzxData:function(){
				uni.request({
					url:this.$GrzxInter.Interface.complaintContent.value,
					method:this.$GrzxInter.Interface.complaintContent.method,
					header: {'content-type': 'application/json'},
					data:{
						or_number:this.or_number,
					},
					success: (res) => {
						this.complaintList2=res.data.data[0];
						// console.log(this.vehicleSelection)
						if(this.complaintList2.or_DriverState=='申述中'){
							this.type=1;
							this.type2=1;
						}else if(this.complaintList2.or_DriverState=='申诉成功'){
							this.type=2;
							this.type2=2;
						}else if(this.complaintList2.or_DriverState=='申诉失败'){
							this.type=2;
							this.type2=2;
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	//默认背景颜色
	page {
		background-color: #efeff4;
	}
	
	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
		padding-top: 60upx;
		padding-bottom: 40upx;
	}
	
	.cc_content{
		background-color: #ffffff;
		// padding-bottom: 32upx;
		margin-top: 20upx;
		padding-left: 30upx;
		padding-right: 30upx;
		
		.ct_text1{
			display: flex;
			font-weight: bold;
			font-size: 32upx;
			padding-top: 30upx;
		}
		
		.ct_text2{
			padding-top: 20upx;
			padding-bottom: 20upx;
			font-size: 31upx;
			display: block;
			color: #666;
			border-bottom: 1px #F5F5F5 dotted;
		}
	}
	
	//底部多余
	.cl_bottom{
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
