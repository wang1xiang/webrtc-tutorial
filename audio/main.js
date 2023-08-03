const audioDOM = document.querySelector('#audio')

const onSuccess = (stream) => {
  const audioTracks = stream.getAudioTracks()
  console.log('音频设备: ' + audioTracks[0].label)
  // 播放音频轨道获取的流
  audioDOM.srcObject = stream
}

const onError = (error) => console.log(error)

const constraints = {
  audio: true,
  video: false,
}
// 访问媒体设备
navigator.mediaDevices
  .getUserMedia(constraints)
  .then(onSuccess)
  .catch(onError)
