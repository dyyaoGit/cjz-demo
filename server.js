const fs = require('fs')
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

app.use(serve('dist'))

// 开启单页路由跳转
app.use(async (ctx) => {
  let htmlFile = await (new Promise(function (resolve, reject) {
    fs.readFile('./dist/index.html', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  }))
  ctx.type = 'text/html'
  ctx.body = htmlFile
})
var PORT = parseInt(process.env.port || 3002)

app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT, '\n\n\n\n\n\n')
})
