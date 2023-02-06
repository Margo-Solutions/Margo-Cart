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

// create a todo //
app.post('/margosolutions', async (req, res) => {
    try {
        const { vare_navn } = req.body;
        const newVare = await pool.query(
            'INSERT INTO varer (vare_navn) VALUES($1) RETURNING *', 
            [vare_navn]
        );
        res.json(newVare.rows[0]);
        } catch (err) {3
        console.error(err.message);
    }   
});

// get all handleliste //
app.get('/margosolutions', async (req, res) => {
    try {
        const varer = await pool.query('SELECT * FROM varer');
        res.json(varer.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// get a handleliste //
app.get('/margosolutions/varer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const varer = await pool.query('SELECT * FROM varer WHERE id = $1', [id]);
        res.json(varer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a handleliste //
app.put('/margosolutions/varer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { vare_navn } = req.body;
        const updateVare = await pool.query(
            'UPDATE varer SET vare_navn = $1 WHERE id = $2',
            [vare_navn, id]
        );
        res.json('Vareliste was updated!');
    } catch (err) {
        console.error(err.message);
    }
});

// delete a handleliste //
app.delete('/margosolutions/varer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteVare = await pool.query('DELETE FROM varer WHERE id = $1', [id]);
        res.json('Vare was deleted!');
    } catch (err) {
        console.error(err.message);
    }
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
    }
);
