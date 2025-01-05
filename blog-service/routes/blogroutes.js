// blog-service/routes/blog.routes.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Database connection setup

// Create a new blog post
router.post('/', async (req, res) => {
    const { title, content, author_id } = req.body;
    
    const result = await db.query('INSERT INTO blog (title, content, author_id) VALUES ($1, $2, $3) RETURNING *', [title, content, author_id]);
    
    res.status(201).json(result.rows[0]);
});

// List all blog posts with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const offset = (page - 1) * limit;
    
    const result = await db.query('SELECT * FROM blog ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);
    
    res.json(result.rows);
});

// Fetch a specific blog post by ID
router.get('/:id', async (req, res) => {
    const result = await db.query('SELECT * FROM blog WHERE id = $1', [req.params.id]);
    
    if (result.rows.length > 0) {
        res.json(result.rows[0]);
    } else {
        res.status(404).json({ message: 'Blog post not found' });
    }
});

// Edit an existing blog post
router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    
    const result = await db.query('UPDATE blog SET title = $1, content = $2 WHERE id = $3 RETURNING *', [title, content, req.params.id]);
    
    if (result.rows.length > 0) {
        res.json(result.rows[0]);
    } else {
        res.status(404).json({ message: 'Blog post not found' });
    }
});

// Delete a specific blog post
router.delete('/:id', async (req, res) => {
    const result = await db.query('DELETE FROM blog WHERE id = $1 RETURNING *', [req.params.id]);
    
    if (result.rowCount > 0) {
        res.json({ message: 'Blog post deleted successfully' });
    } else {
        res.status(404).json({ message: 'Blog post not found' });
    }
});

module.exports = router;
