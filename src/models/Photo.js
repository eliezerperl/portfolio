import mongoose from 'mongoose'

const {Schema} = mongoose

const photoSchema = new Schema({
    public_id : String,
    secure_id: String,
},
    { timestamps: true }
);

const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

export default Photo;