const express = require('express');
const app = express();

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
      },
      {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
      },
      {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
      }
];

// get the whole resourses
app.get('/persons', (req, res) => {
    res.json(persons);
});

// get the resourse searched by id
app.get('/persons/:id', (req, res) => {
    const id = Number(req.params.id)        // convert the route id from string to number 
    const person = persons.find(person => person.id === id)

    // check if the resourse exists
    if(person){
        res.json(person)
    }else {
        res.status(404).end()
    }
});

// define and set the port for the app
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});