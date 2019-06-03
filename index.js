const express = require('express');
const db = require('./data/db');


const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('API WORKING');
});

server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({error: "The users information could not be retrieved." });
    });

});

server.post('/users', (req, res) => {
    const userInfo = req.body;
    const { name, bio } = req.body;
    if (!name && !bio ) {
      res.status(422).json({ errorMessage: "Please provide name and bio for the user." });
    }
  
    // console.log(userInfo);
    db.insert(userInfo)
      .then(users => {
        res.status(201).json(users);
      })
      .catch(err => {
        res.status(500).json({error: "There was an error while saving the user to the database" });
      });
  });





server.listen(8000, () => {
    console.log('API running on port 8000')
});


