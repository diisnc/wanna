var bodyParser = require('body-parser')
const httpStatus = require('http-status');
const { UserMessage } = require('../models'); 
const { User } = require('../models')



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
        const result = await UserMessage.getMessages(req.query.idContact,req.user.username,req.query.idPost);
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

exports.getPhoto = async function (req, res, next){
    try{
        const result = await User.getPhoto(req.query.idContact);
        return res.json(result);
    }catch(e){
        next(e);
    }
}