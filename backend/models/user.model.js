import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    subscription: {
        type: String,
        enum: ["none", "monthly", "yearly"],
        default: "none",
    },
    subscriptionStatus: {
        type: String,
        enum: ["inactive", "active", "expired"],
        default: "inactive",
    },
    subscriptionExpiry: {
        type: Date,
    },
    selectedCharity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Charity",
    },
    charityPercentage: {
        type: Number,
        default: 10,
    },
    profilePicture: {
        type: String,
        default: ""
    },
   
    about: {
        type: String,
        default: "I am GolfHeroes"
    },
}, {
    timestamps: true,

});
const User = mongoose.model("User", userSchema);

export default User;