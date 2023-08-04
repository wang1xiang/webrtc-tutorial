const btnConnect = document.querySelector('button#connect')
const btnLeave = document.querySelector('button#leave')
const inputArea = document.querySelector('textarea#input')
const btnSend = document.querySelector('button#send')

let socket
let room
let username

btnConnect.onclick = () => {
  room = document.querySelector('input#room').value
  username = document.querySelector('input#username').value
  // 连接server 携带username和room
  socket = io('http://localhost:80', {
    query: { username, room },
  }).connect()

  socket.on('user_list', (userList) => {
    console.log('当前房间用户列表', userList)
    btnConnect.disabled = true
    btnLeave.disabled = false
    inputArea.disabled = false
    btnSend.disabled = false
  })

  socket.on('leave', (room, user) => {
    console.log(`${user}从房间${room}离开`)
    btnConnect.disabled = false
    btnLeave.disabled = true
    inputArea.disabled = true
    btnSend.disabled = true

    socket.disconnect()
  })

  socket.on('message', (room, data) => {
    const outputArea = document.querySelector('textarea#output')
    outputArea.scrollTop = outputArea.scrollHeight //窗口总是显示最后的内容
    outputArea.value = outputArea.value + data + '\r'
  })

  socket.on('disconnect', () => {
    btnConnect.disabled = false
    btnLeave.disabled = true
    inputArea.disabled = true
    btnSend.disabled = true
  })
}

btnSend.onclick = () => {
  var data = inputArea.value
  data = username + ':' + data
  socket.emit('message', room, data)
  inputArea.value = ''
}

btnLeave.onclick = () => {
  socket.emit('leave', room, username)
}
