<template>
  <!-- <header class="header">一对一音视频聊天</header> -->
  <main class="main">
    <RTCVideo @streamSuccess="streamSuccess" @leave="leave" v-if="showRTCVideo" />
    <Login @join="handleJoin" v-else />
  </main>
</template>

<script setup>
import 'ant-design-vue/dist/reset.css'
import RTCVideo from './components/RTCVideo.vue'
import Login from './components/Login.vue'
import { ref } from 'vue'
import initSocket from './socket'
import adapter from 'webrtc-adapter';

let userInfo = {}
let socket 

const showRTCVideo = ref(false)
const handleJoin = (user) => {
  showRTCVideo.value = true
  userInfo = user
}
// 等待本地视频初始化完成后发送信令服务
const streamSuccess = ({ stream, remoteVideoRef }) => {
  const info = { ...userInfo, localStream: stream, remoteVideoRef }
  socket = initSocket(info)
}
const leave = () => {
  socket.disconnect()
  showRTCVideo.value = false
}

</script>

<style lang="css" scoped>
.header {
  color: #fff;
  font-size: 28px;
  height: 120px;
  line-height: 120px;
  margin-bottom: 15px;
}
.main {
  height: calc(100vh - 250px);
  padding: 0 20px;
}
</style>
