import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const requestedStat = params.stat;

    let data = {};

    if (requestedStat === "most-successful-sellers") {
        data = await getMostSuccessfulSellers();
    } else if (requestedStat === "most-popular-products") {
        data = await getMostPopularProducts();
    }

    return Response.json(data, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 200,
    });
}

async function getMostSuccessfulSellers() {
    const mostSuccessfulSellers = await prisma.seller.findMany({
        orderBy: {
            bank_account_balance: "desc",
        },
        take: 5,
        include: {
            Item: true, // have to explicitly include it
        },
    });

    return mostSuccessfulSellers.map((seller) => ({
        username: seller.username,
        itemsSold: seller.Item.length,
        moneyMade: seller.bank_account_balance,
    }));
}

async function getMostPopularProducts() {
    const mostPopularProducts = await prisma.item.findMany({
        orderBy: {
            PurchaseHistory: {
                _sum: {
                    quantity: "desc",
                },
            },
        },
        take: 5,
        select: {
            name: true,
            image: true,
            price: true,
            PurchaseHistory: {
                select: {
                    quantity: true,
                },
            },
        },
    });

    return mostPopularProducts.map((product) => ({
        name: product.name,
        image: product.image,
        quantitySold: product.PurchaseHistory.reduce((total, purchase) => total + purchase.quantity, 0),
        moneyMade: product.PurchaseHistory.reduce((total, purchase) => total + purchase.quantity * product.price, 0),
    }));
}

const date = await getMostPopularProducts();
console.log(date);
