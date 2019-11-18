var bodyParser = require('body-parser')
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
const httpStatus = require('http-status');
const { UserMessage } = require('../models'); 


exports.sendMessage = async (idSender, idReceiver, idPost, message) => {
    try{
        const userMessage = await UserMessage.create({
            idSender: idSender,
            idReceiver: idReceiver,
            messageText: message,
            idPost: idPost,
        });
    return res.status(httpStatus.CREATED).json(userMessage);
    } catch(e) {
        next(e);
    }
}