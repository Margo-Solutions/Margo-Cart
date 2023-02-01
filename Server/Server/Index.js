const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
app.use(express.static('public'));
let PORT =process.env.PORT || 5000;
//const path = require('path');

app.use(cors());
app.use(express.json());

// ROUTES //

// create a user //
app.post('/margodatabase', async (req, res) => {
    try {
        const { navn, email, passord } = req.body;
        const newKunde = await pool.query(
            'INSERT INTO kunder (navn, email, passord) VALUES($1, $2, $3) RETURNING *', 
            [navn, email, passord]
        );
        res.json(newKunde.rows[0]);
        } catch (err) {3
        console.error(err.message);
    }   
});

// get all handleliste //
app.get('/handleliste', async (req, res) => {
    try {
        const allHandleliste = await pool.query('SELECT * FROM handleliste');
        res.json(allHandleliste.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// get a handleliste //
app.get('/handleliste/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const handleliste = await pool.query('SELECT * FROM handleliste WHERE id = $1', [id]);
        res.json(handleliste.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a handleliste //
app.put('/handleliste/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { handleliste } = req.body;
        const updateHandleliste = await pool.query(
            'UPDATE handleliste SET handleliste = $1 WHERE id = $2',
            [handleliste, id]
        );
        res.json('Handleliste was updated!');
    } catch (err) {
        console.error(err.message);
    }
});

// delete a handleliste //
app.delete('/handleliste/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteHandleliste = await pool.query('DELETE FROM handleliste WHERE id = $1', [id]);
        res.json('Handleliste was deleted!');
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
    }
);
