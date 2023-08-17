<template>
  <div class="data-channel">
    <a-textarea disabled class="data-channel__output" />
    <a-textarea placeholder="请输入消息" class="data-channel__input" /><a-button
      disabled
      type="primary"
      class="data-channel__button"
      >发送</a-button
    >
  </div>
</template>

<script setup></script>

<style lang="css" scoped>
.data-channel {
  width: 30%;
  height: 100%;
}
.data-channel__input {
  width: calc(100% - 86px);
  margin-right: 8px;
  margin-top: 10px;
  height: 32px;
  resize: none;
}
.data-channel__output {
  width: 100%;
  line-height: 1.5;
  height: calc(100% - 42px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: #1e1e1e;
  color: #fff;
  resize: none;
}
.data-channel__button {
  color: #fff;
}
</style>
