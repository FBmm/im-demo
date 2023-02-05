const express = require('express')
const app = express()
// 将服务器 app绑定到http实例上
const http = require('http').Server(app)
// 传递http服务器实例对象来初始化 socket.io 的新实例
// http模块监听传入socket的 connection 事件，并将其记录到控制台
const io = require('socket.io')(http)


const users = []

const rooms = []

const msgs = []

// io绑定事件 connection建立连接 断开链接 disconnected
io.on('connection', socket => {
  console.log('一个用户建立链接');
  // socket绑定事件，客户端触发了addCart事件，发送数据data
  socket.on('send', (msg) => { 
    msgs.push(msg)
    console.log('接收消息', msg)
    io.emit('message', {
      msgs
    })
  })

  socket.on('history', () => { 
    console.log('查询历史消息')
    socket.emit('message', {
      msgs
    })
  })

  socket.on('start', (user) => { 
    const userInfo = {
      name: user,
      uId: parseInt(Math.random() * 1000000000000000)
    }
    users.push(userInfo)
    console.log('加入用户', user)
    socket.emit('started', userInfo)
    io.emit('trigger', {
      type: 'user-list',
      data: users
    })
  })

  socket.on('users', () => { 
    console.log('查询用户', )
    io.emit('user-list', {
      users
    })
  })
})

http.listen(3000, () => {
  console.log('ws server 启动成功, 监听3000端口');
})