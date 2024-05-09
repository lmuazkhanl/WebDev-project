// import fs from 'fs-extra'
// import path from 'path'

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class productsRepo {
    async getProducts(type) {
        if (type) {
            return prisma.item.findMany({
                where: {
                    type: {
                        equals: type.toLowerCase(),
                    },
                },
            });
        }
        return prisma.item.findMany();
    }

    async getProduct(id) {
        return prisma.item.findUnique({
            where: {
                id: parseInt(id),
            },
        });
    }

    async addProduct(product) {
        return prisma.item.create({
            data: {
                ...product,
            },
        });
    }

    async updateProduct(id, item) {
        const existingItem = await prisma.item.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!existingItem) {
            return "Unable to update item because it does not exist";
        }

        return prisma.item.update({
            where: {
                id: parseInt(id),
            },
            data: {
                ...existingItem,
                ...item,
            },
        });
    }

    async getUsers() {
        const customers = await prisma.customer.findMany();
        const sellers = await prisma.seller.findMany();

        return { customers, sellers };
    }
}
