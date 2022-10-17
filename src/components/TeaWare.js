import React,{useEffect, useState} from 'react';
import { getAllActiveProducts } from '../api';
import FilterButton from './FilterButtonView';
import ProductWindow from './ProductWindow';

const TeaWare = ({token}) => {
    const [teaWare, setTeaWare] = useState([]);
    const [filterWord, setFilterWord] = useState(["pot", "cup", "set"]);
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
        setTeaWare(newArr)
    }

    useEffect(() => {
        getAll();
    },[])
    useEffect(() => {
        filterProducts(allActiveProducts)
    },[filterWord])

    const productsMap = {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center'
    }
    return(
        <div>
            <div className="buttonBar">
                <FilterButton filter='ware' setFilterWord={setFilterWord} title = {"ALL"}></FilterButton>
                <FilterButton filter='pot' setFilterWord={setFilterWord} title = {"KETTLE"}></FilterButton>
                <FilterButton filter='cup' setFilterWord={setFilterWord} title = {"CUPS"}></FilterButton>
                <FilterButton filter='set' setFilterWord={setFilterWord} title = {"SETS"}></FilterButton>
            </div>
            <div style={productsMap}>
                {teaWare[0] ?
                teaWare.map((product,index) => {
                    return (
                        <ProductWindow
                        key = {product.id}
                        product={product}
                        token={token}></ProductWindow>
                    )
                })
                : <div>Out of Stock!</div>
                }
            </div>
        </div>
    )
}
export default TeaWare