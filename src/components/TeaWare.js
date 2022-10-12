import React,{useEffect, useState} from 'react';
import { getAllActiveProducts } from '../api';
import FilterButton from './FilterButtonView';
import ProductWindow from './ProductWindow';

const TeaWare = ({token, user}) => {
    const [teaWare, setTeaWare] = useState([]);
    const [filterWord, setFilterWord] = useState(["pot", "cup", "set"]);
    const [allActiveProducts, setAllActiveProducts] = useState([]);

    const getAll = async() => {
        const allproduct = await getAllActiveProducts();
        // console.log('fetched products', allproduct)
        setAllActiveProducts(allproduct)
        filterProducts(allproduct)
    }
    const filterProducts = (productArr) => {
        const newArr=[]
        for(let i = 0; i< productArr.length; i++){
            if(filterWord.includes(productArr[i].type)){
                // console.log("matching", productArr[i])
                newArr.push(productArr[i])
            }
        }
        setTeaWare(newArr)
    }

    useEffect(() => {
        getAll();
    },[])
    useEffect(() => {
        filterProducts(allActiveProducts)
    },[filterWord])

    const buttonBar = {
        display:'flex',
        flexDirection:'row',
        justifyContent:"center"
    }
    return(
        <div>
            <div id='filters' style={buttonBar}>
            <FilterButton filter='ware' setFilterWord={setFilterWord} title = {"ALL"}></FilterButton>
            <FilterButton filter='pot' setFilterWord={setFilterWord} title = {"KETTLE"}></FilterButton>
            <FilterButton filter='cup' setFilterWord={setFilterWord} title = {"MUGS"}></FilterButton>
            <FilterButton filter='set' setFilterWord={setFilterWord} title = {"SETS"}></FilterButton>
            </div>

            {teaWare[0] ?
            teaWare.map((product,index) => {
                return (
                    <ProductWindow key = {index} product={product} token={token} user={user} ></ProductWindow>
                )
            })
            : <>Out of Stock!</>
            }
        </div>
    )
}
export default TeaWare