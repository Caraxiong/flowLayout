<template>
	<div class="ali-main-market">
		<div class="home-p">
			<a href="javascript:void(0)" class="home-li" v-for = "item in imgList" @mouseover="trans($event ,1)" @mouseout="trans($event ,-1)">
				<span :class="{hover:isHover}" :style="{'background-image':'url('+item.img+')'}"></span>
			</a>
		</div>
		<div>
			<div id="test" class="progress">0%</div>
			<input type="button" value="Run" @click="scrollBar"/>
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
				isHover:false
			}
		},
		mounted: function(){
			this.$nextTick(function (){
				this.getMsg()
			})
		},
		methods: {
			getMsg: function() {
				axios.get('src/data/home.json')
					.then((res) => {
						this.imgList = res.data
					})
			},
			scrollBar: function() {
				window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

				var ele = document.getElementById("test");
				var progress = 0;

				function step(timestamp) {
				    progress += 1;
				    ele.style.width = progress + "%";
				    ele.innerHTML=progress + "%";
				    if (progress < 100) {
				        requestAnimationFrame(step);
				    }
				}
				requestAnimationFrame(step);
				// document.getElementById("run").addEventListener("click", function() {
				//     ele.style.width = "1px";
				//     progress = 0;
				//     requestAnimationFrame(step);
				// }, false);
			},
			trans: function(event, num){
				window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				var bgY = 0;
				var distance = 75;
				var multiple = 60;
				var timeFactor;

				function step(timestamp) {
			    	event.target.style.backgroundPositionY = -(bgY * distance) + 'px'
				}
				function stepAdd(timestamp) {
					bgY += 1;
					bgY < multiple ? (step(),timeFactor = requestAnimationFrame(stepAdd)) : cancelAnimationFrame(timeFactor);
				}
				function stepMinus(timestamp) {
					bgY -= 1;
					bgY > 0 ? (step(),timeFactor = requestAnimationFrame(stepMinus)) : cancelAnimationFrame(timeFactor);

				}
				cancelAnimationFrame(timeFactor);
				if(num > 0){
					requestAnimationFrame(stepAdd);
				}else{
					requestAnimationFrame(stepMinus);
				}
				
			}
		}
	}
</script>