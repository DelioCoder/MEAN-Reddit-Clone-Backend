import { RequestHandler } from 'express';
import Post from '../../model/post/post.model';
export const getPosts: RequestHandler = async (req, res) => {

    try {

        const posts = await Post.find();

        res.status(201).send(posts);

    } catch (ex) {
        res.status(401).send(ex);
    }

}
export const createPost: RequestHandler = async (req, res) => {

    try {

        const newPost = new Post({
            body: req.body.body,
            username: req.name,
            createdAt: new Date().toISOString(),
            user: req.userId
        });

        const postCreated = await newPost.save();

        res.status(201).send(postCreated);

    } catch (ex) {
        res.status(401).send(ex);
    }

}
export const deletePost: RequestHandler = async (req, res) => {

    try {

        const { postId } = req.body;

        const post = await Post.findById(postId);

        if (req.name === post?.username) {
            await post.delete();
            return 'Post deleted successfully';
        } else {
            res.status(401).send({ msg: "Nothing to delete" });
        }

    } catch (ex) {
        res.status(401).send(ex);
    }

}
export const voteUpPost: RequestHandler = async (req, res) => {

    try {

        //const { postId } = req.body;

        const post = await Post.findById( req.params.postId );

        if (post) {

            if (post.voteUp.find(vote => vote.username === req.name)) {
                post.voteUp = post.voteUp.filter((vote) => vote.username !== req.name);
            } else {
                post.voteUp.push({
                    username: req.name,
                    createdAt: new Date().toISOString()
                });
            }
            await post.save();
            res.status(201).send(post);

        } else {
            res.status(401).send({ msg: "There's not post founded" });
        }

    } catch (ex) {
        res.status(401).send( ex );
    }

}

export const voteDownPost: RequestHandler = async( req, res ) => {

    try {
        
        //const { postId } = req.body;

        const post = await Post.findById( req.params.postId );

        if (post) {

            if (post.voteDown.find(vote => vote.username === req.name)) {
                post.voteDown = post.voteDown.filter((vote) => vote.username !== req.name);
            } else {
                post.voteDown.push({
                    username: req.name,
                    createdAt: new Date().toISOString()
                });
            }
            await post.save();
            res.status(201).send(post);

        } else {
            res.status(401).send({ msg: "There's not post founded" });
        }

    } catch ( ex ) {
        res.status(401).send(ex);
    }
    
}