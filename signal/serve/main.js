import { SOCKET_EMIT, SOCKET_ON_SYS } from './enum.js'
import SocketRtc from './on.js'
import initApp from './config.js'
import Clients from './clients.js'
import logger from './logger.js'

// 初始化应用
let io = initApp()
// 内存存储连接用户信息
let clients = new Clients()

// 监听连接
io.on(SOCKET_ON_SYS.CONNECTION, (socket) => {
  const { query } = socket.handshake
  // 获取socket连接参数 username和room
  const { username, room } = query

  // 添加到房间
  const nowUser = { userId: socket.id, username }
  clients.add(nowUser)
  // 房间管理
  socket.join(room)
  // 每次连接向房间发送用户列表
  io.to(room).emit(SOCKET_EMIT.SYS_USER_LIST, clients.data)
  // 收发消息事件
  SocketRtc(socket, clients)

  // 断开连接
  socket.on(SOCKET_ON_SYS.DISCONNECT, () => {
    logger.debug(`断开连接: ${username}`)
    clients.remove(nowUser.username)
    // 每次连接发送用户列表
    io.to(room).emit(SOCKET_EMIT.SYS_USER_LIST, clients.data)
  })
})
