import type { IncomingMessage, Server, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import { IProduct } from '../types/product';
import { bodyParse } from "../utils/parseBody";

const productController = async (req: IncomingMessage, res: ServerResponse) => {
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

        if(!product){
            res.writeHead(404, {"Content-type": "application/json"});
            res.end(JSON.stringify({
                message: "Products Not Found",
            }))
        }

        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify({
            message: "Products retrive Successfully",
            data: product,
        }))
    }
    else if(method === "POST" && url === "/products"){

        const body = await bodyParse(req)
        // console.log(body)
        const newProduct = {
            id: Date.now(),
            ...body
        }
        // console.log(newProduct)

        const products = productService()

        products.push(newProduct)

        createProduct(products)

        res.writeHead(201, {"Content-type": "application/json"});
        res.end(JSON.stringify({
            message: "Products created Successfully",
            data: newProduct,
        }))
    }

    else if(method === "PUT" && id !== null) {

        const body = await bodyParse(req)
        const products = productService()

        const index = products.findIndex((p: IProduct) => p.id === id)

        // console.log(index)

        if(index < 0){
            res.writeHead(404, {"Content-type": "application/json"});
            res.end(JSON.stringify({
                message: "Products Not Found",
            }))
        }

        // console.log(products[index])

        products[index] = {id: products[index].id, ...body}

        createProduct(products)

        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify({
            message: "Products Updated Successfully",
            data: products[index],
        }))
    }
    else if(method === "DELETE" && id !== null){

        const products = productService()

        const index = products.findIndex((p: IProduct) => p.id === id)

        // console.log(index)

        if(index < 0){
            res.writeHead(404, {"Content-type": "application/json"});
            res.end(JSON.stringify({
                message: "Products Not Found",
            }))
        }

        products.splice(index,1)
        createProduct(products)

        res.writeHead(200, {"Content-type": "application/json"});
        res.end(JSON.stringify({
            message: "Products Deleted Successfully",
        }))
    }
}

export default productController