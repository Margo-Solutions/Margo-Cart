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

// create a vare //
app.post('/margosolutions/varer', async (req, res) => {
    try {
        const { vare_navn } = req.body;
        const newVare = await pool.query(
            'INSERT INTO varer(vare_navn) VALUES($1) RETURNING *', 
            [vare_navn]
        );
        res.json(newVare.rows[0]);
        } catch (err) {3
        console.error(err.message);
    }   
});
// create a handleliste //
app.post('/margosolutions/handlelister:handleliste_tittel', async (req, res) => {
    try {
        const { handleliste_tittel} = req.body;
        const newHandleliste = await pool.query(
            'INSERT INTO handlelister(handleliste_tittel) VALUES($1) RETURNING *',  
            [handleliste_tittel]
        );
        res.json(newHandleliste.rows[0]);
        } catch (err) {3
        console.error(err.message);
    }   
});
app.post('/margosolutions/handlelister:vare_id', async (req, res) => {
    try {
        const { vare_id} = req.body;
        const newVareID = await pool.query(
            'INSERT INTO handlelister(vare_id) VALUES($1) RETURNING *',  
            [vare_id]
        );
        res.json(newVareID);
        } catch (err) {3
        console.error(err.message);
    }   
});



// get alle varer //
app.get('/margosolutions/varer', async (req, res) => {
    try {
        const varer = await pool.query('SELECT * FROM varer');
        res.json(varer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get alle handlelister // 
app.get('/margosolutions/handlelister', async (req, res) => {
    try {
        const handlelister = await pool.query('SELECT * FROM handlelister');
        res.json(handlelister.rows);
    } catch (err) {
        console.error(err.message);
    }
});
// get a vare //
app.get('/margosolutions/varer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const varer = await pool.query('SELECT * FROM varer WHERE id = $1', [id]);
        res.json(varer.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get a handleliste //
app.get('/margosolutions/handlelister/:handleliste_id', async (req, res) => {
    try {
        const { handleliste_id } = req.params;
        const handleliste = await pool.query('SELECT * FROM handlelister WHERE handleliste_id = $1', [handleliste_id]);
        res.json(handleliste.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});


// update a vare //
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
// update a handleliste //
app.put('/margosolutions/handlelister/:handleliste_id', async (req, res) => {
    try {
        const { handleliste_id } = req.params;
        const { handleliste_tittel } = req.body;
        const updateHandleliste = await pool.query(
            'UPDATE handlelister SET handleliste_tittel = $1 WHERE handleliste_id = $2',
            [handleliste_id, handleliste_tittel]
        );
        res.json('Vareliste was updated!');
    } catch (err) {
        console.error(err.message);
    }
});
// update a handleliste //
app.put('/margosolutions/handlelister/', async (req, res) => {
    try {
        const { handleliste_id } = req.body;
        const { vare_id } = req.body;
        const updateVareId = await pool.query(
            'UPDATE handlelister SET vare_id = $1 WHERE handleliste_id = $2',
            [vare_id, handleliste_id,]
        );
        res.json('Vareliste was updated!');
    } catch (err) {
        console.error(err.message);
    }
});
// delete a vare //
app.delete('/margosolutions/varer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteVare = await pool.query('DELETE FROM varer WHERE id = $1', [id]);
        res.json('Vare was deleted!');
    } catch (err) {
        console.error(err.message);
    }
});
// delete a handleliste //
app.delete('/margosolutions/handlelister/:handleliste_id', async (req, res) => {
    try {
        const { handleliste_id } = req.params;
        const deleteHandleliste = await pool.query('DELETE FROM handlelister WHERE handleliste_id = $1', [handleliste_id]);
        res.json('Vare was deleted!');
    } catch (err) {
        console.error(err.message);
    }
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
    }
);
