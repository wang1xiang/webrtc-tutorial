<template>
  <div class="rtc-video">
    <section class="local-video">
      <Video ref="localVideoRef"></Video>
    </section>
    <section class="remote-video">
      <Video ref="remoteVideoRef"></Video>
    </section>
    <RTCDataChannel v-show="showDataChannel" />
  </div>
  <div class="footer">
    <button className="audio">
      <TrackToggle
        source="microphone"
        :initialState="true"
        @onChange="onAudioChange"
      />
    </button>
    <button className="video">
      <TrackToggle
        source="camera"
        :initialState="true"
        @onChange="onVideoChange"
      />
    </button>
    <button className="message">
      <TrackToggle
        source="message"
        :initialState="true"
        @onChange="onMessageShow"
      />
    </button>
    <button className="leave">
      <TrackToggle source="leave" :initialState="true" @onChange="onLeave" />
    </button>
  </div>
</template>

<script setup>
import Video from './Video.vue'
import { ref, onMounted } from 'vue'
import RTCDataChannel from './RTCDataChannel.vue'
import TrackToggle from './TrackToggle.vue'

const emits = defineEmits(['streamSuccess', 'leave'])

const audioEnabled = ref(true)
const videoEnabled = ref(true)
const onAudioChange = (enabled) => {
  audioEnabled.value = enabled
  initVideo(localVideoRef.value.$el)
}
const onVideoChange = (enabled) => {
  videoEnabled.value = enabled
  initVideo(localVideoRef.value.$el)
}

const showDataChannel = ref(false)
const onMessageShow = () => (showDataChannel.value = !showDataChannel.value)
const onLeave = () => emits('leave')
const remoteVideoRef = ref(null)

const localVideoRef = ref(null)
onMounted(() => initVideo(localVideoRef.value.$el))
// 初始化本地视频
const initVideo = async (video) => {
  if (!video) return
  try {
    let config = {
      video: videoEnabled.value,
      audio: audioEnabled.value,
    }
    // userMediaConfig ,getDisplayMedia共享屏幕
    let stream = await navigator.mediaDevices.getUserMedia(config)
    video.srcObject = stream
    emits('streamSuccess', { stream, remoteVideoRef })
    video.play()
  } catch (e) {
    console.log(`error: `, e)
  }
}
</script>

<style lang="css" scoped>
.rtc-video {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 400px;
  padding: 20px;
}
.local-video,
.remote-video {
  width: 30%;
  height: 100%;
}
.remote-video {
  margin: 0 12px;
}
.footer {
  height: 100px;
  margin-top: 15px;
}

.audio,
.video,
.message,
.leave {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  margin: 0 4px;
  background-image: none;
  background-color: #1e1e1e;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  text-indent: 0px;
  text-shadow: none;
  outline: none;
}
.audio:hover,
.video:hover {
  background-color: #2b2b2b;
}
.leave {
  background-color: rgb(249, 31, 49);
}
</style>
