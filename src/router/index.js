import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Question from '~v/Question';
import Stats from '~v/Stats';
import E404 from '~v/E404';

let routes = [
	{
		path: '/',
		redirect: '/questions/1'
	},
	{
		name: 'question',
		path: '/questions/:id',
		component: Question
	},
	{
		name: 'stats',
		path: '/statistics',
		component: Stats
	},
	{
		path: '*',
		component: E404
	}
];

export default new VueRouter({
	mode: 'history',
	routes
});