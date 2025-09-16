const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");



app.use(cors());   


const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}); 

app.get("/", (req, res) => {
    res.send("Fut a backend!");
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

app.get("/regiok", (req,res) =>
{
    const sql = "select * from `regiok`";
    db.query(sql, (err, result) =>{
        if(err) return res.json(err);
        return res.json(result)

    })
})
app.get("/a", (req,res) =>
    {
        const sql = "select * from `regiok` where  regionev like '%g%'";
        db.query(sql, (err, result) =>{
            if(err) return res.json(err);
            return res.json(result)
    
        })
    })
    app.get("/b", (req,res) =>
        {
            const sql = "select * from `regiok` GROUP BY regionev asc";
            db.query(sql, (err, result) =>{
                if(err) return res.json(err);
                return res.json(result)
        
            })
        })
    
        app.get("/c", (req,res) =>
            {
                const sql = "select min(hossz) from `kozutak_hossza` ";
                db.query(sql, (err, result) =>{
                    if(err) return res.json(err);
                    return res.json(result)
            
                })
            })
app.delete("/torles", (req,res) =>{
    const sql = "delete from `regiok` where rid =?";
    db.query(sql, [req.params.id], (err, result) =>{
        if(err) return res.json(err);
        return res.json(result)
    })
})            