// server.js
const express = require('express');
const bodyParser = require('body-parser');
const chatbot = require('./chatrequest');
const cors = require('cors')
const axios = require('axios')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/ChatBot', async (req, res) => {
  try {
    const query = req.body.query;
    const text = await chatbot.generateContent(query);
    res.json({ generatedText: text });
  } catch (error) {
    console.error('Error:', error);
    res.json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


