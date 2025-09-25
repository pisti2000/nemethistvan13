const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");



app.use(cors());   

//adatbázis kapcsolatot beállítja
const db = mysql.createConnection({
    user:"root",
    host: "127.0.0.1",
    port: 3307,
    password:"",
    database: "fogado"
}); 
//ellenőrzi, hogy fut a szerver vagy sem
app.get("/", (req, res) => {
    res.send("Fut a backend!");
})
//kiírja a szobák nevét és ágyak számát a szobák táblából
app.get("/agy", (req,res) =>
    {
        const sql = "select sznev, agy from `szobak`    ";
        db.query(sql, (err, result) =>{
            if(err) return res.json(err);
            return res.json(result)
    
        })
})
//kiírja, hogy a szobák mennyire vannak kihasználva és hány vendég és és éjszakát töltöttek el a szobában
app.get("/kihasz", (req,res)=>{
    const sql = "SELECT COUNT(foglalasok.vendeg) AS vendégek, SUM(DATEDIFF(foglalasok.tav, foglalasok.erk)) AS vendégéjszakák FROM foglalasok INNER JOIN szobak ON foglalasok.szoba = szobak.szazon GROUP BY szobak.sznev";
    db.query(sql, (err, result) =>{
        if(err) return res.json(err);
        return res.json(result)

    })
})
//kiírja, hogy mi a foglaló neve és mettől-meddig fooglalta le a szobát.
app.get("/a", (req,res)=>{
    const sql = "SELECT vendegek.vnev AS nev, DATE_FORMAT(foglalasok.erk, '%Y-%m-%d') AS erkezes, DATE_FORMAT(foglalasok.tav, '%Y-%m-%d') AS tavozas FROM foglalasok INNER JOIN vendegek ON foglalasok.vendeg = vendegek.vsorsz ORDER BY vendegek.vnev ASC" ;
    db.query(sql, (err, result) =>{
        if(err) return res.json(err);
        return res.json(result)
    })
})


//elindul a szerver a 3001-es porton
app.listen(3001, () => {
    console.log("A szerver a 3001 porton fut");
});