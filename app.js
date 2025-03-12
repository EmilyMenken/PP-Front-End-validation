import express from 'express';
import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

const PORT = process.env.APP_PORT || 3000;

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database!')
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database ${err}`)
    }
}

const app = express();

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { errors: [] }); // stops the error that shuts down the page if there are no errors
});


app.get('/entries', async (req, res) => {
    const conn = await connect();

    const entries = await conn.query('SELECT * FROM posts ORDER BY created_at DESC');

    console.log(entries);

    res.render('entries', { entries });
});

app.post('/submit', async (req, res) => {
    const newPost = {
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    }

    const errors = [];

    // Validate author
    if (!newPost.author || /\d/.test(newPost.author)) {
        errors.push("Author name is required and cannot contain numbers.");
    }

    // Validate title
    if (!newPost.title) {
        errors.push("Title is required.");
    }

   // Validate content
   if (!newPost.content) {
    errors.push("Content is required.");
} else if (newPost.content.length < 10) { // Ensures content is at least 10 characters
    errors.push("Content must be at least 10 characters long.");
}

    if (errors.length > 0) {
        res.render('home', { errors: errors });
    } else {
        const conn = await connect();
        const insertQuery = await conn.query(`INSERT INTO posts
            (author, title, content)
            values (?, ?, ?)`,
            [newPost.author, newPost.title, newPost.content]
        );

        res.render('confirmation', { post: newPost });
    }
});


// console.log(newPost);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${3000}`);
});