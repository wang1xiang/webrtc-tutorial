// 客户端管理类
export default class Clients {
  data = []
  constructor(initArray = []) {
    this.data = initArray
  }
  add(user) {
    if (!user || !user.username) return
    if (this.data.some((v) => v.username === user.username)) {
      return false
    }
    this.data.push(user)
    return true
  }
  remove(username) {
    this.data = this.data.filter((c) => username !== c.username)
  }
  get(username) {
    return this.data.find((c) => c.username === username)
  }
}
