import { SOCKET_ON_RTC } from './enum.js'
/**
 * rtc 监听
 * @param socket 初始后的socket
 */
export default function SocketRtc(socket) {
  // 接收到《接收者》发送candidate连接成功消息，转发给《接收者》
  socket.on(SOCKET_ON_RTC.CANDIDATE, (room, candidate) => {
    socket.to(room).emit(SOCKET_ON_RTC.CANDIDATE, candidate)
  })
  // 接收到《发起者》发送offer，转发给《接收者》
  socket.on(SOCKET_ON_RTC.OFFER, (room, offer) => {
    socket.to(room).emit(SOCKET_ON_RTC.OFFER, offer)
  })
  // 接收到《接收者》发送answer，转发给《发起者》
  socket.on(SOCKET_ON_RTC.ANSWER, (room, answer) => {
    socket.to(room).emit(SOCKET_ON_RTC.ANSWER, answer)
  })
}
