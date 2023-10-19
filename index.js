const express = require('express');
const cors = require('cors');
const app=express();
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port=process.env.PORT || 5001 ;

// middleware
app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send("my brand shop is running now")
})

// mongodb connect


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hfsk54e.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // addcards from local to mongodb 
    // const userCollection=client.db('userDB').collection('user')
    // const shopCollection=client.db('shopDB').collection('shop');
    // create user
//    app.post('/shopcards',async(res,req)=>{
//     const newCards=req.body;
//     console.log(newCards);
//    })
const shopCollection = client.db("shopDB").collection('shop');
app.get('/shop',async(req,res)=>{
    const cursor =shopCollection.find();
    const result=await cursor.toArray();
    res.send(result);
  })

  app.get('/shop/:id',async(req,res)=>{
    const id=req.params.id;
    const query={_id: new ObjectId(id)}
    const result=await shopCollection.findOne(query);
    res.send(result);
  })
app.post('/shop',async(req,res)=>{
const newCard=req.body;
console.log(newCard);
const result=await shopCollection.insertOne(newCard);
res.send(result);
})

app.put('/shop/:id',async(req,res)=>{
  const id=req.params.id;
  const filter={_id:new ObjectId(id)}
  const option={upsert:true};
  const updatedShop=req.body;
  const shop={
    $set:{
      name:updatedShop.name,
      shortdescription:updatedShop.shortdescription,
      brandname:updatedShop.brandname,
      type:updatedShop.type,
      photourl:updatedShop.photourl,
      image:updatedShop.image,
      rating:updatedShop.rating
    }
  }

  const result=await shopCollection.updateOne(filter,shop,option);
  res.send(result)
})
app.delete('/shop/:id',async(req,res)=>{
  const id=req.params.id;
  const query={_id: new ObjectId(id)}
  const result=await coffeeCollection.deleteOne(query);
  res.send(result)
     })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// server er cmd te dekhar jonno
app.listen(port,()=>{
    console.log(`brand shop is running on port:${port}`);
})