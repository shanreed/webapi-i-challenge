const express = require('express');
const db = require('./data/db');


const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('API WORKING');
});

//Post
server.post('/users', (req, res) => {
    const userInfo = req.body;
    const { name, bio } = req.body;
    if (!name && !bio ) {
      res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
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


//GET Users
server.get('/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({error: "The users information could not be retrieved." });
    });

});

server.delete('/users/:id', (req, res) => {
    const {id} = req.params
    db.remove(id)
      .then(deleted => {
          if(deleted) {
              res.status(204).json({message: "User was removed"})
          }else{
              res.status(404).json({message: "The user with the specified ID does not exist." })
          }
      })
      .catch(error => {
          res.status(500).json({error: "The user could not be removed"})
      })
})

// //GET USER ID
// server.get('/users:id', (req, res) => {
//     const { id } = req.params;
//     db.findById(id)
//     .then(id => {
//         res.status(200).json(id)
//     })
//     .catch(err => {
//         res.status(500).json({error: "The users information could not be retrieved." });
//     });

// });





server.listen(8000, () => {
    console.log('API running on port 8000')
});


