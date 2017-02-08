module.exports = {
	routes: [
		{
			path:'/about',
			// component:require('./views/about.vue')
			component: resolve => require.ensure([], () => resolve(require('./views/about.vue')), 'about')
		},
		{
			path:'/register',
			component: resolve => require.ensure([], () => resolve(require('./views/register.vue')), 'register')
		},
		{
			path:'/list',
			component: resolve => require.ensure([], () => resolve(require('./views/list.vue')), 'list')
		},
		{
			path:'/cart',
			component: resolve => require.ensure([], () => resolve(require('./views/cart.vue')), 'cart')
		},
		{
			path:'/settlement',
			component: resolve => require.ensure([], () => resolve(require('./views/settlement.vue')), 'settlement')
		},
		{
			path:'/home',
			component: resolve => require.ensure([], () => resolve(require('./views/home.vue')), 'home')
		}
	]
}