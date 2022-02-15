import { Router } from 'express';
import { getPosts, createPost, voteUpPost, voteDownPost } from '../../controllers/post/post.controller';
import { TokenValidation } from '../../middleware/verifyToken';
import { createComment, deleteComment } from '../../controllers/post/comment.controller';
const router = Router();

router.route('/')
    .get(getPosts)
    .post(TokenValidation, createPost);

// Actions

router.route('/action/voteUp/:postId')
    .put(TokenValidation, voteUpPost);

router.route('/action/voteDown/:postId')
    .put(TokenValidation, voteDownPost);

// Comments
router.route('/action/comment/:postId')
    .put( TokenValidation, createComment )
    .delete( TokenValidation, deleteComment );

export default router;