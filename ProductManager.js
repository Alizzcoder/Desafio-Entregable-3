import fs from 'fs';

export default class ProductManager{
    constructor(path){
        this.path = path;
    }

    async addProduct(obj){
        try {
            const product = {
                id: await this.#getMaxId() + 1,
                ...obj
            }
            const productsFile = await this.getProducts();
            productsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async #getMaxId() {
        let maxId = 0;
        const products = await this.getProcuts();
        products.map((product) => { 
          if (product.id > maxId) maxId = product.id;                                       
        });
        return maxId;
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(products);
                return productsJS
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id){
        try {
           const productsFile = await this.getProducts();
           const product = productsFile.find((prod)=> prod.id === id); 
           if(product) return product
           else return false;
            } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(obj, id){
        try {
            const productsFile = await this.getProducts();
            const index = productsFile.findIndex(product => product.id === id);
            if(index === -1){
                console.log('id de producto no encontrado');
            } else {
                productsFile[index] = { ...obj, id }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id){
        try {
            const productsFile = await this.getProducts();
            if(productsFile.length > 0){
                const productoBorrado = productsFile.filter(product => product.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(productoBorrado));
            } else {
                console.log ('Producto no encontrado');
            }
        } catch (error) {
            console.log(error);
        }
    }
}