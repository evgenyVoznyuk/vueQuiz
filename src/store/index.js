import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import quiz from '~s/quiz.js';

export default new Vuex.Store({
	modules: {
		quiz
	},
	strict: process.env.NODE_ENV !== 'production'
});