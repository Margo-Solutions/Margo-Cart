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

        // ---------------------------------------handleliste eksempel---------------------------------------//
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

// ---------------------------------------verifisering og login---------------------------------------//
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
    // get a kunde_id //
    app.get('/margodatabase/kunder/:email', async (req, res) => {
        try {
            const { email } = req.params;
            const kunder = await pool.query('SELECT id FROM kunder WHERE email =$1;', [email]);
            res.json(kunder.rows[0]);
        } catch (err) {
            console.error(err.message);
        }
    });
            // ---------------------------------------handleliste---------------------------------------//
    // create a vare //
    app.post('/margodatabase/varer', async (req, res) => {
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
app.post('/margodatabase/handlelister/nyhandleliste', async (req, res) => {
    try {
        const { handleliste_tittel, kunde_id} = req.body;
        const newHandleliste = await pool.query(
            'INSERT INTO handlelister(handleliste_tittel, kunde_id) VALUES($1, $2) RETURNING *',  
            [handleliste_tittel, kunde_id]
        );
        res.json(newHandleliste.rows[0]);
        } catch (err) {3
        console.error(err.message);
    }   
});
 // legge til varer i handleliste //
app.post('/margodatabase/handleliste/varer', async (req, res) => {
    try {
        const {handleliste_id, vare_id, antall} = req.body;
        const newVare = await pool.query(
            'INSERT INTO handleliste(handleliste_id, vare_id, antall) VALUES($1, $2, $3) RETURNING *',  
            [handleliste_id, vare_id, antall]
        );
        res.json(newVare.rows[0]);
        } catch (err) {3
        console.error(err.message);
    }   
});

// get alle varer //
app.get('/margodatabase/varer', async (req, res) => {
    try {
        const varer = await pool.query('SELECT * FROM varer');
        res.json(varer.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get alle handlelister // 
app.get('/margodatabase/handlelister', async (req, res) => {
    try {
        const handlelister = await pool.query('SELECT * FROM handlelister');
        res.json(handlelister.rows);
    } catch (err) {
        console.error(err.message);
    }
}); 

// get a vare //
app.get('/margodatabase/varer/Search/:vare_navn', async (req, res) => {
    try {
        const { vare_navn } = req.params;
        const varer = await pool.query("SELECT * FROM varer WHERE vare_navn LIKE '%" + vare_navn + "%'");
        res.json(varer.rows);
    }     
    catch (err) {
        console.error(err.message);
    }
});

// get a handleliste //
app.get('/margodatabase/handlelister/:handleliste_id', async (req, res) => {
    try {
        const { handleliste_id } = req.params;
        const handleliste = await pool.query('SELECT * FROM handlelister WHERE handleliste_id = $1', [handleliste_id]);
        res.json(handleliste.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a vare //
app.put('/margodatabase/varer/:id', async (req, res) => {
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

// list of varer in handleliste //
app.get('/margodatabase/handleliste/:handleliste_id', async (req, res) => {
    try {
        const { handleliste_id } = req.params;
        const handleliste = await pool.query('SELECT varer.vare_navn, handleliste.id, antall FROM handleliste INNER JOIN varer ON handleliste.vare_id=varer.vare_id WHERE handleliste.handleliste_id=$1;', [handleliste_id]);
        res.json(handleliste.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// delete a vare //
app.delete('/margodatabase/handleliste/remove/', async (req, res) => {
    try {
        const { id } = req.body;
        const deleteVare = await pool.query('DELETE FROM handleliste WHERE id = $1', [id]);
        res.json('Vare was deleted!');
    } catch (err) {
        console.error(err.message);
    }
});

// delete a handleliste //
app.delete('/margodatabase/handlelister/remove/:handleliste_id', async (req, res) => {
    try {
        const { handleliste_id } = req.params;
        const deleteHandleliste = await pool.query('DELETE FROM handlelister WHERE handleliste_id = $1', [handleliste_id]);
        res.json('handleliste was deleted!');
    } catch (err) {
        console.error(err.message);
    }
});

// check if vare is in handleliste //
app.get('/margodatabase/handleliste/check/:handleliste_id/:vare_id', async (req, res) => {
    try {
        const { handleliste_id } = req.params;
        const { vare_id } = req.params;
        const handleliste = await pool.query('SELECT * FROM handleliste WHERE handleliste_id = $1 AND vare_id = $2', [handleliste_id, vare_id]);
        if (handleliste.rows.length > 0) { // sjekke om varen er i handlelisten
            res.json(handleliste.rows[0]);
        } else {
        res.json(handleliste.rows);
        }
    } catch (err) {
        console.error(err.message);
    }
});

// update a handleliste //
app.put('/margodatabase/handleliste/update/:antall/:id', async (req, res) => {
    try {
        const { antall } = req.params;
        const { id } = req.params;
        const { handleliste_id} = req.body;
        const updateHandleliste = await pool.query('UPDATE handleliste SET antall = $1 WHERE handleliste_id = $2 AND id=$3', [antall, handleliste_id, id]);
        res.json('Handleliste was updated!');
    } catch (err) {
        console.error(err.message);
    }
});

// get a kunde med hvilken handleliste de har //
app.get('/margodatabase/kunder/get/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const kunde = await pool.query('SELECT handlelister.handleliste_tittel, handlelister.handleliste_id FROM handlelister INNER JOIN kunder ON handlelister.kunde_id=kunder.id WHERE kunder.email=$1;', [email]);
        res.json(kunde.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

    // listen to port //
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
    }
);

