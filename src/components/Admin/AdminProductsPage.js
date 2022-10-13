import React,{useState, useEffect} from 'react';
import SingleProductViewHandler from './SingleProductViewHandler';
import { getAllProducts } from '../../api/index';


const AdminProductsPage = ({token}) => {
    const [allProducts, setAllProducts] = useState([])

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
            <div style={{fontSize:'32px'}}>All Products</div>
            <hr/>
            {allProducts[0] ? 
            allProducts.map((product) => {
                return(
                    <SingleProductViewHandler token={token} product={product} key={product.id}></SingleProductViewHandler>
                )
            })
            :null}
        </div>
    )
}
export default AdminProductsPage