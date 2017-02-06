const Vue = require('vue');
const VueRouter = require('vue-router');
const VueResource = require('vue-resource');
const App = require('./app.vue');
Vue.use(VueRouter);
Vue.use(VueResource);
const router = new VueRouter(require('./router'));
new Vue({
	el:'#app',
	router:router,
	render:h => h(App)
})