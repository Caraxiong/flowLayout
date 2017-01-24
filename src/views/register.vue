<template>
	<div class="pabel">
		<div class="label-box">
			<label>手机号：</label>
			<input type="text" v-model.number.trim="phoneNum" placeholder="请输入手机号">
		</div>
		<div class="label-box">{{phoneNum}}</div>
		<div class="label-box">
			<label>密码：</label>
			<input type="password" placeholder="请输入密码">
		</div>
		<div class="pws-level-bar">
			<span><i></i><i></i><i></i></span>
		</div>
		<div class="label-box">
			<button class="btn btn-l btn-b0 btn-r">注册</button>
		</div>
	</div>
</template>
<script>
	require('../style/register.scss')
	module.exports = {
		data: function () {
			return {
				phoneNum:''
			}
		}
	}
</script>