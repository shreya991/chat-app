//node serverwhich will handle socket.io connection

const io=require('socket.io')(8000,{
    cors:{
        origin:'*',
    }
})
const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined',username=>{
        console.log("New user",username);
        users[socket.id]=username;
        socket.broadcast.emit('user-joined',username);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,username:users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})