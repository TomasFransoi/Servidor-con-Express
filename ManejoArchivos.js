const fs = require("fs");
class Contenedor {
    constructor(file){
        this.file = file;
    }
    save = async(producto)=>{
        try{
            if (fs.existsSync(this.file)) {
                const contenido = await fs.promises.readFile(this.file,"utf8")
                if (contenido) {
                        const productos = JSON.parse(contenido)
                    const newProductId = productos.reduce((acc,item)=>item.id > acc ? acc = item.id : acc, 0) + 1;
                    const newProducto={
                        id:newProductId,
                        ...producto
                    }
                    productos.push(newProducto)
                    await fs.promises.writeFile(this.file, JSON.stringify(productos, null, 2))
                } else {
                    const newProducto={
                        id:1,
                        ...producto
                    }
                    await fs.promises.writeFile(this.file,JSON.stringify([newProducto],null,2))
                }
            } else {
                const newProducto={
                    id:1,
                    ...producto
                }
                await fs.promises.writeFile(this.file,JSON.stringify([newProducto],null,2))
            }
        }catch (error){
            console.log(error)
        }
    }
    getById = async(id)=>{
        try {
            if(fs.existsSync(this.file)){
                const contenido = await fs.promises.readFile(this.file,"utf8");
                if(contenido){
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item=>item.id===id);
                    return producto
                } else{
                    return "El archivo esta vacio"
                }
            }else{
                return "El archivo no existe"
            }
        } catch (error) {
            console.log(error)
        }
    }
    getAll = async()=>{
        try {
            if (fs.existsSync(this.file)) {
                const contenido = await fs.promises.readFile(this.file,"utf8");
                if (contenido) {
                    const productos = JSON.parse(contenido);
                    return productos
                } else {
                    return "El archivo esta vacio"
                }

            } else {
                return "El archivo no existe"
            }

        } catch (error) {
            console.log(error)
        }
    }
    deleteById = async(id)=>{
        try {
            if (fs.existsSync(this.file)) {
                const contenido = await fs.promises.readFile(this.file,"utf8");
                    if (contenido) {
                        const productos = JSON.parse(contenido);
                        const newProductos = productos.filter(producto=>producto.id!==id);
                        await fs.promises.writeFile(this.file, JSON.stringify(newProductos, null, 2));
                } else {
                    return "El archivo esta vacio"
                }

            } else {
                return "El archivo no existe"
            }
        } catch (error) {
            console.log(error)
        }
    }
    deleteAll = async()=>{
        try {
            if (fs.existsSync(this.file)) {
                const contenido = await fs.promises.readFile(this.file,"utf8");
                    if (contenido) {
                        await fs.promises.writeFile(this.file, JSON.stringify([]));
                } else {
                    return "El archivo esta vacio"
                }

            } else {
                return "El archivo no existe"
            }
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Contenedor;