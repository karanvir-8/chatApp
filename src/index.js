const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const server =  http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;
const { generateMessage,generateLocationMessage } = require('../src/utils/messages')
const Filter = require('bad-words')
const cors = require ('cors');
const { addUser,removeUser,getUser,getUsersInRoom } = require('./utils/users')
var count =0;
var name = '';
var group = '';
app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{ 
 // res.header('Access-Control-Allow-Credentials', true);
  res.send('hello world');  
});

app.post('/loginCredentials',(req,res)=>{
  // console.log(req.body);
   name  = req.body.name;
   group = req.body.group;
   res.send(req.body);
});

io.on('connection',(socket) =>{
    
    socket.on('join',({username,room},callback)=>{
     // group = room;
     //console.log(username)
      const {error,user} = addUser({ id:socket.id , username , room})

      if(error){
         return callback(error);
      }

      socket.join(user.room);
      socket.emit('message',generateMessage('Admin','Welcome'))
      socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username} has joined!`));
      io.to(user.room).emit('roomData',{
        room:user.room,
        users:getUsersInRoom(user.room)
      })
      callback();
    })
    
    socket.on('value',(value,callback)=>{
        const user  = getUser(socket.id); 
        const filter = new Filter();
    
        if(filter.isProfane(value)){
          return callback('BC Galan na kad')
        }
        io.to(user.room).emit('message',generateMessage(user.username,value));
        callback('Message Delivered');
    });

    socket.on('location',(loc,callback)=>{
      const user = getUser(socket.id);
      console.log(user)
      io.to(user.room).emit('location',generateLocationMessage(user.username,loc));
      callback('Location Shared!')
    });

    socket.on('disconnect',()=>{
      const user = removeUser(socket.id);
      if(user){
        io.to(user.room).emit('message',generateMessage('Admin',`${user.username} has left`));
        io.to(user.room).emit('roomData',{
          room : user.room,
          users:getUsersInRoom(user.room)
        })
      }
      
    });

    

})

server.listen(port, () => 
           console.log(`app listening at http://localhost:${port}`));   