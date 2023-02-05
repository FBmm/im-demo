const express = require('express');
const app = express();
const {connectDB} = require('./db/index')

connectDB()

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3001, () => {
  console.log('http server 启动成功, 监听3001端口');
});