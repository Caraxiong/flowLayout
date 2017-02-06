<template>
	<div>
		<ul class="addr-list">
			<li v-for="item in dataList">{{item.name}}</li>
		</ul>
		<a href="javascript:void(0)">more</a>
	</div>
</template>
<script>
	require('../style/settlement.scss');
	module.exports = {
		data: function() {
			return {
				dataList:[]
			}
		},
		mounted: function(){
			this.$nextTick(function() {
				this.getList()
			})
		},
		methods: {
			getList: function() {
				this.$http.get('src/data/addr.json').then((res) => {
					console.log(res.data)
					this.dataList = res.data
				})
			}
		}
	}
</script>