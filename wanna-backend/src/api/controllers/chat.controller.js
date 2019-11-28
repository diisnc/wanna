var bodyParser = require('body-parser')
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

exports.getMessages = async (req, res, next) => {
    try{
        console.log("AAWDAWDAWDWADWADWADWADAWDAW");
        const result = await UserMessage.getMessages(req.query.idContact, req.query.idPost);
        return res.json(result);
    }catch(e){
        next(e);
    }
}

exports.getContacts = async (req, res, next) => {
    try{
        const result = await UserMessage.getContacts(req.user.username);
        return res.json(result);
    }catch(e){
        next(e);
    }
}