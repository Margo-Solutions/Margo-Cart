const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
app.use(express.static('public'));
const bcrypt = require('bcrypt');
let PORT =process.env.PORT || 5000;
const jwtGenerator = require('./utils/jwtGenerator');
const validInfo = require('./middleware/validInfo');
const authorization = require('./middleware/authorization');

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
app.get('/margodatabase', async (req, res) => {
    try {
        const kunder = await pool.query('SELECT * FROM kunder');
        res.json(kunder.rows);
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
// register and login route //
app.post('/margodatabase/register', validInfo, async (req, res) => {
    try {
        const { navn, email, passord } = req.body;
    
        const user = await pool.query(
            'SELECT * FROM kunder WHERE email = $1', [email]
        );
     if (user.rows.length !== 0) {
        return res.status(401).send('User already exists');
     }
        const saltrounds = 10;
        const salt = await bcrypt.genSalt(saltrounds);
        const bcryptPassword = await bcrypt.hash(passord, salt);

        const newUser = await pool.query(
            'INSERT INTO kunder (navn, email, passord) VALUES($1, $2, $3) RETURNING *',
            [navn, email, bcryptPassword]
        );
        const token = jwtGenerator(newUser.rows[0].id);
        res.json({ token });

    } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
    }
    });

    app.post('/margodatabase/login', validInfo, async (req, res) => {
        try {
            const { email, passord } = req.body;
            const user = await pool.query(
                'SELECT * FROM kunder WHERE email = $1', [email]
            );
            if (user.rows.length === 0) {
                return res.status(401).json('Password or email is incorrect');
            }
            const validPassword = await bcrypt.compare(passord, user.rows[0].passord);
            if (!validPassword) {
                return res.status(401).json('Password or email is incorrect');
            }
            const token = jwtGenerator(user.rows[0].id);
            res.json({ token });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }); 
     // verify token //
    app.get('/margodatabase/verify', authorization, async (req, res) => {
        try {
           res.json(true);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    app.get('/margodatabase/kunder', authorization, async (req, res) => {
        try {
            const kunder = await pool.query('SELECT navn FROM kunder Where id = $1', [req.user]);
            res.json(kunder.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });
    


    // listen to port //
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
    }
);
