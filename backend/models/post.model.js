import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postImage: {
        type: String,
        // required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    }],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            text: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true })

// function to check if user already like a post
postSchema.methods.isLikedAlready = async function (userId) {
    return await this.likes.includes(userId)
}

// function to count number of likes
postSchema.methods.numberOfLikes = async function () {
    return await this.likes.length;
}

export const Post = mongoose.model("Post", postSchema);