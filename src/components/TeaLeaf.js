import React,{useEffect, useState} from 'react';
//import { getAllActiveProducts } from '../api';
import ProductWindow from './ProductWindow';

const TeaLeaf = ({dummyProducts}) => {
    const [tea, setTea] = useState([])
    const [filter, setFilter] = useState(["loose", "bagged"])
    //filter button will set the filter array


//here is some fake data until api is properly working
    const setDummyData = () => {
        console.log('running dummyData')
        const teaArr = [];
        for(let i = 0; i< dummyProducts.length;i++){
            if(filter.includes(dummyProducts[i].type)){
                teaArr.push(dummyProducts[i])
            }
        }
        setTea(teaArr)
    }
    useEffect(() => {
        setDummyData();
    },[])
///end of dummy data
const filterProducts = () => {
    const filtered = [];
    //search through ALL products and if filter.includes(product.type) , add to filtered array
    //setTea(filtered)
}

//this function will call ALL products once api is properly working
    // const getTea = async() => {
    //     const allproduct = await getAllActiveProducts();
    //     console.log("all products", allproduct)
    // }
    // useEffect(() => {
    //     getTea();
    // },[])

    const BASE_URL = "http://localhost:3001/api";

    useEffect(() => {
        const allProductsTest = async() => {
            const allProducts = await getAllActiveProducts();
            console.log('all products pulled', allProducts)

            setTea(allProducts)
        }
        allProductsTest();
    },[])

    const getAllActiveProducts = async() => {
        try{
            const response = await fetch(`${BASE_URL}/products`,{
                method:'GET',
                headers: {
                    'Content-Type': 'application/json'
                    },
            });
            const data = await response.json();
            return data
        } catch (error) {
            console.error(error)
        }
    }
        




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