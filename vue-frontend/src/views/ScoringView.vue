<template>
  <div style="padding-top:40px">
    <n-card v-if="!loading">
      <div v-if="user.name">
        <h1
          style="margin-bottom: 0px; margin-top: 0px"
        >
          {{ user.name }}
        </h1>
        <h2
          style="margin-top: 0px"
        >
          Score: {{ user.score }}
        </h2>
      </div>
      <div
        v-else-if="data.isAdmin"
        style="margin-bottom: 20px"
      >
        <n-input
          v-model:value="newName"
          type="text"
          size="large"
          placeholder="Name"
        />
        <h3 style="margin-top: 8px;margin-bottom: 4px">
          Starting Social Score
        </h3>
        <n-button
          :type="startScore == 25 ? 'primary' : ''"
          style="margin-right: 8px"
          size="medium"
          @click="startScore = 25"
        >
          25
        </n-button>
        <n-button
          :type="startScore == 50 ? 'primary' : ''"
          style="margin-right: 8px"
          size="medium"
          @click="startScore = 50"
        >
          50
        </n-button>
        <n-button
          :type="startScore == 75 ? 'primary' : ''"
          style="margin-right: 8px"
          size="medium"
          @click="startScore = 75"
        >
          75
        </n-button>
        <br>
        <n-button
          type="primary"
          style="margin-top: 20px"
          size="large"
          @click="registerUser"
        >
          SAVE
        </n-button>
      </div>
      <n-image
        width="300"
        :src="qrCode"
        style="margin-bottom: 30px"
        preview-disabled
      />
      <br>
      <div v-if="user.score != null && (data.isAdmin || data.isVoter)">
        <h3 style="margin-top: 0px;margin-bottom: 4px">
          Social Score
        </h3>
        <n-button
          :disabled="hasVoted"
          type="error"
          style="margin-right: 8px"
          size="medium"
          @click="vote(-10)"
        >
          -10
        </n-button>
        <n-button
          :disabled="hasVoted"
          type="error"
          style="margin-right: 8px"
          size="medium"
          @click="vote(-5)"
        >
          -5
        </n-button>
        <n-button
          :disabled="hasVoted"
          type="error"
          style="margin-right: 8px"
          size="medium"
          @click="vote(-3)"
        >
          -3
        </n-button>
        <n-button
          :disabled="hasVoted"
          type="primary"
          style="margin-right: 8px"
          size="medium"
          @click="vote(3)"
        >
          +3
        </n-button>
        <n-button
          :disabled="hasVoted"
          type="primary"
          style="margin-right: 8px"
          size="medium"
          @click="vote(5)"
        >
          +5
        </n-button>
        <n-button
          :disabled="hasVoted"
          type="primary"
          size="medium"
          @click="vote(10)"
        >
          +10
        </n-button>
      </div>
    </n-card>
  </div>
</template>
<script setup>
import router from '../router';
import { useDataStore } from '@/stores/data';
import { onMounted, ref } from 'vue';
//import { useMessage } from "naive-ui";
import { useApolloClient } from '@vue/apollo-composable';
import { GET_USER_BY_ID_QUERY, REGISTER_USER_MUTATION, EDIT_USER_MUTATION } from '@/graphql';

//const message = useMessage();
const data = useDataStore();
const { resolveClient } = useApolloClient();
const client = resolveClient();
const socialId = router.currentRoute.value.params.id;
const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://becreative.distillation.dev/rating/${socialId}`;
const user = ref({});
const loading = ref(true);
const startScore = ref(50);
const newName = ref('');
const hasVoted = ref(false);

async function fetchUser() {
	await client.query({
		query: GET_USER_BY_ID_QUERY,
		variables: { id: socialId },
	}).then((data, error) => {
		if(error){
			console.log(error);
		}else{
			if(data.data.getUserById != null){
				user.value = data.data.getUserById;
			}
			loading.value = false;
		}
	});
}

async function registerUser(){
	const newUser = {
		name: newName.value,
		score: startScore.value,
		socialId: socialId,
	};
	await client.mutate({
		mutation: REGISTER_USER_MUTATION,
		variables: {
			input: newUser,
		},
	}).then((res) => {
		console.log(res);
	});
	user.value = newUser;
}

async function vote(value){
	hasVoted.value = true;
	const newUser = {
		_id: user.value._id,
		name: user.value.name,
		score: user.value.score,
		socialId: user.value.socialId
	};
	newUser.score += value;
	if(newUser.score > 100){
		newUser.score = 100;
	}else if(newUser.score < 0){
		newUser.score = 0;
	}
	await client.mutate({
		mutation: EDIT_USER_MUTATION,
		variables: {
			input: newUser,
		},
	});
	user.value = newUser;
}

onMounted(() => {
	fetchUser();
});


</script>
<style lang="sass" scoped>
.n-card
    max-width: 560px
    display: flex
    flex-wrap: wrap
    align-content: center
    text-align: center
</style>
