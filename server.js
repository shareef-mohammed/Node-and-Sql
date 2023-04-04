require('dotenv').config();
const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: 'nodesql'
});

db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('MySql connected.')
});

const app = express();

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodesql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('Database Created..')
    })
})

app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))'
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send('posts table created')
    })
})

app.get('/addpost', (req, res) => {
    let post = {title: 'Post two', body: 'This is post number two'}
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('post added')
    })
})

app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err
        console.log(results)
        res.send('posts fetched')
    })   
})

app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('post fetched')
    })   
})

app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'updated title'
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;   
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('post updated')
    })   
})

app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('post deleted')
    })   
})

app.listen('3000', () => {
    console.log('Server Started.')
});