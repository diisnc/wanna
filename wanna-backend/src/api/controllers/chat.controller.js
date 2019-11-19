var bodyParser = require('body-parser')
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
const httpStatus = require('http-status');
const { UserMessage } = require('../models'); 



exports.sendMessage = async (idSender, idReceiver, idPost, message) => {
    try{
        await UserMessage.create({
            idSender: idSender,
            idReceiver: idReceiver,
            messageText: message,
            idPost: idPost,
        });
    } catch(e) {
       console.error(e);
    }
}

exports.getMessages = async (idUser, idPost) => {
    try{
        const result = await UserMessage.getMessages(idUser, idPost);
        return result;
    }catch(e){
        console.error(e);
    }
}