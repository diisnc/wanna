const controller = require('./api/controllers/chat.controller.js');

exports.socketHandler = async (io) =>{
    //controller.socketCon();
    //const nsp = io.of('/v1/chat');

    io.on('connection', socket => {
        console.log('Received a socket connection!');

        
        
        //Usig rooms for private communication

        //setting up a room for private coms
        socket.on('subscribe', async function(data) {
            var room = data.idUser+data.idPost;
            console.log('joining room', room);
            socket.join(room);
            //needs to return the previous messages if there's any
            //var oldMessages = await controller.getMessages(data.idUser, data.idPost);
            //socket.broadcast.to(room).emit('previous-messages', oldMessages);
            //console.log(oldMessages);
        });

        //broadcast the message to the other user in the room
        socket.on('chat-message', async function(data) {
            console.log('sending room post', data.room);
            socket.broadcast.to(data.room).emit('chat-message', {
                message: data.message
            });
            //console.log(data.idSender + " " + data.idReceiver + " "  + data.idPost + " " + data.message);
            await controller.sendMessage(data.idSender, data.idReceiver, data.idPost, data.message);
        });
        
        socket.on('leave-room', async function(room) {
            console.log('disconnecting from room', room);
            socket.leave(room);
        })
        
    });

}