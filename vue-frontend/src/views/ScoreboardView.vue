<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>
            <h1
              class="tableHead"
              style="margin-right: 30vw"
            >
              Naam
            </h1>
          </th>
          <th style="text-align: right">
            <h1 class="tableHead">
              Score
            </h1>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user._id"
        >
          <td>
            <h2 class="tableText">
              {{ user.name }}
            </h2>
          </td>
          <td style="text-align: right">
            <h2 class="tableText">
              {{ user.score }}
            </h2>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
//import { useAuthStore } from "@/stores/auth";
//import { useMessage } from "naive-ui";
import { useApolloClient } from '@vue/apollo-composable';
import { GET_ALL_USERS_QUERY } from '@/graphql';

//const message = useMessage();
//const auth = useAuthStore();
const { resolveClient } = useApolloClient();
const client = resolveClient();
const users = ref({});

async function fetchUsers() {
	await client.query({
		query: GET_ALL_USERS_QUERY,
	}).then((data) => {
		users.value = data.data.getAllUsers;
	});
}

onMounted(() => {
	fetchUsers();
});
</script>
<style lang="sass" scoped>
table
  width: 100%

.tableHead
  font-size: 8vw
  margin-top: 0vh
  margin-bottom: 0vh

.tableText
  font-size: 5vh
  margin-top: 0vh
  margin-bottom: 0vh
</style>
