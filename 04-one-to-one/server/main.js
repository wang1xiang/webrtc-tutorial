import { SOCKET_EMIT, SOCKET_ON_SYS } from './enum.js'
import SocketRtc from './on.js'
import initApp from './config.js'
import Clients from './clients.js'
// 初始化应用
let io = initApp()
// 内存存储连接用户信息
let clients = new Clients()

// 监听连接
io.on(SOCKET_ON_SYS.CONNECTION, function (socket) {
  const { query } = socket.handshake
  // 获取socket连接参数 username和room
  const username = query.username
  const room = query.room
  if (!room || !username) {
    console.log('未找到用户或房间')
    return
  }
  if (clients.get(username)) {
    console.log('用户已存在')
    return
  }
  if (clients.data?.length === 2) {
    console.log('仅支持两人加入房间')
    return
  }
  // 连接管理
  let nowUser = { userId: socket.id, username }
  clients.add(nowUser)
  // 房间管理
  socket.join(room)
  // 每次连接向房间发送用户列表
  io.to(room).emit(SOCKET_EMIT.SYS_USER_LIST, clients.data)
  // 管理rtc的监听事件
  SocketRtc(socket, clients)
  // 断开连接了
  socket.on(SOCKET_ON_SYS.DISCONNECT, () => {
    console.log(`----${username}----(断开连接)`)
    clients.remove(nowUser.username)
    // 每次连接发送用户列表
    io.to(room).emit(SOCKET_EMIT.SYS_USER_LIST, clients.data)
  })
})
