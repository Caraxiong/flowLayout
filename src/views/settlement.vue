<template>
	<div>
		<ul class="addr-list">
			<li v-for="(item, index) in lessDataList" :class="{hover: index == currentIndex }" @click="currentIndex = index">{{item.name}}</li>
		</ul>
		<a href="javascript:void(0)" @click="limitLen = dataList.length">more</a>
	</div>
</template>
<script>
	require('../style/settlement.scss');
	module.exports = {
		data: function() {
			return {
				dataList: [],
				limitLen: 3,
				currentIndex: 0
			}
		},
		computed: {
			lessDataList: function() {
				return this.dataList.slice(0, this.limitLen);
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
					this.dataList = res.data
				})
			}
		}
	}
</script>