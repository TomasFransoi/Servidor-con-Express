
const Contenedor = require("./ManejoArchivos")
const express = require("express");
const app = express();
const productos = new Contenedor("productos.txt")

app.get("/",(request,response)=>{
    response.send("hola desde express")
})
app.get("/productos",async(request,response)=>{
    const productosAll = await productos.getAll()
    response.send(productosAll)
})
app.get("/productosRandom",async(request,response)=>{
    const id = parseInt(Math.random()*3+1);
    const product = await productos.getById(id);
    response.send(product)
})
app.listen(8080,()=>{
    console.log("servidor activado en puerto 8080")
})