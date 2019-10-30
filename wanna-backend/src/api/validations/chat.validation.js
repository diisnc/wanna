const { param } = require('express-validator');
const { body } = require('express-validator');

module.exports = {
	//GET /v1/chat
    /*
    viewChat: [
		
    ],
    */
   //GET /v1/chat/:userName

   //POST /v1/chat/sendMessage/:userName
    sendMessage: [
        body('messageText', 'Message data is required').exists(),
		param('userName', 'User name is required').exists(),
    ],
	
};