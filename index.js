const express = require('express')
const app = express()
const port = 3001
const {Client} = require('pg')
var bodyParser = require('body-parser')


var jsonParser = bodyParser.json()


app.set('view engine','hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const client= new Client({
    host:"localhost",
    user:"postgres",
    port:5433,
    password:"teetee5321",
    database:"postgres"
});


client.connect();

app.get('/', (req, res) => {
    res.send("dsad")
  })

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
  })


app.post('/register',(req,res)=>{
    const {fullnames,password,email}=req.body
    console.log(req.body)
    console.log(fullnames)
    
    client.query(`INSERT INTO alluser (name,password,email) VALUES ('${fullnames}','${password}','${email}')`,(err,res)=>{
    if(err){
        console.log(err.message)
    } 
    
    })

    res.send("done");
})

app.post('/login',(req,res)=>{
    const {password,email}=req.body
    console.log(email)
    console.log(password)
    
    client.query(`SELECT * FROM alluser WHERE email='${email}' AND password='${password}'`,(err,respond)=>{
    if(err){
        res.send(err.message)
    }
    else if(respond.rows.length===0){
        res.status(401).json({message:"password or username incorrect",error:"User not found",})
    }
    else{
        res.status(200).json({status:"login successful"})
    }
    })
    
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost${port}`)
})


