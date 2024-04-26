import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    const requestedStat = params.stat;

    let data = {};

    if (requestedStat === "most-successful-sellers") {
        data = await getMostSuccessfulSellers();
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
