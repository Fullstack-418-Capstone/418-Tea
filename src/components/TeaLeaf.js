import React,{useEffect, useState} from 'react';
import { getAllActiveProducts } from '../api';
import ProductWindow from './ProductWindow';

const TeaLeaf = () => {
    const [tea, setTea] = useState([])
    const [filter, setFilter] = useState(["loose", "bagged"])
    const [allActiveProducts, setAllActiveProducts] = useState([]);


    const filterProducts = () => {
        const filtered = [];
        console.log("all active products", allActiveProducts)
        for(let i = 0; i < allActiveProducts.length; i++ ){
            if(filter.includes(allActiveProducts[i].type)){
                filtered.push(allActiveProducts[i])
            }
        }
        console.log('adding to', filtered)
        setTea(filtered)
    }

    const getAll = async() => {
        const allproduct = await getAllActiveProducts();
        console.log('fetched products', allproduct)
        setAllActiveProducts(allproduct)

    }

    useEffect(() => {
        getAll();
        setFilter(["loose", "bagged"])
    },[])
    useEffect(() => {
        filterProducts();
    }, [filter])


    return(
        <div>
            {tea[0] ?
            tea.map((product,index) => {
                return (
                    <ProductWindow key = {index} product={product}></ProductWindow>
                )
            })
            : <>Out of Stock!</>
            }
        </div>
    )
}
export default TeaLeaf