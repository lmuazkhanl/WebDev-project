// import fs from 'fs-extra'
// import path from 'path'

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class productsRepo {
    async getProductQuantitySold(productId) {
        productId = parseInt(productId);

        const totalQuantitySold = await prisma.purchase.aggregate({
            _sum: {
                quantity: true,
            },
            where: {
                itemId: productId,
            },
        });

        return totalQuantitySold._sum.quantity || 0;
    }

    async getProductCustomersList(productId) {
        productId = parseInt(productId); // Convert productId to an integer

        // First, get the distinct customerIds for the product
        const customerIds = await prisma.purchase.findMany({
            select: {
                customerId: true,
            },
            where: {
                itemId: productId,
            },
            distinct: ["customerId"],
        });

        // Then, fetch the customer names for each customerId
        const customerNames = await prisma.customer.findMany({
            where: {
                customerId: {
                    in: customerIds.map(({ customerId }) => customerId),
                },
            },
            select: {
                name: true,
            },
        });

        // Return an array of customer names
        return customerNames.map(({ name }) => name);
    }

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
        product.quantity = parseInt(product.quantity);
        return prisma.item.create({
            data: {
                ...product,
            },
        });
    }

    async updateProduct(id, item) {
        id = parseInt(id);
        const existingItem = await prisma.item.findUnique({
            where: { id: id },
        });

        if (!existingItem) {
            return "Unable to update item because it does not exist";
        }

        const updatedItem = {
            ...item,
            quantity: parseInt(item.quantity, 10), // Convert quantity to an integer
        };

        return prisma.item.update({
            where: { id: id },
            data: updatedItem,
        });
    }

    async getUsers() {
        const customers = await prisma.customer.findMany();
        const sellers = await prisma.seller.findMany();

        return { customers, sellers };
    }
}
