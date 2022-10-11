import React,{useState, useEffect} from 'react';
import { getAllActiveProducts } from '../api';
import FilterButton from './FilterButtonView';

import ProductWindow from './ProductWindow';


const TeaWare = ({dummyProducts}) => {
    const [tea, setTea] = useState([])
    const [filter, setFilter] = useState(["pot", "cup", "set"])
    //filter button will set the filter array

//here is some fake data until api is properly working
const setDummyData = () => {
    console.log('running dummyData')
    const teawareArr = [];
    for(let i = 0; i< dummyProducts.length;i++){
        if(filter.includes(dummyProducts[i].type)){
            teawareArr.push(dummyProducts[i])
        }
    }
    setTea(teawareArr)
}
useEffect(() => {
    setDummyData();
},[filter])
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
            <FilterButton onClick={() => {console.log("clicked")}} text={"kettle"}></FilterButton>
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
export default TeaWare