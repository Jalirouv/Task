const express=require("express")
const app=express()
const cors=require("cors")
const dotenv=require("dotenv")
const bodyParser=require("body-parser")
const mysql2=require("mysql2")

app.use(cors())
app.use(bodyParser.json())
dotenv.config()

const connection=mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.SQL_Password,
    database:process.env.SQLDataBase
})



connection.connect(function(err){
    if(err){
     return  console.log(err)
    }

    console.log("Connecteed")
})



app.get("/categories", (req,res)=>{
    let sql="select * from new_table"

    connection.query(sql,function(err,result){
        if(err){
          return  res.send(err)
        }

        res.send(result)
    })
})


app.get("/categories/:id",(req,res)=>{
    let sql="select * from new_table where id=?"
    let id=[req.params.id]

    connection.query(sql,id,function(err,result){
        if(err){
          return  res.send(err)
        }

        res.send(result)
    })
})



app.delete("/categories/:id",(req,res)=>{
    let sql="delete from new_table where id=?"
    let id=[req.params.id]

    connection.query(sql,id,function(err,result){
        if(err){
            return res.send(err)
        }
        res.send(result)
    })
})



app.post("/categories",(req,res)=>{
    let newCategory=req.body
    let sql="insert into new_table (name,description,price) values(?,?,?)"
    let params=[newCategory.name,newCategory.description,newCategory.price]


    connection.query(sql,params,function(err,result){
        if(err){
            return res.send(err)
        }

        res.send(params)
    })
})



app.put("/categories/:id",(req,res)=>{
    let sql="update new_table set name=?, description=?, price=?  where id=? "
    let id=req.params.id
    let updateCategory=req.body
    let params=[updateCategory.name,updateCategory.description,updateCategory.price,id]

    connection.query(sql,params,function(err,result){
        if(err){
            return res.send(err)
        }
        res.send(result)
    })
})
app.listen(7070,()=>{
    console.log("Port aktivdir")
})