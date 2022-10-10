import React,{useEffect, useState} from 'react';
import { getAllActiveProducts } from '../api';
import FilterButton from './FilterButtonView';
import ProductWindow from './ProductWindow';

const TeaLeaf = () => {
    const [tea, setTea] = useState([])
    const [filterWord, setFilterWord] = useState(["loose", "bagged"])
    const [allActiveProducts, setAllActiveProducts] = useState([]);


    const getAll = async() => {
        const allproduct = await getAllActiveProducts();
        console.log('fetched products', allproduct)
        setAllActiveProducts(allproduct)
        filterProducts(allproduct)
    }
    const filterProducts = (productArr) => {
        const newArr=[]
        for(let i = 0; i< productArr.length; i++){
            if(filterWord.includes(productArr[i].type)){
                console.log("matching", productArr[i])
                newArr.push(productArr[i])
            }
        }
        setTea(newArr)
    }


    useEffect(() => {
        getAll();
    },[])
    useEffect(() => {
        filterProducts(allActiveProducts)
    },[filterWord])


    return(
        <div>

            <FilterButton text='tea' setFilterWord={setFilterWord}></FilterButton>
            
            <FilterButton text='loose' setFilterWord={setFilterWord}></FilterButton>
            <FilterButton text='bagged' setFilterWord={setFilterWord}></FilterButton>
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