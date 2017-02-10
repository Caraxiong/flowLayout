<template>
	<div>
		<ul class="aly-ul">
			<li v-for = "(item, index) in poemList" :class="{'odd': index%2==1,'even': index%2 ==0}" @mouseover="trans($event ,1, 175)" @mouseout="trans($event ,-1, 175)">
				<div class="aly-info">
					<h2>{{item.name}}</h2>
					<h3>{{item.poem}}</h3>
					<span>--{{item.author}}</span>
				</div>
				<div :style="{'background-image':'url('+item.bgImgT+')'}" class="aly-img"></div>
			</li>
		</ul>
		<div class="aly-p">
			<a href="javascript:void(0)" class="aly-li" v-for = "item in imgList" @mouseover="trans($event ,1,75)" @mouseout="trans($event ,-1,75)">
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
				poemList: [],
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
						this.imgList = res.data.iconList
						this.poemList = res.data.poemList
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
			trans: function(event, num, distance){
				window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
				var bgY = 0;
				var distance = distance;
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