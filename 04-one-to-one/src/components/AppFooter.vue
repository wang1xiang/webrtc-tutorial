<template>
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
  <button className="leave">
    <TrackToggle source="leave" :initialState="true" @onChange="onLeave" />
  </button>
</template>

<script setup>
import { ref } from 'vue'
import TrackToggle from './TrackToggle.vue'
const audioEnabled = ref(false)
const videoEnabled = ref(false)
const onAudioChange = (enabled) => {
  audioEnabled.value = enabled
}
const onVideoChange = (enabled) => {
  videoEnabled.value = enabled
  // showVideo()
}
const onLeave = () => {
  console.log('leave')
}
</script>

<style lang="css" scoped>
.audio,
.video,
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
