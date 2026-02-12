const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Rotta per visualizzare il form
app.get('/post', (req, res) => {
    res.send(`
        <form action="/post" method="POST">
            <input type="text" name="content" placeholder="Scrivi qualcosa..." required>
            <button type="submit">Invia</button>
        </form>
    `);
});

// Rotta per ricevere i dati e salvare su JSON
app.post('/post', (req, res) => {
    const newPost = { id: Date.now(), content: req.body.content };

    // Leggi, aggiorna e scrivi sul file
    const data = JSON.parse(fs.readFileSync('post.json', 'utf8'));
    data.push(newPost);
    fs.writeFileSync('post.json', JSON.stringify(data, null, 2));

    res.send('Dato memorizzato! <a href="/post">Torna indietro</a>');
});

app.listen(3000, () => console.log('Server in esecuzione su http://localhost:3000/post'));