import { defineStore } from 'pinia';
// import { GET_ALL_CHANNELS_QUERY, GET_ALL_PERSONALITIES_QUERY, GET_ALL_REPORT_REASONS_QUERY } from '@/graphql';
// import { useApolloClient } from '@vue/apollo-composable';

export const useDataStore = defineStore('data', {
	state: () => ({
		isVoter: localStorage.getItem('voter'),
		isAdmin: localStorage.getItem('admin'),
	}),
	getters: {
	},
	actions: {
		setVoter(){
			this.isVoter = true;
			localStorage.setItem('voter', true);
		},
		setAdmin(){
			this.isAdmin = true;
			localStorage.setItem('admin', true);
		}
	},
});
