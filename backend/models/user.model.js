import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        // validate: {
        //     validator: function (v) {
        //         return v.length >= 8;
        //     },
        //     message: 'Password length must be 8'
        // }
    },
    profileImage: {
        type: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
            default: []
        }
    ],
    likedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
            default: []
        }
    ],
    savedPosts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
            default: []   
        }
    ],
    refreshToken: {
        type: String
    },
}, { timestamps: true })

// updating time whenever changes are made
userSchema.pre('save', async function() {
    if(this.isModified()){
        this.updatedAt = Date.now()
    }
})

// hash the password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
})

// function to check password is correct
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// function to generate access token 
userSchema.methods.generateAccessToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// function to generate refresh token
userSchema.methods.generateRefreshToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);