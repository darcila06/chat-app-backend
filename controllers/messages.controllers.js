const { response } = require('express');
const Message = require ('../models/messsage')

const getChat = async(req, res = response) => {
    const miId = req.uid;
    const messageDe = req.params.de;

    const last30 = await Message.find({
        $or: [{de: miId, para:messageDe}, {de: messageDe, para: miId}]
    })
    .sort({createdAt: 'desc'})
    .limit(30)
    res.json({
        ok: true,
        msg: 'Hola Mensajes',
        messages: last30
    })
}

module.exports = {
    getChat
}