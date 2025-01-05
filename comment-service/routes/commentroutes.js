// comment-service/routes/comment.routes.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database connection setup

// Add a comment to a blog post
router.post('/', async (req, res) => {
    const { content, author_id, blog_post_id } = req.body;

    const result = await db.query('INSERT INTO comment (content, author_id, blog_post_id) VALUES ($1, $2, $3) RETURNING *', [content, author_id, blog_post_id]);

    res.status(201).json(result.rows[0]);
});

// List comments for a specific blog post
router.get('/', async (req, res) => {
    const { post_id } = req.query;

    const result = await db.query('SELECT * FROM comment WHERE blog_post_id = $1 ORDER BY created_at DESC', [post_id]);

    res.json(result.rows);
});

module.exports = router;
