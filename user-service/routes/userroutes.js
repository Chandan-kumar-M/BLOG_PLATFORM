// user-service/routes/user.routes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Database connection setup

// Register a new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await db.query('INSERT INTO user (username, password_hash) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
    
    res.status(201).json(result.rows[0]);
});

// Authenticate a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const result = await db.query('SELECT * FROM user WHERE username = $1', [username]);
    
    if (result.rows.length > 0 && await bcrypt.compare(password, result.rows[0].password_hash)) {
        const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Retrieve user details
router.get('/users/:id', async (req, res) => {
    const result = await db.query('SELECT * FROM user WHERE id = $1', [req.params.id]);
    
    if (result.rows.length > 0) {
        res.json(result.rows[0]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Edit an existing user (update password as an example)
router.put('/users/:id', async (req, res) => {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await db.query('UPDATE user SET password_hash = $1 WHERE id = $2 RETURNING *', [hashedPassword, req.params.id]);
    
    if (result.rows.length > 0) {
        res.json(result.rows[0]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete a specific user
router.delete('/users/:id', async (req, res) => {
    const result = await db.query('DELETE FROM user WHERE id = $1 RETURNING *', [req.params.id]);
    
    if (result.rowCount > 0) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
