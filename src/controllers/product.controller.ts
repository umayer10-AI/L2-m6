import type { IncomingMessage, Server, ServerResponse } from "http";
import { productService } from "../service/product.service";
import { IProduct } from '../types/product';

const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method
    // console.log(url)
    const urlParams = url?.split("/")
    // console.log(urlParams)
    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null

    
    if(url === "/products" && method === "GET"){
        const products = productService()
        // console.log("This is root route")
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify({
            message: "Products retrive Successfully",
            data: products,
        }))
    }


    
    else if(method === "GET" && id !== null) {
        const products = productService()
        const product = products.find((p: IProduct) => p.id === id)
        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify({
            message: "Products retrive Successfully",
            data: product,
        }))
    }
}

export default productController