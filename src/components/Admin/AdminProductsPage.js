import React,{useState, useEffect} from 'react';
import SingleProductViewHandler from './SingleProductViewHandler';
import { getAllProducts } from '../../api/index';


const AdminProductsPage = () => {
    const [allProducts, setAllProducts] = useState([])

    //call all products regardless of isActive. setAllProducts to the result

    const setGatheredProducts = async() => {
        const gatheredProducts = await getAllProducts();
        setAllProducts(gatheredProducts);
    }

    useEffect(() => {
        setGatheredProducts();
    }, []);


    //tier 4 add a product search bar

    return(
        <div>
            <>List of All Products</>
            <hr/>
            {allProducts[0] ? 
            allProducts.map((product) => {
                return(
                    <SingleProductViewHandler product={product} key={product.id}></SingleProductViewHandler>
                )
            })
            :null}
        </div>
    )
}
export default AdminProductsPage