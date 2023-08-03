/** 系统 on 消息 */
export const SOCKET_ON_SYS = {
  /** 连接socket */
  CONNECTION: 'connection',
  /** 断开socket */
  DISCONNECT: 'disconnect',
}
/** socket消息 */
export const SOCKET_EMIT = {
  /** 用户列表 */
  SYS_USER_LIST: 'user_list',
  /** 发送消息 */
  MESSAGE: 'message',
  /** 离开房间 */
  LEAVE: 'leave',
}