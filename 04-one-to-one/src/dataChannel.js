let dataChannel
const sendMessage = (username) => {
  const button = document.querySelector('.data-channel__button')
  const input = document.querySelector('.data-channel__input')
  button.disabled = false
  button.onclick = () => {
    if (!input.value) return
    const message = `${username}: ${input.value}`
    dataChannel?.send(message)
    input.value = ''
    receiveMessage(message)
  }
}
const receiveMessage = (message) => {
  const output = document.querySelector('.data-channel__output')
  output.scrollTop = output.scrollHeight //窗口总是显示最后的内容
  output.value = output.value + message + '\r'
}
const openDataChannel = (localPc, username) => {
  dataChannel = localPc.createDataChannel('test')
  // datachannel通道打开 开始发送消息
  dataChannel.onopen = () => sendMessage(username)
  localPc.ondatachannel = (event) => {
    // 成功拿到 RTCDataChannel
    const dataChannel = event.channel
    dataChannel.onmessage = (event) => receiveMessage(event.data)
  }
}

export default openDataChannel