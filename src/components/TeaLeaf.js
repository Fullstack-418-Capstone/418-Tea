import React,{useEffect, useState} from 'react';
import { getAllActiveProducts } from '../api';
import FilterButton from './FilterButtonView';
import ProductWindow from './ProductWindow';

const TeaLeaf = ({token}) => {
    const [tea, setTea] = useState([])
    const [filterWord, setFilterWord] = useState(["loose", "bagged"])
    const [allActiveProducts, setAllActiveProducts] = useState([]);


    const getAll = async() => {
        const allproduct = await getAllActiveProducts();
        setAllActiveProducts(allproduct)
        filterProducts(allproduct)
    }
    const filterProducts = (productArr) => {
        const newArr=[]
        for(let i = 0; i< productArr.length; i++){
            if(filterWord.includes(productArr[i].type)){
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

    const buttonBar = {
        display:'flex',
        flexDirection:'row',
        justifyContent:"center"
    }
    const productsMap = {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center'
    }
    return(
        <div>
            <div id='filters' style={buttonBar}>
                <FilterButton filter='tea' setFilterWord={setFilterWord} title = {"ALL"}></FilterButton>
                <FilterButton filter='bagged' setFilterWord={setFilterWord} title = {"TEA BAGS"}></FilterButton>
                <FilterButton filter='loose' setFilterWord={setFilterWord} title = {"LOOSE LEAF"}></FilterButton>
            </div>
            <div style={productsMap}>
                {tea[0] ?
                tea.map((product,index) => {
                    return (
                        <ProductWindow key = {index} product={product} token={token} ></ProductWindow>
                    )
                })
                : <>Out of Stock!</>
                }
            </div>
        </div>
    )
}
export default TeaLeaf