
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const session = require('express-session')
const cookieParser = require('cookie-parser')

//routes
const dashboard = require('./api/routes/dashboard')
const search = require('./api/routes/search')

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

//session
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 },
  resave: true,
    saveUninitialized: true
}));

//Routes which should handle requests
app.use('/api/dashboard',dashboard)
app.use('/api/search',search)

// // errro control
// app.use((req, res, next)=>{
//   const error = new Error('Not found');
//   error.status=404;
//   next(error);
// });

// app.use((error,req,res,next)=>{
//   res.status(error.status || 500);
//   res.json({
//       error:{
//           message: error.message
//       }
//   });
// });

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
