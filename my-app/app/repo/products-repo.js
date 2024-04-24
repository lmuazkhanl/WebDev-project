// import fs from 'fs-extra'
// import path from 'path'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class productsRepo {

    // now we use ORM methods instead of old regular methods !!!
    
    async getProducts(type) {
        if (type) {
            return prisma.item.findMany({
                where: {
                    type: {
                        equals: type.toLowerCase()
                    }
                }
            });
        }
        return prisma.item.findMany();
    }

    async getProduct(id) {
        return prisma.item.findUnique({
            where: {
                id: parseInt(id)
            }
        });
    }

    async addProduct(product) {
        return prisma.item.create({
            data: {
                ...product
            }
        });
    }

    async updateProduct(id, item) {
        const existingItem = await prisma.item.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        if (!existingItem) {
            return "Unable to update item because it does not exist";
        }

        return prisma.item.update({
            where: {
                id: parseInt(id)
            },
            data: {
                ...existingItem,
                ...item
            }
        });
    }

    //---------------------------OLD CODE FOR FETCHING--------------------------------------------------------
    // constructor() {
    //     this.path = path.join(process.cwd(), 'app/data/products.json')
    //     console.log(this.path);
    // }
    // async getProducts(type) {
    //     const items = await fs.readJSON(this.path)
    //     if (type) {
    //         return items.filter(item => item.type.toLowerCase() === type.toLowerCase())
    //     }
    //     return items;
    // }
    // async getProduct(type) {
    //     const items = await fs.readJSON(this.path)
    //     const index = items.findIndex(item => item.id == type)
    //     if (index >= 0) {
    //         return items[index]
    //     }
    //     return "not found";
    // }
    // async addProduct(product) {
    //     const item = await this.getProducts()
    //     let maxId = 0;
    //     item.forEach((item) => {
    //         if (item.id > maxId) {
    //             maxId = item.id;
    //         }
    //     });
    //     const newId = maxId + 1;
    //     product.id = newId;
    //     item.push(product)
    //     await fs.writeJSON(this.path, item)
    //     return product
    // }
    // async updateProduct(item, itemNo) {
    //     const products = await fs.readJson(this.path)
    //     const index = products.findIndex(item => item.id == itemNo)
    //     // console.log(index);
    //     if (index >= 0) {
    //         products[index] = { ...products[index], ...item }
    //         await fs.writeJson(this.path, products)
    //         return "updated successfully"
    //     }
    //     return "Unable to update account because it does not exist"
    // }
}
