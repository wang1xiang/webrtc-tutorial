<template>
  <img @click="handleClick" :src="src" class="track-img" />
</template>

<script setup>
import { computed, ref } from 'vue'
import audio from '../assets/audio.svg'
import audioDisabled from '../assets/audio-disabled.svg'
import camera from '../assets/camera.svg'
import cameraDisabled from '../assets/camera-disabled.svg'
import leave from '../assets/leave.svg'
import message from '../assets/message.svg'
const props = defineProps({
  source: String,
  initialState: Boolean,
})
const emits = defineEmits(['onChange'])

const enabled = ref(true)
const handleClick = () => {
  enabled.value = !enabled.value
  emits('onChange', enabled.value)
}

const src = computed(() => {
  switch (props.source) {
    case 'microphone':
      return enabled.value ? audio : audioDisabled
    case 'camera':
      return enabled.value ? camera : cameraDisabled
    case 'leave':
      return leave
    case 'message':
      return message
    default:
      return undefined
  }
})
</script>

<style lang="css" scoped>
.track-img {
  cursor: pointer;
  width: 20px;
  height: 20px;
}
</style>
