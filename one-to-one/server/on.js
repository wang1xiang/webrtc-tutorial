import { SOCKET_EMIT, SOCKET_ON_RTC } from './enum.js'
/**
 * rtc 监听
 * @param socket 初始后的socket
 * @param clients  全部用户
 */
export default function SocketRtc(socket, clients) {
  // 接收到《接收者》发送candidate连接成功消息，转发给《接收者》
  socket.on(SOCKET_ON_RTC.CANDIDATE, (room, data) => {
    let params = {
      data: data.data,
      callType: data.callType,
    }
    socket.to(room).emit(SOCKET_ON_RTC.CANDIDATE, params)
  })
  // 接收到《发起者》发送offer，转发给《接收者》
  socket.on(SOCKET_ON_RTC.OFFER, (room, data) => {
    let params = {
      data: data.data,
      callType: data.callType,
    }
    socket.to(room).emit(SOCKET_ON_RTC.OFFER, params)
  })
  // 接收到《接收者》发送answer，转发给《发起者》
  socket.on(SOCKET_ON_RTC.ANSWER, (room, data) => {
    let params = {
      data: data.data,
      callType: data.callType,
    }
    socket.to(room).emit(SOCKET_ON_RTC.ANSWER, params)
  })
}
