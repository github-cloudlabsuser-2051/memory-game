const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, 'public')));

// create a route handler that serves an index.html file located in the public folder (Objective 5)

app.get('/get-symbols', async (req, res) => {
    const url = 'https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/all.json';
    
    try {
        const response = await axios.get(url);
        const characters = response.data;

        const symbols = characters.slice(0, 8).map(character => ({
            name: character.name,
            image: character.image
        }));

        res.json(symbols);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch symbols' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
