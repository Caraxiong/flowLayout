<template>
	<div class="pabel">
		<div class="label-box">
			<label>手机号：</label>
			<input type="text" v-model.number.trim="phoneNum" placeholder="请输入手机号">
		</div>
		<div class="label-box">{{phoneNum}}</div>
		<div class="label-box">
			<label>密码：</label>
			<input type="password" v-model="pws" placeholder="请输入密码">
		</div>
		<div class="pws-level-bar">
			<span><i v-bind:class="{light:isLow,noLight:!isLow}"></i><i v-bind:class="{light:isMid,noLight:!isMid}"></i><i v-bind:class="{light:isHigh,noLight:!isHigh}"></i></span>
		</div>
		<div class="label-box">
			<button class="btn btn-l btn-b0 btn-r" v-on:click="getForm">注册</button>
		</div>
	</div>
</template>
<script>
	require('../style/register.scss')
	module.exports = {
		data: function () {
			return {
				phoneNum:'',
				pws:'',
				isLow: false,
				isMid: false,
				isHigh: false
			}
		},
		computed: {
			isLight: function () {
				return {
					light: true
				}
			}
		},
		watch: {
			// /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*()+=|{}':;',\[\\\].<>/?]+)$)^[\w~!@#$%^&*()+=|{}':;',\[\\\].<>/?]{6,}$/
			pws: function(val,oldVal){
				var strength=0
				var arr = [/[~!@#$%^&*()+=|{}':;',\[\\\].<>/?]+/,/[0-9]+/,/[a-zA-Z]+/]
				var len = arr.length;
				for(var i = 0;i < len;i++){
				 	if(arr[i].test(val)) {
				 		 strength++
				 	}
				}
				console.log(strength)
			  	if(0 < strength &&  strength <=1 ){
			  		this.isLow = true
	  				this.isMid = false
	  				this.isHigh = false
		  		}else if(1 < strength && strength <=2 ){
		  			this.isMid = true
		  			this.isHigh = false
	  			}else if(2 < strength && strength<=3 ){
	  				this.isHigh = true
	  			}else{
	  				this.isLow = false
	  				this.isMid = false
	  				this.isHigh = false
	  			}
			}
		},
		methods: {
			getForm: function () {
				console.log("手机号："+this.phoneNum);
				console.log("密码："+this.pws);
			}
		}
	}
</script>