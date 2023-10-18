const express = require('express');
const cors = require('cors');
const app=express();
const port=process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send("my brand shop is running now")
})

// server er cmd te dekhar jonno
app.listen(port,()=>{
    console.log(`brand shop is running on port:${port}`);
})