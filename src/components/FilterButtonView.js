import React from 'react';


const FilterButton = ({text, setFilterWord, title}) => {
    
    
    
    const filterStyle = {
        border:'solid',
        borderRadius:'25px',
        backgroundColor:"rgb(216,191,216)",
        padding: '3px',
        margin: '5px',
        minWidth:'150px',
        textAlign:"center"

    }
    const handleClick = () => {
        console.log('setting filter to', text)
        if(text === "tea"){
            setFilterWord(["loose", "bagged"])
        } else if(text === "ware"){
            setFilterWord(["cup", "set", "pot"])
        }else{
        setFilterWord(text)
        }
    }

    return (
        <div style={filterStyle} onClick={() => {handleClick()}}>{title}</div>
    )
}
export default FilterButton