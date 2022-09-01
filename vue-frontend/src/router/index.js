import { createRouter, createWebHistory } from 'vue-router';
import ScoringView from '../views/ScoringView.vue';
import ScoreboardView from '../views/ScoreboardView.vue';

const routes = [
	{
		path: '/',
		name: 'scoreboard',
		component: ScoreboardView,
	},
	{
		path: '/rating/:id',
		name: 'rating',
		component: ScoringView,
		//beforeEnter: roleCheck,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
