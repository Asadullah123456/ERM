const Message = require('../models/messageModel');


const createMessage = async (req, res) => {
    try{
        const { receiverID, message, payLoad } = req.body;
        const mEssage = await Message.create({
            senderID: payLoad.userID,
            receiverID: receiverID,
            message: message
        });
        if(!mEssage){
            res.status(403).json({ message: 'Something wents Wrong' });
        }
        res.status(201).json({ message : mEssage });
    }
    catch(error){
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getSpecificMessages = async (req, res) => {
    try{
        const { receiverID, payLoad } = req.body;
        const messages = await Message.find({
            $or: [
              { senderID: payLoad.userID, receiverID: receiverID },
              { senderID: receiverID, receiverID: payLoad.userID }
            ]
          }).sort({ timestamp: 1 });

        if(!messages){
            return res.status(404).json({ message: 'No Messages Found!' });
        }
        res.status(200).json({ message: messages });
    }
    catch(err){
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    createMessage,
    getSpecificMessages
}