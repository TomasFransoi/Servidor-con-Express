const express = require("express");
const Contenedor = require("../ManejoArchivos")
const productos = new Contenedor("../productos.txt")
const productsRouter = express.Router()
productsRouter.get("/",async(request,response)=>{
    const productosAll = await productos.getAll()
    response.send(productosAll)
})
productsRouter.get("/:id",async(request,response)=>{
    const {id} = request.params
    const product = await productos.getById(parseInt(id));
    response.send(product)
    if (product) {
        response.json({
            product: product
        })
    } else {
        response.json({
            message:"producto no encontrado"
        })
    }
})
productsRouter.post("/",async(request,response)=>{
    const newProduct = request.body
    const products = await productos.save(newProduct)
    response.json({
        response: products
    })

})
productsRouter.put("/:id",async(request,response)=>{
    const {id} = request.params
    const newInfo = request.body;
    const productoActualizado = await productos.updateById(parseInt(id),newInfo)
    response.json({
        message:"el producto fue actualizado",
        response:productoActualizado
    })
})
productsRouter.delete("/:id",async(request,response)=>{
    const {id} = request.params
    productos.deleteById(parseInt(id))
    response.json({
        message:"El producto a sido eliminado"
    })
})
module.exports = productsRouter;