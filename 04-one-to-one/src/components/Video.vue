<template>
  <video
    class="video"
    ref="VideoRef"
  >
    <source type="video/mp4" />
  </video>
</template>
<script setup>
import { ref } from "vue";

const VideoRef = ref();
const setSrc = (src) => {
  VideoRef.value.srcObject = src;
};
defineExpose({ setSrc });
</script>
<style lang="css" scoped>
.video {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
}
</style>
