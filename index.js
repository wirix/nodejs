const path = require('path')
const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead('200', {
      'Content-Type': 'text/html; charset=utf-8'
    })
    if (req.url === '/') {
      fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf-8', (err, content) => {
        if (err) throw new Error(err.message)
        res.end(content)
      })
    } else if (req.url === '/about') {
      fs.readFile(path.join(__dirname, 'views', 'about.html'), 'utf-8', (err, content) => {
        if (err) throw new Error(err.message)
        res.end(content)
      })
    }
  } else if (req.method === 'POST') {
    res.writeHead('200', {
      'Content-Type': 'text/html; charset=utf-8'
    })
    req.on('data', (data) => {
      res.end(`
        <h1>ВОт ответ: ${Buffer.from(data).toString().split('=')[1]}</h1>
      `)
    })
  }
})

server.listen(3000, () => {
  console.log('ВСе гуд')
})