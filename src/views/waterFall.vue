<template>
	<div class="wf-main">
		<div class="pic" v-for="item in imgLists">
			<div class="img">
				<img :src="item.src">
			</div>
		</div>
	</div>
</template>
<script>
	require('../style/wf.scss');
	import axios from 'axios'
	module.exports = {
		data: function(){
			return {
				imgLists:[],
				num:0
			}
		},
		//模板编译/挂在之后（不保证组件已在document中）
		mounted: function(){
			//已在document中
			this.$nextTick(function (){
				this.getImgs()
				window.addEventListener('scroll', this.scrollPage);
			})
		},
		updated: function(){
			let winW = document.body.clientWidth || document.documentElement.clientWidth
			let picW = document.querySelector('.pic').offsetWidth
			this.num = Math.floor(winW/picW)
			let mainW = this.num * picW
			document.querySelector('.wf-main').style.width = mainW + 'px'
		},
		// directives: {
		// 	width: {
		// 		inserted:function (el,vnode){
		// 		}
		// 	}
		// },
		// watch:{
		// 	imgLists:function(val){
		// 		return 1
		// 	}
		// },
		computed: {
			// let arr = []
			// this.imgLists.forEach((item,val) => {
			// 	if(item.index < this.num){
			// 		arr.push(item)
			// 	}else{
					
			// 	}
			// })
		},
		methods: {
			getImgs: function() {
				axios.get('src/data/wf.json')
					.then((res) => {
						this.imgLists = res.data
					})
			}
		}
	}
</script>