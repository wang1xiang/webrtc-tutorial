<template>
  <a-modal :open="visible" title="用户信息" :closable="false">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '用户名必填' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item
        label="房间号"
        name="room"
        :rules="[{ required: true, message: '房间号必填' }]"
      >
        <a-input v-model:value="formState.room" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button html-type="submit" type="primary" @click="handleOk"
        >加入房间</a-button
      >
    </template>
  </a-modal>
</template>

<script setup>
import { ref, reactive, toRaw } from 'vue'

const emits = defineEmits(['join'])

const formState = reactive({
  username: '',
  room: '',
})
const formRef = ref(null)

const visible = ref(true)
const handleOk = () => {
  formRef.value.validate().then(async () => {
    const values = toRaw(formState)
    emits('join', values)
    visible.value = false
  })

}
</script>

<style lang="css" scoped></style>
