<!-- 
自定义验证码输入、密码输入使用
 
使用方法：
maxlength：输入最大长度
isPwd：是否是密码模式
@finish：回调函数
 <validcode :maxlength="4" :isPwd="false" @finish="finish"></validcode>
 -->
<template>
	<view class="code-area">
		<view class="flex-box" >
			<input
			    :value="val"
				type="text"
				:focus="false"
				:maxlength="maxlength"
				:disabled="true"
				class="hide-input"
				@input="getVal"
				@change="change"
				@click="key3"
			/>
			<block v-if="maxlength >0" v-for="(items,index) in maxlength" :key="index" >			
				<view  v-bind:class="['item', { active: codeIndex == index+1 }]" >
					<view class="line"></view>
					<block v-if="isPwd && codeArr.length >= index+1" >
						<!-- <text class="dot">.</text> -->
					</block>
					<block v-else>	{{ codeArr[index] ? codeArr[index] : ''}}</block>
				</view>
			</block>
		</view>
		<tki-float-keyboard ref="keyb" :mode="keyMode" :type="keyType" :title="keyTitle" @del="keyDel" @val="keyVal" @show="keyShow"
		 @hide="keyHide"></tki-float-keyboard>
	</view>
</template>

<script>
	import tkiFloatKeyboard from "../tki-float-keyboard/tki-float-keyboard.vue";
export default {
	components: {
		tkiFloatKeyboard
	},
	props: {
		//最大长度 值为4或者6
		maxlength: {
			type: Number,
			default: 7
		},
		//是否是密码
		isPwd: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			codeIndex: 1, //下标
			codeArr: [],
			val:'',//输入框的值
			keyMode: 'car',
			keyType: 0,
			keyTitle: '汽车键盘',
			value1:'',
			len:1,
		};
	},
	methods: {
		change(){
			if (this.codeIndex > Number(this.maxlength)) {
				//输入完成
				this.$emit('finish',this.codeArr.join(''));
			}
		},
		// 汽车键盘
		key3() {
			this.keyMode = "car"
			this.keyTitle = "汽车键盘"
			this.showKey()
		},
		// 显示键盘
		showKey() {
			this.$refs.keyb._keyShow();
		},
		// 键盘退格
		keyDel() {
			if(this.codeIndex>1){
				this.codeArr[this.codeIndex-2]= '';
				this.value1=this.value1.substring(0,this.codeArr.length-1)
				this.codeIndex--;
				this.codeArr.length--;
			}else{
				uni.showToast({
					title:"到底啦~~",
					icon:"none"
				})
				console.log(this.codeArr)
			}
		
			// this.vals = d.substring(0, d.length - 1)
		},
		// 键盘输入值
		keyVal(value) {
			if(this.len==Number(this.maxlength)){
				this.getVal(value); 
			}else{
				this.value1='';
				this.getVal(value); 
				this.len=Number(this.maxlength);
			}
			
		},
		// 显示键盘后的回调
		keyShow(h) {
		},
		// 隐藏键盘后的回调
		keyHide() {
		
		},
		//取值
		getVal(e) {
			if(this.codeArr.length<Number(this.maxlength)){
				this.value1=this.value1+e
				var a={
					value:this.value1
				}
				let { value } = a;
				this.val=value;
				// console.log('验证码:', value);
				let arr = value.split('');
				this.codeIndex = arr.length + 1;
				this.codeArr = arr;
				// console.log(arr.length)
				// console.log(this.codeIndex, this.pwdArr);
				if (this.codeIndex > Number(this.maxlength)) {
					//输入完成
					this.$emit('finish',this.codeArr.join(''));
				}
			}else{
				uni.showToast({
					title:"车牌最多"+this.maxlength+"位",
					icon:"none"
				})
			}
		},
		//清除验证码或者密码
		clear(){
			this.codeIndex=1;
			this.codeArr=[];
			this.val="";
		}
	}
};
</script>

<style lang="scss">
.code-area {
	text-align: center;
	.flex-box {
		display: flex;
		flex-wrap: nowrap;
		position: relative;
		justify-content: center;
	}
	.item {
		position: relative;
		width: 100upx;
		height: 108upx;
		margin-right: 18upx;
		font-size: 30upx;
		font-weight: bold;
		color: #333333;
		line-height: 108upx;
		box-sizing: border-box;
		border: 2upx solid #cccccc;
		background: #FFFFFF;
		border-radius: 12upx;
	}
	.item:last-child {
		margin-right: 0;
	}
	.active {
		border-color: #ff4b4b;
	}
	.active .line {
		display: block;
	}
	.line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2upx;
		height: 40upx;
		background: #ff4b4b;
		animation: twinkling 1s infinite ease;
	}
	.hide-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 1;
	}
	@keyframes twinkling {
		0% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 0.2;
		}
	}
	.dot{
		font-size: 80upx;
		line-height: 40upx;
	}
}
</style>
