<template>
	<div>
		<div class="main">
			<router-link to="/about" class="link-1">about</router-link>
			<router-link to="/register" class="link-2">register</router-link>
			<router-link to="/list" class="link-3">list</router-link>
			<router-link to="/cart" class="link-4">cart</router-link>
		</div>
		<div>
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	require('./style/index.scss');
</script>