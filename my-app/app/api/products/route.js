import ProductsRepo from "@/app/repo/products-repo";

const productsRepo = new ProductsRepo();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const products = await productsRepo.getProducts(type);

    // Add CORS headers to the response
    return new Response(JSON.stringify(products), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 200,
    });
}

export async function POST(request) {
    const product = await request.json();
    const newProduct = await productsRepo.addProduct(product);

    // Add CORS headers to the response
    return new Response(JSON.stringify(newProduct), {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        status: 201,
    });
}
