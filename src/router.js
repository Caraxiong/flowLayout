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
		}
	]
}