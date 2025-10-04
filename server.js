const express = require('express');
const db=require('./database.js');
const app=express();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
app.use(express.json());

const SECRET_KEY="your_secret_key";

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run("INSERT INTO user (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const token = jwt.sign({ id: this.lastID }, SECRET_KEY);
        res.status(201).json({ token });
    });
});
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM user WHERE email = ?", [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user.id }, SECRET_KEY);
        res.json({ token });
    });
});
app.get("/", (req, res) => {
  res.send("Node.js + SQLite Auth Server is running!");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
