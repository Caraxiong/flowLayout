module.exports = {
	routes: [
		{
			path:'/about',
			// component:require('./views/about.vue')
			component: resolve => require.ensure([], () => resolve(require('./views/about.vue')), 'about')
		}
	]
}