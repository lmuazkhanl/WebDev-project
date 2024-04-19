import fs from 'fs-extra'
// import { nanoid } from 'nanoid'
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
}
