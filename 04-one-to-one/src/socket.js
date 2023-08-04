import { rtcConfig } from './constants'
import { io } from 'socket.io-client'
import { SOCKET_ON_RTC, SOCKET_EMIT } from './enum'

// 开始接听rtc协议连接
const initSocket = ({
  username,
  room,
  remoteVideoRef,
  localPc,
  remotePc,
  localStream,
}) => {
  // 连接server 携带username和room
  const socket = io('http://localhost:80', {
    query: { username, room },
  }).connect()

  // 当有人加入房间时
  socket.on(SOCKET_EMIT.SYS_USER_LIST, async (res) => {
    // 房间少于两人时 对方掉线 则关闭对方视频
    if (res.length < 2) {
      let video = remoteVideoRef.value.$el
      video.srcObject = null
      return
    }
    username === res[0]?.username ? sendOffer('sender') : sendOffer('receiver')
  })

  // 接收offer创建answer转发
  socket.on(SOCKET_ON_RTC.OFFER, async (res) => {
    console.log(`接收到offer`)
    // 创建 answer
    const remoteDesc = res.data
    remotePc = new RTCPeerConnection(rtcConfig)
    await remotePc.setRemoteDescription(remoteDesc)
    let remoteAnswer = await remotePc.createAnswer()
    await remotePc.setLocalDescription(remoteAnswer)
    socket.emit(SOCKET_ON_RTC.ANSWER, room, {
      data: remoteAnswer,
      callType: res.callType,
    })
  })
  // 接收answer
  socket.on(SOCKET_ON_RTC.ANSWER, async (res) => {
    let remoteAnswer = res.data
    // 完善本地remote描述
    await localPc.setRemoteDescription(remoteAnswer)
  })
  // candidate回调
  socket.on(SOCKET_ON_RTC.CANDIDATE, async (res) => {
    // 回调显示
    if (!remoteVideoRef.value) return
    let video = remoteVideoRef.value.$el
    remotePc.ontrack = (e) => {
      video.srcObject = e.streams[0]
      video.oncanplay = () => video.play()
    }
    // 添加ice
    const candidate = res.data
    await remotePc.addIceCandidate(candidate)
  })

  const sendOffer = async (callType) => {
    // 初始化当前视频
    localPc = new RTCPeerConnection(rtcConfig)
    // 添加RTC流
    localStream.getTracks().forEach((track) => {
      localPc.addTrack(track, localStream)
    })
    // 给当前RTC流设置监听事件(协议完成回调)
    localPc.onicecandidate = (event) => {
      console.log('localPc:', event.candidate, event)
      // 回调时，将自己candidate发给对方，对方可以直接addIceCandidate(candidate)添加可以获取流
      if (event.candidate)
        socket.emit(SOCKET_ON_RTC.CANDIDATE, room, {
          data: event.candidate,
          callType,
        })
    }
    // 发起方：创建offer(成功将offer的设置当前流，并发送给接收方)
    let offer = await localPc.createOffer()
    // 建立连接，此时就会触发onicecandidate，然后注册ontrack
    await localPc.setLocalDescription(offer)
    socket.emit(SOCKET_ON_RTC.OFFER, room, {
      data: offer,
      callType,
    })
  }

  return socket
}

export default initSocket
