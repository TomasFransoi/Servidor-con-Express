const productRouter = require("./routes/products")
const express = require("express");
const app = express();



app.listen(8080,()=>{
    console.log("servidor activado en puerto 8080")
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/productos", productRouter);