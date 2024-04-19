import ProductsRepo from "@/app/repo/products-repo"
const productsRepo = new ProductsRepo()

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    
    const products = await productsRepo.getProducts(type);

    return Response.json({search : products}, { status: 200 })
}

export async function POST(request) {
    const product = await request.json()
    const newProdutc = await productsRepo.addProduct(product)
    return Response.json(newProdutc, { status: 201 })
}