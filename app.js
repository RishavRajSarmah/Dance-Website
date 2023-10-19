const express = require("express");
const path = require("path");
const app = express();
const bodyparser= require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
   mongoose.connect('mongodb://127.0.0.1:27017/contactDance');}
// mongoose.connect('mongodb://127.0.0.1:27017/contactDance',{useNewUrlParser: true});
const port = 8000;
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')// set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// set the views directory 

// END POINTS

app.get('/',(req, res)=>{
    const con = "this is the best content"
    const params = {'title': 'pubg is the best game',"content": con}
    res.status(200).render('home.pug' , params);
})
app.get('/contact',(req, res)=>{
    const con = "this is the best content"
    const params = {'title': 'pubg is the best game',"content": con}
    res.status(200).render('contact.pug' , params);
})
app.post('/contact',(req, res)=>{
    const myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this items has been saved")
    }).catch(()=>{
        res.status(400).send("items was not saved")
    })
    const con = "this is the best content"
    const params = {'title': 'pubg is the best game',"content": con}
    res.status(200).render('contact.pug' , params);
})
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`);

})
