<template>
	<div>
		<div class="banner-container dark">
			<div class="inner-banner-container dark">
				<div class="banner-group" v-for="(item,index) in slideList" :class="{'active':index == curIndex}" @mouseover = "stopSlide()" @mouseout = "loopSlide()" @mousemove="moveImg($event)">
					<div ref='div' class="inner-banner-group">
						<div class="banner-row">
							<div class="layer w-100" v-if="item.img">
								<img :src="item.img">
							</div>
							<div class="layer w-pic" v-if="!item.img">
								<div class="layer1">
									<img :src="item.img1">
								</div>
								<div class="layer2">
									<img :src="item.img2">
								</div>
								<div class="layer3">
									<img :src="item.img3">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ul class="banner-menus">
				<li class="banner-menu" v-for="(item,index) in slideList" :class="{'active':index == curIndex}" @click="changeSlide(index)">
				</li>
			</ul>
		</div>
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
				slideList: [],
				interValTime: '',
				isHover:false,
				curIndex:0,
				moveX:'',
				moveY:'',
				lastMoveX:'',
				lastMoveY:''
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
						this.slideList = res.data.slideList

						//运行slide
						this.loopSlide()
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
				
			},
			//循环运行slide
			loopSlide: function(){
				this.interValTime = setInterval(() => {
					this.curIndex += 1
					if(this.curIndex >= this.slideList.length){
						this.curIndex = 0
					}
				},5000);
			},
			changeSlide: function(index) {
				clearInterval(this.interValTime)
				this.curIndex = index
				this.loopSlide()
			},
			stopSlide: function(){
				clearInterval(this.interValTime)
				
			},
			moveImg: function(e){
				// 动画效果
				let w =  document.body.clientWidth
				let h =  document.body.clientHeight
				this.moveX = (e.pageX/w - .5)*this.lastMoveX || 10
				this.moveY = -(e.pageY/h - .5)*this.lastMoveX  || 10
				this.lastMoveX = this.moveX
				this.lastMoveX = this.moveY
				this.$refs.div[this.curIndex].style.transform ="rotateX("+this.moveX+"deg) rotateY("+this.moveY+"deg)"
				console.log(this.$refs.div[this.curIndex].style.transform)
			}
		}
	}
</script>