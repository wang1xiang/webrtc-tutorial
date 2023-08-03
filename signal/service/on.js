import { SOCKET_EMIT } from './enum.js'
import logger from './logger.js'
/**
 * rtc 监听
 * @param socket socket
 * @param clients 用户
 */
export default function SocketRtc(socket, clients) {
  socket.on(SOCKET_EMIT.MESSAGE, (room, data) => {
    logger.debug(`收到消息: ${data}, 来自于房间: ${room}`)
    socket.to(room).emit(SOCKET_EMIT.MESSAGE, room, data)
  })

  socket.on(SOCKET_EMIT.LEAVE, (room, username) => {
    socket.leave(room)
    logger.debug(`离开房间: ${username}, 来自于房间: ${room}`)

    socket.emit(SOCKET_EMIT.LEAVE, room, socket.id)
  })
}
