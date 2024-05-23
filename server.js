const express = require('express')
const app = express()
const path = require('path')
const mongoose  = require('mongoose')
const userschema = require('./mongoschema')
const User = mongoose.model('User', userschema);

// database connectivity
async function dbconnect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/registeredusers')
    }
    catch(err){
        console.log('There is an error connecting to the database')
        throw new Error(err)     
    }
    
}
dbconnect()
app.use(express.static('public'))
app.use('/static',  express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.get('/',(req,res)=>{
    res.sendFile('/static/index.html')
})
app.post('/submit',async (req,res)=>{
    const userexisting = await User.findOne({Email:req.body.Email})
    if(userexisting){
        return res.json({success:false})
    }
    const newuser = new User(req.body)
    await newuser.save()
    console.log(req.body)
    res.json({success:true})
})

app.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000');
})