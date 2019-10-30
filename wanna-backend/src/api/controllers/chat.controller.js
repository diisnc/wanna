var bodyParser = require('body-parser')
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
const httpStatus = require('http-status');
const { UserMessage } = require('../models'); 


exports.sendMessage = async (req, res, next) => {
    try{
        const userMessage = await UserMessage.create({
            sender: req.user.username,
            receiver: req.params.userName,
            messageText: req.body.messageText,
        });
    // TODO - criar canal bidirecional com sockets para updates em real time no front end
    return res.status(httpStatus.CREATED).json(userMessage);
    } catch(e) {
        next(e);
    }
}