import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productManager = new ProductManager('./products.json');

app.get("/products", async (req, res) => {
    try {
      const { limit } = req.query;
      const valid = Number(limit) || 0   // Para validar si se ingreso un limite o no
      const products = await productManager.getProducts();

      if (!valid){
         res.status(200).json({ products })
        }
        else{
            res.status(200).json({ products: products.slice(0, limit) })
        }
        
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



app.get('/products/:pid', async(req, res)=>{
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(Number(pid));
        if(product){
            res.status(200).json({product})
        } else {
            res.status(400).json({message: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.listen(8080, ()=>{
console.log('Server ok on port 8080');
})



