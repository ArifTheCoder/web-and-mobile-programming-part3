const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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
app.get('/api/persons', (req, res) => {
    res.json(persons);
});

// get the resourse searched by id
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)        // convert the route id from string to number 
    const person = persons.find(person => person.id === id)

    // check if the resourse exists
    if(person){
        res.json(person)
    }else {
        res.status(404).end()
    }
});

// delete a resourse
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id)

    res.status(204).end();
});

// genereate the required ID for new entry
const generateId = () => {
    const maxId = persons.length > 0 ? persons.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1;
    return maxId + 1;
}
// post the request
app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(typeof(body.name))
    if(body.name === undefined) {
        return res.status(400).json({error: 'name is missing'})
    }

    let person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)
})

// define and set the port for the app
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});