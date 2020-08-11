<template>
	<view class="content">
		<!-- <image src="../../static/grzx/btnReturn.png" class="returnClass" @click="returnClick"></image> -->
		<form @submit="formSubmit" style="width: 100%;">		
			<view class="boxClass">
				<view class="itemClass">
					<text class="fontStyle">真实姓名</text>
					<input class="inputClass"  name="nickName"  placeholder="请输入真实姓名" v-model="nickName" />
				</view>
				
				<view class="itemClass borderTop">
					<text class="fontStyle">性别</text>
					<picker class="inputClass" name="gender"  mode="selector" @change="genderChange" :range="genderSex" :value="gender">
						{{selector}}
					</picker>
				</view>
				
				<view class="itemClass borderTop">
					<text class="fontStyle">年龄</text>
					<input class="inputClass"  name="age"  placeholder="请输入年龄" v-model="age" type="number" />
				</view>
				
				<view class="itemClass borderTop">
					<view class="fontStyle">身份证号</view>
					<input
						placeholder="请保持与证件号码一致"
						class="inputClass"
						:value="idCode"
						name="idCode"
						type="idcard"
						maxlength="18"
					/>	
				</view>
				
				<view class="itemClass borderTop">
					<text class="fontStyle">联系电话</text>
					<text class="inputClass">{{phoneNumber}}</text>
				</view>
				
			</view>
			<button type="warn" class="btnClass" form-type="submit">保存</button>
		</form>
		
	</view>
</template>

<script>
	import wPicker from "@/components/grzx/w-picker/w-picker.vue";
	export default{
		data(){
			return{
				genderSex:['请选择','男','女'],
				selector:'请选择',
				nickName : '',
				gender:'',
				phoneNumber:'15297556076',
				idCode:'',
				age:'',
			}
		},
		onLoad(){
			this.loadData();
		},
		methods:{
			async loadData(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success:function(res){
						that.phoneNumber=res.data.phoneNumber;
					}
				})
			},
			returnClick(){		//返回个人中心
				uni.navigateBack();
			},
			genderChange : function(e){
				this.selector =this.genderSex[e.detail.value]; 
			},
			formSubmit(e){
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F6F8FC;
	}
	.content {
		display: flex;
		width: 100%;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 122upx;
		left: 4.13%;
		position: absolute;
	}

	.borderTop{
		border-top: 1upx solid #F5F5F5;
	}
	.btnClass{
		width: 90%;
		height: 108upx;
		line-height: 108upx;
		background-color: #FC4B4B;
		color: #FFFFFF;
		position: fixed;
		bottom: 40upx;
		left: 5%;
	}
	.boxClass{		
		display: flex;
		flex-direction: column;
		width: 93.07%;
		margin-top: 20upx;
		margin-left: 3.47%;
		background-color: #FFFFFF;
		border-radius: 25upx;
	}
	.itemClass{  
		width: 618upx;
		height: 110upx;
		margin-left: 40upx;
		margin-top: 0upx;
		
	}
	.fontStyle{   //文字样式
		color: #2C2D2D;
		font-size: 30upx;
		position: absolute;
		left: 9%;
		line-height: 108upx;
	}
	.inputClass{
		position: absolute;
		width: 50%;
		height: 108upx;
		font-size: 32upx;
		right: 9%;
		line-height: 108upx;
		text-align: right;
	}

</style>
