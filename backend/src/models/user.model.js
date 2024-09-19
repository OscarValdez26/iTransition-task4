import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    lastLogin:{
        type: String,
        default:'Never'
    },
    // registrationTime:{
    //     type: Date,
    // },
    status:{
        type: String,
        default:"Unblocked",
    },
},{
    timestamps: true,
}
);

export default mongoose.model('User', userSchema);