import { RequestHandler } from 'express';
import Post from '../../model/post/post.model';
export const createComment: RequestHandler = async( req, res ) => {

    try {

        const { body } = req.body;
        
        const post = await Post.findById( req.params.postId );

        if ( post ) {

            post.comments.unshift({
                body,
                username: req.name,
                createdAt: new Date().toISOString()
            });

            await post.save();

            res.status(201).send( post );

        } else {
            res.status(404).send('Post not found');
        }

    } catch ( ex ) {
        res.status(401).send( ex );
    }

}

export const deleteComment: RequestHandler = async( req, res ) => {

    try {
        
        const post = await Post.findById( req.params.postId );

        if ( post ) {

            const commentIndex = post.comments.findIndex(( c ) => c.id === req.body.commentId );

            if ( post.comments[commentIndex].username === req.name ) {
                post.comments.splice(commentIndex, 1);
                await post.save();
                res.status(201).send( post );
            } else {
                res.status(401).send({ msg: 'Action not allowed' });
            }

        } else {
            res.status(401).send({ msg: 'Post not found' });
        }

    } catch ( ex ) {
        
    }

}