const videoDOM = document.querySelector('#video')

const onSuccess = (stream) => {
  const videoTracks = stream.getVideoTracks()
  console.log('视频设备: ' + videoTracks[0].label)
  const audioTracks = stream.getAudioTracks()
  console.log('音频设备: ' + audioTracks[0].label)
  // 播放轨道获取的流
  videoDOM.srcObject = stream
}

const onError = (error) => console.log(error)

const constraints = {
  audio: true,
  video: true,
}
// 访问媒体设备
navigator.mediaDevices
  .getUserMedia(constraints)
  .then(onSuccess)
  .catch(onError)
