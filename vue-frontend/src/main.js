import { createApp, provide, h } from 'vue';
import {
	DefaultApolloClient,
	provideApolloClient,
} from '@vue/apollo-composable';
import App from './App.vue';
import naive from 'naive-ui';
import { createPinia } from 'pinia';
import router from './router';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
// import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

// const httpLink = createHttpLink({
// 	// You should use an absolute URL here
// 	uri: "http://localhost:4000/graphql",
// });

const uploadLink = createUploadLink({
	uri: 'https://becreative.distillation.dev/graphql',
	//uri: 'http://localhost:6969/graphql',
});

// const authLink = setContext((_, { headers }) => {
// 	// get the authentication token from local storage if it exists
// 	const token = localStorage.getItem('token');
// 	// return the headers to the context so httpLink can read them
// 	return {
// 		headers: {
// 			...headers,
// 			authorization: token ? token : '',
// 		},
// 	};
// });

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
	link: uploadLink,
	cache,
});

provideApolloClient(apolloClient);

const app = createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},

	render: () => h(App),
});

app.use(naive).use(createPinia()).use(router).mount('#app');
