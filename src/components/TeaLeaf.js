import React,{useEffect, useState} from 'react';
import { getAllActiveProducts } from '../api';
import ProductWindow from './ProductWindow';

const TeaLeaf = () => {
    const [tea, setTea] = useState([])
    const [filter, setFilter] = useState(["loose", "bagged"])
    //filter button will set the filter array

//here is some fake data until api is properly working
    const setDummyData = () => {
        console.log('running dummyData')
        const productsToCreate = [
            {
            name: 'Asian Green Tea',
            imgurl: 'tealeaf/greentea.jpg',
            description: "Take a sip of liquid silver",
            stock: 35,
            unit: "canister",
            type: "loose",
            price: 24
        },{
            name: 'Ehugos Glass Teapot',
            imgurl: 'teapots/navy.jpg',
            description: "Sit back, watch, and KNOW when you're tea is ready",
            stock: 4,
            unit: "each",
            type: "pot",
            price: 32
        }, {
            name: 'Lipton Earl Grey',
            description: "Take a sip of liquid silver",
            stock: 3,
            unit: "box",
            type: "bagged",
            price: 19
        }]
        const teaArr = [];
        for(let i = 0; i< productsToCreate.length;i++){
            if(filter.includes(productsToCreate[i].type)){
                teaArr.push(productsToCreate[i])
            }
        }
        setTea(teaArr)
    }

    useEffect(() => {
        setDummyData();
    },[])
///end of dummy data


//this function will call ALL products once api is properly working
    const getTea = async() => {
        const allproduct = await getAllActiveProducts();
        console.log("all products", allproduct)
    }
    useEffect(() => {
        getTea();
    },[])



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