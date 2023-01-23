const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


app.use(cors());
app.use(express.json());

// ROUTES //

// create a todo //
app.post('/handleliste', async (req, res) => {
    try {
        const { handleliste } = req.body;
        const newHandleliste = await pool.query(
            'INSERT INTO handleliste (handleliste) VALUES($1) RETURNING *', 
            [handleliste]
        );
        res.json(newHandleliste.rows[0]);
        } catch (err) {
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


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});


