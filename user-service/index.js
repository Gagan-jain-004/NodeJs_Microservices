const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const app = express()
const port = 3001

app.use(bodyParser.json())

// mongoose.connect('mongodb://localhost:27017/users')           // it is not used when u run mongodb by docker so when u use docker use below by replacing localhost with the container name of mongodb
mongoose.connect('mongodb://mongo:27017/users')           
.then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.error('Could not connect to MongoDB', err)
})


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
});

// now create a model based on that schema for interacting with the users collection like finding, creating, updating, deleting users
const User = mongoose.model('User', UserSchema);

// api endpoints 

app.get('/users', async (req, res) => {
    const users = await User.find();               //to get all users 
    res.json(users);
      
})

app.post('/users', async (req, res) => {
    const {name, email} = req.body;

    try{
        const user = new User({name, email});
        await user.save();
        res.status(201).send(user);
    }catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
