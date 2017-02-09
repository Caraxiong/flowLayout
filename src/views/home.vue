<template>
	<div class="ali-main-market">
		<div class="home-p">
			<a href="javascript:void(0)" class="home-li" v-for = "item in imgList">
				<span :data-imag="item.img" :data-ie8img="item.ie8img" :style="{'background-image':'url('+item.img+')'}" :class="{hover:isHover}"></span>
			</a>
		</div>
	</div>
</template>
<script>
	require('../style/home.scss');
	import axios from 'axios'
	module.exports = {
		data: function(){
			return {
				imgList: [],
				isHover:false,
				indexBanner_isIE9: false
			}
		},
		mounted: function(){
			this.$nextTick(function (){
				this.getMsg()
			})
		},
		methods: {
			getMsg: function(){
				axios.get('src/data/home.json')
					.then((res) => {
						this.imgList = res.data
					})
			}
		}
	}
</script>