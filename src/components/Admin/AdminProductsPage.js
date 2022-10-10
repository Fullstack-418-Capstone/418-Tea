import React,{useState, useEffect} from 'react';
import AdminSingleProductView from './AdminSingleProductView';


const AdminProductsPage = () => {
    const [allProducts, setAllProducts] = useState([])

    //call all products regardless of isActive. setAllProducts to the result


    //tier 4 add a product search bar

    return(
        <div>
            <>This is where ALL products would load, regardless of isActive status</>
            {allProducts[0] ? 
            allProducts.map((product, index) => {
                return(
                    <AdminSingleProductView product={product} key={index}></AdminSingleProductView>
                )
            })
            :null}
        </div>
    )
}
export default AdminProductsPage