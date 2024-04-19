import fs from 'fs-extra'
import path from 'path'

export default class productsRepo {
    constructor() {
        this.path = path.join(process.cwd(), 'app/data/products.json')
        console.log(this.path);
    }
    async getProducts(type) {
        const items = await fs.readJSON(this.path)
        if (type) {
            return items.filter(item => item.type.toLowerCase() === type.toLowerCase())
        }
        return items;
    }
    async addProduct(product) {
        const item = await this.getProducts()
        let maxId = 0;
        item.forEach((item) => {
            if (item.id > maxId) {
                maxId = item.id;
            }
        });
        const newId = maxId + 1;
        product.id = newId;
        item.push(product)
        await fs.writeJSON(this.path, item)
        return product
    }
}
