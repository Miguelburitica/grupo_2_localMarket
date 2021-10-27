const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "./public")))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/index.html'))});

app.get('/product-detail', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/product-detail.html'))
});

app.get('/shopping-cart', (req, res) => {
    res.sendFile(path.resolve(__dirname,'./views/shopping-cart.html'))
});



app.get('/sign-in', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/sign-in.html"))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/sign-in.html"))
}) 

app.listen(port, () => console.log("Servidor corriendo"))
