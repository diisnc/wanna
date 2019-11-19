const controller = require('./api/controllers/chat.controller.js');

exports.socketHandler = async (io) =>{
    //controller.socketCon();
    //const nsp = io.of('/v1/chat');

    io.on('connection', socket => {
        console.log('Received a socket connection!');

        

        //Usig rooms for private communication

        //setting up a room for private coms
        socket.on('subscribe', function(room) {
            console.log('joining room', room);
            socket.join(room);
            //needs to return the previous messages if there's any
        });

        //broadcast the message to the other user in the room
        socket.on('chat-message', async function(data) {
            console.log('sending room post', data.room);
            socket.broadcast.to(data.room).emit('conversation private post', {
                message: data.message
            });
            //console.log(data.idSender + " " + data.idReceiver + " "  + data.idPost + " " + data.message);
            await controller.sendMessage(data.idSender, data.idReceiver, data.idPost, data.message);
        });
        

        socket.emit('chat-message','Hello World');
        socket.on('other event', function (data){
            console.log(data);
        })
    });

}