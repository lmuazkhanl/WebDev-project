import ProductsRepo from "@/app/repo/products-repo";
const productsRepo = new ProductsRepo();

export async function GET(request, { params }) {
	const productId = params.id;
	const product = await productsRepo.getProduct(productId);

	// return Response.json({ search: product }, { status: 200 });
	return new Response(JSON.stringify(product), {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		status: 200,
	});
}

export async function PUT(request, { params }) {
	const productUpdate = await request.json();
	const accountNo = params.id;

	const message = await productsRepo.updateProduct(productUpdate, accountNo);
	// return Response.json(message, { status: 200 });
	return new Response(JSON.stringify(message), {
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		status: 201,
	});
}
