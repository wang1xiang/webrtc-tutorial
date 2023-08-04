/** RTC消息类型 */
export const SOCKET_ON_RTC = {
  /** 建立连接 */
  CANDIDATE: 'candidate',
  /** 发起者发送offer */
  OFFER: 'offer',
  /** 接收者发送answer */
  ANSWER: 'answer',
}
/** 系统消息类型 */
export const SOCKET_ON_SYS = {
  /** 连接socket */
  CONNECTION: 'connection',
  /** 断开socket */
  DISCONNECT: 'disconnect',
}
/** socket消息类型 */
export const SOCKET_EMIT = {
  /** 人数 */
  SYS_USER_LIST: 'userlist',
  /** 离开房间 */
  LEAVE: 'leave',
}
