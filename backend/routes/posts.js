const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// POST a new post
router.post('/', async (req, res) => {
  const { title, body, author } = req.body;
  try {
    const newPost = new Post({ title, body, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// POST a new comment to a post
router.post('/:id/comments', async (req, res) => {
  const { author, content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({ author, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// DELETE a comment from a post
router.delete('/:postId/comments/:commentId', async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).send('Post not found');

    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() === commentId
    );

    if (commentIndex === -1) return res.status(404).send('Comment not found');

    post.comments.splice(commentIndex, 1);
    await post.save();

    res.status(200).send('Comment deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
