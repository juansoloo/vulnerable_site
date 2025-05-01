const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post('/', async (req, res) => {
  const { title, body, author } = req.body;
  const newPost = new Post({ title, body, author });
  await newPost.save();
  res.status(201).json(newPost);
});

router.post('/:id/comments', async (req, res) => {
  const { author, content } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  post.comments.push({ author, content });
  await post.save();
  res.status(201).json(post);
});

module.exports = router;
