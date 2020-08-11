<template>
	<view class="content">
		<view class="boxClass mt">
			<text class="fontClass">初次领证日期</text>
			<picker class="pickerClass" name="firstCertificateDate"  mode="date" @change="firstChange" v-model="firstCertificateDate"  :start="startDate" :end="endDate" placeholder="请选择"  >
				{{firstCertificateDate}}
			</picker>
		</view>
		<view class="boxClass">
			<text class="fontClass">证件到期时间</text>
			<picker class="pickerClass" name="ExpirationDate"  mode="date" @change="expirationChange" v-model="ExpirationDate"  :start="startDate" :end="endDate" placeholder="请选择"  >
				{{ExpirationDate}}
			</picker>
		</view>
		<view class="boxClass">
			<text class="fontClass">驾照证号</text>
			<input class="inputClass" maxlength="18"  name="userlicenseNum"  placeholder="请输入驾照证号(身份证号)" v-model="userlicenseNum" @blur="checklicenseNum"/>
		</view>
		<!-- 驾照主页 -->
		<view v-if="type1==0" @click="getFront" class="boxStyle">
			<image src="../../static/grzx/licensefront.png" style="width: 100%;height: 100%;"></image>
		</view>
		<view v-if="type1==1" @click="getFront" class="boxStyle">
			<image :src="userlicenseFront" name="userlicenseFront" style="width: 100%;height: 100%;border-radius: 26upx;" mode="aspectFill"></image>
		</view>
		<text class="fontStyle">驾照主页</text>
		<!-- 驾照副页 -->
		<view v-if="type2==0" @click="getBack" class="boxStyle">
			<image src="../../static/grzx/licenseback.png" style="width: 100%;height: 100%;"></image>
		</view>
		<view v-if="type2==1" @click="getBack" class="boxStyle">
			<image :src="userlicenseBack" name="userlicenseBack"  mode="aspectFill" style="width: 100%;height: 100%;border-radius: 26upx;"></image>
		</view>
		<text class="fontStyle">驾照副页</text>	
		<view class="topClass">
			<text class="titleClass">{{title}}</text>
			<image src="../../static/grzx/btnReturn.png" class="returnClass" @click="returnClick"></image>
			<image src="../../static/grzx/nav3.png" class="navClass"></image>
		</view>
		<view @click="submitClick" class="submitClass">
			提交
		</view>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '@/components/grzx/js_sdk/gsq-image-tools/image-tools/index.js';
	// import wPicker from "@/components/grzx/w-picker/w-picker.vue";
	export default{
		data(){
			return{
				type1:0,
				type2:0,
				title:'完善驾照',
				userdrivingAge:'',
				userlicenseNum:'',
				userlicenseFront:'',
				userlicenseBack:'',
				frontImg:'',//用于上传
				backImg:'',//用于上传
				firstCertificateDate:'请选择', //初次领证日期
				ExpirationDate:'请选择', //证件有效期
			}
		},
		onLoad(){
			
		},
		computed:{
			startDate() {
			    return this.getDate('start');
			}, 
			endDate() {
			    return this.getDate('end');
			}
		},
		// components:{
		//      wPicker
		// },
		methods:{
			// --------初次领证日期---------
			firstChange : function(e){
				this.firstCertificateDate = e.detail.value;
			},
			// --------证件有效期---------
			expirationChange: function(e){
				this.ExpirationDate = e.detail.value;
			},
			// --------获得日期---------
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 50; //过去几年
				} else if (type === 'end') {
					year = year + 20;//未来几年
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//-----------只能输入数字------------
			judgeNum(val){  
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				    if(regPos.test(val) || regNeg.test(val)) {
				        return true;
				    } else {
				        return false;
				    }
			},
			//-----------驾龄输入离开时执行------------
			inputChange(){
				if(!this.judgeNum(this.userdrivingAge)&&this.userdrivingAge!=""&&this.userdrivingAge!=null){
					uni.showToast({
						title : '请输入正确的驾龄，只允许输入数字',
						icon : 'none',
					})
				}
			},
			//-----------返回------------
			returnClick(){
				uni.navigateBack();
				console.log("返回");
			},
			//-----------上传驾照主页------------
			getFront(){
				var that=this;
				uni.chooseImage({
					count:1,
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
							success: function (res1) {
								that.userlicenseFront=res1.savedFilePath;
								that.type1=1;
								pathToBase64(res1.savedFilePath)
									.then(base64 => {
									that.frontImg=base64;	
								})
							}
						});
					}
				})
			},
			//-----------上传驾照副页------------
			getBack(){
				var that=this;
				uni.chooseImage({
					count:1,
					success(res) {
						var tempFilePaths = res.tempFilePaths;
						uni.saveFile({
						  tempFilePath: tempFilePaths[0],
							success: function (res1) {
								that.userlicenseBack=res1.savedFilePath;
								that.type2=1;
								pathToBase64(res1.savedFilePath)
									.then(base64 => {
									that.backImg=base64;	
								})
							}
						});
					}
				})
			},
			//-----------身份证号------------
			checklicenseNum(e){
				console.log(e)
				if(e.detail.value==""){
					console.log("空的")
				}else if(this.checkIDCard(e.detail.value)){
					console.log("正确")
				}else{
					uni.showToast({
						title:'输入的驾照证号有误，请检查',
						icon:'none'
					})
				}
			},
			//-----------校验身份证号------------
			checkIDCard:function(idcode){
			    // 加权因子
			    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
			    // 校验码
			    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
			    var code = idcode + "";
			    var last = idcode[17];//最后一位
			    var seventeen = code.substring(0,17);
			    // 判断最后一位校验码是否正确
			    var arr = seventeen.split("");
			    var len = arr.length;
			    var num = 0;
			    for(var i = 0; i < len; i++){
			        num = num + arr[i] * weight_factor[i];
			    }
			    // 获取余数
			    var resisue = num%11;
			    var last_no = check_code[resisue];
				var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
				// 判断格式是否正确
				var format = idcard_patter.test(idcode);
				// 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
				return last === last_no && format ? true : false;
			},
			//-----------提交数据------------
			submitClick(){
				// console.log(this.userdrivingAge)
				// console.log(this.userlicenseNum)
				// console.log(this.frontImg)
				// console.log(this.backImg)
				var that=this;
				var list1=uni.getStorageSync('registerList1')
				var list2=uni.getStorageSync('registerList2')
				if(this.firstCertificateDate=="请选择"){
					uni.showToast({
						title:'请选择初次领证日期',
						icon:'none',
					})
				}else if(this.ExpirationDate=="请选择"){
					uni.showToast({
						title:'请选择证件到期时间',
						icon:'none',
					})
				}else if(this.userlicenseNum==""||this.userlicenseNum==null){
					uni.showToast({
						title:'请输入您的驾照证号',
						icon:'none',
					})
				}else if(!this.checkIDCard(this.userlicenseNum)){
					uni.showToast({
						title:'请输入正确的驾照证号',
						icon:'none',
					})
				}else if(this.frontImg==""||this.frontImg==null){
					uni.showToast({
						title:'请输入上传驾照的主页',
						icon:'none',
					})
				}else if(this.backImg==""||this.backImg==null){
					uni.showToast({
						title:'请输入上传驾照的副页',
						icon:'none',
					})
				}else{
					uni.showLoading({
						title:'提交中...'
					})
					console.log(list1.phoneNumber,"phoneNumber")
					console.log(list1.password,"password")
					console.log(list2.userName,"userName")
					console.log(list2.userPortrait,"userPortrait")
					console.log(list2.userSex,"userSex")
					console.log(list2.userCompany,"userCompany")
					console.log(list2.userCompanyID,"userCompanyID")
					console.log(list2.userlicenseGrade,"userlicenseGrade")
					console.log(that.firstCertificateDate,"firstCertificateDate")
					console.log(that.ExpirationDate,"ExpirationDate")
					console.log(that.userlicenseNum,"userlicenseNum")
					console.log(that.frontImg,"frontImg")
					console.log(that.backImg,"backImg")
					uni.request({
						//url:'http://111.231.109.113:8002/api/person/Register_Driver',
						url:that.$GrzxInter.Interface.Register_Driver.value,
						data:{
							phoneNumber:list1.phoneNumber,
							passWord:list1.password,
							userName:list2.userName,
							userPortrait:list2.userPortrait,
							userSex:list2.userSex,
							autograph:list2.userCompany,
							companyID:list2.userCompanyID,
							userlicenseGrade:list2.userlicenseGrade,
							userdrivingAge:0,
							firstCertificateDate:that.firstCertificateDate,
							expirationDate:that.ExpirationDate,
							userlicenseNum:that.userlicenseNum,
							userlicenseFront:that.frontImg,
							userlicenseBack:that.backImg,
							userauditState:0,
							userCodeNum:'',
						},
						method:that.$GrzxInter.Interface.Register_Driver.method,
						success(res) {
							console.log(res,"提交成功")
							if(res.data.msg=="用户注册失败"){
								uni.showToast({
									title:'用户注册失败',
									icon:'none',
								})
							}else{
								uni.removeStorageSync('registerList1');
								uni.removeStorageSync('registerList2');
								uni.hideLoading();
								uni.redirectTo({
									url:'/pages/grzx/successPage'
								})
							}
						}
					})
				}
			}
		}
	}
</script>


<style lang="scss">
	page{
		background-color: #F5F9FC;
	}
	.content {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.topClass{
		background-color: #F5F9FC;
		width: 100%;
		height: 250upx;
		position: fixed;
		left: 0upx;
		top:0upx;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 84upx;
		left: 4.13%;
		position: fixed;
	}
	.titleClass{	//标题
		color: #333333;
		font-size: 40upx;
		width: 100%;
		text-align: center;
		top: 70upx;
		position: fixed;
		font-weight: bold;
	}
	.navClass{	//导航
		width: 90%;
		height: 75upx;
		// margin-left: 5%;
		// margin-top: 170upx;
		left: 5%;
		top:170upx;
		position: fixed;
	}
	.boxClass{
		background-color: #FFFFFF;
		line-height:109upx;
		width: 90%;
		height: 109upx;
		margin-left: 5%;
		display: flex;
		flex-direction: row;
		margin-top: 24upx;
		border-radius: 26upx;
	}
	.mt{
		margin-top:270upx;
	}
	.fontClass{	//姓名，性别，公司，驾照等级
		font-size: 30upx;
		color: #2C2D2D;
		margin-left: 6%;
	}
	.pickerClass{
		margin-left: 7%;
		color: #2C2D2D;
		width: 50%;
		font-size: 34upx;
		// border: 1upx solid red;
	}
	.inputClass{ //输入驾照证号
		color: #2C2D2D;
		width: 66%;
		// border: 1upx solid #000000;
		margin-left: 7%;
		/* #ifdef MP-WEIXIN */
		margin-top: 33upx;
		/* #endif */
		/* #ifdef APP-PLUS */
		margin-top: 38upx;
		/* #endif */
		font-size: 30upx;
	}
	.boxStyle{
		width: 90%;
		height: 400upx;
		margin-top: 20upx;
		margin-left: 5%;
		border-radius: 26upx;
	}
	.fontStyle{
		width: 100%;
		text-align: center;
		font-size: 34upx;
		color: #333333;
		margin-top: 20upx;
	}
	.submitClass{
		width: 90%;
		height: 90upx;
		line-height: 90upx;
		margin-top: 40upx;
		margin-bottom: 20upx;
		margin-left: 5%;
		text-align: center;
		color:#FFFFFF;
		border-radius: 8upx;
		background-color: #FC4646;
		font-size: 34upx;
	}
</style>
