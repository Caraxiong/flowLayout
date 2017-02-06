<template>
	<div>
		<table class="cart-table">
			<tr>
				<th></th>
				<th>商品图片</th>
				<th>商品名称</th>
				<th>单价（元）</th>
				<th>数量</th>
				<th>金额（元）</th>
				<th>操作</th>
			</tr>
			<tr v-for = "(item, index) in gridData" :key="item.id">
				<td>
					<input type="checkbox" class="ckb" @click="selectOne(item)" v-model="item.pChecked">
				</td>
				<td>
					<img :src="item.pImg" class="img">
				</td>
				<td>{{item.pName}}</td>
				<td>{{item.pPrice}}</td>
				<td>
					<a href="javascript:void(0);" class="minus" v-on:click="changeNum(item,-1)">-</a>
					<input type="number" class="num" v-model="item.pNum">
					<a href="javascript:void(0);" class="add" v-on:click="changeNum(item,1)">+</a>
				</td>
				<td>{{item.pNum * item.pPrice}}</td>
				<td>
					<a href="javascript:void(0);" class="operate" @click="deleteP(item)">删除</a>
				</td>
			</tr>
		</table>
		<div class="footer-bar">
			<label class="fl"><input type="checkbox" @click="selectAll()" v-model="isAllChecked">全选</label>
			<div class="fr">totle Money:{{totleMoney}}</div>
		</div>
		<div>
			<router-link to="/settlement">结算</router-link>
		<div>
	</div>
</template>
<script>
	require('../style/cart.scss');
	module.exports = {
		data: function() {
			return {
				gridData:[],
				totleMoney:0,
				isAllChecked:false
			}
		},
		mounted: function() {
			this.$nextTick(function (){
				this.getList()
			})
		},
		methods: {
			getList: function() {
				this.$http.get('src/data/cart.json').then((res) => {
					// this.$set('gridData',res.body.list)
					this.gridData = res.body.list
				})
			},
			changeNum: function(product,num) {
				if(num > 0){
					product.pNum += 1
				}else{
					product.pNum -= 1
					// 控制个数不能小于1
					if(product.pNum < 1){
						product.pNum = 1
					}
				}
				this.calcTotal()
			},
			selectOne: function(product) {
				if(product.pChecked == undefined){
					this.$set(product,'pChecked',true)
				}else{
					product.pChecked = !product.pChecked
				}
			},
			selectAll: function() {
				this.gridData.forEach((item,index) => {
					if(item.pChecked == undefined){
						this.$set(item,'pChecked',this.isAllChecked)
					}else{
						item.pChecked = this.isAllChecked
					}
				})
				this.calcTotal()
			},
			//计算总金额
			calcTotal: function() {
				this.totleMoney = 0
				this.gridData.forEach((item,index) => {
					if(item.pChecked){
						this.totleMoney += item.pNum * item.pPrice
					}else{
					}
				})
			},
			deleteP: function(item) {
				let index = this.gridData.indexOf(item);
				this.gridData.splice(index,1)
			}
		}
	}
</script>