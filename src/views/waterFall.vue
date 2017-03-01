<template>
	<div class="wf-main">
		<div class="pic" v-for="item in imgLists" ref="img">
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
			})
		},
		updated: function(){
			this.$nextTick(function (){
				let winW = document.body.clientWidth || document.documentElement.clientWidth
				let picW = document.querySelector('.pic').offsetWidth
				this.num = Math.floor(winW/picW)
				let mainW = this.num * picW
				document.querySelector('.wf-main').style.width = mainW + 'px'
				this.sortImgs()
			})
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
		// computed: {
			
		// },
		methods: {
			getImgs: function() {
				axios.get('src/data/wf.json')
					.then((res) => {
						this.imgLists = res.data
					})
			},
			//图片排位置
			sortImgs: function() {
				let _this = this
				setTimeout(function(){
					let arr = []
					let imgs = _this.$refs.img
					let imgsW = imgs[0].offsetWidth
					for(let i = 0;i < imgs.length;i++){
						if(i < _this.num){
							arr.push(imgs[i].offsetHeight)
						}else{
							let minH = Math.min.apply(null,arr)
							let index
							arr.forEach((item,i) => {
								if(item == minH){
									index = i
									return
								}
							})
							imgs[i].style.position = 'absolute'
							imgs[i].style.top = minH + 'px'
							imgs[i].style.left = imgsW * index + 'px'
							// imgs[i].style.left = imgs[index].offsetLeft + 'px'
							arr[index] += imgs[i].offsetHeight
						}
					}
				},100)
			}
		}
	}
</script>