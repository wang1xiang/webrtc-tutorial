import { rtcConfig } from './constants'
import { io } from 'socket.io-client'
import { SOCKET_ON_RTC, SOCKET_EMIT } from './enum'
import openDataChannel from './dataChannel'

// 开始接听rtc协议连接
const initSocket = ({ username, room, remoteVideoRef, localStream }) => {
  let localPc
  // 连接server 携带username和room
  const socket = io('http://localhost:3333', {
    path: '/rtc',
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
    if (username === res[0]?.username) sendOffer()
  })

  socket.on('close', (error) => {
    console.log(error)
  })

  // 接收offer创建answer转发
  socket.on(SOCKET_ON_RTC.OFFER, async (offer) => {
    console.log(`接收到offer`, offer)
    sendAnswer(offer)
  })
  // 接收answer
  socket.on(SOCKET_ON_RTC.ANSWER, async (answer) => {
    console.log(`接收到answer`, answer)
    // 完善本地remote描述
    await localPc.setRemoteDescription(answer)
  })
  // candidate回调
  socket.on(SOCKET_ON_RTC.CANDIDATE, async ({ pc, candidate }) => {
    console.log(`接收到${pc}candidate`, candidate)
    // 回调显示
    if (!remoteVideoRef.value) return
    let video = remoteVideoRef.value.$el
    localPc.ontrack = (e) => {
      video.srcObject = e.streams[0]
      video.oncanplay = () => video.play()
    }

    // 添加ice
    await localPc.addIceCandidate(candidate)
  })

  const sendOffer = async () => {
    // 初始化当前视频
    localPc = new RTCPeerConnection(rtcConfig)
    openDataChannel(localPc, username)
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
          pc: 'local',
          candidate: event.candidate,
        })
    }

    // 发起方：创建offer(成功将offer的设置当前流，并发送给接收方)
    let offer = await localPc.createOffer()
    // 建立连接，此时就会触发onicecandidate，然后注册ontrack
    await localPc.setLocalDescription(offer)
    socket.emit(SOCKET_ON_RTC.OFFER, room, offer)
  }
  const sendAnswer = async (offer) => {
    localPc = new RTCPeerConnection(rtcConfig)
    openDataChannel(localPc, username)
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
          pc: 'remote',
          candidate: event.candidate,
        })
    }
    await localPc.setRemoteDescription(offer)
    const answer = await localPc.createAnswer()
    await localPc.setLocalDescription(answer)
    socket.emit(SOCKET_ON_RTC.ANSWER, room, answer)
  }

  return socket
}

export default initSocket
