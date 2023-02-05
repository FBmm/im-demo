const express = require('express')
const dayjs = require('dayjs')
const app = express()
// 将服务器 app绑定到http实例上
const http = require('http').Server(app)
// 传递http服务器实例对象来初始化 socket.io 的新实例
// http模块监听传入socket的 connection 事件，并将其记录到控制台
const io = require('socket.io')(http)

const userImgMap = {
  1: 'https://wuqianqian.cn/public/img/man2.jpg',
  2: 'https://wuqianqian.cn/public/img/woman1.jpg',
}

const users = []

const msgStore = new Map

// io绑定事件 connection建立连接 断开链接 disconnected
io.on('connection', socket => {
  console.log('一个用户建立链接');

  socket.on('send', (roomId, msg) => { 
    console.log('发送消息', roomId, msg)
    if (!roomId || !msg) return
    const getMsgInfo = () => {
      return {
        ...msg,
        time: dayjs(new Date()).format('YYYY/MM/DD hh:mm:ss')
      }
    }
    const msgs = msgStore.get(roomId)
    console.log(msgs)
    if (!msgs || !msgs.length) {
      msgStore.set(roomId, [getMsgInfo()])
    } else {
      msgs.push(getMsgInfo())
    }

    // 广播消息
    io.to(roomId).emit('message-update', msgStore.get(roomId));
  })

  // 查询历史消息
  socket.on('history', () => { 
    console.log('查询历史消息')
    socket.emit('message', {
      msgs
    })
  })

  // 开始聊天
  socket.on('start', (user) => {
    console.log('started1', user)
    const findUser = () => {
      return users.find(item => item.info.usernick === user.usernick && item.info.code === user.code)
    }
    let exsitUser = findUser()
    console.log('started2', exsitUser)
    if (!exsitUser) {
      console.log('新加入用户', user.usernick)
      user.userImg = userImgMap[user.sex]
      const userInfo = {
        info: user,
        uId: parseInt(Math.random() * 1000000000000000)
      }
      exsitUser = userInfo
      users.push(userInfo)
    }
    socket.emit('started', exsitUser)
    io.emit('trigger', {
      type: 'user-list',
      data: users
    })
  })

  // 进入房间
  socket.on('room', ([id1, id2] = []) => {
    console.log('用户进入房间', id1)
    const roomId = id1 < id2 ? `${id1}_${id2}` : `${id2}_${id1}`;
    socket.join(roomId);
    socket.emit('room-ok', {
      id: roomId,
      data: msgStore.get(roomId) // 聊天记录列表
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