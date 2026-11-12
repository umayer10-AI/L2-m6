import type { IncomingMessage, Server, ServerResponse } from "http";
import { productService } from "../service/product.service";

const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method

    const products = [
        {
            id: 1,
            name: "Products-1",
            price: 20
        },
        {
            id: 1,
            name: "Products-2",
            price: 30
        },
    ]

    productService()

    if(url === "/products" && method === "GET"){
        // console.log("This is root route")
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify({
            message: "Products retrive Successfully",
            data: products,
        }))
    }
}

export default productController