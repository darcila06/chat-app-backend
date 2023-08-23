const {Schema, model} = require('mongoose');

const MessageSchema = Schema({
    de : {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    para : {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    message: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});


MessageSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    return object;
})



module.exports = model('Message', MessageSchema)