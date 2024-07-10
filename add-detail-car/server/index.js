const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const app =express()
const cors = require('cors')

app.use(bodyparser.json())
app.use(cors())

const port = 8000
let conn = null

const initMySql = async ()=>{
    conn = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password: 'root',
        database: 'testdatabase'
    })
}

app.get('/testdb',(req,res)=>{
    mysql.createConnection({
        host:'localhost',
        user:'root',
        password: 'root',
        database: 'testdatabase'
    }).then((conn)=>{
        conn
        .query('SELECT * FROM cars')
        .then((result)=>{
            res.json(result[0])
        })
        .catch((error)=>{
            console.error('Error fetching cars:',error.message)
            res.status(500).json({error: 'Error fetching cars'})
        })
    })
})

app.get('/testdb-new', async (req,res)=>{
    try{
        const result = await conn.query('SELECT * FROM cars')
        res.json(result[0])
    }catch(error){
        console.error('Error fetching cars:',error.message)
        res.status(500).json({error: 'Error fetching cars'})    }
})

app.get('/cars', async (req,res)=>{
    result = await conn.query('SELECT * FROM cars')
    res.json(result[0])
})

app.post('/cars', async (req,res)=>{
    try{
        let car = req.body
        const results = await conn.query('INSERT INTO cars SET ?',car)

        console.log('results',results)

        res.json({
            message:"insert ok",
            data: results[0]
    })
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:'someting wrong',
        })
    }
})

app.get('/cars/:id', async (req,res)=>{
     try {
        let id = req.params.id
        const results = await conn.query('SELECT * FROM cars WHERE id = ?',id)
        
        if(results[0].length > 0){
            res.json(results[0][0])
        }else{
            res.status(404).json({
                message:"not found"
            })
        }
        
    } catch (error) {
        console.error('error message',error.message)
        res.status(500).json({
            message:"someting wrong"
        })
     }
})

app.put("/cars/:id", async (req,res)=>{
    let id = req.params.id
    let updateCars = req.body

    try{
        const results = await conn.query('UPDATE cars SET ? WHERE id = ?',[updateCars,id])

        console.log('results',results)

        res.json({
            message:"update ok",
            data: results[0]
    })
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:'someting wrong',
        })
    }
})

app.delete('/cars/:id', async (req,res)=>{
    try{
        let id = req.params.id
        const results = await conn.query('DELETE from cars WHERE id = ?',id)

        console.log('results',results)

        res.json({
            message:"Delete ok",
            data: results[0]
    })
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            message:'someting wrong',
        })
    }
})

app.listen(port, async (req,res)=>{
    await initMySql()
    console.log('http server run at '+ port);
})