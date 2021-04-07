<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div>
    <nav>
      <!-- <span to="/chat" v-on:click="'chat'">Chat</span> -->
      <a href="?page=chat">Chat</a>
      <a href="?page=call">Audio Call</a>
      <a href="?page=video">Video Call</a>
      <!-- <span to="/call" v-on:click="showPage = 'call'">Audio Call</span>
      <span to="/video" v-on:click="showPage = 'video'">Video Call</span> -->
      <!-- <span to="/chat" v-on:click="showPage = 'chat'">Chat</span>
      <span to="/call" v-on:click="showPage = 'call'">Audio Call</span>
      <span to="/video" v-on:click="showPage = 'video'">Video Call</span> -->
    </nav>

    <div>
      <div v-if="showPage == 'chat'">
        <TestChat />
      </div>
      <div v-if="showPage == 'call'">
        <TestAudio />
      </div>
      <div v-if="showPage == 'video'">
        <TestVideo />
      </div>
    </div>
  </div>
</template>

<script>
// import TestWebrtc from '@/components/TestWebrtc.vue'
import TestChat from '@/components/TestChat.vue'
import TestAudio from '@/components/TestAudio.vue'
import TestVideo from '@/components/TestVideo.vue'
// import router from '@/router'

export default {
  name: 'App',
  components: {
    TestChat,
    TestAudio,
    TestVideo
  },
  data() {
    return {
      showPage: 'chat',
    }
  },
  created() {
    var url = new URL(window.location.href);

    var route_name = url.searchParams.get('page');

    this.showPage = route_name;

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
nav > span {
    background: rgb(182, 39, 127);
  padding: 0.7rem 1rem;
  color: white;
  border-radius: 5px;
  font-weight: 800;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
nav > span:hover {
  cursor: pointer;
}
</style>
