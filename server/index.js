
const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 80
const session = require('express-session')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
console.log( process.env + '  '+ process.env.PORT)
//Config
const firebase_config = require('./config/firebase_config')
const firebase = require("firebase")
const firebaseconfig = {
  apiKey: "AIzaSyAIf-_a1OQrmblm06l5sN-Rxaxo_HjiXD0",
  authDomain: "like--project.firebaseapp.com",
  databaseURL: "https://like--project.firebaseio.com",
  projectId: "like-youtube-project",
  storageBucket: "like-youtube-project.appspot.com",
  messagingSenderId: "1025349820634"
}
firebase.initializeApp(firebaseconfig);

//routes
const dashboard = require('./api/routes/dashboard')
const search = require('./api/routes/search')
const list = require('./api/routes/list')
const auth = require('./api/routes/auth')

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//add header
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-Width, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  if(req.method==='OPSTIONS'){
      res.header('Access-Control-Allow-Mehtods','PUT, POST,PATH,DELETE,GET')
      return res.status(200).json({})
  }
  next()
})

//session
app.use(session({
  secret: 'recommanflkdg$#%@#^@#^K@#@GLOM#@OGOEOAMGMGMGGMGMREO#@%)@#^#Y#GMewvljnstring', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 1000 },
  resave: true,
    saveUninitialized: true
}));

//Routes which should handle requests
app.use('/api/dashboard',dashboard)
app.use('/api/search',search)
app.use('/api/list',list)
app.use('/api/auth',auth)

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
