const express = require("express");

const app = express();
const fs = require("fs");
const { test } = require("./utils");
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("server started at",PORT)
})
app.use(express.json())
app.use(express.static("./static"))

app.get("/jokes",(req,res)=>{

    fs.readFile("./db/db.json",(err,data)=>{
        if(err)
          return res.status(500).send("error with server")
        const Mydata = JSON.parse(data.toString())
         return res.status(200).json(Mydata.data)
    })

})

app.post("/jokes",(req,res,next)=>{
    const {author,joke}=req.body
    const {msg,stat}= test(author,joke)
    if(!stat)
      return res.status(400).send(msg)
    next()
},(req,res)=>{
    fs.readFile("./db/db.json",(err,data)=>{
        if(err)
          return res.status(500).send("error with server")
        const myData= JSON.parse(data.toString())
        const id = myData.lastId;
        const myAuthor = req.body.author;
        const myJoke =req.body.joke;
        const dataToAdd ={
            id:id,
            author : myAuthor,
            joke :myJoke,
        }
        myData.data.push(dataToAdd);
        myData.lastId++;
        fs.writeFile("./db/db.json",JSON.stringify(myData,null,3),(err)=>{
            if(err)
              return res.status(500).send("error with server")
            res.status(200).json(myData.data)
        }) 
    })
})

app.delete("/jokes/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    fs.readFile("./db/db.json",(err,data)=>{
        if(err)
         return res.status(500).send("error with server")
         const myData= JSON.parse(data.toString())
         if(myData.data.find((elm)=>elm.id==id))
         if(!myData)
           return res.status(400).send("element doesnt exist")
        myData.data = myData.data.filter((elm)=>elm.id!=id)
        fs.writeFile("./db/db.json",JSON.stringify(myData,null,3),(err)=>{
            if(err)
             return res.status(500).send("error with server")
            return res.status(200).json(myData)
        })



    })
    
})

