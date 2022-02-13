import { Schema, model, ObjectId } from "mongoose";

const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    votes: [
        {
            username: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

interface Post {
    body: string,
    username: string,
    createdAt: string,
    comments: [
        {
            body: string,
            username: string,
            createdAt: string,
        }
    ],
    votes: [
        {
            username: string,
            createdAt: string,
        }
    ],
    user: ObjectId,
}

export default model<Post>('Post', postSchema);