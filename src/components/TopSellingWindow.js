import React, { useEffect, useState } from "react";
import { getAllActiveProducts } from "../api";
import ProductWindow from "./ProductWindow";



const TopSellingWindow = ({token}) => {
    const [topFive, setTopFive] = useState([])


    useEffect(() => {
        findTopFive()
    },[token])


    const getInStockActive = async() => {
        const returnArr = []
        const allActive = await getAllActiveProducts();
        for(let i = 0; i< allActive.length; i++){
            const currProduct = allActive[i];
            if(currProduct.stock){
                returnArr.push(currProduct)
            }
        }
        return returnArr
    }
    const compareSold = (a,b) => {
        if(a.quantitySold > b.quantitySold){
            return -1;
        }else if(a.quantitySold < b.quantitySold){
            return 1;
        } else{
            return 0;
        }
    }
    const findTopFive = async() => {
        const inStock = await getInStockActive()
        const sorted = inStock.sort(compareSold)
        const top = [];
        for(let i = 0; i<5; i++){
            top.push(sorted[i]);
        }
        setTopFive(top)
    }
    const topSellingStyle = {
        display:'flex',
        flexDirection:'row',
    }

    return (
        <div>
            <div style={topSellingStyle}>
                {topFive[0] ? 
                topFive.map((product) => {
                    return(
                        <ProductWindow
                        key = {product.id}
                        token={token}
                        product={product}></ProductWindow>
                    )
                }): null}
            </div>
        </div>
    )
}
export default TopSellingWindow