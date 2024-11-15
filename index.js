import 'dotenv/config';

import express from "express";
const app =express();
const port = process.env.port || 3000;
app.use(express.json()); //any data come in json formate then accept that


let teaData =[];
let nextId =1;

app.get('/',function(req,res){
    res.send("welcome to the Tilak Verma Show");
});

app.get('/teas',function(req,res){
    res.status(400).send(teaData);
})

app.post('/teas',function(req,res){
    console.log(req.body);
    const {name,price} =req.body;
    const newTea ={id:nextId++,name,price};
    teaData.push(newTea);
    res.status(201).send(newTea);
});

app.get('/teas/:id',function(req,res){
    const id =parseInt(req.params.id);
   const data = teaData.find(function(elemment){
    return elemment.id === id;
   });
   console.log(data);

   if(!data){
    res.send("Tea Not Found").status(404);
   }
   else{
    res.send(data).status(200);
   }
   
})

app.put('/teas/:id',function(req,res){
    const id =parseInt(req.params.id);
    const data = teaData.find(function(elemment){
     return elemment.id === id;
    });
    if(!data){
        res.send("Tea Not Found").status(404);
    }
     else{
    const {name,price} =req.body;
    data.name =name;
    data.price=price;
    console.log("after updating",teaData);
    
     res.send(data).status(200);
     }

})

app.delete('/delete/:id',function(req,res){
    const id =parseInt(req.params.id);
    const data = teaData.find(function(elemment){
     return elemment.id === id;
    });
    if(!data){
       
        res.send("Tea Not Found").status(404);
    }
    else{
        
    let updated_tea = teaData.filter(function(tea){
            return tea.id !=id;
        })
    teaData =[...updated_tea];   
    console.log("after deleteing tea",teaData);
     
    res.end("succesfully deleted");
    
     }
})

app.listen(port,function(){
    console.log(`server is completly running on ${port}`);
})