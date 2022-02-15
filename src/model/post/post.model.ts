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
    voteUp: [
        {
            username: String,
            createdAt: String,
        }
    ],
    voteDown: [
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
    comments: Comment[],
    voteUp: VoteUp[],
    voteDown: VoteDown[],
    user: ObjectId,
}

interface Comment {
    id?: ObjectId;
    body: string;
    username: string;
    createdAt: string;
}

interface VoteUp {
    username: string;
    createdAt: string;
}

interface VoteDown {
    username: string;
    createdAt: string;
}

export default model<Post>('Post', postSchema);