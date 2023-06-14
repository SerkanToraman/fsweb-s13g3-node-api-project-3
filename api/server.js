//1I Imports
const express = require('express');
const server = express();
const usersRouter = require('./users/users-router')
const {logger}=require('./middleware/middleware')


// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

//2. middlewares
server.use(express.json());
server.use(logger)



//3. routers
// server.get('/', (req, res) => {
//   res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
// });
server.use('/api/users',usersRouter)


//4. Error handler Middleware.

server.use((err,req,res,next)=>{
  res
      .status(err.status || 500)
      .json({message: err.message || "Server error..."})
})

//5. exports

module.exports = server;
