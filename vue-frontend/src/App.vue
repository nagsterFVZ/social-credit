<template>
  <n-loading-bar-provider>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 200px"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-input
          v-model:value="code"
          type="text"
          placeholder="0000"
          pattern="\d*"
        />
        <n-button
          size="large"
          type="primary"
          style="margin-top: 16px"
          @click="login"
        >
          LOGIN
        </n-button>
      </n-card>
    </n-modal>
    <n-layout
      position="absolute"
    >
      <n-layout-header
        bordered
        style="height: 64px"
      >
        <div id="nav">
          <div
            id="nav-title"
            @click="$router.push('/')"
          >
            <h2><span style="color: #4700d6">Be</span>Creative Experience</h2>
          </div>
          <n-space
            id="nav-end"
            :size="[0, 0]"
          >
            <n-button @click="showModal = true">
              Admin
            </n-button>
          </n-space>
        </div>
      </n-layout-header>
      <n-layout
        position="absolute"
        style="top: 64px; bottom: 64px"
        has-sider
      >
        <n-layout
          content-style="justify-items: center; display: grid;"
          :native-scrollbar="false"
        >
          <router-view />
        </n-layout>
      </n-layout>
      <n-layout-footer
        position="absolute"
        style="
                              height: 64px;
                              display: grid;
                              align-items: center;
                              padding-left: 5px;
                              padding-right: 5px;
                          "
        bordered
      >
        <div style="text-align: center">
          <span>This score is not important at all 😉</span>
        </div>
      </n-layout-footer>
    </n-layout>
  </n-loading-bar-provider>
</template>
<script>
import { ref } from 'vue';
    
import { useDataStore } from '@/stores/data';
    
export default {
	name: 'App',
	components: {},
	setup() {
		const data = useDataStore();
    
		return {
			showModal: ref(false),
			code: ref(''),
			data,
		};
	},
    
	data: () => ({}),
    
	mounted() {},
    
	methods: {
		login(){
			if(this.code == '1234'){
				this.code = '';
				this.showModal = false;
				this.data.setVoter();
			}else if(this.code = '9874'){
				this.code = '';
				this.showModal = false;
				this.data.isAdmin = true;
				this.data.setAdmin();
			}
		},
	},
};
</script>
    
<style lang="sass" scoped>
#nav
	display: flex;
	padding-left: 2vw;
	padding-right: 2vw;

#nav-end
	display: flex;
	margin-left: auto;
	align-items: center;
	height: 64px;
	margin-top: 0 !important;
	margin-bottom: 0 !important;

#nav-title
	display: flex;
	align-items: center;
	height: 64px;
	cursor: pointer;

#content
	align-items: center;
	justify-items: center;
	color: #f5f5f5;

.n-card
  max-width: 560px
  display: flex
  flex-wrap: wrap
  align-content: center
  text-align: center
</style>