const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const serviceAccount = require('./key.json');
initializeApp({
  credential: cert(serviceAccount),
})
const db = getFirestore();

app.post("/posts", async (req, res) => {
  try {
    console.log(req.body)
    const id = req.body.title;
    const postInfo = {
      title: req.body.title,
      postMessage: req.body.postMessage,
      date: req.body.date,
      tags: req.body.tags,
      type: JSON.stringify(req.body.type),
      image: req.body.image,
    }
    const docRef = await db.collection('posts').doc(id).set(postInfo);
      res.send(docRef)
      } catch (err) {
        console.log(err);
    }
})

app.get("/posts/all", async (req, res) => {
  try{
    const postsRef = db.collection("posts");
    const response = await postsRef.get();
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    res.send(responseArr);
  } catch(err) {
    res.send(err);
  }
})

app.get("/posts/:id", async(req,res) => {
  try{
    const postRef = db.collection("posts").doc(req.params.id);
    const response = await postRef.get();
    res.send(response.data());
  } catch(err){
    res.send(err);
  }
})

app.post("/posts/update", async(req, res) => {
  try{
    const id = req.body.id;
    const newPostInfo = {
      newMessage : req.body.postMessage,
      newTitle : req.body.title,
      newDate : req.body.date
    }
    const newPostRef = await db.collection("posts").doc(id).update(newPostInfo)
    res.send(newPostRef)
  } catch(err){
    res.send(err)
  }
})



app.listen(3002, () => {
  console.log('Server listening on port 3002');
});